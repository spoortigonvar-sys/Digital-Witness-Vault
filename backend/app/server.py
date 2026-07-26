"""
Application factory for the AI-Powered Emergency Evidence Vault backend.

Keeping app-creation here (separate from main.py) means:
  - main.py stays a thin "run the server" entry point
  - the app instance can be imported directly by tests or by
    `uvicorn app.server:app` without going through main.py
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import health
from app.routes import upload


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description=(
            "Backend API for secure, browser-based emergency evidence "
            "recording, AI violence detection, encryption, integrity "
            "verification, and evidence vault storage."
        ),
        version="0.1.0",
    )

    # CORS: the frontend (plain HTML/CSS/JS) is served from a different
    # origin/port than the backend, so browsers will block requests
    # unless we explicitly allow them here.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers — each phase will add its own router here.
    app.include_router(health.router)
    app.include_router(
    upload.router
)

    @app.get("/")
    def root():
        return {
            "message": f"{settings.APP_NAME} API is running.",
            "docs": "/docs",
        }

    return app


app = create_app()
