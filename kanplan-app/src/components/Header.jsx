import logo from '../assets/images/logo.png';
import './Header.css';

const Header = ({ handleOpenModal, boards, onSelectBoard, selectedBoard}) => {

    return (  
        <>
            <header className="d-flex justify-content-between align-items-center p-3  custom-header">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="KanPlan Logo" className="me-3 img-fluid custom-logo"/>
                </div>
                <div className="header-actions">
                    {boards.length > 0 && (
                        <div>
                            <select
                                onChange={(e) => onSelectBoard(e.target.value)}
                                className='form-select'
                                value={selectedBoard.boardName || ''}
                            >
                                <option value=""> Select board </option>
                                {boards.map((board, index) => (
                                    <option key={index} value={board.boardName}>
                                        {board.boardName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary custom-button" onClick={handleOpenModal}>
                        New board
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;