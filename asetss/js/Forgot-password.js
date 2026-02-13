const EmailInput = document.getElementById("EmailInput");
const EmailLabel = document.getElementById("EmailLabel");
const forget = document.getElementById("forget");
const forms = document.getElementById("forms");
const SEB = document.getElementById("SEB");
const P = document.getElementById("P");

let timerId = null;
let remaining = 0;
let currentCode = null;
let phase = "email";

forms.addEventListener("submit", e => {
  e.preventDefault();
  if (phase === "email") {
    EmailInput.type = "number";
    EmailInput.required = true;
    EmailInput.value = "";
    EmailLabel.innerText = "Enter Code";
    SEB.innerText = "Verify Code";

    currentCode = String(Math.floor(100000 + Math.random() * 900000));
    console.log("Verification code (demo):", currentCode);
    startTimer(50);
    phase = "code";
    return;
  }

  if (phase === "code") {
    const inputCode = EmailInput.value.trim();
    if (inputCode.length === 0) {
      alert("Please enter the code.");
      return;
    }
    if (inputCode === currentCode) {
      alert("Code verified successfully.");
      currentCode = null;
      phase = "email";
      EmailInput.type = "text";
      EmailInput.required = true;
      EmailInput.value = "";
      EmailLabel.innerText = "Enter your email";
      SEB.innerText = "Send Code";
      if (timerId) clearInterval(timerId);
      timerId = null;
      remaining = 0;
      P.innerText = "";
      P.classList.remove("timer");
      P.classList.add("link");
      window.location.href = "../../index.html";
    } else {
      alert("Invalid code. Try again.");
    }
  }

});

const renderTimer = () => {
  if (remaining > 0) {
    P.innerText = `Resend code after 00:${String(remaining).padStart(2, "0")}`;
  } else {
    P.innerText = "Resend the code";
    P.classList.add("link");
    P.classList.remove("timer");
  }
};

const startTimer = (seconds) => {
  if (timerId) clearInterval(timerId);
  remaining = seconds;
  P.classList.add("timer");
  P.classList.remove("link");
  renderTimer(); // show immediately
  timerId = setInterval(() => {
    remaining -= 1;
    renderTimer();
    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
    }
  }, 1000);
  forms.insertBefore(forget, SEB);
};

P.addEventListener("click", () => {
  if (remaining > 0) return;
  startTimer(50);
});
