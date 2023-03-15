const express = require("express");

const router = express.Router();
const Model = require("../models/model");

router.post("/post", async (req, res) => {
  const data = new Model({
    First_name: req.body.First_name,
    Last_name: req.body.Last_name,
    Email: req.body.Email,
    Phone: req.body.Phone,
  });
  try {
    const savedata = await data.save();
    res.status(200).json(savedata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get(`/get/:id`, async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//updating by id
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedata = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedata, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//deleting by id
router.delete("/delete/:id", (req, res) => {
  try {
    const id = req.params.id;

    const data = Model.findByIdAndDelete(id);
    res.send(`Document with ${id} has been deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//filtering by name, last name, phone, email
router.get(`/filter/`, async (req, res) => {
  try {
    const namedata = await Model.find();

    const filters = req.query;

    const filteredUsers = namedata.filter((user) => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
