//const { Categories } = require("../../../my-app/src/components/categories/Categories");
const db = require("../../database/models");
module.exports = {
  list: async (req, res) => {
    try {
      let categories = await db.Category.findAll({
        include : ['products']
      });
    // return res.json(categoria)
      categories = categories.map(category => {
      return {
      totalProducts : category.products.length, //old
          ...category.dataValues
        /*  id: category.id,
          name: category.name,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,*/
        }
    })

      return res.status(200).json({
        ok: true,
       data:     //{categories}
       categories,
       
        
       })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
};
