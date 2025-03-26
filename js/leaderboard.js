// Archivo JavaScript para la página de clasificación
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráficos
    initializeCharts();
    
    // Configurar interactividad de FAQ
    setupFAQ();
    
    // Configurar filtros
    setupFilters();
    
    // Configurar búsqueda de jugadores
    setupPlayerSearch();
    
    // Configurar paginación
    setupPagination();
});

// Inicializar gráficos con Chart.js
function initializeCharts() {
    // Gráfico de distribución de clases
    const classCtx = document.getElementById('class-chart').getContext('2d');
    const classChart = new Chart(classCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pícaro', 'Mago', 'Brujo', 'Bárbaro', 'Explorador', 'Clérigo', 'Luchador', 'Bardo'],
            datasets: [{
                data: [27, 18, 15, 12, 10, 8, 6, 4],
                backgroundColor: [
                    '#e74c3c', // Rojo
                    '#3498db', // Azul
                    '#2ecc71', // Verde
                    '#f39c12', // Naranja
                    '#9b59b6', // Morado
                    '#1abc9c', // Turquesa
                    '#34495e', // Azul oscuro
                    '#e67e22'  // Naranja oscuro
                ],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 10,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });

    // Gráfico de evolución de rating
    const ratingCtx = document.getElementById('rating-chart').getContext('2d');
    const ratingChart = new Chart(ratingCtx, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8'],
            datasets: [
                {
                    label: 'DarkLord789',
                    data: [2400, 2450, 2520, 2580, 2650, 2720, 2780, 2845],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.3,
                    borderWidth: 3
                },
                {
                    label: 'ShadowBlade',
                    data: [2380, 2430, 2500, 2550, 2620, 2680, 2740, 2789],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.3,
                    borderWidth: 3
                },
                {
                    label: 'FireMage42',
                    data: [2350, 2400, 2470, 2530, 2590, 2650, 2700, 2756],
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.3,
                    borderWidth: 3
                },
                {
                    label: 'Top 10 Promedio',
                    data: [2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.3,
                    borderWidth: 3,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ccc',
                        font: {
                            size: 12
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 10
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ccc'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ccc'
                    },
                    min: 2200,
                    max: 2900
                }
            }
        }
    });
}

// Configurar interactividad de FAQ
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const toggle = otherItem.querySelector('.faq-toggle');
                    toggle.textContent = '+';
                }
            });
            
            // Alternar estado actual
            item.classList.toggle('active');
            const toggle = item.querySelector('.faq-toggle');
            toggle.textContent = item.classList.contains('active') ? '-' : '+';
        });
    });
}

// Configurar filtros
function setupFilters() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    applyFiltersBtn.addEventListener('click', () => {
        const season = document.getElementById('season-select').value;
        const playerClass = document.getElementById('class-select').value;
        const region = document.getElementById('region-select').value;
        const category = document.getElementById('category-select').value;
        
        // Aquí iría la lógica para filtrar los datos según las selecciones
        // En una implementación real, esto haría una petición a la API
        
        // Simulación de carga
        applyFiltersBtn.textContent = 'Cargando...';
        setTimeout(() => {
            applyFiltersBtn.textContent = 'Aplicar Filtros';
            // Mostrar mensaje de éxito o actualizar tabla
            alert('Filtros aplicados: ' + season + ', ' + playerClass + ', ' + region + ', ' + category);
        }, 1000);
    });
}

// Configurar búsqueda de jugadores
function setupPlayerSearch() {
    const searchBtn = document.getElementById('player-search-btn');
    const searchInput = document.getElementById('player-search-input');
    const searchResults = document.querySelector('.search-results');
    
    searchBtn.addEventListener('click', () => {
        const playerName = searchInput.value.trim();
        
        if (playerName === '') {
            searchResults.innerHTML = '<p>Por favor, introduce un nombre de jugador.</p>';
            return;
        }
        
        // Simulación de búsqueda
        searchResults.innerHTML = '<p>Buscando jugador "' + playerName + '"...</p>';
        
        setTimeout(() => {
            // Simulación de resultados
            if (Math.random() > 0.3) { // 70% de probabilidad de encontrar al jugador
                searchResults.innerHTML = `
                    <div class="player-result">
                        <h3>Jugador encontrado: ${playerName}</h3>
                        <div class="player-stats">
                            <div class="stat-row">
                                <span class="stat-label">Posición:</span>
                                <span class="stat-value">#${Math.floor(Math.random() * 1000) + 1}</span>
                            </div>
                            <div class="stat-row">
                                <span class="stat-label">Clase:</span>
                                <span class="stat-value">Pícaro</span>
                            </div>
                            <div class="stat-row">
                                <span class="stat-label">Rating:</span>
                                <span class="stat-value">${2000 + Math.floor(Math.random() * 800)}</span>
                            </div>
                            <div class="stat-row">
                                <span class="stat-label">Eliminaciones:</span>
                                <span class="stat-value">${Math.floor(Math.random() * 3000) + 500}</span>
                            </div>
                        </div>
                        <button class="view-profile-btn">Ver Perfil Completo</button>
                    </div>
                `;
            } else {
                searchResults.innerHTML = '<p>No se encontró ningún jugador con el nombre "' + playerName + '". Verifica la ortografía o prueba con otro nombre.</p>';
            }
        }, 1500);
    });
    
    // Permitir búsqueda al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Configurar paginación
function setupPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    const prevButton = document.querySelector('.pagination-btn:first-child');
    const nextButton = document.querySelector('.pagination-btn:last-child');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Desactivar botón activo actual
            document.querySelector('.page-btn.active').classList.remove('active');
            
            // Activar el botón clickeado
            button.classList.add('active');
            
            // Habilitar/deshabilitar botones de navegación
            prevButton.disabled = button.textContent === '1';
            nextButton.disabled = button.textContent === '20';
            
            // Aquí iría la lógica para cargar los datos de la página seleccionada
            // En una implementación real, esto haría una petición a la API
            
            // Simular carga de datos
            const tableBody = document.querySelector('tbody');
            tableBody.style.opacity = '0.5';
            
            setTimeout(() => {
                tableBody.style.opacity = '1';
                // Aquí se actualizarían los datos de la tabla
            }, 500);
        });
    });
    
    // Configurar botones de navegación
    nextButton.addEventListener('click', () => {
        const activeButton = document.querySelector('.page-btn.active');
        const nextPageButton = activeButton.nextElementSibling;
        
        if (nextPageButton && nextPageButton.classList.contains('page-btn')) {
            nextPageButton.click();
        }
    });
    
    prevButton.addEventListener('click', () => {
        const activeButton = document.querySelector('.page-btn.active');
        const prevPageButton = activeButton.previousElementSibling;
        
        if (prevPageButton && prevPageButton.classList.contains('page-btn')) {
            prevPageButton.click();
        }
    });
}

// Funciones para traducción
function translateLeaderboard(language) {
    // Esta función sería llamada desde el archivo i18n.js cuando se cambia el idioma
    // Traduciría todos los textos de la página según el idioma seleccionado
    
    const translations = {
        'es': {
            'leaderboardTitle': 'Clasificación de Dark and Darker',
            'leaderboardDesc': 'Explora los mejores jugadores del juego, sus estadísticas y logros.',
            // ... más traducciones
        },
        'en': {
            'leaderboardTitle': 'Dark and Darker Leaderboard',
            'leaderboardDesc': 'Explore the best players in the game, their stats and achievements.',
            // ... más traducciones
        }
    };
    
    // Aplicar traducciones
    if (translations[language]) {
        document.querySelector('.leaderboard-header h1').textContent = translations[language].leaderboardTitle;
        document.querySelector('.leaderboard-header p').textContent = translations[language].leaderboardDesc;
        // ... aplicar más traducciones
    }
}

// Exportar función para uso en i18n.js
window.translateLeaderboard = translateLeaderboard;
