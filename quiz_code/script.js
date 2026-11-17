// 1. DOM Elements
const takeQuizBtn = document.getElementById('takeQuizBtn');
const quizModal = document.getElementById('quizModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const quizQuestionsContainer = document.getElementById('quizQuestionsContainer');

let currentQuizQuestions = []; // Holds the active 10 questions

// 2. Modal Logic
takeQuizBtn.addEventListener('click', () => {
    // Check if at least one lesson is checked before opening modal
    const checkedBoxes = document.querySelectorAll('input[name="Lesson"]:checked');
    if (checkedBoxes.length === 0) {
        alert("Please select at least one lesson first!");
        return;
    }
    quizModal.style.display = 'flex'; // Show modal
});

closeModalBtn.addEventListener('click', () => {
    quizModal.style.display = 'none'; // Hide modal
});

// Close modal if clicking outside the content box
window.addEventListener('click', (e) => {
    if (e.target === quizModal) {
        quizModal.style.display = 'none';
    }
});

// 3. Start Quiz (Triggered by modal buttons)
function startQuiz(quizType) {
    // Get checked lessons
    const checkedBoxes = document.querySelectorAll('input[name="Lesson"]:checked');
    const selectedLessons = Array.from(checkedBoxes).map(box => box.value);

    // Filter the global 'questions' array from questions.js
    let filtered = questions.filter(q => 
        selectedLessons.includes(q.lesson) && q.type === quizType
    );

    // Shuffle randomly
    filtered.sort(() => Math.random() - 0.5);

    // Slice to max 10 questions
    currentQuizQuestions = filtered.slice(0, 10);

    if (currentQuizQuestions.length === 0) {
        alert("Sorry, there are no questions for this combination yet.");
        quizModal.style.display = 'none';
        return;
    }

    // Hide modal, hide the lesson list, and show the quiz
    quizModal.style.display = 'none';
    document.querySelector('.quiz__list').style.display = 'none'; // Hides the checkboxes
    document.querySelector('.take-quiz-btn').style.display = 'none'; // Hides the button
    
    displayQuiz();
}

// 4. Display the Quiz Questions
function displayQuiz() {
    let html = `<h2 style="margin-bottom: 1rem;">Quiz Time!</h2>`;

    for (let i = 0; i < currentQuizQuestions.length; i++) {
        let q = currentQuizQuestions[i];
        html += `<div class="quiz__question-block" style="margin-bottom: 2rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">`;
        html += `<p><strong>${i + 1}. ${q.question}</strong></p>`;

        if (q.type === "multiple-choice") {
            for (let j = 0; j < q.options.length; j++) {
                let opt = q.options[j];
                let letter = opt.charAt(0); // Gets A, B, C, D
                html += `<label style="display: block; margin: 0.5rem 0; cursor: pointer;">
                            <input type="radio" name="question${i}" value="${letter}" style="margin-right: 10px;"> 
                            ${opt}
                         </label>`;
            }
        } else if (q.type === "identification") {
            html += `<input type="text" id="input${i}" placeholder="Type your answer here..." style="width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ccc; border-radius: 5px;">`;
        }
        html += `</div>`;
    }

    html += `<button type="button" onclick="checkAnswers()" class="btn btn-primary" style="margin-bottom: 2rem;">Submit Quiz</button>`;
    html += `<div id="result-display"></div>`;

    quizQuestionsContainer.innerHTML = html;
}

// 5. Check Answers 
function checkAnswers() {
    let score = 0; // Counter

    // Loop to check answers
    for (let i = 0; i < currentQuizQuestions.length; i++) {
        let q = currentQuizQuestions[i];
        let isCorrect = false;

        if (q.type === "multiple-choice") {
            let selected = document.querySelector(`input[name="question${i}"]:checked`);
            if (selected && selected.value === q.answer) {
                isCorrect = true;
            }
        } else if (q.type === "identification") {
            let userInput = document.getElementById(`input${i}`).value;
            // .trim() removes extra spaces, .toLowerCase() ignores capitalization
            if (userInput.trim().toLowerCase() === q.answer.trim().toLowerCase()) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            score++;
        }
    }

    // If/Else for remarks
    let passingGrade = Math.ceil(currentQuizQuestions.length * 0.7); // 70% to pass
    let remark = "";
    let color = "";
    
    if (score >= passingGrade) {
        remark = "Passed! Great job.";
        color = "green";
    } else {
        remark = "Review again. Keep practicing!";
        color = "red";
    }

    // Display Results and Correct Answers
    let resultHTML = `<h3 style="color: ${color};">Your Score: ${score} / ${currentQuizQuestions.length}</h3>`;
    resultHTML += `<p style="font-weight: bold; color: ${color};">Remark: ${remark}</p>`;
    
    resultHTML += `<h4 style="margin-top: 1.5rem;">Answer Key:</h4><ul style="list-style-type: none; padding: 0;">`;
    for (let i = 0; i < currentQuizQuestions.length; i++) {
        resultHTML += `<li style="margin-bottom: 0.5rem; padding: 0.5rem; background: #f4f4f4; border-radius: 5px;">
                        <strong>Q${i+1}:</strong> ${currentQuizQuestions[i].answer}
                      </li>`;
    }
    resultHTML += `</ul>`;
    
    // Add a "Retake" button to reload the page
    resultHTML += `<button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">Take Another Quiz</button>`;

    document.getElementById('result-display').innerHTML = resultHTML;
}