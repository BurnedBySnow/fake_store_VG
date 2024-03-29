const cartWindow = document.querySelector(".form-cart-window");
const prods = document.querySelector(".cart-list");

document.getElementById("cartButton").addEventListener("click", (e) => {
  cartWindow.style.visibility =
    cartWindow.style.visibility === "hidden" ? "visible" : "hidden";
});

const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ product: item, amount: 1 }])
    );
  } else {
    const ind = cart.findIndex((p) => p.product.id === item.id);

    if (ind === -1) {
      cart.push({ product: item, amount: 1 });
    } else {
      const updatedProd = { ...cart[ind], amount: (cart[ind].amount += 1) };

      const updatedCart = [
        ...cart.slice(0, ind),
        updatedProd,
        ...cart.slice(ind + 1),
      ];

      cart = updatedCart;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

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

  const lessAmount = document.createElement("button");
  lessAmount.classList.add("amount-button", "amount-button-less");
  lessAmount.textContent = "-";
  lessAmount.setAttribute("id", "AmountButtonLess");

  const moreAmount = document.createElement("button");
  moreAmount.classList.add("amount-button", "amount-button-more");
  moreAmount.textContent = "+";
  moreAmount.setAttribute("id", "AmountButtonMore");

  const amountLabel = document.createElement("label");
  amountLabel.classList.add("amount-label");
  amountLabel.innerHTML = item.amount;

  const articlePrice = document.createElement("div");
  articlePrice.innerHTML = "$" + item.product.price;
  articlePrice.classList.add("article-price");

  const articleRemove = document.createElement("div");
  articleRemove.classList.add("article-remove");

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-item-button");

  const removeSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const removePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );

  removeSVG.setAttribute("viewBox", "0 0 448 512");
  removePath.setAttribute(
    "d",
    "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
  );

  removeSVG.appendChild(removePath);
  removeButton.appendChild(removeSVG);
  articleRemove.appendChild(removeButton);
  articleAmount.appendChild(amountContainer);
  amountContainer.append(lessAmount, amountLabel, moreAmount);
  article.append(mainInfo, articleAmount, articlePrice, articleRemove);
  info.appendChild(article);

  container.append(pic, info);

  lessAmount.addEventListener("click", () => {
    if (amountLabel.innerHTML === "1") {
      prods.removeChild(container);
      removeItem(item);
    } else {
      amountLabel.innerHTML--;
      reduce(item);
    }
    updateSum();
    hideOrShowCheckout();
  });

  moreAmount.addEventListener("click", () => {
    amountLabel.innerHTML++;
    add(item);
    updateSum();
  });

  removeButton.addEventListener("click", () => {
    prods.removeChild(container);
    removeItem(item);
    updateSum();
    hideOrShowCheckout();
  });
};

const reduce = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  const ind = cart.findIndex((p) => p.product.id === item.product.id);

  const updatedProd = { ...cart[ind], amount: (cart[ind].amount -= 1) };

  const updatedCart = [
    ...cart.slice(0, ind),
    updatedProd,
    ...cart.slice(ind + 1),
  ];

  hideOrShowCheckout();
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

const add = (item) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const ind = cart.findIndex((p) => p.product.id === item.product.id);

  const updatedProd = { ...cart[ind], amount: (cart[ind].amount += 1) };

  const updatedCart = [
    ...cart.slice(0, ind),
    updatedProd,
    ...cart.slice(ind + 1),
  ];

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

const removeItem = (item) => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const updatedCart = cart.filter((p) => p.product.id !== item.product.id);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

const updateSum = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart.includes(null)) {
    return (document.getElementById("CartSum").innerHTML = "Cart is empty");
  }

  const sum = cart.reduce((accu, p) => {
    return accu + p.product.price * p.amount;
  }, 0);

  document.getElementById("CartSum").innerHTML = "$" + sum.toFixed(2);
};

document.getElementById("EmptyCart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  document.getElementById("CartList").innerHTML = "";
  updateSum();
  hideOrShowCheckout();
});

document
  .getElementById("purchase-button")
  .addEventListener("click", async function (event) {
    // Event listener for saving product ID to localStorage and redirecting
    const prod = JSON.parse(localStorage.getItem("selectedProduct"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    addToCart(prod);
    hideOrShowCheckout();

    if (!cart) {
      let newProd = { product: prod, amount: 1 };
      return addDOMToCart(newProd);
    }
    let item = cart.find((p) => p.product.id === prod.id);
    if (item) {
      let ind = cart.findIndex((p) => p.product.id === prod.id);
      let dom = Array.from(
        document.getElementsByClassName("cart-list")[0].children
      )[ind].children[1].children[0].children[1].children[0].children[1];

      dom.innerHTML++;
    } else {
      let newProd = { product: prod, amount: 1 };
      addDOMToCart(newProd);
    }
  });

document.getElementById("CheckoutButton").addEventListener("click", () => {
  window.location.href = "purchaseformBS.html";
});

const hideOrShowCheckout = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const dom = document.getElementById("BottomRowContainer");

  if (!cart || cart.length === 0) {
    dom.style.display = "none";
  } else {
    dom.style.display = "flex";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    cart.forEach((p) => addDOMToCart(p));
  }
  updateSum();
  hideOrShowCheckout();
});
