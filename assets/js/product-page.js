document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    document.getElementById('title').innerText = "آیدی محصول پیدا نشد!";
    return;
  }

  try {
    const response = await fetch('../../database/Products.json');
    const data = await response.json();

    // نکته مهم: اگر فایل JSON تو با [ شروع میشه، خط زیر رو به این تغییر بده:
    // const products = data; 
    // اما اگر با { "products": [...] } شروع میشه، همین بمونه:
    const products = Array.isArray(data) ? data : data.products;

    // پیدا کردن محصول (دقت کن: اینجا از product_id استفاده کردیم)
    const product = products.find(p => p.product_id == productId);

    if (product) {
      // پر کردن اطلاعات با اسم‌های درست در دیتابیس
      document.getElementById('title').innerText = product.name;
      document.getElementById('price').innerText = `قیمت: $${product.price}`;
      document.getElementById('desc').innerText = product.short_description;

      // نمایش عکس (استفاده از کلید main_image)
      const imgElement = document.getElementById('image');
      imgElement.src = product.main_image;
      imgElement.alt = product.name;

      console.log("ایول! محصول لود شد:", product);
    } else {
      document.getElementById('title').innerText = "محصول مورد نظر یافت نشد! 🕵️‍♂️";
    }

  } catch (error) {
    console.error("خطا در لود دیتا:", error);
    document.getElementById('title').innerText = "خطا در برقراری ارتباط با دیتابیس!";
  }
});
