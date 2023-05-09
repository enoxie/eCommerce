//* Product Page Begin */
const btnSizeModal = document.querySelector("#btn-size-modal");
const quantityInput = document.querySelector("#quantity");
const btnPlus = document.querySelector("#btn-plus");
const btnMinus = document.querySelector("#btn-minus");
const btnShippingModal = document.querySelector("#btn-shipping-modal");
const btnProductInfoModal = document.querySelector("#btn-product-info-modal");
const btnSizeModalClose = document.querySelector(".size-modal button.close ");
const magnifyingImg = document.querySelector(".zoom-product");
let minPcs = 1;
let maxPcs = 10;
let pcs = 1;
quantityInput.addEventListener("input", function (e) {
  if ($(this).val() > maxPcs) {
    $(this).val(maxPcs);
  }

  pcs = parseInt(e.target.value);
});
quantityInput.addEventListener("keydown", function (e) {
  var char = String.fromCharCode(e.which);
  if (!/[0-9\b]+/.test(char)) {
    e.preventDefault();
  }
});

btnMinus.addEventListener("click", function () {
  pcs > 1 ? (pcs -= 1) : "";
  quantityInput.value = pcs;
});
btnPlus.addEventListener("click", function () {
  pcs < 10 ? (pcs += 1) : "";
  quantityInput.value = pcs;
});

//* Product Informations General */

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal") ||
    event.target.matches(".modal .modal-dialog .close")
  ) {
    closeModal(event.target.getAttribute("data-dismiss"));
  }
});

var options = {
  fillContainer: true,
  zoomWith: 50,
  offset: { vertical: 0, horizontal: 10 },
  zoomPosition: "original",
};
new ImageZoom(document.querySelector(".sp-img"), options);

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (event.target.matches(".sp-images-carousel .carousel-button img")) {
    magnifyingImg.src = imageList[event.target.getAttribute("img-id") - 1].url;
    new ImageZoom(document.querySelector(".sp-img"), options);
  }
});

//* Product Informations General*/

//* Size Guide Modal Begin*/
btnSizeModal.addEventListener("click", function () {
  openModal(btnSizeModal.getAttribute("data-target"));
});

//* Size Guide Modal End*/

//* Shipping Modal Begin*/

btnShippingModal.addEventListener("click", function () {
  openModal(btnShippingModal.getAttribute("data-target"));
});

//* Shipping Modal End*/

//* Product Info Modal Begin*/

btnProductInfoModal.addEventListener("click", function () {
  openModal(btnProductInfoModal.getAttribute("data-target"));
});

//* Product Info Modal End*/

//* Review Begin */

document.addEventListener("click", function (event) {
  if (event.target.matches(".sp-collapse-title")) {
    let item = event.target.parentElement;
    let content = event.target.nextElementSibling;
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      content.style.height = "0px";
      content.style.marginBottom = "0px";
    } else {
      item.classList.add("active");
      content.style.height = content.scrollHeight + "px";
      content.style.marginBottom = "6px";
      content.style.transition = "all .2s";
    }
  }
});

//* Review End */

//* Product Page End */
