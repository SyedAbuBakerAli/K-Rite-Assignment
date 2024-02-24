const app = require("./app");
const connectDatabase = require(`./config/database`);
const dotenv = require("dotenv");

//Setting up confit file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});
