const ConfirmDeleteModal = ({ show, handleClose, itemTitle, onConfirmDelete}) => {
    
    if (!show) return null;

    return (
        <div 
            className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
             tabIndex="-1"
        >
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content' id="confirm-container">
                    <div className='modal-header'  id="confirm-container-header">
                        <h2 className='modal-title'  id="confirm-container-title"> Delete {itemTitle}</h2>
                    </div>
                    <div className='modal-body'  id="confirm-container-body">
                        <p>Are you sure you want to delete {itemTitle}?</p>
                    </div>
                    <div className='modal-footer'  id="confirm-container-footer">
                        <button type="button" className="btn btn-secondary"  id="confirm-container-cancel-btn" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type='button' className='btn btn-danger'  id="confirm-container-delete-btn" onClick={onConfirmDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;