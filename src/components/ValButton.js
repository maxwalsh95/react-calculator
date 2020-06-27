import React, { useState } from "react";

function ValueButton(props) {
  return (
    <button onClick={() => props.onClick(props.value)}>{props.display}</button>
  );
}

export default ValueButton;
