// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);

const togglePassword = document.querySelector('.togglePassword');
const password = document.querySelector('#password');
const passwordFeedback = document.querySelector('#password-feedback');
const inputs = document.querySelectorAll('input');

// toggle password visibility
togglePassword.addEventListener('mousedown', function (event) {
    event.preventDefault();

    // toggle the type attribute
    const passwordType = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', passwordType);

    if ( passwordType === 'text') {
        togglePassword.textContent = ' Hide';
    }
    else {
        togglePassword.textContent = ' Show';
    } 

    // toggle the eye slash icon 
    togglePassword.classList.toggle('fa-eye-slash');          
});

inputs.forEach(input => {
    input.addEventListener('focus', () => {    
      input.classList.toggle('input-focus');
    });
  
    input.addEventListener('blur', () => {
        if (input.value.length === 0) {
          input.classList.toggle('input-focus');
        }
    });
  });
