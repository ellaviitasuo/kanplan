import { useState } from 'react';

const ModalComponent = ({ show, handleClose, handleSubmit, modalHeader, children}) => {
    
    if (!show) return null;

    return (
        <div 
            className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
             tabIndex="-1"
        >
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h2 className='modal-title'>{modalHeader}</h2>
                        <button className='btn-close' onClick={handleClose}>
                        </button>
                    </div>
                    <div className='modal-body'>
                        {children}
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-success' onClick={handleSubmit}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;