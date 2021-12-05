const workouts = require("./db.json");
const prs = require("./prdb.json");

let globalId = 3;
let prId = 3;

module.exports = {
    getWorkouts: (req, res) => {
        let workoutsOrdered = []
        for(i = 0; i < workouts.length; i++) {
            workoutsOrdered.unshift(workouts[i])
        }
        res.status(200).send(workoutsOrdered);
    },
    deleteWorkouts: (req, res) => {
        let index = workouts.findIndex((elem) => elem.id === +req.params.id);
        workouts.splice(index, 1)

        let workoutsOrdered = []
        for(i = 0; i < workouts.length; i++) {
            workoutsOrdered.unshift(workouts[i])
        }
        res.status(200).send(workoutsOrdered);
    },
    postWorkouts: (req, res) => {
        let {date, text} = req.body;
        let newWorkout = {
            id: globalId,
            date,
            text
        }
        workouts.push(newWorkout);
        res.status(200).send(workouts);
        globalId++;
    },
    updateWorkouts: (req, res) => {
        let {id} = req.params;
        let {type} = req.body;
        let {text} = req.body;
        let index = workouts.findIndex((elem) => elem.id === +id);

        if(type === "update") {
            let editWorkout = {
                id: globalId,
                text
            } 
            workouts.splice(index, 1, editWorkout)
            res.status(200).send(workouts);
        }
        
    },
    getPr: (req, res) => {
        res.status(200).send(prs);
    },
    postPr: (req, res) => {
        let {exercise, prNumber, unit} = req.body;
        let newPr = {
            id: prId,
            exercise: exercise,
            prNumber: +prNumber,
            unit: unit
        }
        prs.push(newPr);
        res.status(200).send(prs);
        prId++;
    },
    deletePr: (req, res) => {
        let index = prs.findIndex((elem) => elem.id === +req.params.id);
        prs.splice(index, 1)
        res.status(200).send(prs);
    },
    updatePr: (req, res) => {
        let {id} = req.params;
        let {type} = req.body;
        let index = prs.findIndex((elem) => elem.id === +id);

        if (type === "plus") {
            prs[index].prNumber += 1;
            res.status(200).send(prs);
        } else if (type === "minus") {
            prs[index].prNumber -= 1;
            res.status(200).send(prs);
        }
    }
}