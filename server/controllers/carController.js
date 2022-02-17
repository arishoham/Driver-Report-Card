const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

const carController = {};


//get all comments for a car
carController.getInfo = async (req, res, next) => {
  try {
    const {pn, ps} = req.query;
    const data = await fetch(`https://findbyplate.com/US/${ps}/${pn}/`);
    const dataText = await data.text();
    const dom = HTMLParser.parse(dataText);
    res.locals.carInfo = {};
    //Get vehicle name & image
    if(dom.querySelector('.vehicle-modal')) {
      res.locals.carInfo.name = dom.querySelector('.vehicle-modal').innerHTML;
      //TODO: get car image
      // const {yr } = res.locals.carInfo.name.split(' ');
      // console.log(nameArr);
      // res.locals.carInfo.img = `https://findbyplate.com/images/thumb/yr/honda/accord.jpg`
    } else {
      res.locals.carInfo.name = 'No Car Found';
    }
    res.locals.carInfo.pn = pn;
    res.locals.carInfo.ps = ps;
    next();
  } catch(err) {
    return next({
      log: `Cannot get car info from findbyplate Err: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = carController;
