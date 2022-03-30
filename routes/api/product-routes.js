const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Product.findAll({
    attributes: [
      "id",
      "product_name",
      "price",
      "stock",
      "category_id"
    ],
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["id", "category_name"]
      },
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "tag_name"]
      }
    ]
  }
  )
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      "id",
      "product_name",
      "price",
      "stock"
    ],
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["id", "category_name"],
      },
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "tag_name"],
      }
    ]
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({message: `Could Not Locate Product`});
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({message: `Could Not Locate Product`});
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
