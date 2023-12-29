import app from "./app.js";
import config from "./config/config.js";

const port = config.port;

const main = () => {
  app.listen(port, () => {
    console.log(`🚀🎁🌈 server runninng at: http://localhost:${port}`);
  });
};

main();
