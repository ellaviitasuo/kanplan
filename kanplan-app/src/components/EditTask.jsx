import React from "react";
import { useState } from "react";

const EditTask = ({ show, handleCloseModal, onEditTask, taskToEdit }) => {
    const [title, setTaskTitle] = useState(taskToEdit.title);
    const [description, setDescription] = useState(taskToEdit.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Edit task: ", taskToEdit.id);
        onEditTask(taskToEdit.id, title, description);
        handleCloseModal();
    }

    if (!show) return null;

    return (
        <div 
            className={`modal fade ${show ? "show d-block" : "d-none"}`}
             tabIndex="-1"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Edit task {taskToEdit.title}</h2>
                        <button className="btn-close" onClick={handleCloseModal}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="addTaskForm">
                            <div className='form-row mb-3'>
                                <label htmlFor="title" className="me-2"> Task title: </label>
                                <input type="text" id="title" name="title"
                                 value={title}
                                 required
                                 className="form-control"
                                 placeholder={title}
                                 onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-row mb-3'>
                                <label htmlFor="description"> Task description: </label>
                                <textarea id="description" name="description" rows="5"
                                 value={description}
                                 className="form-control"
                                 placeholder={description}
                                 onChange={(e) => setDescription(e.target.value)}               
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTask;