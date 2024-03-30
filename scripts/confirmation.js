const prods = document.querySelector(".cart-list");

const addDOMToCart = (item) => {
  const container = document.createElement("li");
  container.classList.add("cart-item");
  prods.appendChild(container);

  const pic = document.createElement("picture");
  pic.classList.add("item-pic");
  const image = document.createElement("img");
  pic.appendChild(image);
  image.classList.add("item-img");
  image.src = item.product.image;
  image.alt = "No Image";

  const info = document.createElement("div");
  info.classList.add("item-info");

  const article = document.createElement("article");
  article.classList.add("cart-article");

  const mainInfo = document.createElement("div");
  mainInfo.classList.add("article-main", "align-item");
  const articleTitle = document.createElement("p");
  articleTitle.innerHTML = item.product.title;
  mainInfo.appendChild(articleTitle);

  const articleAmount = document.createElement("div");
  articleAmount.classList.add("article-amount");

  const amountContainer = document.createElement("div");
  amountContainer.classList.add("amount-container");

  const amountLabel = document.createElement("label");
  amountLabel.classList.add("amount-label");
  amountLabel.innerHTML = item.amount;

  const articlePrice = document.createElement("div");
  articlePrice.innerHTML = "$" + item.product.price;
  articlePrice.classList.add("article-price");

  articleAmount.appendChild(amountContainer);
  amountContainer.append(amountLabel);
  article.append(mainInfo, articleAmount, articlePrice);
  info.appendChild(article);

  container.append(pic, info);
};

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
  const products = JSON.parse(localStorage.getItem("cart"));
  console.log(products);

  products.forEach((p) => {
    console.log(p);
    addDOMToCart(p);
    document.getElementById("CartSum").innerHTML =
      Number(document.getElementById("CartSum").innerHTML) +
      p.amount * p.product.price;
  });
  document.getElementById("CartSum").innerHTML =
    "$" + Number(document.getElementById("CartSum").innerHTML).toFixed(2);

  localStorage.clear();
});
