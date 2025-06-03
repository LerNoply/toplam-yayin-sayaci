const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const startTimeDisplay = document.getElementById('startTimeDisplay');

function pad(num) {
  return num.toString().padStart(2, '0');
}

function formatDateTR(date) {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function parseDateTime(dateStr, timeStr) {
  // dateStr: dd/mm/yyyy
  // timeStr: HH:mm (24 saat)
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0 bazlı ay
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  const timeParts = timeStr.split(':');
  if (timeParts.length !== 2) return null;

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  if (isNaN(hours) || isNaN(minutes)) return null;

  return new Date(year, month, day, hours, minutes);
}

function updateTimer(startTimestamp) {
  const now = Date.now();
  let diff = now - startTimestamp;
  if (diff < 0) diff = 0;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timerEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function startCounting() {
  const dateStr = dateInput.value.trim();
  const timeStr = timeInput.value.trim();

  if (!dateStr || !timeStr) {
    alert('Lütfen tarih ve saat bilgilerini eksiksiz giriniz!');
    return;
  }

  const dateObj = parseDateTime(dateStr, timeStr);
  if (!dateObj || isNaN(dateObj.getTime())) {
    alert('Geçersiz tarih veya saat formatı! Tarih: dd/mm/yyyy, Saat: 24 saat formatında olmalı.');
    return;
  }

  const startTimestamp = dateObj.getTime();
  localStorage.setItem('yayınStart', startTimestamp);
  startTimeDisplay.textContent = formatDateTR(dateObj);
  updateTimer(startTimestamp);
  setInterval(() => updateTimer(startTimestamp), 1000);
}

window.onload = () => {
  const savedStart = localStorage.getItem('yayınStart');
  if (savedStart) {
    const date = new Date(parseInt(savedStart));
    dateInput.value = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
    timeInput.value = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    startTimeDisplay.textContent = formatDateTR(date);
    startCounting();
  }
};

startBtn.addEventListener('click', startCounting);
