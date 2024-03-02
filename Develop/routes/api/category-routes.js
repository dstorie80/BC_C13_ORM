const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll({include:Product});
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: { id: req.params.id }, // This is where we specify the id of the category we want to find
    include: Product // This tells Sequelize to also fetch products associated with the category
  })
    .then((foundCategory) => {
      if (!foundCategory) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.json(foundCategory); // This sends the found category (including its associated products) as a JSON response
    })
    .catch((err) => { res.status(500).json(err); } ); // If there's an error, it sends a 500 status code and the error as a JSON response
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => res.status(200).json(newCategory))
    .catch((err) => res.status(400).json(err));
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.json(updatedCategory);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.json(deletedCategory);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
