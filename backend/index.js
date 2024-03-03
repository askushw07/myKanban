const dotenv = require("dotenv");
const app = require("./src/app.js");
const connectDB = require("./src/db/index.js");

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGO db connection failed !!! ", error);
    });
