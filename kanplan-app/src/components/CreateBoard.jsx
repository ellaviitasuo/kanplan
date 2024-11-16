import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatusFields from "./CreateBoardColumns";

const CreateBoardForm = ({ show, handleCloseModal, handleCreateBoard }) => {
    const [boardName, setBoardName] = useState("");
    const [statusFields, setStatusFields] = useState([{ name:"" }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const generateId = uuidv4().slice(0,8).toString();
        const newBoard = {
            boardId: generateId,
            boardName: boardName,
            statusFields: statusFields,
            tasks: [],
        };
        handleCreateBoard(newBoard);
        setBoardName("");
        setStatusFields([{name:""}]);
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
                        <h2 className="modal-title fw-2">Create a board</h2>
                            <button className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                <div className="modal-body">
                    <form id="createBoardForm">
                    <label htmlFor="boardName">Board name: </label>
                    <input type="text" 
                        id="boardName" 
                        name="boardName"
                        value={boardName}
                        required
                        className="form-control"
                        onChange={(e) => setBoardName(e.target.value)}
                    />
                    <h3 className="mb-3 mt-2 fw-4">Add status columns for the board</h3>
                    <StatusFields statusFields={statusFields} setStatusFields={setStatusFields}/>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBoardForm;