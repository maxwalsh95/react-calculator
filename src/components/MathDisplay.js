import React, { useState } from "react";

function MathDisplay(props) {
  return (
    <div>
      <input type="text" value={props.expression} />
    </div>
  );
}

export default MathDisplay;
