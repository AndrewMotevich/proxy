// **** INSTALL PACKAGES ****
// npm install http https
const http = require('http');
const https = require('https');

// const accessToken = '5fa9c05370aa75d1664db80c2cf8e70b';
const apiUrl = 'https://api.travelpayouts.com';

const server = http.createServer(async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const protocol = apiUrl.startsWith('https') ? https : http;
    const response = await new Promise(resolve => protocol.get(apiUrl + req.url, resolve));
    response.pipe(res);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Something went wrong');
  }
});

server.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});

// **** FETCH EXAMPLE ****
// fetch('http://localhost:3000/v2/prices/month-matrix?origin=DUB&destination=MOW&month=current month&sorting=price&one_way=true&currency=eur&market=ru&limit=30&page=1&token=5fa9c05370aa75d1664db80c2cf8e70b')
//   .then(res => res.json())
//   .then(res => console.log(res));
// **** FETCH CITIES ****
// fetch('http://localhost:3000/aviasales_resources/v3/cities.json?locale=en')
//   .then(res => res.json())
//   .then(res => console.log(res));

// **** START PROXY ****
// node proxy.js