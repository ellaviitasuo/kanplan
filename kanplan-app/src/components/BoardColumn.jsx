import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./Task";

const BoardColumn = ({ statusFieldName, tasks, droppableId }) => {

    return(
        <div className="card flex-column flex-fill me-3">
            <div className="card-header">
                <h2 className="fs-6"> {statusFieldName} </h2>
            </div>
            <Droppable droppableId={droppableId}>
                {(provided) => (        
                    <div ref={provided.innerRef} {...provided.droppableProps} className="card-body">
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default BoardColumn;