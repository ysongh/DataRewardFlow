const OpenAI = require('openai');
 
const client = new OpenAI({
  baseURL: 'https://nilai-a779.nillion.network/v1',
  apiKey: process.env.NILAI_API_KEY || 'YOUR_API_KEY_HERE'
});

export const verifiedData = async (userData, targetData) => {
  const response = await client.chat.completions.create({
    model: 'meta-llama/Llama-3.1-8B-Instruct',
    messages: [
      {
        role: 'system',
        content: 'You are a story teller and writer.'
      },
      {
        role: 'user',
        content:  `Return true or false if ${userData} match with ${targetData}`
      }
    ],
    stream: false
  });

  console.log(`Signature: ${response.signature}`);
  console.log(`Response: ${response.choices[0].message.content}`);
  return response.choices[0].message.content;
}