import 'dotenv/config';
import * as exercise from './exercise_model.mjs';
import express, { response } from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post('/exercises', (req, res) => {
    exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(response => {
            if (response !== null) {
                res.contentType('application/json');
                res.status(201).json(response);
            } else {
                res.contentType('application/json');
                res.status(400).json({Error: 'Invalid Request'});
            }
        })
        .catch(error => {
            console.error(error);
            res.contentType('application/json');
            res.status(400).json({Error: "Invalid Request"});
        });
});

app.get('/exercises', (req, res) => {
    exercise.findAllExercises()
        .then(response => {
            if (response !== null) {
                res.contentType('application/json');
                res.status(200).json(response);
            } else {
                res.contentType('application/json');
                res.status(404).json({Error: 'Resource Not Found'});
            }
        })
        .catch(error => {
            res.contentType('application/json');
            res.status(400).json({Error: 'Request Failed'});
        });
});

app.get('/exercises/:id', (req, res) => {
    exercise.findOneExercise(req.params.id)
        .then(response => {
            if (response !== null) {
                res.contentType('application/json');
                res.status(200).json(response);
            } else {
                res.contentType('application/json');
                res.status(404).json({Error: 'Not Found'});
            }
        })
        .catch(error => {
            res.contentType('application/json');
            res.status(400).json({Error: 'Request Failed'});
        });
});

app.put('/exercises/:_id', (req, res) => {
    exercise.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(response => {
            if (response === 0) {
                res.contentType('application/json');
                res.status(404).json({Error: 'Not Found'});
            } else if (response !== null) {
                res.contentType('application/json');
                res.status(200).json(response);
            } else {
                res.contentType('application/json');
                res.status(400).json({Error: 'Invalid Request'});
            }
        })
        .catch(error => {
            res.contentType('application/json');
            res.status(400).json({Error: 'Invalid Request'});
        });
});

app.delete('/exercises/:_id', async (req, res) => {
    /*try {
        const results = await exercise.deleteExercise(req.params._id);
        if (results === 1) {
            res.status(204);
        } else {
            res.contentType('application/json');
            res.status(404).json({Error: "Not Found"});
        }
    } catch (error) {
        res.contentType('application/json');
        res.status(400).json({Error: "Invalid Request"});
    }*/
    
    exercise.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204);
                res.send();
            } else {
                res.contentType('application/json');
                res.status(404).json({Error: "Not Found"});
            }
        })
        .catch(error => {
            res.contentType('application/json');
            res.status(400).json({Error: 'Request Failed'});
        });
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`);
});