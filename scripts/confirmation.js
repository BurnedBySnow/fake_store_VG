document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("firstNameCon").textContent =
    localStorage.getItem("first-name");
  document.getElementById("lastNameCon").textContent =
    localStorage.getItem("last-name");
  document.getElementById("emailCon").textContent =
    localStorage.getItem("email");
  document.getElementById("phoneCon").textContent =
    localStorage.getItem("phone");
  document.getElementById("addressCon").textContent =
    localStorage.getItem("address");
  document.getElementById("zipCon").textContent = localStorage.getItem("zip");
  document.getElementById("cityCon").textContent = localStorage.getItem("city");

  // Fetching product ID from localStorage
  const productId = localStorage.getItem("selectedProductId");
  if (productId) {
    fetchProductDetails(productId);
  }

  localStorage.clear();
});

//Displays product information
function fetchProductDetails(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((product) => {
      document.querySelector(".card-img-top").src = product.image;
      document.querySelector(".card-title").textContent = product.title;
      document.querySelector(".card-text").textContent = product.description;
      document.querySelector("#product-price-pf").textContent =
        "$" + product.price;
    })
    .catch((error) => console.error("Error fetching product:", error));
}
