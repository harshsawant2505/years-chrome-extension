function updateCountdown(targetDate) {
  const now = new Date();
  let timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    document.querySelector('.container').innerHTML = '<h1>The Time Has Come!</h1>';
    return;
  }

  // Extract year, month, and day separately
  let targetYear = targetDate.getFullYear();
  let targetMonth = targetDate.getMonth();
  let targetDay = targetDate.getDate();

  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth();
  let nowDay = now.getDate();

  // Calculate years and months correctly
  let years = targetYear - nowYear;
  let months = targetMonth - nowMonth;
  if (months < 0) {
    years--;
    months += 12; // Adjust for negative months
  }

  // Adjust day difference correctly
  let days = targetDay - nowDay;
  if (days < 0) {
    // Borrow days from previous month
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Get the last day of the previous month
    let lastMonthDate = new Date(targetYear, targetMonth, 0).getDate();
    days += lastMonthDate;
  }

  // Calculate the remaining time
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Update the HTML elements
  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

// Load the saved date from storage
chrome.storage.sync.get(["targetDate", "title"], (data) => {
  let targetDate = data.targetDate ? new Date(data.targetDate) : new Date('August 1, 2027');
  let title = "Time Untill " +data.title  || "";
  console.log(title);
  // Set the title
  document.getElementById('title').innerHTML = title;

  // Start countdown
  setInterval(() => updateCountdown(targetDate), 1000);
  updateCountdown(targetDate);
});
