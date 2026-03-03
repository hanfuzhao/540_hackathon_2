#!/bin/bash
# NLP Product — Quick Start Script

set -e

echo "Starting NLP Product..."
echo ""

# Backend
echo "▶ Starting backend (FastAPI)..."
cd "$(dirname "$0")/backend"

if [ ! -d ".venv" ]; then
  echo "  Creating virtual environment..."
  python3 -m venv .venv
fi

source .venv/bin/activate

echo "  Installing Python dependencies (first run may take a while)..."
pip install -r requirements.txt -q

echo "  Launching API server on http://localhost:8000"
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Frontend
echo ""
echo "▶ Starting frontend (Vite)..."
cd ../frontend

if [ ! -d "node_modules" ]; then
  echo "  Installing npm packages..."
  npm install
fi

echo "  Launching dev server on http://localhost:5173"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "NLP Product is running!"
echo "   Frontend: http://localhost:5173"
echo "   API docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Stopped.'" EXIT
wait
