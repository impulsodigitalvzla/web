var CONTACT = {
  name: "César Augusto Pérez González",
  brand: "Impulso Digital",
  whatsappNumber: "584140544880",
  whatsappDisplay: "+58 414 054 4880",
  email: "cesarperez084@gmail.com"
};

var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
  link.href = "https://wa.me/" + CONTACT.whatsappNumber;
});

document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
  link.href = "mailto:" + CONTACT.email;
});

var header = document.getElementById("site-header");
if (header) {
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

var themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  if (localStorage.getItem("impulso-theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  themeToggle.addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("impulso-theme", "");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("impulso-theme", "dark");
    }
  });
}

var navToggle = document.querySelector(".nav-toggle");
var navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  var closeMenu = function () {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", function () {
    var isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) closeMenu();
  });
}

var revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length) {
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("in-view"); });
  }
}

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

var copyBtn = document.getElementById("copy-email");
if (copyBtn) {
  copyBtn.addEventListener("click", function () {
    var email = copyBtn.getAttribute("data-email") || CONTACT.email;
    var label = copyBtn.querySelector("span");
    var done = function () {
      if (!label) return;
      var original = label.textContent;
      label.textContent = "¡Copiado!";
      setTimeout(function () { label.textContent = original; }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(function () {});
      return;
    }

    var temp = document.createElement("input");
    temp.value = email;
    temp.setAttribute("readonly", "");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    try { document.execCommand("copy"); done(); } catch (err) {}
    document.body.removeChild(temp);
  });
}
