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
var header = document.getElementById("header");
var topbar = document.getElementById("topbar");
var searchDropdown = document.getElementById("search-dropdown");
var cartDropdown = document.getElementById("cart-dropdown");
var btnSearch = document.getElementById("btn-search");
var searchInput = document.getElementById("search-input");
var searchClose = document.getElementById("btn-search-close");
var modalDiscount = document.getElementById("modal-discount");
var checkbox = document.getElementById("modal-checkbox");

/* Modal Events Begin */

checkbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    setCookie("modal", true, 60);
  } else {
    setCookie("modal", false, 60);
  }
});

if (!isDiscountInformed) {
  openModal();
}

document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal-discount") ||
    event.target.matches(".modal-close")
  ) {
    closeModal();
  }
});
function closeModal() {
  modalDiscount.style.display = "none";
}
function openModal() {
  modalDiscount.style.display = "flex";
}

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

/* Cart Modal Events Begin */

document.addEventListener("click", function (event) {
  // Eğer belirlenen kontrollere tıklanırsa cartDropdown toggle çalışacak.
  if (
    event.target.matches(".icon-f-39") ||
    event.target.matches(".badge-cart") ||
    event.target.matches(".cart span")
  ) {
    if (isOpenCart) {
      isOpenCart = false;
      openCartDropdown();
      document.getElementById("cart-icon").style.color = "#c71932";
    } else {
      isOpenCart = true;
      closeCartDropdown();
      document.getElementById("cart-icon").style.color = "#303030";
    }
  }
});

function openCartDropdown() {
  cartDropdown.style.display = "flex";
}
function closeCartDropdown() {
  cartDropdown.style.display = "none";
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
