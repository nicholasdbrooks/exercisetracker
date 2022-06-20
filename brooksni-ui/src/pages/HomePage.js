import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

function HomePage({ setExerciseToEdit }) {
    
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const loadExercises = async() => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    };

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        history.push('/edit');
    };

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`No movie with id ${_id} found...`);
        }
    };

    

    useEffect(() => {
        loadExercises();
    }, []);
    
    return (
        <div id='homepage'>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
        </div>
    );
};

export default HomePage;