const backend = "https://spyfallbackend.derewah.dev"

class CVRoast {
    constructor(inputCV) {
		this.CV = inputCV;
        this.roasts = [
            "Your CV sucks ass.",
            "Why don't you find a job. Oh wait, that's why you're here.",
            "Touch some grass."
        ];
    }



	async eval(old_tweets, controversy_score) {
        try {
            // Make the API request to /eval endpoint
            const response = await fetch(`${backend}/eval`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author: this.author,
                    body: this.body,
                    deleted: this.deleted,
                    replies: this.replies,
                    old_tweets: old_tweets,
                    controversy_score: controversy_score
                })
            });

            // Wait for the response and parse it
            const data = await response.json();
            
            // Update the TweetElement instance with the response data
            this.banned = data.banned;
            this.controversial = data.controversial;
            this.replies = data.replies;
			this.followers = data.percentage_of_followers_gained_or_lost;
            this.controversy_score = data.controversy_score
        } catch (error) {
            console.error("Error during evaluation:", error);
        }
    }

}

export default CVRoast;