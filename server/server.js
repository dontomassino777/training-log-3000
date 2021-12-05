const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const {getWorkouts, deleteWorkouts, postWorkouts, updateWorkouts, getPr, postPr, deletePr, updatePr} = require("./controller.js")

app.post("/api/tl3000", postWorkouts);
app.get("/api/tl3000", getWorkouts);
app.put("/api/tl3000/:id", updateWorkouts);
app.delete("/api/tl3000/:id", deleteWorkouts);


app.post("/api/tl3000/pr", postPr);
app.get("/api/tl3000/pr", getPr);
app.put("/api/tl3000/pr/:id", updatePr);
app.delete("/api/tl3000/pr/:id", deletePr);


app.listen(4500, () => {
    console.log('All systems go on 4500')
})