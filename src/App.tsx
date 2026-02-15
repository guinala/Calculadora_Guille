import { useState } from 'react';
import './App.css'

function Button({ children, className = '', onClick }) 
{
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function Calculator() 
{
  const [display, setDisplay] = useState('');
  const [lastOperation, setLastOperation] = useState();

  function percent() 
  {
    if (!display)
    {
      return;
    }
    
    if (lastOperation && display.endsWith(lastOperation))
    {
      return;
    }
    
    if (lastOperation) 
    {
      const parts = display.split(lastOperation);
      const lastNumber = Number(parts[parts.length - 1]);

      if (isNaN(lastNumber))
      {
        return;
      }

      const percentValue = lastNumber / 100;
      parts[parts.length - 1] = percentValue.toString();
      setDisplay(parts.join(lastOperation));
    } 
    else 
    {
      const number = Number(display);
      
      if (isNaN(number))
      {
        return;
      }

      setDisplay((number / 100).toString());
    }
  }

  function changeSign() 
  {
    if (!display)
    {
      return;
    }
    
    if (lastOperation && display.endsWith(lastOperation))
    {
      return;
    }
    
    if (lastOperation) 
    {
      const parts = display.split(lastOperation);
      const lastPart = parts[parts.length - 1];
      
      if (lastPart.startsWith('-')) 
      {
        parts[parts.length - 1] = lastPart.slice(1);
      } 
      else 
      {
        parts[parts.length - 1] = '-' + lastPart;
      }
      setDisplay(parts.join(lastOperation));
    } 
    else 
    {
      if (display.startsWith('-')) 
      {
        setDisplay(display.slice(1));
      } 
      else 
      {
        setDisplay('-' + display);
      }
    }
  }

  function calculateResult(display, lastOperation) 
  {
    try 
    {
      const displayContent = display.split(lastOperation);
      const num1 = Number(displayContent[0]);
      const num2 = Number(displayContent[1]);

      switch(lastOperation)
      {
        case '+':
          return num1 + num2;
        
        case '-':
          return num1 - num2;
        
        case '*':
          return num1 * num2;
        
        case '/':
          return num1 / num2;
      }
    } 
    catch (error) 
    {
      console.log('Error' + error);
    }
  }

  function handleNumber(number)
  {
    setDisplay(display + number);
  }

  function handleDot()
  {
    if (!display) 
    {
      setDisplay('0.');
      return;
    }

    if (lastOperation) 
    {
      if(display.endsWith(lastOperation))
      {
        setDisplay(display + '0.');
        return;
      }

      const parts = display.split(lastOperation);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber.includes('.'))
      {
        return;
      }
    } 
    else if (display.includes('.'))
    {
      return;
    }
    
    setDisplay(display + '.');
  }

  function handleOperation(operation)
  {
    if(!lastOperation)
    {
      setLastOperation(operation);
      setDisplay(display + operation);
      return;
    }

    if(operation == lastOperation && display.endsWith(lastOperation))
    {
      return;
    }

    if(display.endsWith(lastOperation))
    {
      setLastOperation(operation);
      setDisplay(display.replace(lastOperation, operation));
      return;
    }

    const result = calculateResult(display, lastOperation);
    setDisplay(result + operation);
    setLastOperation(operation);
  }

  function handleClear() 
  {
    setDisplay('');
    setLastOperation(undefined);
  }

  function handleEqual()
  {
    const result = calculateResult(display, lastOperation);
    setDisplay(result);
    setLastOperation(undefined);
  }

  function handleKeyPress(e) 
  {
    const key = e.key;
    
    if (/^[0-9]$/.test(key)) 
    {
      e.preventDefault();
      handleNumber(key);
      return;
    }
    
    if (key === '+' || key === '-' || key === '*' || key === '/' || key === 'x' || key === 'X') 
    {
      e.preventDefault();
      const operation = (key === 'x' || key === 'X') ? '*' : key;
      handleOperation(operation);
      return;
    }
    
    if (key === '.' || key === ',') 
    {
      e.preventDefault();
      handleDot();
      return;
    }
    
    if (key === 'Enter' || key === '=') 
    {
      e.preventDefault();
      handleEqual();
      return;
    }
    
    if (key === 'Escape' || key === 'c' || key === 'C') 
    {
      e.preventDefault();
      handleClear();
      return;
    }
    
    if (key === 'Backspace') 
    {
      e.preventDefault();
      if (display.length > 0) 
      {
        const newDisplay = display.slice(0, -1);
        setDisplay(newDisplay);

        if (display[display.length - 1] === lastOperation) 
        {
          setLastOperation(undefined);
        }
      }
      return;
    }
    
    if (key === '%') {
      e.preventDefault();
      percent();
      return;
    }
    
    e.preventDefault();
  }

  function handleInputChange(e) 
  {
    const newValue = e.target.value;
    
    const validChars = /^[0-9+\-×*/÷.]*$/;
    
    if (validChars.test(newValue)) 
    {
      setDisplay(newValue);
      
      const operators = ['+', '-', 'x', 'X', '*', '/', '÷'];
      let foundOperator = null;
      
      for (let i = newValue.length - 1; i >= 0; i--) 
      {
        if (operators.includes(newValue[i])) 
        {
          foundOperator = (newValue[i] === 'x' || newValue[i] === 'X') ? '*' : newValue[i] === '÷' ? '/' : newValue[i];
          break;
        }
      }
      
      setLastOperation(foundOperator);
    }
  }

  return (
    <>
      <div className="calculator">
          <div className="display-background">
            <input 
              type="text" 
              id="display-input" 
              value={display}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="buttons">
            <Button className="clear-button" onClick={handleClear}>C</Button>
            <Button className="operator-button" onClick={changeSign}>+-</Button>
            <Button className="operator-button" onClick={percent}>%</Button>
            <Button className="operator-button" onClick={() => handleOperation('/')}>/</Button>
            <Button onClick={() => handleNumber('7')}>7</Button>
            <Button onClick={() => handleNumber('8')}>8</Button>
            <Button onClick={() => handleNumber('9')}>9</Button>
            <Button className="operator-button" onClick={() => handleOperation('*')}>*</Button>
            <Button onClick={() => handleNumber('4')}>4</Button>
            <Button onClick={() => handleNumber('5')}>5</Button>
            <Button onClick={() => handleNumber('6')}>6</Button>
            <Button className="operator-button" onClick={() => handleOperation('-')}>-</Button>
            <Button onClick={() => handleNumber('1')}>1</Button>
            <Button onClick={() => handleNumber('2')}>2</Button>
            <Button onClick={() => handleNumber('3')}>3</Button>
            <Button className="operator-button" onClick={() => handleOperation('+')}>+</Button>
            <Button onClick={() => handleNumber('0')}>0</Button>
            <Button onClick={handleDot}>.</Button>
            <Button className="equal-button" onClick={handleEqual}>=</Button>
          </div>
      </div>
    </>
  );
} 

export default Calculator
