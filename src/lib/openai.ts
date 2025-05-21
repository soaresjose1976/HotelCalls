import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (
  prompt: string,
  personality: string,
  context: string
) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI voice agent with the following personality: ${personality}. 
                   Respond in a conversational manner while maintaining this personality.`
        },
        {
          role: "user",
          content: `Context: ${context}\n\nUser: ${prompt}`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};
