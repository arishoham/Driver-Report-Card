const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');
const db = require('../db/db');

const carController = {};

//Get car info
carController.getInfo = async (req, res, next) => {
  try {
    //Check if the car's info is in the database
    const { pn, ps } = req.query;
    const sqlQuery = `SELECT * FROM Cars
    WHERE plate_number = $1 AND plate_state = $2`;
    const { rows } = await db.query(sqlQuery, [pn, ps]);
    res.locals.carInfo = {};

    // If the car is not in the db, get it from findbyplate.com
    if (!rows.length) {
      const data = await fetch(`https://findbyplate.com/US/${ps}/${pn}/`);
      const dataText = await data.text();
      const dom = HTMLParser.parse(dataText);
      //Get vehicle name
      if (dom.querySelector('.vehicle-modal')) {
        res.locals.carInfo.name = dom.querySelector('.vehicle-modal').innerHTML;
      } else {
        res.locals.carInfo.name = 'No Car Found';
      }
      // Add it to the database
      const sqlQuery = `INSERT INTO Cars (plate_number, plate_state, name)
      VALUES ($1, $2, $3)`;
      await db.query(sqlQuery, [pn, ps, res.locals.carInfo.name]);
    } else {
      res.locals.carInfo.name = rows[0].name;
    }
    res.locals.carInfo.pn = pn;
    res.locals.carInfo.ps = ps;
    return next();
  } catch (err) {
    return next({
      log: `Cannot get car info from findbyplate Err: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

carController.getImage = (req, res, next) => {
  const { pn, ps } = res.locals.carInfo;
  res.locals.carInfo.img = `https://cdn.findbyplate.com/US/${ps}/${pn}.jpg`;
  return next();
};

module.exports = carController;
