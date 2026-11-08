/**
 * SalvaPlato - Calculadora de Retorno de Inversión y Pérdidas para Restaurantes
 * 100% Reactiva, Interactiva con Botones +/- y Presets Rápidos
 */

const ROICalculator = {
  portionsPerDay: 8,
  averagePrice: 28000,
  daysPerMonth: 26,
  discountRate: 0.52, // 52% de descuento promedio de rescate
  commissionRate: 0.18, // 18% comisión SalvaPlato
  foodCostRate: 0.35, // 35% costo de materia prima desperdiciada

  init() {
    this.syncInputs();
    this.bindEvents();
    this.calculate();
  },

  syncInputs() {
    const portionsInput = document.getElementById('calc-portions');
    const priceInput = document.getElementById('calc-price');
    const daysSelect = document.getElementById('calc-days');

    if (portionsInput) portionsInput.value = this.portionsPerDay;
    if (priceInput) priceInput.value = this.averagePrice;
    if (daysSelect) daysSelect.value = this.daysPerMonth;
  },

  bindEvents() {
    const portionsInput = document.getElementById('calc-portions');
    const priceInput = document.getElementById('calc-price');
    const daysSelect = document.getElementById('calc-days');

    if (portionsInput) {
      portionsInput.oninput = (e) => this.onPortionsChange(e.target.value);
      portionsInput.onchange = (e) => this.onPortionsChange(e.target.value);
    }

    if (priceInput) {
      priceInput.oninput = (e) => this.onPriceChange(e.target.value);
      priceInput.onchange = (e) => this.onPriceChange(e.target.value);
    }

    if (daysSelect) {
      daysSelect.onchange = (e) => this.onDaysChange(e.target.value);
    }
  },

  onPortionsChange(val) {
    this.portionsPerDay = Math.max(1, Math.min(50, parseInt(val) || 1));
    const input = document.getElementById('calc-portions');
    if (input && parseInt(input.value) !== this.portionsPerDay) input.value = this.portionsPerDay;
    
    const display = document.getElementById('calc-portions-val');
    if (display) display.textContent = `${this.portionsPerDay} platos/día`;
    
    this.calculate();
  },

  stepPortions(delta) {
    this.onPortionsChange(this.portionsPerDay + delta);
  },

  onPriceChange(val) {
    this.averagePrice = Math.max(8000, Math.min(100000, parseInt(val) || 8000));
    const input = document.getElementById('calc-price');
    if (input && parseInt(input.value) !== this.averagePrice) input.value = this.averagePrice;
    
    const display = document.getElementById('calc-price-val');
    if (display) display.textContent = this.formatCurrency(this.averagePrice);
    
    this.calculate();
  },

  stepPrice(delta) {
    this.onPriceChange(this.averagePrice + delta);
  },

  setPricePreset(presetValue) {
    this.onPriceChange(presetValue);
  },

  onDaysChange(val) {
    this.daysPerMonth = parseInt(val) || 26;
    this.calculate();
  },

  calculate() {
    // 1. Porciones mensuales y anuales
    const monthlyPortions = this.portionsPerDay * this.daysPerMonth;
    const annualPortions = monthlyPortions * 12;

    // 2. Pérdida actual al año (Costo directo de ingredientes botados a la basura)
    const unitFoodCost = this.averagePrice * this.foodCostRate;
    const annualLossCurrent = Math.round(annualPortions * unitFoodCost);

    // 3. Dinero recuperado con SalvaPlato
    const rescueSalePrice = this.averagePrice * (1 - this.discountRate);
    const grossIncomeMonthly = monthlyPortions * rescueSalePrice;
    const netIncomeMonthly = Math.round(grossIncomeMonthly * (1 - this.commissionRate));
    const netIncomeAnnual = netIncomeMonthly * 12;

    // 4. Clientes nuevos y CO2
    const newClientsMonthly = Math.round(monthlyPortions * 0.65);
    const newClientsAnnual = newClientsMonthly * 12;
    const co2SavedKg = Math.round(annualPortions * 1.8);

    // Actualizar números en el DOM
    this.setText('calc-annual-loss', `-$ ${this.formatRawNumber(annualLossCurrent)} COP`);
    this.setText('calc-monthly-net', `+$ ${this.formatRawNumber(netIncomeMonthly)} COP / mes`);
    this.setText('calc-annual-net', `+$ ${this.formatRawNumber(netIncomeAnnual)} COP / año`);
    this.setText('calc-portions-val', `${this.portionsPerDay} platos/día`);
    this.setText('calc-price-val', `$ ${this.formatRawNumber(this.averagePrice)} COP`);
    this.setText('calc-new-clients', `+${newClientsAnnual.toLocaleString('es-CO')} comensales nuevos/año`);
    this.setText('calc-co2-saved', `${co2SavedKg.toLocaleString('es-CO')} kg CO₂ evitados`);

    // Animación visual rápida de pulso
    const resultBox = document.getElementById('calc-annual-net');
    if (resultBox) {
      resultBox.classList.remove('scale-105');
      void resultBox.offsetWidth; // trigger reflow
      resultBox.classList.add('scale-105', 'transition-transform');
      setTimeout(() => resultBox.classList.remove('scale-105'), 180);
    }
  },

  formatRawNumber(val) {
    return new Intl.NumberFormat('es-CO').format(Math.round(val));
  },

  formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  },

  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
};

window.ROICalculator = ROICalculator;
