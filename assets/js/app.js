// ? Navbar Position
// Kullanıcı scroll down yaptığı zaman bu fonksiyon çalışacak
window.onscroll = function () {
  stickyHeader();
};

/*  Elements alıyoruz.*/
let isOpenSearch = false;
var header = document.getElementById("head");
var btnSearch = document.getElementById("btn-search");
var searchDropdown = document.getElementById("search-dropdown");
var searchInput = document.getElementById("search-input");
var searchClose = document.getElementById("btn-search-close");

/* Search Box Events Begin */
btnSearch.addEventListener("click", function () {
  isOpenSearch ? (isOpenSearch = false) : (isOpenSearch = true);
  if (isOpenSearch) {
    searchDropdown.style.display = "flex";
    searchInput.focus();
    header.classList.remove("header-sticky");
    header.classList.add("search-sticky");
  } else {
    searchDropdown.style.display = "none";
  }
});

searchClose.addEventListener("click", function () {
  searchDropdown.style.display = "none";
  isOpenSearch = false;
  header.classList.add("header-sticky");
  header.classList.remove("search-sticky");
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
  } else {
    if (window.pageYOffset > sticky) {
      header.classList.add("search-sticky");
    } else {
      header.classList.remove("search-sticky");
    }
  }
}
