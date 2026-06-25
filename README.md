# makermind
MakerMind — AI-powered idea &amp; project organizer for makers, builders, and engineers. Capture ideas by voice or text, expand them with Claude AI, and track from concept to execution.

## 🏠 Local AI with Shimmy (Optional)

MakerMind supports **Shimmy** — a lightweight, local LLM server that runs completely offline.

### Quick Start
1. Download Shimmy from [shimmy-rs/shimmy](https://github.com/shimmy-rs/shimmy)
2. Download a GGUF model (Phi-3, Mistral, Llama, etc.)
3. Run: `./shimmy --model model.gguf --port 8080`
4. In MakerMind Settings → AI Engine → Select "Shimmy (Local Server)"
5. Enter URL: `http://localhost:8080/v1`
6. Click "Test Connection"

### Why Shimmy?
- 🔒 **100% Private** — No data leaves your machine
- 📶 **Offline** — Works without internet
- 🆓 **Free** — No API keys, no rate limits
- 🧠 **Any GGUF Model** — Run Phi-3, Mistral, Llama, Gemma, and more

📖 **[Full Shimmy Setup Guide →](SHIMMY_SETUP.md)**
