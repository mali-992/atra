const getAll = () => {
  return fetch("https://api.covid19api.com/summary", {
    mode: "cors",
  })
    .then((response) => {
      if (response.status >= 300 || response.status < 200) {
        throw response;
      }
      return response.json();
    })
    .then((result) => {
      debugger;
      return result.Countries;
    })
    .catch((error) => {
      throw error;
    });
};
  
export { getAll }
