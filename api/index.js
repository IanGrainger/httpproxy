const axios = require("axios").default;

module.exports = async (req, res) => {
  console.log("req.body", req.body);
  const { url, method } = req.body;
  const methodResult = await axios.request({
    method: method,
    url,
    responseType: "json",
  });

  console.log("got method result", methodResult);
  res.status(200).send(methodResult);
};
