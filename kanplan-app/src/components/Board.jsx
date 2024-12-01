import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import './Board.css';
import AddTask from "./AddTask";
import BoardColumn from "./BoardColumn";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Board = ({ selectedBoard, deleteBoard, updateBoardsList, user }) => {

    // Adding tasks to board
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const handleOpenAddTaskModal = () => setShowAddTaskModal(true);
    const handleCloseAddTaskModal = () => setShowAddTaskModal(false);
    
    // Confirming board deletion
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const handleOpenConfirmDeleteModal = () => setShowConfirmDeleteModal(true);
    const handleCloseConfirmDeleteModal = () => setShowConfirmDeleteModal(false);

    // Show tasks on the board columns
    const [tasks, setTasks] = useState(selectedBoard.tasks);
    const [statusFields, setStatusFields] = useState([selectedBoard.statusFields]);

    useEffect(() => {
        if (selectedBoard) {
            setStatusFields(selectedBoard.statusFields);
            setTasks(selectedBoard.tasks);
        }
    }, [selectedBoard]);

    const handleConfirmDeleteBoard = () => {
        deleteBoard(selectedBoard.boardId);
        setShowConfirmDeleteModal(false);
    };

    const handleAddTasks = async (task) => {
        try {
            const response = await fetch(`/.netlify/functions/addTask?boardId=${selectedBoard.boardId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token.access_token}`
                },
                body: JSON.stringify(task),
              })
            const data = await response.json();
            console.log(data.message);
            const updatedTasks = [...tasks, task];
            setTasks(updatedTasks);
            const updatedBoard = {...selectedBoard, tasks: updatedTasks};
            updateBoardsList(updatedBoard);
        }
        catch (error) {
            console.error('Error adding task to board: ', error);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        const updatedTasks = tasks.map((task) => 
            task.id === taskId ? {...task, status: newStatus} : task
        );
        const updatedBoard = {...selectedBoard, tasks: updatedTasks};
        setTasks(updatedTasks);
        try {
            const response = await fetch(`/.netlify/functions/updateTaskStatus?boardId=${selectedBoard.boardId}&taskId=${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token.access_token}`
                },
                body: JSON.stringify(newStatus),
              })
            const data = await response.json();
            console.log(data.message);
            updateBoardsList(updatedBoard);
        }
        catch (error) {
            console.error('Error updating task status: ', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`/.netlify/functions/deleteTask?boardId=${selectedBoard.boardId}&taskId=${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token.access_token}`
                },
            })
            const data = await response.json();
            console.log(data.message);
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            const updatedBoard = {...selectedBoard, tasks: updatedTasks};
            setTasks(updatedTasks);
            updateBoardsList(updatedBoard);
        }
        catch (error) {
            console.error('Error updating task status: ', error);
        }
    }

    const onDragEnd = async (result) => {
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
                 onClick={handleOpenConfirmDeleteModal}>
                    Delete {selectedBoard.boardName}
                </button>
                <ConfirmDeleteModal show={showConfirmDeleteModal} handleClose={handleCloseConfirmDeleteModal}
                         itemTitle={selectedBoard.boardName} onConfirmDelete={handleConfirmDeleteBoard}/>
                <button type="button" className="btn btn-primary custom-button me-3" 
                 onClick={handleOpenAddTaskModal}>
                    Add task
                </button>
                <AddTask show={showAddTaskModal} board={selectedBoard} 
                 handleCloseModal={handleCloseAddTaskModal} onAddTask={handleAddTasks}/>
            </div>
            <h1 className="custom-heading me-3 mb-5 fs-1">{selectedBoard.boardName}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{display: 'grid', gridAutoColumns: 'minmax(0, 1fr)', gridAutoFlow: 'column'}}>
                    { statusFields.map((statusField) => (
                        <BoardColumn 
                         statusFieldName={statusField.name}
                         tasks={tasks.filter((task) => task.status === statusField.name)}
                         droppableId={statusField.name}
                         key={statusField.name}
                         onDeleteTask={deleteTask}
                        />
                    )) }
                </div>
            </DragDropContext>
        </div>
    );
};

export default Board;