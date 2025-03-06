

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import ollama
import os
import tempfile
import asyncio
from typing import List, Optional
import mimetypes

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Request Model
class ChatRequest(BaseModel):
    question: str

# Constants
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_TEXT_TYPES = [
    "text/plain", "text/markdown", "text/csv", "text/html", 
    "application/json", "application/xml", "application/javascript",
    "application/x-python", "application/x-ruby"
]

# Function to determine if file is text-based
def is_text_file(filename: str, content_type: Optional[str] = None) -> bool:
    if content_type and content_type in ALLOWED_TEXT_TYPES:
        return True
    
    # Check by extension for common text file types
    text_extensions = ['.txt', '.md', '.csv', '.json', '.xml', '.html', '.js', '.py', '.rb', '.c', '.cpp', '.h', '.java', '.php']
    ext = os.path.splitext(filename)[1].lower()
    return ext in text_extensions

# Function to read file content
async def read_file_content(file: UploadFile, max_size: int = MAX_FILE_SIZE):
    # Check file size
    file_size = 0
    content = b""
    
    # Read the file in chunks to avoid memory issues
    chunk_size = 1024 * 1024  # 1MB chunks
    while True:
        chunk = await file.read(chunk_size)
        if not chunk:
            break
        content += chunk
        file_size += len(chunk)
        if file_size > max_size:
            raise ValueError(f"File size exceeds maximum allowed size of {max_size/(1024*1024)}MB")
    
    # Seek back to beginning for potential future operations
    await file.seek(0)
    
    # Try to decode file content as text
    try:
        return content.decode("utf-8")
    except UnicodeDecodeError:
        # For binary files, store temporarily and use a description
        return f"[Binary file uploaded: {file.filename}]"

# Route for chat with Llama 3
@app.post("/generate/")
async def ask_llama(request: ChatRequest):
    try:
        if not request.question.strip():
            return JSONResponse(
                status_code=400,
                content={"error": "Empty question received"}
            )
            
        response = ollama.chat(model="llama3", messages=[{"role": "user", "content": request.question}])
        answer = response.get("message", {}).get("content", "No response from Llama 3.")
        return {"answer": answer}
    except Exception as e:
        print(f"Error in /generate/: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

# Route for file upload
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Check if file is empty
        if await file.read(1) == b'':
            await file.seek(0)
            return JSONResponse(
                status_code=400,
                content={"error": "Empty file uploaded"}
            )
        await file.seek(0)
        
        # Check file type
        content_type = file.content_type
        if not is_text_file(file.filename, content_type):
            return JSONResponse(
                status_code=400,
                content={"error": "Only text-based files are supported"}
            )
        
        # Read file content
        file_content = await read_file_content(file)
        
        # Debugging logs
        print(f"Received file: {file.filename}")
        print(f"Content type: {content_type}")
        print(f"Extracted content length: {len(file_content)}")
        
        # Prepare prompt
        prompt = f"The following is the content of a file named '{file.filename}':\n\n{file_content}\n\nPlease analyze this content and provide a concise summary."
        
        # Call Llama model
        response = ollama.chat(model="llama3", messages=[{"role": "user", "content": prompt}])
        answer = response.get("message", {}).get("content", "No response from Llama 3.")

        return {"answer": answer, "filename": file.filename}
    except ValueError as e:
        print(f"Value Error in /upload/: {str(e)}")
        return JSONResponse(status_code=413, content={"error": str(e)})
    except Exception as e:
        print(f"General Error in /upload/: {str(e)}")
        return JSONResponse(status_code=500, content={"error": f"Error processing file: {str(e)}"})

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}
