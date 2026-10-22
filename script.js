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
       var chemistryCalc = document.querySelector("#chemistryCalc");
       var reactionLab = document.querySelector("#reactionLab");
       var moleculeBuilder = document.querySelector("#moleculeBuilder");



        function closeWindow(element) { element.style.display = "none";}

        function openWindow(element) { element.style.display = "block";}

    dragElement(document.getElementById("chemistryNotes"));
    dragElement(document.getElementById("periodicTable"));
    dragElement(document.getElementById("chemistryQuiz"));
    dragElement(document.getElementById("chemistryCalc"));
    dragElement(document.getElementById("reactionLab"));
    dragElement(document.getElementById("moleculeBuilder"));

    
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

    function changeCalcType() {
        var type = document.querySelector("#calcType").value;
        var extra = document.querySelector("#extraInput");
        var result = document.querySelector("#molarMassResult");

        result.innerHTML ="";
        
        if (type === "mass") {
            extra.innerHTML = "";
        }
        else if (type === "moles") {
            extra.innerHTML = `
                <label for="amount">Amount:</label>
                <input id="amount" type="number" min="0" step="any"
                    placeholder="Enter grams or moles"
                    style="padding: 8px; width: 90%; margin-top: 6px;">
                <br><br>
                <label for="conversion">Convert:</label>
                <select id="conversion" style="padding: 8px;">
                    <option value="gramsToMoles">Grams to moles</option>
                    <option value="molesToGrams">Moles to grams</option> 
                </select>
            `;
        }
        else if (type === "molarity") {
            extra.innerHTML = `
                <label for="soluteMoles">Amount of solute (mol):</label>
                <input id="soluteMoles" type="number" min="0" step="any"
                    placeholder="e.g. 0.5"
                    style="padding: 8px; width: 90%; margin-top: 6px;">
                <br><br>
                <label for="volume">Solution volume (L):</label>
                <input id="volume" type="number" min="0" step="any"
                    placeholder="e.g. 2"
                    style="padding: 8px; width: 90%; margin-top: 6px;">
            `;
        }
    }

    function runCalculation() {
        var type = document.querySelector("#calcType").value;
        var result = document.querySelector("#molarMassResult");

        if (type === "mass") {
            calculateMolarMass();
            return;
        } 

        try {
            if (type === "moles") {
                var formula = document.querySelector("#chemicalFormula").value.trim();
                var molarMass = getMolarMass(formula);
                var amount = Number(document.querySelector("#amount").value);
                var conversion = document.querySelector("#conversion").value;

                if (document.querySelector("#amount").value === "" || !Number.isFinite(amount) || amount < 0) {
                     result.textContent = "Please enter a valid amount.";
                    return;
                } 
                if (conversion === "gramsToMoles") {
                    result.innerHTML = 
                        "<p>Result: <b>" +
                        (amount * molarMass).toFixed(4) + "g</b></p>";
                } else {
                    result.innerHTML = "<p>Result: <b>" + (amount * molarMass).toFixed(4) + " g</b></p>";
                }
            } else if (type === "molarity") {
                var soluteInput = document.querySelector("#soluteMoles").value;
                var volumeInput = document.querySelector("#volume").value;
                var soluteMoles = Number(soluteInput);
                var volume = Number(volumeInput);

                if (soluteInput === "" || volumeInput === "" ||
                    !Number.isFinite(soluteMoles) ||
                    !Number.isFinite(volume) ||
                    soluteMoles < 0 || volume <= 0
                ) {
                    result.textContent = "Enter valid moles and a volume greater than zero.";
                    return;
                }
                result.innerHTML = "<p>Molarity: <b>" + (soluteMoles / volume).toFixed(4) + " M</b></p>";
            }
        } catch (error) {
            result.textContent = error.message;
        }
    }

    var atomicMasses = {
        H: 1.008,
        He: 4.003,
        Li: 6.94,
        Be: 9.012,
        B: 10.81,
        C: 12.011,
        N: 14.007,
        O: 15.999,
        F: 18.998, 
        Ne: 20.180,
        Na: 22.990,
        Mg: 24.305,
        Al: 26.982, 
        Si: 28.085, 
        P: 30.974, 
        S: 32.06,
        Cl: 35.45,
        K: 39.098,
        Ca: 40.078, 
        Fe: 55.845,
        Cu: 63.546,
        Zn: 65.38,
        Ag: 107.868,
        Br: 79.904,
        I: 126.904,
    }

    function parseFormula(formula) {
        formula = formula.replace(/\s/g, "");
        var tokens = formula.match(/[A-Z][a-z]?|\d+|[()]/g);
        if (!formula || !tokens || tokens.join("") !== formula) {
            throw new Error("Please enter a valid chemical formula");
        }
        var position = 0;

        function parseGroup() {
            var counts = {};
            while (position < tokens.length && tokens [position] !== ")") {
                var token = tokens[position];

                if (token === "(") {
                    position++;
                    var groupCounts = parseGroup();
                    if (tokens[position] !== ")") {
                        throw new Error("Your parentheses do not match.");
                    }
                    position++;
                    var groupMultiplier = 1;
                    if (position < tokens.length && /^\d+$/.test(tokens[position])) {
                        groupMultiplier = Number(tokens[position]);
                        position++;
                    }
                    if (groupMultiplier < 1) {
                        throw new Error("Subscripts must be positive.");
                    }
                    for (var element in groupCounts) {
                        counts[element] = (counts[element] || 0)
                            + groupCounts[element] * groupMultiplier
                    }
                } else if (/^[A-Z][a-z]?$/.test(token)) {
                    if (!atomicMasses[token]) {
                        throw new Error("Atomic mass for" + token + " is not available yet.");
                    }
                    position ++;

                    var quantity = 1;
                    if (position < tokens.length && /^\d+$/.test(tokens[position])) {
                        quantity = Number(tokens[position]);
                        position++;
                    }
                    if (quantity < 1) {
                        throw new Error ("Subscripts must be positive.");
                    }
                    counts[token] = (counts[token] || 0) + quantity;
                } else {
                    throw new Error("Please check your formula.");
                }
            }
            return counts;
        }
        var counts = parseGroup();

        if (position !== tokens.length) {
            throw new Error("Your parentheses do not match.");
        }
        return counts;
    }

    function getMolarMass(formula) {
        var counts = parseFormula(formula);
        var totalMass = 0;

        for (var element in counts) {
            totalMass += atomicMasses[element] * counts[element];
        }
        return totalMass;
    }

    function calculateMolarMass() {
        var formula = document.querySelector("#chemicalFormula").value.trim();
        var result = document.querySelector("#molarMassResult");

        try {
            var mass = getMolarMass(formula);

            result.innerHTML = 
                "<h3>Molar Mass Result</h3>" +
                "<p>Formula: " + formula + "</p>" +
                "<p>Molar Mass:<b>" + mass.toFixed(3) + " g/mol</b></p>";
        } catch(error) {
            result.textContent = error.message;
        }
    }
    changeCalcType();

    var reactionExamples = {
        synthesis: {
            name: "Synthesis",
            equation: "2H₂ + O₂ → 2H₂O",
            explanation: "Two or more reactants combine to form one product."
        },
        decomposition: {
            name: "Decomposition",
            equation: "2H₂O₂ → 2H₂O + O₂",
            explanation: "One compound breaks into simpler substances."
        },
        single: {
            name: "Single Displacement",
            equation: "Zn + 2HCl → ZnCl₂ + H₂",
            explanation: "One element replaces another element in a compound."
        },
        double: {
            name: "Double Displacement",
            equation: "AgNO₃ + NaCl → AgCl + NaNO₃",
            explanation: "Two compounds exchange ions."
        },
        combustion: {
            name: "Combustion",
            equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
            explanation: "A substance reacts with oxygen and releases energy."
        },
        neutralization: {
            name: "Neutralization",
            equation: "HCl + NaOH → NaCl + H₂O",
            explanation: "An acid reacts with a base to form salt and water."
        },
    };

    function showReaction() {
        var type = document.querySelector("#reactionSelect").value
        var reaction = reactionExamples[type];

        document.querySelector("#reactionDetails").innerHTML = 
            "<h3>" + reaction.name + "</h3>" +
            "<p><b>Balance Equation:</b>" + reaction.equation + "</p>" +
            "<p>" + reaction.explanation + "</p>";
    }

    var reactionQuestions = [
        { equation: "N₂ + 3H₂ → 2NH₃", balanced: true},
        { equation: "H₂ + O₂ → H₂O", balanced: false},
        { equation: "2H₂ + O₂ → 2H₂O", balanced: true},
        { equation: "CH₄ + O₂ → CO₂ + 2H₂O", balanced: false},
        { equation: "CH₄ + 2O₂ → CO₂ + 2H₂O", balanced: true},
        { equation: "Na + Cl₂ → NaCl", balanced: false}
    ];

    var currentReactionQuestion = 0;
    function newReactionQuestion() {
        currentReactionQuestion = (currentReactionQuestion + 1) % reactionQuestions.length;
        document.querySelector("#reactionQuestion").textContent =
            "Is this equation balanced? " +
            reactionQuestions[currentReactionQuestion].equation;
        document.querySelector("#reactionQuizFeedback").textContent = "";
    }

    function checkReactionQuiz(answer) {
        var correct = reactionQuestions[currentReactionQuestion].balanced;
        var feedback = document.querySelector("#reactionQuizFeedback");

        if (answer === correct) {
            feedback.textContent = "Correct! Great chemistry work, queen!";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Not quite! Check the number of atoms on both sides.";
            feedback.style.color = "darkred";
        }
    }

    showReaction();

    function buildMolecule() {
        var elements = [
            {id: "atomC", symbol: "C"},
            {id: "atomH", symbol: "H"},
            {id: "atomN", symbol: "N"},
            {id: "atomO", symbol: "O"},
            {id: "atomNa", symbol: "Na"},
            {id: "atomCl", symbol: "Cl"},
        ];

        var counts = {};
        var total = 0;

        for (var i = 0; i < elements.length; i++) {
            var input = document.getElementById(elements[i].id);
            var value = Number(input.value);

            if (input.value === "" || !Number.isInteger(value) ||
                value < 0 || value > Number(input.max)) {
                    document.querySelector("#moleculeResult").textContent = "Please enter whole-number atom counts within the allowed limits.";
                    return;
                }
            
                counts[elements[i].symbol] = value;
                total += value;
        }

        var result = document.querySelector("#moleculeResult");

        if (total === 0) {
            result.textContent = "Add at least one atom to build a molecule!";
            return;
        }

        var formulaOrder = ["C", "H", "N", "O", "Na", "Cl"];
        var formula = "";

        if (counts.Na > 0 && counts.Cl > 0 &&
            total === counts.Na + counts.Cl &&
            counts.Na === counts.Cl) {
            formula = "NaCl";
        } else {
            for (var j = 0; j < formulaOrder.length; j++) {
                var symbol = formulaOrder[j];
                if (counts[symbol] > 0) {
                    formula += symbol;
                    if (counts[symbol] > 1) formula += counts[symbol];
                }
            }
        }

        var names = {
            H2O: "Water",
            CO2: "Carbon dioxide",
            CO: "Carbon monoxide",
            CH4: "Methane",
            NH3: "Ammonia",
            O2: "Oxygen gas",
            N2: "Nitrogen gas",
            H2: "Hydrogen gas",
            NaCl: "Sodium chloride",
            HCl: "Hydrogen chloride",
            H2O2: "Hydrogen peroxide"
        };

        var name = names[formula] || "Name not in starter molecule list";
        result.innerHTML = 
            "<h3>Your Formula: " + formula + "</h3>" +
            "<p><b>Name:</b>" + name + "</p>" +
            "<p><b>Total atoms:</b>" + total + "</b>" +
            "<p><b>Atom counts:</b>" +
            formulaOrder
                .filter(function (symbol) { return counts[symbol] > 0; })
                .map(function (symbol) {
                    return symbol + ": " + counts[symbol];
                }) 
                .join(", ") +
            "</p>";
    }

    function resetMolecule() {
        document.querySelector("#atomC").value = 0;
        document.querySelector("#atomH").value = 2;
        document.querySelector("#atomO").value = 1;
        document.querySelector("#atomN").value = 0;
        document.querySelector("#atomCl").value = 0;
        document.querySelector("#atomNa").value = 0;

        document.querySelector("#moleculeResult").textContent = "Your molecule will appear here!";
    }