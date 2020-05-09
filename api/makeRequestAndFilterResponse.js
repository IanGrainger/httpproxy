const axios = require("axios").default;
exports.axios = axios;

async function makeRequestAndFilterResponse(
  method,
  url,
  responseFilterArray,
  responseFilterRoot
) {
  const methodResult = await axios.request({
    method: method,
    url: url,
    responseType: "json",
  });
  var resultArr = [];

  if (
    responseFilterArray &&
    typeof responseFilterArray === "string" &&
    responseFilterArray[0] === "["
  ) {
    responseFilterArray = responseFilterArray
      .substr(1, responseFilterArray.length - 2)
      .split(", ");
    console.log(
      "RFA length after",
      responseFilterArray.length,
      "content",
      responseFilterArray
    );
  }

  if (
    responseFilterArray &&
    responseFilterArray.length &&
    responseFilterArray.length > 0 &&
    methodResult.data
  ) {
    const dataArray = responseFilterRoot
      ? methodResult.data[responseFilterRoot]
      : methodResult.data;
    resultArr = dataArray.map((data) =>
      responseFilterArray
        .map((filter) => [filter, resolve(filter, data)])
        .reduce((map, [key, val]) => ({ ...map, [key]: val }), {})
    );
  }

  return resultArr;
}

function resolve(path, obj = self, separator = ".") {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

exports.makeRequestAndFilterResponse = makeRequestAndFilterResponse;
