import { useState } from 'react';
import './App.css'

function Buttons({ clear, appendValue, calculateResult, changeSign, percent }) {
  return (
    <>
      <button className="clear-button" onClick={clear}>C</button>
      <button className="operator-button" onClick={changeSign}>+-</button>
      <button className="operator-button" onClick={percent}>%</button>
      <button className="operator-button" onClick={() => appendValue('+')}>+</button>
      <button className="operator-button" onClick={() => appendValue('-')}>-</button>
      <button className="operator-button" onClick={() => appendValue('*')}>*</button>
      <button className="operator-button" onClick={() => appendValue('/')}>/</button>
      <button onClick={() => appendValue('9')}>9</button>
      <button onClick={() => appendValue('5')}>5</button>
      <button onClick={() => appendValue('6')}>6</button>
      <button onClick={() => appendValue('7')}>7</button>
      <button onClick={() => appendValue('8')}>8</button>
      <button onClick={() => appendValue('1')}>1</button>
      <button onClick={() => appendValue('2')}>2</button>
      <button onClick={() => appendValue('3')}>3</button>
      <button onClick={() => appendValue('4')}>4</button>
      <button onClick={() => appendValue('0')}>0</button>
      <button onClick={() => appendValue('.')}>.</button>
      <button className="equal-button" onClick={calculateResult}>=</button>
    </>
  );
}

function Display({ value, change })
{
  return(
    <div className="display-background">
        <input type="text" id="display-input" value={value} onChange={change}></input>
    </div>
  );
}

function Calculator() {
  const [display, setDisplay] = useState('');

  function handleInputChange(e) {
    const validChars = /^[0-9+\-*/.]*$/;
    const newValue = e.target.value;
    
    if (validChars.test(newValue)) {
      setDisplay(newValue);
    }
  }

  function appendValue(value) {
    setDisplay(display + value);
  }

  function percent() {
    const number = Number(display);
    if (isNaN(number)) return;
    setDisplay((number / 100).toString());
  }

  function changeSign() {
    if (display.startsWith('-')) {
      setDisplay(display.slice(1));
    } else {
      setDisplay('-' + display);
    }
  }

  function calculateResult() {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay('Error');
    }
  }

  function clearInput() {
    setDisplay('');
  }

  return (
    <>
      <div className="calculator">
          <Display value={display} change={handleInputChange} />
          <div className="buttons">
              <Buttons clear={clearInput} appendValue={appendValue} calculateResult={calculateResult} changeSign={changeSign} percent={percent}/>    
          </div>
      </div>
    </>
  );
} 

export default Calculator
