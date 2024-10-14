class Tile {
  constructor(Locked, InitialValue, Row, Column) {
    this._IsLocked = Locked;
    this._BeingChecked = false;
    this.Value = InitialValue;
    this._IsBeingConflicted = false;
    this.Candidates = [];
    this.Row = Row;
    this.Column = Column;
  }

  // Getter and Setter for IsLocked
  GetIsLocked() {
    return this._IsLocked;
  }

  SetIsLocked(State) {
    this._IsLocked = State;
  }

  // Getter and Setter for BeingChecked
  GetBeingChecked() {
    return this._BeingChecked;
  }

  SetBeingChecked(State) {
    this._BeingChecked = State;
  }

  // Getter and Setter for Value
  GetValue() {
    return this.Value;
  }

  SetValue(NewValue) {
    this.Value = NewValue;
  }

  GetIsBeingConflicted() {
    return this._IsBeingConflicted;
  }
  SetIsBeingConflicted(NewValue) {
    this._IsBeingConflicted = NewValue;
  }

  GetCandidates() {
    return this.Candidates;
  }
  SetCandidates(NewCandidates) {
    this.Candidates = NewCandidates;
  }
}

export default Tile;
