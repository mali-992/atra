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
const getByCountryName = async (countryName) => {
  //   let country="kk";
  //   try {
  //     const countries = await getAll();
  //     debugger;
  //     countries.forEach((element) => {
  //       if (element.name === countryName){country= element} ;
  //     });
  //   } catch (error) {}
  //  return country
  return getAll().then((countries) => {
    let country=null
    countries.forEach((element) => {
      if (element.name === countryName) {
        country = element;
      }
    });
return country
  });
};
export { getAll, getByCountryName };
