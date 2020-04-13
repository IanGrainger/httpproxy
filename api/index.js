const https = require('https');

// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });


module.exports = (req, res) => {
  const { name = 'World' } = req.query

  const {url, query, method} = req.body;

  res.status(200).send(`Hello ${name}!\nI got these params: ${url} ${query} ${method}`)
}