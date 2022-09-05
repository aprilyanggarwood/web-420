const express = require("express");
const router = express.Router();

router.get("/composers", async (req, res) => {
  const composers = [
    {
      firstName: "Richard",
      lastName: "Krasso",
    },
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      firstName: "William",
      lastName: "Smith",
    },
    {
      firstName: "Maricela",
      lastName: "Molgado",
    },
  ];
  res.json(composers);
});

module.exports = router;
