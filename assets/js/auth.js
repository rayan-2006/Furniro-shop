const Auth = {
  login(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem("user");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  isLoggedIn() {
    return !!localStorage.getItem("user");
  }
};

function updateNavbar() {
  const user = Auth.getUser();

  const loginBtn = document.getElementById("loginBtn");
  const userMenu = document.getElementById("userMenu");
  const username = document.getElementById("username");

  if (!loginBtn || !userMenu) return;

  if (user) {
    loginBtn.style.display = "none";
    userMenu.style.display = "inline-block";
    if (username) {
      username.textContent = user.name;
    }
  } else {
    loginBtn.style.display = "block";
    userMenu.style.display = "none";
  }
}
