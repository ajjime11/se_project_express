module.exports = {
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "616818acb01ea5a076fecbe8e8b238f453d37193eda5def96a31f1c9bae7f21a",
  NODE_ENV: process.env.NODE_ENV || "development",
};
