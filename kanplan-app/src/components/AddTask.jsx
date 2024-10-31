import React from "react";
import { useState } from "react";

const AddTask = ({ show, board, handleCloseModal, onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title: taskTitle,
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
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Add new task to board</h2>
                        <button className="btn-close" onClick={handleCloseModal}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="addTaskForm">
                            <div className='form-row mb-3'>
                                <label htmlFor="taskTitle" className="me-2"> Task title: </label>
                                <input type="text" id="taskTitle" name="taskTitle"
                                 value={taskTitle}
                                 required
                                 className="form-control"
                                 placeholder="Task title"
                                 onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-row mb-3'>
                                <label htmlFor="description"> Task description: </label>
                                <input type="text" id="description" name="description"
                                 value={description}
                                 className="form-control"
                                 placeholder="Task description"
                                 onChange={(e) => setDescription(e.target.value)}               
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;