const questions = [
    {
        question: "O que é um Teste de Software?",
        answers: [
            { text: "Processo de avaliar e realizar testagens em um sistema, verificando se ele atende aos requisitos de qualidade", correct: true },
            { text: "Processo de verificar e avaliar o funcionamento de um código escrito apenas em HTML5 e CSS3", correct: false },
            { text: "Processo de montagem de bancos de dados com base em dados inseridos", correct: false },
            { text: "Processo de montagem de diagramas para entendimento de um banco de dados ou modelo de código", correct: false },
        ],
    },
    {
        question: "O que é um bug no contexto de desenvolvimento de software?",
        answers: [
            { text: "Uma melhoria no sistema", correct: false },
            { text: "Uma falha ou erro no funcionamento esperado", correct: true },
            { text: "Um teste automatizado", correct: false },
            { text: "Um tipo de banco de dados", correct: false },
        ],
    },
    {
        question: "No teste de caixa preta, o que é avaliado?",
        answers: [
            { text: "A lógica interna do código", correct: false },
            { text: "O desempenho da infraestrutura", correct: false },
            { text: "As funcionalidades, sem olhar o código", correct: true },
            { text: "O código-fonte e suas estruturas internas", correct: false },
        ],
    },
    {
        question: "Qual é o objetivo principal do teste de unidade?",
        answers: [
            { text: "Testar o sistema inteiro em ambiente de produção", correct: false },
            { text: "Testar a integração entre sistemas externos", correct: false },
            { text: "Verificar se um componente ou função isolada funciona corretamente", correct: true },
            { text: "Avaliar o desempenho sob carga pesada", correct: false },
        ],
    },
    {
        question: "O que é um plano de teste?",
        answers: [
            { text: "Um teste realizado para medir a velocidade do software", correct: false },
            { text: "Um teste para verificar se funcionalidades antigas continuam funcionando após alterações", correct: false },
            { text: "Uma forma de testar bancos de dados relacionais", correct: false },
            { text: "Um documento que descreve o processo de desenvolvimento e abordagem do teste de software", correct: true },
        ],
    },
    {
        question: "O que é automação de testes?",
        answers: [
            { text: "Execução manual de testes por vários testadores", correct: false },
            { text: "Uso de scripts ou ferramentas para executar testes automaticamente", correct: true },
            { text: "Uma técnica para aumentar o tempo de entrega", correct: false },
            { text: "Processo de deletar testes desnecessários", correct: false },
        ],
    },
];

const quizContainer = document.getElementById("quiz-container");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];
    const questionEl = document.createElement("div");
    questionEl.classList.add("quizz-header");
    questionEl.innerHTML = `
        <h1>Questão ${currentQuestionIndex + 1}</h1>
        <p>${currentQuestion.question}</p>
    `;
    quizContainer.appendChild(questionEl);

    const answersDiv = document.createElement("div");
    answersDiv.classList.add("quizz-body");

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answersDiv.appendChild(button);
    });

    quizContainer.appendChild(answersDiv);

    const footer = document.createElement("div");
    footer.classList.add("quizz-footer");
    const nextButton = document.createElement("button");
    nextButton.id = "next-btn";
    nextButton.innerText = currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Next";
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    });
    footer.appendChild(nextButton);
    quizContainer.appendChild(footer);
}

function resetState() {
    quizContainer.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.style.backgroundColor = "lightgreen";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "lightcoral";
    }

    const buttons = quizContainer.querySelectorAll(".btn");
    buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.style.border = "2px solid green";
        }
    });
}

function showScore() {
    resetState();
    const result = document.createElement("div");
    result.innerHTML = `
        <h1>Quiz finalizado!</h1>
        <p>Você acertou ${score} de ${questions.length} perguntas. 🧠</p>
    `;
    quizContainer.appendChild(result);
}

startQuiz();
