const now = new Date();

const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy"
];

const dayName = daysOfWeek[now.getDay()];
const date = String(now.getDate()).padStart(2, '0');
const month = now.getMonth() + 1;

const formattedDate = `${dayName}, ${date} Tháng ${month}`;

document.getElementById('current_date').textContent = formattedDate;

document.querySelector(".li2 .span2 label").addEventListener("click", function () {
    document.getElementById("new_date").showPicker();
});

const totalTime = 5 * 60;
let remainingTime = totalTime;

const timeDisplay = document.getElementById("time-remaining");
const progressCircle = document.getElementById("progress-circle");

function updateTimer() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timeDisplay.textContent =
        `${minutes}:${String(seconds).padStart(2, "0")} còn lại`;

    const progress = (remainingTime / totalTime) * 100;
    progressCircle.setAttribute("stroke-dashoffset", 100 - progress);

    if (remainingTime > 0) {
        remainingTime--;
    } else {
        clearInterval(timerInterval);
        timeDisplay.textContent = "Hết thời gian";
    }
}

updateTimer();

const timerInterval = setInterval(updateTimer, 1000);

// li4 chuyển article
const viewModeToggle = document.getElementById("view-mode-toggle");
const s1 = viewModeToggle.querySelector(".span1");
const s2 = viewModeToggle.querySelector(".span2");

s2.style.display = "none";

viewModeToggle.addEventListener("click", function () {
    if (s1.style.display === "none") {
        s1.style.display = "inline";
        s2.style.display = "none";
    } else {
        s1.style.display = "none";
        s2.style.display = "inline";
    }
});

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrollHeight > 0 && progressBar) {
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    }
});
// li6 chuyển màu
const themeToggle = document.getElementById("theme-toggle");
const themeSpan1 = themeToggle.querySelector(".span1");
const themeSpan2 = themeToggle.querySelector(".span2");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeSpan1.style.display = "none";
        themeSpan2.style.display = "inline";
    } else {
        themeSpan1.style.display = "inline";
        themeSpan2.style.display = "none";
    }
});