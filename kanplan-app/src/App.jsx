import React, {useEffect, useState} from 'react'; 
import Header from './components/Header';
import CreateBoardForm from './components/CreateBoard';
import "bootstrap/dist/css/bootstrap.css";
import Board from './components/Board';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);
  const [selectedBoard, setSelectBoard] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");
      if (storedBoards) {
        const parsedBoards = JSON.parse(storedBoards);
        setBoards(parsedBoards);
        console.log("Loaded boards from storage", parsedBoards);
      }
  }, []);

  const handleCreateBoard = (newBoard) => {
    console.log(newBoard)
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const handleSelectBoard = (boardName) => {
    const board = boards.find(b => b.boardName === boardName)
    if (board) {
      setSelectBoard(board);
      console.log("Selected board on handleSelectBoard: ", boardName)
    } else {
      console.warn("No board found with name: ", boardName)
    }
  };

  const handleDeleteBoard = (boardName) => {
    setSelectBoard('');
    const updatedBoards = boards.filter((board) => board.boardName !== boardName);
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  }

  const updateBoardsList = (updatedBoard) => {
    const updatedBoards = boards.map((board) =>
      board.boardName === updatedBoard.boardName ? updatedBoard : board
    );
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  useEffect(() => {
    console.log("Current boards: ", boards);
    }, [boards]);

  useEffect(() => {
    console.log("Updated selected board: ", selectedBoard);
    }, [selectedBoard]);

  return (
    <>
      <Header handleOpenModal={handleOpenModal} boards={boards} onSelectBoard={handleSelectBoard} selectedBoard={selectedBoard}/>
      <CreateBoardForm  show={showModal} handleCloseModal={handleCloseModal} handleCreateBoard={handleCreateBoard}/>
      <div>
        {selectedBoard ? (
          <Board selectedBoard={selectedBoard} deleteBoard={handleDeleteBoard} updateBoardsList={updateBoardsList}/>
        ) : (
          <h1 className=" fs-3 mb-3 mt-2">Select board or create a new board to display board</h1>
        )}
      </div>
    </>
  );
};

export default App;
