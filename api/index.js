const axios = require("axios").default;

module.exports = async (req, res) => {
  // const { name = "World" } = req.query;
  if (req.method === "GET") {
    return handleGet(res);
  }

  if (req.method === "POST") {
    return await handlePost(req, res);
  }
};

async function handleGet(res) {
  res
    .status(200)
    .send('Please POST with {method: "PATCH", url: "https://url"}');
  return true;
}

async function handlePost(req, res) {
  const { url, method } = req.body;
  console.log("url", url, "method", method);
  const methodResult = await axios.request({
    method: method,
    url: url,
    responseType: "json",
  });
  console.log("got result", methodResult);
  res.status(200).send("Ok");
  return "Ok";
}
