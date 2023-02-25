const button = document.getElementById("shop");
const header = document.getElementById("head");
button.addEventListener("click", function () {
  header.classList.add("stuck");
});
