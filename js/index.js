// Esperar a que se cargue el contenido del documento
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el contenedor de los banners
  const bannerContainer = document.getElementById("bannerContainer");

  // Array de objetos que representan las imágenes
  const banners = [
    { src: "./img/banners/banner1.webp", alt: "Banner 1" },
    { src: "./img/banners/banner2.webp", alt: "Banner 2" },
    { src: "./img/banners/banner3.webp", alt: "Banner 3" },
    { src: "./img/banners/banner4.webp", alt: "Banner 4" },
    { src: "./img/banners/banner5.webp", alt: "Banner 5" },
    { src: "./img/banners/banner6.webp", alt: "Banner 6" }
  ];

  // Generar el contenido HTML de los banners
  const bannersHTML = banners.map(banner => `<img src="${banner.src}" alt="${banner.alt}">`).join("");

  // Agregar el contenido HTML al contenedor
  bannerContainer.innerHTML = bannersHTML;

  // Convertir el array de banners a formato JSON
  const bannersJSON = JSON.stringify(banners);
});
