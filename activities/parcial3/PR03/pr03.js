/* pr03.js - Interactividad para el Dashboard del SGSI (PR03) */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. NAVEGACIÓN POR PESTAÑAS (TABS)
    // ==========================================
    const menuButtons = document.querySelectorAll(".sgsi-menu__btn");
    const tabContents = document.querySelectorAll(".sgsi-tab-content");

    menuButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            // Cambiar botón activo
            menuButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Mostrar contenido correspondiente
            tabContents.forEach(tab => {
                if (tab.id === targetTab) {
                    tab.classList.remove("hidden");
                } else {
                    tab.classList.add("hidden");
                }
            });

            // Hacer scroll suave al inicio del dashboard (útil en móviles)
            if (window.innerWidth <= 800) {
                document.querySelector(".sgsi-dashboard").scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ==========================================
    // 2. BUSCADOR Y FILTRADO DE 40 ACTIVOS
    // ==========================================
    const searchInput = document.getElementById("assetSearch");
    const filterType = document.getElementById("assetFilterType");
    const filterCia = document.getElementById("assetFilterCia");
    const assetCounter = document.getElementById("assetCounterText");
    const assetRows = document.querySelectorAll(".asset-table tbody tr");

    function filterAssets() {
        const query = searchInput.value.toLowerCase().trim();
        const typeValue = filterType.value; // 'all', 'interno', 'externo'
        const ciaValue = filterCia.value; // 'all', 'alta', 'media', 'baja'

        let visibleCount = 0;

        assetRows.forEach(row => {
            const code = row.querySelector(".asset-code").textContent.toLowerCase();
            const name = row.cells[2].textContent.toLowerCase();
            const owner = row.cells[3].textContent.toLowerCase();
            const process = row.cells[4].textContent.toLowerCase();
            
            const rowType = row.getAttribute("data-type"); // 'interno', 'externo'
            const rowCia = row.getAttribute("data-cia"); // 'alta', 'media', 'baja'

            // Criterio de búsqueda
            const matchesSearch = code.includes(query) || 
                                  name.includes(query) || 
                                  owner.includes(query) || 
                                  process.includes(query);

            // Criterio de tipo
            const matchesType = typeValue === "all" || rowType === typeValue;

            // Criterio de criticidad CIA
            const matchesCia = ciaValue === "all" || rowCia === ciaValue;

            if (matchesSearch && matchesType && matchesCia) {
                row.style.display = "";
                visibleCount++;
            } else {
                row.style.display = "none";
            }
        });

        // Actualizar contador
        if (assetCounter) {
            assetCounter.textContent = `Mostrando ${visibleCount} de ${assetRows.length} activos registrados`;
        }
    }

    if (searchInput && filterType && filterCia) {
        searchInput.addEventListener("input", filterAssets);
        filterType.addEventListener("change", filterAssets);
        filterCia.addEventListener("change", filterAssets);
        
        // Ejecución inicial para contar activos
        filterAssets();
    }

    // ==========================================
    // 3. MATRIZ DE RIESGOS INTERACTIVA 5x5
    // ==========================================
    const matrixCells = document.querySelectorAll(".matrix-cell");
    const riskRows = document.querySelectorAll(".risk-table tbody tr");
    const riskFilterAlert = document.getElementById("riskFilterAlert");
    const riskFilterDesc = document.getElementById("riskFilterDesc");
    const clearRiskFilterBtn = document.getElementById("clearRiskFilter");
    const noRisksMessage = document.getElementById("noRisksMessage");

    function filterRisksByCell(probability, impact, cellElement) {
        let matchingCount = 0;
        
        // Quitar selección previa de celdas
        matrixCells.forEach(c => c.classList.remove("selected"));
        
        // Si hay una celda seleccionada, activarla
        if (cellElement) {
            cellElement.classList.add("selected");
            
            // Mostrar panel de filtro activo
            if (riskFilterAlert && riskFilterDesc) {
                riskFilterDesc.textContent = `Filtrado por: Probabilidad ${probability} × Impacto ${impact}`;
                riskFilterAlert.style.display = "flex";
            }

            // Filtrar las filas de riesgos
            riskRows.forEach(row => {
                const rowP = row.getAttribute("data-p");
                const rowI = row.getAttribute("data-i");

                if (rowP === probability.toString() && rowI === impact.toString()) {
                    row.style.display = "";
                    matchingCount++;
                } else {
                    row.style.display = "none";
                }
            });
            
            // Mostrar mensaje si no hay coincidencias
            if (noRisksMessage) {
                if (matchingCount === 0) {
                    noRisksMessage.style.display = "block";
                } else {
                    noRisksMessage.style.display = "none";
                }
            }

        } else {
            // Restablecer filtro de riesgos
            clearRiskFilter();
        }
    }

    function clearRiskFilter() {
        matrixCells.forEach(c => c.classList.remove("selected"));
        
        if (riskFilterAlert) {
            riskFilterAlert.style.display = "none";
        }
        
        riskRows.forEach(row => {
            row.style.display = "";
        });

        if (noRisksMessage) {
            noRisksMessage.style.display = "none";
        }
    }

    // Configurar listeners en la matriz
    matrixCells.forEach(cell => {
        cell.addEventListener("click", () => {
            const p = parseInt(cell.getAttribute("data-p"));
            const i = parseInt(cell.getAttribute("data-i"));
            
            if (cell.classList.contains("selected")) {
                filterRisksByCell(null, null, null);
            } else {
                filterRisksByCell(p, i, cell);
            }
        });
    });

    if (clearRiskFilterBtn) {
        clearRiskFilterBtn.addEventListener("click", () => {
            filterRisksByCell(null, null, null);
        });
    }

});
