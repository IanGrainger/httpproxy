const axios = require("axios").default;

module.exports = async (req, res) => {
  // const { name = "World" } = req.query;
  if (req.method === "GET") {
    res
      .status(200)
      .send('Please POST with {method: "PATCH", url: "https://url"}');
    return true;
  }

  const { url, method } = JSON.parse(req.body);
  console.log("url", url, "method", method);
  const methodResult = await axios.request({
    method: method,
    url: url,
    responseType: "json",
  });
  console.log("got result", methodResult);

  res.status(200).send(`Yeah`);
};
