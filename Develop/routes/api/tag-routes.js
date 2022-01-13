const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [ {
        model: Product, 
        through: ProductTag
      }]
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {id: req.params.id},
      include: [ {
          model: Product, 
          through: ProductTag
        }]
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  res.status(200).json(tag);
} catch (err) {
  res.status(400).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      },}) 
      if (!tag) { 
        res.status(400).json({message: "No product with that id exists."})
        return
      };

      res.status(200).json(tag)
      }
     catch (err) {
       res.status()
     }
});

module.exports = router;
