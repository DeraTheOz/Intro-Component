'use strict';

// Elements
const form = document.querySelector('form');
const hiddenMessage = document.querySelector('.hidden');
const inputFields = document.querySelectorAll('.form__input');
const inputFieldIcons = document.querySelectorAll('.icon');

// Input Fields
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const password = document.getElementById('password');
const button = document.querySelector('button');

// Error classes
const firstNameError = document.querySelector('.firstname-error');
const lastNameError = document.querySelector('.lastname-error');
const emailError = document.querySelector('.email-error');
const passwordError = document.querySelector('.password-error');

// Regular Expression
const regex = {
	name: /^[a-z ,.'-]+$/i,
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
};

// Check if name contains number
const checkForNumber = function (name) {
	for (let input of name.value.trim()) {
		if (input.charCodeAt(0) >= 48 && input.charCodeAt(0) <= 57) {
			if (name === firstName) {
				firstNameError.textContent = 'Name cannot contain numbers';
			} else {
				lastNameError.textContent = 'Name cannot contain numbers';
			}
		}
	}
};

// Functions
const handleFirstName = function (name, icon) {
	if (name.value.trim() === '' || !name.value.trim().match(regex.name)) {
		name.classList.add('form__input-error');
		name.classList.add('placeholder-color');
		firstNameError.classList.add('error');
		icon.classList.add('icon-error');
		checkForNumber(name);
	} else if (name.value.trim().length < 3) {
		name.classList.add('form__input-error');
		name.classList.add('placeholder-color');
		firstNameError.classList.add('error');
		firstNameError.textContent = 'Enter at least 3 characters';
		checkForNumber(name);
		icon.classList.add('icon-error');
	} else {
		name.classList.remove('form__input-error');
		name.classList.remove('placeholder-color');
		firstNameError.classList.remove('error');
		icon.classList.remove('icon-error');
	}
};

const handleLastName = function (name, icon) {
	if (name.value.trim() === '' || !name.value.trim().match(regex.name)) {
		name.classList.add('form__input-error');
		name.classList.add('placeholder-color');
		lastNameError.classList.add('error');
		icon.classList.add('icon-error');
		checkForNumber(name);
	} else if (name.value.trim().length < 3) {
		name.classList.add('form__input-error');
		name.classList.add('placeholder-color');
		lastNameError.classList.add('error');
		lastNameError.textContent = 'Enter at least 3 characters';
		icon.classList.add('icon-error');
		checkForNumber(name);
	} else {
		name.classList.remove('form__input-error');
		name.classList.remove('placeholder-color');
		lastNameError.classList.remove('error');
		icon.classList.remove('icon-error');
	}
};

const handleEmailInput = function (emailInput, icon) {
	if (
		emailInput.value.trim() === '' ||
		!emailInput.value.trim().match(regex.email)
	) {
		emailInput.classList.add('form__input-error');
		emailInput.classList.add('placeholder-color');
		emailError.classList.add('error');
		icon.classList.add('icon-error');
	} else {
		emailInput.classList.remove('form__input-error');
		emailInput.classList.remove('placeholder-color');
		emailError.classList.remove('error');
		icon.classList.remove('icon-error');
	}
};

const handlePasswordInput = function (password, icon) {
	if (password.value.trim() === '') {
		password.classList.add('form__input-error');
		password.classList.add('placeholder-color');
		passwordError.classList.add('error');
		icon.classList.add('icon-error');
	} else if (
		!password.value.trim().match(regex.password) ||
		password.value.trim().length < 6
	) {
		password.classList.add('form__input-error');
		password.classList.add('placeholder-color');
		passwordError.classList.add('error');
		passwordError.textContent =
			'At least 6 characters, number, uppercase letter and symbol';
		icon.classList.add('icon-error');
	} else {
		password.classList.remove('form__input-error');
		password.classList.remove('placeholder-color');
		passwordError.classList.remove('error');
		icon.classList.remove('icon-error');
	}
};

// Reset custom inputs and error message state
const resetCustomInputs = function () {
	firstNameError.textContent = 'First name cannot be empty';
	lastNameError.textContent = 'Last name cannot be empty';
	passwordError.textContent = 'Password cannot be empty';
};

// Handle Error Icons(will call input fields)
const updateErrorIcon = function (input, icon) {
	if (input.name === 'first-name') {
		return handleFirstName(input, icon);
	} else if (input.name === 'last-name') {
		return handleLastName(input, icon);
	} else if (input.name === 'email') {
		return handleEmailInput(input, icon);
	} else if (input.name === 'password') {
		return handlePasswordInput(input, icon);
	} else {
		return true;
	}
};

const validateInputs = function () {
	const allInputsValid = [
		firstNameError,
		lastNameError,
		emailError,
		passwordError
	].some(error => error.classList.contains('error'));

	if (!allInputsValid) {
		form.reset();
		resetCustomInputs();
		hiddenMessage.classList.add('success');

		setTimeout(function () {
			hiddenMessage.classList.remove('success');
		}, 5000);
	}
};

button.addEventListener('click', function (e) {
	e.preventDefault();

	inputFields.forEach(function (input, i) {
		const icon = inputFieldIcons[i];
		updateErrorIcon(input, icon);

		input.addEventListener('input', () => {
			updateErrorIcon(input, icon);
		});
	});

	// check if all inputs are valid
	validateInputs();
});
