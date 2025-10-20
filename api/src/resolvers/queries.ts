export const queryResolvers = {
  hello: () => 'Hello from GraphQL API!',

  //TODO: Should we implement some kind of pagination logic?
  //GraphQL requires the parent and args even if unused
  products: async(parent, args, { db }) => {
    try {
      const result = await db.query('SELECT *, img_url as "imgUrl" FROM product');

      return result.rows;
    } catch(error) {
      throw new Error(`Failed to fetch products ${error.message}`);
    }
  }
};