import React from "react";

const TaskCard = ({ task, index }) => {
    
    return(
        <div key={index} className="card">
            <div className="card-header">
                {task.taskTitle}
            </div>
            <div className="card-body">
                {task.description}
            </div>
        </div>       
    );
};

export default TaskCard;
