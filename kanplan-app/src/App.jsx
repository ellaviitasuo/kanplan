import React, {useEffect, useState} from 'react'; 
import Header from './components/Header';
import CreateBoardForm from './components/CreateBoard';
import "bootstrap/dist/css/bootstrap.css";
import Board from './components/Board';
import netlifyIdentity from "netlify-identity-widget";

function App() {

  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectBoard] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    // if reload try to fetch user from localStorage first 
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    netlifyIdentity.init();
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      netlifyIdentity.close();
    });
    netlifyIdentity.on("logout", () => {
      setUser(null);
      clearLocalStorage();
    });
  }, []);
  
  useEffect(() => {
    if (user) {
      fetchBoards();
    }
  }, [user]);

  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem("boards", JSON.stringify(boards));
    }
  }, [boards]);

  useEffect(() => {
    console.log("Current boards: ", boards);
    }, [boards]);

  useEffect(() => {
    console.log("Updated selected board: ", selectedBoard);
    }, [selectedBoard]);

  const clearLocalStorage = () => {
    localStorage.removeItem("boards");
    localStorage.removeItem("user");
  };
  
  const fetchBoards = async () => {
    try {
      const user = netlifyIdentity.currentUser();
      const response = await fetch('/.netlify/functions/getBoards', {
        headers: {
          "Authorization": `Bearer ${user.token.access_token}`,
        }
      });
      const data = await response.json();
      console.log(data.message);
      setBoards(data.boards);
      localStorage.setItem("boards", JSON.stringify(data.boards));
    }
    catch (error) {
      console.log("Error fetching boards", error);
      const cachedBoards = localStorage.getItem("boards");
      if (cachedBoards) {
        setBoards(JSON.parse(cachedBoards));
        console.log("Fething boards failed, loading boards from localStorage");
      } else {
        console.log("No boards in local storage, boards list is empty.");
        setBoards([]);
      }
    }
  };

  const handleCreateBoard = async (newBoard) => {
    const user = netlifyIdentity.currentUser();
    console.log(newBoard);
    try {
      const response = await fetch('/.netlify/functions/postBoard', {
        method:"POST",
        headers: {
          "Authorization": `Bearer ${user.token.access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBoard),
      })
      const data = await response.json();
      console.log(data.message);
      console.log(data.newBoard);
      const updatedBoards = [...boards, newBoard];
      setBoards(updatedBoards);
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
    }
    catch (error) {
      console.error("Error adding board ", error)
    }
  };

  const handleSelectBoard = (boardName) => {
    const board = boards.find(b => b.boardName === boardName);
    if (board) {
      setSelectBoard(board);
      console.log("Selected board on handleSelectBoard: ", boardName);
    } else {
      console.warn("No board found with name: ", boardName);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    setSelectBoard('');
    try {
      const response = await fetch(`/.netlify/functions/deleteBoard?boardId=${boardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token.access_token}`
        },
      })
      const data = await response.json();
      console.log(data.message);
      const updatedBoards = boards.filter((board) => board.boardId !== boardId);
      setBoards(updatedBoards);
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
    } 
    catch (error) {
      console.error("Error deleting board", error);
    }

  };

  const updateBoard = async (boardId) => {
    try {
      const user = netlifyIdentity.currentUser();
      const response = await fetch(`/.netlify/functions/getBoard?boardId=${boardId}`, {
        headers: {
          "Authorization": `Bearer ${user.token.access_token}`,
        }
      });
      const data = await response.json();
      console.log(data.message);
      console.log(data.board);
      const updatedBoard = data.board;
      const updatedBoards = boards.map((board) =>
        board.boardId === updatedBoard.boardId ? updatedBoard : board
      );
      setBoards(updatedBoards);
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
    }
    catch (error) {
      console.log("Error fetching board", error);
    }
  };

  const updateBoardsList = (updatedBoard) => {
    const updatedBoards = boards.map((board) =>
      board.boardId === updatedBoard.boardId ? updatedBoard : board
    );
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  return (
    <>
      <Header handleOpenModal={handleOpenModal} boards={boards} onSelectBoard={handleSelectBoard} selectedBoard={selectedBoard} user={user}/>
      <CreateBoardForm  show={showModal} handleCloseModal={handleCloseModal} handleCreateBoard={handleCreateBoard} user={user}/>
      <div>
        {!user ? (
          <h1 className=" fs-3 mb-3 mt-2">Please login to use KanPlan </h1>
        ) : selectedBoard ? (
          <Board selectedBoard={selectedBoard} deleteBoard={handleDeleteBoard} updateBoardsList={updateBoardsList} user={user}/>
        ) : (
          <h1 className=" fs-3 mb-3 mt-2">Select board or create a new board to display board</h1>
        )}
      </div>
    </>
  );
};

export default App;
