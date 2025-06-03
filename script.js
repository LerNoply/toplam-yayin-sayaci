function getStartTime() {
  const saved = localStorage.getItem("streamStart");
  return saved ? new Date(saved) : new Date();
}

const startTime = getStartTime();

setInterval(() => {
  const now = new Date();
  const diff = Math.floor((now - startTime) / 1000);

  const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const seconds = String(diff % 60).padStart(2, "0");

  document.getElementById("counter").textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);
