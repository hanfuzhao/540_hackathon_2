# 🛡️ Gaslight Guard — Sarcasm Detection & Mental Support

> **Hackathon 2026** | NLP-powered assistant to help students recognize veiled verbal abuse and access immediate coping strategies.

---

## The Problem

Victims of verbal abuse often struggle with **gaslighting** — doubting their own reality because the abuser uses sarcasm or passive-aggressive language that *looks* polite but *feels* painful. Standard NLP sentiment classifiers frequently misread these as positive.

## The Solution

A multi-label NLP classifier that detects:

| Label | Description |
|-------|-------------|
| ✅ **Sincere** | Genuine, healthy communication |
| 😏 **Sarcastic** | Positive wording with hidden negative intent |
| 😤 **Passive-Aggressive** | Indirect hostility masked as politeness |
| 🔴 **Gaslighting** | Language designed to distort the victim's reality |

For every detected toxic pattern, the app provides:
- A **Sanity Check** ("You are NOT being overly sensitive")
- **Coping strategies**
- **Suggested response scripts**
- **Mental health resources**

---

## Architecture

```
gaslight-guard/
├── backend/
│   ├── main.py          # FastAPI REST API
│   ├── classifier.py    # NLP engine (zero-shot + rule-based)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── SingleAnalyzer.jsx      # Single-message analysis
    │   │   ├── ConversationAnalyzer.jsx # Context window audit
    │   │   ├── StressTest.jsx          # Evaluation mode
    │   │   ├── Resources.jsx           # Mental health resources
    │   │   ├── LabelBadge.jsx
    │   │   ├── ScoreBar.jsx
    │   │   └── SanityCheckCard.jsx
    │   └── api.js
    └── package.json
```

---

## NLP Approach

### Model
**Zero-Shot Classification** using `facebook/bart-large-mnli` (RoBERTa-based backbone).

The model is invoked with the four candidate labels and scores are blended with a **rule-based pattern matcher** (70/30 weight):
- 70% zero-shot classifier confidence
- 30% regex pattern match against curated gaslighting/passive-aggression/sarcasm phrase libraries

### Evaluation Plan

#### 1. Sarcastic Sentiment Flip Test
A built-in stress test using 10 "positive-worded" insults to check if the model mistakenly labels them as Sincere.

**Pass threshold:** ≥70% correctly identified as Sarcastic.

#### 2. Contextual Consistency Audit
The `/analyze/conversation` endpoint analyzes a **5-message window** to detect:
- Repeated toxic patterns across messages (not just single-sentence)
- **Escalation detection** (increasing toxicity in recent messages)
- Dominant pattern labeling

### Datasets (for fine-tuning / future work)
- **SARC**: Self-Annotated Reddit Corpus (sarcasm)
- **Cyberbullying Classification Dataset** (toxicity)

---

## Quick Start

### Backend (Python 3.10+)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend (Node 18+)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/analyze/single` | Analyze one message |
| `POST` | `/analyze/conversation` | Context window analysis (up to 5 messages) |
| `POST` | `/evaluate/stress-test` | Run sarcasm flip stress test |
| `GET`  | `/resources` | Mental health resources |
| `GET`  | `/health` | Health check |

---

## Mental Health Resources

| Resource | Contact |
|----------|---------|
| Crisis Text Line | Text HOME to 741741 |
| National DV Hotline | 1-800-799-7233 |
| SAMHSA Helpline | 1-800-662-4357 |
| 7 Cups | 7cups.com |

---

*This tool is for educational purposes only and does not replace professional mental health support.*
