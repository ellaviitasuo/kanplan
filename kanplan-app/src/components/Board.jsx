import React, { useState } from "react";
import './Board.css';
import AddTask from "./AddTask";
import TaskCard from "./Task";

const Board = ({ selectedBoard, deleteBoard, addTaskToBoard }) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    
    const handleAddTasks = (task) => {
        addTaskToBoard(task, selectedBoard.boardName);
    };

    return (
    <div className="container mt-3">
        <div>
            <button type="button"
             className="btn btn-danger custom-button"
             onClick={() => deleteBoard(selectedBoard.boardName)}>
                Delete {selectedBoard.boardName}
            </button>
            <button type="button" className="btn btn-primary custom-button me-3" 
             onClick={handleOpenModal}>
                Add task
            </button>
            <AddTask show={showModal} board={selectedBoard} handleCloseModal={handleCloseModal} onAddTask={handleAddTasks}/>
        </div>
        <h1 className="custom-heading p-3 me-3">{selectedBoard.boardName}</h1>
        <table className="table table-borderless table-responsive">
            <thead className="justify-content-between">
                <tr>
                    { selectedBoard.statusFields.map((index) => (
                        <th key={index.name}>{index.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    { selectedBoard.statusFields.map((statusField) => (
                        <td key={statusField.name} className="status-column">
                            {selectedBoard.tasks.filter((task) => task.status === statusField.name)
                            .map((task, index) => (
                                <TaskCard task={task} index={index}/>
                            ))}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    </div>
    );
};

export default Board;