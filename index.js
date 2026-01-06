const display = document.getElementById('display-input');

function appendValue(value) 
{
    display.innerHTML += value;
}

function percent()
{
    let number = Number(display.value);

    if (isNaN(number)) return;

    display.value = number / 100;
}

function changeSign()
{
    if (display.value.startsWith('-')) 
    {
        display.value = display.value.slice(1);
    } 
    else
    {
        display.value = '-' + display.value;
    }
}

function calculateResult()
{
    try
    {
        display.value = eval(display.value);
    }
    catch (error)
    {
        display.value = 'Error';
    }
}

function clearInput()
{
    display.innerHTML = '';
}
