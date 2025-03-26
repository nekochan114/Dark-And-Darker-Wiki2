// Funcionalidad principal para la wiki
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización del selector de idioma
    initLanguageSelector();
    
    // Inicialización de la vista previa del gráfico de daño
    initDamageChart();
    
    // Manejadores de eventos para la calculadora de vista previa
    setupCalculatorPreview();
});

// Función para inicializar el selector de idioma
function initLanguageSelector() {
    const esBtn = document.getElementById('es-btn');
    const enBtn = document.getElementById('en-btn');
    
    esBtn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            enBtn.classList.remove('active');
            changeLanguage('es');
        }
    });
    
    enBtn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            esBtn.classList.remove('active');
            changeLanguage('en');
        }
    });
}

// Función para cambiar el idioma de la interfaz
function changeLanguage(lang) {
    // En una implementación completa, esto cargaría las traducciones
    // Por ahora, solo mostramos un mensaje en la consola
    console.log(`Cambiando idioma a: ${lang}`);
    
    // Ejemplo de cómo se cambiarían algunos textos
    const translations = {
        'es': {
            'home': 'Inicio',
            'classes': 'Clases',
            'attributes': 'Atributos',
            'equipment': 'Equipamiento',
            'mechanics': 'Mecánicas',
            'calculator': 'Calculadora',
            'guides': 'Guías',
            'search': 'Buscar...',
            'hero_title': 'Dark and Darker Wiki Interactiva',
            'hero_subtitle': 'Tu guía completa para dominar las mazmorras',
            'quick_access': 'Acceso Rápido',
            'latest_updates': 'Últimas Actualizaciones',
            'damage_calculator': 'Calculadora de Daño',
            'class': 'Clase:',
            'weapon': 'Arma:',
            'strength': 'Fuerza:',
            'dexterity': 'Destreza:',
            'damage_preview': 'Vista Previa de Daño',
            'base_damage': 'Daño Base'
        },
        'en': {
            'home': 'Home',
            'classes': 'Classes',
            'attributes': 'Attributes',
            'equipment': 'Equipment',
            'mechanics': 'Mechanics',
            'calculator': 'Calculator',
            'guides': 'Guides',
            'search': 'Search...',
            'hero_title': 'Dark and Darker Interactive Wiki',
            'hero_subtitle': 'Your complete guide to mastering the dungeons',
            'quick_access': 'Quick Access',
            'latest_updates': 'Latest Updates',
            'damage_calculator': 'Damage Calculator',
            'class': 'Class:',
            'weapon': 'Weapon:',
            'strength': 'Strength:',
            'dexterity': 'Dexterity:',
            'damage_preview': 'Damage Preview',
            'base_damage': 'Base Damage'
        }
    };
    
    // Esta es una implementación simplificada
    // En una versión completa, usaríamos i18next para manejar las traducciones
    if (lang === 'en') {
        document.querySelector('.search-bar input').placeholder = translations.en.search;
        document.querySelector('.hero h1').textContent = translations.en.hero_title;
        document.querySelector('.hero p').textContent = translations.en.hero_subtitle;
        document.querySelector('.quick-access h2').textContent = translations.en.quick_access;
        document.querySelector('.latest-updates h2').textContent = translations.en.latest_updates;
        document.querySelector('.featured-calculator h2').textContent = translations.en.damage_calculator;
        
        // Cambiar etiquetas de la calculadora
        document.querySelector('label[for="class-select"]').textContent = translations.en.class;
        document.querySelector('label[for="weapon-select"]').textContent = translations.en.weapon;
        document.querySelector('label[for="strength"]').textContent = translations.en.strength;
        document.querySelector('label[for="dexterity"]').textContent = translations.en.dexterity;
        document.querySelector('.calculator-result h3').textContent = translations.en.damage_preview;
        document.querySelector('.damage-label').textContent = translations.en.base_damage;
        
        // Cambiar opciones de navegación
        const navItems = document.querySelectorAll('.main-nav a');
        navItems[0].textContent = translations.en.home;
        navItems[1].textContent = translations.en.classes;
        navItems[2].textContent = translations.en.attributes;
        navItems[3].textContent = translations.en.equipment;
        navItems[4].textContent = translations.en.mechanics;
        navItems[5].textContent = translations.en.calculator;
        navItems[6].textContent = translations.en.guides;
    } else {
        document.querySelector('.search-bar input').placeholder = translations.es.search;
        document.querySelector('.hero h1').textContent = translations.es.hero_title;
        document.querySelector('.hero p').textContent = translations.es.hero_subtitle;
        document.querySelector('.quick-access h2').textContent = translations.es.quick_access;
        document.querySelector('.latest-updates h2').textContent = translations.es.latest_updates;
        document.querySelector('.featured-calculator h2').textContent = translations.es.damage_calculator;
        
        // Cambiar etiquetas de la calculadora
        document.querySelector('label[for="class-select"]').textContent = translations.es.class;
        document.querySelector('label[for="weapon-select"]').textContent = translations.es.weapon;
        document.querySelector('label[for="strength"]').textContent = translations.es.strength;
        document.querySelector('label[for="dexterity"]').textContent = translations.es.dexterity;
        document.querySelector('.calculator-result h3').textContent = translations.es.damage_preview;
        document.querySelector('.damage-label').textContent = translations.es.base_damage;
        
        // Cambiar opciones de navegación
        const navItems = document.querySelectorAll('.main-nav a');
        navItems[0].textContent = translations.es.home;
        navItems[1].textContent = translations.es.classes;
        navItems[2].textContent = translations.es.attributes;
        navItems[3].textContent = translations.es.equipment;
        navItems[4].textContent = translations.es.mechanics;
        navItems[5].textContent = translations.es.calculator;
        navItems[6].textContent = translations.es.guides;
    }
}

// Función para inicializar el gráfico de vista previa de daño
function initDamageChart() {
    const ctx = document.getElementById('damage-chart').getContext('2d');
    
    // Datos de ejemplo para el gráfico
    const damageData = {
        labels: ['Daño Base', 'Con Bonificaciones', 'Crítico'],
        datasets: [{
            label: 'Daño',
            data: [25, 35, 50],
            backgroundColor: [
                'rgba(139, 92, 246, 0.5)',
                'rgba(79, 70, 229, 0.5)',
                'rgba(245, 158, 11, 0.5)'
            ],
            borderColor: [
                'rgba(139, 92, 246, 1)',
                'rgba(79, 70, 229, 1)',
                'rgba(245, 158, 11, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    // Configuración del gráfico
    const config = {
        type: 'bar',
        data: damageData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#f3f4f6'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#f3f4f6'
                    }
                }
            }
        }
    };
    
    // Crear el gráfico
    new Chart(ctx, config);
}

// Configurar la calculadora de vista previa
function setupCalculatorPreview() {
    const classSelect = document.getElementById('class-select');
    const weaponSelect = document.getElementById('weapon-select');
    const strengthInput = document.getElementById('strength');
    const dexterityInput = document.getElementById('dexterity');
    
    // Datos de ejemplo para diferentes clases y armas
    const damageData = {
        fighter: {
            sword: { base: [25, 30], strength: 0.8, dexterity: 0.2 },
            axe: { base: [30, 35], strength: 1.0, dexterity: 0.0 }
        },
        barbarian: {
            sword: { base: [20, 25], strength: 0.7, dexterity: 0.3 },
            axe: { base: [35, 40], strength: 1.2, dexterity: 0.0 }
        },
        rogue: {
            sword: { base: [15, 20], strength: 0.3, dexterity: 0.7 },
            dagger: { base: [12, 18], strength: 0.2, dexterity: 1.0 }
        }
    };
    
    // Función para actualizar la vista previa de daño
    function updateDamagePreview() {
        const selectedClass = classSelect.value;
        const selectedWeapon = weaponSelect.value;
        const strengthValue = parseInt(strengthInput.value);
        const dexterityValue = parseInt(dexterityInput.value);
        
        // Valores predeterminados si no hay datos para la combinación seleccionada
        let baseDamage = [20, 25];
        let strengthMod = 0.5;
        let dexterityMod = 0.5;
        
        // Obtener datos específicos si están disponibles
        if (damageData[selectedClass] && damageData[selectedClass][selectedWeapon]) {
            const weaponData = damageData[selectedClass][selectedWeapon];
            baseDamage = weaponData.base;
            strengthMod = weaponData.strength;
            dexterityMod = weaponData.dexterity;
        }
        
        // Calcular daño con atributos
        const minDamage = Math.floor(baseDamage[0] * (1 + (strengthValue * strengthMod + dexterityValue * dexterityMod) / 100));
        const maxDamage = Math.floor(baseDamage[1] * (1 + (strengthValue * strengthMod + dexterityValue * dexterityMod) / 100));
        
        // Actualizar la visualización
        document.querySelector('.damage-value').textContent = `${minDamage}-${maxDamage}`;
    }
    
    // Agregar event listeners para actualizar la vista previa
    classSelect.addEventListener('change', updateDamagePreview);
    weaponSelect.addEventListener('change', updateDamagePreview);
    strengthInput.addEventListener('input', updateDamagePreview);
    dexterityInput.addEventListener('input', updateDamagePreview);
    
    // Inicializar con los valores actuales
    updateDamagePreview();
}
