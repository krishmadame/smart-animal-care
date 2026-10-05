/**
 * SMART ANIMAL CARE - Global JavaScript
 * "Healthy Animals, Happy Farmers"
 * 
 * Features:
 * 1. Mobile Navigation & Drawer
 * 2. Sticky Header & Back to Top
 * 3. Centralized Multi-language Translation Engine (EN / HI / MR)
 * 4. Toast Notification Utility
 * 5. Animal Care Search, Filter & Dynamic Detailed Modal (i18n)
 * 6. Disease Guide Search & Category Filters (i18n)
 * 7. Nutrition Interactive Feed Ration Calculator (i18n units)
 * 8. Preventive Care Checklist & Progress Tracker (i18n)
 * 9. Vaccination Reminder System (LocalStorage CRUD with i18n badges & labels)
 * 10. Find a Vet Search, Specialty Filter, Location & Call Modals
 * 11. Contact Form Client-side Validation & Feedback (i18n error toasts)
 * 12. Accessible FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyHeader();
  initBackToTop();
  initToast();
  initFAQAccordions();

  // Page-specific initializers (runs automatically if elements exist on page)
  initAnimalCarePage();
  initDiseasePage();
  initNutritionPage();
  initPreventiveCarePage();
  initFindVetPage();
  initContactPage();

  // Initialize Language Selector AFTER page initializers so dynamic callbacks are registered
  initLanguageSelector();
});

/* ==========================================================================
   1. MOBILE NAVIGATION & DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('mobileNavDrawer');
  const navBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !navDrawer || !navBackdrop) return;

  function toggleMenu(isOpen) {
    menuToggle.classList.toggle('is-active', isOpen);
    navDrawer.classList.toggle('open', isOpen);
    navBackdrop.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', () => {
    const isCurrentlyOpen = navDrawer.classList.contains('open');
    toggleMenu(!isCurrentlyOpen);
  });

  navBackdrop.addEventListener('click', () => toggleMenu(false));

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   2. STICKY HEADER & BACK TO TOP
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   3. CENTRALIZED MULTI-LANGUAGE TRANSLATION ENGINE (EN | HI | MR)
   ========================================================================== */
// Master dictionary loaded from js/translations.js
const TRANSLATIONS = window.APP_TRANSLATIONS || {};
const ANIMAL_DETAILS_DATA_I18N = window.ANIMAL_DETAILS_DATA_I18N || {};
const DYNAMIC_UI_I18N = window.DYNAMIC_UI_I18N || {};

let currentLang = 'en';
const langChangeCallbacks = [];

function onLanguageChange(callback) {
  if (typeof callback === 'function') {
    langChangeCallbacks.push(callback);
  }
}

function getCurrentLanguage() {
  return currentLang;
}

function getDynamicText(key, fallback = '') {
  if (DYNAMIC_UI_I18N[currentLang] && DYNAMIC_UI_I18N[currentLang][key] !== undefined) {
    return DYNAMIC_UI_I18N[currentLang][key];
  }
  if (DYNAMIC_UI_I18N['en'] && DYNAMIC_UI_I18N['en'][key] !== undefined) {
    return DYNAMIC_UI_I18N['en'][key];
  }
  return fallback || key;
}

function initLanguageSelector() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const storedLang = localStorage.getItem('smart_animal_care_lang') || 'en';

  setLanguage(storedLang, false);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang) {
        setLanguage(selectedLang, true);
      }
    });
  });
}

function setLanguage(lang, showToastFeedback = false) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  currentLang = lang;
  localStorage.setItem('smart_animal_care_lang', lang);

  // Set document language attribute for accessibility
  document.documentElement.lang = lang;

  // Update active state on language selector buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  const langDict = TRANSLATIONS[lang] || {};

  // 1. Update text/HTML content for data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langDict[key] !== undefined) {
      el.innerHTML = langDict[key];
    }
  });

  // 2. Update placeholder attributes for inputs
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (langDict[key] !== undefined) {
      el.setAttribute('placeholder', langDict[key]);
    }
  });

  // 3. Update title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (langDict[key] !== undefined) {
      el.setAttribute('title', langDict[key]);
    }
  });

  // 4. Update aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (langDict[key] !== undefined) {
      el.setAttribute('aria-label', langDict[key]);
    }
  });

  // 5. Notify all registered dynamic page listeners
  langChangeCallbacks.forEach(cb => {
    try {
      cb(lang);
    } catch (err) {
      console.warn('Error executing language callback:', err);
    }
  });

  if (showToastFeedback) {
    const langNames = { en: 'English', hi: 'हिंदी (Hindi)', mr: 'मराठी (Marathi)' };
    const switchMsg = getDynamicText('toast_lang_switched', 'Language switched to {lang}')
      .replace('{lang}', langNames[lang] || lang);
    showToast(switchMsg, '🌐');
  }
}

/* ==========================================================================
   4. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function initToast() {
  if (!document.getElementById('toastNotice')) {
    const toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    toast.innerHTML = '<span class="toast-icon">🌿</span> <span class="toast-message"></span>';
    document.body.appendChild(toast);
  }
}

function showToast(message, icon = '🌿') {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  const msgSpan = toast.querySelector('.toast-message');
  const iconSpan = toast.querySelector('.toast-icon');

  if (msgSpan) msgSpan.textContent = message;
  if (iconSpan) iconSpan.textContent = icon;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   5. ANIMAL CARE PAGE (animals.html)
   ========================================================================== */
let currentOpenAnimalKey = null;

function initAnimalCarePage() {
  const searchInput = document.getElementById('animalSearchInput');
  const filterPills = document.querySelectorAll('.animal-filter-pill');
  const animalCards = document.querySelectorAll('.animal-card');
  const noResults = document.getElementById('animalNoResults');
  const resultsCount = document.getElementById('animalResultsCount');

  if (!animalCards.length) return;

  function filterAnimals() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activePill = document.querySelector('.animal-filter-pill.active');
    const selectedCategory = activePill ? activePill.getAttribute('data-filter') : 'all';

    let visibleCount = 0;

    animalCards.forEach(card => {
      const cardType = card.getAttribute('data-animal-type');
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (selectedCategory === 'all' || cardType === selectedCategory);
      const matchesQuery = !query || cardText.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCount) {
      const template = getDynamicText('showing_animals', 'Showing {shown} of {total} animals');
      resultsCount.textContent = template
        .replace('{shown}', visibleCount)
        .replace('{total}', animalCards.length);
    }

    if (noResults) {
      noResults.classList.toggle('show', visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterAnimals);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterAnimals();
    });
  });

  // Modal open buttons
  const detailButtons = document.querySelectorAll('.btn-view-animal-details');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const animalKey = btn.getAttribute('data-animal');
      openAnimalModal(animalKey);
    });
  });

  // Modal close handlers
  const modalOverlay = document.getElementById('animalDetailModal');
  const modalCloseBtn = document.getElementById('closeAnimalModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeAnimalModal();
    });
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeAnimalModal);
  }

  // Register language change callback for animal care page
  onLanguageChange(() => {
    filterAnimals();
    if (currentOpenAnimalKey) {
      openAnimalModal(currentOpenAnimalKey);
    }
  });

  // Initial filter run
  filterAnimals();
}

function openAnimalModal(animalKey) {
  currentOpenAnimalKey = animalKey;
  const lang = getCurrentLanguage();
  const langData = (ANIMAL_DETAILS_DATA_I18N[lang] && ANIMAL_DETAILS_DATA_I18N[lang][animalKey])
    ? ANIMAL_DETAILS_DATA_I18N[lang][animalKey]
    : (ANIMAL_DETAILS_DATA_I18N['en'] ? ANIMAL_DETAILS_DATA_I18N['en'][animalKey] : null);

  const modal = document.getElementById('animalDetailModal');
  if (!langData || !modal) return;

  const modalTitle = document.getElementById('modalAnimalName');
  const modalSpecies = document.getElementById('modalAnimalSpecies');
  const modalTag = document.getElementById('modalAnimalTag');
  const modalLifespan = document.getElementById('modalAnimalLifespan');
  const modalGestation = document.getElementById('modalAnimalGestation');
  const modalTemp = document.getElementById('modalAnimalTemp');
  const modalWater = document.getElementById('modalAnimalWater');
  const modalIntro = document.getElementById('modalAnimalIntro');
  const modalFeeding = document.getElementById('modalAnimalFeeding');
  const modalRedFlags = document.getElementById('modalAnimalRedFlags');

  if (modalTitle) modalTitle.textContent = langData.name;
  if (modalSpecies) modalSpecies.textContent = langData.species;
  if (modalTag) modalTag.textContent = langData.tag;
  if (modalLifespan) modalLifespan.textContent = langData.lifespan;
  if (modalGestation) modalGestation.textContent = langData.gestation;
  if (modalTemp) modalTemp.textContent = langData.bodyTemp;
  if (modalWater) modalWater.textContent = langData.dailyWater;
  if (modalIntro) modalIntro.textContent = langData.intro;
  if (modalFeeding) modalFeeding.textContent = langData.feeding;
  if (modalRedFlags) modalRedFlags.textContent = langData.redFlags;

  const tipsList = document.getElementById('modalAnimalCareTips');
  if (tipsList) {
    tipsList.innerHTML = '';
    langData.careTips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });
  }

  const concernsList = document.getElementById('modalAnimalConcerns');
  if (concernsList) {
    concernsList.innerHTML = '';
    langData.healthConcerns.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      concernsList.appendChild(li);
    });
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAnimalModal() {
  currentOpenAnimalKey = null;
  const modal = document.getElementById('animalDetailModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   6. DISEASE PAGE (diseases.html)
   ========================================================================== */
function initDiseasePage() {
  const searchInput = document.getElementById('diseaseSearchInput');
  const categoryPills = document.querySelectorAll('.disease-category-pill');
  const speciesSelect = document.getElementById('diseaseSpeciesSelect');
  const diseaseCards = document.querySelectorAll('.disease-card');
  const noResults = document.getElementById('diseaseNoResults');
  const resultsCount = document.getElementById('diseaseResultsCount');

  if (!diseaseCards.length) return;

  function filterDiseases() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activePill = document.querySelector('.disease-category-pill.active');
    const selectedCategory = activePill ? activePill.getAttribute('data-category') : 'all';
    const selectedSpecies = speciesSelect ? speciesSelect.value : 'all';

    let visibleCount = 0;

    diseaseCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const speciesList = card.getAttribute('data-species') || '';
      const text = card.textContent.toLowerCase();

      const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);
      const matchesSpecies = (selectedSpecies === 'all' || speciesList.includes(selectedSpecies));
      const matchesQuery = !query || text.includes(query);

      if (matchesCategory && matchesSpecies && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCount) {
      const template = getDynamicText('showing_diseases', 'Showing {shown} of {total} documented diseases');
      resultsCount.textContent = template
        .replace('{shown}', visibleCount)
        .replace('{total}', diseaseCards.length);
    }

    if (noResults) {
      noResults.classList.toggle('show', visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterDiseases);
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterDiseases();
    });
  });

  if (speciesSelect) {
    speciesSelect.addEventListener('change', filterDiseases);
  }

  // Register dynamic language callback for diseases page
  onLanguageChange(() => {
    filterDiseases();
  });

  // Initial filter run
  filterDiseases();
}

/* ==========================================================================
   7. NUTRITION PAGE & FEED RATION CALCULATOR (nutrition.html)
   ========================================================================== */
function initNutritionPage() {
  const animalSelect = document.getElementById('calcAnimalType');
  const weightInput = document.getElementById('calcWeight');
  const milkInput = document.getElementById('calcMilk');
  const stageSelect = document.getElementById('calcStage');

  const outDM = document.getElementById('outDM');
  const outGreen = document.getElementById('outGreen');
  const outDry = document.getElementById('outDry');
  const outConc = document.getElementById('outConcentrate');
  const outWater = document.getElementById('outWater');
  const outMineral = document.getElementById('outMineral');

  if (!animalSelect || !weightInput || !milkInput) return;

  function calculateRation() {
    const animal = animalSelect.value;
    const weight = parseFloat(weightInput.value) || 0;
    const milk = parseFloat(milkInput.value) || 0;
    const stage = stageSelect ? stageSelect.value : 'lactating';

    if (weight <= 0) return;

    let dmPercent = 2.5; // percentage of body weight
    let waterPerKg = 0.15; // base liters water per kg BW
    let concPerMilk = 0.4; // kg concentrate per kg milk
    let maintConc = 1.0;
    let mineralDose = 50;

    if (animal === 'buffalo') {
      dmPercent = 2.8;
      waterPerKg = 0.18;
      concPerMilk = 0.5;
      maintConc = 1.5;
      mineralDose = 60;
    } else if (animal === 'goat') {
      dmPercent = 3.5;
      waterPerKg = 0.12;
      concPerMilk = 0.35;
      maintConc = 0.25;
      mineralDose = 15;
    } else if (animal === 'sheep') {
      dmPercent = 3.2;
      waterPerKg = 0.10;
      concPerMilk = 0.30;
      maintConc = 0.20;
      mineralDose = 10;
    }

    if (stage === 'pregnant') {
      maintConc += (animal === 'cow' || animal === 'buffalo') ? 1.0 : 0.2;
    } else if (stage === 'dry') {
      concPerMilk = 0;
    }

    // Calculations
    const totalDM = (weight * (dmPercent / 100));
    const totalConcentrate = (maintConc + (milk * concPerMilk));
    const concDM = totalConcentrate * 0.90;
    const roughageDM = Math.max(0, totalDM - concDM);

    const greenDM = roughageDM * 0.55;
    const dryDM = roughageDM * 0.45;

    const freshGreenFodder = greenDM / 0.20;
    const dryRoughage = dryDM / 0.90;

    const dailyWater = (weight * waterPerKg) + (milk * 2.5);

    // Units localized from DYNAMIC_UI_I18N
    const uKgDay = getDynamicText('unit_kg_day', 'kg / day');
    const uKg = getDynamicText('unit_kg', 'kg');
    const uLiters = getDynamicText('unit_liters', 'Liters');
    const uGrams = getDynamicText('unit_grams', 'grams');

    if (outDM) outDM.textContent = `${totalDM.toFixed(1)} ${uKgDay}`;
    if (outGreen) outGreen.textContent = `${Math.round(freshGreenFodder)} - ${Math.round(freshGreenFodder * 1.15)} ${uKg}`;
    if (outDry) outDry.textContent = `${dryRoughage.toFixed(1)} - ${(dryRoughage * 1.2).toFixed(1)} ${uKg}`;
    if (outConc) outConc.textContent = `${totalConcentrate.toFixed(1)} ${uKg}`;
    if (outWater) outWater.textContent = `${Math.round(dailyWater)} - ${Math.round(dailyWater + 15)} ${uLiters}`;
    if (outMineral) outMineral.textContent = `${mineralDose} ${uGrams}`;
  }

  animalSelect.addEventListener('change', () => {
    if (animalSelect.value === 'cow') {
      weightInput.value = 400;
      milkInput.value = 10;
    } else if (animalSelect.value === 'buffalo') {
      weightInput.value = 500;
      milkInput.value = 8;
    } else if (animalSelect.value === 'goat') {
      weightInput.value = 40;
      milkInput.value = 2;
    } else if (animalSelect.value === 'sheep') {
      weightInput.value = 35;
      milkInput.value = 0;
    }
    calculateRation();
  });

  weightInput.addEventListener('input', calculateRation);
  milkInput.addEventListener('input', calculateRation);
  if (stageSelect) stageSelect.addEventListener('change', calculateRation);

  // Animal filter tabs for nutrition cards
  const nutritionTabs = document.querySelectorAll('.nutrition-tab-btn');
  const nutritionSections = document.querySelectorAll('.nutrition-animal-section');
  if (nutritionTabs.length && nutritionSections.length) {
    nutritionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-animal');
        nutritionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        nutritionSections.forEach(sec => {
          if (target === 'all' || sec.getAttribute('data-animal') === target) {
            sec.style.display = 'block';
          } else {
            sec.style.display = 'none';
          }
        });
      });
    });
  }

  // Register language change callback for nutrition page
  onLanguageChange(() => {
    calculateRation();
  });

  // Initial calculation
  calculateRation();
}

/* ==========================================================================
   8. PREVENTIVE CARE PAGE & VACCINATION REMINDER (care-tips.html)
   ========================================================================== */
function initPreventiveCarePage() {
  initChecklistTracker();
  initVaccinationReminders();
}

function initChecklistTracker() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const progressBadge = document.getElementById('checklistProgressBadge');
  if (!checkboxes.length) return;

  function updateProgress() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    const percent = Math.round((checkedCount / checkboxes.length) * 100);
    if (progressBadge) {
      const template = getDynamicText('checklist_progress', '{done}/{total} Completed ({percent}%)');
      progressBadge.textContent = template
        .replace('{done}', checkedCount)
        .replace('{total}', checkboxes.length)
        .replace('{percent}', percent);
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateProgress);
  });

  // Register callback
  onLanguageChange(() => {
    updateProgress();
  });

  // Initial update
  updateProgress();
}

function initVaccinationReminders() {
  const form = document.getElementById('reminderForm');
  const listContainer = document.getElementById('remindersListContainer');
  const emptyState = document.getElementById('remindersEmptyState');
  const clearAllBtn = document.getElementById('clearRemindersBtn');

  if (!form || !listContainer) return;

  const STORAGE_KEY = 'smart_animal_care_reminders';

  // Seed default realistic sample reminders if first time
  if (!localStorage.getItem(STORAGE_KEY)) {
    const defaultReminders = [
      {
        id: 'rem-1',
        tag: 'Cow - Gauri (#104)',
        animal: 'Cow',
        vaccine: 'Foot & Mouth Disease (FMD Booster)',
        dateGiven: '2026-03-15',
        dueDate: '2026-09-15',
        notes: 'Administer deep intramuscular injection in neck'
      },
      {
        id: 'rem-2',
        tag: 'Buffalo - Kalu (#082)',
        animal: 'Buffalo',
        vaccine: 'Hemorrhagic Septicemia (HS Annual)',
        dateGiven: '2026-04-10',
        dueDate: '2026-10-10',
        notes: 'Pre-monsoon booster dose'
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReminders));
  }

  function getReminders() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveReminders(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderReminders();
  }

  function renderReminders() {
    const items = getReminders();
    listContainer.innerHTML = '';

    if (items.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const today = new Date();
    const lblVaccine = getDynamicText('lbl_vaccine', 'Vaccine');
    const lblNextDue = getDynamicText('lbl_next_due', 'Next Due');
    const lblAdministered = getDynamicText('lbl_administered', 'Administered');
    const lblNote = getDynamicText('lbl_note', 'Note');
    const btnRemove = getDynamicText('btn_remove', '✕ Remove');
    const btnRemoveTitle = getDynamicText('btn_remove_title', 'Delete Reminder');

    items.forEach(item => {
      const dueDate = new Date(item.dueDate);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let badgeClass = 'badge-primary';
      let statusText = getDynamicText('days_left', '{n} days left').replace('{n}', diffDays);

      if (diffDays < 0) {
        badgeClass = 'badge-danger';
        statusText = getDynamicText('overdue_by', 'Overdue by {n} days').replace('{n}', Math.abs(diffDays));
      } else if (diffDays <= 14) {
        badgeClass = 'badge-warning';
        statusText = getDynamicText('due_in', 'Due in {n} days').replace('{n}', diffDays);
      }

      const card = document.createElement('div');
      card.className = 'reminder-item-card';
      card.innerHTML = `
        <div class="reminder-item-info">
          <h5>${escapeHTML(item.tag)} <span class="badge ${badgeClass}">${statusText}</span></h5>
          <p><strong>${escapeHTML(lblVaccine)}:</strong> ${escapeHTML(item.vaccine)}</p>
          <p><strong>${escapeHTML(lblNextDue)}:</strong> ${escapeHTML(item.dueDate)} | <strong>${escapeHTML(lblAdministered)}:</strong> ${escapeHTML(item.dateGiven || 'N/A')}</p>
          ${item.notes ? `<p class="text-muted"><small><em>${escapeHTML(lblNote)}: ${escapeHTML(item.notes)}</em></small></p>` : ''}
        </div>
        <button type="button" class="btn-delete-reminder" data-id="${item.id}" title="${escapeHTML(btnRemoveTitle)}">
          ${escapeHTML(btnRemove)}
        </button>
      `;

      listContainer.appendChild(card);
    });

    // Attach delete listeners
    listContainer.querySelectorAll('.btn-delete-reminder').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idToDelete = e.currentTarget.getAttribute('data-id');
        const updated = getReminders().filter(rem => rem.id !== idToDelete);
        saveReminders(updated);
        showToast(getDynamicText('toast_reminder_deleted', 'Reminder deleted successfully'), '🗑️');
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tag = document.getElementById('remTag').value.trim();
    const animal = document.getElementById('remAnimal').value;
    const vaccine = document.getElementById('remVaccine').value.trim();
    const dateGiven = document.getElementById('remDateGiven').value;
    const dueDate = document.getElementById('remDueDate').value;
    const notes = document.getElementById('remNotes').value.trim();

    if (!tag || !vaccine || !dueDate) {
      showToast(getDynamicText('toast_fill_reminder', 'Please fill in Animal Tag, Vaccine Name, and Due Date'), '⚠️');
      return;
    }

    const newReminder = {
      id: 'rem-' + Date.now(),
      tag,
      animal,
      vaccine,
      dateGiven,
      dueDate,
      notes
    };

    const current = getReminders();
    current.unshift(newReminder);
    saveReminders(current);

    form.reset();
    showToast(getDynamicText('toast_reminder_added', 'Vaccination Reminder added to your schedule!'), '✅');
  });

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      const confirmPrompt = getDynamicText('confirm_clear_reminders', 'Are you sure you want to clear all vaccination reminders?');
      if (confirm(confirmPrompt)) {
        saveReminders([]);
        showToast(getDynamicText('toast_reminders_cleared', 'All reminders cleared'), '🧹');
      }
    });
  }

  // Register language change callback
  onLanguageChange(() => {
    renderReminders();
  });

  // Initial render
  renderReminders();
}

/* ==========================================================================
   9. FIND A VET PAGE (veterinarians.html)
   ========================================================================== */
function initFindVetPage() {
  const searchInput = document.getElementById('vetSearchInput');
  const specialtyFilter = document.getElementById('vetSpecialtyFilter');
  const locationFilter = document.getElementById('vetLocationFilter');
  const vetCards = document.querySelectorAll('.vet-card');
  const noResults = document.getElementById('vetNoResults');
  const resultsCount = document.getElementById('vetResultsCount');

  if (!vetCards.length) return;

  function filterVets() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedSpecialty = specialtyFilter ? specialtyFilter.value : 'all';
    const selectedLocation = locationFilter ? locationFilter.value : 'all';

    let count = 0;

    vetCards.forEach(card => {
      const specialty = card.getAttribute('data-specialty') || '';
      const location = card.getAttribute('data-location') || '';
      const text = card.textContent.toLowerCase();

      const matchesSpecialty = (selectedSpecialty === 'all' || specialty.includes(selectedSpecialty));
      const matchesLocation = (selectedLocation === 'all' || location === selectedLocation);
      const matchesQuery = !query || text.includes(query);

      if (matchesSpecialty && matchesLocation && matchesQuery) {
        card.style.display = 'flex';
        count++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCount) {
      const template = getDynamicText('showing_vets', 'Showing {shown} of {total} veterinary centers');
      resultsCount.textContent = template
        .replace('{shown}', count)
        .replace('{total}', vetCards.length);
    }

    if (noResults) {
      noResults.classList.toggle('show', count === 0);
    }
  }

  if (searchInput) searchInput.addEventListener('input', filterVets);
  if (specialtyFilter) specialtyFilter.addEventListener('change', filterVets);
  if (locationFilter) locationFilter.addEventListener('change', filterVets);

  // Call Button handler
  document.querySelectorAll('.btn-vet-call').forEach(btn => {
    btn.addEventListener('click', () => {
      const doctorName = btn.getAttribute('data-doctor');
      const phone = btn.getAttribute('data-phone');
      openCallModal(doctorName, phone);
    });
  });

  // View Location handler
  document.querySelectorAll('.btn-vet-location').forEach(btn => {
    btn.addEventListener('click', () => {
      const clinic = btn.getAttribute('data-clinic');
      const address = btn.getAttribute('data-address');
      openLocationModal(clinic, address);
    });
  });

  // Location modal close
  const locationModal = document.getElementById('vetLocationModal');
  const closeLocBtn = document.getElementById('closeLocationModal');
  if (locationModal) {
    locationModal.addEventListener('click', (e) => {
      if (e.target === locationModal) closeLocationModal();
    });
  }
  if (closeLocBtn) closeLocBtn.addEventListener('click', closeLocationModal);

  // Call modal close
  const callModal = document.getElementById('vetCallModal');
  const closeCallBtn = document.getElementById('closeCallModal');
  if (callModal) {
    callModal.addEventListener('click', (e) => {
      if (e.target === callModal) closeCallModal();
    });
  }
  if (closeCallBtn) closeCallBtn.addEventListener('click', closeCallModal);

  // Register language change callback
  onLanguageChange(() => {
    filterVets();
  });

  // Initial filter run
  filterVets();
}

function openCallModal(doctor, phone) {
  const modal = document.getElementById('vetCallModal');
  if (!modal) return;

  const docEl = document.getElementById('callDoctorName');
  const phoneEl = document.getElementById('callPhoneNumber');
  const telLink = document.getElementById('callTelLink');

  if (docEl) docEl.textContent = doctor;
  if (phoneEl) phoneEl.textContent = phone;
  if (telLink) telLink.href = `tel:${phone}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCallModal() {
  const modal = document.getElementById('vetCallModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openLocationModal(clinic, address) {
  const modal = document.getElementById('vetLocationModal');
  if (!modal) return;

  const clinicEl = document.getElementById('locClinicName');
  const addrEl = document.getElementById('locAddress');

  if (clinicEl) clinicEl.textContent = clinic;
  if (addrEl) addrEl.textContent = address;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLocationModal() {
  const modal = document.getElementById('vetLocationModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   10. CONTACT / ABOUT PAGE (contact.html)
   ========================================================================== */
function initContactPage() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      markInvalid(nameInput, true);
      isValid = false;
    } else {
      markInvalid(nameInput, false);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      markInvalid(emailInput, true);
      isValid = false;
    } else {
      markInvalid(emailInput, false);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      markInvalid(subjectInput, true);
      isValid = false;
    } else {
      markInvalid(subjectInput, false);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      markInvalid(messageInput, true);
      isValid = false;
    } else {
      markInvalid(messageInput, false);
    }

    if (!isValid) {
      showToast(getDynamicText('toast_form_fix_fields', 'Please fix the highlighted fields in the form.'), '⚠️');
      return;
    }

    // Show academic demo success modal or toast
    const successModal = document.getElementById('contactSuccessModal');
    if (successModal) {
      successModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      showToast(getDynamicText('toast_inquiry_sent', 'Thank you! Your inquiry was successfully recorded (Demo Mode).'), '✅');
    }

    form.reset();
  });

  const successModal = document.getElementById('contactSuccessModal');
  const closeSuccessBtn = document.getElementById('closeContactSuccessModal');
  if (successModal && closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

function markInvalid(inputEl, isInvalid) {
  if (isInvalid) {
    inputEl.classList.add('is-invalid');
  } else {
    inputEl.classList.remove('is-invalid');
  }
}

/* ==========================================================================
   11. FAQ ACCORDION COMPONENT
   ========================================================================== */
function initFAQAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('active');

      // Close all others in same accordion group
      const parentGroup = item.closest('.accordion-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.accordion-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove('active');
        if (content) content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   12. HELPER UTILITIES
   ========================================================================== */
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
