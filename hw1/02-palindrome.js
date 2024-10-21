// Element selectors using const for immutability
const inputElem = document.getElementById('positiveNumber');
const resultElem = document.getElementById('palindromeResult');

// Function to check if a string is a palindrome
const isPalindrome = (str) => {
  const len = str.length;
  for (let i = 0; i < len / 2; i += 1) {
    if (str[i] !== str[len - 1 - i]) {
      return false; 
    }
  }
  return true; 
};

// Function to validate input
const validateInput = (input) => {
  const trimmedInput = input.trim();
  const num = parseFloat(trimmedInput);

  if (!trimmedInput || Number.isNaN(num) || num < 0) {
    return {
      isValid: false,
      message: !trimmedInput
        ? 'Please enter a number.'
        : Number.isNaN(num)
          ? 'Please enter a valid number.'
          : 'Please enter a positive number.',
      className: 'text-danger',
    };
  }

  return { isValid: true }; 
};

// Function to update the user interface
const updateUI = (message, className) => {
  resultElem.textContent = message; 
  resultElem.className = className; 
};

// Main function that handles input events
const handleInput = () => {
  const numStr = inputElem.value; 
  const validationResult = validateInput(numStr); 

  if (!validationResult.isValid) {
    updateUI(validationResult.message, validationResult.className);
    return; 
  }

  const isPalindromeResult = isPalindrome(numStr);
  const message = isPalindromeResult ? 'Yes. This is a palindrome!' : 'No. Try again.';
  const className = isPalindromeResult ? 'text-success' : 'text-danger'; 
  updateUI(message, className); 
};

// Event listener to trigger the handleInput function on input changes
inputElem.addEventListener('input', handleInput);
