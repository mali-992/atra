import { useEffect, useState } from "react";
import { getAll } from "../../services/countriesSnapshot.sevice";
import { createCountry } from "../../services/countries.service";

export default function CountriesSnapshot() {
  const [countriesData, setCountriesData] = useState();
  useEffect(() => {
    const init = async () => {
      try {
        const result = await getAll();
        setCountriesData(result);
      } catch (error) {
        alert(error);
      }
    };
    init();
  }, []);
  const addCountryHandler = async (country) => {
    try {
      await createCountry({ name: country.Country });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      {countriesData ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Country</th>
              <th scope="col">Total Confirmed</th>
              <th scope="col">Total Deaths</th>
              <th scope="col">Total Recovered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {countriesData.map((country, index) => {
              return (
                <tr key={index}>
                  <td>{country.Country}</td>
                  <td>{country.TotalConfirmed}</td>
                  <td>{country.TotalDeaths}</td>
                  <td>{country.TotalRecovered}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-sm btn-primary"
                      onClick={() => addCountryHandler(country)}
                    >
                      add country to my list
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}{" "}
    </div>
  );
}
