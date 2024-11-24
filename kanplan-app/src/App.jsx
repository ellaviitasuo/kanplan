import React, {useEffect, useState} from 'react'; 
import Header from './components/Header';
import CreateBoardForm from './components/CreateBoard';
import "bootstrap/dist/css/bootstrap.css";
import Board from './components/Board';
import netlifyIdentity from "netlify-identity-widget";

function App() {

  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);
  const [selectedBoard, setSelectBoard] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on("logout", () => {
      setUser(null);
    });
  }, []);
  
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

  const handleDeleteBoard = (boardId) => {
    setSelectBoard('');
    const updatedBoards = boards.filter((board) => board.boardId !== boardId);
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  }

  const updateBoardsList = (updatedBoard) => {
    const updatedBoards = boards.map((board) =>
      board.boardId === updatedBoard.boardId ? updatedBoard : board
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
      <Header handleOpenModal={handleOpenModal} boards={boards} onSelectBoard={handleSelectBoard} selectedBoard={selectedBoard} user={user}/>
      <CreateBoardForm  show={showModal} handleCloseModal={handleCloseModal} handleCreateBoard={handleCreateBoard} user={user}/>
      <div>
        {!user ? (
          <h1 className=" fs-3 mb-3 mt-2">Please login to use KanPlan </h1>
        ) : selectedBoard ? (
          <Board selectedBoard={selectedBoard} deleteBoard={handleDeleteBoard} updateBoardsList={updateBoardsList}/>
        ) : (
          <h1 className=" fs-3 mb-3 mt-2">Select board or create a new board to display board</h1>
        )}
      </div>
    </>
  );
};

export default App;
