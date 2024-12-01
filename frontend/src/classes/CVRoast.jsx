const backend = "https://backend.derewah.dev"


const test_roast = {
  "valid": true,
  "invalid_roast": "nope",
  "result": [
    {
      "index": 1,
      "category": "profile",
      "summary": "Davide Locatelli is a Computer Engineering student at Politecnico di Milano, with a background from Liceo Scientifico Lorenzo Mascheroni, listing a basic contact email and a personal portfolio website.",
      "roast": "Putting an academic institution on your resume doesn’t make you a genius; it just means you haven't dropped out yet.",
      "suggestion": "Consider including a brief personal summary or objective to give a sense of your career aspirations.",
      "short_impactful_ironic_insult": "Einstein called, he says 'Keep trying.'"
    },
    {
      "index": 2,
      "category": "education",
      "summary": "Education section lists Politecnico di Milano (ongoing) and a Liceo Scientifico diploma.",
      "roast": "Congratulations on your two entries, one of which is just 'high school but fancier.'",
      "suggestion": "Highlight any notable academic achievements or coursework relevant to your projects.",
      "short_impactful_ironic_insult": "Ah yes, 'the basics.'"
    },
    {
      "index": 3,
      "category": "experience",
      "summary": "Davide worked on AI-based projects including an AI-generated Spongebob script simulator, Reddit-to-YouTube shorts generator, and React-based web games.",
      "roast": "AI SpongeBob? Bold of you to think AI wants to live under the sea, let alone near you.",
      "suggestion": "Quantify the impact of these projects (e.g., user base, views, community size).",
      "short_impactful_ironic_insult": "Who lives in a pineapple and doesn't care? This AI."
    },
    {
      "index": 4,
      "category": "freelance work",
      "summary": "Davide has freelanced as a Java developer on Fiverr, focusing on Minecraft plugins and scripts with over 50 5-star reviews.",
      "roast": "A true digital blacksmith, forging code in the fires of... Minecraft? Is it Java or just blocky dreams?",
      "suggestion": "Mention specific client problems you solved or unique features you implemented.",
      "short_impactful_ironic_insult": "Breaking blocks and breaking hearts, eh?"
    },
    {
      "index": 5,
      "category": "skills",
      "summary": "Lists technical skills like Python, Java, and React, along with interests like AI integrations and game development.",
      "roast": "You've got a tech stack as big as your ego, but where's the proof it holds up under pressure?",
      "suggestion": "Add certifications or projects that substantiate your proficiency in these skills.",
      "short_impactful_ironic_insult": "Skill lists are not infinity stones; calm down, Thanos."
    },
    {
      "index": 6,
      "category": "language and interests",
      "summary": "Fluent in Italian and English; interested in learning methodologies, AI, and open-source development.",
      "roast": "Learning to learn? That's just a fancy way of saying you procrastinate by watching YouTube tutorials.",
      "suggestion": "Tie these interests back to your professional work or specific examples of how you've pursued them.",
      "short_impactful_ironic_insult": "Google Translate approves."
    }
  ]
}


class CVRoast {

	async evaluateCV(text){
        try{
            return test_roast;
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