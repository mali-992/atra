import { useEffect, useState } from "react";
//import "./userCountriesList.css"
import { Button } from "react-bootstrap";
import UpdateCountry from "./UpdateCountry";
import {
  getCountries,
  updateCountry,
  deleteCountry,
  createCountry,
} from "../../services/countries.service";
import { getAll } from "../../services/countriesSnapshot.sevice";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddCountry from "./AddCountry";

export default function UserCountriesList() {
  const [countriesList, setCountriesList] = useState();
  const [list2, setList2] = useState();
  const [list3, setList3] = useState();
  useEffect(async () => {
    try {
      const res = await getCountries();
      setCountriesList(res.countries);
      const res2 = await getAll();
      setList2(res2);
    } catch (error) {}
  }, []);
  useEffect(() => {
    let arr = [];
    if (countriesList) {
      countriesList.forEach((element) => {
        const objData =
          list2[list2.findIndex((x) => x.Country === element.name)];
        let obj = {
          id: element._id,
          name: element.name,
          data: list2[list2.findIndex((x) => x.Country === element.name)],
        };
        arr = [...arr, obj];
      });
    }
    setList3([...arr]);
  }, [list2]);
  const updateHandler = async (id, values) => {
    try {
      await updateCountry(id, values);
      const updatedList = list3.map((element) =>
        element.id === id
          ? {
              ...element,
              ...values,
              data: list2[list2.findIndex((x) => x.Country === values.name)],
            }
          : element
      );
      setList3([...updatedList]);
    } catch (error) {}
  };
  const deleteHandler = async (id, index) => {
    try {
      await deleteCountry(id);
      list3.splice(index, 1);
      setList3([...list3]);
    } catch (error) {
      console.log(error);
    }
  };
  const addHandler = async (country) => {
    try {
      const newCountry = await createCountry(country);
      list3.push({
        id: newCountry._id,
        name: newCountry.name,
        data: list2[list2.findIndex((x) => x.Country === newCountry.name)],
      });
      setList3([...list3])
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <ul>
          {list3
            ? list3.map((value, index) => {
                return (
                  <li key={index}>
                    <b> {`${value.name}, `}</b>
                    {value.data
                      ? `Data: total confirmed- ${value.data.TotalConfirmed}, total deaths- ${value.data.TotalDeaths}, Total recovered- ${value.data.TotalRecovered}`
                      : "no details"}

                    <RiDeleteBin6Line
                      onClick={() => {
                        deleteHandler(value.id, index);
                      }}
                      size={20}
                      color={"#ae0000"}
                      style={{marginBottom:"5px"}}
                    />
                    <UpdateCountry
                      updateHandler={updateHandler}
                      country={value}
                    />
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
      <AddCountry addHandler={addHandler} />
    </div>
  );
}
