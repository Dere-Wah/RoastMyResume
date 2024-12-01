from pydantic import BaseModel
from typing import List


class ResumeRequest(BaseModel):
    resume: str


class ResumeChunk(BaseModel):
    index: int
    category: str
    summary: str
    roast: str
    suggestion: str


class IsValidResumeText(BaseModel):
    valid: bool


class ResumeResponse(BaseModel):
    valid: bool
    result: List[ResumeChunk]

