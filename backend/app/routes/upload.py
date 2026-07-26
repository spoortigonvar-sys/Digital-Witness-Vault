from fastapi import APIRouter, UploadFile, File
import os
import hashlib

from encryption.encryption import encrypt_file

router = APIRouter()

UPLOAD_FOLDER = "uploads"
ENCRYPTED_FOLDER = "encrypted"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(ENCRYPTED_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_video(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    content = await file.read()

    # Save original file
    with open(file_path, "wb") as f:
        f.write(content)

    # Generate SHA-256
    sha256_hash = hashlib.sha256(content).hexdigest()

    # Encrypt the uploaded file
    encrypted_path = os.path.join(
        ENCRYPTED_FOLDER,
        file.filename + ".enc"
    )

    encrypt_file(file_path, encrypted_path)

    return {
        "message": "Video uploaded successfully",
        "filename": file.filename,
        "sha256": sha256_hash,
        "encrypted_file": encrypted_path
    }