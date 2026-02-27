async function loadCategories() {
  const CategoryBoxs = document.getElementById('CategoryBoxs');
  CategoryBoxs.innerHTML = `
        <div class="Category-box">
          <div class="Category-box-img Shimmer-effect ">
            <img src="" alt="">
          </div>
          <div class="Category-box-text">
            <p class="Shimmer-effect"></p>
          </div>
        </div>
        <div class="Category-box">
          <div class="Category-box-img Shimmer-effect">
            <img src="" alt="">
          </div>
          <div class="Category-box-text">
            <p class="Shimmer-effect"></p>
          </div>
        </div>
        <div class="Category-box">
          <div class="Category-box-img Shimmer-effect">
            <img src="" alt="">
          </div>
          <div class="Category-box-text">
            <p class="Shimmer-effect"></p>
          </div>
        </div>
        `;
  try {
    const data = await fetch('database/categories.json');
    const res = await data.json();
    const topSellerItems = res
      .filter((item) => item.isTopSeller === true)
      .slice(0, 3);
    const itemsToRender = topSellerItems.length === 3 ? topSellerItems : res.slice(0, 3);

    CategoryBoxs.innerHTML = '';
    itemsToRender.forEach((item) => {
      const CategoryBox = document.createElement('div');
      CategoryBox.classList.add('Category-box');
      CategoryBox.innerHTML = `
  <div class="Category-box-img">
    <div class="shimmer-bg placeholder-img"></div>  <!-- شیمر اولیه -->
    <img
      src="${item.heroImage}"
      alt="${item.name}"
      loading="lazy"
    >
  </div>
  <div class="Category-box-text">
    <p>${item.name}</p>
  </div>
        `;
      CategoryBoxs.appendChild(CategoryBox);
    });
  } catch (error) {
    console.error('Error fetching category data:', error);
    CategoryBoxs.innerHTML = `
    <p class="error-message text-danger mb-2">
  بارگذاری دسته‌بندی‌ها ناموفق بود.
</p>
<button
  type="button"
  class="btn btn-warning"
  onclick="loadCategories()"
>
  دوباره امتحان کن
</button>`
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
});
