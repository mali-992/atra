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
  const [userList, setUserList] = useState();
  const [countriesList, setCountriesList] = useState();
  const [userListData, setUserListData] = useState();
  useEffect(async () => {
    try {
      const res = await getCountries();
      setUserList(res.countries);
      const res2 = await getAll();
      setCountriesList(res2);
    } catch (error) {
      alert(error);
    }
  }, []);
  useEffect(() => {
    let arr = [];
    if (userList) {
      userList.forEach((element) => {
        let obj = {
          id: element._id,
          name: element.name,
          data:
            countriesList[
              countriesList.findIndex((x) => x.Country === element.name)
            ],
        };
        arr = [...arr, obj];
      });
    }
    setUserListData([...arr]);
  }, [countriesList]);
  const updateHandler = async (id, values) => {
    try {
      await updateCountry(id, values);
      const updatedList = userListData.map((element) =>
        element.id === id
          ? {
              ...element,
              ...values,
              data:
                countriesList[
                  countriesList.findIndex((x) => x.Country === values.name)
                ],
            }
          : element
      );
      setUserListData([...updatedList]);
    } catch (error) {
      alert(error);
    }
  };
  const deleteHandler = async (id, index) => {
    try {
      await deleteCountry(id);
      userListData.splice(index, 1);
      setUserListData([...userListData]);
    } catch (error) {
      alert(error);
    }
  };
  const addHandler = async (country) => {
    try {
      const newCountry = await createCountry(country);
      userListData.push({
        id: newCountry._id,
        name: newCountry.name,
        data:
          countriesList[
            countriesList.findIndex((x) => x.Country === newCountry.name)
          ],
      });
      setUserListData([...userListData]);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <div>
        <ul>
          {userListData
            ? userListData.map((value, index) => {
                return (
                  <li key={index}>
                    <b style={{ textDecoration: "underline" }}>{value.name}</b>
                    {" Data: "}
                    {value.data
                      ? `total confirmed- ${value.data.TotalConfirmed}, total deaths- ${value.data.TotalDeaths}, Total recovered- ${value.data.TotalRecovered}`
                      : "no details"}

                    <RiDeleteBin6Line
                      onClick={() => {
                        deleteHandler(value.id, index);
                      }}
                      size={20}
                      color={"#ae0000"}
                      style={{ marginBottom: "5px" }}
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
