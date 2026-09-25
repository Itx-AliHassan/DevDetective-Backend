import "dotenv/config";
import app from "./src/app.js";
import connectDb from "./src/db/db.js";

const port = process.env.PORT

async function startServer() {
    
    connectDb()

    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port} 😎`)
    })
}

startServer()