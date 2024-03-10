import { productGroup, productTemplate } from "./selector.js";

export const createProduct = ({ id, name, price }) => {
  // const option = document.createElement("option");
  // option.innerText = product.name;
  // option.value = product.id;

  const card = productTemplate.content.cloneNode(true);
  card.querySelector(".product-name").innerText = name;
  card.querySelector(".product-price").innerText = price;

  // return option;
  return card;
};

export const productRender = (products) => {
  productSelect.innerHTML = "";
  productGroup.innerHTML = "";
  products.forEach(({ name, price, id }) => {
    productSelect.append(new Option(name, id));
    productGroup.append(createProduct({ name, price }));
  });
};
