import express, { Router } from "expess";

const app = express();
const taskRouter = Router();

taskRouter
    .get("/", (req, res) => {
        res.send(JSON.stringify([]));
    });

app
    .use(express.json())
    .use("/task", taskRouter)
    .listen(3000, () => {
        console.log("Server started on port 3000");
    });
