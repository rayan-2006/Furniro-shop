const roomSlides = [
  {
    image: "/assets/Image/Photo/scandinavian-interior-mockup-wall-decal-background 1.png",
    alt: "Living room inspiration",
    type: "Living Room",
    title: "Soft Harmony",
  },
  {
    image: "/assets/Image/Photo/word-image-17-1536x1125.png",
    alt: "Bedroom inspiration",
    type: "Bed Room",
    title: "Inner Peace",
  },
  {
    image: "/assets/Image/Photo/image.png",
    alt: "Modern interior inspiration",
    type: "Study Room",
    title: "Calm Work",
  },
  {
    image: "/assets/Image/Photo/word-image-15.png",
    alt: "Dining room inspiration",
    type: "Dining Room",
    title: "Cozy Moment",
  },
];

function initRoomSlider() {
  const slide = document.getElementById("slide");
  roomSlides.forEach((element, index) => {
    const cardBlog = document.createElement("div");
    const IMG = document.createElement("img");
    const cardTitel = document.createElement("div");
    const cardTitelP = document.createElement("p");
    const cardTitelH3 = document.createElement("h3");
    const cardTitelbtn = document.createElement("butten");

    cardBlog.classList.add("slide-blog")

    IMG.src = element.image;
    cardTitelP.innerHTML = `${index} ——— ${element.type}`;
    cardTitelH3.innerHTML = element.title;

    cardBlog.appendChild(IMG);
    slide.appendChild(cardBlog);
  });
}

document.addEventListener("DOMContentLoaded", initRoomSlider);
