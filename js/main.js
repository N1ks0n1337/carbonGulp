 /*-------Validation-----*/
 let form = document.querySelector('.js-form'),
     formInputs = document.querySelectorAll('.js-input'),
     inputEmail = document.querySelector('.js-input-email'),
     inputPassword = document.querySelector('.js-input-password');
     formBtn = document.querySelector('.form__btn'),
     errorElement = document.getElementById('error'),
     addInputPopup = document.querySelectorAll('.js-input-popup-add'),
     formBtnAdd = document.querySelector('.form__btn-add'),
     operatorsBtn = document.querySelectorAll('.operatorsBtn'),
     formBtnOperators = document.querySelector('.form__btn-operators');



 function validateEmail(email) {
     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
 }

 form.onsubmit = function (e) {
     let emailVal = inputEmail.value,
         passVal = inputPassword.value;
     emptyInputs = Array.from(formInputs).filter(input => input.value === '')

     let messages = []
     if (inputEmail.value === '' || inputEmail == null) {
         messages.push('Email entered incorrectly')
     }

     if(passVal.length <= 6){
        messages.push('Password must be longer that 6 characters')
    }

     if (messages.length > 0) {
         e.preventDefault()
         errorElement.innerText = messages.join('. ')
     }

     formInputs.forEach(function (input) {
         if (input.value === '') {
             input.classList.add('error');
             input.classList.add('error');
         } else {
             input.classList.remove('error');
         }
     })

     if (emptyInputs.length !== 0) {
         return false
     }
     if (!validateEmail(emailVal)) {
         inputEmail.classList.add('error');
         return false;
     } else {
         inputEmail.classList.remove('error');
     }
 }


 function test() {
     formInputs.forEach(item => {
         if (item.value.length != 0) {
             if (!item.classList.contains('active-btn')) {
                 formBtn.classList.add('active-btn')
             }
         } else {
             formBtn.classList.remove('active-btn')
         }
     })
 }

 function add() {
     addInputPopup.forEach(item => {
         if (item.value.length != 0) {
             if (!item.classList.contains('active-btn')) {
                 formBtnAdd.classList.add('active-btn')
             }
         } else {
             formBtnAdd.classList.remove('active-btn')
         }
     })
 }

 function operators() {
     operatorsBtn.forEach(item => {
         if (item.value.length != 0) {
             if (!item.classList.contains('active-btn')) {
                 formBtnOperators.classList.add('active-btn')
             }
         } else {
             formBtnOperators.classList.remove('active-btn')
         }
     })
 }

 /*--------------------*/
