import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import './Board.css';
import AddTask from "./AddTask";
import BoardColumn from "./BoardColumn";

const Board = ({ selectedBoard, deleteBoard, updateBoardsList }) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [tasks, setTasks] = useState(selectedBoard.tasks);
    const [statusFields, setStatusFields] = useState([selectedBoard.statusFields]);

    useEffect(() => {
        if (selectedBoard) {
            setStatusFields(selectedBoard.statusFields);
            setTasks(selectedBoard.tasks);
        }
    }, [selectedBoard]);

    const handleAddTasks = (task) => {
        const updatedTasks = [...tasks, task];
        const updatedBoard = {...selectedBoard, tasks: updatedTasks};
        setTasks(updatedTasks);
        updateBoardsList(updatedBoard);
    };

    const updateTaskStatus = (taskId, newStatus) => {
        const updatedTasks = tasks.map((task) => 
            task.id === taskId ? {...task, status: newStatus} : task
        );
        const updatedBoard = {...selectedBoard, tasks: updatedTasks};
        setTasks(updatedTasks);
        updateBoardsList(updatedBoard);

    };

    const onDragEnd = (result) => {
        const {source, destination, draggableId} = result;
        if (!destination) return;
        
        console.log("source.droppableId: ", source.droppableId);
        console.log("destination.droppableId: ", destination.droppableId);

        updateTaskStatus(draggableId, destination.droppableId);
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
            <h1 className="custom-heading me-3 mb-5 fs-1">{selectedBoard.boardName}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="d-flex flex-row">
                    { statusFields.map((statusField) => (
                        <BoardColumn 
                         statusFieldName={statusField.name}
                         tasks={tasks.filter((task) => task.status === statusField.name)}
                         droppableId={statusField.name}
                         key={statusField.name}
                        />
                    )) }
                </div>
            </DragDropContext>
        </div>
    );
};

export default Board;