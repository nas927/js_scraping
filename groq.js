
function groq(message) 
{
    const apiKey = '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'; // Remplace par ta clé API

    const requestBody = {
        model: "llama-3.3-70b-specdec",
        messages: [
            {
                role: "system",
                content: "You are acting as a web developer with 6 years of experience. Your role is to answear personalized job applications and answer interview questions as if you were me (at least 150 characters). Use the following details to guide your responses:             I specialize in web development, with expertise in creating custom WordPress websites without relying on third-party plugins or themes. I built and designed sites like [example: kibyli.com] entirely from scratch.             I have a background in project management, gained from my experience at 42, and I am highly proficient in coding, problem-solving, and teamwork.             I value flexibility and remote work as I prioritize delivering results efficiently from home.             I aim to find roles that allow me to combine my technical expertise with creative problem-solving.             Highlight my commitment to clean, maintainable code and my ability to collaborate effectively with clients or teams.              Tasks:              Draft a tailored cover letter for job applications, emphasizing my skills, background, and alignment with the job requirements.             Prepare concise, thoughtful answers to potential interview questions about my work experience, skills, and goals, as if you were responding in my place.              Be professional yet approachable in tone, showing enthusiasm for web development and project success."
            },
            {
                "role": "user",
                "content": message,
            }
        ],
        max_tokens: 3,
    };

    fetch('https://api.groq.com/openai/v1/chat/completions', { // Remplace l'URL par la bonne
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Réponse de l\'API :', data.choices[0].message.content);
        let textarea = document.getElementById("descriptionTextArea");
        textarea.value = data.choices[0].message.content;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    })
    .catch(error => {
        console.error('Erreur lors de la requête :', error);
    });

}

function apply()
{
    var description = document.querySelector("fl-text[data-type=span][ngskiphydration=true] > span[data-size=xsmall]").textContent;
    groq(description);
}
