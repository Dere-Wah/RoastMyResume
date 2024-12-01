from fastapi import FastAPI, HTTPException
from models.data_models import ResumeRequest, ResumeResponse

app = FastAPI()


@app.post("/rmr/")
async def process_resume(data: ResumeRequest):
    # Simulated processing logic
    resume_text = data.resume

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty")

    # Example response
    return ResumeResponse(
        status="success",
        message="Resume processed successfully",
        summary="Your summary here",  # Replace with actual logic
        recommendations=["Improvement A", "Improvement B"],  # Replace with actual logic
    )
