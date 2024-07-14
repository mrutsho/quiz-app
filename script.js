const questions = [
    {
        question: "What is the correct syntax for referring to an external script called "script.js"?",
        answers: [
            {text: "<script name="script.js"></script>", correct: false},
            {text: "<script src="script.js"></script>", correct: true},
            {text: "<script href="script.js"></script>", correct: false},
            {text: "<script link="script.js"></script>", correct: false},
        ]
    },
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        answers: [
            {text: "append()", correct: false},
            {text: "concat()", correct: true},
            {text: "attach()", correct: false},
            {text: "combine()", correct: false},
        ]
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: [
            {text: "<!-- This is a comment -->", correct: false},
            {text: "/* This is a comment */", correct: false},
            {text: "// This is a comment", correct: true},
            {text: "** This is a comment **", correct: false},
        ]
    },
    {
        question: "Which method is used to convert a JSON string into a JavaScript object?",
        answers: [
            {text: "JSON.parse()", correct: true},
            {text: "JSON.stringify()", correct: false},
            {text: "JSON.convert()", correct: false},
            {text: "JSON.toObject()", correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function  resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block"
}


function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
