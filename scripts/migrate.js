const db = require("../db");

// (async () => {
//   try {
//     await db.schema.dropTableIfExists("users");
//     await db.schema.withSchema("public").createTable("users", (table) => {
//       table.increments();
//       table.string("name");
//     });
//     console.log("Created users table!");
//     process.exit(0);
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// })();


(async () => {
  try {
      await db.schema.dropTableIfExists("users");
      await db.schema.withSchema("public").createTable("users", (table) => {
          table.increments('id');
          table.string("name", 255).notNullable();
          table.string("country", 255);
          table.integer("age");
          table.timestamps(true, true);
      });
      console.log("Created users table!");
  } catch (err) {
      console.log(err);
      process.exit(1);
  }
})();