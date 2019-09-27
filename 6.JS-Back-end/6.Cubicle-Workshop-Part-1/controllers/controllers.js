const fs = require('fs');
// unique id generator
const uuidv1 = require('uuid/v1');
const CubeModel = require('../models/cubeModel');

module.exports = {
  home: (req, res) => {
    // read "database" and render home page
    fs.readFile('./config/database.json', (err, data) => {
      if (err) console.log(err);

      const cubes = JSON.parse(data);
      res.render('index', {
        layout: false,
        cubes,
      });
    });
  },

  about: (req, res) => {
    res.render('about', { layout: false });
  },

  createGet: (req, res) => {
    res.render('create', { layout: false });
  },

  createPost: (req, res) => {
    const id = uuidv1();
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const newCube = new CubeModel(id, name, description, imageUrl, difficultyLevel);

    // read cubes data from "database"
    fs.readFile('./config/database.json', (readErr, data) => {
      if (readErr) console.log(readErr);

      const newData = JSON.parse(data);
      newData.push(newCube);

      // add new cube and write "database" file
      fs.writeFile('./config/database.json', JSON.stringify(newData), (writeErr) => {
        if (writeErr) console.log(writeErr);

        // redirect to home page
        res.redirect('/');
      });
    });
  },

  details: (req, res) => {
    const { id } = req.params;
    // read "database"
    fs.readFile('./config/database.json', (err, data) => {
      if (err) console.log(err);

      const wantedCube = JSON.parse(data).find((obj) => obj.id === id);

      // check if cube with this id doesn't exist
      if (!wantedCube) {
        res.redirect('/error');
        return;
      }

      res.render('details', {
        layout: false,
        cube: wantedCube,
      });
    });
  },

  error: (req, res) => {
    res.render('404', { layout: false });
  },
};
