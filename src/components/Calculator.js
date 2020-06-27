import React, { useState } from "react";
import { evaluate } from "mathjs";
import ValueButton from "./ValButton";

function Calculator() {
  const [errored, setErrored] = useState(false);
  const [expression, setExpression] = useState("");
  const [displayExpression, setDisplayExpression] = useState("");

  function appendToExpression(value) {
    setExpression(expression + value);
    setErrored(false);
  }

  function evaluateExpression() {
    try {
      setExpression(evaluate(expression.toLowerCase()));
    } catch {
      setErrored(true);
      setExpression("");
    }
  }

  function clearExpression() {
    setExpression("");
  }

  let ValButtons = [];
  for (var i = 9; i >= 0; i--) {
    ValButtons.push(
      <ValueButton onClick={appendToExpression} key={i} value={i} display={i} />
    );
  }

  function renderInput() {
    if (errored) {
      return <input type="text" value="Error" />;
    } else {
      return <input type="text" value={expression} />;
    }
  }
  return (
    <div>
      <div>
        {renderInput()}
        <ValueButton
          onClick={appendToExpression}
          value={"Sin("}
          display={"Sin"}
        />
        <ValueButton
          onClick={appendToExpression}
          value={"Cos("}
          display={"Cos"}
        />
        <ValueButton
          onClick={appendToExpression}
          value={"Tan("}
          display={"Tan"}
        />
        <ValueButton onClick={appendToExpression} value={"("} display={"("} />
        <ValueButton onClick={appendToExpression} value={")"} display={")"} />
        <ValueButton onClick={appendToExpression} value={"%"} display={"%"} />
        <ValueButton onClick={clearExpression} value={"C"} display={"C"} />
        <ValueButton onClick={appendToExpression} value={"/"} display={"/"} />
        <ValueButton onClick={appendToExpression} value={"*"} display={"X"} />
        <ValueButton onClick={appendToExpression} value={"+"} display={"+"} />
        <ValueButton onClick={appendToExpression} value={"-"} display={"-"} />
        <ValueButton onClick={appendToExpression} value={"+"} display={"+"} />
        <ValueButton onClick={evaluateExpression} value={"="} display={"="} />
        {ValButtons}
      </div>
    </div>
  );
}

export default Calculator;
