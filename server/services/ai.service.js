const axios = require('axios');

exports.generateName = async (idea) => {
  const prompt = `Generate a cool, brandable, startup-style name for this idea: "${idea}". Only return the name.`;

  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: 'text-davinci-003',
    prompt,
    max_tokens: 10,
    temperature: 0.8,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
  });

  return response.data.choices[0].text.trim();
};
