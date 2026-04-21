import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ show, board, handleCloseModal, onAddTask }) => {
    const [title, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const generateId = uuidv4().slice(0,8).toString();
        const newTask = {
            id: generateId,
            title: title,
            description: description,
            status: board.statusFields[0].name,
        };
        console.log("New task: ", newTask);
        onAddTask(newTask);
        setTaskTitle("");
        setDescription("");
        handleCloseModal();
    }

    if (!show) return null;

    return (
        <div 
            className={`modal fade ${show ? "show d-block" : "d-none"}`}
             tabIndex="-1"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" id="add-task-container">
                    <div className="modal-header" id="add-task-header">
                        <h2 className="modal-title" id="add-task-title">Add new task to board</h2>
                        <button className="btn-close" id="add-task-close-btn" onClick={handleCloseModal}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="addTaskForm">
                            <div className='form-row mb-3'>
                                <label htmlFor="title" className="me-2"> Task title: </label>
                                <input type="text" id="task-title-input" name="title"
                                 value={title}
                                 required
                                 className="form-control"
                                 placeholder="Task title"
                                 onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-row mb-3'>
                                <label htmlFor="description"> Task description: </label>
                                <textarea id="task-description" name="description" rows="5"
                                 value={description}
                                 className="form-control"
                                 placeholder="Task description"
                                 onChange={(e) => setDescription(e.target.value)}               
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer" id="add-task-footer">
                        <button type="button" className="btn btn-success" id="add-task-btn" onClick={handleSubmit}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;