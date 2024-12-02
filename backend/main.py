from fastapi import FastAPI, HTTPException
from models.data_models import ResumeRequest, ResumeResponse
from eval.process_resume import evaluate_resume
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
import time

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]

app = FastAPI(middleware=middleware)

@app.post("/rmr/")
async def process_resume(data: ResumeRequest):
    # Simulated processing logic
    resume_text = data.resume

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty")

    result = evaluate_resume(resume_text)


    # Example response
    return result
