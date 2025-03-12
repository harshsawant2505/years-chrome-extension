document.getElementById('saveDate').addEventListener('click', function() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const title = document.getElementById('title').value;
  
    const targetDate = new Date(year, month, 1, 0, 0, 0); // Set to 1st of selected month
  
    chrome.storage.sync.set({ targetDate: targetDate.toISOString(), title: title }, () => {
      alert('Countdown Date and Title Saved!');
    });
  });
  