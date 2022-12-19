const db = require("../../database/models");
module.exports = {
  list: async (req, res) => {
    try {
      let categoria = await db.Category.findAll({
        include : ['products']
      });
    //  return res.json(categoria)
      categoria = categoria.map(category => {
      return {
         totalProducts : category.products.length,
          ...category.dataValues
        }
    })

      return res.status(200).json({
        ok: true,
       data: {
          categoria,
       } 
        
       })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
};
