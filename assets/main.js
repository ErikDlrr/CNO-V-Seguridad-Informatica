(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastEl = document.getElementById("lastUpdate");
  if (lastEl) {
    const fmt = new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" });
    lastEl.textContent = fmt.format(new Date());
  }

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

  const form = document.querySelector("form.card.form");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", () => {
      status.textContent = "Enviando…";

      const name = form.querySelector('[name="nombre"]').value;
      const msg = form.querySelector('[name="mensaje"]').value;
      const autoResponseInput = form.querySelector('[name="_autoresponse"]');

      if (autoResponseInput) {
        autoResponseInput.value = `Hola ${name},\n\nHe recibido tu mensaje correctamente:\n\n"${msg}"\n\nGracias por escribirme. Te responderé en breve.\n\n— Erik (Maizimo)`;
      }
    });
  }
})();
