import React, {useState} from 'react';
import logo from '../assets/images/logo.png';
import './Header.css';
import ModalComponent from './Modal';

const Header = () => {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const modalHeader = 'Create New Board';

    return (  
        <>
            <header className="d-flex justify-content-between align-items-center p-3  custom-header">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="KanPlan Logo" className="me-3 img-fluid custom-logo"/>
                </div>
                <div className='header-actions'>
                    <button className="btn btn-primary custom-button" onClick={handleOpenModal}>
                    New board
                    </button>
                </div>
            </header>
            <ModalComponent show={showModal} handleClose={handleCloseModal} modalHeader={modalHeader}>
                <form onSubmit={(e) => {e.preventDefault();}}>
                    <label htmlFor='boardName'>Board name: </label>
                    <input type='text' 
                        id='boardName' 
                        name='boardName'
                        required
                        className='form-control'
                    />
                    <button type='submit' className='btn btn-success mt-3'>
                        Create
                    </button>
                    {/* Here some way to continuously add new fields as states */}
                </form>
            </ModalComponent>
        </>
    );
};

export default Header;