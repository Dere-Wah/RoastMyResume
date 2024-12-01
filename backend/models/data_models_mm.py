from pydantic import BaseModel
from typing import List


class ResumeRequest(BaseModel):
    resume: str


class ResumeChunk(BaseModel):
    category: str
    summary: str
    

class ResumeRoast(BaseModel):
    roast: str
    suggestion: str


class ResumeChunkAnalysis(BaseModel):
    index: int
    chunk: ResumeChunk
    roast: ResumeRoast


class IsValidResumeText(BaseModel):
    valid: bool
    invalid_roast: str


class ResumeResponse(BaseModel):
    valid: bool
    invalid_roast: str
    result: List[ResumeChunkAnalysis]


class ResumeImage(BaseModel):
    description: str