const axios = require("axios").default;

module.exports = async (req, res) => {
  console.log("req.body", req.body);
  const { url, query, method } = JSON.parse(req.body);
  //ignoring query!
  const methodResult = await axios.request({
    method: method,
    url,
    responseType: "json",
  });

  res
    .status(200)
    .send(
      `Hello ${name}!\nbody ${req.body}\nI got these params: ${url} ${query} ${method}\nAnd this result ${methodResult}`
    );
};
