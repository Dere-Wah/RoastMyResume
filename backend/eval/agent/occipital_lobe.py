from openai import OpenAI
from ...models.data_models import ResumeImage


# Function to describe images with OpenAI
def describe_image(client: OpenAI, base64_image: bytes) -> ResumeImage:
    
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "You are a resume critic specializing in visual elements."},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Here is an image from a resume (Base64 encoded). Provide a detailed and critical analysis.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        response_format=ResumeImage,
    )
    
    result = completion.choices[0].message.parsed
    return result

