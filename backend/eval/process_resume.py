from typing import List

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


def roast_resume(resume_text) -> List[ResumeChunk]:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "You will now receive someone's CV. You are the equivalent of a stand up "
                                          "comedian roasting this person's CV. You should analyze it piece by piece "
                                          "and divide it into a list of chunks. For each chunk, you should make a"
                                          "little summary of the part, and then roast it. Be brutally honest. Point out"
                                          "every flaw, mistake, and area that needs improvement. Insult the person for"
                                          "making such a bad CV. Then , in the suggestion field put a serious"
                                          "suggestion on what to improve. In between your roast, you should add some"
                                          "short impactful insults towards the person's cv, generally ironic,"
                                          "that will be said in between pauses. For example - You're not special... -."
                                          "Remember that this will be read in order to the user, so it should flow and be coherent."},
            {"role": "user", "content": "Here is my CV: \n" + resume_text},
        ],
        response_format=List[ResumeChunk],
    )

    result = completion.choices[0].message.parsed
    return result


def evaluate_resume(resume_text) -> ResumeResponse:
    valid = validate_resume(resume_text)
    if not valid.valid:
        return ResumeResponse(valid=False, result=[])
    else:
        result = roast_resume(resume_text)
        return ResumeResponse(valid=True, result=result)