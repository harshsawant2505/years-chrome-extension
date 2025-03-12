function updateCountdown() {
    const targetDate = new Date("2027-06-01T00:00:00Z"); // Set target date
    const now = new Date();
    const timeLeft = targetDate - now; // Time difference in milliseconds

    if (timeLeft <= 0) {
        document.getElementById("countdown-timer").innerText = "It's June 2027!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    document.getElementById("countdown-timer").innerText =
        `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Create and add the timer element
const timerDiv = document.createElement("div");
timerDiv.id = "countdown-timer";
document.body.appendChild(timerDiv);

// Update the countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
