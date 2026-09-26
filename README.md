# SMART ANIMAL CARE (स्मार्ट पशु देखभाल)
### *“Healthy Animals, Happy Farmers”*

An animal healthcare and livestock management information platform designed primarily for farmers, dairy producers, and smallholder livestock owners.

---

## 1. Project Purpose & Academic Context

**Smart Animal Care** is a student capstone project developed to bridge the digital gap in veterinary information dissemination. In rural agricultural communities, lack of timely knowledge regarding early disease symptoms, scientific feed ratios, and vaccination schedules often leads to avoidable livestock morbidity, reduced milk yields, and severe financial losses.

This platform provides:
* **Animal healthcare information** tailored for major livestock (Cow, Buffalo, Goat, Sheep).
* **Common livestock disease index** with symptoms, supportive first aid, and critical clinical warning signs.
* **Nutrition & feeding guidance** with an interactive scientific Dry Matter & feed ration calculator.
* **Preventive healthcare practices** including housing hygiene, biosecurity checklists, and master vaccination schedules.
* **Veterinary assistance locator** connecting farmers with registered doctors, government polyclinics, and mobile ambulatory services.
* **Vaccination Reminder Tool** leveraging client-side LocalStorage to track herd immunization dates.
* **Multi-language user interface foundation** (English, हिंदी, मराठी).

> **IMPORTANT MEDICAL NOTICE:**
> Smart Animal Care is an educational information platform and is **NOT** a replacement for a qualified veterinarian. For disease diagnosis, surgical intervention, or prescription medications, farmers are instructed to always consult a registered veterinary professional.

---

## 2. Key Features

1. **Species-Specific Animal Care Guides (`animals.html`)**
   - Detailed biological baselines (gestation period, body temperature, water requirements, lifespan).
   - In-depth husbandry, housing, and milk hygiene guidance.
   - Interactive live search by breed or keyword and dynamic category filtering.
   - Expandable modal dialog with clinical red flags and care routines.

2. **Livestock Disease Guide (`diseases.html`)**
   - 10 documented diseases (Foot & Mouth Disease, Hemorrhagic Septicemia, Black Quarter, Mastitis, Lumpy Skin Disease, PPR, Bloat, Anthrax, Babesiosis, Enterotoxemia).
   - Vernacular local naming, symptom tag pills, biosecurity prevention, and supportive care.
   - Prominent red alert box: *"When to contact a veterinarian"*.
   - Filter by disease category (Viral, Bacterial, Parasitic, Metabolic) and affected species.

3. **Animal Nutrition Guide & Feed Calculator (`nutrition.html`)**
   - The 5 pillars of ruminant feeding: Green fodder, dry roughage, concentrates, mineral mixtures, and clean water.
   - **Interactive Feed Ration Calculator:** Dynamically computes total Dry Matter (DM), green fodder, straw, concentrate feed, and daily water based on animal type, body weight, and milk production.
   - Tabbed animal-specific feeding tables for lactating, pregnant, and dry animals.

4. **Preventive Care & Vaccination Reminders (`care-tips.html`)**
   - 6 core preventive pillars: clean shelters, shed sanitation, vaccination, deworming, clean water, and quarantine pens.
   - **Interactive Biosecurity Checklist:** Real-time completion score calculation as the farmer ticks off daily tasks.
   - **Vaccination Reminder Tool:** Add, view, and delete herd immunization reminders with status badges (days remaining, due soon, overdue) stored locally in browser `localStorage`.
   - Master regional vaccination timetable covering age, booster frequency, and seasonal timings.

5. **Find a Veterinarian Directory (`veterinarians.html`)**
   - Sample verified clinic directory with doctor credentials, available services, addresses, and timings.
   - Filter by clinical specialty (Cattle Specialist, Surgery, Dairy Health, Mobile Ambulatory, 24/7 Emergency) and region.
   - Interactive modals for direct telephone dialing and clinic address routing.
   - Google Maps API-ready architectural placeholder and National Animal Ambulance Helpline (1962).

6. **About, Contact & FAQ (`contact.html`)**
   - Project academic objectives, architecture overview, and future scope.
   - Client-side validated contact form with real-time feedback and submission confirmation modal.
   - Interactive accordion FAQ addressing common agricultural and veterinary queries.

7. **Multi-Language Selector Structure**
   - Switch seamlessly between English, हिंदी (Hindi), and मराठी (Marathi) via the navigation header with instant live translation updates across key labels.

---

## 3. Technology Stack

* **Structure:** HTML5 (Semantic elements, accessible ARIA attributes)
* **Styling:** Vanilla CSS3 (Custom properties/tokens, responsive Flexbox and CSS Grid, glassmorphism, smooth micro-interactions, responsive breakpoints)
* **Logic:** Vanilla JavaScript (ES6+, DOM manipulation, Event delegation, LocalStorage persistence, regular expression validation)
* **Typography:** Google Fonts (*Outfit* for headings, *Plus Jakarta Sans* for body readability)
* **Zero External Runtime Dependencies:** Works 100% offline without requiring npm, node modules, or external frameworks.

---

## 4. Project Folder Structure

```text
SmartAnimalCare/
│
├── index.html            # Main Homepage (Hero, Quick Access, Why Us, How It Works)
├── animals.html          # Animal Care Page (Cattle, Buffalo, Goat, Sheep guides)
├── diseases.html         # Livestock Disease Guide (Searchable clinical library)
├── nutrition.html        # Nutrition Guide & Interactive Feed Ration Calculator
├── care-tips.html        # Preventive Care & Vaccination Reminder (LocalStorage)
├── veterinarians.html    # Find a Vet Directory, Emergency Hotlines & Modals
├── contact.html          # About Project, Validated Contact Form & FAQ Accordion
│
├── css/
│   └── style.css         # Unified responsive design system & component styles
│
├── js/
│   └── script.js         # Comprehensive client-side logic, search, calculators & storage
│
├── images/               # Curated local high-resolution agricultural & livestock assets
│   ├── hero-farm.jpg
│   ├── cow.jpg
│   ├── buffalo.jpg
│   ├── goat.jpg
│   ├── sheep.jpg
│   ├── vet-care.jpg
│   ├── nutrition.jpg
│   ├── shelter.jpg
│   ├── vaccine.jpg
│   ├── vet-clinic.jpg
│   ├── doctor1.jpg
│   ├── doctor2.jpg
│   ├── doctor3.jpg
│   ├── doctor4.jpg
│   └── doctor5.jpg
│
└── README.md             # Project documentation & academic report
```

---

## 5. How to Run Locally

Because Smart Animal Care is built using pure, standard web technologies, no compiler or package manager is required.

### Method 1: Direct Browser Launch
1. Navigate to the project folder: `SmartAnimalCare/`
2. Double click `index.html` (or right-click & select *Open With* -> Chrome, Edge, Firefox, or Safari).
3. The website will immediately open and run with full functionality.

### Method 2: Local HTTP Server (Recommended for presentations)
Using Python's built-in HTTP server:
```bash
# In the project root directory:
python -m http.server 8000
```
Then visit: `http://localhost:8000` in your web browser.

Using Node.js `npx serve`:
```bash
npx serve .
```

---

## 6. Future Scope & Backend Integration Architecture

The frontend has been developed with clean separation of concerns, semantic data attributes, and form endpoints to allow seamless connection to a full-stack backend:

1. **Python Flask / FastAPI Backend:**
   - Expose RESTful APIs for livestock disease search (`/api/v1/diseases`), feed calculators (`/api/v1/nutrition/ration`), and veterinarian appointment requests (`/api/v1/vets/book`).
2. **Relational Database (MySQL / PostgreSQL):**
   - Tables for `Farmers`, `Animals`, `Diseases`, `Vaccinations`, and `Clinics`.
3. **Google Maps JavaScript API Integration:**
   - Geolocation-based distance calculation showing live driving time to the nearest emergency polyclinic.
4. **AI Livestock Disease Scanner:**
   - Integration of a TensorFlow / PyTorch image classification model to detect skin lesions (e.g., Lumpy Skin Disease, Sheep Pox) via mobile camera photos.
5. **Full Regional Language Expansion:**
   - Voice-assisted queries for non-literate farmers with text-to-speech audio outputs in regional dialects.
6. **Progressive Web App (PWA) Offline Caching:**
   - Service workers caching feeding tables and first aid instructions so farmers can reference them in fields with no cellular reception.

---

## 7. Academic Integrity & Verification Checklist

- [x] All 7 required pages generated and linked with **zero broken links**.
- [x] Responsive on desktop, tablet, and mobile devices with interactive hamburger navigation.
- [x] Clean nature-inspired visual design system with proper contrast and typography.
- [x] Real-time JavaScript search and filtering across animals, diseases, nutrition, and doctors.
- [x] Interactive feed ration calculator with dynamic Dry Matter breakdown.
- [x] Fully functioning LocalStorage vaccination reminder with add, display, and delete capabilities.
- [x] Client-side validated contact form with instant field feedback.
- [x] Prominent veterinary disclaimers across all health and disease pages.

---
*© 2026 Smart Animal Care — Final Year Student Project*
