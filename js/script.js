/**
 * SMART ANIMAL CARE - Global JavaScript
 * "Healthy Animals, Happy Farmers"
 * 
 * Features:
 * 1. Mobile Navigation & Drawer
 * 2. Sticky Header & Back to Top
 * 3. Multi-language Translation Engine (EN / HI / MR)
 * 4. Toast Notification Utility
 * 5. Animal Care Search, Filter & Detailed Modal
 * 6. Disease Guide Search & Category Filters
 * 7. Nutrition Interactive Feed Ration Calculator
 * 8. Preventive Care Checklist & Progress Tracker
 * 9. Vaccination Reminder System (LocalStorage CRUD)
 * 10. Find a Vet Search, Specialty Filter, Location & Call Modals
 * 11. Contact Form Client-side Validation & Feedback
 * 12. Accessible FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyHeader();
  initBackToTop();
  initLanguageSelector();
  initToast();
  initFAQAccordions();

  // Page-specific initializers (runs automatically if elements exist on page)
  initAnimalCarePage();
  initDiseasePage();
  initNutritionPage();
  initPreventiveCarePage();
  initFindVetPage();
  initContactPage();
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
   3. MULTI-LANGUAGE TRANSLATION (EN | HI | MR)
   ========================================================================== */
const TRANSLATIONS = {
  en: {
    'brand-tagline': 'Healthy Animals, Happy Farmers',
    'nav-home': 'Home',
    'nav-animals': 'Animals',
    'nav-diseases': 'Diseases',
    'nav-nutrition': 'Nutrition',
    'nav-care': 'Preventive Care',
    'nav-vet': 'Find a Vet',
    'nav-contact': 'About / Contact',
    'cta-find-vet': 'Find a Veterinarian',
    'hero-heading': 'Healthy Animals, <br><span>Happy Farmers</span>',
    'hero-subheading': 'Your Livestock’s Health Matters',
    'hero-text': 'Access animal healthcare information, nutrition guidance, preventive care tips and veterinary assistance in one place.',
    'explore-care': 'Explore Animal Care',
    'quick-access-title': 'Essential Livestock Healthcare Services',
    'disclaimer-title': 'Important Veterinary Notice',
    'disclaimer-text': 'This information is for educational purposes only and should not be used as a substitute for professional veterinary diagnosis or treatment. Always consult a qualified veterinarian for animal health emergencies.'
  },
  hi: {
    'brand-tagline': 'स्वस्थ पशु, समृद्ध किसान',
    'nav-home': 'होम',
    'nav-animals': 'पशु देखभाल',
    'nav-diseases': 'रोग जानकारी',
    'nav-nutrition': 'पशु आहार',
    'nav-care': 'निवारक देखभाल',
    'nav-vet': 'पशु चिकित्सक खोजें',
    'nav-contact': 'संपर्क / परिचय',
    'cta-find-vet': 'पशु चिकित्सक खोजें',
    'hero-heading': 'स्वस्थ पशु, <br><span>समृद्ध किसान</span>',
    'hero-subheading': 'आपके पशुधन का स्वास्थ्य सर्वोपरि',
    'hero-text': 'पशु स्वास्थ्य जानकारी, संतुलित आहार मार्गदर्शन, रोग निवारक उपाय और पशु चिकित्सा सहायता एक ही स्थान पर प्राप्त करें।',
    'explore-care': 'पशु देखभाल देखें',
    'quick-access-title': 'प्रमुख पशु स्वास्थ्य सेवाएं',
    'disclaimer-title': 'महत्वपूर्ण पशु चिकित्सा सूचना',
    'disclaimer-text': 'यह जानकारी केवल शैक्षणिक और जागरूकता उद्देश्यों के लिए है। इसे पेशेवर पशु चिकित्सक के निदान या उपचार का विकल्प न मानें। बीमारी की स्थिति में योग्य पशु चिकित्सक से तुरंत संपर्क करें।'
  },
  mr: {
    'brand-tagline': 'निरोगी जनावरे, सुखी शेतकरी',
    'nav-home': 'मुख्यपृष्ठ',
    'nav-animals': 'जनावरांची काळजी',
    'nav-diseases': 'आजार माहिती',
    'nav-nutrition': 'पशुखाद्य व पोषण',
    'nav-care': 'प्रतिबंधात्मक काळजी',
    'nav-vet': 'पशुवैद्य शोधा',
    'nav-contact': 'संपर्क / माहिती',
    'cta-find-vet': 'पशुवैद्यक शोधा',
    'hero-heading': 'निरोगी जनावरे, <br><span>सुखी शेतकरी</span>',
    'hero-subheading': 'आपल्या पशुधनाचे आरोग्य अत्यंत महत्त्वाचे',
    'hero-text': 'पशु आरोग्य माहिती, संतुलित आहार मार्गदर्शन, रोग प्रतिबंधक उपाय आणि पशुवैद्यकीय सहाय्य एकाच ठिकाणी मिळवा.',
    'explore-care': 'जनावरांची माहिती पहा',
    'quick-access-title': 'प्रमुख पशु आरोग्य सेवा',
    'disclaimer-title': 'महत्त्वाची पशुवैद्यकीय सूचना',
    'disclaimer-text': 'ही माहिती केवळ शैक्षणिक आणि जनजागृतीसाठी आहे. यास तज्ज्ञ पशुवैद्यांच्या उपचारांचा पर्याय मानू नये. जनावरांच्या आजारपणात त्वरित अधिकृत पशुवैद्यकीय अधिकाऱ्यांशी संपर्क साधावा.'
  }
};

function initLanguageSelector() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const storedLang = localStorage.getItem('smart_animal_care_lang') || 'en';

  setLanguage(storedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang) {
        setLanguage(selectedLang);
        showToast(`Language switched to ${btn.textContent.trim()}`);
      }
    });
  });
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  localStorage.setItem('smart_animal_care_lang', lang);

  // Update active state on buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update DOM elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      if (TRANSLATIONS[lang][key].includes('<')) {
        el.innerHTML = TRANSLATIONS[lang][key];
      } else {
        el.textContent = TRANSLATIONS[lang][key];
      }
    }
  });
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
const ANIMAL_DETAILS_DATA = {
  cow: {
    name: 'Dairy Cattle (Cow / गाय)',
    species: 'Bos taurus / Bos indicus',
    image: 'images/cow.jpg',
    tag: 'Ruminant Herbivore',
    lifespan: '15 - 20 Years',
    gestation: '280 - 285 Days',
    bodyTemp: '38.5°C - 39.2°C (101.5°F - 102.5°F)',
    dailyWater: '60 - 90 Liters',
    intro: 'Cattle are vital milk and draught animals across farming communities. Common Indian indigenous breeds include Gir, Sahiwal, and Red Sindhi, alongside high-yielding crossbreds (Jersey & Holstein Friesian crosses).',
    careTips: [
      'Provide well-ventilated, clean, dry housing with grooved non-slippery floor.',
      'Ensure 24/7 access to fresh, uncontaminated drinking water in cleaned troughs.',
      'Wash udder with warm potassium permanganate solution before milking to prevent Mastitis.',
      'Provide comfortable bedding (dry paddy straw or rubber mats) to avoid hock lesions and lameness.',
      'Observe daily rumination (chewing cud); absence of rumination is an early red flag for illness.'
    ],
    feeding: 'Daily diet requires balanced dry matter (2.5-3.0% of body weight). Provide 25-30 kg green fodder (Napier, Maize, Berseem), 5-7 kg dry roughage (wheat/paddy straw), and 1 kg concentrate feed for every 2.5-3 liters of milk produced plus mineral mixture (50g/day).',
    healthConcerns: [
      'Bovine Mastitis (inflammation of udder and teat canal)',
      'Foot and Mouth Disease (FMD) - High fever and vesicular lesions',
      'Hemorrhagic Septicemia (HS / Galghontu) - Acute throat swelling',
      'Bloat / Ruminal Acidosis caused by sudden carbohydrate excess'
    ],
    redFlags: 'Cessation of rumination, high rectal temperature (>103°F), watery discharge from eyes/nose, swollen hard quarter of udder, or blood in milk require urgent veterinary care.'
  },
  buffalo: {
    name: 'Water Buffalo (Buffalo / भैंस)',
    species: 'Bubalus bubalis',
    image: 'images/buffalo.jpg',
    tag: 'Dairy & Draught Animal',
    lifespan: '18 - 25 Years',
    gestation: '305 - 315 Days',
    bodyTemp: '37.5°C - 38.5°C (100.0°F - 101.5°F)',
    dailyWater: '80 - 110 Liters',
    intro: 'Water buffaloes (notably Murrah, Nili-Ravi, Mehsana, and Jaffarabadi) are famous for rich, high-fat milk (7-8% fat). They thrive on high-roughage diets but require special heat mitigation as they have fewer sweat glands.',
    careTips: [
      'Buffaloes are prone to heat stress. Provide wallowing ponds or water splashing 2-3 times daily in hot summers.',
      'Provide shaded sheds with high roofs and cooling ceiling fans/misting during summer afternoons.',
      'Protect teats from soil contamination; buffalo teats have wider teat canals vulnerable to bacterial entry.',
      'Maintain deworming every 3-4 months, especially before and after the monsoon season.'
    ],
    feeding: 'Buffaloes have excellent ruminal fiber digestion. Daily ration: 30-35 kg green fodder, 6-8 kg chopped dry straw, and 1 kg concentrate for every 2 liters of buffalo milk plus 50-60g mineral mixture and iodized salt.',
    healthConcerns: [
      'Subclinical and Clinical Mastitis',
      'Hemorrhagic Septicemia (very high fatality in buffalo calves)',
      'Silent Heat / Sub-estrus (requires vigilant estrus detection at dawn and dusk)',
      'Uterine Prolapse during pre- or post-calving'
    ],
    redFlags: 'Panting with tongue extended, lack of wallowing desire, sudden milk drop, abnormal vaginal discharge, or swelling in lower neck requires emergency veterinary intervention.'
  },
  goat: {
    name: 'Domestic Goat (Goat / बकरी)',
    species: 'Capra hircus',
    image: 'images/goat.jpg',
    tag: 'Small Ruminant',
    lifespan: '10 - 15 Years',
    gestation: '145 - 152 Days',
    bodyTemp: '38.5°C - 39.5°C (101.5°F - 103.5°F)',
    dailyWater: '5 - 10 Liters',
    intro: 'Often called the "Poor Man’s Cow", goats (such as Jamunapari, Boer, Black Bengal, Sirohi, and Osmanabadi) offer high prolificacy, low initial investment, and nutritious easily digestible milk.',
    careTips: [
      'Goats hate dampness and rain. House them on raised slatted wooden or bamboo floors with dry surroundings.',
      'They are natural browsers; allow browsing on tree leaves (Subabul, Neem, Ber) rather than just ground grass.',
      'Inspect hooves every month and trim overgrown hooves to prevent contagious Foot Rot.',
      'Young kids must receive colostrum within 1-2 hours of birth to build passive maternal immunity.'
    ],
    feeding: 'Goats consume 3-4% of body weight in dry matter. Feed high-quality legume fodder (Lucerne, Berseem, Cowpea), tree loppings, 200-400g concentrate grain mixture during lactation/pregnancy, and clean salt licks.',
    healthConcerns: [
      'PPR (Peste des Petits Ruminants / Goat Plague) - Highly contagious viral illness',
      'Enterotoxemia (Pulpy Kidney Disease) triggered by rich green feed',
      'Coccidiosis and Gastrointestinal Nematodes (Haemonchus / wireworm)',
      'Contagious Caprine Pleuropneumonia (CCPP)'
    ],
    redFlags: 'Nasal discharge with mouth sores, foul watery diarrhea, sudden recumbency (inability to stand), or pale inner eyelids (severe anemia from worms) indicates acute distress.'
  },
  sheep: {
    name: 'Domestic Sheep (Sheep / भेड़)',
    species: 'Ovis aries',
    image: 'images/sheep.jpg',
    tag: 'Wool & Meat Ruminant',
    lifespan: '10 - 12 Years',
    gestation: '145 - 150 Days',
    bodyTemp: '38.5°C - 39.5°C (102.0°F - 103.5°F)',
    dailyWater: '4 - 8 Liters',
    intro: 'Sheep (popular breeds include Deccani, Nellore, Marwari, Mandya, and Bharat Merino) are gregarious flock grazers well-adapted to arid and semi-arid terrain, providing wool, meat, and organic manure.',
    careTips: [
      'Practice regular dipping or spraying 2-3 weeks after shearing to control external ectoparasites (lice, ticks, mites).',
      'Provide dry, well-drained shelters. Sheep fleece absorbs water, predisposing them to hypothermia and pneumonia.',
      'Trim hooves periodically and run flocks through a 5% copper sulfate or formalin footbath to treat foot rot.',
      'Never feed cattle mineral mixtures to sheep! Sheep are uniquely sensitive to copper toxicity.'
    ],
    feeding: 'Sheep thrive on natural grazing (6-8 hours daily on pasture or rangeland). Supplement pregnant ewes and breeding rams with 150-300g concentrate mixture (cracked maize, bran, oil cake) and provide free-choice sheep-safe mineral blocks.',
    healthConcerns: [
      'Enterotoxemia (Overeating Disease) - vaccinate prior to monsoon pasture flush',
      'Sheep Pox - fever and papular skin eruptions',
      'Foot Rot caused by Dichelobacter nodosus in muddy pens',
      'Blue Tongue Disease spread by biting Culicoides midges'
    ],
    redFlags: 'Lameness spreading through flock, swollen blue tongue, sudden death of robust animals after grazing, or blistering skin lesions must be reported to the nearest dispensary.'
  }
};

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
      resultsCount.textContent = `Showing ${visibleCount} of ${animalCards.length} animals`;
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
}

function openAnimalModal(animalKey) {
  const data = ANIMAL_DETAILS_DATA[animalKey];
  const modal = document.getElementById('animalDetailModal');
  if (!data || !modal) return;

  document.getElementById('modalAnimalName').textContent = data.name;
  document.getElementById('modalAnimalSpecies').textContent = data.species;
  document.getElementById('modalAnimalTag').textContent = data.tag;
  document.getElementById('modalAnimalLifespan').textContent = data.lifespan;
  document.getElementById('modalAnimalGestation').textContent = data.gestation;
  document.getElementById('modalAnimalTemp').textContent = data.bodyTemp;
  document.getElementById('modalAnimalWater').textContent = data.dailyWater;
  document.getElementById('modalAnimalIntro').textContent = data.intro;
  document.getElementById('modalAnimalFeeding').textContent = data.feeding;
  document.getElementById('modalAnimalRedFlags').textContent = data.redFlags;

  const tipsList = document.getElementById('modalAnimalCareTips');
  tipsList.innerHTML = '';
  data.careTips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  const concernsList = document.getElementById('modalAnimalConcerns');
  concernsList.innerHTML = '';
  data.healthConcerns.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    concernsList.appendChild(li);
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAnimalModal() {
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
      resultsCount.textContent = `Showing ${visibleCount} of ${diseaseCards.length} documented diseases`;
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
}

/* ==========================================================================
   7. NUTRITION PAGE & FEED RATION CALCULATOR (nutrition.html)
   ========================================================================== */
function initNutritionPage() {
  // Feed Ration Calculator Elements
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
      concPerMilk = 0.5; // buffalo milk has higher fat
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
    const totalDM = (weight * (dmPercent / 100)); // kg Dry Matter
    const totalConcentrate = (maintConc + (milk * concPerMilk));
    
    // Concentrate contributes roughly 90% DM
    const concDM = totalConcentrate * 0.90;
    const roughageDM = Math.max(0, totalDM - concDM);

    // Roughage split: ~60% from green fodder (20% DM content) and 40% from dry roughage (90% DM content)
    const greenDM = roughageDM * 0.55;
    const dryDM = roughageDM * 0.45;

    const freshGreenFodder = greenDM / 0.20; // 20% dry matter in fresh greens
    const dryRoughage = dryDM / 0.90;       // 90% dry matter in dry straw

    const dailyWater = (weight * waterPerKg) + (milk * 2.5);

    // Render results
    if (outDM) outDM.textContent = `${totalDM.toFixed(1)} kg / day`;
    if (outGreen) outGreen.textContent = `${Math.round(freshGreenFodder)} - ${Math.round(freshGreenFodder * 1.15)} kg`;
    if (outDry) outDry.textContent = `${dryRoughage.toFixed(1)} - ${(dryRoughage * 1.2).toFixed(1)} kg`;
    if (outConc) outConc.textContent = `${totalConcentrate.toFixed(1)} kg`;
    if (outWater) outWater.textContent = `${Math.round(dailyWater)} - ${Math.round(dailyWater + 15)} Liters`;
    if (outMineral) outMineral.textContent = `${mineralDose} grams`;
  }

  animalSelect.addEventListener('change', () => {
    // Set sensible defaults per animal
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

  // Initial calculation
  calculateRation();

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
      progressBadge.textContent = `${checkedCount}/${checkboxes.length} Completed (${percent}%)`;
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateProgress);
  });
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

    items.forEach(item => {
      const dueDate = new Date(item.dueDate);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let badgeClass = 'badge-primary';
      let statusText = `${diffDays} days left`;

      if (diffDays < 0) {
        badgeClass = 'badge-danger';
        statusText = `Overdue by ${Math.abs(diffDays)} days`;
      } else if (diffDays <= 14) {
        badgeClass = 'badge-warning';
        statusText = `Due in ${diffDays} days`;
      }

      const card = document.createElement('div');
      card.className = 'reminder-item-card';
      card.innerHTML = `
        <div class="reminder-item-info">
          <h5>${escapeHTML(item.tag)} <span class="badge ${badgeClass}">${statusText}</span></h5>
          <p><strong>Vaccine:</strong> ${escapeHTML(item.vaccine)}</p>
          <p><strong>Next Due:</strong> ${escapeHTML(item.dueDate)} | <strong>Administered:</strong> ${escapeHTML(item.dateGiven || 'N/A')}</p>
          ${item.notes ? `<p class="text-muted"><small><em>Note: ${escapeHTML(item.notes)}</em></small></p>` : ''}
        </div>
        <button type="button" class="btn-delete-reminder" data-id="${item.id}" title="Delete Reminder">
          ✕ Remove
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
        showToast('Reminder deleted successfully', '🗑️');
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
      showToast('Please fill in Animal Tag, Vaccine Name, and Due Date', '⚠️');
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
    showToast('Vaccination Reminder added to your schedule!', '✅');
  });

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all vaccination reminders?')) {
        saveReminders([]);
        showToast('All reminders cleared', '🧹');
      }
    });
  }

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
      resultsCount.textContent = `Showing ${count} of ${vetCards.length} veterinary centers`;
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
}

function openCallModal(doctor, phone) {
  const modal = document.getElementById('vetCallModal');
  if (!modal) return;

  document.getElementById('callDoctorName').textContent = doctor;
  document.getElementById('callPhoneNumber').textContent = phone;
  const telLink = document.getElementById('callTelLink');
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

  document.getElementById('locClinicName').textContent = clinic;
  document.getElementById('locAddress').textContent = address;

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
      showToast('Please fix the highlighted fields in the form.', '⚠️');
      return;
    }

    // Show academic demo success modal or banner
    const successModal = document.getElementById('contactSuccessModal');
    if (successModal) {
      successModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      showToast('Thank you! Your inquiry was successfully recorded (Demo Mode).', '✅');
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
