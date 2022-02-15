const express = require('express');

const starWarsController = require('../controllers/starWarsController');

const router = express.Router();

router.get('/',
  starWarsController.getCharacters,
  (req, res) => res.status(200).json(res.locals)
);

router.get('/species',
  starWarsController.getSpecies,
  (req, res) => res.status(200).json(res.locals)
);

router.get('/homeworld',
  starWarsController.getHomeworld,
  (req, res) => res.status(200).json(res.locals)
);

router.get('/film',
  starWarsController.getFilm,
  (req, res) => res.status(200).json(res.locals)
);

router.post('/character',
  starWarsController.addCharacter,
  (req, res) => res.status(200).json(req.body)
);

router.delete('/delete/:id',
  starWarsController.deleteCharacter,
  (req, res) => res.status(200).json(res.locals)
);


module.exports = router;
