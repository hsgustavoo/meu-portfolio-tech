document.addEventListener("DOMContentLoaded", function () {
    // === Rolagem suave nos links do menu ===
    const links = document.querySelectorAll("nav a, .hero-buttons a, .footer-links a");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // === Animação de fade-in ao rolar ===
    const sections = document.querySelectorAll("section");
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            }
        });
    }
    window.addEventListener("scroll", checkScroll);
    checkScroll();

    // === Barra de progresso de rolagem ===
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById("progress-bar").style.width = scrollPercent + "%";
    }
    window.addEventListener("scroll", updateProgressBar);
    updateProgressBar();

    // === Efeito de header ao rolar ===
    function handleHeaderScroll() {
        const header = document.querySelector("header");
        if (window.scrollY > 100) {
            header.style.padding = "10px 0";
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.padding = "20px 0";
            header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
        }
    }
    window.addEventListener("scroll", handleHeaderScroll);

    // === Menu mobile ===
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector("nav");
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", function() {
            this.classList.toggle("active");
            nav.classList.toggle("active");
        });
    }

// === Efeito de digitação no hero (VERSÃO CORRIGIDA) ===
function typeWriterEffect() {
    const heroTitle = document.querySelector(".hero-content h1");
    if (!heroTitle) return;
    
    // Salvar o HTML original
    const originalHTML = heroTitle.innerHTML;
    
    // Extrair apenas o texto para animação (remover tags HTML temporariamente)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    heroTitle.innerHTML = "";
    
    let i = 0;
    const timer = setInterval(function() {
        if (i < textContent.length) {
            // Reconstruir o HTML progressivamente
            let currentText = textContent.substring(0, i + 1);
            
            // Reinserir a tag highlight no local correto
            const highlightStart = originalHTML.indexOf('<span class="highlight">');
            const highlightEnd = originalHTML.indexOf('</span>');
            
            if (highlightStart !== -1 && highlightEnd !== -1) {
                const textBeforeHighlight = textContent.substring(0, originalHTML.substring(0, highlightStart).length);
                const highlightText = textContent.substring(
                    originalHTML.substring(0, highlightStart).length,
                    originalHTML.substring(0, highlightEnd - '</span>'.length + 1).length
                );
                const textAfterHighlight = textContent.substring(originalHTML.substring(0, highlightEnd + '</span>'.length).length);
                
                if (i + 1 >= originalHTML.substring(0, highlightStart).length && 
                    i + 1 <= originalHTML.substring(0, highlightEnd - '</span>'.length + 1).length) {
                    
                    const currentHighlightProgress = i + 1 - originalHTML.substring(0, highlightStart).length;
                    const currentHighlightText = highlightText.substring(0, Math.max(0, currentHighlightProgress));
                    
                    heroTitle.innerHTML = textBeforeHighlight + 
                                        '<span class="highlight">' + currentHighlightText + '</span>';
                } else if (i + 1 > originalHTML.substring(0, highlightEnd + '</span>'.length).length) {
                    const afterHighlightProgress = i + 1 - originalHTML.substring(0, highlightEnd + '</span>'.length).length;
                    const currentAfterText = textAfterHighlight.substring(0, afterHighlightProgress);
                    
                    heroTitle.innerHTML = textBeforeHighlight + 
                                        '<span class="highlight">' + highlightText + '</span>' +
                                        currentAfterText;
                } else if (i + 1 < originalHTML.substring(0, highlightStart).length) {
                    heroTitle.innerHTML = currentText;
                }
            } else {
                // Caso não tenha tags especiais
                heroTitle.innerHTML = currentText;
            }
            i++;
        } else {
            clearInterval(timer);
            // Garantir que o HTML final esteja correto
            heroTitle.innerHTML = originalHTML;
        }
    }, 50);
}
    // Iniciar efeito de digitação quando a página carregar
    setTimeout(typeWriterEffect, 500);

    // === Animar elementos quando entram na viewport ===
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.projeto, .experiencia-item, .sobre-img img, .contato-texto');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Definir estado inicial para elementos animáveis
    const animatedElements = document.querySelectorAll('.projeto, .experiencia-item, .sobre-img img, .contato-texto');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar a página
});