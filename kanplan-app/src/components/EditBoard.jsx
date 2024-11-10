import { useState } from "react";

const EditBoardForm = ({ show, handleCloseModal, onEditBoard, editedBoard }) => {
    const [editedBoardName, setEditedBoardName] = useState(editedBoard.boardName);
    const [editedStatusFields, setEditedStatusFields] = useState(editedBoard.statusFields);
    const [editedTasks, setEditedTasks] = useState(editedBoard.tasks);

    const handleEditStatusField = (index, newStatus) => {
        const oldStatus = editedStatusFields[index].name;
        const updatedTasks = editedTasks.map((task) => 
            task.status === oldStatus ? {...task, status:newStatus} : task
        );
        setEditedTasks(updatedTasks);
        const updatedStatusFields = [...editedStatusFields];
        updatedStatusFields[index] = {...updatedStatusFields[index], name: newStatus} 
        setEditedStatusFields(updatedStatusFields);
    };

    // If statusfield that is removed has tasks they are reset to the first status
    const handleRemoveStatusField = (index) => {
        const oldStatus = editedStatusFields[index].name;
        const updatedTasks = editedTasks.map((task) => 
            task.status === oldStatus ? {...task, status: editedStatusFields[0].name} : task
        );
        setEditedTasks(updatedTasks);
        const updatedFields = editedStatusFields.filter((_, i) => i !== index);
        setEditedStatusFields(updatedFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBoard = {
            // BoardId does not change when updating the board
            boardId: editedBoard.boardId,
            boardName: editedBoardName,
            statusFields: editedStatusFields,
            tasks: editedTasks,
        };
        console.log("Updated board: ", updatedBoard)
        onEditBoard(updatedBoard);
        handleCloseModal();
    };
    
    if (!show) return null;
    return (
        <div 
            className={`modal fade ${show ? "show d-block" : "d-none"}`}
             tabIndex="-1"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title fw-2">Edit board {editedBoard.boardName}</h2>
                            <button className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                <div className="modal-body">
                    <form id="editBoardForm">
                    <label htmlFor="boardName">Board name: </label>
                    <input type="text" 
                        id="boardName" 
                        name="boardName"
                        value={editedBoardName}
                        required
                        className="form-control"
                        onChange={(e) => setEditedBoardName(e.target.value)}
                    />
                    <h2 className="mb-3 mt-2 fw-4" >Edit status columns for the board</h2>
                    {editedBoard.statusFields.map((field, index) => (
                        <div key={field.name} className='form-row mb-3'>
                            <div className="d-flex justify-content-between align-items-center">
                                <label className="me-2" htmlFor={`statusField-${index}`}> 
                                    Column name
                                </label>
                                <button type='button' className='btn-close me-2 mt-2'
                                 onClick={() => handleRemoveStatusField(index)}
                                 disabled={editedStatusFields.length <= 1}
                                >
                                </button>
                            </div>
                            <input className="form-control"
                             value={field.name}
                             onChange={e => handleEditStatusField(index, e.target.value)}
                             type='text'
                             required
                            />
                        </div>
                    ))}
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBoardForm;