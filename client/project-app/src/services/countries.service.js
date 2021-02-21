const axios = require("axios");
const baseUrl = "http://localhost:3004/countries";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

function createGetRequest(currentUrl = "") {
  return axios.get(baseUrl + currentUrl, config()).then((response) => {
    debugger;
    if (response.status >= 300 || response.status < 200) {
      throw response;
    }
    return response.data;
  });
}
const getCountries = () => {
  return createGetRequest();
};

const createCountry = (country) => {
  return axios.post(baseUrl, country, config()).then((response) => {
    if (response.status >= 300 || response.status < 200) {
      throw response;
    }
    return response.data;
  });
};
const updateCountry = (id, country) => {
  return axios.put(`${baseUrl}/${id}`, country, config()).then((response) => {
    if (response.status >= 300 || response.status < 200) {
      throw response;
    }
    return response;
  });
};
const deleteCountry = (id) => {
  debugger;
  return axios.delete(`${baseUrl}/${id}`, config()).then((response) => {
    if (response.status >= 300 || response.status < 200) {
      throw response;
    }
    return response;
  });
};

export { getCountries, createCountry, updateCountry, deleteCountry };
