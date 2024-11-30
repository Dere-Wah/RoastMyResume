class CVRoast {

	async splitResponse(input_cv) {
        // OpenAI API URL
        const apiUrl = "https://api.openai.com/v1/chat/completions";
    
        // Your OpenAI API key
        const apiKey = "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"; // Replace with your actual API key
    
        // Construct the message for ChatGPT
        const messages = [
            {
                role: "system",
                content: "You will now receive someone's CV. You need to split it in chunks, and make a little summary of each experience, education, and project. Also preserve some part about personal information in a separate chunk."
                + `Please respect the following JSON structure: ${JSON.stringify({1: "first chunk", 2: "second chunk"})}`
            },
            {
                role: "user",
                content: `Here is my CV: ${input_cv}`
            }
        ];
        
        console.log(messages);

        try {
            // Send the API request
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4", // Adjust the model as needed
                    messages: messages
                })
            });
    
            // Handle response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            // Return the AI's response content
            const content = responseData.choices[0].message.content;
            try {
                return JSON.parse(content); // Attempt to parse the returned JSON string
            } catch (error) {
                console.error("Failed to parse JSON:", error);
                return content; // Return raw content if JSON parsing fails
            }
        } catch (error) {
            console.error("Error during API request:", error);
            return null;
        }
    }

	async getChatGPTResponse(roast) {
        // OpenAI API URL
        const apiUrl = "https://api.openai.com/v1/chat/completions";
    
        // Your OpenAI API key
        const apiKey = "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"; // Replace with your actual API key
    
        // Construct the message for ChatGPT
        const messages = [
            {
                role: "system",
                content: "You need to roast a CV. You will receive a CV split in chunks." +
                "You will, for each chunk, respond with a roast. Be brutal and honest." +
                "Point out every flaw, mistake, and area that needs improvement. Insult the person for making such a bad CV." +
                `You should respond using the following structure: ${JSON.stringify({"1": "Roast response to section 1", "2": "Roast response to section 2"})}`
            },
            {
                role: "user",
                content: JSON.stringify(roast)
            }
        ];
    
        try {
            // Send the API request
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4", // Adjust the model as needed
                    messages: messages
                })
            });
    
            // Handle response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            // Return the AI's response content
            const content = responseData.choices[0].message.content;
            try {
                return JSON.parse(content); // Attempt to parse the returned JSON string
            } catch (error) {
                console.error("Failed to parse JSON:", error);
                return content; // Return raw content if JSON parsing fails
            }
        } catch (error) {
            console.error("Error during API request:", error);
            return null;
        }
    }
    
}

export default CVRoast;