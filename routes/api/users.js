const express = require("express");
const uuid = require("uuid");
const users = require("../../Users");

const router = express.Router();

// get all users
router.get("/", (req, res) => {
  res.json(users);
});

//get single user
router.get("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

// Create User
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }
  users.push(newUser);
  res.json(users);
  // res.redirect("/");
});

// Update user
router.put("/:id", (req, res) => {
  const found = users.filter((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;

    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        (user.name = updateUser.name ? updateUser.name : user.name),
          (user.email = updateUser.email ? updateUser.email : user.email);

        res.json({ msg: "User updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});
// Delete User
router.delete("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "User deleted",
      users: users.filter((user) => user.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

module.exports = router;
