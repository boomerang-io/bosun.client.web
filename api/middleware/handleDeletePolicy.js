module.exports = (req, res, next) => {
  if (req.method === "DELETE" && req.originalUrl.startsWith("/citadel/policies")) {
    return res.status(200).send({ status: "OK", id: "5d010d5b53e95e0001b72e35", name: "Test Policy", description: "Policy deleted" });
  }
  next();
};