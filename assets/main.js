(() => {
  // Año
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Última actualización
  const lastEl = document.getElementById("lastUpdate");
  if (lastEl) {
    const fmt = new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" });
    lastEl.textContent = fmt.format(new Date());
  }

  // Menú móvil
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Mensaje visual al enviar (sin bloquear POST)
  const form = document.querySelector("form.card.form");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", () => {
      status.textContent = "Enviando…";
      status.style.opacity = "0.95";
    });
  }
})();
