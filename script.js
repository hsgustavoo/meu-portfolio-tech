// hsgustavoo | Portfólio
// JS enxuto: menu mobile, destaque do link ativo, header e barra de progresso.
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("menu-principal");
    const barra = document.getElementById("progress-bar");

    // --- Menu mobile ---
    function fecharMenu() {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        nav.classList.remove("is-open");
    }
    toggle.addEventListener("click", () => {
        const abrir = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(abrir));
        toggle.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
        nav.classList.toggle("is-open", abrir);
    });
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) fecharMenu(); });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) { fecharMenu(); toggle.focus(); }
    });

    // --- Header com borda/sombra e barra de progresso ---
    let agendado = false;
    function atualizar() {
        agendado = false;
        const y = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        header.classList.toggle("is-scrolled", y > 8);
        barra.style.transform = "scaleX(" + (total > 0 ? Math.min(y / total, 1) : 0) + ")";
    }
    window.addEventListener("scroll", () => {
        if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
    }, { passive: true });
    window.addEventListener("resize", atualizar);
    atualizar();

    // --- Link ativo conforme a seção visível ---
    const links = [...document.querySelectorAll('.nav a[href^="#"]:not(.btn)')];
    const secoes = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window && secoes.length) {
        const obs = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                links.forEach((a) => {
                    const ativo = a.getAttribute("href") === "#" + entrada.target.id;
                    a.classList.toggle("is-active", ativo);
                    if (ativo) a.setAttribute("aria-current", "location");
                    else a.removeAttribute("aria-current");
                });
            });
        }, { rootMargin: "-40% 0px -55% 0px" });
        secoes.forEach((s) => obs.observe(s));
    }
});
