import { PRIVATE_API_KEY } from '$env/static/private';

const url = 'https://datgpt.westeurope.inference.ml.azure.com/score?fbclid=IwAR3iRLUmLqLyfxoblyoPW1C1kkSHi-MHtHQiLdp_Hn7x5nwg1QQq1VxMo2M';

function fetchApi(questionInput, url) {
    return fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${PRIVATE_API_KEY}`
        },
        body: JSON.stringify(questionInput)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then((jsonData) => {
        return jsonData.answer;
    })
    .catch((error) => {
        console.error("Une erreur s'est produite :", error);
        throw error; // Rejeter l'erreur pour la gérer à un niveau supérieur si nécessaire
    });
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const question = formData.get("question");

        let questionInput = {
            chat_history: ['message'],
            question: question
        };

        try {
            var reponse_dat_gpt = await fetchApi(questionInput, url);
            return reponse_dat_gpt;
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }

        return {
            response: reponse_dat_gpt
        };
    },
};

