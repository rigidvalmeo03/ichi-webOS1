    var selectedApp = null;
    function selectApp(app) {
        if (selectedApp === app) {
            selectedApp = null;
            app.style.backgroundColor = "transparent"; }
        else {
            selectedApp = app;
            app.style.backgroundColor = "rgb(255, 200, 225)";
        }
    }
    
    function updateTime(){
        var currentTime = new Date().toLocaleString();
        var timeText = document.querySelector("#timeElement");
            timeText.innerHTML = currentTime;
        }
        setInterval(updateTime, 1000);

    function dragElement(element) {
        var initialX = 0; 
        var initialY = 0; 
        var currentX = 0; 
        var currentY = 0;
        if (document.getElementById(element.id + "header")) {
            document.getElementById(element.id + "header").onmousedown = startDragging;
        } else { element.onmousedown = startDragging; }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = moveElement; }
            
    function moveElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px"; }

            function stopDragging() {
                document.onmouseup = null;
                document.onmousemove = null; }}

    dragElement(document.getElementById("welcome"));
        var welcomeScreen = document.querySelector("#welcome");
       var periodicTable = document.querySelector("#periodicTable");
       var chemistryNotes = document.querySelector("#chemistryNotes");
       var chemistryQuiz = document.querySelector("#chemistryQuiz");

        function closeWindow(element) { element.style.display = "none";}

        function openWindow(element) { element.style.display = "block";}

    dragElement(document.getElementById("chemistryNotes"));
    dragElement(document.getElementById("periodicTable"));
    dragElement(document.getElementById("chemistryQuiz"));
    
    var quizQuestions = [
        {
        question: "What is the chemical symbol for oxygen?",
        choices: ["O", "Ox", "O2", "Og"],
        correctAnswer: 0 },
        {
        question: "What is the atomic number of chlorine?",
        choices: ["17", "19", "15", "20"],
        correctAnswer: 0},
        {
        question: "What is the chemical formula of acetic acid?",
        choices: ["H2SO4", "CH3COOH", "NaHCO3", "C2H5OH"],
        correctAnswer: 1
        },
        {
        question: "Which particle has a negative charge?",
        choices: ["proton", "neutron", "electron", "nucleus"],
        correctAnswer: 2
        },
        {
        question: "What is the pH of a neutral substance at room temperature?",
        choices: ["0", "5", "7", "14"],
        correctAnswer: 2
        }
    ];

    var currentQuestion = 0;
    var score = 0;
    var answered = false;

    function showQuestion() {
        var question = quizQuestions[currentQuestion];
        document.querySelector("#questionNumber").innerHTML = "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;
        document.querySelector("#questionText").innerHTML = question.question;
        document.querySelector("#answer0").innerHTML = "A. " + question.choices[0];
        document.querySelector("#answer1").innerHTML = "B. " + question.choices[1];
        document.querySelector("#answer2").innerHTML = "C. " + question.choices[2];
        document.querySelector("#answer3").innerHTML = "D. " + question.choices[3];

        for (var i = 0; i < 4; i++) {
            var answerButton = document.querySelector("#answer" + i);

            answerButton.disabled = false;
            answerButton.style.backgroundColor = "rgb(255, 255, 255)";
            answerButton.style.color = "rgb(65, 6, 18)";
        }

        document.querySelector("#feedback").innerHTML = "";
        document.querySelector("#nextButton").style.display = "none";
        document.querySelector("#restartButton").style.display = "none";
        answered = false;
    }
    function checkAnswer(answerIndex) {
        if (answered === true) {return;}
        answered = true;
        var question = quizQuestions[currentQuestion];
        var feedback = document.querySelector("#feedback");
        var selectedButton = document.querySelector("#answer" + answerIndex);
        var correctButton = document.querySelector("#answer" + question.correctAnswer);

        for(var i = 0; i < 4; i++) {
            document.querySelector("#answer" + i).disabled = true;
        }

        if (answerIndex === question.correctAnswer) {
            score++;;
            feedback.innerHTML = "Correct! Great job, diva!"
            feedback.style.color = "rgb(0,128,0)";
            selectedButton.style.backgroundColor = "rgb(180, 255, 180)";
        } else {
            feedback.innerHTML = "Incorrect! The correct answer is " + question.choices[question.correctAnswer] + ".";
            feedback.style.color = "rgb(139,0,0)";
            selectedButton.style.backgroundColor = "rgb(255,180,180)";
            correctButton.style.backgroundColor = "rgb(180,255,180)";
        }
        document.querySelector("#scoreText").innerHTML = "Score: " + score;
        if (currentQuestion < quizQuestions.length - 1) {
            document.querySelector("#nextButton").style.display = "inline-block";
        } else {
            feedback.innerHTML += "<br><br>Quiz finished! Your final score is " + score + " out of " + quizQuestions.length + ".";
            document.querySelector("#restartButton").style.display = "inline-block"; 
        }
    }

    function nextQuestion() {
        if (currentQuestion < quizQuestions.length -1) {
            currentQuestion++;
            showQuestion();
        }
    }
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        answered = false;
        document.querySelector("#scoreText").innerHTML = "Score: 0";
        showQuestion();
    }

    showQuestion();