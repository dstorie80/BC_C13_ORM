const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint


// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'], // These are the attributes of the Product that we want to fetch
    include: [ // This is where we specify the associated data we want to include
      {
        model: Category, // We want to include data from the Category model
        as: 'category', // We're aliasing Category as 'category'
        attributes: ['category_name'] // We only want to fetch the 'category_name' attribute from Category
      },
      {
        model: Tag, // We want to include data from the Tag model
        through: ProductTag, // We specify the join table through which to fetch the data
        as: "tags", // We're aliasing Tag as 'tags'
      }]
  })
    .then(dbProductData => res.json(dbProductData)) // We send the fetched data as a JSON response
    .catch(err => { console.log(err); res.status(500).json(err); }); // If there's an error, we log it and send a 500 status code and the error as a JSON response
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    where: { id: req.params.id }, 
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'], // These are the attributes of the Product that we want to fetch
    include: [ // This tells Sequelize to also fetch the associated Category and Tag data
      {
        model: Category, // We want to include data from the Category model
        attributes: ['category_name'] // We only want to fetch the 'category_name' attribute from Category
      },
      {
        model: Tag, // We want to include data from the Tag model
        through: ProductTag, // We specify the join table through which to fetch the data
        as: 'tags', // We're aliasing Tag as 'tags'
      }
    ]
  })
    .then(dbProductData => {
      if (!dbProductData) { // If no product is found with the specified id, we send a 404 status code and a message
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData); // We send the fetched product (including its associated Category and Tag data) as a JSON response
    })
    .catch(err => { res.status(500).json(err); }); // If there's an error, we send a 500 status code and the error as a JSON response
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: { id: req.params.id }
  })
    .then(dbProductData => {
      if (!dbProductData) { 
        // If no product is found with the specified id, we send a 404 status code and a message
        // and also log a message to the console
        console.log(`No product found with id: ${req.params.id}`);
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData); // We send the deleted product as a JSON response
    })
    .catch(err => { res.status(500).json(err); }); // If there's an error, we send a 500 status code and the error as a JSON response
});

module.exports = router;
