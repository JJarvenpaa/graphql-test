import React from 'react';
import logo from './logo.svg';
import { graphqlClient } from './utils/graphqlClient';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Check console for GraphQL test results</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

//TODO: move these graphql functions to a different file when layout requires it
function testGraphqlAPI() {
  const query = `
    query {
      hello
    }
  `;

  graphqlClient.query(query).then((data) => {
    console.log('GraphQL API response:', data);
  }).catch((error) => {
    console.error('Error calling GraphQL API:', error);
  });
}

async function queryProducts() {
  const query = `
    query products {
      products {
        id
        name
        description
        ingredients
        toppings
        imgUrl
        campaigns
        category
        dietaries
      }
    }
  `;
    
  try {
    const queryResponse = await graphqlClient.query(query);
    console.log('Response: ', queryResponse);

    return queryResponse.data.products;

  } catch(error) {
    console.error('Failed to fetch products: ', error);
  }
}
//TODO: create input types for all mutations for client-side validations
async function testCreateProduct() {
  const product = {
    name: "Paras Hanppari",
    description: "Kaupungin paras hanppari on nyt täällä!",
    price: 10.00,
    ingredients: ["Jauhelihapihvi", "Sämpylä", "Salaatti", "Juusto", "Ketsuppi"],
    toppings: { "Lisäjuusto": 1.50, "Bacon": 2.00, "Ananas": 1.00 },
    imgUrl: "https://example.com/image.jpg",
    campaigns: ["1", "2"],
    category: 3,
    dietaries: [0, 1],
  };

  const query = `
    mutation CreateProduct($input: CreateProduct!) {
      createProduct(input: $input) {
        code
        success
        message
        product {
          id
          name
          description
          price
          ingredients
          toppings
          imgUrl
          campaigns
          category
          dietaries
        }
      }
    }
  `;

  try {
    const newProduct = await graphqlClient.query(query, { input: product });
    console.log('Created product:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

//TODO: Do we need to check if item has changed before updating?
//TODO: Do we need to handle race conditions when multiple updates occur simultaneously?

async function testUpdateProduct() {
  const productUpdate = {
    id: "826afcbf-a454-4eaa-b8c1-101c717997c7",
    name: "Updated Hanppari 3",
    description: "Päivitetty kuvaus 3",
    price: 14.50,
    ingredients: ["Jauhelihapihvi", "Sämpylä", "Salaatti", "Juusto", "Ketsuppi"],
    toppings: { "Lisäjuusto": 1.50, "Lisämajo": 2.00, "Ananas": 1.00 },
    imgUrl: "https://example2.com/image.jpg",
    campaigns: ["3", "4"],
    category: 3,
    dietaries: [2, 3],
  };

  const query = `
    mutation UpdateProduct($input: UpdateProduct!) {
      updateProduct(input: $input) {
        code
        success
        message
        product {
          id
          name
          description
          price
          ingredients
          toppings
          imgUrl
          campaigns
          category
          dietaries
        }
      }
    }
  `;

  try {
    const updatedProduct = await graphqlClient.query(query, { input: productUpdate });
    console.log('Updated product:', updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
  }
};


async function testDeleteProduct() {
  const productId = "063c5a2f-90aa-4a9c-ac44-2f2cdf4341b2";

  const query = `
    mutation DeleteProduct($id: ID!) {
      deleteProduct(id: $id) {
        code
        success
        message
      }
    }
  `;

   try {
    const deletedProduct = await graphqlClient.query(query, { id:  productId});
    console.log('Deleted item successfully');
  } catch (error) {
    //TODO: security wise we don't want to disclose if ID exists in our database, so we shouldn't return an error here. Instead we want to only log it server side.
    console.error('Error deleting item:', error);
  }  
}
// Simple test without async function
queryProducts()
  .then(items => {
    console.log('Fetched items:', items);
  })
  .catch(error => {
    console.error('Error fetching items:', error);
  });

testGraphqlAPI();
testCreateProduct();
testUpdateProduct();
testDeleteProduct();
export default App;