from typing import List

from openai import OpenAI
from models.data_models import IsValidResumeText, ResumeChunks, ResumeResponse


def validate_resume(client: OpenAI, resume_text: str) -> IsValidResumeText:
    """given resume text analyze it and return data model about its validity as a resume"""
    
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": (
                    "Given the following resume text, declare if it is actually a resume or not."
                    "If it's not, write a brutally honest and sarcastic response roasting the user "
                    "for their inability to complete such a simple task. Focus on their lack of "
                    "attention to detail and suggest, in an exaggerated way, how they might "
                    "improve their basic skills before trying again."
                ),
            },
            {
                "role": "user",
                "content": resume_text,
            },
        ],
        response_format=IsValidResumeText,
    )

    result = completion.choices[0].message.parsed
    return result


def obtain_chunk_from_text(client: OpenAI, chunk_text: str) -> ResumeChunks:
    """given resume chunk analyze it and return a chunk in the correct format"""
    
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert in analyzing and categorizing resume content. "
                    "For each text chunk provided, identify the most appropriate category "
                    "Then, create a concise summary of the chunk."
                ),
            },
            {
                "role": "user",
                "content": f"Categorize and summarize the following resume chunk:\n\n{chunk_text}",
            },
        ],
        response_format=ResumeChunks,
    )

    result = completion.choices[0].message.parsed
    return result


def roast_resume(client:OpenAI, resume_text: str) -> ResumeChunks:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "You need to roast a CV. You will receive a CV split in chunks." +
                                          "You will, for each chunk, respond with a roast. Be brutal and honest." +
                                          "Point out every flaw, mistake, and area that needs improvement. "
                                          "Insult the person for making such a bad CV."},
            {"role": "user", "content": "Here is my CV: \n" + resume_text},
        ],
        response_format=ResumeChunks,
    )

    result = completion.choices[0].message.parsed
    return result
