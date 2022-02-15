const { query } = require('express');
const db = require('../db/db');
//bringing in the object we exported that has a .query method to query the pool

const starWarsController = {};

starWarsController.getCharacters = (req, res, next) => {
  // write code here
  const sqlQuery = `SELECT p.name, p.gender, s.name AS species, p.mass, p.height, p.species_id, p.birth_year, p.eye_color, p.hair_color, p.skin_color, plan.name AS homeworld, p.homeworld_id, json_agg(json_build_object('title', f.title, 'id', f._id)) AS films
  FROM people p LEFT OUTER JOIN species s
    ON s._id = p.species_id
  LEFT OUTER JOIN planets plan
    ON p.homeworld_id = plan._id
  LEFT OUTER JOIN people_in_films pif
    ON p._id = pif.person_id
  LEFT OUTER JOIN films f
    ON pif.film_id = f._id
  GROUP BY p.name, p.gender, s.name, p.species_id, p.birth_year, p.eye_color, p.hair_color, plan.name, p.homeworld_id, p.height, p.skin_color, p.mass`;
  db.query(sqlQuery)
    .then(data => {
      res.locals = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get names from database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};


starWarsController.getSpecies = (req, res, next) => {
  // write code here
  const id = req.query.id;
  console.log(id);
  const SQL_species_info = `SELECT s.average_height, s.average_lifespan, s.language, s.name, s.classification, p.name AS homeworld
  FROM species s LEFT OUTER JOIN planets p
    ON s.homeworld_id = p._id
  WHERE s._id = $1`;
  db.query(SQL_species_info, [id])
    .then((data) => {
      res.locals = data.rows[0];
      next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get species from database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

starWarsController.getHomeworld = (req, res, next) => {
  // write code here
  const id = req.query.id;
  const SQL_planet_info = `
    SELECT *
    FROM planets
    WHERE _id = $1`;
  db.query(SQL_planet_info, [id])
    .then((data) => {
      res.locals = data.rows[0];
      next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get homeworld from database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

starWarsController.getFilm = (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  const SQL_film_info = `
    SELECT *
    FROM films
    WHERE _id = ${id}`;
  db.query(SQL_film_info)
    .then((data) => {
      res.locals = data.rows[0];
      next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get film from database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

starWarsController.addCharacter = (req, res, next) => {
  // write code here
  const {name, gender, species_id, birth_year,
    eye_color, skin_color, hair_color, mass, height, homeworld_id} = req.body;
    //nums: species_id, height, homeworld_id
  const SQL_add_char = `INSERT INTO people (name, mass, hair_color,
    skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height)
    VALUES ($1, $2, $3,
    $4, $5, $6, $7, $8, $9, $10)
    RETURNING _id;`;
  db.query(SQL_add_char,[name, mass, hair_color,
    skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height],(err, sqlRes) => {
    if(err) {
      return next({
        log: `Cannot add name to database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    } else {
      const sqlAddFilmForChar = `
      INSERT INTO people_in_films (person_id, film_id)
      VALUES ($1, $2)`;
      const filmPromise = req.body.films.map((cur) => db.query(sqlAddFilmForChar,[sqlRes.rows[0]._id,cur.id]));
      Promise.all(filmPromise)
        .then(() => next())
        .catch((err) => {
          return next({
            log: `Cannot add films to database Err: ${err}`,
            status: 400,
            message: { err: 'An error occurred' },
          });
        });
    }
  });
};

starWarsController.deleteCharacter = (req, res, next) =>{
  console.log('id params', req.params.id);
  const deletePromiseArr = [];
  const sqlDeletePerson = 'DELETE FROM people WHERE _id = $1;';
  deletePromiseArr.push(db.query(sqlDeletePerson, [req.params.id]));

  const sqlDeleteFilmPerson = 'DELETE FROM people_in_films WHERE person_id = $1;';
  deletePromiseArr.push(db.query(sqlDeleteFilmPerson, [req.params.id]));

  return Promise.all(deletePromiseArr)
    .then((queryResponse) => {
      res.locals = queryResponse.map((curr) => curr.rowCount);
      return next();
    })
    .catch((err) => {
      return next({
        log: `Cannot delete character from database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = starWarsController;
