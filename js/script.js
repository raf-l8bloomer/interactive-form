/*default focus state in first text field upon page load*/

const inputName = document.getElementById('name');
inputName.focus();

/*hide other Job Role text field  on default*/
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none'


/*show Other Job Role text field only if 'Other' is selected,
 hide if anything else*/
const title = document.getElementById('title');
title.addEventListener ('change', e => {
    const jobRole = e.target.value;
    if (jobRole.toLowerCase() === 'other') {
        otherJobRole.style.display= 'initial'
    } else {
        otherJobRole.style.display = 'none';
    }
})

/* disable Color options before Design is selected*/
const color = document.getElementById('color');
color.disabled = 'true';


const design = document.getElementById('design');
const colorOptions = document.querySelectorAll('#color option')
console.log(colorOptions)

/*when Design is chosen, Color becomes available and narrows down to 
color options per design*/

design.addEventListener('change', e => {
    color.removeAttribute('disabled');
    const designChoice = e.target.value;
    for (let i = 1; i < colorOptions.length; i++) {
        const dataTheme = colorOptions[i].getAttribute('data-theme');
        if (designChoice === dataTheme){
            colorOptions[i].selected = 'true';
            colorOptions[i].removeAttribute('hidden');  
        } else {
            colorOptions[i].hidden = 'hidden';
        }
    }
});

const actsCheckbox = document.querySelector('.activities');

const actsCost = document.querySelector('#activities-cost');
// const totalCost = actsCost.textContent;
let totalCost = 0;
// actsCost.innerHTML = `Total: $${total$}`;


actsCheckbox.addEventListener('change', e => {
    const clickedAct = e.target;
    const clickedCost = +clickedAct.getAttribute('data-cost');
    if (clickedAct.checked) {
        totalCost = totalCost + clickedCost;
        console.log(totalCost);
        actsCost.innerHTML = `Total: $${totalCost}`;
    } else {
        totalCost= totalCost - clickedCost;
        console.log(totalCost);
        actsCost.innerHTML = `Total: $${totalCost}`;
    }
});

