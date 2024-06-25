import axios from 'axios';

const API_KEY = 'sk-proj-CEBmVAcnf1mhwuT4dh0JT3BlbkFJLitJigw1eyorcnGrhgft';

export const sendMessageToChatGPT = async (message: string) => {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                // { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message },
            ],
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
        }
    );

  return response.data.choices[0].message.content;
};