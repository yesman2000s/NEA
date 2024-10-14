import React, { useEffect } from "react";
import "./Candidates.css";

const getGridPosition = (index) => {
  const column = (index % 3) + 1; // 3 columns per row
  const row = Math.floor(index / 3) + 1; // Row starts at 1
  return { gridColumn: column, gridRow: row };
};

const Candidates = ({ CandidatesArray }) => {
  return (
    <div className="Candidates">
      {CandidatesArray.map((a) => (
        <div className="Candidate" style={getGridPosition(a - 1)} key={a}>
          {a}
        </div>
      ))}
    </div>
  );
};

export default Candidates;
