const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const port = process.env.PORT;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  conn.sync({ force: true });
  server.listen(port, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
