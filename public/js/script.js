/* All support JS goes here */

/* Challenge 2: Protect The API Calls */
function handlePublicAPICall(baseUrl) {
  console.log("handlePublicAPICall()");
  document.getElementById("public").innerHTML = "";
  getJson(baseUrl + "/api/public", function (json) {
    document.getElementById("apiResultsDisplay").innerHTML = JSON.stringify(
      JSON.parse(json),
      null,
      4
    );
  });
}

function getJson(url, signIn, callback) {
  console.log("getJson('" + url + "')");
  document.getElementById("apiResultsDisplay").innerHTML = "";

  const httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url);
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4) {
      console.log(httpRequest.responseText);
      callback(httpRequest.responseText);
    }
  };
  httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
  httpRequest.responseType = "text";

  signIn.authClient.tokenManager
    .get("accessToken")
    .then(function (token) {
      console.log("Got access Token!");
      console.log(token);

      httpRequest.setRequestHeader("Authorization", "Bearer " + token.value);
      httpRequest.send();
    })
    .catch(function (err) {
      console.log("Unable to retrieve accessToken from local storage");
    });
}
/*
function handlePrivateAPICall(baseUrl, signIn) {
  console.log("handlePrivateAPICall()");
  document.getElementById("apiResultsDisplay").innerHTML = "";
  getJson(baseUrl + "/api/private", signIn, function (json) {
    document.getElementById("apiResultsDisplay").innerHTML = JSON.stringify(
      JSON.parse(json),
      null,
      4
    );
  });
}

function handleAccessAPICall(baseUrl, signIn) {
  console.log("handleAccessAPICall()");
  document.getElementById("apiResultsDisplay").innerHTML = "";
  getJson(baseUrl + "/api/access", signIn, function (json) {
    document.getElementById("apiResultsDisplay").innerHTML = JSON.stringify(
      JSON.parse(json),
      null,
      4
    );
  });
}
*/
function getJson(url, signIn, callback) {
  console.log("getJson('" + url + "')");
  document.getElementById("apiResultsDisplay").innerHTML = "";

  const httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url);
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4) {
      console.log(httpRequest.responseText);
      callback(httpRequest.responseText);
    }
  };
  httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
  httpRequest.responseType = "text";

  signIn.authClient.tokenManager
    .get("accessToken")
    .then(function (token) {
      console.log("Got access Token!");
      console.log(token);

      httpRequest.setRequestHeader("Authorization", "Bearer " + token.value);
      httpRequest.send();
    })
    .catch(function (err) {
      console.log("Unable to retrieve accessToken from local storage");
    });
}

// Display the challenge 2 Dashboard
function showChallenge2() {
  console.log("showChallenge2()");
  document.getElementById("challenge2Section").style =
    "width: 50%; float:left;";
  document.getElementById("challenge1Section").style =
    "width: 50%; float:right;";
}

/* sign in helpers */

function checkAndShowIdToken(signIn) {
  console.log("checkAndShowIdToken()");

  signIn.authClient.tokenManager
    .get("idToken")
    .then(function (token) {
      console.log("Got id Token!");
      // Token is valid
      signIn.authClient.token
        .verify(token)
        .then(function () {
          // the idToken is valid
          console.log("Token is Valid!");
          console.log(token);
          document.getElementById("idTokenDisplay").innerHTML = JSON.stringify(
            jwt_decode(token.value),
            null,
            4
          );
          showAccessToken(signIn);
          showLoggedInStuff(signIn);
          document.getElementById("showIdTokenTabBtn").click();
        })
        .catch(function (err) {
          console.log("Token is not valid!");
          showNotLoggedInStuff(signIn);
        });
    })
    .catch(function (err) {
      console.log("Unable to retrieve idToken from local storage");
      showNotLoggedInStuff(signIn);
    });
}

function showAccessToken(signIn) {
  console.log("showAccessToken()");

  signIn.authClient.tokenManager
    .get("accessToken")
    .then(function (token) {
      console.log("Got access Token!");
      console.log(token);
      document.getElementById("accessTokenDisplay").innerHTML = JSON.stringify(
        jwt_decode(token.value),
        null,
        4
      );
    })
    .catch(function (err) {
      console.log("Unable to retrieve accessToken from local storage");
    });
}

function showNotLoggedInStuff(signIn) {
  console.log("showNotLoggedInStuff()");
  //Show login stuff
  signIn.show();
  document.getElementById("signin-header").style.display = "block";
  //Hide post login stuff
  document.getElementById("okta-post-login-container").style.display = "none";
}

function showLoggedInStuff(signIn) {
  console.log("showLoggedInStuff()");
  //Hide login stuff
  signIn.hide();
  document.getElementById("signin-header").style.display = "none";
  //Show post login stuff
  document.getElementById("okta-post-login-container").style.display = "block";
}

function signOut(signIn) {
  console.log("signOut()");
  signIn.authClient.signOut({
    postLogoutRedirectUri: window.location.origin,
  });
}

/* UX helpers */
function openTokenTab(evt, tokenTabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tokenTabName).style.display = "block";
  evt.currentTarget.className += " active";
}

/* This mini lib is for formatting the JWT display */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = {
        exports: {},
      });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function (require, module, exports) {
        var chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        function InvalidCharacterError(message) {
          this.message = message;
        }
        InvalidCharacterError.prototype = new Error();
        InvalidCharacterError.prototype.name = "InvalidCharacterError";
        function polyfill(input) {
          var str = String(input).replace(/=+$/, "");
          if (str.length % 4 == 1) {
            throw new InvalidCharacterError(
              "'atob' failed: The string to be decoded is not correctly encoded."
            );
          }
          for (
            // initialize result and counters
            var bc = 0, bs, buffer, idx = 0, output = "";
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4)
              ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
              : 0
          ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
          }
          return output;
        }
        module.exports =
          (typeof window !== "undefined" &&
            window.atob &&
            window.atob.bind(window)) ||
          polyfill;
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        var atob = require("./atob");
        function b64DecodeUnicode(str) {
          return decodeURIComponent(
            atob(str).replace(/(.)/g, function (m, p) {
              var code = p.charCodeAt(0).toString(16).toUpperCase();
              if (code.length < 2) {
                code = "0" + code;
              }
              return "%" + code;
            })
          );
        }
        module.exports = function (str) {
          var output = str.replace(/-/g, "+").replace(/_/g, "/");
          switch (output.length % 4) {
            case 0:
              break;
            case 2:
              output += "==";
              break;
            case 3:
              output += "=";
              break;
            default:
              throw "Illegal base64url string!";
          }
          try {
            return b64DecodeUnicode(output);
          } catch (err) {
            return atob(output);
          }
        };
      },
      {
        "./atob": 1,
      },
    ],
    3: [
      function (require, module, exports) {
        "use strict";
        var base64_url_decode = require("./base64_url_decode");
        function InvalidTokenError(message) {
          this.message = message;
        }
        InvalidTokenError.prototype = new Error();
        InvalidTokenError.prototype.name = "InvalidTokenError";
        module.exports = function (token, options) {
          if (typeof token !== "string") {
            throw new InvalidTokenError("Invalid token specified");
          }
          options = options || {};
          var pos = options.header === true ? 0 : 1;
          try {
            return JSON.parse(base64_url_decode(token.split(".")[pos]));
          } catch (e) {
            throw new InvalidTokenError(
              "Invalid token specified: " + e.message
            );
          }
        };
        module.exports.InvalidTokenError = InvalidTokenError;
      },
      {
        "./base64_url_decode": 2,
      },
    ],
    4: [
      function (require, module, exports) {
        (function (global) {
          var jwt_decode = require("./lib/index");
          //use amd or just throught to window object.
          if (
            typeof global.window.define == "function" &&
            global.window.define.amd
          ) {
            global.window.define("jwt_decode", function () {
              return jwt_decode;
            });
          } else if (global.window) {
            global.window.jwt_decode = jwt_decode;
          }
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "./lib/index": 3,
      },
    ],
  },
  {},
  [4]
);
