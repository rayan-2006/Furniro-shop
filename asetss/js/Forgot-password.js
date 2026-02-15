const emailInput = document.getElementById("EmailInput");
const emailLabel = document.getElementById("EmailLabel");
const form = document.getElementById("forms");
const submitButton = document.getElementById("SEB");
const timerText = document.getElementById("P");

const RESEND_SECONDS = 50;
const USERS_API = "https://jsonplaceholder.typicode.com/users";

let timerId = null;
let remaining = 0;
let currentCode = null;
let phase = "email";

function renderTimer() {
  if (phase !== "code") {
    timerText.textContent = "";
    timerText.classList.remove("link");
    timerText.classList.add("timer");
    return;
  }

  if (remaining > 0) {
    timerText.textContent = `Resend code after 00:${String(remaining).padStart(2, "0")}`;
    timerText.classList.remove("link");
    timerText.classList.add("timer");
  } else {
    timerText.textContent = "Resend the code";
    timerText.classList.add("link");
    timerText.classList.remove("timer");
  }
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer(seconds) {
  stopTimer();
  remaining = seconds;
  renderTimer();

  timerId = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      remaining = 0;
      stopTimer();
    }
    renderTimer();
  }, 1000);
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function switchToEmailPhase() {
  phase = "email";
  currentCode = null;
  stopTimer();
  remaining = 0;

  emailInput.type = "email";
  emailInput.inputMode = "email";
  emailInput.removeAttribute("pattern");
  emailInput.maxLength = 255;
  emailInput.value = "";

  emailLabel.textContent = "Enter your email";
  submitButton.textContent = "Send Code";
  renderTimer();
}

function switchToCodePhase() {
  phase = "code";

  emailInput.type = "text";
  emailInput.inputMode = "numeric";
  emailInput.pattern = "\\d{6}";
  emailInput.maxLength = 6;
  emailInput.value = "";

  emailLabel.textContent = "Enter Code";
  submitButton.textContent = "Verify Code";

  currentCode = generateCode();
  console.log("Verification code (demo):", currentCode);
  startTimer(RESEND_SECONDS);
}

async function isEmailFound(email) {
  const response = await fetch(USERS_API, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await response.json();
  return users.some(user => String(user.email).toLowerCase() === email.toLowerCase());
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  if (phase === "email") {
    const enteredEmail = emailInput.value.trim();
    if (!enteredEmail) {
      alert("Please enter your email.");
      return;
    }

    try {
      const found = await isEmailFound(enteredEmail);
      if (!found) {
        alert("Email not found");
        return;
      }
      switchToCodePhase();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
    return;
  }

  if (emailInput.value.trim() === currentCode) {
    alert("Code verified successfully.");
    switchToEmailPhase();
    window.location.href = "../../index.html";
    return;
  }

  alert("Invalid code. Try again.");
});

timerText.addEventListener("click", () => {
  if (phase !== "code" || remaining > 0) {
    return;
  }
  currentCode = generateCode();
  console.log("Verification code (demo):", currentCode);
  startTimer(RESEND_SECONDS);
});
switchToEmailPhase();