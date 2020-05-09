const axios = require("axios").default;

module.exports = async (req, res) => {
  // const { name = "World" } = req.query;
  if (req.method === "GET") {
    return handleGet(req, res);
  }

  if (req.method === "POST") {
    return await handlePost(req, res);
  }
};

function handleGet(req, res) {
  res
    .status(200)
    .send('Please POST with {method: "PATCH", url: "https://url"}');
  return true;
}

async function handlePost(req, res) {
  const { url, method, responseFilterArray = [] } = req.body;
  console.log(
    "url",
    url,
    "method",
    method,
    "responseFilterArray",
    responseFilterArray
  );

  const methodResult = await axios.request({
    method: method,
    url: url,
    responseType: "json",
  });
  console.log("got result", methodResult);

  var resultArr = [];
  if (
    responseFilterArray.length > 0 &&
    methodResult.data &&
    methodResult.data.length > 0
  ) {
    resultArr = methodResult.data.map((data) => {
      // todo: make this back into an object!
      return responseFilterArray.map((filter) => [filter, data[filter]]);
    });
  }

  var result = resultArr.length ? resultArr : "Ok";

  res.status(200).send(result);
  return "Ok";
}
