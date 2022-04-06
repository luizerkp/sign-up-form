// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);

const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password-confirm');
const passwordFeedback = document.querySelector('#password-feedback');
const confirmPasswordFeedback = document.querySelector('#password-confirm-feedback');
const togglePassword = document.querySelectorAll('.togglePassword');
const inputs = document.querySelectorAll('input');

const minLength = document.querySelector('#min-length');
const specialChars= document.querySelector('#special-chars');
const number = document.querySelector('#number');
const upperCaseChar = document.querySelector('#uppercase-char');
const lowerCaseChar = document.querySelector('#lowercase-char');


inputs.forEach(input => {
  input.addEventListener('focus', () => {    
    input.classList.remove('error');
    input.classList.remove('valid');
    input.classList.toggle('input-focus');

  });

  input.addEventListener('blur', () => {
      if (input.value.length === 0) {
        input.classList.toggle('input-focus');
      }
      else {
        input.classList.remove('input-focus');
        errorStatus(input.id);
        if (input.id === 'password') {
          let currentStatus = checkPasswordStatus();
          if (currentStatus === false) {
            errorStatus('password-confirm');
          }
        }
      }
    }
  );
});


// toggle password visibility
togglePassword.forEach(event => {
        event.addEventListener('mousedown', function (event) {
        event.preventDefault();
        // toggle the type attribute
        const passwordType = password.getAttribute('type') === 'password' ? 'text' : 'password';
        const confirmPasswordType = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';

        password.setAttribute('type', passwordType);
        confirmPassword.setAttribute('type', confirmPasswordType);

        for (let i = 0; i < togglePassword.length; i++) {
            if ( passwordType === 'text' || confirmPasswordType === 'text' ) {
                togglePassword[i].textContent = ' Hide';
            }
            else {
                togglePassword[i].textContent = ' Show';
            } 
            // toggle the eye slash icon 
            togglePassword[i].classList.toggle('fa-eye-slash');          
        }
  
        password.classList.toggle('fa-eye-slash');
        confirmPassword.classList.toggle('fa-eye-slash');
    });
});

password.addEventListener('focus', () => {
    passwordFeedback.style.visibility = 'visible';
  
});

password.addEventListener('blur', () => {
    if (password.value.length === 0) {
        passwordFeedback.style.visibility = 'hidden';
    } 
});

password.addEventListener('keyup', () => {
    validatePassword();
    if (confirmPassword.value.length > 0) {
      let currentStatus = checkPasswordStatus();
      if (currentStatus === false) {
        errorStatus('password-confirm');
      }        
    }
});

confirmPassword.addEventListener('keyup', () => {
    validateConfirmPassword();
});

confirmPassword.addEventListener('focus', () => {
    confirmPasswordFeedback.style.visibility = 'visible';
});

confirmPassword.addEventListener('blur', () => {
    if (confirmPassword.value.length === 0) {
        confirmPasswordFeedback.style.visibility = 'hidden';
    }
});

function errorStatus(eventId) {
  let noError = null;
  switch (eventId) {
      case 'email':
          noError= validateEmail();
          break;
      case 'phone-number':
          noError= validatePhoneNumber();
          break;
      case 'first-name':
          noError= validateFirstName();
          break;
      case 'last-name':
          noError= validateLastName();
          break;
      case 'password':
          noError= validatePassword();
          break;
      case 'password-confirm':
          noError= validateConfirmPassword();
          break;
      default:
          break;
  }

  const input = document.querySelector('#' + eventId);

  if (noError=== false) {
    input.classList.add('error');
    input.classList.remove('valid');
  }
  else if (noError=== true) {
    input.classList.add('valid');
    input.classList.remove('error');
  }
}

function checkPasswordStatus() {
  const active = confirmPassword.getAttribute('class');
  console.log(active);
  let match = validateConfirmPassword();
  let results = true;
  if (active === 'error' && match === true) {
    results = false;
  }
  else if (active === 'valid' && match === false) {
    results = false;
  }
  // console.log('results is ' + results);
  return results;
}

function validatePassword() {
  
  if (password.value.length === 0) {
    minLength.style.color = 'inherit';
    specialChars.style.color = 'inherit';
    number.style.color = 'inherit';
    upperCaseChar.style.color = 'inherit';
    lowerCaseChar.style.color = 'inherit';
    return null;
  }

  let validPasswordObjFunctions = {
      validLength: validateLength(),
      validSpecialChars: validateSpecialChars(),
      validNumber: validateNumber(),
      validUpperCaseChar: validateUpperCaseChar(),
      validLowerCaseChar: validateLowerCaseChar(),
  };

  let validPassword = Object.values(validPasswordObjFunctions).every(value => value === true);
  return validPassword;
}

function validateLength() {
  if (password.value.length < 8) {
    minLength.style.color = 'red';
    return false;
  } else {
    minLength.style.color = 'green';
    return true;
  }
}

function validateSpecialChars() {
  if (password.value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
    specialChars.style.color = 'green';
    return true;
  } else {
    specialChars.style.color = 'red';
    return false;
  }
}

function validateNumber() {
  if (password.value.match(/[0-9]/)) {
    number.style.color = 'green';
    return true;
  } else {
    number.style.color = 'red';
    return false;
  }
}

function validateUpperCaseChar() {
  if (password.value.match(/[A-Z]/)) {
    upperCaseChar.style.color = 'green';
    return true;
  } else {
    upperCaseChar.style.color = 'red';
    return false;
  }
}

function validateLowerCaseChar() {
  if (password.value.match(/[a-z]/)) {
    lowerCaseChar.style.color = 'green';
    return true;
  } else {
    lowerCaseChar.style.color = 'red';
    return false;
  }
}

function validateConfirmPassword() {
  let validConfirmPassword = null;
  if (password.value.length === 0 && confirmPassword.value.length === 0) {
    confirmPasswordFeedback.textContent = '';
    return null;
  }

  if (password.value === confirmPassword.value) {
    confirmPasswordFeedback.textContent = 'Passwords match';
    confirmPasswordFeedback.style.color = 'green';
    validConfirmPassword = true;
  } else {
    confirmPasswordFeedback.textContent = 'Passwords do not match';
    confirmPasswordFeedback.style.color = 'red';
    validConfirmPassword = false;
  }
  
  return validConfirmPassword;
}