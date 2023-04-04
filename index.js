import OPEN_API_KEY from './apikey.js'

const inputQuestionGPT = document.querySelector('#question');
const resultQuestionGPT = document.querySelector('#result');
const resultQuestionGPTT = document.querySelector('#resultGPT');
const buttonSendQuestion = document.querySelector('#send-question')

inputQuestionGPT.addEventListener('keypress', (event) => {
    if (inputQuestionGPT.value && event.key === 'Enter') {
        sendQuestion();
    }
});
buttonSendQuestion.addEventListener('click', (event) => {
    sendQuestion();
})

function sendQuestion() {
    const question = inputQuestionGPT.value;

    let promise = fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${OPEN_API_KEY}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: question,
            max_tokens: 2048, // Tamanho da Resposta
            temperature: 0.5, // Criatividade da API 
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        if (resultQuestionGPT.innerHTML){
            resultQuestionGPT.innerHTML += '\n';
        };
        if (json.error?.message) {
            resultQuestionGPT.innerHTML += `Error: ${json.error.mesage}`;
        } else if (json.choices?.[0].text) {
            const text = json.choices[0].text || 'Sem resposta';
            resultQuestionGPTT.innerHTML = `Chat GPT: ${text}`;
        };
        resultQuestionGPT.scrollTop = resultQuestionGPT.scrollHeight;
    })
    .catch((error) => console.error(`Error: ${error}`))
    .finally(() => {
        inputQuestionGPT.value = ''
        inputQuestionGPT.readonly = true;
    })
    if (resultQuestionGPT) {
        resultQuestionGPT.innerHTML += '\n\n\n';
    }
    resultQuestionGPT.innerHTML = `Eu: ${question}`;
    inputQuestionGPT.value = 'Carregando...';
    
    resultQuestionGPT.scrollTop = resultQuestionGPT.scrollHeight;
}