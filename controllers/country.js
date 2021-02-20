const User = require("../models/user");
const Country = require("../models/country");

const getAll = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("countries");
    const countries = user.countries;
    res.status(200).json({ countries });
  } catch (error) {
    res.status(500).json({ error });
    console.log("kk")
  }
};
const createCountry = async (req, res) => {
  const { name } = req.body;
  userId=req.userId
  const country = new Country({ name, userId});
   try {
    const user = await User.findById(userId).populate("countries");
    let isExist=false
    if(user.countries){
        user.countries.forEach(element => {
            element? element.name===country.name?isExist=true:element:element
         });
    }
  
    if (!isExist) {
       const newCountry= await country.save();
        await User.updateOne(
          { _id: userId },
          { $push: { countries: newCountry._id } }
        );
    }
    res.status(200).json({ message: "created country" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
const updateCountry = async (req, res) => {
  const { id } = req.params;
  try {
    await Country.updateOne({ _id: id }, req.body);
    res.status(200).json({ message: "updated country" });
  } catch (error) {
      console.log(error)
    res.status(500).json({ error });
  }
};
const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    await User.updateOne(
        { _id: req.userId },
        { $pull: { countries: id } }
      );
    await Country.deleteOne({ _id: id }, req.body);
    
      res.status(200).json({ message: "delete country" });   
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = { getAll, createCountry, updateCountry, deleteCountry };
