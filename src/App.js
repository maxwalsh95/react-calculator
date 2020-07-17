import React from 'react';
import Calculator from './components/Calculator';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import './App.css';

export default function App() {
  const app = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    height: 100%;
  `;

  const credit = css`
    font-family: 'Merriweather', serif;
    font-size: 18px;

    a {
      color: #242424;
      text-decoration: none;

      &: hover {
        cursor: pointer;
        border-bottom: 4px solid red;
      }
    }
  `;
  return (
    <div css={app}>
      <Calculator />
      <p css={credit}>
        <a href="https://www.github.com/maxwalsh95">made by Max Walsh</a>
      </p>
    </div>
  );
}
