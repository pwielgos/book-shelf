const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "bookshelf";`
    pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
  const status = req.body.currentStatus;
  const id = req.params.id;
  let queryString = `UPDATE "bookshelf" SET "Read"='Read' WHERE "id"=$1`;
  console.log(`Updating task ${id} with `, status);
  pool.query(queryString, [id])
    .then((result) => {
      res.sendStatus(200);
    }).catch((err) => {
      res.sendStatus(500);
    })
});

module.exports = router;