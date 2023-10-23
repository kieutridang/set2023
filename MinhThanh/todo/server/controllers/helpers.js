const crypto = require("crypto");

function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  return hash.update(password).digest("hex");
}

function handleAuthResponse(response, isSuccessful = false) {
  const data = {
    status: isSuccessful ? "success" : "fail",
  };
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(data));
}

module.exports = {
  handleAuthResponse,
  hashPassword,
};
