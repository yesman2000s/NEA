import React from "react";
import "./BoardOptions.css";

const BoardOptions = ({
  setCandidateMode,
  setBoard,
  SudokuBoardClass,
  CandidateMode,
  AutoCandidateMode,
  setAutoCandidateMode,
}) => {
  function HandleCandidateModeChange(e) {
    setCandidateMode(e.target.checked);
  }

  function HandleAutoCandidateModeChange(e) {
    setAutoCandidateMode(e.target.checked);
    if (e.target.checked) {
      SudokuBoardClass.AddAutoCandidates();
    } else {
      SudokuBoardClass.ClearCandidates();
    }
  }

  function HandleClearingBoard() {
    SudokuBoardClass.ClearBoard();
    setCandidateMode(false);
    setAutoCandidateMode(false);
  }

  return (
    <div className="OptionalsContainer">
      <label className="Checkbox">
        <input
          type="checkbox"
          onChange={HandleCandidateModeChange}
          checked={CandidateMode}
        />
        Candidate Mode
      </label>
      <label className="Checkbox">
        <input
          type="checkbox"
          onChange={HandleAutoCandidateModeChange}
          checked={AutoCandidateMode}
        />
        Auto-Candidate
      </label>
      <button
        onClick={() => {
          SudokuBoardClass.Solve(setBoard);
        }}
        className="Button"
      >
        Solve
      </button>

      <button className="Button" onClick={HandleClearingBoard}>
        Clear Board
      </button>
    </div>
  );
};

export default BoardOptions;
