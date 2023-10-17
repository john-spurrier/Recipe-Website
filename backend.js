/*const fs = require('fs');

const sqlTemplate = fs.readFileSync('Queries.sql', 'utf8');

const userInput =   'SELECT *   FROM RECIPES    WHERE INGREDIENTS = \'%chicken%\' || \'olive oil\' || \'celery\''; // Retrieve this from user input

fs.writeFileSync('Queries.sql', userInput);
*/
const oracledb = require('oracledb');

async function fetchDataFromRecipesTable() {
  let connection;
  try {
    connection = await oracledb.getConnection({
        user: "Jordan.Insinger",
        password: "EncrFhPKjcpPV45gvRgvCvBi",
        connectionString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA =(SID= orcl)))"
      });
    console.log("Successfully connected to Oracle Database");

    // Now query the rows from the RECIPES table
    const query = `SELECT * FROM RECIPES WHERE NAME LIKE '%cream of spinach soup%'`;
    const result = await connection.execute(query);

    // Store the result data in a variable
    const data = result.rows;

    return data;

  } catch (err) {
    console.error(err);
    throw err; // You can choose to throw the error or handle it differently
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
    console.log("RECIPE: ", recipesData[0].at(0));
    console.log("Ingredients List: ", recipesData[0].at(8));

    // Here, you can process the recipesData variable as needed.
    // You can return it from your API endpoint or perform other operations.

  } catch (err) {
    console.error("An error occurred:", err);
  }
}

main();