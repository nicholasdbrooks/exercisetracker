import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function CreatePage() {
    
    const history = useHistory();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Exercise successfully created!");
        } else {
            alert("Exercise creation failed.");
        }
        history.push('/');
    };

    return(
        <div>
            <h3>Add a new exercise!</h3>
            <label for='iname'>Name of Exercise</label>
            <input type="text" id='iname' value={name} placeholder='squats' onChange={e => setName(e.target.value)} />
            <label for='ireps'>Number of Reps</label>
            <input type="number" id='ireps' value={reps} placeholder='30' onChange={e => setReps(e.target.valueAsNumber)} />
            <label for='iweight'>Weight</label>
            <input type="number" id='iweight' value={weight} placeholder='225' onChange={e => setWeight(e.target.valueAsNumber)} />
            <label for='iunit'>Units</label>
            <select id='iunit' value={unit} placeholder='kgs' onChange={e => setUnit(e.target.value)} >
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <label for='idate'>Date</label>
            <input type="text" id='idate' value={date} placeholder='MM-DD-YY' onChange={e => setDate(e.target.value)} />
            <button onClick={addExercise}>Save Exercise</button>
        </div>
    );
};

export default CreatePage;