import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { evaluate } from 'mathjs';
import ValueButton from './ValButton';
import LightenDarkenColor from '../Utils';
import mq from '../styles/mq';

export default function Calculator() {
  const [errored, setErrored] = useState(false);
  const [waitingForNum, setWaitingForNum] = useState(false);
  const [decimalInNum, setDecimalInNum] = useState(false);
  const [expression, setExpression] = useState('');

  const calculator = css`
    width: 100%;
    padding: 10px 10px 20px 10px;

    background-color: #afaff2;
    border-radius: 10px;

    -webkit-box-shadow: 0px 20px 0px 0px rgba(66, 66, 135, 1);
    -moz-box-shadow: 0px 20px 0px 0px rgba(66, 66, 135, 1);
    box-shadow: 0px 20px 0px 0px rgba(66, 66, 135, 1);

    ${mq[2]} {
      width: 500px;
    }
  `;

  const expressionInput = css`
    background-color: #f9f6f6;
    border-radius: 5px;
    border: none;
    padding: 10px 20px;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 10px 0;
    width: 100%;
    text-align: right;
  `;

  const numpad = css`
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(5, 1fr);
  `;

  const calcButton = (colNum, bgColor = '#f7c88b') =>
    css`
      background-color: ${bgColor};
      grid-column: ${colNum};
      border-radius: 5px;
      border: none;
      padding: 10px 0;
      margin: 4px;
      font-weight: bold;
      font-size: 1.2rem;
      box-shadow: 0px 5px 0px 0px ${LightenDarkenColor(bgColor, -80)};
      transition: background-color 0.05s;

      &:hover {
        background-color: ${LightenDarkenColor(bgColor, 30)};
        cursor: pointer;
      }

      &:active {
        transform: translateY(5px);
        box-shadow: none;
      }
    `;

  function appendToExpression(value) {
    const isOperator = isNaN(parseInt(value, 10)) && value !== '.';

    if (isOperator) {
      if (waitingForNum) return;
      setWaitingForNum(true);
      setDecimalInNum(false);
    } else if (value === '.') {
      if (decimalInNum) return;
      setDecimalInNum(true);
    } else {
      setWaitingForNum(false);
    }

    setExpression(expression + value);
    setErrored(false);
  }

  function evaluateExpression() {
    try {
      setExpression(evaluate(expression.toLowerCase()).toString());
    } catch (e) {
      setErrored(true);
    }
  }

  function clearExpression() {
    setErrored(false);
    setDecimalInNum(false);
    setExpression('');
  }

  function handleChange(event) {
    setExpression(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) evaluateExpression();
  }

  const ValButtons = [];
  for (let i = 9; i >= 0; i -= 1) {
    let colStart;
    if (i % 3 === 2 || i === 0) {
      colStart = 2;
    } else if (i % 3 === 0) {
      colStart = 1;
    } else {
      colStart = 3;
    }

    ValButtons.push(
      <ValueButton
        css={calcButton(colStart, '#f78b8b')}
        onClick={appendToExpression}
        key={i}
        value={i}
        display={i}
      />
    );
  }

  function renderInput() {
    if (errored) {
      return (
        <input
          css={expressionInput}
          onChange={handleChange}
          type="text"
          value="Error"
        />
      );
    } else {
      return (
        <input
          css={expressionInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          value={expression}
        />
      );
    }
  }

  return (
    <div css={calculator}>
      {renderInput()}
      <div css={numpad}>
        {ValButtons}
        <ValueButton
          css={calcButton(5)}
          onClick={appendToExpression}
          value={'Sin('}
          display={'Sin'}
          type={'function'}
        />

        <ValueButton
          css={calcButton(5)}
          onClick={appendToExpression}
          value={'Cos('}
          display={'Cos'}
          type={'function'}
        />

        <ValueButton
          css={calcButton(5)}
          value={'Tan('}
          display={'Tan'}
          type={'function'}
        />

        <ValueButton
          css={calcButton(1)}
          onClick={appendToExpression}
          value={'('}
          type={'operator'}
          display={'('}
        />

        <ValueButton
          css={calcButton(3)}
          onClick={appendToExpression}
          value={')'}
          type={'operator'}
          display={')'}
        />

        <ValueButton
          css={calcButton(4)}
          onClick={appendToExpression}
          value={'%'}
          type={'operator'}
          display={'%'}
        />

        <ValueButton
          css={calcButton(1)}
          onClick={clearExpression}
          value={'C'}
          type={'operator'}
          display={'C'}
        />

        <ValueButton
          css={calcButton(4)}
          onClick={appendToExpression}
          value={'/'}
          type={'operator'}
          display={'÷'}
        />

        <ValueButton
          css={calcButton(4)}
          onClick={appendToExpression}
          value={'*'}
          type={'operator'}
          display={'x'}
        />

        <ValueButton
          css={calcButton(4)}
          onClick={appendToExpression}
          value={'-'}
          type={'operator'}
          display={'-'}
        />

        <ValueButton
          css={calcButton(4)}
          onClick={appendToExpression}
          value={'+'}
          type={'operator'}
          display={'+'}
        />

        <ValueButton
          css={calcButton(3)}
          onClick={evaluateExpression}
          value={'='}
          type={'operator'}
          display={'='}
        />

        <ValueButton
          css={calcButton(2)}
          onClick={appendToExpression}
          value={'.'}
          type={'decimal'}
          display={'.'}
        />
      </div>
    </div>
  );
}
