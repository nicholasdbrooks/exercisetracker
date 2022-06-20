import React from "react";
import ExerciseRow from './ExerciseRow.js';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table className="exercise-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => {
                    return <ExerciseRow exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i}/>;
                })}
            </tbody>
        </table>
    );
};

export default ExerciseTable;