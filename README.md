# AI-Powered Emergency Evidence Vault

Secure, browser-based violence detection and digital evidence
preservation system.

A user can double-click anywhere on the recorder page to instantly
start capturing emergency video evidence. The clip is analyzed by an
AI violence-detection model, encrypted with AES-256, hashed with
SHA-256 for tamper-evidence, stored securely, and an emergency email
alert is triggered — all before the user needs to do anything else.

## Tech Stack

| Layer          | Technology                              |
|----------------|------------------------------------------|
| Frontend       | HTML5, CSS3, Vanilla JavaScript           |
| Backend        | Python, FastAPI                           |
| Authentication | Firebase Authentication                   |
| Database       | Firebase Firestore                        |
| Storage        | Firebase Storage                          |
| AI             | OpenCV + TensorFlow/PyTorch violence model|
| Security       | AES-256 encryption, SHA-256 hashing       |
| Email          | Gmail SMTP                                |

## Project Structure

```
AI-Emergency-Evidence-Vault/
├── frontend/           # Plain HTML/CSS/JS, one page per screen
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── recorder.html
│   └── evidence.html
├── backend/
│   ├── app/             # FastAPI app factory, config, routes
│   ├── ai/               # Violence detection (Phase 7)
│   ├── encryption/       # AES-256 (Phase 8)
│   ├── hashing/           # SHA-256 integrity (Phase 9)
│   ├── mailer/            # Gmail SMTP alerts (Phase 10)
│   ├── uploads/            # Temp landing zone for recorded video
│   ├── main.py
│   └── requirements.txt
└── docs/                 # Diagrams, notes, viva material
```

> Note: the email-notification package is named `mailer/`, not
> `email/`, because a top-level `email/` folder would shadow Python's
> built-in `email` standard-library module and crash the app.

## Status: Phase 1 — Foundation ✅

- [x] Folder structure created
- [x] FastAPI backend boots (`/` and `/health` verified)
- [x] Frontend skeleton (6 pages) with shared CSS/JS and live
      backend-status indicator
- [x] `.env.example` template for future secrets (Firebase, AES key, SMTP)
- [ ] Phase 2 — Professional UI design
- [ ] Phase 3 — Firebase Authentication
- [ ] Phase 4 — Browser camera/mic + double-click recording
- [ ] Phase 5 — Backend APIs
- [ ] Phase 6 — Upload to Firebase Storage
- [ ] Phase 7 — AI violence detection
- [ ] Phase 8 — AES encryption
- [ ] Phase 9 — SHA-256 integrity verification
- [ ] Phase 10 — Email notification
- [ ] Phase 11 — Evidence vault (decrypt + verify + play)
- [ ] Phase 12 — Final testing

## Running the Backend

```bash
cd backend
pip install -r requirements.txt   # first time only
python main.py
```

The API will be live at `http://127.0.0.1:8000`.
Interactive docs: `http://127.0.0.1:8000/docs`

## Running the Frontend

Any static file server works. From the `frontend/` folder:

```bash
python -m http.server 5500
```

Then open `http://127.0.0.1:5500/index.html` in your browser.
(Port 5500 is already whitelisted in the backend's CORS settings.)
