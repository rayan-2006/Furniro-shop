class ToastManager {
  constructor() {
    this.container = document.getElementById("toastContainer");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toastContainer";
      this.container.className = "Message-boxs";
      document.body.appendChild(this.container);
    }
  }
  show(message, type = "info", duration = 4000) {
    const toast = document.createElement("div");
    toast.className = `Message-box ${type}`;

    toast.innerHTML = `
      <div class="message-text">
        <p>${message}</p>
        <div class="bar"></div>
      </div>
      <button class="close-message" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11083)"> <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11083"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
      </button>
    `;

    this.container.prepend(toast);

    let isRemoved = false;

    /* ---------- ENTER ---------- */
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    /* ---------- PROGRESS BAR ---------- */
    const bar = toast.querySelector(".bar");
    bar.style.width = "100%";

    requestAnimationFrame(() => {
      bar.style.transition = `width ${duration}ms linear`;
      bar.style.width = "0%";
    });

    /* ---------- REMOVE ---------- */
    const removeToast = () => {
      if (isRemoved) return;
      isRemoved = true;

      toast.classList.remove("show");
      toast.classList.add("hide");

      let removedByEvent = false;

      const onEnd = (e) => {
        if (e.target !== toast) return;
        removedByEvent = true;
        toast.remove();
      };

      toast.addEventListener("transitionend", onEnd, { once: true });

      // fallback (اگه transitionend نیومد)
      setTimeout(() => {
        if (!removedByEvent) toast.remove();
      }, 450);
    };

    toast.querySelector(".close-message").addEventListener("click", removeToast);
    setTimeout(removeToast, duration);
  }
}
const toast = new ToastManager();
