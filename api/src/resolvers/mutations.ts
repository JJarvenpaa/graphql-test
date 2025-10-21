
//TODO: use correct TS typing here
export const mutationResolvers = {
  //GraphQL requires the parent argument even if unused
  createProduct: async(parent, { input }, { db }) => {
    try {
      const { name, description, price, ingredients, toppings, imgUrl, enabled, campaigns, category, dietaries } = input;

      const insertResult = await db.query(
        'INSERT INTO products (name, description, price, ingredients, toppings, img_url, enabled, campaigns, category, dietaries) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *, img_url as "imgUrl"',
        [name, description, price, ingredients, toppings, imgUrl, enabled, campaigns, category, dietaries]
      );

      return {
        code: "200",
        success: true,
        message: "Product added",
        product: insertResult.rows[0]
      };
    } catch(error) {
      throw new Error(`Failed to add product: ${error.message}`);
    }
  },

  updateProduct: async(parent, { input }, { db }) => {
    try {
      const { id, name, description, price, ingredients, toppings, imgUrl, enabled, campaigns, category, dietaries } = input;

      const updateResult = await db.query(
        'UPDATE products SET name = $1, description = $2, price = $3, ingredients = $4, toppings = $5, img_url = $6, enabled = $7, campaigns = $8, category = $9, dietaries = $10 WHERE id = $11 RETURNING *, img_url as "imgUrl";', 
        [name, description, price, ingredients, toppings, imgUrl, enabled, campaigns, category, dietaries, id]
      );

      //TODO: Do we want to do manual checks if something updated or not?
      if (updateResult.rowCount === 0) {
        return {
          code: "404",
          success: false,
          message: "Product not found",
          product: null
        };
      }

      return {
        code: "200", 
        success: true,
        message: "Product updated",
        product: updateResult.rows[0]
      };
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },

  deleteProduct: async(parent, { id }, { db }) => {
    const returnValue = {
      code: "200", 
      success: true, 
      message: "Product deleted"
    };

    try {
      const selectResult = await db.query(
        'SELECT * FROM products WHERE id = $1;', [id]);
    
      if(selectResult.rows.length === 0) return returnValue;
      
      //TODO: what to do with this result?
      const deleteResult = await db.query(
      'DELETE FROM products WHERE id = $1;', [id]);
      
      
    } catch(error) {
      //TODO: log error here and remove throw
      throw new Error(`Failed to delete product: ${error.message}`);
    }

    //Always return success to client, even if error, prevents ID snooping
    return returnValue;
  },
};