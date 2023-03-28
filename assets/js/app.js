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
let isOpenLoginModal = false;
let isOpenCart = false;
const header = document.getElementById("header");
const topbar = document.getElementById("topbar");
const searchDropdown = document.getElementById("search-dropdown");
const cartDropdown = document.getElementById("cart-dropdown");
const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");
const searchClose = document.getElementById("btn-search-close");
const modalDiscount = document.getElementById("modal-discount");
const checkbox = document.getElementById("modal-checkbox");
const btnAccount = document.querySelector(".account button");
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
!isDiscountInformed ? openDiscountModal() : "";

function closeDiscountModal() {
  modalDiscount.style.display = "none";
}
function openDiscountModal() {
  modalDiscount.style.display = "flex";
}
document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal-discount") ||
    event.target.matches(".modal-close")
  ) {
    closeDiscountModal();
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
    searchDropdown.style.display = "flex";
    searchInput.focus();
  }
});

searchClose.addEventListener("click", function () {
  searchDropdown.style.display = "none";
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
  if (!isOpenLoginModal) {
    isOpenLoginModal = true;
    loginModal.style.display = "block";
  } else {
    isOpenLoginModal = false;
    loginModal.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal-popup") ||
    event.target.matches(".modal-popup .modal-item .item-close")
  ) {
    loginModal.style.display = "none";
    isOpenLoginModal = false;
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
    if (!isOpenCart) {
      isOpenCart = true;
      openCartDropdown();
      cartDropdown.style.height = cartList.length * 70 + 190 + "px";

      document.getElementById("cart-icon").style.color = "#c71932";
    } else {
      isOpenCart = false;
      closeCartDropdown();
      cartDropdown.style.height = "0px";
      document.getElementById("cart-icon").style.color = "#303030";
    }
  }
});

function openCartDropdown() {
  cartDropdown.style.display = "flex";
}
function closeCartDropdown() {
  cartDropdown.style.display = "hidden";
}
/* Cart Modal Events End*/

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
