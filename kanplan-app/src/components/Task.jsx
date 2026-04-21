import React, { useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import trash from '../assets/icons/trash.svg';
import pen from '../assets/icons/pen.svg';
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditTask from "./EditTask";

const TaskCard = ({ task, index, onDelete, onEdit }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteTask = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditTask = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);


    const handleConfirmTaskDelete = () => {
        onDelete(task.id);
        setShowDeleteModal(false);
    };

    return(
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                 className="card mb-3 flex-column" id="task-container"
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                >
                    <div className="card-header d-flex justify-content-between" id="task-header">
                        <h3 className="card-title fs-6" id="task-title" >{task.title}</h3>
                    </div>
                    <div className="card-body" id="task-body">
                        {task.description}
                    </div>
                    <div className="card-footer d-flex justify-content-end" id="task-footer">
                        <button className="btn p-0 me-3" id="task-edit-btn" onClick={handleEditTask}>
                            <img src={pen} alt="Edit task"></img>
                        </button>
                        <EditTask show={showEditModal} handleCloseModal={handleCloseEditModal}
                         onEditTask={onEdit} taskToEdit={task}/>
                        <button className="btn p-0" id="task-delete-btn" onClick={handleDeleteTask}>
                            <img src={trash} alt="Delete task"></img>
                        </button>
                        <ConfirmDeleteModal show={showDeleteModal} handleClose={handleCloseDeleteModal}
                         itemTitle={task.title} onConfirmDelete={handleConfirmTaskDelete}/>
                    </div>
                </div>
            )}
        </Draggable> 
    );
};

export default TaskCard;
