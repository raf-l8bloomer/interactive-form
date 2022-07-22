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

/*Pulls cost of each activity and adds/subtracts them when checked to a total amount*/

const actsCheckbox = document.querySelector('.activities');
const actsCost = document.querySelector('#activities-cost');
let totalCost = 0;


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

const payment = document.getElementById('payment');
const creditcard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

/*default payment info set at Credit Card while hiding other options*/

payment[1].defaultSelected = 'true';
paypal.hidden = 'hidden';
bitcoin.hidden = 'hidden';


/*Payment info and details change depending on payment method*/

payment.addEventListener('change', e=> {
    const clickedPayment = e.target.value;
        if (clickedPayment === "credit-card"){
            creditcard.removeAttribute('hidden')
            paypal.hidden = 'hidden';
            bitcoin.hidden = 'hidden';
        } else if (clickedPayment === "paypal"){
            paypal.removeAttribute('hidden')
            creditcard.hidden = 'hidden';
            bitcoin.hidden = 'hidden';
        } else if(clickedPayment === "bitcoin"){
            bitcoin.removeAttribute('hidden')
            creditcard.hidden = 'hidden';
            paypal.hidden = 'hidden';
        }
});

const form = document.querySelector('form');
console.log(form);

form.addEventListener('submit', e => {


})

const nameValidator = () => {
    const nameValue = inputName.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    console.log(`"${nameIsValid}"`);
}

const 
