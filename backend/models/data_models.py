from pydantic import BaseModel
from typing import List


class ResumeRequest(BaseModel):
    resume: str


class ResumeChunk(BaseModel):
    index: int
    a_quote_from_the_cv_section_the_roast_is_about: str
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
    final_short_overall_consideration: str
    one_big_company_that_could_hire_this_profile_and_reason: str


