import { recordTotal, rowGroup, rowTemplate } from "./selector.js";

export const createRecord = ({ id, name, price }, quantity) => {
  const record = rowTemplate.content.cloneNode(true);

  const rowCost = price * quantity;
  //   record.querySelector(".row-no").innerText = 1;
  record.querySelector(".row-product-name").innerText = name;
  record.querySelector(".row-product-price").innerText = price;
  record.querySelector(".row-quantity").innerText = quantity;
  record.querySelector(".row-cost").innerText = rowCost;
  record.querySelector(".row").setAttribute("row-product-id", id);

  return record;
};

export const updateRecordTotal = () => {
  const allRowCost = document.querySelectorAll(".row-cost");
  // let total = 0;
  // allRowCost.forEach((el) => {
  //   total += parseFloat(el.innerText);
  // });
  // recordTotal.innerText = total;

  recordTotal.innerText = [...allRowCost].reduce(
    (pv, { innerText }) => pv + parseFloat(innerText),
    0
  );
  // recordTotal.innerText = 123;
};

export const deleteRecord = (event) => {
  // console.log("delete");
  const row = event.target.closest(".row");
  // console.log(row);

  if (confirm("Are u sure delete ?")) {
    row.remove();
    // updateRecordTotal();
  }
};

export const addRecordQuantity = (event) => {
  // console.log("add");
  // console.log(row);
  const row = event.target.closest(".row");
  const currentQuantity = row.querySelector(".row-quantity");
  const currentCost = row.querySelector(".row-cost");
  const currentPrice = row.querySelector(".row-product-price");

  currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
  currentCost.innerText = currentPrice.innerText * currentQuantity.innerText;

  // updateRecordTotal();
};

export const subRecordQuantity = (event) => {
  const row = event.target.closest(".row");
  const currentQuantity = row.querySelector(".row-quantity");
  const currentCost = row.querySelector(".row-cost");
  const currentPrice = row.querySelector(".row-product-price");

  if (currentQuantity.innerText > 1) {
    currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
    currentCost.innerText = currentPrice.innerText * currentQuantity.innerText;

    // updateRecordTotal();
  } else {
    deleteRecord(event);
  }
};

export const updateRecord = (productId, q) => {
  const row = document.querySelector(`[row-product-id='${productId}']`);
  const currentPrice = row.querySelector(".row-product-price");
  const currentQuantityElement = row.querySelector(".row-quantity");
  const currentCost = row.querySelector(".row-cost");

  if (q > 0 || currentQuantityElement.innerText > 1) {
    currentQuantityElement.innerText =
      parseInt(currentQuantityElement.innerText) + q;

    currentCost.innerText =
      currentPrice.innerText * currentQuantityElement.innerText;
    // updateRecordTotal();
  }
};

export const recordObserver = () => {
  const run = () => {
    // console.log("change");
    updateRecordTotal();
  };

  const observerOption = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(run);
  observer.observe(rowGroup, observerOption);
};
