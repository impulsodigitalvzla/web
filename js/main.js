var CONTACT = {
  name: "César Augusto Pérez González",
  brand: "Impulso Digital",
  whatsappNumber: "584140544880",
  whatsappDisplay: "+58 414 054 4880",
  email: "cesarperez084@gmail.com",
  clickToEdit: false
};

document.getElementById("year").textContent = new Date().getFullYear();

var navToggle = document.querySelector(".nav-toggle");
var navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
  link.href = "https://wa.me/" + CONTACT.whatsappNumber;
});

var mailLinks = document.querySelectorAll('a[href^="mailto:"]');
mailLinks.forEach(function (link) {
  link.href = "mailto:" + CONTACT.email;
});

var form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;

    var subject = encodeURIComponent("Proyecto - " + nombre);
    var body = encodeURIComponent(
      "Nombre: " + nombre + "\nEmail: " + email + "\n\n" + mensaje
    );

    window.location.href = "mailto:" + CONTACT.email + "?subject=" + subject + "&body=" + body;
  });
}

if (CONTACT.clickToEdit && window.confirm) {
  var editBtn = document.createElement("button");
  editBtn.id = "edit-datos";
  editBtn.textContent = "Editar mis datos";
  editBtn.style.cssText =
    "position:fixed;bottom:16px;left:16px;z-index:999;font-family:inherit;" +
    "font-size:0.8rem;font-weight:600;color:#fff;background:#171a23;border:0;" +
    "border-radius:999px;padding:0.55rem 1rem;cursor:pointer;opacity:0.85;";
  editBtn.title = "Actualiza tu nombre, WhatsApp y email";

  editBtn.addEventListener("click", function () {
    var name = prompt("Tu nombre completo:", CONTACT.name);
    if (name && name.trim()) CONTACT.name = name.trim();
    var phone = prompt("Número de WhatsApp con código de país (ej: 573001234567):", CONTACT.whatsappNumber);
    if (phone && phone.trim()) {
      CONTACT.whatsappNumber = phone.trim().replace(/[^0-9]/g, "");
      CONTACT.whatsappDisplay = "+" + CONTACT.whatsappNumber;
    }
    var email = prompt("Tu email de contacto:", CONTACT.email);
    if (email && email.trim()) CONTACT.email = email.trim().toLowerCase();

    document.querySelectorAll(".logo").forEach(function (el) {
      el.innerHTML = CONTACT.name.replace(" ", "<br>");
    });
    document.querySelector(".hero-sub strong").textContent = CONTACT.name;

    document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
      link.href = "https://wa.me/" + CONTACT.whatsappNumber;
    });
    document.querySelectorAll(".contact-cta.wa p").forEach(function (p) {
      p.textContent = CONTACT.whatsappDisplay;
    });

    mailLinks.forEach(function (link) {
      link.href = "mailto:" + CONTACT.email;
    });
    document.querySelectorAll(".contact-cta:not(.wa) p").forEach(function (p) {
      p.textContent = CONTACT.email;
    });

    alert("Listo. Tus datos se actualizaron.");
  });

  document.body.appendChild(editBtn);
}