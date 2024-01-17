document.addEventListener("DOMContentLoaded", function () {
    const timerDisplay = document.getElementById("timer");
    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");
    const reminderCheckbox = document.getElementById("reminderCheckbox");

    let timer;
    let timeInSeconds = 0.1 * 60; // 25 minutes by default
    let reminderInterval;

    function updateDisplay() {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    function notifyUser(message) {
        alert(message);
        playNotificationSound(); // Placeholder for playing sound, replace this with your actual sound implementation
    }

    function playNotificationSound() {
        // Placeholder for playing sound, replace this with your actual sound implementation
        console.log("Playing notification sound...");
    }
    function startTimer() {
        timer = setInterval(function () {
            if (timeInSeconds > 0) {
                timeInSeconds--;
                updateDisplay();
            } else {
                clearInterval(timer);
                notifyUser("Pomodoro session completed!");
                resetTimer();
            }
        }, 1000);

        if (reminderCheckbox.checked) {
            reminderInterval = setInterval(function () {
                notifyUser("Stay Focused");
            }, 120000); // 2 minutes in milliseconds
        }
    }

    function resetTimer() {
        clearInterval(timer);
        clearInterval(reminderInterval);
        timeInSeconds = 25 * 60;
        updateDisplay();
    }

    startBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);
});
