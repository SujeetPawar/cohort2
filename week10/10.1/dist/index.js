"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://sujeet17052003:s1X9EVWvAfzK@ep-tiny-lake-43205942.us-east-2.aws.neon.tech/test?sslmode=require",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
            console.log(result);
        }
        catch (error) {
            console.error("Error creating users table:", error);
        }
        finally {
            // Do not close the connection here
        }
    });
}
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
            const res = yield client.query(insertQuery);
            console.log("Insertion success:", res);
        }
        catch (err) {
            console.error("Error during the insertion:", err);
        }
    });
}
function getData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertQuery = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const result = yield client.query(insertQuery, values);
            if (result.rows.length > 0) {
                console.log("User found:", result.rows[0]); // Output user data
                return result.rows[0]; // Return the user data
            }
            else {
                console.log("No user found with the given email.");
                return null; // Return null if no user was found
            }
        }
        catch (err) {
            console.error("Error during fetching user:", err);
            throw err; // Rethrow or handle error appropriately
        }
    });
}
// Call the functions
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getData("user3@example.com");
        yield getData("user4@example.com");
        yield client.end(); // Close the connection after all operations
    });
}
run();
