/* eslint-disable no-unused-vars */
const { sequelize } = require('../models');
const db = require('../models');

module.exports = function (app) {
  app.get('/api/ingredients', (req, res) => {
    const query = {};
    if (req.query.recipe_id) {
      query.RecipeId = req.query.recipe_id;
    }
    db.Ingredient.aggregate('Name', 'DISTINCT', { plain: false })
      .then((dbIngredient) => {
        res.json(dbIngredient);
        console.log(dbIngredient);
      });
  });

  app.get('/api/ingredients/:name', (req, res) => {
    db.Ingredient.findAll({
      where: {
        name: req.params.name,
      },
    }).then((dbIngredient) => {
      res.json(dbIngredient);
      console.log(dbIngredient);
    });
  });

  app.get('/api/ingredients/:id', (req, res) => {
    db.Ingredient.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbIngredient) => {
      res.json(dbIngredient);
    });
  });

  app.post('/api/ingredients', (req, res) => {
    db.Ingredient.create(req.body).then((dbIngredient) => {
      res.json(dbIngredient);
    });
  });

  app.delete('/api/ingredients/:id', (req, res) => {
    db.Ingredient.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbIngredient) => {
      res.json(dbIngredient);
    });
  });

  app.put('/api/ingredients', (req, res) => {
    db.Ingredient.update(
      req.body,
      {
        where: {
          id: req.body.id,
        },
      },
    ).then((dbIngredient) => {
      res.json(dbIngredient);
    });
  });
};
