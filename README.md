# Eco Living Hub 🌿

Eco Living Hub is a single-page web application built with React and Vanilla CSS for my skill demo project. It helps users build sustainable daily habits, calculate their carbon footprint savings, and read practical eco-friendly tips.

**Live Demo**: [https://fahad11abbas.github.io/eco-living-hub/](https://fahad11abbas.github.io/eco-living-hub/)  
**Source Code**: [https://github.com/FAHAD11ABBAS/eco-living-hub](https://github.com/FAHAD11ABBAS/eco-living-hub)

---

## 🌟 Core Features

- **Daily Eco Habits Checklist (`EcoHabits`)**: Users can check off daily green actions (like biking, eating plant-based meals, taking short showers) and earn CO₂ savings points. Includes filters for *All*, *To Do*, and *Completed*.
- **Eco Savings Calculator (`EcoCalculator`)**: Interactive sliders where users enter their commute distance, plant-based meals, and energy savings to calculate weekly/yearly CO₂ reduction and estimated money saved in Euros (€).
- **Dark / Light Mode**: A theme toggle button that changes the color scheme smoothly using CSS variables and saves the user choice in the browser (`localStorage`).
- **Instant Language Switcher**: A header toggle that translates the whole application instantly between English and Finnish (*Suomi*).
- **Dynamic Progress Bar (`ProgressBar`)**: An animated progress bar that updates in real time and gives encouraging feedback based on how many habits are completed.
- **Categorized Eco Tips (`EcoTips`)**: Practical tips that can be filtered by category (*Home*, *Transport*, *Food*) and searched with a live search box.

---

## 🛠️ Technical Concepts Used

- **React Components**: Structured the application into clean, modular components (`Header`, `HeroStats`, `ProgressBar`, `EcoHabits`, `EcoCalculator`, `EcoTips`, `DailyPledge`, `Footer`).
- **State Management (`useState`)**: Used to handle active habits, calculator input values, current theme (`light`/`dark`), and selected language (`en`/`fi`).
- **Side Effects (`useEffect`)**: Used to save and load theme settings, language preferences, and completed habits to/from browser `localStorage`.
- **Array Methods (`.map()` and `.filter()`)**:
  - Used `.filter()` to filter habits by status (*To Do* vs *Completed*) and eco-tips by category and search keyword.
  - Used `.map()` to dynamically render the lists of habit cards and tip cards.
  - Used `.reduce()` to calculate total daily CO₂ savings from completed habits.
- **Pure Vanilla CSS**: Handcrafted responsive design, custom CSS variables for light/dark themes, and gentle floating leaf background animations without heavy external UI libraries.

---

## 💻 How to run on PC

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FAHAD11ABBAS/eco-living-hub.git
   cd eco-living-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👤 Author

**Abbas Alfarttoosi** ([FAHAD11ABBAS](https://github.com/FAHAD11ABBAS))
