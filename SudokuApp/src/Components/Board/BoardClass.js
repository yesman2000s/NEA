import Tile from "../Tile/TileClass";

class SudokuBoard {
  constructor() {
    let Board = [];

    for (let y = 0; y < 9; y++) {
      let Row = [];
      for (let x = 0; x < 9; x++) {
        let TileObject = new Tile(false, 0, y, x);
        Row.push(TileObject);
      }
      Board.push(Row);
    }

    this.Board = Board;
    this._BeingSolved = false;
  }

  SetBeingSolved(Value) {
    this._BeingSolved = Value;
  }
  GetBeingSolved() {
    return this._BeingSolved;
  }

  SetBoard(Board) {
    this.Board = Board;
  }

  Solve() {
    for (let RowIndex in this.Board) {
      for (let TileIndex in this.Board[RowIndex]) {
        this.Board[RowIndex][TileIndex].SetBeingChecked(
          !this.Board[RowIndex][TileIndex].GetBeingChecked()
        );
        this.setBoardDisplay([...this.Board]);
      }
    }
  }
  AddAutoCandidates() {
    for (let RowIndex in this.Board) {
      for (let TileIndex in this.Board[RowIndex]) {
        let Tile = this.Board[RowIndex][TileIndex];
        let PossibleCandidates = [];

        for (
          let PossibleCandidate = 1;
          PossibleCandidate < 10;
          PossibleCandidate++
        ) {
          if (this.IsTileValid(RowIndex, TileIndex, PossibleCandidate)) {
            PossibleCandidates.push(PossibleCandidate);
          }
        }
        Tile.SetCandidates(PossibleCandidates);
      }
    }
    this.setBoardDisplay([...this.Board]);
  }

  ClearCandidates() {
    for (let RowIndex in this.Board) {
      for (let TileIndex in this.Board[RowIndex]) {
        let Tile = this.Board[RowIndex][TileIndex];
        Tile.SetCandidates([]);
      }
    }
    this.setBoardDisplay([...this.Board]);
  }

  IsTileValid(RowIndex, TileIndex, TileValue) {
    const ThisTile = this.Board[RowIndex][TileIndex];
    if (!TileValue) {
      TileValue = ThisTile.GetValue();
    }

    if (TileValue === 0) {
      return true;
    }

    for (let i = 0; i < 9; i++) {
      if (i !== TileIndex && this.Board[RowIndex][i].GetValue() === TileValue) {
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (i !== RowIndex && this.Board[i][TileIndex].GetValue() === TileValue) {
        return false;
      }
    }

    const StartRow = RowIndex - (RowIndex % 3);
    const StartColumn = TileIndex - (TileIndex % 3);
    for (let i = StartRow; i < StartRow + 3; i++) {
      for (let j = StartColumn; j < StartColumn + 3; j++) {
        if (i !== RowIndex || j !== TileIndex) {
          if (this.Board[i][j].GetValue() === TileValue) {
            return false;
          }
        }
      }
    }

    return true;
  }

  ValidateTiles() {
    for (let RowIndex = 0; RowIndex < 9; RowIndex++) {
      for (let TileIndex = 0; TileIndex < 9; TileIndex++) {
        let Tile = this.Board[RowIndex][TileIndex];
        const IsTileValid = this.IsTileValid(RowIndex, TileIndex);

        if (!IsTileValid) {
          Tile.SetIsBeingConflicted(true);
        } else {
          Tile.SetIsBeingConflicted(false);
        }
      }
    }
    this.setBoardDisplay([...this.Board]);
  }

  ClearBoard() {
    for (let RowIndex = 0; RowIndex < 9; RowIndex++) {
      for (let TileIndex = 0; TileIndex < 9; TileIndex++) {
        this.Board[RowIndex][TileIndex].SetValue(0);
        this.Board[RowIndex][TileIndex].SetCandidates([]);
      }
    }
    this.ValidateTiles();
    this.setBoardDisplay([...this.Board]);
  }
}

export default SudokuBoard;
