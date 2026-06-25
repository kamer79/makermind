# Shimmy Setup Guide — MakerMind 2.0

Shimmy is a lightweight, OpenAI‑API‑compatible server that runs **local LLMs** with zero dependencies. It's completely **offline** and **private** — your data never leaves your machine.

---

## 🎯 Why Use Shimmy?

| Feature | Benefit |
|---------|---------|
| **100% Private** | No data sent to the cloud |
| **Offline** | Works without internet |
| **Zero Dependencies** | Single binary, just run it |
| **OpenAI Compatible** | Works with MakerMind's existing AI code |
| **Any GGUF Model** | Run Llama, Mistral, Phi, Gemma, and more |
| **Free Forever** | No API keys, no rate limits |

---

## 📦 Requirements

| Component | Minimum |
|-----------|---------|
| **RAM** | 4GB (8GB recommended for 7B models) |
| **Storage** | 2GB free for model files |
| **OS** | Windows 10+, macOS 12+, Linux (any modern distro) |
| **CPU** | Any modern x86_64 or Apple Silicon |

---

## 🔧 Step 1: Download Shimmy

### Windows
1. Go to the [Shimmy Releases page](https://github.com/shimmy-rs/shimmy/releases)
2. Download `shimmy-windows-x86_64.exe`
3. Rename to `shimmy.exe`
4. Place it in a folder like `C:\shimmy\`

### macOS (Intel)
1. Go to the [Shimmy Releases page](https://github.com/shimmy-rs/shimmy/releases)
2. Download `shimmy-macos-x86_64`
3. Rename to `shimmy`
4. Make it executable: `chmod +x shimmy`
5. Place it in `/usr/local/bin/` or `~/shimmy/`

### macOS (Apple Silicon)
1. Go to the [Shimmy Releases page](https://github.com/shimmy-rs/shimmy/releases)
2. Download `shimmy-macos-arm64`
3. Rename to `shimmy`
4. Make it executable: `chmod +x shimmy`
5. Place it in `/usr/local/bin/` or `~/shimmy/`

### Linux (x86_64)
```bash
# Download the binary
curl -L -o shimmy https://github.com/shimmy-rs/shimmy/releases/latest/download/shimmy-linux-x86_64

# Make it executable
chmod +x shimmy

# Move to PATH (optional)
sudo mv shimmy /usr/local/bin/
```

### Linux (ARM64 — Raspberry Pi 4/5)
```bash
# Download the binary
curl -L -o shimmy https://github.com/shimmy-rs/shimmy/releases/latest/download/shimmy-linux-arm64

# Make it executable
chmod +x shimmy

# Move to PATH (optional)
sudo mv shimmy /usr/local/bin/
```

---

## 🤖 Step 2: Download a Model

Shimmy uses GGUF format models. Here are recommended options:

| Model | Size | Quality | RAM | Best For |
|-------|------|---------|-----|----------|
| **Phi-3-mini-4k-instruct** | ~2.5GB | Good | 4GB | Raspberry Pi, low-end PCs |
| **Mistral-7B-Instruct** | ~4.5GB | Very Good | 8GB | Most users |
| **Llama-3.2-3B-Instruct** | ~2GB | Good | 4GB | Fast responses |
| **Gemma-2-2B** | ~1.5GB | Good | 3GB | Very low-end devices |

### Download via Hugging Face

**Phi-3-mini-4k-instruct** (Recommended for Raspberry Pi):
```bash
curl -L -o phi-3-mini-4k-instruct-q4_K_M.gguf \
  https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF/resolve/main/Phi-3-mini-4k-instruct-Q4_K_M.gguf
```

**Mistral-7B-Instruct** (Recommended for most PCs):
```bash
curl -L -o mistral-7b-instruct-q4_K_M.gguf \
  https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF/resolve/main/Mistral-7B-Instruct-v0.3-Q4_K_M.gguf
```

**Llama-3.2-3B-Instruct** (Fast, good quality):
```bash
curl -L -o llama-3.2-3b-instruct-q4_K_M.gguf \
  https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q4_K_M.gguf
```

---

## 🚀 Step 3: Run Shimmy

### Basic Command
```bash
./shimmy --model /path/to/your-model.gguf --port 8080
```

### Examples

**Windows (Command Prompt):**
```cmd
shimmy.exe --model C:\shimmy\phi-3-mini-4k-instruct-q4_K_M.gguf --port 8080
```

**macOS / Linux:**
```bash
./shimmy --model ~/models/phi-3-mini-4k-instruct-q4_K_M.gguf --port 8080
```

### What You'll See
```
[INFO] Loading model: phi-3-mini-4k-instruct-q4_K_M.gguf
[INFO] Model loaded successfully
[INFO] Server running on http://localhost:8080
[INFO] Ready for requests
```

### Keep It Running
- **Windows:** Leave the Command Prompt window open
- **macOS/Linux:** Use `tmux` or `screen` to keep it running in the background

---

## 🔗 Step 4: Connect MakerMind to Shimmy

1. Open MakerMind
2. Go to **Settings** → **AI Engine**
3. Select **Shimmy (Local Server)**
4. Enter the server URL: `http://localhost:8080/v1`
5. Click **Save**
6. Click **Test Connection** to verify it's working

---

## ✅ Step 5: Test It

### In MakerMind
1. Create a new project
2. Go to the **Blueprint** tab
3. Click **Generate Blueprint**
4. Shimmy should generate a complete project plan

### Command Line Test
You can also test Shimmy directly:
```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local",
    "messages": [{"role": "user", "content": "Say hello"}]
  }'
```

---

## 🐛 Troubleshooting

### "Connection refused" or "Cannot connect"
- **Shimmy is not running** → Start it with the command above
- **Wrong port** → Check if you're using `8080` or another port
- **Firewall** → Allow Shimmy through your firewall

### "No response" or timeout
- **Model too large** → Try a smaller model (Phi-3 or Llama-3.2-3B)
- **Not enough RAM** → Close other applications
- **Slow CPU** → Be patient, first response may take 30-60 seconds

### "Model not found"
- **Wrong path** → Use the absolute path to your model file
- **Model not downloaded** → Download the model first

### "Permission denied" (Linux/macOS)
```bash
chmod +x shimmy
```

---

## 🧠 Recommended Setup by Hardware

### Raspberry Pi 4/5 (4GB RAM)
- **Model:** Phi-3-mini-4k-instruct
- **Command:** `./shimmy --model phi-3-mini-4k-instruct-q4_K_M.gguf --port 8080 --threads 4`
- **Expected speed:** 5-10 tokens/second

### Older PC / Laptop (8GB RAM)
- **Model:** Mistral-7B-Instruct or Llama-3.2-3B
- **Command:** `./shimmy --model mistral-7b-instruct-q4_K_M.gguf --port 8080 --threads 6`
- **Expected speed:** 10-20 tokens/second

### Modern PC / Gaming Laptop (16GB+ RAM)
- **Model:** Mistral-7B-Instruct or Llama-3.3-70B (if you have the RAM)
- **Command:** `./shimmy --model mistral-7b-instruct-q4_K_M.gguf --port 8080 --threads 8`
- **Expected speed:** 20-40 tokens/second

### Apple Silicon (M1/M2/M3)
- **Model:** Mistral-7B-Instruct or Llama-3.2-3B
- **Command:** `./shimmy --model mistral-7b-instruct-q4_K_M.gguf --port 8080 --threads 8`
- **Expected speed:** 20-40 tokens/second

---

## 🔄 Auto-start Shimmy (Optional)

### Windows (Task Scheduler)
1. Open Task Scheduler
2. Create a new task
3. Trigger: At startup
4. Action: Start a program → `C:\shimmy\shimmy.exe` with arguments `--model C:\shimmy\model.gguf --port 8080`

### macOS/Linux (systemd)
Create a service file: `/etc/systemd/system/shimmy.service`
```ini
[Unit]
Description=Shimmy LLM Server
After=network.target

[Service]
ExecStart=/usr/local/bin/shimmy --model /home/user/models/model.gguf --port 8080
Restart=always
User=user

[Install]
WantedBy=multi-user.target
```
Then:
```bash
sudo systemctl enable shimmy
sudo systemctl start shimmy
```

---

## 📊 Performance Tips

| Setting | Recommendation |
|---------|----------------|
| **Threads** | Set to number of CPU cores (e.g., `--threads 8`) |
| **Batch Size** | Default is fine for most users |
| **Context Length** | Default 2048 is fine for MakerMind |
| **GPU** | Shimmy supports GPU via GGUF (experimental) |

---

## 🆘 Need Help?

- **Shimmy GitHub**: https://github.com/shimmy-rs/shimmy
- **MakerMind GitHub**: https://github.com/kamer79/makermind
- **Open an Issue**: https://github.com/kamer79/makermind/issues

---

## ✅ Quick Start Checklist

- [ ] Downloaded Shimmy binary
- [ ] Made it executable (Linux/macOS)
- [ ] Downloaded a GGUF model
- [ ] Ran Shimmy with `--model` and `--port 8080`
- [ ] Connected MakerMind to Shimmy in Settings
- [ ] Tested the connection
- [ ] Generated a blueprint with Shimmy

---

**Enjoy completely private, offline AI with MakerMind + Shimmy!** 🚀
