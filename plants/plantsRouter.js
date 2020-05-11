const express = require("express");
const router = express.Router();
// data access layer
const Plants = require("./plantsModel");
// authenticator middleware
const authenticator = require('../auth/authenticator');

// create new plant object
router.post("/", authenticator, (req, res) => {
  const newPlant = {...req.body, users_id: req.decodedToken.userId};
  // check required fields
  if (
    !newPlant.nickname ||
    !newPlant.species ||
    !newPlant.imageTile ||
    !newPlant.wateringFrequency ||
    !newPlant.users_id
  ) {
    res.status(400).json({
        message:
          "nickname, species, imageTile, wateringFrequency, and users_id are required",
      });
  } else {
    Plants.add(newPlant)
      .then(([ id ]) => {
          Plants.findById(id)
          .then(response => res.status(201).json(response))
          .catch(error => res.status(500).json({ err: error.message }))
      })
      .catch((error) => res.status(500).json({ err: error.message }));
  }
});

// update
router.put("/:id", authenticator, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Plants.update(id, changes)
    .then(response => {
        if(response === 1){
            Plants.findById(id)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(500).json({ err: error.message }))
        } else {
            res.status(400).json({ message: 'could not update this plant' })
        }
    })
    .catch(error => res.status(500).json({ err: error.message }))
})

// delete plant object
router.delete("/:id", authenticator, (req, res) => {
    const id = req.params.id;
    Plants.remove(id)
    .then((response) => {
        if(response === 0){
            res.status(400).json({ message: `no plant with id ${id}`})
        } else if (response === 1){
            res.status(200).json({ message: `deleted plant with id ${id}`})
        }
    })
    .catch((error) => res.status(500).json({ err: error.message }));
})

// read all plant objects associated with this user
router.get("/", authenticator, (req, res) => {
    // later, remember to grab user id from req.decodedtoken. 
    // rn its gonna grab all plants
    Plants.findAll()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ err: error.message }))
})

// read a single plant object by plant id
router.get("/:id", authenticator, (req, res) => {
    const id = req.params.id;
    Plants.findById(id)
    .then(response => {
        if(!response){
            res.status(500).json({ message: `no plant with id ${id}`})
        } else {
            res.status(200).json(response)
        }        
    })
    .catch(error => res.status(500).json({ err: error.message }))
})

module.exports = router;
