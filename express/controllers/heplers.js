const crypto = require("crypto");

function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  return hash.update(password).digest("hex");
}

function handleAuthResponse(response, statusCode, isSuccessful = false, message = "") {
  const data = {
    status: isSuccessful ? "success" : "fail",

    message,
  };
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(data));
}

module.exports = {
  handleAuthResponse,
  hashPassword,
};
