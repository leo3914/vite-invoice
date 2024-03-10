import {
  createFormHandler,
  manageInventorySheetHandler,
  newProductCreateFormHandler,
  printBtnHandler,
  rowGroupHandler,
} from "./handlers.js";
import {
  createForm,
  inventoryCloseBtn,
  manageInventorySheet,
  newProductCreateForm,
  printBtn,
  rowGroup,
} from "./selector.js";

export const listener = () => {
  createForm.addEventListener("submit", createFormHandler);
  rowGroup.addEventListener("click", rowGroupHandler);
  manageInventorySheet.addEventListener("click", manageInventorySheetHandler);
  inventoryCloseBtn.addEventListener("click", manageInventorySheetHandler);

  newProductCreateForm.addEventListener("submit", newProductCreateFormHandler);

  printBtn.addEventListener("click",printBtnHandler)
};
