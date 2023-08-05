window.addEventListener("load", () => {
  let h1 = document.querySelector(".banner h1"),
    h4 = document.querySelector(".banner h4"),
    p = document.querySelector(".banner p"),
    h5 = document.querySelector(".banner h5"),
    i = 0,
    span = document.querySelector(".banner h4 span");
  wisata = ["Taman Hiburan", "Pusat Berlanjaan", "Tempat Ibadah", "Bahari", "Budaya", "Cagar Alam"];

  h1.style.transition = "4s";
  h4.style.transition = "4s";
  p.style.transition = "4s";
  h5.style.transition = "4s";

  h1.style.opacity = 2;
  h4.style.opacity = 2;
  p.style.opacity = 2;
  h5.style.opacity = 2;

  let changeWisata = setInterval(() => {
    span.textContent = wisata[i];
    i++;
    if (i === 40) {
      clearInterval(changeWisata);
    }
  }, 1000);
});

window.addEventListener("scroll", () => {
  let navbar = document.querySelector("nav");
  navbar.style.transition = "0.6s";
  navbar.classList.add("addShadow");
  setTimeout(() => {
    navbar.classList.remove("addShadow");
  }, 3000);
});
