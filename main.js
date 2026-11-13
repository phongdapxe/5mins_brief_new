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

const viewModeToggle = document.getElementById("view-mode-toggle");
const s1 = viewModeToggle.querySelector(".span1");
const s2 = viewModeToggle.querySelector(".span2");

const mainContent = document.querySelector(".main-content");
const cardViewer = document.getElementById("cardViewer");
const cardProgressBars = document.getElementById("cardProgressBars");
const cardBody = document.getElementById("cardBody");
const prevCardBtn = document.getElementById("prevCardBtn");
const nextCardBtn = document.getElementById("nextCardBtn");
const cardStepIndicator = document.getElementById("cardStepIndicator");
const posts = document.querySelectorAll(".main-content .post");

let isCardMode = false;
let currentCardIndex = 0;

s2.style.display = "none";

function renderCard(index) {
    currentCardIndex = index;

    cardProgressBars.innerHTML = "";
    posts.forEach((_, i) => {
        const bar = document.createElement("div");
        bar.className = "card-progress-segment" + (i <= index ? " active" : "");
        bar.addEventListener("click", () => renderCard(i));
        cardProgressBars.appendChild(bar);
    });

    cardBody.innerHTML = posts[index].innerHTML;

    cardStepIndicator.textContent = `Tin ${index + 1} / ${posts.length}`;
    prevCardBtn.disabled = index === 0;
    nextCardBtn.textContent = index === posts.length - 1 ? "Hoàn thành 🎉" : "Tiếp tục →";
}

viewModeToggle.addEventListener("click", function () {
    isCardMode = !isCardMode;

    if (isCardMode) {
        s1.style.display = "none";
        s2.style.display = "inline";
        mainContent.style.display = "none";
        cardViewer.style.display = "block";
        renderCard(0);
    } else {
        s1.style.display = "inline";
        s2.style.display = "none";
        mainContent.style.display = "grid";
        cardViewer.style.display = "none";
    }
});

prevCardBtn.addEventListener("click", function () {
    if (currentCardIndex > 0) {
        renderCard(currentCardIndex - 1);
    }
});

nextCardBtn.addEventListener("click", function () {
    if (currentCardIndex < posts.length - 1) {
        renderCard(currentCardIndex + 1);
    } else {
        viewModeToggle.click();
        document.querySelector(".main-bottom").scrollIntoView({ behavior: "smooth" });
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