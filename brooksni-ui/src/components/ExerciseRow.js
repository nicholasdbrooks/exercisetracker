import React from "react";
import { AiFillDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';

function ExerciseRow({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><AiFillEdit onClick={() => onEdit(exercise)}/></td>
            <td><AiFillDelete onClick={() => onDelete(exercise._id)}/></td>
        </tr>
    );
};

export default ExerciseRow;