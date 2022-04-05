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

// toggle password visibility
togglePassword.forEach(event => {
        event.addEventListener('click', function () {
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

password.addEventListener('click', () => {
    passwordFeedback.style.visibility = 'visible';
});

password.addEventListener('blur', () => {
    if (password.value.length === 0) {
        passwordFeedback.style.visibility = 'hidden';
    }

});

confirmPassword.addEventListener('focus', () => {
    confirmPasswordFeedback.style.visibility = 'visible';
});

confirmPassword.addEventListener('blur', () => {
    if (confirmPassword.value.length === 0) {
        confirmPasswordFeedback.style.visibility = 'hidden';
    }
});