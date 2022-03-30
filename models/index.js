const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  as: "categories",
  foreignKey: "category_id"
});

Category.hasMany(Product, {
  foreignKey: "category_id"
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "tags",
  foreignKey: "product_id"
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "products",
  foreignKey: "tag_id"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
