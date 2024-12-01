from openai import OpenAI
from ...models.data_models import IsValidResumeText, ResumeChunk, ResumeResponse


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


def obtain_chunk_from_text(client: OpenAI, chunk_text: str) -> ResumeChunk:
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
        response_format=ResumeChunk,
    )

    result = completion.choices[0].message.parsed
    return result
    


def roast_chunk(client: OpenAI, chunk: ResumeChunk) -> ResumeRoast:
    """given resume chunk analyze it and return roasting about that specific chunk"""
    
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a brutally honest resume critic. Your job is to analyze resume chunks "
                    "and provide: 1) a roasting critique. Be merciless, sarcastic, and focus on pointing out "
                    "every flaw, mistake, and area that needs improvement. Make the critique engaging and witty."
                    "2) a constructive suggestion, written with a helpful tone, explaining how the user "
                    "can effectively improve this section of the resume."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Roast this CV chunk. Category: {chunk.category}. Summary: {chunk.summary}."
                    "Be brutally honest and highlight why this part is poorly written "
                    "or not effective. Include specific suggestions for improvement."
                ),
            },
        ],
        response_format=ResumeRoast,
    )

    result = completion.choices[0].message.parsed
    return result