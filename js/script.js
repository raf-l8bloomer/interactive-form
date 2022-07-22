const inputName = document.getElementById('name');
const otherJobRole = document.getElementById('other-job-role');

/*TSHIRT*/
const design = document.getElementById('design');
const colorOptions = document.querySelectorAll('#color option')

/*ACTIVITIES*/
const actsCheckbox = document.querySelector('.activities');
const actsCost = document.querySelector('#activities-cost');
let totalCost = 0;
const actsCheckboxInput = document.querySelectorAll('#activities input');//for looping

/*PAYMENT*/
const payment = document.getElementById('payment');
const creditcard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

/*FOR VALIDATION*/
const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
const nameParent = inputName.parentElement;
const emailParent = email.parentElement;
const ccParent = ccNum.parentElement;
const zipParent = zip.parentElement;
const cvvParent = cvv.parentElement;


inputName.focus(); //default focus state in first text field upon page load
otherJobRole.style.display = 'none' //hide other Job Role text field  on default


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

actsCheckbox.addEventListener('change', e => {
    const clickedAct = e.target;
    const clickedCost = +clickedAct.getAttribute('data-cost');
    if (clickedAct.checked) {
        totalCost = totalCost + clickedCost;
        actsCost.innerHTML = `Total: $${totalCost}`;
    } else {
        totalCost= totalCost - clickedCost;
        actsCost.innerHTML = `Total: $${totalCost}`;
    }
});

/* ACCESSIBILITY: highlights options when tabbed/selected through*/
for (let i = 0; i < actsCheckboxInput.length; i++){
    actsCheckboxInput[i].addEventListener('focus', function(){
        actsCheckboxInput[i].parentElement.classList.add('focus');
    })
    actsCheckboxInput[i].addEventListener('blur', function(){
        actsCheckboxInput[i].parentElement.classList.remove('focus');
    })
}

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

/* helper functions for form validation*/

const nameValidator = () => {
    const nameValue = inputName.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return nameIsValid;
}

const emailValidator = () => {
    const emailValue = email.value;
    const emailIsValid =/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}

const actsValidator = () => {
    const actsIsValid = totalCost > 0;
    return actsIsValid;
}

const ccValidator = () => {
    const ccNumValue = ccNum.value;
    const ccIsValid = /^\d{13,16}$/.test(ccNumValue);
    return ccIsValid;
}

const zipValidator = () => {
    const zipValue = zip.value;
    const zipIsValid = /^\d{5}$/.test(zipValue);
    return zipIsValid;
};

const cvvValidator = () => {
    const cvvValue = cvv.value;
    const cvvIsValid = /^\d{3}$/.test(cvvValue);
    return cvvIsValid;
}

/* functions for  validators - if invalid, turn red and provide hint | if valid turn green*/

function invalid (elementParent) {
    elementParent.classList.add('not-valid');
    elementParent.classList.remove('valid');
    elementParent.lastElementChild.style.display = 'initial';
}

function valid (elementParent) {
    elementParent.classList.add('valid');
    elementParent.classList.remove('not-valid');
    elementParent.lastElementChild.style.display = 'none';
}


/* form runs validators and will notify if an input is invalid/valid when submitted*/
form.addEventListener('submit', e => {
    nameValidator();
    emailValidator();
    actsValidator();
    ccValidator();
    zipValidator();
    cvvValidator();

    if(!nameValidator()){
        e.preventDefault();
        invalid(nameParent);
    } else {
        valid(nameParent);
    };
    if(!emailValidator()){
        e.preventDefault();
        invalid(emailParent)
    } else {
        valid(emailParent);
    };
    if(!actsValidator()){
        e.preventDefault();
        invalid(actsCheckbox);
    } else {
        valid(actsCheckbox);
    };
    if(!ccValidator()){
        e.preventDefault();
        invalid(ccParent);
    } else {
        valid(ccParent);
    };
    if(!zipValidator()){
        e.preventDefault();
        invalid(zipParent);
    } else {
        valid(zipParent);
    };
    if(!cvvValidator()){
        e.preventDefault();
        invalid(cvvParent);
    } else {
        valid(cvvParent);
    };


});


