const express = require("express");
const router = express.Router();

module.exports = (db) => {


  const addUser = (user, db) => {
    const email = user.email;
    const password = user.password;


    const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2);    `;

    return db
      .query(query, [email, password])
      .then((res) => res.rows[0])
      .catch((err) => err);
  };

  const loginUser = (user, db) => {
    const email = user.email;

    const query = `
    SELECT * FROM users
    WHERE email = $1;
    `;

    return db
      .query(query, [email])
      .then((res) => res.rows[0])
      .catch((err) => err);
  };

  router.get("/", (req, res) => {
    return db
      .query(
        `
  SELECT * FROM users;
  `
      )
      .then((data) => res.json(data.rows));
  });

  router.get("/name", (req, res) => {
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


  router.post("/authenticate", (req, res) => {
    loginUser(req.body, db).then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      } else {
        res.send(user)
      }
    });
  });

  router.post("/", (req, res) => {
    addUser(req.body, db).then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.user_id = user.id;
      res.redirect("/");
    });
  });

  return router;
};
