document.addEventListener("DOMContentLoaded", () => {

    // --- State and Nodes ---
    const timelineContainer = document.getElementById("timelineContainer");
    const lightbox = document.getElementById("evidenceLightbox");
    const lightboxImg = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.querySelector(".lightbox__close");

    // --- Render Labs from data.js global variable ---
    function renderRoadmap() {
        if (typeof sqlInjectionLabs === 'undefined') {
            timelineContainer.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--accent);">Error cargando la ruta. data.js no encontrado.</div>`;
            return;
        }

        timelineContainer.innerHTML = ""; // Clear loader

        let currentLevel = "";
        let nodeSide = "left"; // Alternates between left and right

        sqlInjectionLabs.forEach((lab, index) => {

            // Render Level Headers if necessary
            if (lab.level !== currentLevel) {
                currentLevel = lab.level;
                const header = document.createElement("div");
                header.className = "timeline-level-header";
                header.innerHTML = `<span>${currentLevel.toUpperCase()} LEVEL</span>`;
                timelineContainer.appendChild(header);
            }

            // Timeline Item Container
            const tItem = document.createElement("div");
            tItem.className = `timeline-item ${nodeSide}`;
            nodeSide = nodeSide === "left" ? "right" : "left"; // Toggle next element side

            // Build Techniques Array
            const techHTML = lab.techniques.map(tech => `<span class="tech-tag">${tech}</span>`).join("");

            // Build Bullets Array
            const bulletsHTML = lab.summaryBullets.map(bullet => `<li>${bullet}</li>`).join("");

            // Build Evidence Section
            let evidenceHTML = ``;
            if (lab.evidencePaths && lab.evidencePaths.length > 0) {
                const imagesHTML = lab.evidencePaths.map((path, idx) => `
                    <img src="${path}" alt="Evidencia Lab ${lab.number} - ${idx + 1}" 
                         class="evidence-thumb lightbox-trigger"
                         loading="lazy" />
                `).join("");

                evidenceHTML = `
                    <div class="evidence-gallery">
                        <div class="evidence-grid">
                            ${imagesHTML}
                        </div>
                    </div>
                `;
            } else {
                // Evidence Pending state
                evidenceHTML = `
                    <div class="evidence-gallery">
                        <div class="evidence-status">
                            <span aria-hidden="true">⟡</span> Evidence pending upload...
                        </div>
                    </div>
                `;
            }

            // Prepare status badge
            let statusIcon = "";
            let statusClass = "";

            if (lab.status === "Not solved") {
                statusClass = "status-unsolved";
                statusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            } else {
                statusClass = "status-solved";
                statusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
            }

            // Card Inner HTML
            tItem.innerHTML = `
                <article class="timeline-card">
                    <div class="timeline-card__head">
                        <span class="timeline-card__number-badge">LAB ${String(lab.number).padStart(2, '0')}</span>
                        <span class="timeline-card__level ${lab.level.toLowerCase()}">${lab.level}</span>
                    </div>
                    <h3>${lab.title}</h3>
                    <p class="objective">${lab.objective}</p>
                    
                    <ul class="bullets">
                        ${bulletsHTML}
                    </ul>
                    
                    <div class="timeline-card__tech">
                        ${techHTML}
                    </div>

                    ${evidenceHTML}
                    
                    <div class="timeline-card__footer">
                        <div class="${statusClass}">
                            ${statusIcon}
                            ${lab.status}
                        </div>
                        <div class="mitigation-line">
                            <b>Mitigation:</b> <span class="muted">${lab.mitigation}</span>
                        </div>
                    </div>
                </article>
            `;

            timelineContainer.appendChild(tItem);
        });

        // Initialize interactive lightbox only after injecting images
        initLightbox();
    }

    // --- Lightbox Architecture ---
    function initLightbox() {
        const triggers = document.querySelectorAll(".lightbox-trigger");

        triggers.forEach(trigger => {
            trigger.addEventListener("click", (e) => {
                const src = e.target.getAttribute("src");
                const alt = e.target.getAttribute("alt");
                lightboxImg.src = src;
                lightboxCaption.textContent = alt;
                lightbox.classList.add("active");
                lightbox.setAttribute("aria-hidden", "false");
            });
        });

        // Close Handlers
        function closeLightbox() {
            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");
            setTimeout(() => {
                lightboxImg.src = "";
                lightboxCaption.textContent = "";
            }, 300); // Clear after animation
        }

        closeBtn.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target === lightbox.querySelector(".lightbox__content")) {
                closeLightbox();
            }
        });

        // Escape Key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("active")) {
                closeLightbox();
            }
        });
    }

    // Init Engine
    renderRoadmap();
});
