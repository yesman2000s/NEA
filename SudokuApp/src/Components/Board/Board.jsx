import React, { useEffect, useState } from "react";
import "./Board.css";
import Tile from "../Tile/Tile";
import SudokuBoard from "./BoardClass";
import BoardOptions from "../BoardOptions/BoardOptions";
const SudokuBoardClass = new SudokuBoard();

const Board = () => {
  const [Board, setBoard] = useState(SudokuBoardClass.Board);
  const [SelectedTile, setSelectedTile] = useState();
  const [LastKeyPressed, setLastKeyPressed] = useState("");

  const [CandidateMode, setCandidateMode] = useState(false);
  const [AutoCandidateMode, setAutoCandidateMode] = useState(false);

  const [ChangedTiles, setChangedTiles] = useState([]);

  SudokuBoardClass.setBoardDisplay = setBoard;

  function AddChangedTile(Location, PreviousValue) {
    if (PreviousValue === "" || PreviousValue === 0) {
      PreviousValue = 0;
    }
    const ChangedTileInfo = {
      Location: Location,
      PreviousValue: PreviousValue,
    };
    setChangedTiles((prevChangedTiles) => {
      const newChangedTiles = [...prevChangedTiles, ChangedTileInfo];
      return newChangedTiles;
    });
  }

  function OnTileChanged(Location, PreviousValue) {
    if (AutoCandidateMode) {
      SudokuBoardClass.AddAutoCandidates();
    }
    AddChangedTile(Location, PreviousValue);
  }

  function HandleUndo() {
    if (ChangedTiles.length > 0) {
      setChangedTiles((prevChanges) => {
        if (prevChanges.length === 0) return prevChanges;

        const lastChange = prevChanges[prevChanges.length - 1];
        const { Location, PreviousValue } = lastChange;
        const [row, col] = Location;

        SudokuBoardClass.Board[row][col].SetValue(PreviousValue);

        setBoard([...SudokuBoardClass.Board]);

        return prevChanges.slice(0, -1);
      });
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      setLastKeyPressed(e.key);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (LastKeyPressed == "z") {
      HandleUndo();
      setLastKeyPressed("");
    }
    SudokuBoardClass.ValidateTiles();
  }, [LastKeyPressed]);

  return (
    <>
      <div className="Board">
        {Board.map((Row, RowIndex) => {
          return Row.map((TileObject, TileIndex) => {
            return (
              <Tile
                key={`${RowIndex} , ${TileIndex}`}
                IsLocked={TileObject.GetIsLocked()}
                IsBeingChecked={TileObject.GetBeingChecked()}
                TileObject={TileObject}
                SelectedTile={SelectedTile}
                setSelectedTile={setSelectedTile}
                LastKeyPressed={LastKeyPressed}
                setLastKeyPressed={setLastKeyPressed}
                Column={TileIndex}
                Row={RowIndex}
                CandidateMode={CandidateMode}
                OnTileValueUpdate={OnTileChanged}
              />
            );
          });
        })}
      </div>
      <BoardOptions
        setCandidateMode={setCandidateMode}
        setBoard={setBoard}
        SudokuBoardClass={SudokuBoardClass}
        CandidateMode={CandidateMode}
        AutoCandidateMode={AutoCandidateMode}
        setAutoCandidateMode={setAutoCandidateMode}
      />
    </>
  );
};

export default Board;
