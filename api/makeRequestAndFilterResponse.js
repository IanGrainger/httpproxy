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
  console.log("running, RFA", responseFilterArray);
  console.log("running, RFA.length", responseFilterArray.length);
  console.log("length of resp", methodResult.data[responseFilterRoot].length);
  if (responseFilterArray.length > 0 && methodResult.data) {
    const dataArray = responseFilterRoot
      ? methodResult.data[responseFilterRoot]
      : methodResult.data;
    resultArr = dataArray.map((data) => {
      // todo: make this back into an object!
      const thisObj = responseFilterArray
        .map((filter) => [filter, resolve(filter, data)])
        .reduce((map, [key, val]) => ({ ...map, [key]: val }), {});
      return thisObj;
    });
  }
  return resultArr;
}

function resolve(path, obj = self, separator = ".") {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

exports.makeRequestAndFilterResponse = makeRequestAndFilterResponse;
