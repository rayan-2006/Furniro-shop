const roomSlides = [
  {
    image: "/asetss/Image/Photo/word-image-17-1536x1125.png",
    alt: "Bedroom inspiration",
    type: "Bed Room",
    title: "Inner Peace",
  },
  {
    image: "/asetss/Image/Photo/word-image-15.png",
    alt: "Dining room inspiration",
    type: "Dining Room",
    title: "Cozy Moment",
  },
  {
    image: "/asetss/Image/Photo/scandinavian-interior-mockup-wall-decal-background 1.png",
    alt: "Living room inspiration",
    type: "Living Room",
    title: "Soft Harmony",
  },
  {
    image: "/asetss/Image/Photo/image.png",
    alt: "Modern interior inspiration",
    type: "Study Room",
    title: "Calm Work",
  },
];

function initRoomSlider() {
  const slider = document.getElementById("RoomSlider");
  const mainImage = document.getElementById("RoomMainImage");
  const nextImage = document.getElementById("RoomNextImage");
  const slideIndex = document.getElementById("RoomSlideIndex");
  const slideType = document.getElementById("RoomSlideType");
  const slideTitle = document.getElementById("RoomSlideTitle");
  const nextButton = document.getElementById("RoomNextButton");
  const dotsContainer = document.getElementById("RoomSliderDots");

  if (!slider || !mainImage || !nextImage || !slideIndex || !slideType || !slideTitle || !dotsContainer) return;

  const dots = Array.from(dotsContainer.querySelectorAll(".room-slider-dots__dot"));
  let currentIndex = 0;
  let isAnimating = false;

  function render(index) {
    const safeIndex = (index + roomSlides.length) % roomSlides.length;
    const nextIndex = (safeIndex + 1) % roomSlides.length;
    const currentSlide = roomSlides[safeIndex];
    const upcomingSlide = roomSlides[nextIndex];

    currentIndex = safeIndex;
    mainImage.src = currentSlide.image;
    mainImage.alt = currentSlide.alt;
    nextImage.src = upcomingSlide.image;
    nextImage.alt = upcomingSlide.alt;
    slideIndex.textContent = String(safeIndex + 1).padStart(2, "0");
    slideType.textContent = currentSlide.type;
    slideTitle.textContent = currentSlide.title;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("room-slider-dots__dot--active", dotIndex === safeIndex);
      dot.classList.remove("room-slider-dots__dot--pulse");
      if (dotIndex === safeIndex) {
        dot.classList.add("room-slider-dots__dot--pulse");
      }
      dot.setAttribute("aria-pressed", dotIndex === safeIndex ? "true" : "false");
    });
  }

  function animateTo(targetIndex) {
    if (isAnimating) return;
    if (((targetIndex % roomSlides.length) + roomSlides.length) % roomSlides.length === currentIndex) return;
    isAnimating = true;

    slider.classList.remove("is-entering");
    slider.classList.add("is-leaving");

    setTimeout(() => {
      render(targetIndex);
      slider.classList.remove("is-leaving");
      slider.classList.add("is-entering");

      setTimeout(() => {
        slider.classList.remove("is-entering");
        isAnimating = false;
      }, 380);
    }, 220);
  }

  function goNext() {
    animateTo(currentIndex + 1);
  }

  if (nextButton) nextButton.addEventListener("click", goNext);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = Number(dot.dataset.index);
      if (!Number.isNaN(target)) {
        animateTo(target);
      }
    });
  });

  render(0);
}

document.addEventListener("DOMContentLoaded", initRoomSlider);
