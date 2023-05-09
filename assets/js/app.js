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

/*  Document elements */
const header = document.getElementById("header");
const searchDropdown = document.getElementById("search-dropdown");
const cartDropdown = document.getElementById("cart-dropdown");
const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");
const searchClose = document.getElementById("btn-search-close");
const modalDiscount = document.getElementById("modal-discount");
const btnAccount = document.querySelector(".account button");
const discountCheckbox = document.querySelector(
  "#modal-discount #modal-checkbox"
);
let isOpenSearch = false;
let isOpenCart = false;
let isDiscountInformed = getCookie("modal");
let sticky = header.offsetTop; // headerın pozisyonu
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

let imageList = [
  {
    id: 1,
    url: "../assets/images/product/product-01.jpg",
  },
  {
    id: 2,
    url: "../assets/images/product/product-02.jpg",
  },
  {
    id: 3,
    url: "../assets/images/product/product-03.jpg",
  },
];

//* Modal Functions BEGİN
function openModal(target) {
  if (isOpenCart) {
    closeCartDropdown();
  }
  let item = document.querySelector("#" + target);
  item.style.display = "flex";
}

function closeModal(target) {
  let item = document.querySelector("#" + target);
  item.style.display = "none";
}
//* Modal Functions END

//*Header Begin
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
//*Header End

//* Discount Modal Events Begin */

// Eğer kullanıcı bilgilendirilmediyse modal göster
!isDiscountInformed ? (modalDiscount.style.display = "flex") : "";
document.addEventListener("click", function (event) {
  // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  if (
    event.target.matches(".modal") ||
    event.target.matches(".modal .modal-dialog .close")
  ) {
    closeModal(event.target.getAttribute("data-dismiss"));
  }
});
discountCheckbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    setCookie("modal", true, 60);
  } else {
    setCookie("modal", false, 60);
  }
});
//* Discount Modal Events End*/

//* Search Box Events Begin */
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
  isOpenSearch = false;
  if (window.pageYOffset > sticky) {
    header.classList.add("header-sticky");
  } else {
    header.classList.remove("header-sticky");
  }
});
//* Search Box Events End*/

//* Login Form Events Begin */
btnAccount.addEventListener("click", function () {
  if (isOpenCart) {
    isOpenCart = false;
    cartDropdown.style.display = "hidden";
    cartDropdown.style.height = "0px";
    document.getElementById("cart-icon").style.color = "#303030";
  }
  openModal(btnAccount.getAttribute("data-target"));
});

//* Login Form Events End */

//* Cart Modal Events Begin */

document.addEventListener("click", function (event) {
  // Eğer belirlenen kontrollere tıklanırsa cartDropdown toggle çalışacak.
  if (
    event.target.matches(".icon-f-39") ||
    event.target.matches(".badge-cart") ||
    event.target.matches(".cart span")
  ) {
    isOpenCart ? closeCartDropdown() : openCartDropdown();
  }
});
function openCartDropdown() {
  isOpenCart = true;
  cartDropdown.style.display = "flex";
  cartDropdown.style.height = cartDropdown.scrollHeight + "px";
  document.getElementById("cart-icon").style.color = "#c71932";
}
function closeCartDropdown() {
  isOpenCart = false;
  cartDropdown.style.display = "hidden";
  cartDropdown.style.height = "0px";
  document.getElementById("cart-icon").style.color = "#303030";
}
//* Cart Modal Events End*/
