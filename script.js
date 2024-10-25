document.getElementById('viewProject1').addEventListener('click', function() {
    window.open('https://torgist.com/', '_blank');
  });
  
  document.getElementById('viewProject2').addEventListener('click', function() {
    window.open('https://playground.aquaya.world/maths-quest/', '_blank');
  });
  
  document.getElementById('viewProject3').addEventListener('click', function() {
    window.open('https://example.com/project3', '_blank');
  });
  
// Handle budget selection variable
let selectedBudget = null;

// Handle budget selection
function selectBudget(button, budget) {
    selectedBudget = budget; // Store the selected budget
    console.log('Selected budget:', selectedBudget); // Log the selected budget
    document.getElementById('budgetError').textContent = ''; // Clear any previous error message

    // Remove active class from all buttons
    const budgetButtons = document.querySelectorAll('.interest-Buttons button');
    budgetButtons.forEach(btn => {
        btn.classList.remove('active'); // Remove active class from all
    });

    // Set active class on the clicked button
    button.classList.add('active'); // Add active class to the clicked button
    console.log('Active button set:', button.textContent); // Log which button was activated
}

// Validate the Name input
function validateName() {
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    nameError.textContent = ''; // Clear previous error messages

    if (name === '') {
        nameError.textContent = 'Please enter your name'; // Error message
        return false; // Invalid input
    }

    if (name.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters long!'; // Error message
        return false; // Invalid input
    }

    return true; // Valid input
}

// Validate the Email input
function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    emailError.textContent = ''; // Clear previous error messages

    if (email === '') {
        emailError.textContent = 'Please enter your email'; // Error message
        return false; // Invalid input
    }

    // Regular expression for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address'; // Error message
        return false; // Invalid input
    }

    return true; // Valid input
}

// Validate the Project Description
function validateProject() {
    const project = document.getElementById('project').value.trim();
    const topicError = document.getElementById('topicError');
    topicError.textContent = ''; // Clear previous error messages

    if (project === '') {
        topicError.textContent = 'Project description is required'; // Error message
        return false; // Invalid input
    }

    if (project.length < 10) {
        topicError.textContent = 'Project description must be at least 10 characters long'; // Error message
        return false; // Invalid input
    }

    return true; // Valid input
}

// Validate the Budget selection
function validateBudget() {
    const budgetError = document.getElementById('budgetError');
    budgetError.textContent = '';

    if (selectedBudget === null) {
        budgetError.textContent = 'Please select a project budget'; // Error message if not selected
        return false; // Invalid
    }

    return true; // Valid
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isProjectValid = validateProject();
    const isBudgetValid = validateBudget(); // Validate budget

    // Check if all validations passed
    if (isNameValid && isEmailValid && isProjectValid && isBudgetValid) {
        // Prepare the email data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const project = document.getElementById('project').value.trim();

        const templateParams = {
            to_name: 'Recipient Name', // Set recipient name
            from_name: name,           // From name from the form
            project_details: project,  // Project details from the form
            project_budget: `$${selectedBudget.toLocaleString()}` // Format the budget for readability
        };
        
        
        console.log(templateParams); // Debugging: Check what you are sending

        // Send the email
        emailjs.send('service_8764c1p', 'template_zi0x1am', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('successMessage').style.display = 'block'; // Show success message

                // Delay form reset to allow the success message to be visible for 3 seconds
                setTimeout(resetForm, 3000); // Reset form after 3 seconds
            }, function(error) {
                console.log('FAILED...', error);

                // Show error message in red and animate button
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.style.display = 'block'; // Show error message

                // Add vibrate animation to the submit button
                const submitButton = document.querySelector('#projectForm button[type="submit"]');
                submitButton.classList.add('vibrate'); // Add vibration class

                // Remove vibration after 0.3 seconds
                setTimeout(() => {
                    submitButton.classList.remove('vibrate'); // Remove vibration class
                }, 300);
            });
    }
}

// Reset form and hide success and error messages
function resetForm() {
    document.getElementById('projectForm').reset(); // Reset form fields
    selectedBudget = null; // Reset budget selection
    document.getElementById('budgetError').textContent = ''; // Clear budget error
    document.getElementById('successMessage').style.display = 'none'; // Hide success message
    document.getElementById('errorMessage').style.display = 'none'; // Hide error message

    // Remove active state from budget buttons
    const budgetButtons = document.querySelectorAll('.interest-Buttons button');
    budgetButtons.forEach(button => {
        button.classList.remove('active');
    });
}

// Clear error messages on input
document.getElementById('name').addEventListener('input', () => {
    document.getElementById('nameError').textContent = '';
});
document.getElementById('email').addEventListener('input', () => {
    document.getElementById('emailError').textContent = '';
});
document.getElementById('project').addEventListener('input', () => {
    document.getElementById('topicError').textContent = '';
});

// Initialize EmailJS
(function() {
    emailjs.init("oGgR2Qexoc2enGkF5"); // Replace with your public key
})();

// Add event listener for form submission
document.getElementById('projectForm').addEventListener('submit', handleSubmit);

// Initialize budget buttons click event
const budgetButtons = document.querySelectorAll('.interest-Buttons button');
budgetButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Convert button text to budget number before passing
        const budgetText = button.textContent;
        console.log('Button clicked:', budgetText); // Log the button text
        const budgetValue = extractBudgetValue(budgetText); // Function to extract numerical value from text
        console.log('Extracted budget value:', budgetValue); // Log the extracted value
        selectBudget(button, budgetValue); // Pass the button and budget value to selectBudget
    });
});

// Helper function to extract budget value from button text
function extractBudgetValue(budgetText) {
    // Example: '150k-300k' becomes 150000
    const match = budgetText.match(/(\d+)k/);
    if (match) {
        const value = parseInt(match[1]) * 1000;
        console.log(`Extracted value from "${budgetText}":`, value); // Log the extracted numeric value
        return value;
    } else {
        console.log(`No match for budget text "${budgetText}"`); // Log if no match was found
        return null;
    }
}


// the animation
document.addEventListener('scroll', function() {
    const contactSection = document.querySelector('.contact-section');
    const sectionPosition = contactSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    // Trigger animation when contact section is in view
    if (sectionPosition < screenPosition && !contactSection.classList.contains('visible')) {
        contactSection.classList.add('visible');

        const typingText = document.querySelector('.typing-animation');
        const textToType = typingText.textContent; // Full text including highlight
        const highlightText = typingText.querySelector('.highlight').textContent; // Highlighted text

        typingText.innerHTML = ''; // Clear text for typing effect
        let index = 0;

        // Show blinking cursor
        typingText.style.borderRight = '3px solid'; // Make cursor visible
        typingText.style.animation = 'blink 1s steps(1) infinite'; // Start blinking

        const typingInterval = setInterval(() => {
            if (index < textToType.length) {
                // Insert the highlight text correctly
                if (textToType.substring(index, index + highlightText.length) === highlightText) {
                    typingText.innerHTML += `<span class="highlight">${highlightText}</span>`;
                    index += highlightText.length;
                } else {
                    typingText.innerHTML += textToType.charAt(index); // Use innerHTML to add each character
                    index++;
                }
            } else {
                clearInterval(typingInterval); // Stop typing animation
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    typingText.style.borderRight = 'none'; // Hide cursor
                }, 3000); // Adjust the time before the cursor disappears
            }
               }, 100); // Adjust speed here (in milliseconds)
    }
});
