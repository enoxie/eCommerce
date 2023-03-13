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
  setCookie("modal", false);
}
let isDiscountInformed = getCookie("modal");
/*  Elements alıyoruz.*/
let isOpenSearch = false;
var header = document.getElementById("header");
var topbar = document.getElementById("topbar");
var searchDropdown = document.getElementById("search-dropdown");
var btnSearch = document.getElementById("btn-search");
var searchInput = document.getElementById("search-input");
var searchClose = document.getElementById("btn-search-close");
var modalDiscount = document.getElementById("modal-discount");
var checkbox = document.getElementById("modal-checkbox");

/* Modal Events Begin */

checkbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    setCookie("modal", true);
  } else {
    setCookie("modal", false);
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
    header.style.visibility = "hidden";
    topbar.style.visibility = "hidden";
    header.classList.remove("header-sticky");
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
