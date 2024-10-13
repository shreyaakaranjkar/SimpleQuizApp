const questions = [
    {
        question: "Which CSS property is used to control the order of flex items in a flex container?",
        answers: [
            { text: "order", correct: true },
            { text: "z-index", correct: false },
            { text: "flex-order", correct: false },
            { text: "stack-order", correct: false }
        ]
    },
    {
        question: "What is the default value of the CSS 'position' property?",
        answers: [
            { text: "relative", correct: false },
            { text: "static", correct: true },
            { text: "absolute", correct: false },
            { text: "fixed", correct: false }
        ]
    },
    {
        question: "Which of the following pseudo-classes is used to target an element when it's the first child of its parent?",
        answers: [
            { text: ":first-child", correct: true },
            { text: ":first-of-type", correct: false },
            { text: ":nth-child(1)", correct: false },
            { text: ":only-child", correct: false }
        ]
    },
    {
        question: "In CSS Grid Layout, what is the purpose of the 'grid-template-columns' property?",
        answers: [
            { text: "Defines the number of rows in a grid", correct: false },
            { text: "Defines the number and size of columns in a grid", correct: true },
            { text: "Aligns grid items vertically", correct: false },
            { text: "Gaps between grid items", correct: false }
        ]
    },
    {
        question: "Which of the following properties is used for smooth transitions when an element's state changes?",
        answers: [
            { text: "transition", correct: true },
            { text: "transform", correct: false },
            { text: "animation", correct: false },
            { text: "timing-function", correct: false }
        ]
    }
];

//check q ans

const questionEle = document.getElementById("question");
const answerEle = document.getElementById("answer-buttons");
const nextbtnEle = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbtnEle.innerHTML = "Next";
    showQuiz();
}

function showQuiz(){
    reset()
    let currquestions = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEle.innerHTML = `${questionNo} . ${currquestions.question}`;

    currquestions.answers.forEach(ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        answerEle.appendChild(button);
        if(ans.correct){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

//selectAnswer

function selectAnswer(e){
    const selBtn = e.target;
    const isCorrect = selBtn.dataset.correct === "true";
    if(isCorrect){
        selBtn.classList.add("Correct");
        score++;
    }
    else{
        selBtn.classList.add("Incorrect")
    }
    Array.from(answerEle.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("Correct")
        }
        button.disabled = true;
    });
    nextbtnEle.style.display = "block"
}

function showScore(){
    reset(); //to calculate score
    questionEle.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextbtnEle.innerHTML = "Play Again";
    nextbtnEle.style.display = "block";
}
//handlenext
function handlenext(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuiz()
    }
    else{
        showScore();
        }
}

nextbtnEle.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handlenext()
    }
    else{
        startQuiz()
    }
})
function reset(){
    nextbtnEle.style.display = "none";
    while(answerEle.firstChild){
        answerEle.removeChild(answerEle.firstChild)
    }
}
startQuiz()