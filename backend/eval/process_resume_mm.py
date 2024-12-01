from openai import OpenAI
import agent.prefrontal_cortex as agent_think
from ..models.data_models import IsValidResumeText, ResumeChunk, ResumeChunkAnalysis, ResumeResponse

from typing import List

# pip install -U langchain-community
from langchain_text_splitters import RecursiveCharacterTextSplitter


client = OpenAI()


# Function to analyze text with LangChain
def transform_text_in_chunks(text: str) -> List[ResumeChunk]:
    # Split the text into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=200)
    text_chunks = text_splitter.split_text(text)

    # Analyze each chunk and set it in correct format
    chunks: List[ResumeChunk] = []
    for text_chunk in text_chunks:
        chunks.append(agent_think.obtain_chunk_from_text(client, text_chunks))
        
    return chunks


def evaluate_resume(resume_text: str) -> ResumeResponse:
    resume_validity: IsValidResumeText = agent_think.validate_resume(resume_text)
    if not resume_validity.valid:
        return ResumeResponse(valid=False, invalid_roast=resume_validity.invalid_roast, result=[])
    else:
        chunks: List[ResumeChunk] = transform_text_in_chunks(resume_text)
        # analize chunks
        chunks_analysis: List[ResumeChunkAnalysis] = []
        index: int = 0
        for chunk in chunks:
            roast = agent_think.roast_chunk(client, chunk)
            chunks_analysis.append(ResumeChunkAnalysis(index=index, chunk=chunk, roast=roast))
            index += 1
        # send response
        return ResumeResponse(valid=True, invalid_roast='none', result=chunks_analysis)
        