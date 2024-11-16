const ConfirmDeleteModal = ({ show, handleClose, itemTitle, onConfirmDelete}) => {
    
    if (!show) return null;

    return (
        <div 
            className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
             tabIndex="-1"
        >
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h2 className='modal-title'> Delete {itemTitle}</h2>
                    </div>
                    <div className='modal-body'>
                        <p>Are you sure you want to delete {itemTitle}?</p>
                    </div>
                    <div className='modal-footer'>
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type='button' className='btn btn-danger' onClick={onConfirmDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;