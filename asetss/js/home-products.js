function formatRupiah(value) {
  return `Rp ${Math.round(value * 1000).toLocaleString("id-ID")}`;
}

function buildPromoMeta(index) {
  if (index % 4 === 1) return { type: "discount", value: "-30%" };
  if (index % 4 === 2) return { type: "discount", value: "-50%" };
  if (index % 4 === 3) return { type: "new", value: "New" };
  return null;
}

function createProductCard(product, index) {
  const promo = buildPromoMeta(index);
  const hasDiscount = promo?.type === "discount";
  const discountFactor = hasDiscount ? 0.5 : 1;
  const currentPrice = formatRupiah(product.price * discountFactor);
  const oldPrice = hasDiscount ? formatRupiah(product.price) : "";

  const card = document.createElement("article");
  card.className = "product-card";

  const shortDescription = product.short_description || product.category || "";

  card.innerHTML = `
    <div class="product-card__media">
      <img src="${product.main_image}" alt="${product.name}" loading="lazy">
      ${promo ? `<span class="product-card__badge product-card__badge--${promo.type}">${promo.value}</span>` : ""}
    </div>
    <div class="product-card__info">
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__desc">${shortDescription}</p>
      <div class="product-card__price-row">
        <span class="product-card__price">${currentPrice}</span>
        ${oldPrice ? `<span class="product-card__old-price">${oldPrice}</span>` : ""}
      </div>
    </div>
    <div class="product-card__overlay">
      <button type="button" class="button-m Light-button product-card__add-btn">Add to cart</button>
      <div class="product-card__meta">
        <button type="button" class="product-card__meta-item">Share</button>
        <button type="button" class="product-card__meta-item">Compare</button>
        <button type="button" class="product-card__meta-item">Like</button>
      </div>
    </div>
  `;

  return card;
}

async function loadHomeProducts() {
  const productsGrid = document.getElementById("ProductsGrid");
  if (!productsGrid) return;

  try {
    const response = await fetch("/database/Products.json");
    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    const topProducts = Array.isArray(data) ? data.slice(0, 8) : [];

    productsGrid.innerHTML = "";
    topProducts.forEach((product, index) => {
      productsGrid.appendChild(createProductCard(product, index));
    });
  } catch (error) {
    console.error("Error loading home products:", error);
    productsGrid.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadHomeProducts);
