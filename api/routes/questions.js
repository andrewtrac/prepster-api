const express = require("express");
const router = express.Router();

module.exports = (db) => {


  router.get("/questions", (req, res) => {
    const userID = req.session.user_id;

    return db
      .query(
        `
  SELECT name FROM users
  WHERE id = $1;
  `,
        [userID]
      )
      .then((user) => res.json(user.rows));
  });


  return router;
};
