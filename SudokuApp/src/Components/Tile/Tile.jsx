import React, { useEffect, useState } from "react";
import "./Tile.css";

import classNames from "classnames";
import Candidates from "../Candidates/Candidates";

function DisplayInitalValue(TileObject) {
  if (TileObject.GetValue() == 0) {
    return "";
  } else {
    return TileObject.GetValue();
  }
}

const Tile = ({
  IsLocked,
  IsBeingChecked,
  TileObject,
  setSelectedTile,
  SelectedTile,
  LastKeyPressed,
  setLastKeyPressed,
  Column,
  Row,
  CandidateMode,
  OnTileValueUpdate,
}) => {
  const [digit, setDigit] = useState(DisplayInitalValue(TileObject));
  const [candidates, setCandidates] = useState(TileObject.GetCandidates());

  const IsTileSelected = SelectedTile == TileObject;

  const RightBorder = (Column + 1) % 3 == 0 && Column != 8;
  const BottomBorder = (Row + 1) % 3 == 0 && Row != 8;

  function ValidateKeyPress() {
    if (/^[1-9]$/.test(LastKeyPressed)) {
      setDigit(LastKeyPressed);
      TileObject.SetValue(Number(LastKeyPressed));
      OnTileValueUpdate([Row, Column], digit);
    } else if (LastKeyPressed == "Backspace") {
      setDigit("");
      TileObject.SetValue(0);
      OnTileValueUpdate([Row, Column], digit);
    }
    setLastKeyPressed("");
  }

  function ValidateCandidateEntry() {
    const ExistingCandidates = [...TileObject.GetCandidates()];
    if (/^[1-9]$/.test(LastKeyPressed)) {
      const keyNumber = Number(LastKeyPressed);
      const index = ExistingCandidates.indexOf(keyNumber);
      if (index === -1) {
        ExistingCandidates.push(keyNumber);
      } else {
        ExistingCandidates.splice(index, 1);
      }
    } else if (LastKeyPressed == "Backspace") {
      ExistingCandidates.pop();
    }

    setCandidates(ExistingCandidates);
    TileObject.SetCandidates(ExistingCandidates);

    setLastKeyPressed("");
  }

  function handleClick(e) {
    if (TileObject.GetIsLocked()) {
      return;
    }
    if (IsTileSelected) {
      setSelectedTile(null);
    } else {
      setSelectedTile(TileObject);
    }
  }
  useEffect(() => {
    if (IsTileSelected && !CandidateMode) {
      ValidateKeyPress();
    } else if (IsTileSelected && CandidateMode) {
      ValidateCandidateEntry();
    }
  }, [LastKeyPressed]);

  useEffect(() => {
    setDigit(DisplayInitalValue(TileObject));
  }, [TileObject.Value]);

  useEffect(() => {
    setCandidates([...TileObject.GetCandidates()]);
  }, [TileObject.Candidates]);

  let ClassName = classNames("Tile", {
    Locked: IsLocked,
    BeingChecked: IsBeingChecked,
    Selected: IsTileSelected,
    RightBorder: RightBorder,
    BottomBorder: BottomBorder,
  });

  return (
    <div className={ClassName} onClick={handleClick}>
      <div className="Digit">{digit}</div>
      {
        <div
          className={`Conflict ${
            TileObject.GetIsBeingConflicted() ? "Show" : ""
          }`}
        ></div>
      }
      {TileObject.GetValue() == 0 && (
        <Candidates CandidatesArray={candidates} />
      )}
    </div>
  );
};

export default Tile;
