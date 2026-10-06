# 🌿 Eco Living Hub

An intuitive, human-crafted single-page React application designed to help individuals cultivate sustainable lifestyle habits, estimate their weekly carbon & financial savings, and discover actionable eco-friendly tips.

**Live Application**: [https://fahad11abbas.github.io/eco-living-hub/](https://fahad11abbas.github.io/eco-living-hub/)  
**Source Code**: [https://github.com/FAHAD11ABBAS/eco-living-hub](https://github.com/FAHAD11ABBAS/eco-living-hub)

---

## 🌟 Key Features

1. **Soft, Modern Eco Aesthetic & Responsiveness**
   - Fresh botanical color palette with soft mint greens, sage, and warm cream tones.
   - 100% responsive across mobile phones, tablets, and desktop screens.
   - Built entirely with pure Vanilla CSS custom properties (`var(--...)`) for a handcrafted look.

2. **Instant Dark & Light Mode**
   - Toggle smoothly between daytime botanical tones and deep forest night mode with zero external theme libraries.
   - Automatically saves and restores theme preferences using `localStorage`.

3. **Bilingual Support (English & Finnish / Suomi)**
   - Instant language switcher in the header demonstrating clean dynamic state management with a localized dictionary.

4. **Interactive Daily Habit Tracker (`EcoHabits`)**
   - Check off daily eco-friendly actions (green commute, plant-based meal, short shower, unplugging electronics, eco wash cycles).
   - Real-time CO₂ avoidance points earned for each completed habit.
   - Filter habits dynamically by category and completion status (`All`, `To Do`, `Completed`).
   - Quick "Mark All Done" and "Reset Progress" controls.

5. **Dynamic Progress Bar (`ProgressBar`)**
   - Visual progress meter computing real-time completion percentage.
   - Dynamic encouraging messages that adapt according to your progress.

6. **Personal Carbon & Savings Calculator (`EcoCalculator`)**
   - Interactive sliders allowing users to tweak their weekly habits:
     - Kilometers commuted via bike, walking, or transit.
     - Number of plant-based meals consumed.
     - Single-use plastic items avoided.
     - Energy-saving household actions.
   - Computes estimated weekly & annual CO₂ reduction (kg/tons) and financial savings in Euros (€).
   - Shows fun real-world equivalents: trees planted, smartphone charges, and car kilometers avoided.

7. **Categorized Eco Tips & Search (`EcoTips`)**
   - Filter actionable guides by category (`All`, `Home & Energy`, `Transportation`, `Food & Diet`).
   - Real-time keyword search bar.
   - Bookmark tips with the interactive "Helpful" button.

8. **Daily Eco Pledge**
   - Interactive daily commitment button for positive behavioral reinforcement.

---

## 🛠️ React & JavaScript Concepts Demonstrated

- **Component Architecture**: Structured into clean, self-contained components (`Header`, `HeroStats`, `ProgressBar`, `EcoHabits`, `EcoCalculator`, `EcoTips`, `DailyPledge`, `Footer`).
- **State Management (`useState` & `useEffect`)**:
  - Managing active theme (`light` vs. `dark`) synchronized to `localStorage` and HTML attributes.
  - Active language state (`en` vs. `fi`).
  - Completed habit IDs collection and persistence.
  - Calculator input bindings with real-time numeric calculations.
  - Category filters and live search query state.
- **Array Methods (`map`, `filter`, `reduce`)**:
  - Filtering habits and eco-tips dynamically without mutating source datasets.
  - Summing saved CO₂ impact using `.reduce()`.
- **Performance Optimization (`useMemo`)**:
  - Memoized mathematical computations and filtering logic for fluid 60fps responsiveness.
- **Accessible & Semantic HTML5**:
  - Proper ARIA attributes (`aria-checked`, `role="progressbar"`, semantic `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).

---

## 📁 Project Structure

```text
eco-living-hub/
├── public/
│   └── favicon.svg           # Custom botanical favicon
├── src/
│   ├── App.jsx               # Main React application & all subcomponents
│   ├── App.css               # Handcrafted responsive design & theme variables
│   └── main.jsx              # React DOM root entry point
├── index.html                # HTML template with Google Fonts & meta tags
├── vite.config.js            # Vite configuration with GitHub Pages base URL
├── package.json              # Project dependencies & npm scripts
└── README.md                 # Project documentation
```

---

## 🚀 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your computer.

### Step 1: Clone the Repository
```bash
git clone https://github.com/FAHAD11ABBAS/eco-living-hub.git
cd eco-living-hub
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` (or the URL displayed in the terminal).

### Step 4: Build for Production
```bash
npm run build
```

---

## 📦 Deployment to GitHub Pages

The repository is configured to build and deploy to GitHub Pages automatically via `gh-pages`:

```bash
npm run deploy
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
