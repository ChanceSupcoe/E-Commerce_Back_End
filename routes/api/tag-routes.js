const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      "id",
      "tag_name"
    ],
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id", "product_name", "price", "category_id"],
      } 
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      "id",
      "tag_name"
    ],
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id", "product_name", "stock", "category_id"],
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: `Could Not Locate Tag`});
    }
    res.json(dbTagData);
  })
  .catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: `Could Not Locate Tag`});
    }
    res.json(dbTagData);
  })
  .catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
