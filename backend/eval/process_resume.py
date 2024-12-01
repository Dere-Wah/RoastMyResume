from typing import List
from eval.prefrontal_cortex import validate_resume, roast_resume
from openai import OpenAI
from models.data_models import ResumeChunks, ResumeResponse


client = OpenAI()

def evaluate_resume(resume_text) -> ResumeResponse:
    evaluated = validate_resume(client, resume_text)
    if not evaluated.valid:
        return ResumeResponse(valid=False, result=ResumeChunks(chunks=[]), invalid_roast=evaluated.invalid_roast)
    else:
        result = roast_resume(client, resume_text)
        return ResumeResponse(valid=True, result=result, invalid_roast="")
