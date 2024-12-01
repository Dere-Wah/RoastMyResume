from pydantic import BaseModel
from typing import List


class ResumeRequest(BaseModel):
    resume: str


class ResumeChunk(BaseModel):
    index: int
    summary: str
    roast: str
    suggestion: str
    short_impactful_ironic_insult: str


class IsValidResumeText(BaseModel):
    valid: bool
    invalid_roast: str


class ResumeChunks(BaseModel):
    chunks: List[ResumeChunk]


class ResumeResponse(BaseModel):
    valid: bool
    invalid_roast: str
    result: ResumeChunks

