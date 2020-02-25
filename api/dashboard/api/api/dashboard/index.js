const axios = require("axios");

function main() {
  axios
    .post("https://trade-service.wealthsimple.com/auth/login", {
      email: "xturnermonty@gmail.com",
      password: ""
    })
    .then(data => {
      console.log("LOGIN", data.headers);

      const accessToken = data.headers["x-access-token"];

      console.log("access", accessToken);

      axios
        .get("https://trade-service.wealthsimple.com/account", {
          headers: {
            Authorization: accessToken
          }
        })
        .then(data => {
          console.log("RES", data.data, data.headers);
        })
        .catch(err => {
          console.log("ERR", err);
        });
    });
}

main();
