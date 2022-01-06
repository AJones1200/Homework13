const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {id: req.params.id},
      include: [Product]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      pages: req.body.pages,
      edition: req.body.edition,
      is_paperback: req.body.is_paperback,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        isbn: req.params.isbn,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      },})}
      catch (err) {
        res.status(400).json(err);
    }})

module.exports = router;
