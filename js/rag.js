// js/rag.js — RAG Knowledge Base for MakerMind v2.2.0
// Local embeddings + IndexedDB storage + semantic search

// ── CONSTANTS ──
const RAG_DB_NAME = 'MakerMind_RAG';
const RAG_DB_VERSION = 1;
const RAG_STORE_NAME = 'documents';
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 50;
const MAX_SEARCH_RESULTS = 5;

// ── DATABASE ──
function openRAGDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(RAG_DB_NAME, RAG_DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(RAG_STORE_NAME)) {
        const store = db.createObjectStore(RAG_STORE_NAME, { keyPath: 'id' });
        store.createIndex('projectId', 'projectId', { unique: false });
        store.createIndex('embedding', 'embedding', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ── CHUNK TEXT ──
function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  if (!text || text.length < chunkSize) return [text];
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

// ── GENERATE EMBEDDINGS (using Transformers.js) ──
async function generateEmbedding(text) {
  try {
    // Check if Transformers.js is available
    if (typeof transformers === 'undefined') {
      // Load Transformers.js dynamically
      await loadTransformers();
    }
    
    const { pipeline } = transformers;
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    const result = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(result.data);
  } catch (e) {
    console.warn('Embedding generation failed:', e);
    return null;
  }
}

// ── LOAD TRANSFORMERS.JS ──
function loadTransformers() {
  return new Promise((resolve, reject) => {
    if (typeof transformers !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.11.0/dist/transformers.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Transformers.js'));
    document.head.appendChild(script);
  });
}

// ── ADD DOCUMENT ──
async function addRAGDocument(projectId, fileName, content, fileType = 'text') {
  const db = await openRAGDatabase();
  const chunks = chunkText(content);
  const id = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 6);
  
  const doc = {
    id,
    projectId,
    fileName,
    fileType,
    chunks: [],
    uploadedAt: new Date().toISOString()
  };

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await generateEmbedding(chunks[i]);
    if (embedding) {
      doc.chunks.push({
        index: i,
        text: chunks[i],
        embedding: embedding
      });
    }
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RAG_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(RAG_STORE_NAME);
    const request = store.put(doc);
    request.onsuccess = () => resolve(doc);
    request.onerror = () => reject(request.error);
  });
}

// ── GET DOCUMENTS FOR PROJECT ──
async function getRAGDocuments(projectId) {
  const db = await openRAGDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RAG_STORE_NAME], 'readonly');
    const store = transaction.objectStore(RAG_STORE_NAME);
    const index = store.index('projectId');
    const request = index.getAll(projectId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ── DELETE DOCUMENT ──
async function deleteRAGDocument(docId) {
  const db = await openRAGDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RAG_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(RAG_STORE_NAME);
    const request = store.delete(docId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ── DELETE ALL DOCUMENTS FOR PROJECT ──
async function deleteRAGDocumentsForProject(projectId) {
  const docs = await getRAGDocuments(projectId);
  for (const doc of docs) {
    await deleteRAGDocument(doc.id);
  }
}

// ── SEMANTIC SEARCH ──
async function searchRAG(projectId, query) {
  const queryEmbedding = await generateEmbedding(query);
  if (!queryEmbedding) return [];

  const docs = await getRAGDocuments(projectId);
  if (!docs.length) return [];

  // Collect all chunks with their embeddings
  const allChunks = [];
  docs.forEach(doc => {
    doc.chunks.forEach(chunk => {
      allChunks.push({
        docId: doc.id,
        fileName: doc.fileName,
        chunkIndex: chunk.index,
        text: chunk.text,
        embedding: chunk.embedding,
        uploadedAt: doc.uploadedAt
      });
    });
  });

  // Calculate cosine similarity
  const results = allChunks.map(chunk => {
    const similarity = cosineSimilarity(queryEmbedding, chunk.embedding);
    return { ...chunk, similarity };
  });

  // Sort by similarity and return top results
  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, MAX_SEARCH_RESULTS);
}

// ── COSINE SIMILARITY ──
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// ── RAG-ENHANCED CHAT ──
async function getRAGContext(projectId, query) {
  const results = await searchRAG(projectId, query);
  if (!results.length) return '';
  
  let context = '## Relevant Knowledge from Your Documents\n\n';
  results.forEach((r, i) => {
    context += `### Document: ${r.fileName} (Chunk ${r.chunkIndex + 1})\n`;
    context += `${r.text}\n\n`;
  });
  return context;
}

// ── EXPOSE GLOBALLY ──
window.RAG = {
  addDocument: addRAGDocument,
  getDocuments: getRAGDocuments,
  deleteDocument: deleteRAGDocument,
  deleteAll: deleteRAGDocumentsForProject,
  search: searchRAG,
  getContext: getRAGContext,
  chunkText: chunkText
};
