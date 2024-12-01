const backend = "https://backend.derewah.dev"


class CVRoast {

	async evaluateCV(text){
        try{
            const response = await fetch(`${backend}/rmr/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resume: {text}
                })
            });

            const data = await response.json();
            return data;
        } catch (error){
            console.error("Error during evaluation: ", error);
        }
    }
    
}

export default CVRoast;