const API_KEY = process.env.API_FOOTBALL_KEY || 'e2ec443674851ecb52aef5605084fe61';
const API_BASE = 'https://v3.football.api-sports.io';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { fixture } = req.query;
  if (!fixture) return res.status(400).json({ error: 'fixture param required' });

  try {
    const response = await fetch(`${API_BASE}/predictions?fixture=${fixture}`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message, response: [] });
  }
};
