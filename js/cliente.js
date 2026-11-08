/**
 * SalvaPlato Colombia - Aplicación Cliente (Comensal)
 * Selector de Dirección estilo Rappi, Tarjetas Débito/Crédito, QR Real Escaneable y Descuentos Escalonados
 */

const DEFAULT_ADDRESSES = [
  {
    id: "addr-1",
    tag: "Casa",
    icon: "home",
    line1: "Cra. 13 # 85-32, Apto 502",
    zone: "Zona Rosa / Chapinero",
    lat: 4.6685,
    lng: -74.0538,
    notes: "Timbre 502, portería 24h"
  },
  {
    id: "addr-2",
    tag: "Trabajo",
    icon: "briefcase",
    line1: "Calle 72 # 9-45, Torre B, Piso 8",
    zone: "Centro Financiero",
    lat: 4.6565,
    lng: -74.0585,
    notes: "Dejar en recepción"
  },
  {
    id: "addr-3",
    tag: "Parque 93",
    icon: "map-pin",
    line1: "Cra. 11A # 93-42",
    zone: "Chicó Norte / Parque 93",
    lat: 4.6765,
    lng: -74.0485,
    notes: "Cerca al parque central"
  },
  {
    id: "addr-4",
    tag: "Usaquén",
    icon: "map-pin",
    line1: "Calle 119 # 6A-15",
    zone: "Usaquén Colonial",
    lat: 4.6935,
    lng: -74.0325,
    notes: "Frente a la plaza"
  }
];

const DEFAULT_USER_CARDS = [
  {
    id: "crd-1",
    brand: "visa",
    brandName: "Visa Débito Bancolombia",
    numberLast4: "4589",
    holder: "JUAN C PEREZ",
    expiry: "09/28",
    cardType: "Débito",
    bank: "Bancolombia",
    isDefault: true
  },
  {
    id: "crd-2",
    brand: "mastercard",
    brandName: "Mastercard Davivienda",
    numberLast4: "8821",
    holder: "JUAN C PEREZ",
    expiry: "11/27",
    cardType: "Crédito",
    bank: "Davivienda",
    isDefault: false
  }
];

const ClienteApp = {
  currentUser: null,
  restaurants: [],
  vouchers: [],
  cart: [],
  addresses: [],
  userCards: [],
  activeAddress: null,
  selectedPaymentMethod: 'card', // 'card', 'nequi', 'daviplata', 'in_store', 'salvacoins'
  selectedCardId: null,
  activeCategory: 'all',
  activeShift: 'all',
  onlyAcceptedFilter: false,
  activeTab: 'feed',
  viewMode: 'list', // 'list' | 'map'
  distanceFilter: 'all', // 'all' | '1km' | '3km' | '5km'
  leafletMap: null,
  mapMarkers: [],
  userMapMarker: null,
  voucherFilter: 'active', // 'active', 'redeemed', 'cancelled'
  activeTicketVoucherId: null,
  ticketTimerInterval: null,
  ticketSyncInterval: null,
  realtimeChannel: null,
  currentRatingStars: 5,
  selectedRatingChips: [],
  currentStoreRestaurant: null,
  timerInterval: null,
  searchQuery: '',

  init() {
    this.restaurants = SharedStore.getRestaurants();
    this.vouchers = SharedStore.getVouchers();
    this.loadAddresses();
    this.loadUserCards();
    this.loadUser();
    this.bindEvents();
    this.recalculateDistances();
    this.updateClockDisplay();
    this.updateCartUI();
    this.startCountdownTimers();
    this.initRealtimeSync();
  },

  initRealtimeSync() {
    // 1. Escuchar eventos de almacenamiento entre pestañas
    window.addEventListener('storage', (e) => {
      if (e.key === 'salvaplato_vouchers' || e.key === 'salvaplato_last_sync_event') {
        this.checkLiveTicketUpdate();
      }
    });

    // 2. BroadcastChannel para sincronización inmediata sin latencia
    if (window.BroadcastChannel) {
      try {
        this.realtimeChannel = new BroadcastChannel('salvaplato_realtime_sync');
        this.realtimeChannel.onmessage = (msg) => {
          if (msg.data?.type === 'VOUCHER_REDEEMED') {
            this.checkLiveTicketUpdate(msg.data.voucherId);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel no disponible:', err);
      }
    }
  },

  checkLiveTicketUpdate(targetVoucherId) {
    this.vouchers = SharedStore.getVouchers();
    this.renderMyVouchers();

    if (!this.activeTicketVoucherId) return;
    const currentId = targetVoucherId || this.activeTicketVoucherId;
    if (this.activeTicketVoucherId === currentId) {
      const v = this.vouchers.find(item => item.id === currentId);
      if (v && v.status === 'redeemed') {
        this.handleVoucherRedeemedLive(v.id);
      }
    }
  },

  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.renderFeed();
  },

  // ==========================================================
  // 1. GESTIÓN DE TARJETAS DÉBITO Y CRÉDITO (ERROR 2 SOLUCIONADO)
  // ==========================================================
  loadUserCards() {
    const saved = localStorage.getItem('salvaplato_user_cards');
    if (saved) {
      try {
        this.userCards = JSON.parse(saved);
      } catch(e) {
        this.userCards = DEFAULT_USER_CARDS;
      }
    } else {
      this.userCards = DEFAULT_USER_CARDS;
      localStorage.setItem('salvaplato_user_cards', JSON.stringify(this.userCards));
    }
    const def = this.userCards.find(c => c.isDefault) || this.userCards[0];
    this.selectedCardId = def?.id || null;
  },

  saveUserCards() {
    localStorage.setItem('salvaplato_user_cards', JSON.stringify(this.userCards));
  },

  openCardModal() {
    const modal = document.getElementById('card-management-modal');
    const list = document.getElementById('user-cards-list');
    if (!modal || !list) return;

    list.innerHTML = this.userCards.map(c => `
      <div onclick="ClienteApp.setDefaultCard('${c.id}')" class="p-3.5 rounded-2xl border ${this.selectedCardId === c.id ? 'border-emerald-500 bg-emerald-50/70 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'} cursor-pointer transition flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl ${c.brand === 'visa' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'} flex items-center justify-center font-black text-xs">
            ${c.brand === 'visa' ? 'VISA' : 'MC'}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-800 text-xs">${c.brandName}</span>
              ${this.selectedCardId === c.id ? '<span class="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">PREDETERMINADA</span>' : ''}
            </div>
            <p class="text-xs text-slate-500 font-mono">•••• •••• •••• ${c.numberLast4}</p>
            <p class="text-[10px] text-slate-400">Vence: ${c.expiry} • ${c.holder}</p>
          </div>
        </div>
        <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600 ${this.selectedCardId === c.id ? '' : 'opacity-0'}"></i>
      </div>
    `).join('');

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeCardModal() {
    document.getElementById('card-management-modal')?.classList.add('hidden');
  },

  setDefaultCard(cardId) {
    this.selectedCardId = cardId;
    this.userCards.forEach(c => c.isDefault = (c.id === cardId));
    this.saveUserCards();
    this.openCardModal();
    this.showToast('Tarjeta seleccionada como principal');
  },

  handleCardNumberInput(input, badgeId) {
    if (!input) return;
    let digits = input.value.replace(/\D/g, '').slice(0, 16);
    let formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    input.value = formatted;

    const badge = document.getElementById(badgeId);
    if (badge) {
      if (digits.startsWith('4')) {
        badge.textContent = 'VISA';
        badge.className = 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-600 text-white';
      } else if (digits.startsWith('5') || digits.startsWith('2')) {
        badge.textContent = 'MASTERCARD';
        badge.className = 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-red-600 text-white';
      } else if (digits.startsWith('3')) {
        badge.textContent = 'AMEX';
        badge.className = 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-600 text-white';
      } else {
        badge.textContent = 'AUTO';
        badge.className = 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700';
      }
    }
  },

  handleExpiryInput(input) {
    if (!input) return;
    let digits = input.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      input.value = digits.slice(0, 2) + '/' + digits.slice(2);
    } else {
      input.value = digits;
    }
  },

  selectPaymentCard(cardId) {
    this.selectedPaymentMethod = 'card';
    this.selectedCardId = cardId;
    this.openCheckoutModal();
  },

  toggleCheckoutNewCardForm(forceState) {
    const box = document.getElementById('checkout-new-card-form');
    if (!box) return;
    const shouldShow = (typeof forceState === 'boolean') ? forceState : box.classList.contains('hidden');
    if (shouldShow) {
      box.classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('checkout-card-number')?.focus();
      }, 50);
    } else {
      box.classList.add('hidden');
    }
    if (window.lucide) lucide.createIcons();
  },

  saveNewCardFromCheckout() {
    const numEl = document.getElementById('checkout-card-number');
    const holderEl = document.getElementById('checkout-card-holder');
    const expEl = document.getElementById('checkout-card-expiry');
    const cvvEl = document.getElementById('checkout-card-cvv');
    const bankEl = document.getElementById('checkout-card-bank');
    const typeRadio = document.querySelector('input[name="checkoutCardType"]:checked');

    const rawNumber = (numEl?.value || '').replace(/\D/g, '');
    const holder = (holderEl?.value || '').trim().toUpperCase();
    const expiry = (expEl?.value || '').trim();
    const cvv = (cvvEl?.value || '').trim();
    const bank = bankEl?.value || 'Bancolombia';
    const cardType = typeRadio?.value || 'Débito';

    if (rawNumber.length < 15) {
      this.showToast('Digita los 16 dígitos de la tarjeta');
      numEl?.focus();
      return;
    }
    if (!holder || holder.length < 3) {
      this.showToast('Digita el nombre del titular como figura en el plástico');
      holderEl?.focus();
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      this.showToast('Vencimiento inválido. Usa formato MM/AA (ej. 09/28)');
      expEl?.focus();
      return;
    }
    if (cvv.length < 3) {
      this.showToast('Digita el código CVV (3 o 4 dígitos al reverso)');
      cvvEl?.focus();
      return;
    }

    let brand = 'visa';
    if (rawNumber.startsWith('5') || rawNumber.startsWith('2')) brand = 'mastercard';
    else if (rawNumber.startsWith('3')) brand = 'amex';

    const last4 = rawNumber.slice(-4);
    const brandLabel = brand === 'visa' ? 'Visa' : (brand === 'mastercard' ? 'Mastercard' : 'Amex');
    const brandName = `${brandLabel} ${cardType} ${bank}`;

    const newCard = {
      id: 'crd-' + Date.now(),
      brand: brand,
      brandName: brandName,
      numberLast4: last4,
      holder: holder,
      expiry: expiry,
      cardType: cardType,
      bank: bank,
      isDefault: true
    };

    this.userCards.forEach(c => c.isDefault = false);
    this.userCards.unshift(newCard);
    this.selectedCardId = newCard.id;
    this.selectedPaymentMethod = 'card';
    this.saveUserCards();

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast(`¡Tarjeta ${brandLabel} agregada y seleccionada!`);
    this.openCheckoutModal();
  },

  addNewCard(formData) {
    const rawNumber = (formData.get('cardNumber') || '').replace(/\D/g, '');
    const holder = (formData.get('cardHolder') || '').trim().toUpperCase();
    const expiry = (formData.get('cardExpiry') || '').trim();
    const bank = formData.get('cardBank') || 'Bancolombia';
    const cardType = formData.get('cardType') || 'Débito';

    if (rawNumber.length < 15 || !holder || !expiry) {
      this.showToast('Por favor completa todos los datos de la tarjeta');
      return;
    }

    let brand = 'visa';
    if (rawNumber.startsWith('5') || rawNumber.startsWith('2')) brand = 'mastercard';
    else if (rawNumber.startsWith('3')) brand = 'amex';

    const last4 = rawNumber.slice(-4);
    const brandLabel = brand === 'visa' ? 'Visa' : (brand === 'mastercard' ? 'Mastercard' : 'Amex');
    const brandName = `${brandLabel} ${cardType} ${bank}`;

    const newCard = {
      id: 'crd-' + Date.now(),
      brand: brand,
      brandName: brandName,
      numberLast4: last4,
      holder: holder,
      expiry: expiry,
      cardType: cardType,
      bank: bank,
      isDefault: true
    };

    this.userCards.forEach(c => c.isDefault = false);
    this.userCards.unshift(newCard);
    this.selectedCardId = newCard.id;
    this.saveUserCards();

    document.getElementById('form-new-card')?.reset();
    document.getElementById('new-card-form-box')?.classList.add('hidden');
    this.openCardModal();
    this.showToast('¡Tarjeta agregada y lista para pagar!');
  },

  // ==========================================================
  // 2. GESTIÓN DE DIRECCIONES
  // ==========================================================
  loadAddresses() {
    const saved = localStorage.getItem('salvaplato_addresses');
    if (saved) {
      try {
        this.addresses = JSON.parse(saved);
      } catch(e) {
        this.addresses = DEFAULT_ADDRESSES;
      }
    } else {
      this.addresses = DEFAULT_ADDRESSES;
      localStorage.setItem('salvaplato_addresses', JSON.stringify(this.addresses));
    }

    const savedActive = localStorage.getItem('salvaplato_active_address_id');
    this.activeAddress = this.addresses.find(a => a.id === savedActive) || this.addresses[0];
    this.updateAddressHeaderUI();
  },

  updateAddressHeaderUI() {
    const label = document.getElementById('current-address-label');
    const sub = document.getElementById('current-address-sub');
    if (label && this.activeAddress) {
      label.textContent = `${this.activeAddress.tag}: ${this.activeAddress.line1}`;
    }
    if (sub && this.activeAddress) {
      sub.textContent = `${this.activeAddress.zone} • Bogotá`;
    }
  },

  setActiveAddress(addressId) {
    const found = this.addresses.find(a => a.id === addressId);
    if (!found) return;
    this.activeAddress = found;
    localStorage.setItem('salvaplato_active_address_id', found.id);
    this.updateAddressHeaderUI();
    this.closeAddressModal();
    this.recalculateDistances();
    this.showToast(`Ubicación cambiada a: ${found.tag} (${found.zone})`);
  },

  ZONE_COORDS: {
    'andino': { lat: 4.6670, lng: -74.0525 },
    'zona rosa': { lat: 4.6685, lng: -74.0538 },
    'calle 85': { lat: 4.6682, lng: -74.0535 },
    'calle 82': { lat: 4.6668, lng: -74.0530 },
    'calle 81': { lat: 4.6660, lng: -74.0520 },
    'parque 93': { lat: 4.6765, lng: -74.0485 },
    'chico': { lat: 4.6740, lng: -74.0495 },
    'calle 90': { lat: 4.6725, lng: -74.0510 },
    'zona g': { lat: 4.6540, lng: -74.0550 },
    'calle 70': { lat: 4.6550, lng: -74.0560 },
    'calle 69': { lat: 4.6535, lng: -74.0545 },
    'chapinero': { lat: 4.6520, lng: -74.0580 },
    'quinta camacho': { lat: 4.6565, lng: -74.0575 },
    'usaquen': { lat: 4.6935, lng: -74.0325 },
    'calle 119': { lat: 4.6930, lng: -74.0320 },
    'calle 120': { lat: 4.6945, lng: -74.0330 },
    'calle 118': { lat: 4.6920, lng: -74.0315 },
    'pepe sierra': { lat: 4.6980, lng: -74.0430 },
    'calle 116': { lat: 4.6975, lng: -74.0425 },
    'santa barbara': { lat: 4.7015, lng: -74.0415 },
    'calle 122': { lat: 4.7020, lng: -74.0410 },
    'unicentro': { lat: 4.7025, lng: -74.0420 },
    'salitre': { lat: 4.6515, lng: -74.1035 },
    'gran estacion': { lat: 4.6525, lng: -74.1040 },
    'calle 26': { lat: 4.6520, lng: -74.1030 },
    'galerias': { lat: 4.6415, lng: -74.0725 },
    'teusaquillo': { lat: 4.6420, lng: -74.0710 },
    'calle 53': { lat: 4.6410, lng: -74.0730 },
    'calle 63': { lat: 4.6480, lng: -74.0620 }
  },

  getRestaurantCoords(rest) {
    if (rest.lat && rest.lng) return { lat: rest.lat, lng: rest.lng };

    const text = `${rest.zone || ''} ${rest.address || ''} ${rest.branchName || ''}`.toLowerCase();
    let base = { lat: 4.6685, lng: -74.0538 };

    for (const [key, coords] of Object.entries(this.ZONE_COORDS)) {
      if (text.includes(key)) {
        base = coords;
        break;
      }
    }

    let hash = 0;
    for (let i = 0; i < (rest.id || '').length; i++) {
      hash = ((hash << 5) - hash) + rest.id.charCodeAt(i);
      hash |= 0;
    }
    const offsetLat = ((Math.abs(hash) % 100) - 50) * 0.00004;
    const offsetLng = ((Math.abs(hash * 7) % 100) - 50) * 0.00004;

    return {
      lat: parseFloat((base.lat + offsetLat).toFixed(6)),
      lng: parseFloat((base.lng + offsetLng).toFixed(6))
    };
  },

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  recalculateDistances() {
    this.restaurants = SharedStore.getRestaurants();
    const userLat = this.activeAddress?.lat || 4.6685;
    const userLng = this.activeAddress?.lng || -74.0538;

    this.restaurants.forEach(rest => {
      const coords = this.getRestaurantCoords(rest);
      rest.lat = coords.lat;
      rest.lng = coords.lng;

      const distKm = this.getDistanceFromLatLonInKm(userLat, userLng, rest.lat, rest.lng);
      rest.distanceKm = distKm;
      rest.distance = distKm < 1.0 ? `${Math.round(distKm * 1000)} m` : `${distKm.toFixed(1)} km`;
    });

    // Ordenar de más cercano a más lejano
    this.restaurants.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

    this.renderFeed();
    if (this.viewMode === 'map') {
      this.initOrUpdateMap();
    }
  },

  setViewMode(mode) {
    this.viewMode = mode;
    const btnList = document.getElementById('btn-view-list');
    const btnMap = document.getElementById('btn-view-map');
    const listFeed = document.getElementById('restaurant-offers-container');
    const mapView = document.getElementById('client-map-view');

    if (mode === 'map') {
      if (btnMap) btnMap.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-emerald-700 shadow-sm transition';
      if (btnList) btnList.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition';
      listFeed?.classList.add('hidden');
      mapView?.classList.remove('hidden');
      this.initOrUpdateMap();
      setTimeout(() => {
        if (this.leafletMap && typeof this.leafletMap.invalidateSize === 'function') {
          this.leafletMap.invalidateSize();
        }
      }, 100);
    } else {
      if (btnList) btnList.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-emerald-700 shadow-sm transition';
      if (btnMap) btnMap.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition';
      listFeed?.classList.remove('hidden');
      mapView?.classList.add('hidden');
    }
  },

  setDistanceFilter(filter) {
    this.distanceFilter = filter;
    ['all', '1km', '3km', '5km'].forEach(f => {
      const btn = document.getElementById(`dist-filter-btn-${f}`);
      if (btn) {
        if (f === filter) {
          btn.className = 'dist-filter-btn px-2.5 py-1 rounded-lg font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-300';
        } else {
          btn.className = 'dist-filter-btn px-2.5 py-1 rounded-lg font-bold text-[10px] bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100';
        }
      }
    });

    this.renderFeed();
    if (this.viewMode === 'map') {
      this.updateMapMarkers();
    }
  },

  initOrUpdateMap() {
    const userLat = this.activeAddress?.lat || 4.6685;
    const userLng = this.activeAddress?.lng || -74.0538;

    if (!window.L) {
      console.warn('Leaflet no disponible, omitiendo mapa interactivo.');
      return;
    }

    const mapCanvas = document.getElementById('leaflet-map-canvas');
    if (!mapCanvas) return;

    if (!this.leafletMap) {
      this.leafletMap = L.map('leaflet-map-canvas', {
        zoomControl: true,
        attributionControl: false
      }).setView([userLat, userLng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.leafletMap);
    } else {
      this.leafletMap.setView([userLat, userLng], 14);
      this.leafletMap.invalidateSize();
    }

    // Marcador de Ubicación del Usuario
    if (this.userMapMarker) {
      this.leafletMap.removeLayer(this.userMapMarker);
    }
    const userIcon = L.divIcon({
      className: 'user-gps-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></span>
          <span class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[9px] font-black">📍</span>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    this.userMapMarker = L.marker([userLat, userLng], { icon: userIcon })
      .addTo(this.leafletMap)
      .bindPopup(`<b>Estás aquí</b><br>${this.activeAddress?.tag || 'Tu ubicación'}: ${this.activeAddress?.line1 || ''}`);

    this.updateMapMarkers();
  },

  updateMapMarkers() {
    if (!this.leafletMap || !window.L) return;

    this.mapMarkers.forEach(m => this.leafletMap.removeLayer(m));
    this.mapMarkers = [];

    const filtered = this.getFilteredRestaurants();
    const counterEl = document.getElementById('map-counter-text');
    if (counterEl) {
      counterEl.textContent = `${filtered.length} locales en el mapa`;
    }

    filtered.forEach(rest => {
      const hasRescue = rest.menu?.some(cat => cat.isRescue && cat.items.some(it => it.stock > 0));
      
      const pinHtml = `
        <div class="group cursor-pointer transform hover:scale-110 transition relative flex flex-col items-center">
          <div class="w-9 h-9 rounded-2xl bg-white p-1 border-2 ${hasRescue ? 'border-emerald-500 shadow-emerald-500/40 shadow-lg' : 'border-slate-300 shadow-md'} flex items-center justify-center overflow-hidden">
            <img src="${rest.logoImage}" class="w-full h-full object-contain" onerror="this.src='assets/logos/default-restaurant.svg'">
          </div>
          ${hasRescue ? `
            <span class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white text-white text-[8px] flex items-center justify-center font-black animate-pulse">
              🌙
            </span>
          ` : ''}
          <div class="bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md shadow mt-0.5 whitespace-nowrap">
            ${rest.distance}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'restaurant-map-pin',
        html: pinHtml,
        iconSize: [36, 48],
        iconAnchor: [18, 44]
      });

      const marker = L.marker([rest.lat, rest.lng], { icon: customIcon })
        .addTo(this.leafletMap)
        .on('click', () => {
          this.selectRestaurantOnMap(rest);
        });

      this.mapMarkers.push(marker);
    });
  },

  selectRestaurantOnMap(rest) {
    const card = document.getElementById('map-selected-store-card');
    if (!card) return;

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-12 h-12 rounded-2xl bg-slate-50 p-1 border border-slate-200 shrink-0">
            <img src="${rest.logoImage}" class="w-full h-full object-contain" onerror="this.src='assets/logos/default-restaurant.svg'">
          </div>
          <div class="min-w-0">
            <h4 class="font-black text-slate-800 text-sm truncate">${rest.name}</h4>
            <p class="text-xs text-slate-500 truncate">${rest.address}</p>
            <div class="flex items-center gap-2 mt-0.5 text-[11px]">
              <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">📍 A ${rest.distance}</span>
              <span class="font-bold text-amber-600">⭐ ${rest.rating}</span>
            </div>
          </div>
        </div>
        <button onclick="document.getElementById('map-selected-store-card').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 p-1">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2 pt-1">
        <button onclick="ClienteApp.openDirectionsModal('${rest.id}')" class="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition">
          <i data-lucide="navigation" class="w-3.5 h-3.5 text-emerald-600"></i>
          <span>Cómo llegar</span>
        </button>
        <button onclick="ClienteApp.openRestaurantStore('${rest.id}')" class="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition">
          <i data-lucide="utensils" class="w-3.5 h-3.5"></i>
          <span>Ver Menú</span>
        </button>
      </div>
    `;

    card.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
    if (this.leafletMap && typeof this.leafletMap.panTo === 'function') {
      this.leafletMap.panTo([rest.lat, rest.lng]);
    }
  },

  locateUserGPS() {
    if (!navigator.geolocation) {
      this.showToast('Tu navegador no soporta geolocalización GPS.');
      return;
    }

    this.showToast('Buscando tu ubicación GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (!this.activeAddress) this.activeAddress = {};
        this.activeAddress.lat = lat;
        this.activeAddress.lng = lng;
        this.activeAddress.tag = 'Mi GPS';
        this.activeAddress.line1 = 'Ubicación actual en vivo';

        const addrTag = document.getElementById('active-address-tag');
        const addrLine = document.getElementById('active-address-line1');
        if (addrTag) addrTag.textContent = 'Mi GPS en vivo';
        if (addrLine) addrLine.textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

        this.recalculateDistances();
        if (this.viewMode === 'map') {
          this.initOrUpdateMap();
        }
        this.showToast('📍 Ubicación actualizada con tu GPS');
      },
      (err) => {
        console.warn('Geolocation error:', err);
        this.showToast('No se pudo acceder a tu GPS. Usando dirección seleccionada.');
      },
      { timeout: 7000 }
    );
  },

  openDirectionsModal(restId) {
    const rest = this.restaurants.find(r => r.id === restId);
    if (!rest) return;

    const modal = document.getElementById('directions-modal');
    const content = document.getElementById('directions-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="navigation" class="w-5 h-5 text-white"></i>
          <h3 class="font-black text-sm">Cómo llegar</h3>
        </div>
        <button onclick="document.getElementById('directions-modal').classList.add('hidden')" class="text-white/80 hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-5 space-y-4 text-xs">
        <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-white p-1 border border-slate-200 shrink-0">
            <img src="${rest.logoImage}" class="w-full h-full object-contain" onerror="this.src='assets/logos/default-restaurant.svg'">
          </div>
          <div class="min-w-0">
            <h4 class="font-black text-slate-900 text-sm truncate">${rest.name}</h4>
            <p class="text-xs text-slate-500">${rest.address}</p>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              📍 A ${rest.distance} de tu ubicación
            </span>
          </div>
        </div>

        <div class="space-y-2 pt-1">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${rest.lat},${rest.lng}" target="_blank" class="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-between transition shadow-md">
            <div class="flex items-center gap-2.5">
              <span class="text-lg">🗺️</span>
              <div>
                <span class="block text-xs font-bold">Ruta en Google Maps</span>
                <span class="block text-[10px] text-slate-400 font-normal">Caminando o en transporte público</span>
              </div>
            </div>
            <i data-lucide="external-link" class="w-4 h-4 text-slate-400"></i>
          </a>

          <a href="https://waze.com/ul?ll=${rest.lat},${rest.lng}&navigate=yes" target="_blank" class="w-full p-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold flex items-center justify-between transition shadow-md shadow-sky-500/20">
            <div class="flex items-center gap-2.5">
              <span class="text-lg">🚗</span>
              <div>
                <span class="block text-xs font-bold">Navegación en Waze</span>
                <span class="block text-[10px] text-sky-100 font-normal">Tráfico en vivo y ruta más rápida</span>
              </div>
            </div>
            <i data-lucide="external-link" class="w-4 h-4 text-sky-200"></i>
          </a>

          <button onclick="ClienteApp.copyAddress('${rest.address.replace(/'/g, "\\'")}')" class="w-full py-2.5 px-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center gap-1.5 transition">
            <i data-lucide="copy" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>Copiar Dirección</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  copyAddress(addr) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(addr);
      this.showToast('📋 Dirección copiada al portapapeles');
    } else {
      this.showToast(`Dirección: ${addr}`);
    }
  },

  openAddressModal() {
    const modal = document.getElementById('address-modal');
    const list = document.getElementById('saved-addresses-list');
    if (!modal || !list) return;

    list.innerHTML = this.addresses.map(a => `
      <div onclick="ClienteApp.setActiveAddress('${a.id}')" class="p-3 rounded-2xl border ${this.activeAddress?.id === a.id ? 'border-emerald-500 bg-emerald-50/70 shadow-sm' : 'border-slate-100 bg-white hover:bg-slate-50'} cursor-pointer transition flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl ${this.activeAddress?.id === a.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'} flex items-center justify-center">
            <i data-lucide="${a.icon || 'map-pin'}" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-black text-xs text-slate-900">${a.tag}</span>
              ${this.activeAddress?.id === a.id ? '<span class="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">ACTIVA</span>' : ''}
            </div>
            <p class="text-xs text-slate-700 font-medium">${a.line1}</p>
            <p class="text-[10px] text-slate-400">${a.zone}</p>
          </div>
        </div>
        <i data-lucide="check" class="w-4 h-4 text-emerald-600 ${this.activeAddress?.id === a.id ? '' : 'opacity-0'}"></i>
      </div>
    `).join('');

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeAddressModal() {
    document.getElementById('address-modal')?.classList.add('hidden');
  },

  addNewAddress(formData) {
    const tag = formData.get('tag') || 'Casa';
    const line1 = formData.get('line1');
    const zone = formData.get('zone') || 'Bogotá';
    const notes = formData.get('notes') || '';

    if (!line1) {
      this.showToast('Por favor escribe la dirección');
      return;
    }

    const iconMap = { 'Casa': 'home', 'Trabajo': 'briefcase', 'Otro': 'map-pin' };
    const newAddr = {
      id: 'addr-' + Date.now(),
      tag: tag,
      icon: iconMap[tag] || 'map-pin',
      line1: line1,
      zone: zone,
      notes: notes
    };

    this.addresses.unshift(newAddr);
    localStorage.setItem('salvaplato_addresses', JSON.stringify(this.addresses));
    this.setActiveAddress(newAddr.id);
    document.getElementById('form-new-address')?.reset();
    document.getElementById('new-address-form-box')?.classList.add('hidden');
    this.showToast(`¡Dirección "${tag}" guardada con éxito!`);
  },

  // ==========================================================
  // 3. TEMPORIZADORES DE URGENCIA
  // ==========================================================
  startCountdownTimers() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    let secondsLeft = 42 * 60 + 30;

    this.timerInterval = setInterval(() => {
      secondsLeft = Math.max(0, secondsLeft - 1);
      const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
      const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
      const secs = String(secondsLeft % 60).padStart(2, '0');
      const formatted = `${hours}:${mins}:${secs}`;

      document.querySelectorAll('.live-countdown-text').forEach(el => {
        el.textContent = formatted;
      });
    }, 1000);
  },

  // ==========================================================
  // 4. AUTENTICACIÓN Y CABECERA (ERROR 1 SOLUCIONADO)
  // ==========================================================
  loadUser() {
    const saved = localStorage.getItem('salvaplato_client_session');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch (e) {
        this.currentUser = null;
      }
    }
    this.checkAuthState();
  },

  checkAuthState() {
    const authScreen = document.getElementById('client-auth-screen');
    const mainApp = document.getElementById('client-main-app');

    if (!this.currentUser) {
      if (authScreen) authScreen.classList.remove('hidden');
      if (mainApp) mainApp.classList.add('hidden');
    } else {
      if (authScreen) authScreen.classList.add('hidden');
      if (mainApp) mainApp.classList.remove('hidden');
      this.updateUserUI();
      this.renderFeed();
      this.renderMyVouchers();
    }
    if (window.lucide) lucide.createIcons();
  },

  login(email) {
    this.currentUser = {
      id: "usr-" + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: "+57 312 445 9901",
      city: "Bogotá D.C.",
      walletBalance: 24500,
      kgSaved: 8.4,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    };
    localStorage.setItem('salvaplato_client_session', JSON.stringify(this.currentUser));
    this.checkAuthState();
    this.showToast(`¡Bienvenido a SalvaPlato, ${this.currentUser.name}!`);
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  loginDemo() {
    this.currentUser = {
      id: "usr-demo-1",
      name: "Juan Camilo Pérez",
      email: "juan.perez@ejemplo.com",
      phone: "+57 312 445 9901",
      city: "Bogotá D.C.",
      walletBalance: 24500,
      kgSaved: 8.4,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    };
    localStorage.setItem('salvaplato_client_session', JSON.stringify(this.currentUser));
    this.checkAuthState();
    this.showToast('¡Ingresaste en Modo Demostración!');
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  register(name, email, phone, city) {
    this.currentUser = {
      id: "usr-" + Date.now(),
      name: name,
      email: email,
      phone: phone,
      city: city || "Bogotá D.C.",
      walletBalance: 20000,
      kgSaved: 0,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    };
    localStorage.setItem('salvaplato_client_session', JSON.stringify(this.currentUser));
    this.checkAuthState();
    this.showToast('¡Cuenta creada! Recibiste $20.000 COP en SalvaCoins 🎁');
    if (window.SoundEngine) SoundEngine.playSuccess();
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem('salvaplato_client_session');
    document.getElementById('profile-modal')?.classList.add('hidden');
    this.checkAuthState();
    this.showToast('Sesión cerrada');
  },

  // Corrige la colisión entre el nombre y las monedas en el header
  updateUserUI() {
    if (!this.currentUser) return;
    const nameEl = document.getElementById('user-display-name');
    const avatarInitial = document.getElementById('user-avatar-initial');
    const balEl = document.getElementById('user-wallet-badge');

    // Inicial limpia dentro del círculo (1 sola letra)
    if (avatarInitial) avatarInitial.textContent = (this.currentUser.name || 'J').charAt(0).toUpperCase();
    // Primer nombre al lado
    if (nameEl) nameEl.textContent = this.currentUser.name.split(' ')[0];
    // Badge de SalvaCoins separado
    if (balEl) balEl.textContent = SharedStore.formatCurrency(this.currentUser.walletBalance);
  },

  bindEvents() {
    // Auth Tabs
    document.getElementById('btn-tab-login')?.addEventListener('click', () => this.switchAuthTab('login'));
    document.getElementById('btn-tab-register')?.addEventListener('click', () => this.switchAuthTab('register'));

    // Formulario Login
    document.getElementById('form-login')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('input-login-email').value;
      this.login(email);
    });

    // Formulario Register
    document.getElementById('form-register')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('input-reg-name').value;
      const email = document.getElementById('input-reg-email').value;
      const phone = document.getElementById('input-reg-phone').value;
      const city = document.getElementById('input-reg-city').value;
      this.register(name, email, phone, city);
    });

    // Formulario Nueva Dirección
    const formNewAddr = document.getElementById('form-new-address');
    if (formNewAddr) {
      formNewAddr.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addNewAddress(new FormData(formNewAddr));
      });
    }

    // Formulario Nueva Tarjeta
    const formNewCard = document.getElementById('form-new-card');
    if (formNewCard) {
      formNewCard.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addNewCard(new FormData(formNewCard));
      });
    }

    // Selector de Horario / Turno
    document.querySelectorAll('.shift-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.shift-pill').forEach(p => {
          p.classList.remove('bg-emerald-600', 'text-white', 'shadow-md');
          p.classList.add('bg-slate-800', 'text-slate-300');
        });
        e.currentTarget.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
        e.currentTarget.classList.remove('bg-slate-800', 'text-slate-300');
        this.activeShift = e.currentTarget.dataset.shift;
        this.updateClockDisplay();
        this.renderFeed();
      });
    });

    // Filtros de categoría
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('bg-emerald-600', 'text-white', 'shadow-md'));
        e.currentTarget.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
        this.activeCategory = e.currentTarget.dataset.category;
        this.renderFeed();
      });
    });

    // Filtro solo aceptados
    document.getElementById('filter-only-accepted')?.addEventListener('change', (e) => {
      this.onlyAcceptedFilter = e.target.checked;
      this.renderFeed();
    });

    // Tabs comensal
    document.querySelectorAll('.client-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setTab(e.currentTarget.dataset.view);
      });
    });
  },

  switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('btn-tab-login')?.classList.toggle('border-emerald-600', isLogin);
    document.getElementById('btn-tab-login')?.classList.toggle('text-emerald-700', isLogin);
    document.getElementById('btn-tab-login')?.classList.toggle('border-transparent', !isLogin);
    document.getElementById('btn-tab-login')?.classList.toggle('text-slate-400', !isLogin);

    document.getElementById('btn-tab-register')?.classList.toggle('border-emerald-600', !isLogin);
    document.getElementById('btn-tab-register')?.classList.toggle('text-emerald-700', !isLogin);
    document.getElementById('btn-tab-register')?.classList.toggle('border-transparent', isLogin);
    document.getElementById('btn-tab-register')?.classList.toggle('text-slate-400', isLogin);

    document.getElementById('box-login-form')?.classList.toggle('hidden', !isLogin);
    document.getElementById('box-register-form')?.classList.toggle('hidden', isLogin);
  },

  setTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.client-nav-btn').forEach(btn => {
      const active = btn.dataset.view === tab;
      btn.classList.toggle('text-emerald-600', active);
      btn.classList.toggle('text-slate-400', !active);
    });

    document.getElementById('client-feed-section')?.classList.toggle('hidden', tab !== 'feed');
    document.getElementById('client-vouchers-section')?.classList.toggle('hidden', tab !== 'vouchers');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'vouchers') {
      this.renderMyVouchers();
    } else if (tab === 'feed') {
      this.recalculateDistances();
    }
    if (window.lucide) lucide.createIcons();
  },

  updateClockDisplay() {
    const el = document.getElementById('simulated-clock-text');
    if (!el) return;
    const map = {
      'all': '⏰ Todas las Horas (Descuentos Variados 10% a 20% + Rescates)',
      'lunch': '☀️ 02:45 PM (Turno Almuerzo - Rescate Menús Ejecutivos)',
      'afternoon': '☕ 05:45 PM (Turno Onces - Rescate Panaderías y Cafés)',
      'night': '🌙 09:15 PM (Cierre Nocturno - Descuentos hasta 70% OFF)'
    };
    el.textContent = map[this.activeShift] || '⏰ Horario Simulado';
  },

  getFilteredRestaurants() {
    return this.restaurants.filter(r => {
      if (this.onlyAcceptedFilter && r.crmStatus !== 'accepted') return false;
      if (this.activeCategory !== 'all' && r.category !== this.activeCategory) return false;

      // Filtro por Radio de Distancia Geográfica
      if (this.distanceFilter === '1km' && (r.distanceKm || 0) > 1.0) return false;
      if (this.distanceFilter === '3km' && (r.distanceKm || 0) > 3.0) return false;
      if (this.distanceFilter === '5km' && (r.distanceKm || 0) > 5.0) return false;

      if (this.searchQuery) {
        const q = this.searchQuery;
        const matchName = (r.name || '').toLowerCase().includes(q) || (r.shortName && r.shortName.toLowerCase().includes(q)) || (r.branchName && r.branchName.toLowerCase().includes(q));
        const matchAddr = (r.address || '').toLowerCase().includes(q) || (r.zone || '').toLowerCase().includes(q);
        const matchCat = (r.category || '').toLowerCase().includes(q);
        const matchDishes = r.menu && r.menu.some(c => c.items && c.items.some(i => (i.title || '').toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q)));
        if (!matchName && !matchAddr && !matchCat && !matchDishes) return false;
      }
      return true;
    });
  },

  // ==========================================================
  // 5. FEED CON DESCUENTOS ESCALONADOS (ERROR 3 SOLUCIONADO)
  // ==========================================================
  renderFeed() {
    const container = document.getElementById('restaurant-offers-container');
    if (!container) return;

    const filtered = this.getFilteredRestaurants();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 px-4 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400">
            <i data-lucide="store" class="w-8 h-8 text-amber-500"></i>
          </div>
          <h3 class="font-bold text-slate-800 text-sm">No hay restaurantes o platos con estos filtros</h3>
          <p class="text-xs text-slate-400 max-w-xs mx-auto">Prueba ampliando el radio de distancia o cambiando de categoría.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(rest => {
      let allItems = [];
      rest.menu.forEach(cat => {
        cat.items.forEach(it => {
          if (this.activeShift === 'all' || !it.shift || it.shift === 'all' || it.shift === this.activeShift) {
            allItems.push({ ...it, categoryName: cat.categoryName });
          }
        });
      });

      const topItem = allItems[0] || rest.menu[0]?.items[0];

      return `
        <div class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col">
          <div onclick="ClienteApp.openRestaurantStore('${rest.id}')" class="relative h-44 w-full overflow-hidden bg-slate-100 cursor-pointer group">
            <img src="${rest.coverImage}" alt="${rest.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            
            <!-- Badges de Descuentos Escalonados -->
            <div class="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
              <span class="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg">
                🔥 Combos 20% OFF
              </span>
              <span class="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg">
                ⭐ Platos 15% OFF
              </span>
              <span class="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg">
                🌙 Cierres 60%
              </span>
            </div>

            <!-- Botón Cómo llegar / Distancia -->
            <button onclick="event.stopPropagation(); ClienteApp.openDirectionsModal('${rest.id}')" title="Cómo llegar (Waze / Google Maps)" class="absolute top-3 right-3 bg-white/95 hover:bg-white text-slate-800 hover:text-emerald-700 text-[11px] font-black px-2.5 py-1 rounded-xl shadow flex items-center gap-1 transition">
              <i data-lucide="navigation" class="w-3 h-3 text-emerald-600"></i>
              <span>${rest.distance}</span>
            </button>

            <div class="absolute bottom-2.5 left-3 right-3 flex items-end gap-2.5 text-white">
              <!-- Logo Oficial Vectorial Circular / Squircle Estilo Rappi -->
              <div class="w-12 h-12 rounded-2xl bg-white p-1 shadow-lg shadow-black/40 border-2 border-white flex items-center justify-center overflow-hidden shrink-0">
                <img src="${rest.logoImage || 'assets/logos/default-restaurant.svg'}" onerror="if (!this.dataset.tried) { this.dataset.tried = '1'; this.src = this.src.includes('.svg') ? this.src.replace('.svg', '.png') : this.src.replace('.png', '.svg'); } else { this.src = 'assets/logos/default-restaurant.svg'; }" alt="${rest.name}" class="w-full h-full object-contain">
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <h4 class="font-black text-base text-white drop-shadow truncate">${rest.shortName || rest.name}</h4>
                  ${rest.branchName ? `<span class="bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[9px] font-bold px-1.5 py-0.2 rounded-md">${rest.branchName}</span>` : ''}
                  ${rest.crmStatus === 'accepted' ? '<span class="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">CONFIRMADO</span>' : ''}
                </div>
                <div class="flex items-center gap-2 text-[11px] text-white/90">
                  <span class="flex items-center gap-0.5 font-bold"><i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400"></i> ${rest.rating} (${rest.reviews})</span>
                  <span>•</span>
                  <span class="text-white/80 truncate max-w-[140px]">${rest.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-3.5 flex flex-col justify-between flex-1">
            ${topItem ? `
              <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold ${topItem.type === 'rescue' ? 'text-red-700 bg-red-50' : topItem.discountPercent === 20 ? 'text-amber-800 bg-amber-100' : 'text-emerald-700 bg-emerald-50'} px-2 py-0.5 rounded-md flex items-center gap-1">
                    ${topItem.type === 'rescue' ? '🌙 Rescate Nocturno' : topItem.discountPercent === 20 ? '🔥 Combo Grande (20% OFF)' : '⭐ Plato en Carta (15% OFF)'}
                  </span>
                  
                  ${topItem.type === 'rescue' ? `
                    <span class="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <i data-lucide="clock" class="w-3 h-3"></i>
                      <span class="live-countdown-text">00:42:15</span>
                    </span>
                  ` : `
                    <span class="text-[10px] text-slate-400 font-medium">Todo el día</span>
                  `}
                </div>

                <h5 class="font-bold text-slate-800 text-xs mt-1.5 truncate">${topItem.title}</h5>
                <div class="flex items-center justify-between mt-2">
                  <div class="flex items-baseline gap-1.5">
                    <span class="text-base font-black text-slate-900">${SharedStore.formatCurrency(topItem.discountedPrice)}</span>
                    <span class="text-xs text-slate-400 line-through">${SharedStore.formatCurrency(topItem.originalPrice)}</span>
                  </div>
                  <button 
                    onclick="ClienteApp.quickOrderSingleItem('${rest.id}', '${topItem.id}')"
                    class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1">
                    <span>Pedir</span>
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>
            ` : ''}

            <div class="flex items-center justify-between pt-1">
              <button 
                onclick="ClienteApp.openDirectionsModal('${rest.id}')" 
                class="text-[11px] font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 py-1.5 px-2.5 rounded-xl transition">
                <i data-lucide="navigation" class="w-3.5 h-3.5 text-emerald-600"></i>
                <span>Cómo llegar</span>
              </button>
              <button 
                onclick="ClienteApp.openRestaurantStore('${rest.id}')" 
                class="text-xs font-black text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                <span>Ver Menú (${allItems.length})</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  // ==========================================================
  // 6. MODAL TIENDA DE RESTAURANTE
  // ==========================================================
  openRestaurantStore(restaurantId) {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    this.currentStoreRestaurant = restaurant;
    const modal = document.getElementById('restaurant-detail-modal');
    const content = document.getElementById('restaurant-detail-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="relative h-52 w-full bg-slate-900">
        <img src="${restaurant.coverImage}" class="w-full h-full object-cover opacity-80">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/40 to-transparent"></div>
        
        <!-- Botón Atrás Prominente -->
        <button onclick="document.getElementById('restaurant-detail-modal').classList.add('hidden')" class="absolute top-4 left-4 bg-black/70 hover:bg-black backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl transition">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Atrás</span>
        </button>

        <div class="absolute top-4 right-4 flex items-center gap-1.5">
          <button onclick="ClienteApp.openDirectionsModal('${restaurant.id}')" class="bg-white/90 hover:bg-white text-slate-800 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg transition">
            <i data-lucide="navigation" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>Cómo llegar</span>
          </button>
          <button onclick="ClienteApp.shareOfferWhatsApp('${restaurant.name}')" class="bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg hover:bg-emerald-700 transition">
            <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
            <span>Compartir</span>
          </button>
        </div>

        <div class="absolute bottom-4 left-4 right-4 flex items-end gap-3 text-white">
          <div class="w-14 h-14 rounded-2xl bg-white p-1 shadow-2xl border-2 border-white flex items-center justify-center overflow-hidden shrink-0">
            <img src="${restaurant.logoImage || 'assets/logos/default-restaurant.svg'}" onerror="if (!this.dataset.tried) { this.dataset.tried = '1'; this.src = this.src.includes('.svg') ? this.src.replace('.svg', '.png') : this.src.replace('.png', '.svg'); } else { this.src = 'assets/logos/default-restaurant.svg'; }" alt="${restaurant.name}" class="w-full h-full object-contain">
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h2 class="text-xl font-black text-white drop-shadow truncate">${restaurant.shortName || restaurant.name}</h2>
              ${restaurant.branchName ? `<span class="bg-black/65 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md">${restaurant.branchName}</span>` : ''}
            </div>
            <p class="text-xs text-slate-200 mt-0.5 truncate">${restaurant.address}</p>
            <div class="flex items-center gap-2 text-xs text-white/90 mt-1 flex-wrap">
              <span class="bg-emerald-600 px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-white"></i> ${restaurant.rating}
              </span>
              <span>• Horario: ${restaurant.openingHours}</span>
              <span>• 📍 ${restaurant.distance}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <i data-lucide="badge-percent" class="w-5 h-5 text-emerald-700 shrink-0"></i>
          <div>
            <span class="font-bold text-emerald-950 block">Descuentos SalvaPlato en este local:</span>
            <span class="text-emerald-800 text-[11px]">20% en combos grandes, 15% en platos de carta y 10% en bebidas/postres.</span>
          </div>
        </div>
      </div>

      <div class="p-4 space-y-6 pb-28">
        ${restaurant.menu.map(cat => `
          <div class="space-y-3">
            <h3 class="font-black text-sm text-slate-800 flex items-center justify-between border-b pb-1">
              <span>${cat.categoryName}</span>
              <span class="text-[10px] font-bold ${cat.isRescue ? 'text-red-600' : 'text-emerald-700'}">
                ${cat.isRescue ? 'Stock Limitado' : 'Disponible en salón'}
              </span>
            </h3>

            <div class="space-y-3">
              ${cat.items.map(item => `
                <div class="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 transition">
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center gap-1.5">
                      <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.type === 'rescue' ? 'bg-red-100 text-red-700' : item.discountPercent === 20 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-700'}">
                        -${item.discountPercent}% OFF
                      </span>
                      ${item.type === 'rescue' ? `<span class="text-[10px] text-amber-700 font-bold">¡Quedan ${item.stock}!</span>` : ''}
                    </div>
                    <h4 class="font-bold text-slate-800 text-sm leading-snug">${item.title}</h4>
                    <p class="text-slate-500 text-xs line-clamp-2">${item.description}</p>
                    
                    <div class="pt-1 flex items-baseline gap-2">
                      <span class="text-base font-black text-slate-900">${SharedStore.formatCurrency(item.discountedPrice)}</span>
                      <span class="text-xs text-slate-400 line-through">${SharedStore.formatCurrency(item.originalPrice)}</span>
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-2 shrink-0">
                    <div class="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                      <img src="${item.image}" class="w-full h-full object-cover">
                    </div>
                    <button 
                      onclick="ClienteApp.addToCart('${restaurant.id}', '${item.id}')"
                      class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 transition flex items-center gap-1">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.remove('hidden');
    content.scrollTop = 0;
    if (window.lucide) lucide.createIcons();
  },

  shareOfferWhatsApp(restaurantName) {
    const text = encodeURIComponent(`¡Mira esto! En SalvaPlato tienen hasta 20% en combos y hasta 60% en platos de rescate en ${restaurantName}. Entra y salva comida deliciosa en Bogotá 🌱`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  },

  // ==========================================================
  // 7. CHECKOUT Y MÉTODOS DE PAGO CON TARJETAS (ERROR 2)
  // ==========================================================
  addToCart(restaurantId, itemId) {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    let targetItem = null;
    restaurant.menu.forEach(cat => {
      const found = cat.items.find(it => it.id === itemId);
      if (found) targetItem = found;
    });

    if (!targetItem) return;

    if (this.cart.length > 0 && this.cart[0].restaurantId !== restaurantId) {
      if (!confirm(`Tu canasta tiene platos de ${this.cart[0].restaurantName}. ¿Deseas vaciarla para pedir en ${restaurant.name}?`)) {
        return;
      }
      this.cart = [];
    }

    const idx = this.cart.findIndex(i => i.id === itemId);
    if (idx > -1) {
      this.cart[idx].quantity += 1;
    } else {
      this.cart.push({
        ...targetItem,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantAddress: restaurant.address,
        quantity: 1
      });
    }

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast(`Agregaste "${targetItem.title}"`);
    this.updateCartUI();
  },

  quickOrderSingleItem(restaurantId, itemId) {
    this.cart = [];
    this.addToCart(restaurantId, itemId);
    this.openCheckoutModal();
  },

  clearCart(askConfirm = true) {
    if (this.cart.length === 0) return;
    if (askConfirm && !confirm('¿Deseas vaciar y eliminar todos los platos de tu canasta?')) {
      return;
    }
    this.cart = [];
    this.updateCartUI();
    document.getElementById('order-modal')?.classList.add('hidden');
    this.showToast('Canasta eliminada con éxito');
  },

  updateCartUI() {
    const bar = document.getElementById('floating-cart-bar');
    const countDisplay = document.getElementById('cart-items-count');
    const totalDisplay = document.getElementById('cart-total-price');
    const savedDisplay = document.getElementById('cart-saved-amount');

    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const totalOriginal = this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const totalSaved = totalOriginal - totalPrice;

    if (bar) {
      if (totalItems > 0) {
        bar.classList.remove('hidden');
        if (countDisplay) countDisplay.textContent = `${totalItems} ${totalItems === 1 ? 'plato' : 'platos'} en canasta`;
        if (totalDisplay) totalDisplay.textContent = SharedStore.formatCurrency(totalPrice);
        if (savedDisplay) savedDisplay.textContent = `Ahorras ${SharedStore.formatCurrency(totalSaved)}`;
      } else {
        bar.classList.add('hidden');
      }
    }
    if (window.lucide) lucide.createIcons();
  },

  openCheckoutModal() {
    if (this.cart.length === 0) return;

    const modal = document.getElementById('order-modal');
    const content = document.getElementById('order-modal-content');
    if (!modal || !content) return;

    const firstItem = this.cart[0];
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const totalOriginal = this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const totalSaved = totalOriginal - totalPrice;

    const activeCard = this.userCards.find(c => c.id === this.selectedCardId) || this.userCards[0];

    content.innerHTML = `
      <!-- Encabezado con Botón Atrás y Botón Vaciar Canasta -->
      <div class="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <button onclick="document.getElementById('order-modal').classList.add('hidden')" class="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition shadow-sm">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Atrás</span>
        </button>

        <div class="text-center px-1">
          <h3 class="font-black text-slate-900 text-xs sm:text-sm">Resumen de Pedido</h3>
          <p class="text-[10px] text-slate-500 truncate max-w-[130px]">${firstItem.restaurantName}</p>
        </div>

        <button onclick="ClienteApp.clearCart()" title="Vaciar y eliminar canasta" class="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded-xl transition shadow-sm">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          <span>Vaciar</span>
        </button>
      </div>

      <div class="p-4 space-y-3.5 text-xs text-slate-600 max-h-[60vh] overflow-y-auto">
        <!-- Dirección -->
        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2 truncate">
            <i data-lucide="map-pin" class="w-4 h-4 text-emerald-600 shrink-0"></i>
            <span class="font-bold text-slate-800 truncate">${this.activeAddress ? `${this.activeAddress.tag}: ${this.activeAddress.line1}` : 'Bogotá D.C.'}</span>
          </div>
          <button onclick="ClienteApp.openAddressModal()" class="text-[11px] text-emerald-700 font-bold hover:underline shrink-0">
            Cambiar
          </button>
        </div>

        <!-- Platos -->
        <div class="space-y-2">
          ${this.cart.map(item => `
            <div class="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div class="truncate max-w-[190px]">
                <span class="font-bold text-slate-800 block truncate">${item.quantity}x ${item.title}</span>
                <span class="text-[10px] text-emerald-600 font-medium">-${item.discountPercent}% OFF</span>
              </div>
              <span class="font-black text-slate-900">${SharedStore.formatCurrency(item.discountedPrice * item.quantity)}</span>
            </div>
          `).join('')}
        </div>

        <!-- Modalidad -->
        <div class="bg-emerald-50 p-3 rounded-xl space-y-1 text-emerald-950">
          <span class="font-bold text-xs block">Modalidad de Consumo:</span>
          <div class="flex gap-2 pt-1">
            <label class="flex-1 bg-white p-2 rounded-lg border border-emerald-200 cursor-pointer font-bold text-[11px] flex items-center gap-1.5">
              <input type="radio" name="consumeType" value="dinein" checked class="accent-emerald-600">
              <span>🍽️ Comer en Mesa</span>
            </label>
            <label class="flex-1 bg-white p-2 rounded-lg border border-emerald-200 cursor-pointer font-bold text-[11px] flex items-center gap-1.5">
              <input type="radio" name="consumeType" value="takeout" class="accent-emerald-600">
              <span>🛍️ Llevar / Takeout</span>
            </label>
          </div>
        </div>

        <!-- MÉTODOS DE PAGO: TARJETAS, NEQUI, DAVIPLATA, CAJA -->
        <div class="space-y-2 pt-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-slate-800 block">Forma de Pago:</span>
            <span class="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
              <i data-lucide="shield-check" class="w-3 h-3"></i>
              <span>100% Seguro</span>
            </span>
          </div>
          
          <div class="space-y-2">
            <!-- Sección de Tarjetas Guardadas -->
            <div class="space-y-1.5">
              ${this.userCards.map(c => {
                const isSelected = (this.selectedPaymentMethod === 'card' && this.selectedCardId === c.id);
                return `
                  <label onclick="ClienteApp.selectPaymentCard('${c.id}')" class="flex items-center justify-between p-2.5 rounded-xl border ${isSelected ? 'border-emerald-500 bg-emerald-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'} cursor-pointer transition">
                    <div class="flex items-center gap-2.5">
                      <input type="radio" name="paymentMethod" value="card_${c.id}" ${isSelected ? 'checked' : ''} class="accent-emerald-600">
                      <div class="w-7 h-7 rounded-lg ${c.brand === 'visa' ? 'bg-blue-600 text-white' : (c.brand === 'amex' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white')} flex items-center justify-center font-black text-[9px] shadow-sm">
                        ${c.brand === 'visa' ? 'VISA' : (c.brand === 'amex' ? 'AMEX' : 'MC')}
                      </div>
                      <div>
                        <span class="font-bold text-slate-900 block text-xs">${c.brandName || `${c.brand.toUpperCase()} ${c.cardType || 'Débito'}`}</span>
                        <span class="text-[10px] text-slate-500 font-mono">•••• •••• •••• ${c.numberLast4} (Vence: ${c.expiry})</span>
                      </div>
                    </div>
                    ${isSelected ? '<i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>' : ''}
                  </label>
                `;
              }).join('')}
            </div>

            <!-- BOTÓN DESTACADO: + AÑADIR TARJETA DÉBITO O CRÉDITO -->
            <button type="button" onclick="ClienteApp.toggleCheckoutNewCardForm()" class="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-emerald-500 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-800 font-black text-xs flex items-center justify-center gap-2 transition shadow-sm">
              <i data-lucide="plus-circle" class="w-4 h-4 text-emerald-600"></i>
              <span>+ Añadir Tarjeta Débito o Crédito</span>
            </button>

            <!-- Formulario Desplegable para Agregar Tarjeta con Todos sus Datos -->
            <div id="checkout-new-card-form" class="hidden bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3 shadow-inner">
              <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                <span class="font-black text-slate-800 text-xs flex items-center gap-1.5">
                  <i data-lucide="credit-card" class="w-4 h-4 text-emerald-600"></i>
                  <span>Ingresar Datos de la Tarjeta</span>
                </span>
                <button type="button" onclick="ClienteApp.toggleCheckoutNewCardForm(false)" class="text-[10px] text-slate-400 hover:text-slate-600 font-bold">
                  ✕ Cancelar
                </button>
              </div>

              <!-- Tipo de Tarjeta -->
              <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Tipo de Tarjeta:</label>
                <div class="grid grid-cols-2 gap-2">
                  <label class="bg-white p-2 rounded-xl border border-slate-200 cursor-pointer text-center font-bold text-xs flex items-center justify-center gap-1.5 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 text-slate-700">
                    <input type="radio" name="checkoutCardType" value="Débito" checked class="accent-emerald-600">
                    <span>💳 Débito</span>
                  </label>
                  <label class="bg-white p-2 rounded-xl border border-slate-200 cursor-pointer text-center font-bold text-xs flex items-center justify-center gap-1.5 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 text-slate-700">
                    <input type="radio" name="checkoutCardType" value="Crédito" class="accent-emerald-600">
                    <span>💳 Crédito</span>
                  </label>
                </div>
              </div>

              <!-- Banco Emisor en Colombia -->
              <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Banco Emisor (Colombia):</label>
                <select id="checkout-card-bank" class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500">
                  <option value="Bancolombia">Bancolombia</option>
                  <option value="Davivienda">Davivienda</option>
                  <option value="Nu Colombia">Nu Colombia</option>
                  <option value="Nequi">Nequi (Tarjeta Visa)</option>
                  <option value="Banco de Bogotá">Banco de Bogotá</option>
                  <option value="BBVA Colombia">BBVA Colombia</option>
                  <option value="Scotiabank Colpatria">Scotiabank Colpatria</option>
                  <option value="Banco Falabella">Banco Falabella</option>
                  <option value="Lulo Bank">Lulo Bank</option>
                  <option value="RappiCard">RappiCard</option>
                  <option value="Otro Banco">Otro Banco</option>
                </select>
              </div>

              <!-- Número de Tarjeta -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Número de Tarjeta (16 dígitos):</label>
                  <span id="checkout-brand-badge" class="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">AUTO</span>
                </div>
                <div class="relative">
                  <input id="checkout-card-number" type="text" maxlength="19" placeholder="4589 1234 5678 9010"
                    oninput="ClienteApp.handleCardNumberInput(this, 'checkout-brand-badge')"
                    class="w-full bg-white border border-slate-200 rounded-xl p-2 pl-8 text-xs font-mono font-bold tracking-wider text-slate-900 focus:ring-2 focus:ring-emerald-500">
                  <span class="absolute left-2.5 top-2 text-xs">💳</span>
                </div>
              </div>

              <!-- Nombre del Titular -->
              <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Nombre Completo del Titular:</label>
                <input id="checkout-card-holder" type="text" placeholder="Ej. JUAN CAMILO PEREZ"
                  class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs uppercase font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500">
              </div>

              <!-- Vencimiento y CVV -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Vencimiento (MM/AA):</label>
                  <input id="checkout-card-expiry" type="text" maxlength="5" placeholder="09/28"
                    oninput="ClienteApp.handleExpiryInput(this)"
                    class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-center font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500">
                </div>
                <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">CVV / CVC (3-4 dígitos):</label>
                  <input id="checkout-card-cvv" type="password" maxlength="4" placeholder="•••"
                    class="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-center font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500">
                </div>
              </div>

              <button type="button" onclick="ClienteApp.saveNewCardFromCheckout()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Guardar y Usar Esta Tarjeta</span>
              </button>
            </div>

            <!-- Opción: Nequi -->
            <label onclick="ClienteApp.selectedPaymentMethod = 'nequi'; ClienteApp.openCheckoutModal();" class="flex items-center justify-between p-2.5 rounded-xl border ${this.selectedPaymentMethod === 'nequi' ? 'border-purple-500 bg-purple-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-purple-300'} cursor-pointer transition">
              <div class="flex items-center gap-2.5">
                <input type="radio" name="paymentMethod" value="nequi" ${this.selectedPaymentMethod === 'nequi' ? 'checked' : ''} class="accent-purple-600">
                <span class="w-7 h-7 rounded-lg bg-purple-900 text-white flex items-center justify-center font-black text-xs shadow-sm">N</span>
                <div>
                  <span class="font-bold text-slate-900 block text-xs">Nequi</span>
                  <span class="text-[10px] text-slate-400">Paga al instante con tu número de celular</span>
                </div>
              </div>
              ${this.selectedPaymentMethod === 'nequi' ? '<i data-lucide="check-circle" class="w-4 h-4 text-purple-600"></i>' : ''}
            </label>

            <!-- Opción: Daviplata -->
            <label onclick="ClienteApp.selectedPaymentMethod = 'daviplata'; ClienteApp.openCheckoutModal();" class="flex items-center justify-between p-2.5 rounded-xl border ${this.selectedPaymentMethod === 'daviplata' ? 'border-red-500 bg-red-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-red-300'} cursor-pointer transition">
              <div class="flex items-center gap-2.5">
                <input type="radio" name="paymentMethod" value="daviplata" ${this.selectedPaymentMethod === 'daviplata' ? 'checked' : ''} class="accent-red-600">
                <span class="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs shadow-sm">D</span>
                <div>
                  <span class="font-bold text-slate-900 block text-xs">Daviplata</span>
                  <span class="text-[10px] text-slate-400">Transferencia rápida desde la app</span>
                </div>
              </div>
              ${this.selectedPaymentMethod === 'daviplata' ? '<i data-lucide="check-circle" class="w-4 h-4 text-red-600"></i>' : ''}
            </label>

            <!-- Opción: Pagar en Caja -->
            <label onclick="ClienteApp.selectedPaymentMethod = 'in_store'; ClienteApp.openCheckoutModal();" class="flex items-center justify-between p-2.5 rounded-xl border ${this.selectedPaymentMethod === 'in_store' ? 'border-emerald-500 bg-emerald-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-300'} cursor-pointer transition">
              <div class="flex items-center gap-2.5">
                <input type="radio" name="paymentMethod" value="in_store" ${this.selectedPaymentMethod === 'in_store' ? 'checked' : ''} class="accent-emerald-600">
                <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">💵</span>
                <div>
                  <span class="font-bold text-slate-900 block text-xs">Pagar en Caja al Recoger</span>
                  <span class="text-[10px] text-slate-400">Paga con datáfono o efectivo en el restaurante</span>
                </div>
              </div>
              ${this.selectedPaymentMethod === 'in_store' ? '<i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>' : ''}
            </label>
          </div>
        </div>

        <!-- Desglose -->
        <div class="space-y-1.5 pt-2 border-t border-slate-100">
          <div class="flex justify-between text-slate-500">
            <span>Precio habitual carta:</span>
            <span class="line-through">${SharedStore.formatCurrency(totalOriginal)}</span>
          </div>
          <div class="flex justify-between font-bold text-emerald-600">
            <span>Ahorro total SalvaPlato:</span>
            <span>-${SharedStore.formatCurrency(totalSaved)}</span>
          </div>
          <div class="flex justify-between font-black text-base text-slate-900 pt-1 border-t border-slate-200">
            <span>Total a pagar:</span>
            <span class="text-emerald-700">${SharedStore.formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>

      <div class="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <button onclick="document.getElementById('order-modal').classList.add('hidden')" class="w-1/3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600">
          Cancelar
        </button>
        <button onclick="ClienteApp.confirmOrder()" class="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5">
          <i data-lucide="qr-code" class="w-4 h-4"></i>
          <span>Generar Código QR</span>
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  confirmOrder() {
    if (this.cart.length === 0) return;

    const firstItem = this.cart[0];
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const voucherId = 'vch-' + Date.now();
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const titles = this.cart.map(i => `${i.quantity}x ${i.title}`).join(', ');

    const activeCard = this.userCards.find(c => c.id === this.selectedCardId) || this.userCards[0];
    const paymentLabelMap = {
      'card': `${activeCard?.brandName || 'Tarjeta'} •••• ${activeCard?.numberLast4 || '4589'}`,
      'nequi': `Nequi (${this.currentUser?.phone || '+57 312 445 9901'})`,
      'daviplata': `Daviplata (${this.currentUser?.phone || '+57 312 445 9901'})`,
      'in_store': 'Pago en Caja (Efectivo / Datáfono)',
      'salvacoins': 'Billetera SalvaCoins'
    };

    const newVoucher = {
      id: voucherId,
      pin: randomPin,
      restaurantId: firstItem.restaurantId,
      restaurantName: firstItem.restaurantName,
      restaurantAddress: firstItem.restaurantAddress,
      offerTitle: titles,
      paymentMethod: paymentLabelMap[this.selectedPaymentMethod] || 'Tarjeta Débito/Crédito',
      deliveryAddress: this.activeAddress ? `${this.activeAddress.tag}: ${this.activeAddress.line1}` : 'Bogotá D.C.',
      originalPrice: this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0),
      discountedPrice: totalPrice,
      discountPercent: Math.round(((this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0) - totalPrice) / (this.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0) || 1)) * 100),
      pickupWindow: "Hoy durante el turno",
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 45 * 60 * 1000).toISOString() // 45 minutos de ventana de recogida
    };

    let allVouchers = SharedStore.getVouchers();
    allVouchers.unshift(newVoucher);
    SharedStore.saveVouchers(allVouchers);
    this.vouchers = allVouchers;

    this.cart = [];
    this.updateCartUI();
    document.getElementById('order-modal')?.classList.add('hidden');
    document.getElementById('restaurant-detail-modal')?.classList.add('hidden');

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.openTicketModal(newVoucher.id);
    this.renderMyVouchers();
  },

  // ==========================================================
  // 8. TICKET CON CÓDIGO QR EN TIEMPO REAL & MÁQUINA DE ESTADOS
  // ==========================================================
  openTicketModal(voucherId) {
    this.activeTicketVoucherId = voucherId;
    if (this.ticketTimerInterval) clearInterval(this.ticketTimerInterval);
    if (this.ticketSyncInterval) clearInterval(this.ticketSyncInterval);

    this.vouchers = SharedStore.getVouchers();
    const voucher = this.vouchers.find(v => v.id === voucherId);
    if (!voucher) return;

    if (!voucher.expiresAt && voucher.createdAt) {
      voucher.expiresAt = new Date(new Date(voucher.createdAt).getTime() + 45 * 60 * 1000).toISOString();
    }

    const modal = document.getElementById('ticket-modal');
    const content = document.getElementById('ticket-modal-content');
    if (!modal || !content) return;

    const isRedeemed = voucher.status === 'redeemed';
    const isCancelled = voucher.status === 'cancelled' || voucher.status === 'expired';

    let statusPill = '⏳ LISTO PARA ESCANEAR';
    let statusHeaderGrad = 'from-emerald-600 via-teal-600 to-slate-900';
    if (isRedeemed) {
      statusPill = '✅ CANJEADO / ENTREGADO';
      statusHeaderGrad = 'from-slate-700 to-slate-900';
    } else if (isCancelled) {
      statusPill = voucher.status === 'expired' ? '⚠️ VENTANA EXPIRADA' : '❌ PEDIDO CANCELADO';
      statusHeaderGrad = 'from-rose-700 to-slate-900';
    }

    content.innerHTML = `
      <div class="bg-gradient-to-r ${statusHeaderGrad} p-3.5 text-white flex items-center justify-between">
        <button onclick="ClienteApp.closeTicketModal()" class="flex items-center gap-1 bg-black/35 hover:bg-black/55 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Atrás</span>
        </button>
        <span class="inline-block bg-white/20 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
          ${statusPill}
        </span>
        <button onclick="ClienteApp.closeTicketModal()" class="text-white/80 hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-3 bg-slate-900 text-white text-center">
        <h3 class="font-black text-sm">${voucher.restaurantName}</h3>
        <p class="text-xs text-white/80 truncate max-w-[240px] mx-auto">${voucher.offerTitle}</p>
      </div>

      <div class="p-5 text-center space-y-3.5">
        
        <!-- Temporizador de Recogida en Vivo (Si está activo) -->
        ${!isRedeemed && !isCancelled ? `
          <div id="ticket-countdown-box" class="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-2.5 flex items-center justify-between text-xs transition">
            <div class="flex items-center gap-2">
              <span id="ticket-countdown-pulse" class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span id="ticket-countdown-label" class="text-slate-700 font-medium text-[11px]">Tiempo para recoger:</span>
            </div>
            <span id="ticket-countdown-val" class="font-mono font-black text-emerald-700 text-sm">Calculando...</span>
          </div>
        ` : ''}

        <!-- Contenedor del Código QR Real Autónomo -->
        <div id="ticket-qr-area" class="flex flex-col items-center justify-center">
          <div id="ticket-qr-container" class="p-3 border-2 ${isRedeemed ? 'border-slate-300 opacity-40' : (isCancelled ? 'border-rose-300 opacity-40' : 'border-emerald-500 shadow-xl')} rounded-3xl bg-white inline-block transition">
            <!-- Canvas o SVG inyectado por RealQREncoder -->
          </div>
          <span id="ticket-qr-caption" class="text-[11px] font-bold ${isRedeemed ? 'text-slate-500' : (isCancelled ? 'text-rose-600' : 'text-slate-700')} mt-2 block">
            ${isRedeemed ? '✅ Pedido validado y entregado' : (isCancelled ? (voucher.status === 'expired' ? '⚠️ Este cupón expiró por tiempo' : '❌ Cupón cancelado y reembolsado') : '📱 Muestra este QR al cajero o mesero para escanear')}
          </span>
          <span class="text-[10px] text-slate-400 font-mono mt-0.5 block">
            Orden: #${voucher.id.slice(-6).toUpperCase()} • PIN de respaldo: ${voucher.pin}
          </span>
        </div>

        <!-- PIN de Respaldo por si el restaurante no tiene cámara -->
        <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
          <span class="text-[11px] text-slate-500 font-medium">PIN de respaldo en caja:</span>
          <span class="font-mono text-base font-black ${isRedeemed || isCancelled ? 'text-slate-400 line-through' : 'text-slate-900'} tracking-widest">${voucher.pin}</span>
        </div>

        <!-- Detalles del Pedido -->
        <div class="bg-slate-50 p-3 rounded-2xl text-left text-xs space-y-1.5 border border-slate-100">
          <div class="flex justify-between">
            <span class="text-slate-500">Total:</span>
            <span class="font-black text-emerald-700 text-sm">${SharedStore.formatCurrency(voucher.discountedPrice)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Método de pago:</span>
            <span class="font-bold text-slate-800 truncate max-w-[170px]">${voucher.paymentMethod || 'Tarjeta Débito/Crédito'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Dirección local:</span>
            <span class="font-medium text-slate-700 text-right truncate max-w-[170px]">${voucher.restaurantAddress}</span>
          </div>
          ${voucher.redeemedAt ? `
            <div class="flex justify-between border-t border-slate-200 pt-1 text-[11px]">
              <span class="text-slate-500">Entregado a las:</span>
              <span class="font-bold text-slate-800">${voucher.redeemedAt}</span>
            </div>
          ` : ''}
          ${voucher.cancelReason ? `
            <div class="flex justify-between border-t border-rose-200 pt-1 text-[11px] text-rose-700">
              <span>Motivo cancelación:</span>
              <span class="font-bold text-right">${voucher.cancelReason}</span>
            </div>
          ` : ''}
        </div>

        <!-- Botones de Acción según Estado -->
        ${!isRedeemed && !isCancelled ? `
          <button onclick="ClienteApp.openCancelModal('${voucher.id}')" class="w-full py-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-rose-200/80">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
            <span>¿Problemas con el pedido? Cancelar y Reembolsar</span>
          </button>
        ` : ''}

        ${isRedeemed ? `
          <div class="pt-1">
            <button onclick="ClienteApp.openRatingModal('${voucher.id}')" class="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20">
              <i data-lucide="star" class="w-4 h-4 fill-white"></i>
              <span>${voucher.rating ? 'Ver Mi Calificación' : 'Calificar Experiencia (+50 SalvaCoins 🪙)'}</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    // Generar código QR real escaneable
    const qrBox = document.getElementById('ticket-qr-container');
    if (qrBox && window.QREngine) {
      const salt = voucher.createdAt ? new Date(voucher.createdAt).getTime() : Date.now();
      const qrPayload = `SP:${voucher.id}:${voucher.pin}:${voucher.discountedPrice}:${salt}`;
      QREngine.renderQR(qrBox, qrPayload, 190);
    }

    // Iniciar temporizador regresivo si está activo
    if (!isRedeemed && !isCancelled) {
      this.startTicketCountdown(voucher);
    }

    // Polling en vivo para detectar escaneo en caja instantáneamente
    if (!isRedeemed && !isCancelled) {
      this.ticketSyncInterval = setInterval(() => {
        const freshVouchers = SharedStore.getVouchers();
        const fresh = freshVouchers.find(item => item.id === voucher.id);
        if (fresh && fresh.status === 'redeemed') {
          clearInterval(this.ticketSyncInterval);
          this.handleVoucherRedeemedLive(voucher.id);
        }
      }, 1000);
    }
  },

  closeTicketModal() {
    this.activeTicketVoucherId = null;
    if (this.ticketTimerInterval) clearInterval(this.ticketTimerInterval);
    if (this.ticketSyncInterval) clearInterval(this.ticketSyncInterval);
    document.getElementById('ticket-modal')?.classList.add('hidden');
  },

  handleVoucherRedeemedLive(voucherId) {
    if (this.ticketTimerInterval) clearInterval(this.ticketTimerInterval);
    if (this.ticketSyncInterval) clearInterval(this.ticketSyncInterval);

    if (window.SoundEngine) SoundEngine.playSuccess();

    const qrArea = document.getElementById('ticket-qr-area');
    if (qrArea) {
      qrArea.innerHTML = `
        <div class="py-6 px-4 bg-emerald-50 border-2 border-emerald-500 rounded-3xl animate-bounce">
          <div class="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
            <i data-lucide="check" class="w-10 h-10 stroke-[3]"></i>
          </div>
          <h4 class="font-black text-emerald-900 text-base">¡PEDIDO ENTREGADO! 🎉</h4>
          <p class="text-xs text-emerald-700 font-medium mt-1">El restaurante ha escaneado tu código con éxito.</p>
          <span class="text-[10px] text-emerald-600 font-bold block mt-2">Abriendo calificación en 2 segundos...</span>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    }

    this.showToast('🎉 ¡Tu pedido ha sido entregado por el restaurante!');
    this.renderMyVouchers();

    setTimeout(() => {
      this.openRatingModal(voucherId);
    }, 2000);
  },

  startTicketCountdown(voucher) {
    const expiresAt = new Date(voucher.expiresAt).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = expiresAt - now;
      const box = document.getElementById('ticket-countdown-box');
      const pulse = document.getElementById('ticket-countdown-pulse');
      const val = document.getElementById('ticket-countdown-val');

      if (!val) return;

      if (diff <= 0) {
        clearInterval(this.ticketTimerInterval);
        val.textContent = 'Expirado';
        if (box) {
          box.className = 'bg-rose-50 border border-rose-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-rose-700';
        }
        if (pulse) pulse.className = 'w-2.5 h-2.5 rounded-full bg-rose-500';
        voucher.status = 'expired';
        SharedStore.saveVouchers(this.vouchers);
        this.renderMyVouchers();
        return;
      }

      const totalSec = Math.floor(diff / 1000);
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      val.textContent = formatted;

      if (mins < 5) {
        if (box) box.className = 'bg-rose-50 border border-rose-300 rounded-2xl p-2.5 flex items-center justify-between text-xs text-rose-700 animate-pulse';
        if (pulse) pulse.className = 'w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping';
      } else if (mins < 15) {
        if (box) box.className = 'bg-amber-50 border border-amber-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-amber-700';
        if (pulse) pulse.className = 'w-2.5 h-2.5 rounded-full bg-amber-500';
      }
    };

    updateTimer();
    this.ticketTimerInterval = setInterval(updateTimer, 1000);
  },

  openCancelModal(voucherId) {
    this.vouchers = SharedStore.getVouchers();
    const voucher = this.vouchers.find(v => v.id === voucherId);
    if (!voucher) return;

    const modal = document.getElementById('cancel-order-modal');
    const content = document.getElementById('cancel-order-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="bg-gradient-to-r from-rose-600 to-rose-700 p-4 text-white flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="alert-octagon" class="w-5 h-5 text-white"></i>
          <h3 class="font-black text-sm">Cancelar Pedido & Reembolso</h3>
        </div>
        <button onclick="document.getElementById('cancel-order-modal').classList.add('hidden')" class="text-white/80 hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-5 space-y-4 text-xs">
        <div class="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 space-y-1">
          <span class="font-bold text-rose-900 block">Garantía SalvaPlato 100%:</span>
          <p class="text-rose-700 text-[11px] leading-relaxed">
            Se reembolsarán de inmediato <strong class="text-rose-950 font-black">${SharedStore.formatCurrency(voucher.discountedPrice)}</strong> a tu saldo de SalvaPlato Coins para usar en cualquier otro local.
          </p>
        </div>

        <div class="space-y-2">
          <label class="font-bold text-slate-800 block text-xs">Selecciona el motivo de cancelación:</label>
          <div class="space-y-1.5" id="cancel-reasons-group">
            <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="cancel_reason" value="El restaurante o local está cerrado" checked class="text-rose-600 focus:ring-rose-500">
              <span class="text-slate-700 font-medium">🔒 El restaurante o local está cerrado</span>
            </label>
            <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="cancel_reason" value="El local no tenía el producto disponible" class="text-rose-600 focus:ring-rose-500">
              <span class="text-slate-700 font-medium">📦 No tenían el producto disponible en caja</span>
            </label>
            <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="cancel_reason" value="Tiempo de espera excesivo" class="text-rose-600 focus:ring-rose-500">
              <span class="text-slate-700 font-medium">⏱️ Fila / Tiempo de espera excesivo</span>
            </label>
            <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="cancel_reason" value="Emergencia personal / no alcanzo a llegar" class="text-rose-600 focus:ring-rose-500">
              <span class="text-slate-700 font-medium">🚗 Emergencia personal / no alcanzo a llegar</span>
            </label>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2">
          <button onclick="document.getElementById('cancel-order-modal').classList.add('hidden')" class="w-1/3 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition">
            Volver
          </button>
          <button onclick="ClienteApp.executeCancelOrder('${voucher.id}')" class="w-2/3 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition shadow-md shadow-rose-600/30 flex items-center justify-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            <span>Confirmar Reembolso</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  executeCancelOrder(voucherId) {
    this.vouchers = SharedStore.getVouchers();
    const voucher = this.vouchers.find(v => v.id === voucherId);
    if (!voucher) return;

    const checkedReason = document.querySelector('input[name="cancel_reason"]:checked')?.value || 'Cancelado por usuario';
    voucher.status = 'cancelled';
    voucher.cancelReason = checkedReason;
    voucher.cancelledAt = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

    // Reembolso inmediato al saldo de SalvaPlato Coins
    if (this.currentUser) {
      this.currentUser.walletBalance = (this.currentUser.walletBalance || 0) + voucher.discountedPrice;
      localStorage.setItem('salvaplato_client_user', JSON.stringify(this.currentUser));
      this.updateUserUI();
    }

    SharedStore.saveVouchers(this.vouchers);
    document.getElementById('cancel-order-modal')?.classList.add('hidden');

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast(`✅ Pedido cancelado. Se reembolsaron ${SharedStore.formatCurrency(voucher.discountedPrice)} a tus SalvaCoins.`);

    this.openTicketModal(voucher.id);
    this.renderMyVouchers();
  },

  openRatingModal(voucherId) {
    this.vouchers = SharedStore.getVouchers();
    const voucher = this.vouchers.find(v => v.id === voucherId);
    if (!voucher) return;

    this.currentRatingStars = voucher.rating?.stars || 5;
    this.selectedRatingChips = voucher.rating?.chips || ['Comida Fresca', 'Entrega Rápida'];

    const modal = document.getElementById('rating-order-modal');
    const content = document.getElementById('rating-order-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-4 text-white flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="star" class="w-5 h-5 fill-white text-amber-200"></i>
          <h3 class="font-black text-sm">Calificar Experiencia</h3>
        </div>
        <button onclick="document.getElementById('rating-order-modal').classList.add('hidden')" class="text-white/80 hover:text-white p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-5 text-center space-y-4 text-xs">
        <div>
          <h4 class="font-black text-slate-800 text-sm">${voucher.restaurantName}</h4>
          <p class="text-xs text-slate-500 mt-0.5">${voucher.offerTitle}</p>
        </div>

        <!-- 5 Estrellas Interactivas -->
        <div class="flex items-center justify-center gap-2 py-1" id="star-rating-row">
          ${[1, 2, 3, 4, 5].map(star => `
            <button type="button" onclick="ClienteApp.selectRatingStar(${star})" class="star-btn transition transform hover:scale-125 focus:outline-none p-1" data-star="${star}">
              <i data-lucide="star" class="w-8 h-8 ${star <= this.currentRatingStars ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}"></i>
            </button>
          `).join('')}
        </div>
        <span id="star-rating-text" class="text-xs font-bold text-amber-700 block">
          ${this.getStarLabel(this.currentRatingStars)}
        </span>

        <!-- Chips de Etiquetas Rápidas -->
        <div class="text-left space-y-1.5 pt-1">
          <span class="text-slate-500 font-bold text-[11px] block">¿Qué te gustó de este pedido?</span>
          <div class="flex flex-wrap gap-1.5" id="rating-chips-container">
            ${[
              { id: 'fresca', label: '🌿 Comida Fresca' },
              { id: 'caliente', label: '🔥 Buen Punto/Caliente' },
              { id: 'rapido', label: '⏱️ Entrega Rápida' },
              { id: 'porcion', label: '🍽️ Porción Generosa' },
              { id: 'atencion', label: '🤝 Excelente Atención' }
            ].map(chip => {
              const active = this.selectedRatingChips.includes(chip.label);
              return `
                <button type="button" onclick="ClienteApp.toggleRatingChip('${chip.label}')" class="rating-chip-btn px-2.5 py-1 rounded-xl text-[11px] font-bold border transition ${active ? 'bg-amber-50 border-amber-400 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-600'}">
                  ${chip.label}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Comentario Adicional -->
        <div class="text-left space-y-1">
          <label class="text-slate-500 font-bold text-[11px]">Comentario opcional:</label>
          <input type="text" id="rating-comment-input" value="${voucher.rating?.comment || ''}" placeholder="Ej. El empaque y la salsa estaban geniales..." class="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none">
        </div>

        <!-- Botón Enviar con Recompensa de 50 Coins -->
        <button onclick="ClienteApp.submitRating('${voucher.id}')" class="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5">
          <i data-lucide="award" class="w-4 h-4"></i>
          <span>${voucher.rating ? 'Guardar Cambios' : 'Enviar Calificación (+50 SalvaCoins 🪙)'}</span>
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  selectRatingStar(stars) {
    this.currentRatingStars = stars;
    document.querySelectorAll('#star-rating-row .star-btn').forEach(btn => {
      const s = parseInt(btn.dataset.star, 10);
      const icon = btn.querySelector('svg');
      if (icon) {
        if (s <= stars) {
          icon.classList.add('text-amber-400', 'fill-amber-400');
          icon.classList.remove('text-slate-300');
        } else {
          icon.classList.remove('text-amber-400', 'fill-amber-400');
          icon.classList.add('text-slate-300');
        }
      }
    });
    const labelEl = document.getElementById('star-rating-text');
    if (labelEl) labelEl.textContent = this.getStarLabel(stars);
  },

  getStarLabel(stars) {
    const labels = {
      1: '😞 Muy decepcionante',
      2: '😐 Regular',
      3: '🙂 Bueno',
      4: '😋 ¡Muy rico y fresco!',
      5: '🤩 ¡Excelente! Superó mis expectativas'
    };
    return labels[stars] || '¡Excelente!';
  },

  toggleRatingChip(chipLabel) {
    if (this.selectedRatingChips.includes(chipLabel)) {
      this.selectedRatingChips = this.selectedRatingChips.filter(c => c !== chipLabel);
    } else {
      this.selectedRatingChips.push(chipLabel);
    }
    document.querySelectorAll('#rating-chips-container .rating-chip-btn').forEach(btn => {
      const active = this.selectedRatingChips.includes(btn.textContent.trim());
      btn.className = `rating-chip-btn px-2.5 py-1 rounded-xl text-[11px] font-bold border transition ${active ? 'bg-amber-50 border-amber-400 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`;
    });
  },

  submitRating(voucherId) {
    this.vouchers = SharedStore.getVouchers();
    const voucher = this.vouchers.find(v => v.id === voucherId);
    if (!voucher) return;

    const isFirstTime = !voucher.rating;
    const comment = document.getElementById('rating-comment-input')?.value.trim() || '';

    voucher.rating = {
      stars: this.currentRatingStars,
      chips: [...this.selectedRatingChips],
      comment: comment,
      date: new Date().toISOString()
    };

    if (isFirstTime && this.currentUser) {
      this.currentUser.walletBalance = (this.currentUser.walletBalance || 0) + 50;
      localStorage.setItem('salvaplato_client_user', JSON.stringify(this.currentUser));
      this.updateUserUI();
    }

    SharedStore.saveVouchers(this.vouchers);
    document.getElementById('rating-order-modal')?.classList.add('hidden');

    if (window.SoundEngine) SoundEngine.playSuccess();
    this.showToast(isFirstTime ? '🌟 ¡Gracias por calificar! Recibiste +50 SalvaCoins 🪙' : '✅ Calificación actualizada');

    this.renderMyVouchers();
    if (this.activeTicketVoucherId === voucherId) {
      this.openTicketModal(voucherId);
    }
  },

  setVoucherFilter(filter) {
    this.voucherFilter = filter;
    ['active', 'redeemed', 'cancelled'].forEach(f => {
      const btn = document.getElementById(`vfilter-btn-${f}`);
      if (btn) {
        if (f === filter) {
          btn.className = 'flex-1 py-1.5 px-2 rounded-xl transition bg-white text-emerald-700 shadow-sm flex items-center justify-center gap-1';
        } else {
          btn.className = 'flex-1 py-1.5 px-2 rounded-xl transition hover:text-slate-900 text-slate-600 flex items-center justify-center gap-1';
        }
      }
    });
    this.renderMyVouchers();
  },

  renderMyVouchers() {
    const container = document.getElementById('my-vouchers-list');
    if (!container) return;

    this.vouchers = SharedStore.getVouchers();

    // Actualizar contadores en badges
    const activeVouchers = this.vouchers.filter(v => v.status === 'active' || (!v.status && !v.isRedeemed));
    const redeemedVouchers = this.vouchers.filter(v => v.status === 'redeemed');
    const cancelledVouchers = this.vouchers.filter(v => v.status === 'cancelled' || v.status === 'expired');

    const bActive = document.getElementById('badge-count-active');
    const bRedeemed = document.getElementById('badge-count-redeemed');
    const bCancelled = document.getElementById('badge-count-cancelled');
    if (bActive) bActive.textContent = activeVouchers.length;
    if (bRedeemed) bRedeemed.textContent = redeemedVouchers.length;
    if (bCancelled) bCancelled.textContent = cancelledVouchers.length;

    let displayList = [];
    if (this.voucherFilter === 'redeemed') {
      displayList = redeemedVouchers;
    } else if (this.voucherFilter === 'cancelled') {
      displayList = cancelledVouchers;
    } else {
      displayList = activeVouchers;
    }

    if (displayList.length === 0) {
      const emptyStates = {
        active: {
          title: 'No tienes pedidos activos',
          desc: 'Explora ofertas en Crepes, El Corral o Frisby y salva tu primer plato hoy.',
          btn: 'Explorar Restaurantes'
        },
        redeemed: {
          title: 'Aún no has reclamado pedidos',
          desc: 'Aquí verás el historial de todos los platos que hayas recogido en caja.',
          btn: null
        },
        cancelled: {
          title: 'No hay pedidos cancelados',
          desc: 'Todos tus pedidos se han gestionado sin cancelaciones ni contingencias.',
          btn: null
        }
      };
      const st = emptyStates[this.voucherFilter] || emptyStates.active;

      container.innerHTML = `
        <div class="text-center py-10 px-4 bg-white rounded-2xl border border-slate-100">
          <div class="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-2.5">
            <i data-lucide="${this.voucherFilter === 'active' ? 'ticket' : (this.voucherFilter === 'redeemed' ? 'check-circle' : 'shield-alert')}" class="w-6 h-6"></i>
          </div>
          <h4 class="font-bold text-slate-800 text-sm">${st.title}</h4>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">${st.desc}</p>
          ${st.btn ? `
            <button onclick="ClienteApp.setTab('feed')" class="mt-3.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow">
              ${st.btn}
            </button>
          ` : ''}
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = displayList.map(v => {
      const isRedeemed = v.status === 'redeemed';
      const isCancelled = v.status === 'cancelled' || v.status === 'expired';

      return `
        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-3">
          <div class="space-y-1 min-w-0 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                isRedeemed ? 'bg-slate-100 text-slate-600' : (isCancelled ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800')
              }">
                ${isRedeemed ? 'Entregado' : (isCancelled ? (v.status === 'expired' ? 'Expirado' : 'Reembolsado') : 'Listo para escanear')}
              </span>
              <span class="text-xs font-mono font-bold text-slate-400">#${v.id.slice(-6).toUpperCase()}</span>
              ${!isRedeemed && !isCancelled ? `
                <span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">PIN: ${v.pin}</span>
              ` : ''}
            </div>
            <h4 class="font-bold text-slate-800 text-sm truncate">${v.restaurantName}</h4>
            <p class="text-xs text-slate-500 truncate">${v.offerTitle}</p>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-emerald-700">${SharedStore.formatCurrency(v.discountedPrice)}</span>
              ${v.rating ? `
                <span class="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                  <i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i> ${v.rating.stars}.0
                </span>
              ` : ''}
            </div>
          </div>

          <div class="flex flex-col gap-1.5 shrink-0">
            <button 
              onclick="ClienteApp.openTicketModal('${v.id}')"
              class="px-3.5 py-2 rounded-xl text-xs font-bold ${
                isRedeemed ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : (isCancelled ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700')
              } flex items-center gap-1 transition">
              <i data-lucide="qr-code" class="w-4 h-4"></i>
              <span>${isRedeemed ? 'Ver Recibo' : (isCancelled ? 'Ver Detalle' : 'Ver QR')}</span>
            </button>
            ${isRedeemed && !v.rating ? `
              <button 
                onclick="ClienteApp.openRatingModal('${v.id}')"
                class="px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 flex items-center justify-center gap-0.5 transition">
                <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>
                <span>Calificar (+50)</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  openProfileModal() {
    if (!this.currentUser) return;
    const modal = document.getElementById('profile-modal');
    const content = document.getElementById('profile-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white relative">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/60">
          <button onclick="document.getElementById('profile-modal').classList.add('hidden')" class="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>Atrás</span>
          </button>
          <button onclick="document.getElementById('profile-modal').classList.add('hidden')" class="text-slate-400 hover:text-white p-1">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-full border-2 border-emerald-500 overflow-hidden bg-slate-700 shrink-0">
            <img src="${this.currentUser.avatar}" class="w-full h-full object-cover">
          </div>
          <div>
            <span class="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
              Comensal SalvaPlato
            </span>
            <h3 class="font-black text-base mt-0.5">${this.currentUser.name}</h3>
            <p class="text-xs text-slate-300">${this.currentUser.email}</p>
          </div>
        </div>
      </div>

      <div class="p-5 space-y-4 text-xs text-slate-700">
        <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Billetera SalvaCoins</span>
            <span class="text-xl font-black text-emerald-700">${SharedStore.formatCurrency(this.currentUser.walletBalance)}</span>
            <span class="text-[10px] text-emerald-600 block mt-0.5">Saldo redimible en tus compras</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            🌱
          </div>
        </div>

        <!-- Botón para gestionar Tarjetas -->
        <button onclick="ClienteApp.openCardModal()" class="w-full p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-between transition">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <i data-lucide="credit-card" class="w-4 h-4"></i>
            </div>
            <div class="text-left">
              <span class="font-bold text-slate-800 text-xs block">Mis Tarjetas Débito / Crédito</span>
              <span class="text-[10px] text-slate-400">${this.userCards.length} tarjetas guardadas</span>
            </div>
          </div>
          <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
        </button>

        <div class="grid grid-cols-2 gap-2 text-center">
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-400 block font-medium">Comida Salvada</span>
            <span class="font-black text-slate-900 text-sm">${this.currentUser.kgSaved} kg</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="text-[10px] text-slate-400 block font-medium">Ciudad Activa</span>
            <span class="font-black text-slate-900 text-sm">${this.currentUser.city}</span>
          </div>
        </div>

        <button onclick="ClienteApp.logout()" class="w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition flex items-center justify-center gap-1">
          <i data-lucide="log-out" class="w-4 h-4"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 bg-slate-900 text-white transition-all duration-300`;
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
  ClienteApp.init();
});
