document.getElementById("forms").addEventListener("submit", async (e) => {
  e.preventDefault();
  const BTN = document.getElementById("BTN");
  emailInput = document.getElementById("email").value.trim();
  passwordInput = document.getElementById("password").value.trim();
  passwordRInput = document.getElementById("passwordR").value.trim();

  if (!emailInput || !passwordInput || !passwordRInput) {
    toast.show("Please fill in all fields", "info");
    return;
  }
  if (passwordInput !== passwordRInput) {
    toast.show("Passwords do not match", "error");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput)) {
    toast.show("Please enter a valid email", "error");
    return;
  }
  BTN.innerText = "Please wait ..."
  BTN.disabled = true;
  BTN.style.cursor = 'not-allowed';
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      }),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid email or password");
      } else if (response.status === 404) {
        throw new Error("API endpoint not found");
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }
    const data = await response.json();
    console.log("Sign-up successful:", data);
    toast.show("Sign-up successful!", "success");
    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 2000);
    form.reset();
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      toast.show("Network error. Please check your connection.", "error");
    } else if (error.name === "SyntaxError") {
      toast.show("Invalid server response", "error");
    } else {
      toast.show(error.message || "An error occurred", "error");
    }
  } finally {
    BTN.innerText = "Sign Up"
    BTN.disabled = false;
    BTN.style.cursor = 'pointer';
  }
})