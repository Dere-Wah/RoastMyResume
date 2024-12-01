from openai import OpenAI
from models.data_models import IsValidResumeText, ResumeChunk, ResumeResponse
client = OpenAI()


def validate_resume(resume_text) -> IsValidResumeText:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "Given the following resume text, declare if it is actually a resume or not."},
            {"role": "user", "content": resume_text},
        ],
        response_format=IsValidResumeText,
    )

    result = completion.choices[0].message.parsed
    return result


def evaluate_resume(resume_text) -> ResumeResponse:
    valid = validate_resume(resume_text)
    if not valid.valid:
        return ResumeResponse(valid=False, result=[])