import { createProduct, productRender } from "./products.js";
import {
  addRecordQuantity,
  createRecord,
  deleteRecord,
  subRecordQuantity,
  updateRecord,
  updateRecordTotal,
} from "./record.js";
import {
  createForm,
  inventorySheet,
  newProductCreateForm,
  productGroup,
  rowGroup,
} from "./selector.js";
import { products } from "./variables.js";

export const createFormHandler = (e) => {
  e.preventDefault();
  //   console.log("u submit");
  const formData = new FormData(createForm);
  const currentProductId = parseInt(formData.get("productSelect"));
  const currentQuantity = parseInt(formData.get("inputQuantity"));

  const currentProduct = products.find((el) => el.id === currentProductId);

  // is exited row
  const isExitedRow = rowGroup.querySelector(
    `[row-product-id='${currentProductId}']`
  );

  // console.log(isExitedRow);

  if (isExitedRow) {
    // const currentPrice = isExitedRow.querySelector(".row-product-price");
    // const currentQuantityElement = isExitedRow.querySelector(".row-quantity");
    // const currentCost = isExitedRow.querySelector(".row-cost");

    // currentQuantityElement.innerText =
    //   parseInt(currentQuantityElement.innerText) + currentQuantity;

    // currentCost.innerText =
    //   currentPrice.innerText * currentQuantityElement.innerText;
    // updateRecordTotal();
    updateRecord(isExitedRow.getAttribute("row-product-id"), currentQuantity);
  } else {
    rowGroup.append(createRecord(currentProduct, currentQuantity));
  }

  createForm.reset();

  updateRecordTotal();
};

export const rowGroupHandler = (event) => {
  // console.log("u click");
  if (event.target.classList.contains("row-del-btn")) {
    // console.log("delete");
    deleteRecord(event);
  } else if (event.target.classList.contains("row-q-add")) {
    // console.log("add btn");
    addRecordQuantity(event);
  } else if (event.target.classList.contains("row-q-sub")) {
    subRecordQuantity(event);
  }
};

export const manageInventorySheetHandler = () => {
  inventorySheet.classList.toggle("-translate-x-full");
};

export const newProductCreateFormHandler = (e) => {
  e.preventDefault();
  const formData = new FormData(newProductCreateForm);
  const newProduct = {
    id: Date.now(),
    name: formData.get("new_product_name"),
    price: formData.get("new_product_price"),
  };
  // productGroup.append(createProduct(newProduct));
  products.push(newProduct);
  productRender(products);

  newProductCreateForm.reset();
};

export const printBtnHandler = () => {
  window.print();
};
