"""
Centralized application configuration.

All secrets and environment-specific values live in a `.env` file
(never committed to Git — see backend/.env.example for the template).

Later phases will extend this class with:
  - Firebase credentials path (Phase 3)
  - AES encryption key (Phase 8)
  - SMTP credentials (Phase 10)
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ---- General ----
    APP_NAME: str = "AI-Powered Emergency Evidence Vault"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # ---- CORS ----
    # The frontend is plain HTML/JS served separately (e.g. via
    # `python -m http.server` or Live Server), so the backend must
    # explicitly allow it during local development.
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
    ]

    # ---- Storage ----
    UPLOAD_DIR: str = "uploads"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


# Single shared settings instance, imported throughout the app.
settings = Settings()
