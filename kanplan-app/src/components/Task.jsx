import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index }) => {
    
    return(
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                 className="card mb-3 flex-column"
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                >
                    <div className="card-header">
                        <h3 className="card-title fs-6">{task.title}</h3>
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
