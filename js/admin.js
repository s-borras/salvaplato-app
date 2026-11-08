/**
 * SalvaPlato Colombia - Portal de Administración y Restaurantes (Comercios)
 * Lector / Escáner QR de comensales, Publicación en 10s, CRM de visitas,
 * Calculadora ROI y Gestión Integral de Franquicias y Sedes.
 */

const AdminApp = {
  currentMerchant: null,
  restaurants: [],
  vouchers: [],
  activeTab: 'franchises', // 'franchises', 'scanner', 'publisher', 'calculator', 'crm'
  videoStream: null,
  franchiseFilterQuery: '',

  init() {
    this.restaurants = SharedStore.getRestaurants(true);
    this.vouchers = SharedStore.getVouchers();
    this.loadMerchantSession();
    this.bindEvents();
    if (window.ROICalculator) ROICalculator.init();
  },

  loadMerchantSession() {
    const saved = localStorage.getItem('salvaplato_merchant_session');
    if (saved) {
      try {
        this.currentMerchant = JSON.parse(saved);
      } catch (e) {
        this.currentMerchant = null;
      }
    }
    this.checkAuthState();
  },

  checkAuthState() {
    const authScreen = document.getElementById('admin-auth-screen');
    const mainApp = document.getElementById('admin-main-app');

    if (!this.currentMerchant) {
      if (authScreen) authScreen.classList.remove('hidden');
      if (mainApp) mainApp.classList.add('hidden');
      this.populateRestaurantSelectLogin();
    } else {
      if (authScreen) authScreen.classList.add('hidden');
      if (mainApp) mainApp.classList.remove('hidden');
      this.updateMerchantUI();
      this.renderCurrentView();
    }
    if (window.lucide) lucide.createIcons();
  },

  populateRestaurantSelectLogin() {
    const select = document.getElementById('login-merchant-select');
    if (!select) return;

    const franchises = SharedStore.getFranchises();
    let html = '';

    franchises.forEach(fran => {
      if (fran.isActive === false) return;
      html += `<optgroup label="${fran.brandLogo} ${fran.name}">`;
      fran.sedes.forEach(s => {
        if (s.isActive === false) return;
        html += `<option value="${s.id}">${fran.name} - ${s.branchName} (${s.address})</option>`;
      });
      html += `</optgroup>`;
    });

    select.innerHTML = html || `<option value="corral-calle-85">El Corral - Sede Calle 85</option>`;
  },

  login(restaurantId, managerName) {
    this.restaurants = SharedStore.getRestaurants(true);
    const rest = this.restaurants.find(r => r.id === restaurantId) || this.restaurants[0];
    if (!rest) return;

    this.currentMerchant = {
      restaurantId: rest.id,
      restaurantName: rest.name,
      shortName: rest.shortName || rest.name,
      managerName: managerName || rest.contactName || "Administrador",
      branch: rest.address
    };

    localStorage.setItem('salvaplato_merchant_session', JSON.stringify(this.currentMerchant));
    this.checkAuthState();
    this.showToast(`¡Sesión iniciada como ${this.currentMerchant.restaurantName}!`);
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  loginDemo() {
    this.login('corral-calle-85', 'Carlos Rincón (Gerente de Turno)');
  },

  logout() {
    this.stopCamera();
    this.currentMerchant = null;
    localStorage.removeItem('salvaplato_merchant_session');
    this.checkAuthState();
    this.showToast('Sesión de restaurante cerrada');
  },

  updateMerchantUI() {
    if (!this.currentMerchant) return;
    const nameEl = document.getElementById('merchant-display-name');
    const branchEl = document.getElementById('merchant-display-branch');
    if (nameEl) nameEl.textContent = this.currentMerchant.restaurantName;
    if (branchEl) branchEl.textContent = this.currentMerchant.branch;

    // Métricas del restaurante
    this.vouchers = SharedStore.getVouchers();
    const redeemedOfThis = this.vouchers.filter(v => v.restaurantId === this.currentMerchant.restaurantId && v.status === 'redeemed');
    const totalRecoveredMoney = redeemedOfThis.reduce((sum, v) => sum + (v.discountedPrice * 0.82), 0) + 380000;
    const totalPortions = redeemedOfThis.length + 22;
    const totalCO2 = Math.round(totalPortions * 1.8);

    const statMoney = document.getElementById('admin-stat-money');
    const statPortions = document.getElementById('admin-stat-portions');
    const statCO2 = document.getElementById('admin-stat-co2');

    if (statMoney) statMoney.textContent = SharedStore.formatCurrency(totalRecoveredMoney);
    if (statPortions) statPortions.textContent = `${totalPortions} platos`;
    if (statCO2) statCO2.textContent = `${totalCO2} kg`;

    this.renderRedeemedHistory();
  },

  bindEvents() {
    // Formulario de Login de Comercio
    document.getElementById('form-merchant-login')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const restId = document.getElementById('login-merchant-select').value;
      const manager = document.getElementById('login-manager-name').value;
      this.login(restId, manager);
    });

    // Pestañas de navegación Admin
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setTab(e.currentTarget.dataset.tab);
      });
    });

    // Respaldo manual por PIN si la cámara no funciona
    document.getElementById('form-validate-pin')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = document.getElementById('input-pin-to-validate').value.trim();
      this.validatePIN(pin);
    });

    // Formulario Nueva Franquicia
    document.getElementById('form-new-franchise')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCreateFranchise(new FormData(e.target));
    });

    // Formulario Nueva Sede
    document.getElementById('form-new-sede')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCreateSede(new FormData(e.target));
    });

    // Formulario de Publicar Oferta Flash en 10s
    const formOffer = document.getElementById('form-create-flash-offer');
    if (formOffer) {
      formOffer.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreateOffer(new FormData(formOffer));
      });

      const origInput = document.getElementById('offer-orig-price');
      const discInput = document.getElementById('offer-disc-price');
      const preview = document.getElementById('offer-pct-preview');

      const calcPct = () => {
        const orig = parseFloat(origInput?.value) || 0;
        const disc = parseFloat(discInput?.value) || 0;
        if (orig > 0 && disc > 0 && orig > disc) {
          const pct = Math.round(((orig - disc) / orig) * 100);
          if (preview) preview.textContent = `-${pct}% OFF`;
        } else {
          if (preview) preview.textContent = `-0%`;
        }
      };

      if (origInput) origInput.addEventListener('input', calcPct);
      if (discInput) discInput.addEventListener('input', calcPct);
    }
  },

  setTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      const active = btn.dataset.tab === tab;
      btn.classList.toggle('bg-emerald-600', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('shadow-md', active);
      btn.classList.toggle('bg-slate-800', !active);
      btn.classList.toggle('text-slate-300', !active);
    });

    document.getElementById('sec-franchises')?.classList.toggle('hidden', tab !== 'franchises');
    document.getElementById('sec-scanner')?.classList.toggle('hidden', tab !== 'scanner');
    document.getElementById('sec-publisher')?.classList.toggle('hidden', tab !== 'publisher');
    document.getElementById('sec-calculator')?.classList.toggle('hidden', tab !== 'calculator');
    document.getElementById('sec-crm')?.classList.toggle('hidden', tab !== 'crm');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'franchises') this.renderFranchises();
    if (tab === 'crm') this.renderCRM();
    if (tab === 'publisher') this.renderActiveOffers();
    if (tab === 'calculator' && window.ROICalculator) {
      ROICalculator.init();
    }
    if (tab !== 'scanner') {
      this.stopCamera();
    }

    if (window.lucide) lucide.createIcons();
  },

  renderCurrentView() {
    this.renderFranchises();
    this.renderActiveOffers();
    this.renderCRM();
    this.renderRedeemedHistory();
  },

  // ==========================================================
  // 1. GESTIÓN DE FRANQUICIAS Y SEDES (ARQUITECTURA COMPLETA)
  // ==========================================================
  filterFranchises(query) {
    this.franchiseFilterQuery = (query || '').toLowerCase().trim();
    this.renderFranchises();
  },

  renderFranchises() {
    const container = document.getElementById('admin-franchises-list');
    if (!container) return;

    const franchises = SharedStore.getFranchises();

    // Contadores estadísticos
    const totalFran = franchises.length;
    let activeSedesCount = 0;
    let pausedSedesCount = 0;

    franchises.forEach(f => {
      f.sedes.forEach(s => {
        if (f.isActive !== false && s.isActive !== false) {
          activeSedesCount++;
        } else {
          pausedSedesCount++;
        }
      });
    });

    const elTotal = document.getElementById('fran-stat-total');
    const elActive = document.getElementById('fran-stat-active-sedes');
    const elPaused = document.getElementById('fran-stat-paused-sedes');

    if (elTotal) elTotal.textContent = `${totalFran} marcas`;
    if (elActive) elActive.textContent = `${activeSedesCount} sedes`;
    if (elPaused) elPaused.textContent = `${pausedSedesCount} sedes`;

    // Filtrar si el usuario está buscando en vivo
    const q = this.franchiseFilterQuery;
    const filtered = franchises.filter(f => {
      if (!q) return true;
      const matchName = f.name.toLowerCase().includes(q);
      const matchCat = (f.category || '').toLowerCase().includes(q);
      const matchSedes = f.sedes.some(s => 
        s.branchName.toLowerCase().includes(q) || 
        s.address.toLowerCase().includes(q) || 
        (s.zone || '').toLowerCase().includes(q)
      );
      return matchName || matchCat || matchSedes;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="bg-white p-8 rounded-3xl text-center border border-slate-100 shadow-sm space-y-2">
          <div class="text-3xl">🔍</div>
          <h4 class="font-bold text-slate-800 text-sm">No se encontraron franquicias</h4>
          <p class="text-xs text-slate-400">Intenta con otro término de búsqueda o agrega una nueva marca.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(fran => {
      const isFranActive = fran.isActive !== false;
      const activeSedesOfThis = fran.sedes.filter(s => s.isActive !== false).length;

      return `
        <div class="bg-white rounded-3xl border ${isFranActive ? 'border-slate-200 shadow-sm' : 'border-slate-300 bg-slate-50/80 opacity-75'} overflow-hidden transition-all duration-200">
          
          <!-- Cabecera de la Franquicia / Marca -->
          <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <img src="${fran.logoImage || 'assets/logos/default-restaurant.svg'}" onerror="if (!this.dataset.tried) { this.dataset.tried = '1'; this.src = this.src.includes('.svg') ? this.src.replace('.svg', '.png') : this.src.replace('.png', '.svg'); } else { this.src = 'assets/logos/default-restaurant.svg'; }" alt="${fran.name}" class="w-full h-full object-contain">
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-black text-slate-900 text-base leading-tight">${fran.name}</h4>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isFranActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                    ${isFranActive ? '🟢 Red Activa' : '⚪ Pausada en App'}
                  </span>
                  <span class="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    ${fran.category || 'Gastronomía'}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>⭐ <strong>${fran.rating || 4.8}</strong> (${fran.reviews || 100}+ reseñas)</span>
                  <span>•</span>
                  <span><strong>${fran.sedes.length} Sedes</strong> (${activeSedesOfThis} activas)</span>
                </div>
              </div>
            </div>

            <!-- Botones Maestros de la Franquicia -->
            <div class="flex items-center gap-1.5 self-end sm:self-auto shrink-0 flex-wrap">
              <!-- Switch Maestro: Pausar / Activar Toda la Franquicia -->
              <button 
                onclick="AdminApp.toggleFranchiseMaster('${fran.id}')"
                title="${isFranActive ? 'Pausar todas las sedes en la app' : 'Activar todas las sedes'}"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${isFranActive ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'}">
                <i data-lucide="${isFranActive ? 'pause-circle' : 'play-circle'}" class="w-3.5 h-3.5"></i>
                <span>${isFranActive ? 'Pausar Franquicia' : 'Activar Franquicia'}</span>
              </button>

              <!-- Botón Añadir Sede a esta Franquicia -->
              <button 
                onclick="AdminApp.openAddSedeModal('${fran.id}', '${fran.name}')"
                title="Añadir una nueva sede a esta marca"
                class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-600"></i>
                <span>+ Sede</span>
              </button>

              <!-- Botón Eliminar Franquicia Completa (Todo o Nada) -->
              <button 
                onclick="AdminApp.confirmDeleteFranchise('${fran.id}', '${fran.name}')"
                title="Eliminar marca y todas sus sedes de SalvaPlato"
                class="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl transition">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Listado de Sedes / Sucursales de la Franquicia -->
          <div class="p-3 bg-slate-50/60 space-y-2">
            <span class="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
              Puntos de Venta & Sedes Registradas:
            </span>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              ${fran.sedes.map(sede => {
                const isSedeActive = isFranActive && (sede.isActive !== false);

                return `
                  <div class="bg-white p-3 rounded-2xl border ${isSedeActive ? 'border-slate-200' : 'border-slate-200/60 bg-slate-100/50 opacity-70'} flex flex-col justify-between gap-2 shadow-xs">
                    <div>
                      <div class="flex items-start justify-between gap-1">
                        <div>
                          <div class="flex items-center gap-1.5">
                            <span class="font-black text-xs text-slate-900">${sede.branchName}</span>
                            <span class="text-[9px] font-bold px-1.5 py-0.2 rounded ${isSedeActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-500'}">
                              ${isSedeActive ? '🟢 Activa' : '⚪ Pausada'}
                            </span>
                          </div>
                          <p class="text-[11px] text-slate-600 font-medium mt-0.5">${sede.address}</p>
                          <p class="text-[10px] text-slate-400">${sede.zone || 'Bogotá'}</p>
                        </div>
                      </div>

                      <div class="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span>👤 ${sede.contactName || 'Administrador'}</span>
                        <a href="tel:${sede.contactPhone || ''}" class="text-emerald-700 font-bold hover:underline">
                          📞 ${sede.contactPhone || 'Sin tel'}
                        </a>
                      </div>
                    </div>

                    <!-- Controles de la Sede Individual -->
                    <div class="pt-1 flex items-center justify-end gap-1.5 border-t border-slate-100">
                      <button 
                        onclick="AdminApp.toggleSede('${fran.id}', '${sede.id}')"
                        class="px-2 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${sede.isActive !== false ? 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'}">
                        <span>${sede.isActive !== false ? 'Pausar Sede' : 'Activar Sede'}</span>
                      </button>

                      <button 
                        onclick="AdminApp.confirmDeleteSede('${fran.id}', '${sede.id}', '${sede.branchName}')"
                        class="p-1 text-slate-400 hover:text-red-600 rounded-md transition"
                        title="Eliminar solo esta sede">
                        <i data-lucide="trash" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  // Modal Agregar Franquicia
  openAddFranchiseModal() {
    document.getElementById('modal-add-franchise')?.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeAddFranchiseModal() {
    document.getElementById('modal-add-franchise')?.classList.add('hidden');
    document.getElementById('form-new-franchise')?.reset();
  },

  handleCreateFranchise(formData) {
    const name = formData.get('name')?.trim();
    const brandLogo = formData.get('brandLogo')?.trim() || '🍽️';
    const category = formData.get('category') || 'Gourmet';
    const openingHours = formData.get('openingHours') || '11:30 AM - 10:00 PM';
    const coverImage = formData.get('coverImage') || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80';
    
    // Primera Sede
    const branchName = formData.get('branchName') || 'Sede Principal';
    const zone = formData.get('zone') || 'Zona G / Chapinero';
    const address = formData.get('address') || 'Cra. 13 # 85-32, Bogotá';
    const contactName = formData.get('contactName') || 'Administrador General';
    const contactPhone = formData.get('contactPhone') || '+57 310 000 0000';

    // Primer Plato de Rescate
    const dishTitle = formData.get('dishTitle') || 'Combo Rescate Especial';
    const dishOrig = parseFloat(formData.get('dishOriginalPrice')) || 32000;
    const dishDisc = parseFloat(formData.get('dishDiscountedPrice')) || 16000;
    const discountPercent = Math.round(((dishOrig - dishDisc) / dishOrig) * 100);

    const franId = 'fran-' + Date.now();
    const sedeId = `${franId}-sede-1`;

    const newFranchise = {
      id: franId,
      name: name,
      brandLogo: brandLogo,
      category: category,
      tag: '✨ Nuevo Aliado SalvaPlato',
      rating: 5.0,
      reviews: 1,
      coverImage: coverImage,
      openingHours: openingHours,
      isActive: true,
      crmStatus: 'accepted',
      contactName: contactName,
      contactPhone: contactPhone,
      meetingNotes: `Franquicia aliada creada desde el portal de control. Sede principal: ${branchName}.`,
      menu: [
        {
          categoryName: '🌙 Rescate Nocturno / Cierre (50% a 70% OFF)',
          isRescue: true,
          items: [
            {
              id: `${franId}-rec-1`,
              title: dishTitle,
              description: 'Excedente gourmet del día en perfecto estado listo para recoger. ¡Salva este alimento!',
              originalPrice: dishOrig,
              discountedPrice: dishDisc,
              discountPercent: discountPercent,
              tier: 'rescue',
              stock: 4,
              pickupWindow: 'Hoy 8:30 PM - 9:45 PM',
              type: 'rescue',
              shift: 'night',
              image: coverImage
            }
          ]
        },
        {
          categoryName: '⭐ Platos en Carta (15% OFF)',
          isRescue: false,
          items: [
            {
              id: `${franId}-reg-1`,
              title: `${dishTitle} (Plato Fuerte en Mesa)`,
              description: 'Preparación fresca del día con ingredientes seleccionados.',
              originalPrice: dishOrig,
              discountedPrice: Math.round(dishOrig * 0.85),
              discountPercent: 15,
              tier: 'main15',
              stock: 20,
              pickupWindow: 'Todo el día en local',
              type: 'permanent',
              shift: 'all',
              image: coverImage
            }
          ]
        }
      ],
      sedes: [
        {
          id: sedeId,
          branchName: branchName,
          address: address,
          zone: zone,
          distance: '350 m',
          contactName: contactName,
          contactPhone: contactPhone,
          isActive: true
        }
      ]
    };

    SharedStore.addFranchise(newFranchise);
    this.closeAddFranchiseModal();
    this.populateRestaurantSelectLogin();
    this.renderFranchises();
    this.showToast(`¡Franquicia "${name}" registrada y activa con sus sedes!`);
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  // Modal Agregar Sede
  openAddSedeModal(franchiseId, franchiseName) {
    const modal = document.getElementById('modal-add-sede');
    const inputId = document.getElementById('input-sede-franchise-id');
    const sub = document.getElementById('modal-add-sede-brand-subtitle');

    if (inputId) inputId.value = franchiseId;
    if (sub) sub.textContent = franchiseName || 'Franquicia';
    if (modal) modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeAddSedeModal() {
    document.getElementById('modal-add-sede')?.classList.add('hidden');
    document.getElementById('form-new-sede')?.reset();
  },

  handleCreateSede(formData) {
    const franchiseId = formData.get('franchiseId');
    const branchName = formData.get('branchName')?.trim();
    const zone = formData.get('zone');
    const address = formData.get('address')?.trim();
    const contactName = formData.get('contactName')?.trim() || 'Administrador de Sede';
    const contactPhone = formData.get('contactPhone')?.trim() || '+57 310 000 0000';

    if (!franchiseId || !branchName || !address) {
      this.showToast('Por favor completa todos los campos de la sede');
      return;
    }

    const newSede = {
      id: `${franchiseId}-sede-${Date.now()}`,
      branchName: branchName,
      address: address,
      zone: zone,
      distance: '450 m',
      contactName: contactName,
      contactPhone: contactPhone,
      isActive: true
    };

    SharedStore.addSede(franchiseId, newSede);
    this.closeAddSedeModal();
    this.populateRestaurantSelectLogin();
    this.renderFranchises();
    this.showToast(`¡Sede "${branchName}" añadida con éxito!`);
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  toggleFranchiseMaster(franchiseId) {
    const updated = SharedStore.toggleFranchiseActive(franchiseId);
    if (!updated) return;

    this.populateRestaurantSelectLogin();
    this.renderFranchises();
    const statusMsg = updated.isActive !== false ? 'ACTIVADA' : 'PAUSADA';
    this.showToast(`Franquicia ${updated.name}: ${statusMsg} en la aplicación`);
  },

  confirmDeleteFranchise(franchiseId, franchiseName) {
    const ok = confirm(`¿Estás seguro de ELIMINAR la franquicia "${franchiseName}" y TODAS sus sedes?\n\nEsta acción quitará por completo la marca y sus menús de SalvaPlato.`);
    if (!ok) return;

    SharedStore.deleteFranchise(franchiseId);
    this.populateRestaurantSelectLogin();
    this.renderFranchises();
    this.showToast(`Franquicia "${franchiseName}" y sus sedes fueron eliminadas.`);
  },

  toggleSede(franchiseId, sedeId) {
    const updated = SharedStore.toggleSedeActive(franchiseId, sedeId);
    if (!updated) return;

    this.populateRestaurantSelectLogin();
    this.renderFranchises();
    const statusMsg = updated.isActive !== false ? 'ACTIVADA' : 'PAUSADA';
    this.showToast(`Sede ${updated.branchName}: ${statusMsg}`);
  },

  confirmDeleteSede(franchiseId, sedeId, branchName) {
    const ok = confirm(`¿Eliminar la "${branchName}" de esta franquicia?`);
    if (!ok) return;

    SharedStore.deleteSede(franchiseId, sedeId);
    this.populateRestaurantSelectLogin();
    this.renderFranchises();
    this.showToast(`Sede "${branchName}" eliminada.`);
  },

  resetToDefaultDemoData() {
    const ok = confirm(`¿Deseas restaurar el catálogo completo con las 12 franquicias predeterminadas (Crepes, El Corral, Wok, Pan Pa' Ya, Masa, Home Burgers, Archies, etc.) y todas sus sedes en Bogotá?`);
    if (!ok) return;

    SharedStore.resetToDefaultData();
    this.populateRestaurantSelectLogin();
    this.renderFranchises();
    this.showToast('¡Catálogo completo de 12 franquicias restaurado con éxito!');
  },

  // ==========================================================
  // 2. ESCÁNER QR DE COMENSALES (CÁMARA / DETECTOR ÓPTICO)
  // ==========================================================
  toggleCamera() {
    if (this.videoStream) {
      this.stopCamera();
    } else {
      this.startCamera();
    }
  },

  startCamera() {
    const video = document.getElementById('scanner-video-preview');
    const placeholder = document.getElementById('scanner-placeholder-icon');
    const laser = document.getElementById('scanner-laser-beam');
    const btnText = document.getElementById('btn-camera-text');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.showToast('La cámara no es compatible con este navegador.');
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.videoStream = stream;
        if (video) {
          video.srcObject = stream;
          video.classList.remove('hidden');
          video.play();
        }
        if (placeholder) placeholder.classList.add('hidden');
        if (laser) laser.classList.remove('hidden');
        if (btnText) btnText.textContent = 'Apagar Cámara';
        this.showToast('Cámara activada para escaneo');
      })
      .catch(err => {
        console.error('Error al acceder a la cámara:', err);
        this.showToast('No se pudo acceder a la cámara. Usa el PIN de 4 dígitos.');
      });
  },

  stopCamera() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
    const video = document.getElementById('scanner-video-preview');
    const placeholder = document.getElementById('scanner-placeholder-icon');
    const btnText = document.getElementById('btn-camera-text');

    if (video) {
      video.pause();
      video.srcObject = null;
      video.classList.add('hidden');
    }
    if (placeholder) placeholder.classList.remove('hidden');
    if (btnText) btnText.textContent = 'Activar Cámara del Celular / Tablet';
  },

  simulateScanLatestVoucher() {
    this.vouchers = SharedStore.getVouchers();
    const pendingVoucher = this.vouchers.find(v => v.status === 'active');

    if (!pendingVoucher) {
      this.showToast('No hay cupones activos de clientes para escanear en este momento.');
      return;
    }

    this.validateVoucher(pendingVoucher);
  },

  validatePIN(pin) {
    if (!pin) {
      this.showToast('Ingresa el PIN de 4 dígitos');
      return;
    }

    this.vouchers = SharedStore.getVouchers();
    const voucher = this.vouchers.find(v => v.pin === pin);

    if (!voucher) {
      this.showToast('❌ PIN incorrecto o inexistente.');
      return;
    }

    if (voucher.status === 'redeemed') {
      this.showToast('⚠️ Este cupón ya fue redimido anteriormente.');
      return;
    }

    this.validateVoucher(voucher);
    const pinInput = document.getElementById('input-pin-to-validate');
    if (pinInput) pinInput.value = '';
  },

  validateVoucher(voucher) {
    voucher.status = 'redeemed';
    voucher.redeemedAt = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    SharedStore.saveVouchers(this.vouchers);

    // Notificación en tiempo real para cliente.html (BroadcastChannel + localStorage timestamp)
    try {
      localStorage.setItem('salvaplato_last_sync_event', JSON.stringify({
        type: 'VOUCHER_REDEEMED',
        voucherId: voucher.id,
        timestamp: Date.now()
      }));
      if (window.BroadcastChannel) {
        const ch = new BroadcastChannel('salvaplato_realtime_sync');
        ch.postMessage({ type: 'VOUCHER_REDEEMED', voucherId: voucher.id, timestamp: Date.now() });
        ch.close();
      }
    } catch (e) {
      console.warn('Realtime sync broadcast warning:', e);
    }

    this.updateMerchantUI();
    this.showValidationSuccessModal(voucher);

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast(`¡Bono validado con éxito! #${voucher.id.slice(-6)}`);
  },

  showValidationSuccessModal(voucher) {
    const modal = document.getElementById('admin-validation-modal');
    const content = document.getElementById('admin-validation-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white text-center space-y-2">
        <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
          <i data-lucide="check" class="w-8 h-8 text-white"></i>
        </div>
        <span class="text-[10px] font-black tracking-wider uppercase bg-white/20 px-2.5 py-0.5 rounded-full">Validación Exitosa</span>
        <h3 class="text-xl font-black">¡Bono Redimido!</h3>
        <p class="text-xs text-emerald-100">Entrega el pedido al comensal</p>
      </div>

      <div class="p-5 space-y-3.5 text-xs">
        <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
          <div class="flex justify-between text-slate-500">
            <span>Plato / Paquete:</span>
            <span class="font-bold text-slate-800 text-right">${voucher.itemTitle}</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>Cliente:</span>
            <span class="font-bold text-slate-800">${voucher.userName || 'Comensal'}</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>Método de Pago:</span>
            <span class="font-bold text-emerald-700">${voucher.paymentMethod || 'Tarjeta'}</span>
          </div>
          <div class="flex justify-between text-slate-500 border-t border-slate-200 pt-1.5 font-bold">
            <span class="text-slate-800">Total a cobrar en caja:</span>
            <span class="text-sm font-black text-slate-900">${voucher.paymentMethod?.includes('Local') ? SharedStore.formatCurrency(voucher.discountedPrice) : '$ 0 COP (Ya pagado)'}</span>
          </div>
        </div>

        <button 
          onclick="document.getElementById('admin-validation-modal').classList.add('hidden')"
          class="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-lg transition">
          Listo, Siguiente Cliente
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  renderRedeemedHistory() {
    const container = document.getElementById('merchant-redeemed-history');
    if (!container) return;

    this.vouchers = SharedStore.getVouchers();
    const redeemed = this.vouchers.filter(v => v.status === 'redeemed');

    if (redeemed.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-400 italic py-2">Aún no se han escaneado cupones hoy.</p>`;
      return;
    }

    container.innerHTML = redeemed.slice(-5).reverse().map(v => `
      <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
        <div>
          <span class="font-bold text-slate-800 block">${v.itemTitle}</span>
          <span class="text-[10px] text-slate-400">PIN: ${v.pin} • Hora: ${v.redeemedAt || 'Hoy'}</span>
        </div>
        <span class="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          ${SharedStore.formatCurrency(v.discountedPrice)}
        </span>
      </div>
    `).join('');
  },

  // ==========================================================
  // 3. PUBLICAR OFERTA FLASH EN 10 SEGUNDOS
  // ==========================================================
  handleCreateOffer(formData) {
    if (!this.currentMerchant) return;

    const title = formData.get('title');
    const origPrice = parseFloat(formData.get('originalPrice')) || 0;
    const discPrice = parseFloat(formData.get('discountedPrice')) || 0;
    const stock = parseInt(formData.get('stock')) || 3;
    const windowPickup = formData.get('pickupWindow') || 'Hoy 8:45 PM - 9:45 PM';

    if (!title || origPrice <= 0 || discPrice <= 0) {
      this.showToast('Por favor completa todos los campos del plato.');
      return;
    }

    const discountPercent = Math.round(((origPrice - discPrice) / origPrice) * 100);

    const franchises = SharedStore.getFranchises();
    // Buscar la franquicia a la que pertenece esta sede
    const currentFran = franchises.find(f => 
      f.sedes.some(s => s.id === this.currentMerchant.restaurantId)
    ) || franchises[0];

    if (!currentFran) return;

    const newOffer = {
      id: `${currentFran.id}-flash-${Date.now()}`,
      title: title,
      tier: 'rescue',
      description: `Excedente del día en perfecto estado listo para recoger. ¡Salva este alimento!`,
      originalPrice: origPrice,
      discountedPrice: discPrice,
      discountPercent: discountPercent,
      stock: stock,
      pickupWindow: windowPickup,
      type: 'rescue',
      shift: 'night',
      image: currentFran.coverImage || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
    };

    if (currentFran.menu[0]) {
      currentFran.menu[0].items.unshift(newOffer);
    }
    SharedStore.saveFranchises(franchises);

    document.getElementById('form-create-flash-offer')?.reset();
    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast('¡Oferta Flash publicada con éxito!');
    this.renderActiveOffers();
  },

  renderActiveOffers() {
    const container = document.getElementById('merchant-active-offers-list');
    if (!container || !this.currentMerchant) return;

    const franchises = SharedStore.getFranchises();
    const currentFran = franchises.find(f => 
      f.sedes.some(s => s.id === this.currentMerchant.restaurantId)
    ) || franchises[0];

    if (!currentFran) return;

    let rescueItems = [];
    currentFran.menu.forEach(c => {
      c.items.forEach(it => {
        if (it.type === 'rescue') rescueItems.push(it);
      });
    });

    if (rescueItems.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-400 italic">No tienes ofertas de rescate activas en este momento.</p>`;
      return;
    }

    container.innerHTML = rescueItems.map(o => `
      <div class="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
        <div>
          <span class="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">Rescate Flash</span>
          <h5 class="font-bold text-slate-800 text-sm mt-0.5">${o.title}</h5>
          <div class="text-slate-500 flex items-center gap-2 mt-1">
            <span>Stock: <strong>${o.stock} porciones</strong></span>
            <span>•</span>
            <span class="text-emerald-700 font-bold">${SharedStore.formatCurrency(o.discountedPrice)}</span>
            <span class="line-through text-slate-400">${SharedStore.formatCurrency(o.originalPrice)}</span>
          </div>
        </div>
        <button onclick="AdminApp.adjustStock('${currentFran.id}', '${o.id}', 1)" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold">
          +1 Porción
        </button>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  adjustStock(franId, offerId, delta) {
    const franchises = SharedStore.getFranchises();
    const fran = franchises.find(f => f.id === franId);
    if (!fran) return;

    let target = null;
    fran.menu.forEach(c => {
      const it = c.items.find(i => i.id === offerId);
      if (it) target = it;
    });

    if (!target) return;
    target.stock = Math.max(0, target.stock + delta);
    SharedStore.saveFranchises(franchises);
    this.renderActiveOffers();
    this.showToast(`Stock actualizado: ${target.stock} porciones`);
  },

  // ==========================================================
  // 4. BITÁCORA COMERCIAL Y CRM
  // ==========================================================
  renderCRM() {
    const container = document.getElementById('admin-crm-list');
    if (!container) return;

    const franchises = SharedStore.getFranchises();
    const totalCount = franchises.length;
    const acceptedCount = franchises.filter(r => r.crmStatus === 'accepted').length;
    const pendingCount = franchises.filter(r => r.crmStatus === 'pending').length;

    const elTotal = document.getElementById('crm-stat-total');
    const elAccepted = document.getElementById('crm-stat-accepted');
    const elPending = document.getElementById('crm-stat-pending');

    if (elTotal) elTotal.textContent = totalCount;
    if (elAccepted) elAccepted.textContent = acceptedCount;
    if (elPending) elPending.textContent = pendingCount;

    container.innerHTML = franchises.map(r => {
      const badgeConfig = {
        accepted: { label: '✅ Aceptó Piloto', class: 'crm-badge-accepted' },
        pitch: { label: '📋 Propuesta Presentada', class: 'crm-badge-pitch' },
        pending: { label: '⏳ Pendiente de Visita', class: 'crm-badge-pending' },
        rejected: { label: '❌ Rechazó', class: 'crm-badge-rejected' }
      }[r.crmStatus || 'pending'];

      return `
        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <img src="${r.logoImage || 'assets/logos/default-restaurant.svg'}" onerror="if (!this.dataset.tried) { this.dataset.tried = '1'; this.src = this.src.includes('.svg') ? this.src.replace('.svg', '.png') : this.src.replace('.png', '.svg'); } else { this.src = 'assets/logos/default-restaurant.svg'; }" alt="${r.name}" class="w-full h-full object-contain">
              </div>
              <div>
                <h4 class="font-black text-slate-800 text-sm leading-tight">${r.name}</h4>
                <span class="text-[11px] text-slate-500">${r.sedes.length} Sedes en Bogotá</span>
              </div>
            </div>

            <select 
              onchange="AdminApp.updateCRMStatus('${r.id}', this.value)"
              class="text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer focus:ring-2 focus:ring-emerald-500 ${badgeConfig.class}">
              <option value="pending" ${r.crmStatus === 'pending' ? 'selected' : ''}>⏳ Pendiente</option>
              <option value="pitch" ${r.crmStatus === 'pitch' ? 'selected' : ''}>📋 Presentado</option>
              <option value="accepted" ${r.crmStatus === 'accepted' ? 'selected' : ''}>✅ Aceptó Piloto</option>
              <option value="rejected" ${r.crmStatus === 'rejected' ? 'selected' : ''}>❌ Rechazó</option>
            </select>
          </div>

          <div class="bg-slate-50 p-3 rounded-xl space-y-2 text-xs">
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1 font-semibold">
                <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-600"></i>
                <span>${r.contactName || 'Sin contacto registrado'}</span>
              </span>
              <a href="tel:${r.contactPhone || ''}" class="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                <span>${r.contactPhone || 'Llamar'}</span>
              </a>
            </div>

            <div class="pt-1 border-t border-slate-200">
              <span class="text-[10px] font-bold text-slate-400 block mb-0.5">Notas de la reunión comercial:</span>
              <p class="text-slate-700 text-xs italic bg-white p-2 rounded-lg border border-slate-100">
                "${r.meetingNotes || 'Aún no visitado.'}"
              </p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  updateCRMStatus(franId, newStatus) {
    const franchises = SharedStore.getFranchises();
    const rest = franchises.find(r => r.id === franId);
    if (!rest) return;

    rest.crmStatus = newStatus;
    SharedStore.saveFranchises(franchises);
    this.renderCRM();
    this.showToast(`${rest.name}: Estado comercial actualizado`);
  },

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 bg-slate-900 text-white transition-all duration-300`;
    toast.innerHTML = `
      <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();
});
