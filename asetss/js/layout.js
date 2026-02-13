document.addEventListener("DOMContentLoaded", () => {
  fetch("components/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      if (typeof updateNavbar === "function") {
        updateNavbar();
      } else {
        console.warn("updateNavbar() not found. Ensure auth.js is loaded before layout.js.");
      }
    })
    .catch(err => console.error("Header load failed:", err));
});
