const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id'", (req, res) => {
    const questionCategory = req.params.id;

    return db
      .query(
        `
  SELECT * FROM users
  WHERE $1=ANY(categories)
  `,
        [questionCategory]
      )
      .then((questions) => res.json(questions.rows));
  });

  return router;
};
