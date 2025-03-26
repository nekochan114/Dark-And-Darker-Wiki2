// Funcionalidad para el soporte bilingüe de la wiki
document.addEventListener('DOMContentLoaded', function() {
    // Cargar las traducciones
    loadTranslations().then(translations => {
        // Guardar las traducciones en una variable global
        window.translations = translations;
        
        // Inicializar el selector de idioma
        initLanguageSelector();
        
        // Aplicar el idioma predeterminado (español)
        applyTranslations('es');
    });
});

// Función para cargar las traducciones desde el archivo JSON
async function loadTranslations() {
    try {
        const response = await fetch('data/translations.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const translations = await response.json();
        return translations;
    } catch (error) {
        console.error('Error al cargar las traducciones:', error);
        // Devolver un objeto vacío en caso de error
        return { es: {}, en: {} };
    }
}

// Función para inicializar el selector de idioma
function initLanguageSelector() {
    const esBtn = document.getElementById('es-btn');
    const enBtn = document.getElementById('en-btn');
    
    esBtn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            enBtn.classList.remove('active');
            applyTranslations('es');
            // Guardar la preferencia de idioma
            localStorage.setItem('preferredLanguage', 'es');
        }
    });
    
    enBtn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            esBtn.classList.remove('active');
            applyTranslations('en');
            // Guardar la preferencia de idioma
            localStorage.setItem('preferredLanguage', 'en');
        }
    });
    
    // Comprobar si hay una preferencia de idioma guardada
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage === 'en') {
        enBtn.click();
    }
}

// Función para aplicar las traducciones al contenido de la página
function applyTranslations(lang) {
    if (!window.translations || !window.translations[lang]) {
        console.error('Traducciones no disponibles');
        return;
    }
    
    const t = window.translations[lang];
    
    // Aplicar traducciones a la navegación
    const navItems = document.querySelectorAll('.main-nav a');
    if (navItems.length >= 7) {
        navItems[0].textContent = t.navigation.home;
        navItems[1].textContent = t.navigation.classes;
        navItems[2].textContent = t.navigation.attributes;
        navItems[3].textContent = t.navigation.equipment;
        navItems[4].textContent = t.navigation.mechanics;
        navItems[5].textContent = t.navigation.calculator;
        navItems[6].textContent = t.navigation.guides;
    }
    
    // Aplicar traducciones al buscador
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.placeholder = t.search.placeholder;
    }
    
    // Aplicar traducciones a la sección hero
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    if (heroTitle) heroTitle.textContent = t.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    if (heroButtons.length >= 2) {
        heroButtons[0].textContent = t.hero.calculator_button;
        heroButtons[1].textContent = t.hero.guides_button;
    }
    
    // Aplicar traducciones a los títulos de sección
    const quickAccessTitle = document.querySelector('.quick-access h2');
    const updatesTitle = document.querySelector('.latest-updates h2');
    const calculatorTitle = document.querySelector('.featured-calculator h2');
    
    if (quickAccessTitle) quickAccessTitle.textContent = t.sections.quick_access;
    if (updatesTitle) updatesTitle.textContent = t.sections.latest_updates;
    if (calculatorTitle) calculatorTitle.textContent = t.sections.damage_calculator;
    
    // Aplicar traducciones a las tarjetas de acceso rápido
    const cards = document.querySelectorAll('.card');
    if (cards.length >= 4) {
        // Tarjeta de clases
        const classesCard = cards[0];
        classesCard.querySelector('h3').textContent = t.cards.classes.title;
        classesCard.querySelector('p').textContent = t.cards.classes.description;
        classesCard.querySelector('.btn').textContent = t.cards.classes.button;
        
        // Tarjeta de atributos
        const attributesCard = cards[1];
        attributesCard.querySelector('h3').textContent = t.cards.attributes.title;
        attributesCard.querySelector('p').textContent = t.cards.attributes.description;
        attributesCard.querySelector('.btn').textContent = t.cards.attributes.button;
        
        // Tarjeta de equipamiento
        const equipmentCard = cards[2];
        equipmentCard.querySelector('h3').textContent = t.cards.equipment.title;
        equipmentCard.querySelector('p').textContent = t.cards.equipment.description;
        equipmentCard.querySelector('.btn').textContent = t.cards.equipment.button;
        
        // Tarjeta de calculadora
        const calculatorCard = cards[3];
        calculatorCard.querySelector('h3').textContent = t.cards.calculator.title;
        calculatorCard.querySelector('p').textContent = t.cards.calculator.description;
        calculatorCard.querySelector('.btn').textContent = t.cards.calculator.button;
    }
    
    // Aplicar traducciones a las actualizaciones
    const updates = document.querySelectorAll('.update');
    if (updates.length >= 3) {
        // Actualización del hechicero
        const sorcererUpdate = updates[0];
        sorcererUpdate.querySelector('.date').textContent = t.updates.sorcerer.date;
        sorcererUpdate.querySelector('h3').textContent = t.updates.sorcerer.title;
        sorcererUpdate.querySelector('p').textContent = t.updates.sorcerer.description;
        sorcererUpdate.querySelector('a').textContent = t.updates.sorcerer.link;
        
        // Actualización de cambios en el daño
        const damageUpdate = updates[1];
        damageUpdate.querySelector('.date').textContent = t.updates.damage_changes.date;
        damageUpdate.querySelector('h3').textContent = t.updates.damage_changes.title;
        damageUpdate.querySelector('p').textContent = t.updates.damage_changes.description;
        damageUpdate.querySelector('a').textContent = t.updates.damage_changes.link;
        
        // Actualización de la guía de supervivencia
        const survivalUpdate = updates[2];
        survivalUpdate.querySelector('.date').textContent = t.updates.survival_guide.date;
        survivalUpdate.querySelector('h3').textContent = t.updates.survival_guide.title;
        survivalUpdate.querySelector('p').textContent = t.updates.survival_guide.description;
        survivalUpdate.querySelector('a').textContent = t.updates.survival_guide.link;
    }
    
    // Aplicar traducciones a la calculadora
    const classLabel = document.querySelector('label[for="class-select"]');
    const weaponLabel = document.querySelector('label[for="weapon-select"]');
    const strengthLabel = document.querySelector('label[for="strength"]');
    const dexterityLabel = document.querySelector('label[for="dexterity"]');
    const completeCalcBtn = document.querySelector('.calculator-form .btn');
    const previewTitle = document.querySelector('.calculator-result h3');
    const damageLabel = document.querySelector('.damage-label');
    
    if (classLabel) classLabel.textContent = t.calculator.class_label;
    if (weaponLabel) weaponLabel.textContent = t.calculator.weapon_label;
    if (strengthLabel) strengthLabel.textContent = t.calculator.strength_label;
    if (dexterityLabel) dexterityLabel.textContent = t.calculator.dexterity_label;
    if (completeCalcBtn) completeCalcBtn.textContent = t.calculator.complete_calculator;
    if (previewTitle) previewTitle.textContent = t.calculator.preview_title;
    if (damageLabel) damageLabel.textContent = t.calculator.base_damage;
    
    // Aplicar traducciones a las opciones de clase
    const classSelect = document.getElementById('class-select');
    if (classSelect) {
        const classOptions = classSelect.querySelectorAll('option');
        if (classOptions.length >= 10) {
            classOptions[0].textContent = t.classes.fighter;
            classOptions[1].textContent = t.classes.barbarian;
            classOptions[2].textContent = t.classes.rogue;
            classOptions[3].textContent = t.classes.ranger;
            classOptions[4].textContent = t.classes.wizard;
            classOptions[5].textContent = t.classes.cleric;
            classOptions[6].textContent = t.classes.bard;
            classOptions[7].textContent = t.classes.warlock;
            classOptions[8].textContent = t.classes.druid;
            classOptions[9].textContent = t.classes.sorcerer;
        }
    }
    
    // Aplicar traducciones a las opciones de arma
    const weaponSelect = document.getElementById('weapon-select');
    if (weaponSelect) {
        const weaponOptions = weaponSelect.querySelectorAll('option');
        if (weaponOptions.length >= 5) {
            weaponOptions[0].textContent = t.weapons.sword;
            weaponOptions[1].textContent = t.weapons.axe;
            weaponOptions[2].textContent = t.weapons.dagger;
            weaponOptions[3].textContent = t.weapons.bow;
            weaponOptions[4].textContent = t.weapons.staff;
        }
    }
    
    // Aplicar traducciones al pie de página
    const footerTitle = document.querySelector('.footer-section h3');
    const footerDesc = document.querySelector('.footer-section p');
    const footerSections = document.querySelectorAll('.footer-section h3');
    const copyright = document.querySelector('.copyright p');
    
    if (footerTitle) footerTitle.textContent = t.footer.title;
    if (footerDesc) footerDesc.textContent = t.footer.description;
    if (footerSections.length >= 3) {
        footerSections[1].textContent = t.footer.quick_links;
        footerSections[2].textContent = t.footer.resources;
    }
    if (copyright) copyright.textContent = t.footer.copyright;
    
    // Actualizar el gráfico si existe
    updateChartLabels(lang);
}

// Función para actualizar las etiquetas del gráfico
function updateChartLabels(lang) {
    const chart = Chart.getChart('damage-chart');
    if (!chart) return;
    
    const t = window.translations[lang];
    
    chart.data.labels = [
        t.calculator.base_damage,
        t.calculator.with_bonuses,
        t.calculator.critical
    ];
    
    chart.update();
}
