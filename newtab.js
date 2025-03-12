function updateCountdown(targetDate) {
  const now = new Date();
  let timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    document.querySelector('.container').innerHTML = '<h1>The Time Has Come!</h1>';
    return;
  }

  let targetYear = targetDate.getFullYear();
  let targetMonth = targetDate.getMonth();
  let targetDay = targetDate.getDate();

  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth();
  let nowDay = now.getDate();

  let years = targetYear - nowYear;
  let months = targetMonth - nowMonth;
  if (months < 0) {
    years--;
    months += 12;
  }

  let days = targetDay - nowDay;
  if (days < 0) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
    let lastMonthDate = new Date(targetYear, targetMonth, 0).getDate();
    days += lastMonthDate;
  }

  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

chrome.storage.sync.get(["targetDate", "title"], (data) => {
  let targetDate = data.targetDate ? new Date(data.targetDate) : new Date('August 1, 2027');
  let title = data.title ? `TIME UNTIL ${data.title}` : "TIME UNTIL GRADUATION";
  document.getElementById('countdown-title').textContent = title;

  setInterval(() => updateCountdown(targetDate), 1000);
  updateCountdown(targetDate);
  updateProgress(targetDate)
});

function updateProgress(targetDate) {
  const nowDate = new Date().getTime(); // Current time in milliseconds
  const targetTime = new Date(targetDate).getTime(); // Target time in milliseconds

  if (targetTime <= nowDate) {
    document.getElementById("progress-bar").style.width = "100%"; // Full progress if target time is reached
    return;
  }

  const progress = (nowDate / targetTime) * 100; // Calculate percentage
  document.getElementById("progress-bar").style.width = progress + "%";
}


