//const backend = "https://backend.derewah.dev"
const backend = "http://127.0.0.1:8000"

const test_roast = {
	"valid": true,
	"invalid_roast": "",
	"result": {
		"chunks": [
			{
				"index": 0,
				"a_quote_from_the_cv_section_the_roast_is_about": "Header: Name, Email, Website",
				"roast": "bla",
				"suggestion": "Separate your name and contact information clearly. Use bullet points or lines to distinguish between elements. Your name should be the focus, not your website URL.",
				"typing_speed_milliseconds": 1200,
				"short_impactful_ironic_insult": "Is this a CV or a phishing attempt?"
			},
			{
				"index": 1,
				"a_quote_from_the_cv_section_the_roast_is_about": "Education Section",
				"roast": "Ah, education—the section where you showcase that you're not a complete ignoramus. But here you merely listed schools like you're checking off boxes on a grocery list. No details, no GPA, no notable courses, not even a sniff of a scholarship or honor. It's almost as if you're hiding how subpar you are!",
				"suggestion": "Add more details about your achievements during your education. Mention GPA if it's decent, relevant coursework, honors, or positions of responsibility held.",
				"typing_speed_milliseconds": 1300,
				"short_impactful_ironic_insult": "Congrats, you attended schools. Riveting!"
			},
			{
				"index": 2,
				"a_quote_from_the_cv_section_the_roast_is_about": "Experience and Projects: AI Generated Spongebob",
				"roast": "AI Generated Spongebob? Truly, the epitome of groundbreaking technological achievement! If creating transcriptions for a cartoon character is your magnum opus, then the world must be running out of problems to solve. Also, 'Managed community input' is just a fancy way to say you moderated comments, isn't it?",
				"suggestion": "Clearly describe the impact or uniqueness of your project. Focus more on the technical challenges you overcame. Make it relevant to a prospective employer.",
				"typing_speed_milliseconds": 1500,
				"short_impactful_ironic_insult": "From laughing at Spongebob to being one—what a career trajectory!"
			},
			{
				"index": 3,
				"a_quote_from_the_cv_section_the_roast_is_about": "AI Generated YT Shorts from Reddit",
				"roast": "Whoa, Davide, so you made YouTube Shorts from Reddit posts? Really pushing the boundaries of copying and pasting here, aren't we? Your innovation shines as brightly as a burnt-out bulb. And yeah, a Telegram Bot—groundbreaking!",
				"suggestion": "Emphasize the innovative aspects and technical challenges of the project. Use quantitative results to demonstrate success, like user engagement or process efficiency improvements.",
				"typing_speed_milliseconds": 1450,
				"short_impactful_ironic_insult": "Did someone order a side of originality with that redundancy?"
			},
			{
				"index": 4,
				"a_quote_from_the_cv_section_the_roast_is_about": "Web Games in React + Python Backend",
				"roast": "How compelling, you've made a social deduction game while missing the deduction on how to properly format a CV. You recreated games to teach yourself React because why not reinvent the wheel and make it square? Meanwhile, 'ranked #6/1500' is the participation trophy equivalent of the real world.",
				"suggestion": "Highlight the complexity and problem-solving aspects of your projects rather than just listing them. Explain the learning outcomes and potential scalability.",
				"typing_speed_milliseconds": 1600,
				"short_impactful_ironic_insult": "Game over: you've lost at CV writing!"
			},
			{
				"index": 5,
				"a_quote_from_the_cv_section_the_roast_is_about": "Leadership & Activities: Fiverr Java Software Developer",
				"roast": "Your grand title of 'Fiverr Java Software Developer' screams ambition. Actually, no, it quietly peeps gig economy desperation. Those '50+ 5-star reviews' sound like you might just have made more dummy accounts than sales. And let's not even start on the self-flattery of the 'Fiverr’s Choice award'.",
				"suggestion": "Focus on how this experience has prepared you for larger, more professional roles. Highlight specific skills developed and successful projects.",
				"typing_speed_milliseconds": 1250,
				"short_impactful_ironic_insult": "Five-star developer or a zero-star careerist?"
			},
			{
				"index": 6,
				"a_quote_from_the_cv_section_the_roast_is_about": "Skills & Interests",
				"roast": "Oh look, a garden-variety list of buzzwords you can find on any half-baked CV. You’re a polyglot in the languages of CSharp and Italian. Meanwhile, 'Learning to learn' as an interest—what does that even mean? Sounds more like you’re unsure of your own capabilities.",
				"suggestion": "Include tangible outcomes or projects that demonstrate these skills. Remove buzzwords that don't add real value. Interests should ideally relate to your professional growth.",
				"typing_speed_milliseconds": 1250,
				"short_impactful_ironic_insult": "Can 'learning to learn' teach you to write a decent CV?"
			}
		]
	}
}

class CVRoast {

	async evaluateCV(text){
        return test_roast;

        try{
            const response = await fetch(`${backend}/rmr/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resume: text
                })
            });

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error){
            console.error("Error during evaluation: ", error);
        }
    }
    
}

export default CVRoast;