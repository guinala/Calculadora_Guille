const display = document.getElementById('display-input');

function appendValue(value) 
{
    display.innerHTML += value;
}

function percent()
{
    let number = Number(display.innerHTML);

    if (isNaN(number)) return;

    display.innerHTML = number / 100;
}

function changeSign()
{
    if (display.innerHTML.startsWith('-')) 
    {
        display.innerHTML = display.innerHTML.slice(1);
    } 
    else
    {
        display.innerHTML = '-' + display.innerHTML;
    }
}

function calculateResult()
{
    try
    {
        display.innerHTML = eval(display.innerHTML);
    }
    catch (error)
    {
        display.innerHTML = 'Error';
    }
}

function clearInput()
{
    display.innerHTML = '';
}
