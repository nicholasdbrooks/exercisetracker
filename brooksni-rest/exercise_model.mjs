import mongoose from 'mongoose';
import 'dotenv/config';
import Validator from 'validatorjs';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", () => {
    console.log('connected to db');
});

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

const Exercise = mongoose.model("exercises", exerciseSchema);

const findAllExercises = async () => {
    const query = await Exercise.find();
    return query;
};

const createExercise = async (name, reps, weight, unit, date) => {
    let data = {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    };

    let rules = {
        name: 'required|string',
        reps: 'integer|min:1',
        weight: 'integer|min:1',
        unit: 'required|string',
        date: 'required|date'
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
        if (unit === 'kgs' || unit === 'lbs') {
            const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
            return exercise.save();
        }
    } else {
        return null;
    }
};

const findOneExercise = async (id) => {
    const query = await Exercise.findById(id);
    return query;
};

const updateExercise = async (id, name, reps, weight, unit, date) => {
    
    const filter = {_id: id};
    
    let data = {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    };

    let rules = {
        name: 'required|string',
        reps: 'integer|min:1',
        weight: 'integer|min:1',
        unit: 'required|string',
        date: 'required|date'
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
        const tester = await Exercise.findById(id);
        if (tester === null) {
            return 0;
        }
        if (unit === 'kgs' || unit === 'lbs') {
            const result = await Exercise.replaceOne({_id: id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
            if (result.modifiedCount === 0) {
                return 0;
            } else {
                const updated = await Exercise.findOne({_id: id});
                const newid = updated._id;
                return {id: newid, name: name, reps: reps, weight: weight, unit: unit, date: date};
            }
        }
    } else {
        return null;
    }
};

let deleteExercise = async (_id) => {
   const deleted = await Exercise.deleteOne({ _id: _id });
   return deleted.deletedCount;
};

export { findAllExercises, createExercise, findOneExercise, updateExercise, deleteExercise };