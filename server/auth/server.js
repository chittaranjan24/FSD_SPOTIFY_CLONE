import config from "./src/config/config.js";
import app from "./src/app.js";
import connectDb from './src/db/db.js';

connectDb();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT || 3000}`);
});