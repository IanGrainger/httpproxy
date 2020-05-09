const {
  makeRequestAndFilterResponse,
} = require("./makeRequestAndFilterResponse");

const axios = require("axios").default;
exports.axios = axios;

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
  const {
    url,
    method,
    responseFilterRoot = "",
    responseFilterArray = [],
  } = req.body;
  console.log(
    "url",
    url,
    "method",
    method,
    "responseFilterRoot",
    responseFilterRoot,
    "responseFilterArray",
    responseFilterArray
  );

  var resultArr = await makeRequestAndFilterResponse(
    method,
    url,
    responseFilterArray,
    responseFilterRoot
  );

  var result = resultArr.length ? resultArr : "Ok";

  res.status(200).send(result);
  return "Ok";
}
