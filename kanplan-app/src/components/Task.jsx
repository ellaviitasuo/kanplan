import React, { useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import trash from '../assets/icons/trash.svg';
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const TaskCard = ({ task, index, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const handleDeleteTask = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleConfirmTaskDelete = () => {
        onDelete(task.id);
        setShowModal(false);
    };

    return(
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                 className="card mb-3 flex-column"
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                >
                    <div className="card-header d-flex justify-content-between">
                        <h3 className="card-title fs-6">{task.title}</h3>
                        <button className="btn p-0" onClick={handleDeleteTask}>
                            <img src={trash} alt="Delete task"></img>
                        </button>
                        <ConfirmDeleteModal show={showModal} handleClose={handleCloseModal}
                         itemTitle={task.title} onConfirmDelete={handleConfirmTaskDelete}/>
                    </div>
                    <div className="card-body">
                        {task.description}
                    </div>
                </div>
            )}
        </Draggable> 
    );
};

export default TaskCard;
