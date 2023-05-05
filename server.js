const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtAuthz = require("express-jwt-authz");
const apiAuthConfig = require("./api_auth_config.json");
const app = express();
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static(join(__dirname, "public")));

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

process.on("SIGINT", function() {
  process.exit();
});

if (!apiAuthConfig.domain || !apiAuthConfig.audience) {
  console.log("Please make sure that api_auth_config.json is in place and populated");
}
else {
  
  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${apiAuthConfig.domain}/.well-known/jwks.json`,
    }),
    audience: apiAuthConfig.audience,
    issuer: `https://${apiAuthConfig.domain}/`,
    algorithms: ["RS256"],
  });

  const checkPermissions = jwtAuthz(apiAuthConfig.permissions, {
    customScopeKey: "permissions",
    failWithError: true,
  });
  
  app.get("/api/public", (req, res) => {
    let results = {
      success: true,
      message: "This is the Public API, Anyone can request this",
    };
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results));
  });
  
  
  app.get("/auth_config.json", (req, res) => {
    res.sendFile(join(__dirname, "auth_config.json"));
  });

  app.get("/*", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
  });

  app.use(function (err, req, res, next) {
    if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    if (err.name === "UnauthorizedError") {
      return res.status(401).send({success: false, message: "Invalid Access Token"});
    }

    if (err.statusCode == 403) {
      return res.status(403).send({success: false, message: "Access Token has Insufficient Scope"});
    }
  
  next(err, req, res);
});
  
  
  
}


module.exports = app;
