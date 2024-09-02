import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://sujeet17052003:s1X9EVWvAfzK@ep-tiny-lake-43205942.us-east-2.aws.neon.tech/test?sslmode=require",
});

async function createUsersTable() {
  try {
    await client.connect();
    const result = await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log(result);
  } catch (error) {
    console.error("Error creating users table:", error);
  } finally {
    // Do not close the connection here
  }
}

async function insertData() {
  try {
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
    const res = await client.query(insertQuery);
    console.log("Insertion success:", res);
  } catch (err) {
    console.error("Error during the insertion:", err);
  }
}

async function getData(email: string) {
  try {
    const insertQuery = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(insertQuery, values);
    if (result.rows.length > 0) {
      console.log("User found:", result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log("No user found with the given email.");
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error("Error during fetching user:", err);
    throw err; // Rethrow or handle error appropriately
  } 
}

// Call the functions
async function run() {
  await getData("user3@example.com");
  await getData("user4@example.com");
  await client.end(); // Close the connection after all operations
}

run();
