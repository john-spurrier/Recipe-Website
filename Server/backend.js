//code sampled from oracle tutorials: https://www.oracle.com/database/technologies/appdev/quickstartnodeonprem.html

const oracledb = require('oracledb');
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 3001;

// currently only implemented for searching by ingredients
function createQuery(ingredientsArray, allergenFilters) {
  // Allergen Definitions
  const GF = ["bread", "wheat", "pasta", "cracker", "barley", "oats", "couscous", "rye", "triticale", "malt"];
  const NUT = ["nut"];
  const KET = ["chicken"]; //temporary value for testing functionality


  console.log("Creating Query...");
  const {glutenFree, keto, nutAllergy} = allergenFilters;
  console.log("Gluten Free: ", glutenFree, "\t Keto: ", keto, "\t Nut Allergy: ", nutAllergy);
  let Query = 'SELECT * FROM RECIPES';

    for(i = 0; i < ingredientsArray.length; i++) {
      if(i == 0) { // first query
        Query = Query.concat(' WHERE INGREDIENTS LIKE ', '\'%', ingredientsArray[0], '%\'');
      }
      else {
        Query = Query.concat(' AND INGREDIENTS LIKE \'%', ingredientsArray[i], '%\'');
      }
      
    }
    
    // Allergen Limitations
    if(glutenFree == true) {
      for(i = 0; i < GF.length; i++) {
        if(ingredientsArray.length < 1 && i == 0)
        Query = Query.concat(' WHERE INGREDIENTS NOT LIKE \'%', GF[i], '%\'');
      else
        Query = Query.concat(' AND INGREDIENTS NOT LIKE \'%', GF[i], '%\'');
      }
    }
    
    if(nutAllergy == true) {
      for(i = 0; i < NUT.length; i++) {
        Query = Query.concat(' AND INGREDIENTS NOT LIKE \'%', NUT[i], '%\'');
      }
    }

    if(keto == true) {
      for(i = 0; i < KET.length; i++) {
        Query = Query.concat(' AND INGREDIENTS NOT LIKE \'%', KET[i], '%\'');
      }
    }

  return Query;
}

async function processQuery() {
  let connection;
  try {
    connection = await oracledb.getConnection({
        user: "Jordan.Insinger",
        password: "EncrFhPKjcpPV45gvRgvCvBi",
        connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA =(SID= orcl)))"
      });
    console.log("Successfully connected to Oracle Database");

    // SAMPLE HARDCODED QUERY
    arr = ['orange', 'celery'];
    const query = createQuery(arr);
    const result = await connection.execute(query);

    // CAPTURE RESULTS
    const data = result.rows;

    return data;

  } catch (err) {
    console.error(err);
    throw err; 
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// testing connection from frontend to backend
async function processQuery(ingredients, filters) {
  console.log("Entering processQuery: ", ingredients);
  let connection;
  try {
    connection = await oracledb.getConnection({
        user: "Jordan.Insinger",
        password: "EncrFhPKjcpPV45gvRgvCvBi",
        connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA =(SID= orcl)))"
      });
    console.log("Successfully connected to Oracle Database");

    // SAMPLE HARDCODED QUERY
    //arr = ['orange', 'celery'];
    const query = createQuery(ingredients, filters);
    console.log("QUERY: ", query);
    const result = await connection.execute(query);

    // CAPTURE RESULTS
    const data = result.rows;
    return data;

  } catch (err) {
    console.error(err);
    throw err; 
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function main() {
  // Express listening for queries from frontend
  app.listen(PORT, ()=>{
  console.log("Server is Listening on Port ", PORT);
  })

  app.use(express.json());
  app.use(cors());

  app.post('/api/query', async (req, res) => {
      const {ingredients, filters} = req.body;
      // Access Filters

      const results = await processQuery(ingredients, filters);
      console.log("RESULTS: ", results);
      
      // THIS IS WHERE THE TABLE IS BEING SENT TO CLIENT SIDE
      res.json(results);
  })
  
// Commented out for testing

//==================== For manual Testing ========================//
  /*try {
    const recipesData = await processQuery();
    console.log(recipesData);

    // Here, you can process the recipesData variable as needed.
    // You can return it from your API endpoint or perform other operations.

  } catch (err) {
    console.error("An error occurred:", err);
    }*/

}
main();

