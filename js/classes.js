// Funcionalidad para la página de clases
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los filtros de clase
    initClassFilters();
    
    // Aplicar traducciones si están disponibles
    if (window.translations) {
        const lang = localStorage.getItem('preferredLanguage') || 'es';
        applyClassesTranslations(lang);
    }
});

// Función para inicializar los filtros de clase
function initClassFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const classCards = document.querySelectorAll('.class-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir la clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el filtro seleccionado
            const filter = this.getAttribute('data-filter');
            
            // Mostrar u ocultar las tarjetas según el filtro
            classCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-type') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Función para aplicar traducciones a la página de clases
function applyClassesTranslations(lang) {
    if (!window.translations || !window.translations[lang]) return;
    
    const t = window.translations[lang];
    
    // Traducir encabezado
    const header = document.querySelector('.classes-header');
    if (header) {
        const headerTitle = header.querySelector('h1');
        const headerDesc = header.querySelector('p');
        
        if (headerTitle && t.classes_page && t.classes_page.title) {
            headerTitle.textContent = t.classes_page.title;
        }
        
        if (headerDesc && t.classes_page && t.classes_page.description) {
            headerDesc.textContent = t.classes_page.description;
        }
    }
    
    // Traducir botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0 && t.classes_page && t.classes_page.filters) {
        const filters = t.classes_page.filters;
        filterButtons.forEach(button => {
            const filterType = button.getAttribute('data-filter');
            if (filters[filterType]) {
                button.textContent = filters[filterType];
            }
        });
    }
    
    // Traducir tarjetas de clase
    const classCards = document.querySelectorAll('.class-card');
    if (classCards.length > 0 && t.classes) {
        classCards.forEach(card => {
            const className = card.querySelector('h2').textContent.toLowerCase();
            const classKey = Object.keys(t.classes).find(key => 
                t.classes[key].toLowerCase() === className || key === className
            );
            
            if (classKey && t.classes_page && t.classes_page.class_info && t.classes_page.class_info[classKey]) {
                const classInfo = t.classes_page.class_info[classKey];
                
                // Traducir nombre de clase
                const nameElement = card.querySelector('h2');
                if (nameElement && t.classes[classKey]) {
                    nameElement.textContent = t.classes[classKey];
                }
                
                // Traducir etiqueta de dificultad
                const difficultyLabel = card.querySelector('.difficulty-label');
                if (difficultyLabel && t.classes_page.difficulty_label) {
                    difficultyLabel.textContent = t.classes_page.difficulty_label;
                }
                
                // Traducir descripción
                const descElement = card.querySelector('.class-description');
                if (descElement && classInfo.description) {
                    descElement.textContent = classInfo.description;
                }
                
                // Traducir etiquetas de estadísticas
                const statLabels = card.querySelectorAll('.stat-label');
                if (statLabels.length > 0 && classInfo.stats) {
                    for (let i = 0; i < Math.min(statLabels.length, classInfo.stats.length); i++) {
                        statLabels[i].textContent = classInfo.stats[i];
                    }
                }
                
                // Traducir botón
                const button = card.querySelector('.btn');
                if (button && t.classes_page.view_details_button) {
                    button.textContent = t.classes_page.view_details_button;
                }
            }
        });
    }
    
    // Traducir sección de comparación
    const comparisonSection = document.querySelector('.class-comparison');
    if (comparisonSection && t.classes_page && t.classes_page.comparison) {
        const comparisonTitle = comparisonSection.querySelector('h2');
        const comparisonDesc = comparisonSection.querySelector('p');
        
        if (comparisonTitle && t.classes_page.comparison.title) {
            comparisonTitle.textContent = t.classes_page.comparison.title;
        }
        
        if (comparisonDesc && t.classes_page.comparison.description) {
            comparisonDesc.textContent = t.classes_page.comparison.description;
        }
        
        // Traducir encabezados de tabla
        const tableHeaders = comparisonSection.querySelectorAll('th');
        if (tableHeaders.length > 0 && t.classes_page.comparison.table_headers) {
            const headers = t.classes_page.comparison.table_headers;
            for (let i = 0; i < Math.min(tableHeaders.length, headers.length); i++) {
                tableHeaders[i].textContent = headers[i];
            }
        }
        
        // Traducir filas de tabla
        const tableRows = comparisonSection.querySelectorAll('tbody tr');
        if (tableRows.length > 0 && t.classes) {
            tableRows.forEach(row => {
                const classCell = row.querySelector('td:first-child');
                if (classCell) {
                    const className = classCell.textContent.toLowerCase();
                    const classKey = Object.keys(t.classes).find(key => 
                        t.classes[key].toLowerCase() === className || key === className
                    );
                    
                    if (classKey && t.classes[classKey]) {
                        classCell.textContent = t.classes[classKey];
                    }
                }
                
                // Traducir tipo de clase
                const typeCell = row.querySelector('td:nth-child(2)');
                if (typeCell && t.classes_page.comparison.types) {
                    const typeText = typeCell.textContent.toLowerCase();
                    const typeKey = Object.keys(t.classes_page.comparison.types).find(key => 
                        t.classes_page.comparison.types[key].toLowerCase() === typeText || key === typeText
                    );
                    
                    if (typeKey && t.classes_page.comparison.types[typeKey]) {
                        typeCell.textContent = t.classes_page.comparison.types[typeKey];
                    }
                }
            });
        }
    }
}
