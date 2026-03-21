const API_KEY = process.env.API_FOOTBALL_KEY || 'e2ec443674851ecb52aef5605084fe61';
const API_BASE = 'https://v3.football.api-sports.io';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const params = new URLSearchParams(req.query).toString();
  const url = `${API_BASE}/fixtures${params ? '?' + params : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message, response: [] });
  }
};
