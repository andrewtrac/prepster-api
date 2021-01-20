const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    return db
      .query(
        `
  SELECT * FROM questions;
  `
      )
      .then((data) => res.json(data.rows));
  });


  router.get("/:id", (req, res) => {

    return db
      .query(
        `
  SELECT * FROM questions
  WHERE $1 = ANY(categories);
  `,
        [req.params.id]
      )
      .then((questions) => res.json(questions.rows));
  });

  return router;
};
