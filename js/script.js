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

/* helper functions and form validation*/

const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');


const nameValidator = () => {
    const nameValue = inputName.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    console.log(`Name validation on "${nameValue}" is "${nameIsValid}"`);
    return nameIsValid;
}

const emailValidator = () => {
    const emailValue = email.value;
    const emailIsValid =/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    console.log(`Email validation on "${emailValue}" evaluates to "${emailIsValid}"`)
    return emailIsValid;
}

const actsValidator = () => {
    const actsIsValid = totalCost > 0;
    console.log(`Activities validation evalutes to "${actsIsValid}`)
    return actsIsValid;
}

const ccValidator = () => {
    const ccNumValue = ccNum.value;
    const ccIsValid = /^\d{13,16}$/.test(ccNumValue);
    console.log(`${ccNumValue} is ${ccIsValid}`);
    return ccIsValid;
}

const zipValidator = () => {
    const zipValue = zip.value;
    const zipIsValid = /^\d{5}$/.test(zipValue);
    console.log(`${zipValue} is ${zipIsValid}`);
    return zipIsValid;
};

const cvvValidator = () => {
    const cvvValue = cvv.value;
    const cvvIsValid = /^\d{3}$/.test(cvvValue);
    console.log(`${cvvValue} is ${cvvIsValid}`);
    return cvvIsValid;
}

const nameParent = inputName.parentElement;
const emailParent = email.parentElement;


form.addEventListener('submit', e => {
    nameValidator();
    emailValidator();
    actsValidator();
    ccValidator();
    zipValidator();
    cvvValidator();

    if(!nameValidator()){
        e.preventDefault();
        nameParent.classList.add('not-valid');
        nameParent.classList.remove('valid');
        nameParent.lastElementChild.style.display = 'initial';
        console.log('validator needs name');
    } else {
        nameParent.classList.add('valid');
        nameParent.classList.remove('not-valid');
        nameParent.lastElementChild.style.display = 'hidden';

    };
    if(!emailValidator()){
        e.preventDefault();
        emailParent.classList.add('not-valid');
        emailParent.classList.remove('valid');
        emailParent.lastElementChild.style.display = 'initial';
    } else {
        emailParent.classList.add('valid');
        emailParent.classList.remove('not-valid');
        emailParent.lastElementChild.style.display = 'hidden';
    };
    if(!actsValidator()){
        e.preventDefault();
        console.log('validator needs act');
    };
    if(!ccValidator()){
        e.preventDefault();
        console.log('validator needs cc');
    };
    if(!zipValidator()){
        e.preventDefault();
        console.log('validator needs zip');
    };
    if(!cvvValidator()){
        e.preventDefault();
        console.log('validator needs cvv');
    };

});

const actsCheckboxInput = document.querySelectorAll('#activities input');
console.log (actsCheckboxInput);

for (let i = 0; i < actsCheckboxInput.length; i++){
    actsCheckboxInput[i].addEventListener('focus', function(){
        actsCheckboxInput.classList('focus');

    })
    actsCheckboxInput[i].addEventListener('blur', function(){
        actsCheckboxInput.classList.remove('focus');
        
    })
}
