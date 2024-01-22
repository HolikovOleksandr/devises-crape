const dotenv = require("dotenv");
const scrap = require("./src/scrap.js");
dotenv.config();

const main = async () => {
  const link = process.env.TEST_LINK;

  scrap(link)
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

main();
