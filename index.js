import { app } from "./app.js";
import { db } from "./db/db.js";

try {
  db();

  app.listen(3002, () => {
    console.log("Server is running on port 3002");
  });
} catch (err) {
  console.error("Error connecting to database:", err);
  process.exit(1);
}
