import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

function EditPage({ exerciseToEdit }) {
    
    const history = useHistory();
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const editExercise = async _id => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ name: name, reps: reps, weight: weight, unit: unit, date: date}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Exercise successfully edited!");
        } else {
            alert(`Failed to edit exercise, status code ${response.status}`);
        }   
        history.push('/');
    };

    return(
        <div>
            <h3>Edit your exercise!</h3>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" value={reps} onChange={e => setReps(e.target.valueAsNumber)} />
            <input type="number" value={weight} onChange={e => setWeight(e.target.valueAsNumber)} />
            <select value={unit} onChange={e => setUnit(e.target.value)} >
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} />
            <button onClick={editExercise}>Save Changes</button>
        </div>
    );
};

export default EditPage;