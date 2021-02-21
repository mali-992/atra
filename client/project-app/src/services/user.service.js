const axios = require("axios");
const baseUrl = "http://localhost:3004/users";

function createRequest(currentUrl, values) {
  debugger;
  return axios.post(baseUrl + currentUrl, values).then((response) => {
    if (response.status >= 300 || response.status < 200) {
      throw response;
    }
    return response.data;
  });

}
const signup = (values) => {
 return createRequest("/signup", values);
};
const login = (values) => {
  return createRequest("/login", values);
};

export { signup, login };
