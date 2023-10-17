//code sampled from oracle tutorials: https://www.oracle.com/database/technologies/appdev/quickstartnodeonprem.html

const oracledb = require('oracledb');
const express = require('express');

const app = express();
const PORT = 3000;


async function fetchDataFromRecipesTable() {
  let connection;
  try {
    connection = await oracledb.getConnection({
        user: "Jordan.Insinger",
        password: "EncrFhPKjcpPV45gvRgvCvBi",
        connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA =(SID= orcl)))"
      });
    console.log("Successfully connected to Oracle Database");

    // Express listening for queries from frontend
    app.listen(PORT, ()=>{
      console.log("Server is Listening on Port ", PORT);
  })
    // Now query the rows from the RECIPES table
    const query = `SELECT * FROM RECIPES WHERE INGREDIENTS LIKE '%chicken%'`;
    const result = await connection.execute(query);

    // Store the result data
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
  try {
    const recipesData = await fetchDataFromRecipesTable();
    /*console.log("RECIPE: ", recipesData[0].at(0));
    console.log("Ingredients List: ", recipesData[0].at(8));*/
    console.log(recipesData);

    // Here, you can process the recipesData variable as needed.
    // You can return it from your API endpoint or perform other operations.

  } catch (err) {
    console.error("An error occurred:", err);
  }
}

main();