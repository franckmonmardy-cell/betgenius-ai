const https = require('https');
const API_KEY = process.env.API_FOOTBALL_KEY || 'e2ec443674851ecb52aef5605084fe61';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const data = await apiCall('/fixtures?live=all');
    res.setHeader('Cache-Control', 's-maxage=30');
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message, response: [] });
  }
};

function apiCall(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'v3.football.api-sports.io',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}
