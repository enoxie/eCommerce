//! Utils

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

//! Utils End

// ? Navbar Position
// Kullanıcı scroll down yaptığı zaman bu fonksiyon çalışacak
window.onscroll = function () {
  stickyHeader();
};
if (getCookie("modal") == null) {
  setCookie("modal", false, 60);
}
let isDiscountInformed = getCookie("modal");
/*  Elements alıyoruz.*/
let isOpenSearch = false;
let isOpenCart = false;
let minPcs = 1;
let maxPcs = 10;
let pcs = 1;
const header = document.getElementById("header");
const topbar = document.getElementById("topbar");
const searchDropdown = document.getElementById("search-dropdown");
const cartDropdown = document.getElementById("cart-dropdown");
const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");
const searchClose = document.getElementById("btn-search-close");
const modalDiscount = document.getElementById("modal-discount");
const checkbox = document.getElementById("modal-checkbox");
const sizeModal = document.querySelector(".size-modal");
const btnAccount = document.querySelector(".account button");
const btnSizeModal = document.querySelector("#btn-size-modal");
const quantityInput = document.querySelector("#quantity");
const btnPlus = document.querySelector("#btn-plus");
const btnMinus = document.querySelector("#btn-minus");
const btnShippingModal = document.querySelector("#btn-shipping-modal");
const btnProductInfoModal = document.querySelector("#btn-product-info-modal");

const btnSizeModalClose = document.querySelector(".size-modal button.close ");
const loginModal = document.querySelector(".modal-popup");
let cartList = [
  {
    id: 1,
    name: "Tshirt",
    price: 300,
  },
  {
    id: 2,
    name: "Tshirt",
    price: 300,
  },
];
/* Modal Events Begin */

// Eğer kullanıcı bilgilendirilmediyse modal göster
!isDiscountInformed ? (modalDiscount.style.display = "flex") : "";

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (event.target.matches(".modal") || event.target.matches(".modal-close")) {
    modalDiscount.style.display = "none";
  }
});

checkbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    setCookie("modal", true, 60);
  } else {
    setCookie("modal", false, 60);
  }
});
/* Modal Events End*/

/* Search Box Events Begin */
btnSearch.addEventListener("click", function () {
  isOpenSearch ? (isOpenSearch = false) : (isOpenSearch = true);

  if (isOpenSearch) {
    openModal(btnSearch.getAttribute("data-target"));
    searchInput.focus();
  }
});

searchClose.addEventListener("click", function () {
  closeModal(searchClose.getAttribute("data-dismiss"));
  header.style.visibility = "visible";
  topbar.style.visibility = "visible";
  isOpenSearch = false;
  if (window.pageYOffset > sticky) {
    header.classList.add("header-sticky");
  } else {
    header.classList.remove("header-sticky");
  }
});
/* Search Box Events End*/

/* Login Form Events Begin */
btnAccount.addEventListener("click", function () {
  if (isOpenCart) {
    isOpenCart = false;
    cartDropdown.style.display = "hidden";
    cartDropdown.style.height = "0px";
    document.getElementById("cart-icon").style.color = "#303030";
  }
  openModal(btnAccount.getAttribute("data-target"));
});

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal") ||
    event.target.matches(".modal .modal-item .item-close")
  ) {
    closeModal(event.target.getAttribute("data-dismiss"));
  }
});

/* Login Form Events End */

/* Cart Modal Events Begin */

document.addEventListener("click", function (event) {
  // Eğer belirlenen kontrollere tıklanırsa cartDropdown toggle çalışacak.
  if (
    event.target.matches(".icon-f-39") ||
    event.target.matches(".badge-cart") ||
    event.target.matches(".cart span")
  ) {
    isOpenCart ? closeDropdown() : openDropdown();
  }
});

function openDropdown() {
  isOpenCart = true;
  cartDropdown.style.display = "flex";
  cartDropdown.style.height = cartList.length * 70 + 190 + "px";
  document.getElementById("cart-icon").style.color = "#c71932";
}
function closeDropdown() {
  isOpenCart = false;
  cartDropdown.style.display = "hidden";
  cartDropdown.style.height = "0px";
  document.getElementById("cart-icon").style.color = "#303030";
}
/* Cart Modal Events End*/

/* Product Page Begin */

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
/* Product Page End */

/* Size Guide Modal Begin*/
btnSizeModal.addEventListener("click", function () {
  openModal(btnSizeModal.getAttribute("data-target"));
});

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal") ||
    event.target.matches(".modal .modal-dialog .close")
  ) {
    closeModal(event.target.getAttribute("data-dismiss"));
  }
});

/* Size Guide Modal End*/

/* Shipping Modal Begin*/

btnShippingModal.addEventListener("click", function () {
  openModal(btnShippingModal.getAttribute("data-target"));
});

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal") ||
    event.target.matches(".modal .modal-dialog .close")
  ) {
    closeModal(event.target.getAttribute("data-dismiss"));
  }
});

/* Shipping Modal End*/

/* Product Info Modal Begin*/

btnProductInfoModal.addEventListener("click", function () {
  openModal(btnProductInfoModal.getAttribute("data-target"));
});

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal") ||
    event.target.matches(".modal .modal-dialog .close")
  ) {
    closeModal(event.target.getAttribute("data-dismiss"));
  }
});

/* Product Info Modal End*/

// headerın pozisyonu
var sticky = header.offsetTop;

// Eğer header pozisyonu geçiliyorsa class ekleniyor, geçmiyorsa class kaldırılıyor
function stickyHeader() {
  if (!isOpenSearch) {
    if (window.pageYOffset > sticky) {
      header.classList.add("header-sticky");
    } else {
      header.classList.remove("header-sticky");
    }
  }
}

function openModal(target) {
  if (isOpenCart) {
    closeDropdown();
  }
  let item = document.querySelector("#" + target);
  item.style.display = "flex";
}

function closeModal(target) {
  let item = document.querySelector("#" + target);
  item.style.display = "none";
}
