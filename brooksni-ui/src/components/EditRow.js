import React from "react";
import { AiOutlineEdit } from 'react-icons';
import EditPage from "../pages/EditPage";

function EditRow({ exercise }) {
    const handlesubmit = () => {
        <EditPage exercise={exercise} />
    };
    return (
        <>
            <AiOutlineEdit onClick={handlesubmit} />
        </>
    );
};

export default EditRow;