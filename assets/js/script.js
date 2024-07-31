const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
startButton.classList.add('hide');
shuffledQuestions = questions.sort(() => Math.random() - .5);
currentQuestionIndex = 0;
questionContainerElement.classList.remove('hide');
setNextQuestion();
    
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2 * 2?',
        answers: [
            { text: '4', correct: false },
            { text: '12', correct: false },
            { text: '6', correct: false},
            {text: '8', correct: true}
        ] 
    },
    {
        question: 'What is the capital of America?',
        answers: [
            { text: 'Vancover', correct: false },
            { text: 'Washington DC', correct: true },
            { text: 'New York', correct: false },
            { text: 'California', correct: false}
        ]
    },
    {
        question: 'Where is the sea of tranquility?',
        answers: [
            { text: 'Antartica', correct: false },
            { text: 'The Moon', correct: true },
            { text: 'Africa', correct: false },
            { text: 'South America', correct: false}
        ]
    },
    {
        question: 'What is the deepest part of the ocean?',
        answers: [
            { text: 'Challenger Deep', correct: true },
            { text: 'Mariana Trench', correct: false },
            { text: 'Philippine Trench', correct: false },
            { text: 'Tonga Trench', correct: false }
        ]
    }
];