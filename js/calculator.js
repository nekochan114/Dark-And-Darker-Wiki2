// Funcionalidad para la calculadora de daño
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las pestañas
    initTabs();
    
    // Inicializar los sliders de atributos
    initAttributeSliders();
    
    // Inicializar los gráficos
    initCharts();
    
    // Configurar los botones de la calculadora
    setupCalculatorButtons();
    
    // Actualizar los valores iniciales
    updateDamageCalculation();
});

// Función para inicializar las pestañas
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Añadir la clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Función para inicializar los sliders de atributos
function initAttributeSliders() {
    const sliders = [
        { id: 'strength-slider', valueId: 'strength-value' },
        { id: 'vigor-slider', valueId: 'vigor-value' },
        { id: 'agility-slider', valueId: 'agility-value' },
        { id: 'dexterity-slider', valueId: 'dexterity-value' },
        { id: 'will-slider', valueId: 'will-value' },
        { id: 'knowledge-slider', valueId: 'knowledge-value' },
        { id: 'resourcefulness-slider', valueId: 'resourcefulness-value' }
    ];
    
    sliders.forEach(slider => {
        const sliderElement = document.getElementById(slider.id);
        const valueElement = document.getElementById(slider.valueId);
        
        // Actualizar el valor al cargar la página
        valueElement.textContent = sliderElement.value;
        
        // Actualizar el valor al mover el slider
        sliderElement.addEventListener('input', function() {
            valueElement.textContent = this.value;
            updateDamageCalculation();
            updateAttributesChart();
        });
    });
}

// Función para inicializar los gráficos
function initCharts() {
    // Gráfico de comparación de daño
    const damageCtx = document.getElementById('damage-comparison-chart').getContext('2d');
    window.damageChart = new Chart(damageCtx, {
        type: 'bar',
        data: {
            labels: ['Daño Base', 'Con Bonificaciones', 'Crítico', 'Golpe en Cabeza', 'Máximo Posible'],
            datasets: [{
                label: 'Daño',
                data: [25, 30, 45, 50, 60],
                backgroundColor: [
                    'rgba(139, 92, 246, 0.5)',
                    'rgba(79, 70, 229, 0.5)',
                    'rgba(245, 158, 11, 0.5)',
                    'rgba(239, 68, 68, 0.5)',
                    'rgba(16, 185, 129, 0.5)'
                ],
                borderColor: [
                    'rgba(139, 92, 246, 1)',
                    'rgba(79, 70, 229, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(16, 185, 129, 1)'
                ],
                borderWidth: 1
            }]
        },
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
    });
    
    // Gráfico de atributos
    const attributesCtx = document.getElementById('attributes-chart').getContext('2d');
    window.attributesChart = new Chart(attributesCtx, {
        type: 'radar',
        data: {
            labels: ['Fuerza', 'Vigor', 'Agilidad', 'Destreza', 'Voluntad', 'Conocimiento', 'Ingenio'],
            datasets: [{
                label: 'Atributos',
                data: [20, 15, 15, 20, 10, 10, 15],
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(139, 92, 246, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#f3f4f6'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#f3f4f6'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Actualizar el gráfico de atributos con los valores iniciales
    updateAttributesChart();
}

// Función para actualizar el gráfico de atributos
function updateAttributesChart() {
    const strengthValue = parseInt(document.getElementById('strength-slider').value);
    const vigorValue = parseInt(document.getElementById('vigor-slider').value);
    const agilityValue = parseInt(document.getElementById('agility-slider').value);
    const dexterityValue = parseInt(document.getElementById('dexterity-slider').value);
    const willValue = parseInt(document.getElementById('will-slider').value);
    const knowledgeValue = parseInt(document.getElementById('knowledge-slider').value);
    const resourcefulnessValue = parseInt(document.getElementById('resourcefulness-slider').value);
    
    window.attributesChart.data.datasets[0].data = [
        strengthValue,
        vigorValue,
        agilityValue,
        dexterityValue,
        willValue,
        knowledgeValue,
        resourcefulnessValue
    ];
    
    window.attributesChart.update();
    
    // Actualizar las estadísticas derivadas
    updateDerivedStats(strengthValue, vigorValue, agilityValue, dexterityValue, willValue, knowledgeValue, resourcefulnessValue);
}

// Función para actualizar las estadísticas derivadas
function updateDerivedStats(strength, vigor, agility, dexterity, will, knowledge, resourcefulness) {
    // Estas fórmulas son aproximadas basadas en la investigación del juego
    const physicalPower = Math.floor(strength * 0.8 + dexterity * 0.2);
    const physicalPowerBonus = Math.floor((strength * 0.5 + dexterity * 0.3) / 10);
    const magicalPower = Math.floor(will * 0.8 + knowledge * 0.2);
    const magicalPowerBonus = Math.floor((will * 0.5 + knowledge * 0.3) / 10);
    const baseHealth = 100 + Math.floor(vigor * 2 + strength * 1);
    const actionSpeed = 100 + Math.floor((agility * 0.7 + dexterity * 0.3) / 5);
    
    // Actualizar los valores en la interfaz
    document.getElementById('physical-power').textContent = physicalPower;
    document.getElementById('physical-power-bonus').textContent = `${physicalPowerBonus}%`;
    document.getElementById('magical-power').textContent = magicalPower;
    document.getElementById('magical-power-bonus').textContent = `${magicalPowerBonus}%`;
    document.getElementById('base-health').textContent = baseHealth;
    document.getElementById('action-speed').textContent = `${actionSpeed}%`;
}

// Función para configurar los botones de la calculadora
function setupCalculatorButtons() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Botón de calcular
    calculateBtn.addEventListener('click', function() {
        updateDamageCalculation();
    });
    
    // Botón de reiniciar
    resetBtn.addEventListener('click', function() {
        // Reiniciar los sliders de atributos
        document.getElementById('strength-slider').value = 20;
        document.getElementById('strength-value').textContent = 20;
        document.getElementById('vigor-slider').value = 15;
        document.getElementById('vigor-value').textContent = 15;
        document.getElementById('agility-slider').value = 15;
        document.getElementById('agility-value').textContent = 15;
        document.getElementById('dexterity-slider').value = 20;
        document.getElementById('dexterity-value').textContent = 20;
        document.getElementById('will-slider').value = 10;
        document.getElementById('will-value').textContent = 10;
        document.getElementById('knowledge-slider').value = 10;
        document.getElementById('knowledge-value').textContent = 10;
        document.getElementById('resourcefulness-slider').value = 15;
        document.getElementById('resourcefulness-value').textContent = 15;
        
        // Reiniciar los campos de equipamiento
        document.getElementById('calc-class').value = 'fighter';
        document.getElementById('weapon-type').value = 'sword';
        document.getElementById('weapon-quality').value = 'common';
        document.getElementById('weapon-damage').value = 25;
        
        // Reiniciar los campos de bonificaciones
        document.getElementById('additional-damage').value = 0;
        document.getElementById('power-bonus').value = 0;
        document.getElementById('penetration').value = 0;
        document.getElementById('headshot').checked = false;
        document.getElementById('critical').checked = false;
        
        // Reiniciar los campos de objetivo
        document.getElementById('target-type').value = 'player';
        document.getElementById('target-armor').value = 20;
        document.getElementById('damage-reduction').value = 20;
        
        // Actualizar los cálculos y gráficos
        updateDamageCalculation();
        updateAttributesChart();
    });
    
    // Añadir event listeners a todos los campos de entrada
    const inputFields = document.querySelectorAll('input, select');
    inputFields.forEach(field => {
        field.addEventListener('change', function() {
            updateDamageCalculation();
        });
    });
}

// Función para calcular el daño
function calculateDamage() {
    // Obtener los valores de los campos
    const weaponDamage = parseInt(document.getElementById('weapon-damage').value);
    const additionalDamage = parseInt(document.getElementById('additional-damage').value);
    const powerBonus = parseInt(document.getElementById('power-bonus').value) / 100;
    const penetration = parseInt(document.getElementById('penetration').value) / 100;
    const isHeadshot = document.getElementById('headshot').checked;
    const isCritical = document.getElementById('critical').checked;
    const damageReduction = parseInt(document.getElementById('damage-reduction').value) / 100;
    
    // Calcular el daño base
    let baseDamage = weaponDamage;
    
    // Aplicar bonificación de poder
    let damageWithPowerBonus = baseDamage * (1 + powerBonus);
    
    // Añadir daño adicional
    let damageWithAdditional = damageWithPowerBonus + additionalDamage;
    
    // Aplicar multiplicador de ubicación (headshot)
    const locationMultiplier = isHeadshot ? 1.5 : 1.0;
    let damageWithLocation = damageWithAdditional * locationMultiplier;
    
    // Aplicar multiplicador de crítico
    const criticalMultiplier = isCritical ? 1.5 : 1.0;
    let damageWithCritical = damageWithLocation * criticalMultiplier;
    
    // Aplicar reducción de daño y penetración
    let finalDamage = damageWithCritical * (1 - damageReduction * (1 - penetration));
    
    // Redondear el daño final
    finalDamage = Math.floor(finalDamage);
    
    // Calcular variación de daño (±10%)
    const minDamage = Math.floor(finalDamage * 0.9);
    const maxDamage = Math.floor(finalDamage * 1.1);
    
    return {
        baseDamage,
        damageWithPowerBonus,
        damageWithAdditional,
        damageWithLocation,
        damageWithCritical,
        finalDamage,
        minDamage,
        maxDamage,
        powerBonus,
        additionalDamage,
        locationMultiplier,
        criticalMultiplier,
        damageReduction,
        penetration
    };
}

// Función para actualizar el cálculo de daño y la interfaz
function updateDamageCalculation() {
    const damageResult = calculateDamage();
    
    // Actualizar los valores de daño en la interfaz
    document.getElementById('min-damage').textContent = damageResult.minDamage;
    document.getElementById('max-damage').textContent = damageResult.maxDamage;
    document.getElementById('base-damage-value').textContent = damageResult.baseDamage;
    document.getElementById('power-bonus-value').textContent = `${(damageResult.powerBonus * 100).toFixed(0)}%`;
    document.getElementById('additional-damage-value').textContent = `+${damageResult.additionalDamage}`;
    document.getElementById('location-multiplier-value').textContent = `x${damageResult.locationMultiplier.toFixed(1)}`;
    document.getElementById('damage-reduction-value').textContent = `-${(damageResult.damageReduction * 100).toFixed(0)}%`;
    document.getElementById('penetration-value').textContent = `${(damageResult.penetration * 100).toFixed(0)}%`;
    
    // Actualizar el gráfico de comparación de daño
    window.damageChart.data.datasets[0].data = [
        damageResult.baseDamage,
        Math.floor(damageResult.damageWithPowerBonus + damageResult.additionalDamage),
        Math.floor(damageResult.damageWithAdditional * damageResult.criticalMultiplier),
        Math.floor(damageResult.damageWithAdditional * damageResult.locationMultiplier),
        damageResult.maxDamage
    ];
    window.damageChart.update();
}

// Función para actualizar las etiquetas del gráfico según el idioma
function updateCalculatorTranslations(lang) {
    if (!window.translations || !window.translations[lang]) return;
    
    const t = window.translations[lang];
    
    // Actualizar las etiquetas del gráfico de daño
    if (window.damageChart) {
        window.damageChart.data.labels = [
            t.calculator.base_damage,
            t.calculator.with_bonuses,
            t.calculator.critical,
            t.calculator.headshot || 'Golpe en Cabeza',
            t.calculator.max_possible || 'Máximo Posible'
        ];
        window.damageChart.update();
    }
    
    // Actualizar las etiquetas del gráfico de atributos
    if (window.attributesChart) {
        window.attributesChart.data.labels = [
            t.attributes.strength || 'Fuerza',
            t.attributes.vigor || 'Vigor',
            t.attributes.agility || 'Agilidad',
            t.attributes.dexterity || 'Destreza',
            t.attributes.will || 'Voluntad',
            t.attributes.knowledge || 'Conocimiento',
            t.attributes.resourcefulness || 'Ingenio'
        ];
        window.attributesChart.update();
    }
}
