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
        function closeWindow(element) { element.style.display = "none";}

        function openWindow(element) { element.style.display = "block";}

    dragElement(document.getElementById("chemistryNotes"));
    dragElement(document.getElementById("periodicTable"));
    