import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// Text dictionary for English and Finnish translations
const translations = {
  en: {
    brandTitle: "Eco Living Hub",
    brandSubtitle: "Your everyday companion for sustainable living & carbon awareness",
    langSwitch: "Suomi",
    themeLight: "Light",
    themeDark: "Dark",

    heroGreeting: "Welcome to your Green Journey",
    heroSubtitle: "Track habits, calculate carbon savings, and discover actionable eco-tips.",
    statHabitsDone: "Habits Completed",
    statCo2Saved: "Est. CO₂ Avoided",
    statCurrentStreak: "Eco Streak",
    statLevel: "Eco Status",
    daysUnit: "days",
    kgUnit: "kg",
    levelNovice: "Green Sprout 🌱",
    levelPractitioner: "Eco Guardian 🌿",
    levelMaster: "Planet Champion 🌍",

    progressTitle: "Daily Eco Progress",
    progressCompleted: "completed",
    msgZero: "Start your day by ticking off your first eco-friendly habit!",
    msgLow: "Good start! Every mindful decision makes a difference.",
    msgMid: "Over halfway there! You're making real environmental impact.",
    msgHigh: "Almost done! Finish strong for a fully sustainable day.",
    msgAll: "Outstanding work! You have completed all today's eco habits! 🌟",

    habitsTitle: "Daily Sustainable Habits",
    habitsSubtitle: "Check off the mindful actions you practiced today.",
    filterAll: "All Habits",
    filterPending: "To Do",
    filterCompleted: "Completed",
    btnMarkAll: "Mark All Done",
    btnResetAll: "Reset Progress",
    habitDoneBadge: "Done",
    habitPendingBadge: "Pending",
    noHabitsMatch: "No habits found matching the current filter.",

    habits: [
      {
        id: 1,
        category: "transport",
        title: "Walk, Bike or Transit",
        desc: "Opted for walking, cycling, or public transport instead of driving solo.",
        co2Saved: 1.8,
        icon: "🚲"
      },
      {
        id: 2,
        category: "food",
        title: "Plant-Powered Meal",
        desc: "Chose a delicious vegetarian or vegan meal for lunch or dinner.",
        co2Saved: 1.5,
        icon: "🥗"
      },
      {
        id: 3,
        category: "home",
        title: "Shorter 5-Minute Shower",
        desc: "Cut down shower time to conserve warm water and household heating energy.",
        co2Saved: 0.9,
        icon: "🚿"
      },
      {
        id: 4,
        category: "home",
        title: "Unplug Idle Electronics",
        desc: "Turned off power strips and unplugged idle chargers when not in use.",
        co2Saved: 0.4,
        icon: "🔌"
      },
      {
        id: 5,
        category: "lifestyle",
        title: "Brought Reusable Bottle & Bag",
        desc: "Avoided single-use plastics by carrying your own water bottle and bag.",
        co2Saved: 0.3,
        icon: "🛍️"
      },
      {
        id: 6,
        category: "home",
        title: "Full-Load Eco Wash",
        desc: "Ran the washing machine or dishwasher on eco-mode with a full load.",
        co2Saved: 0.7,
        icon: "🧺"
      },
      {
        id: 7,
        category: "food",
        title: "Zero Food Waste Meal",
        desc: "Prepared meals using leftover ingredients to prevent food waste.",
        co2Saved: 1.1,
        icon: "🍲"
      },
      {
        id: 8,
        category: "lifestyle",
        title: "Mindful Digital Footprint",
        desc: "Cleaned inbox, unsubscribed from junk mail, and closed unused tabs.",
        co2Saved: 0.2,
        icon: "💻"
      }
    ],

    calcTitle: "Personal Carbon Savings Calculator",
    calcSubtitle: "Estimate your weekly and yearly carbon emissions and financial savings by tweaking your habits.",
    inputBikeKm: "Green Commute (km / week walking, biking, or public transit instead of car):",
    inputPlantMeals: "Plant-Based Meals (meals / week instead of meat):",
    inputReusableItems: "Single-Use Plastics Avoided (bottles/cups/bags per week):",
    inputEcoWashHours: "Energy & Water Saving Actions (eco cycles / quick showers per week):",
    calcResultsTitle: "Your Estimated Positive Impact",
    weeklyCo2Savings: "Weekly CO₂ Reduction",
    yearlyCo2Savings: "Yearly CO₂ Reduction",
    yearlyMoneySavings: "Estimated Annual Savings",
    treesEquivalent: "Equivalent Trees Planted",
    phoneChargesEquivalent: "Phone Charges Offset",
    carKmEquivalent: "Car Kilometers Avoided",
    calcDisclaimer: "*Estimates are based on standard average environmental footprint metrics.",

    tipsTitle: "Eco-Friendly Guides & Tips",
    tipsSubtitle: "Browse practical advice categorized for easy implementation in your everyday routine.",
    searchTipsPlaceholder: "Search tips by keyword...",
    categoryAll: "All Categories",
    categoryHome: "Home & Energy",
    categoryTransport: "Transportation",
    categoryFood: "Food & Diet",
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyPro: "Advanced",
    helpfulBtn: "Helpful",
    helpfulThanks: "Saved!",
    noTipsMatch: "No eco-tips match your search query. Try another keyword!",

    tips: [
      {
        id: 101,
        category: "home",
        title: "Optimize Room Heating Temperatures",
        desc: "Lowering your indoor thermostat by just 1°C can reduce your annual heating energy bill and emissions by up to 6%.",
        difficulty: "Easy",
        rating: "⭐⭐⭐⭐⭐"
      },
      {
        id: 102,
        category: "food",
        title: "Practice 'First In, First Out' in Your Fridge",
        desc: "Place newer groceries at the back and older items in front. Preventing food waste saves both money and emissions.",
        difficulty: "Easy",
        rating: "⭐⭐⭐⭐⭐"
      },
      {
        id: 103,
        category: "transport",
        title: "Maintain Proper Tire Pressure",
        desc: "Driving on under-inflated tires increases fuel consumption by up to 3%. Check tire pressure monthly.",
        difficulty: "Medium",
        rating: "⭐⭐⭐⭐"
      },
      {
        id: 104,
        category: "home",
        title: "Switch to LED Lighting",
        desc: "LED bulbs consume 75-80% less energy than traditional incandescent bulbs and last much longer.",
        difficulty: "Easy",
        rating: "⭐⭐⭐⭐⭐"
      },
      {
        id: 105,
        category: "food",
        title: "Embrace Seasonal & Local Produce",
        desc: "Locally sourced seasonal vegetables require significantly less refrigeration, heating, and long-distance transport.",
        difficulty: "Medium",
        rating: "⭐⭐⭐⭐"
      },
      {
        id: 106,
        category: "transport",
        title: "Combine Errands into a Single Trip",
        desc: "Cold engine starts consume more fuel in the first few kilometers. Chaining multiple stops saves gas and time.",
        difficulty: "Easy",
        rating: "⭐⭐⭐⭐"
      }
    ],

    pledgeTitle: "Today's Eco Pledge",
    pledgeDesc: "Commit to one small conscious choice today for a cleaner planet tomorrow.",
    pledgeButton: "Sign Today's Pledge",
    pledgeSigned: "Pledge Signed for Today! 🌿",

    footerQuote: "“The greatest threat to our planet is the belief that someone else will save it.” — Robert Swan",
    footerBuiltWith: "Built with React and Vanilla CSS.",
    footerSourceCode: "GitHub Repository"
  },

  fi: {
    brandTitle: "Eco Living Hub",
    brandSubtitle: "Päivittäinen kumppanisi kestävään elämäntapaan ja hiilijalanjäljen seurantaan",
    langSwitch: "English",
    themeLight: "Vaalea",
    themeDark: "Tumma",

    heroGreeting: "Tervetuloa vihreälle matkallesi",
    heroSubtitle: "Seuraa ekotapoja, laske hiilisäästöjäsi ja löydä käytännöllisiä vinkkejä.",
    statHabitsDone: "Tapoja suoritettu",
    statCo2Saved: "Arvioitu CO₂-säästö",
    statCurrentStreak: "Eko-putki",
    statLevel: "Eko-taso",
    daysUnit: "pv",
    kgUnit: "kg",
    levelNovice: "Vihreä Verso 🌱",
    levelPractitioner: "Eko-Suojelija 🌿",
    levelMaster: "Planeetan Mestari 🌍",

    progressTitle: "Päivän ekologinen edistyminen",
    progressCompleted: "suoritettu",
    msgZero: "Aloita päiväsi kuittaamalla ensimmäinen ekotekosi!",
    msgLow: "Hyvä alku! Jokainen tietoinen valinta tekee eron.",
    msgMid: "Yli puolivälin! Luot todellista ympäristövaikutusta.",
    msgHigh: "Melkein valmista! Viimeistele päivän ekotavoitteet.",
    msgAll: "Loistavaa työtä! Kaikki tämän päivän ekotavat suoritettu! 🌟",

    habitsTitle: "Päivittäiset kestävät tavat",
    habitsSubtitle: "Merkitse toimet, joita olet toteuttanut tänään.",
    filterAll: "Kaikki tavat",
    filterPending: "Tekemättä",
    filterCompleted: "Suoritettu",
    btnMarkAll: "Merkitse kaikki",
    btnResetAll: "Nollaa edistys",
    habitDoneBadge: "Valmis",
    habitPendingBadge: "Kesken",
    noHabitsMatch: "Valitulla suodattimella ei löytynyt tapoja.",

    habits: [
      {
        id: 1,
        category: "transport",
        title: "Kävele, pyöräile tai kulje julkisilla",
        desc: "Valitsit kävelyn, pyöräilyn tai joukkoliikenteen yksin autoilun sijaan.",
        co2Saved: 1.8,
        icon: "🚲"
      },
      {
        id: 2,
        category: "food",
        title: "Kasvispainotteinen ateria",
        desc: "Nautit herkullisen kasvis- tai vegaaniaterian lounaaksi tai päivälliseksi.",
        co2Saved: 1.5,
        icon: "🥗"
      },
      {
        id: 3,
        category: "home",
        title: "Nopea 5 minuutin suihku",
        desc: "Lyhensit suihkuaikaa säästääksesi lämmintä vettä ja kodin energiaa.",
        co2Saved: 0.9,
        icon: "🚿"
      },
      {
        id: 4,
        category: "home",
        title: "Sammuta lepotilalaitteet",
        desc: "Katkaisit virran jatkojohdoista ja irrotit turhat laturit seinästä.",
        co2Saved: 0.4,
        icon: "🔌"
      },
      {
        id: 5,
        category: "lifestyle",
        title: "Kestokassi ja oma juomapullo",
        desc: "Vältit kertakäyttömuovia ottamalla mukaan oman vesipullon ja kangaskassin.",
        co2Saved: 0.3,
        icon: "🛍️"
      },
      {
        id: 6,
        category: "home",
        title: "Täysi koneellinen eko-ohjelmalla",
        desc: "Pesit pyykit tai astiat täydellä koneella eko-ohjelmaa käyttäen.",
        co2Saved: 0.7,
        icon: "🧺"
      },
      {
        id: 7,
        category: "food",
        title: "Hävikitön ruoanlaitto",
        desc: "Valmistit ruokaa hyödyntäen tähteitä ja vältit ruokahävikkiä.",
        co2Saved: 1.1,
        icon: "🍲"
      },
      {
        id: 8,
        category: "lifestyle",
        title: "Digitaalinen siivous",
        desc: "Siivosit sähköpostia, peruit turhia uutiskirjeitä ja suljit pilvivälilehtiä.",
        co2Saved: 0.2,
        icon: "💻"
      }
    ],

    calcTitle: "Henkilökohtainen hiilijalanjälkilaskuri",
    calcSubtitle: "Arvioi viikoittaiset ja vuosittaiset päästö- ja rahasäästösi muuttamalla tottumuksiasi.",
    inputBikeKm: "Vihreä työmatka (km / vko kävellen, pyörällä tai julkisilla autoilun sijaan):",
    inputPlantMeals: "Kasvisateriat (annosta / vko lihan sijaan):",
    inputReusableItems: "Vältetyt kertakäyttömuovit (pullot/kupit/pussit viikossa):",
    inputEcoWashHours: "Energia- ja vesisäästöt (ekopesut / lyhyet suihkut viikossa):",
    calcResultsTitle: "Arvioitu positiivinen vaikutuksesi",
    weeklyCo2Savings: "Viikoittainen CO₂-vähennys",
    yearlyCo2Savings: "Vuosittainen CO₂-vähennys",
    yearlyMoneySavings: "Arvioitu vuosisäästö rahassa",
    treesEquivalent: "Vastaa istutettua puuta",
    phoneChargesEquivalent: "Puhelimen latausta säästetty",
    carKmEquivalent: "Vältettyjä autokilometrejä",
    calcDisclaimer: "*Arviot perustuvat standardeihin keskimääräisiin ympäristömittareihin.",

    tipsTitle: "Ekologiset oppaat ja vinkit",
    tipsSubtitle: "Selaa käytännöllisiä vinkkejä jaettuna arjen helppoihin kategorioihin.",
    searchTipsPlaceholder: "Etsi vinkkejä avainsanalla...",
    categoryAll: "Kaikki kategoriat",
    categoryHome: "Koti ja energia",
    categoryTransport: "Liikkuminen",
    categoryFood: "Ruoka ja ravinto",
    difficultyEasy: "Helppo",
    difficultyMedium: "Keskitaso",
    difficultyPro: "Edistynyt",
    helpfulBtn: "Hyödyllinen",
    helpfulThanks: "Tallennettu!",
    noTipsMatch: "Hakusanalla ei löytynyt vinkkejä. Kokeile toista sanaa!",

    tips: [
      {
        id: 101,
        category: "home",
        title: "Optimoi huonelämpötila",
        desc: "Huonelämpötilan laskeminen yhdellä asteella vähentää lämmitysenergian kulutusta ja kuluja jopa 6 %.",
        difficulty: "Helppo",
        rating: "⭐⭐⭐⭐⭐"
      },
      {
        id: 102,
        category: "food",
        title: "Jääkaapin FIFO-periaate (First In, First Out)",
        desc: "Aseta uudet ostokset taakse ja vanhemmat etualalle. Ruokahävikin vähentäminen säästää sekä rahaa että päästöjä.",
        difficulty: "Helppo",
        rating: "⭐⭐⭐⭐⭐"
      },
      {
        id: 103,
        category: "transport",
        title: "Tarkista rengaspaineet säännöllisesti",
        desc: "Vajaapaineisilla renkailla ajaminen lisää polttoaineen kulutusta jopa 3 %. Tarkista paineet kuukausittain.",
        difficulty: "Keskitaso",
        rating: "⭐⭐⭐⭐"
      },
      {
        id: 104,
        category: "home",
        title: "Vaihda LED-valaistukseen",
        desc: "LED-lamput kuluttavat 75-80 % vähemmän sähköä kuin perinteiset hehkulamput ja kestävät huomattavasti pidempään.",
        difficulty: "Helppo",
        rating: "⭐⭐⭐⭐⭐"
      },
      {
        id: 105,
        category: "food",
        title: "Suosi satokauden ja lähialueen tuotteita",
        desc: "Satokauden kasvikset vaativat vähemmän kylmäsäilytystä, lämmitystä ja pitkiä kuljetuksia.",
        difficulty: "Keskitaso",
        rating: "⭐⭐⭐⭐"
      },
      {
        id: 106,
        category: "transport",
        title: "Yhdistä asiointimatkat yhdeksi lenkiksi",
        desc: "Kylmä moottori kuluttaa enemmän polttoainetta. Matkojen yhdistely säästää polttoainetta ja aikaa.",
        difficulty: "Helppo",
        rating: "⭐⭐⭐⭐"
      }
    ],

    pledgeTitle: "Päivän ekolupaus",
    pledgeDesc: "Sitoudu tänään yhteen pieneen tekoon puhtaamman huomisen puolesta.",
    pledgeButton: "Allekirjoita päivän lupaus",
    pledgeSigned: "Lupaus allekirjoitettu tälle päivälle! 🌿",

    footerQuote: "“Suurin uhka planeetallemme on uskomus, että joku muu pelastaa sen.” — Robert Swan",
    footerBuiltWith: "Rakennettu Reactilla ja Vanilla CSS:llä.",
    footerSourceCode: "GitHub-lähdekoodi"
  }
};

// Header component with title, language switcher and theme toggle
function Header({ language, onToggleLanguage, theme, onToggleTheme, t }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="logo-icon-wrapper" aria-hidden="true">
            <span className="logo-emoji">🌿</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">{t.brandTitle}</h1>
            <p className="brand-subtitle">{t.brandSubtitle}</p>
          </div>
        </div>

        <div className="header-controls">
          <button
            type="button"
            className="control-btn lang-toggle-btn"
            onClick={onToggleLanguage}
            title={language === 'en' ? "Vaihda suomeksi" : "Switch to English"}
            aria-label="Toggle language"
          >
            <span className="control-icon" role="img" aria-label="globe">🌐</span>
            <span className="lang-name">{t.langSwitch}</span>
          </button>

          <button
            type="button"
            className="control-btn theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle theme"
          >
            <span className="control-icon" role="img" aria-label="theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="theme-name">
              {theme === 'light' ? t.themeDark : t.themeLight}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Progress Bar showing habit completion percentage
function ProgressBar({ completedCount, totalCount, t }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getMotivationalMessage = () => {
    if (percentage === 0) return t.msgZero;
    if (percentage < 35) return t.msgLow;
    if (percentage < 70) return t.msgMid;
    if (percentage < 100) return t.msgHigh;
    return t.msgAll;
  };

  return (
    <div className="progress-section card-box">
      <div className="progress-header">
        <div className="progress-title-wrap">
          <h2 className="section-title">{t.progressTitle}</h2>
          <span className="progress-badge">
            {completedCount} / {totalCount} {t.progressCompleted}
          </span>
        </div>
        <div className="progress-percentage-pill">{percentage}%</div>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="progress-feedback-text">
        <span className="feedback-sparkle">✨</span> {getMotivationalMessage()}
      </p>
    </div>
  );
}

// Summary overview cards for stats
function HeroStats({ completedCount, totalCount, co2SavedToday, t }) {
  const getEcoLevel = () => {
    if (completedCount >= 6) return t.levelMaster;
    if (completedCount >= 3) return t.levelPractitioner;
    return t.levelNovice;
  };

  return (
    <section className="hero-section">
      <div className="hero-banner card-box">
        <div className="hero-content">
          <h2 className="hero-heading">{t.heroGreeting}</h2>
          <p className="hero-subtext">{t.heroSubtitle}</p>
        </div>
        <div className="hero-leaf-graphic" aria-hidden="true">🌱</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">✅</div>
          <div className="stat-details">
            <span className="stat-number">{completedCount} <small className="stat-unit">/ {totalCount}</small></span>
            <span className="stat-label">{t.statHabitsDone}</span>
          </div>
        </div>

        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">🍃</div>
          <div className="stat-details">
            <span className="stat-number">{co2SavedToday.toFixed(1)} <small className="stat-unit">{t.kgUnit}</small></span>
            <span className="stat-label">{t.statCo2Saved}</span>
          </div>
        </div>

        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">🔥</div>
          <div className="stat-details">
            <span className="stat-number">5 <small className="stat-unit">{t.daysUnit}</small></span>
            <span className="stat-label">{t.statCurrentStreak}</span>
          </div>
        </div>

        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">🏅</div>
          <div className="stat-details">
            <span className="stat-level-tag">{getEcoLevel()}</span>
            <span className="stat-label">{t.statLevel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Interactive habits checklist component
function EcoHabits({
  habits,
  completedHabitIds,
  onToggleHabit,
  onMarkAll,
  onResetAll,
  t
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter habits using JavaScript array filter method
  const filteredHabits = useMemo(() => {
    return habits.filter(habit => {
      const isDone = completedHabitIds.includes(habit.id);
      if (activeFilter === 'completed') return isDone;
      if (activeFilter === 'pending') return !isDone;
      return true;
    });
  }, [habits, completedHabitIds, activeFilter]);

  return (
    <section className="habits-section card-box">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">{t.habitsTitle}</h2>
          <p className="section-subtitle">{t.habitsSubtitle}</p>
        </div>

        <div className="habits-action-buttons">
          <button
            type="button"
            className="action-btn secondary-btn"
            onClick={onMarkAll}
          >
            {t.btnMarkAll}
          </button>
          <button
            type="button"
            className="action-btn text-btn"
            onClick={onResetAll}
          >
            {t.btnResetAll}
          </button>
        </div>
      </div>

      <div className="filter-tabs-row" role="tablist">
        <button
          type="button"
          className={`filter-tab-pill ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          {t.filterAll} ({habits.length})
        </button>
        <button
          type="button"
          className={`filter-tab-pill ${activeFilter === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveFilter('pending')}
        >
          {t.filterPending} ({habits.filter(h => !completedHabitIds.includes(h.id)).length})
        </button>
        <button
          type="button"
          className={`filter-tab-pill ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          {t.filterCompleted} ({completedHabitIds.length})
        </button>
      </div>

      <div className="habits-grid">
        {filteredHabits.length > 0 ? (
          filteredHabits.map(habit => {
            const isCompleted = completedHabitIds.includes(habit.id);
            return (
              <div
                key={habit.id}
                className={`habit-card ${isCompleted ? 'habit-completed' : ''}`}
                onClick={() => onToggleHabit(habit.id)}
                role="checkbox"
                aria-checked={isCompleted}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onToggleHabit(habit.id);
                  }
                }}
              >
                <div className="habit-checkbox-col">
                  <div className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}>
                    {isCompleted ? '✓' : ''}
                  </div>
                </div>

                <div className="habit-info-col">
                  <div className="habit-top-line">
                    <span className="habit-icon">{habit.icon}</span>
                    <h3 className="habit-title">{habit.title}</h3>
                  </div>
                  <p className="habit-description">{habit.desc}</p>
                  
                  <div className="habit-footer-tags">
                    <span className={`category-tag tag-${habit.category}`}>
                      {habit.category}
                    </span>
                    <span className="co2-tag">
                      +{habit.co2Saved} kg CO₂
                    </span>
                    <span className={`status-tag ${isCompleted ? 'status-done' : 'status-wait'}`}>
                      {isCompleted ? t.habitDoneBadge : t.habitPendingBadge}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state-card">
            <p>{t.noHabitsMatch}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Carbon and financial savings calculator component
function EcoCalculator({ t }) {
  const [commuteKm, setCommuteKm] = useState(25);
  const [plantMeals, setPlantMeals] = useState(7);
  const [reusableItems, setReusableItems] = useState(5);
  const [ecoActions, setEcoActions] = useState(6);

  // Weekly and yearly calculations
  const weeklyCo2 = useMemo(() => {
    return (commuteKm * 0.17) + (plantMeals * 1.5) + (reusableItems * 0.08) + (ecoActions * 0.6);
  }, [commuteKm, plantMeals, reusableItems, ecoActions]);

  const yearlyCo2 = useMemo(() => weeklyCo2 * 52, [weeklyCo2]);

  const yearlyMoney = useMemo(() => {
    const weeklyCash = (commuteKm * 0.15) + (plantMeals * 1.2) + (reusableItems * 0.3) + (ecoActions * 0.5);
    return Math.round(weeklyCash * 52);
  }, [commuteKm, plantMeals, reusableItems, ecoActions]);

  // Real world equivalents
  const treesPlanted = useMemo(() => Math.max(1, Math.round(yearlyCo2 / 22)), [yearlyCo2]);
  const phoneCharges = useMemo(() => Math.round(weeklyCo2 / 0.008), [weeklyCo2]);
  const carKmSaved = useMemo(() => Math.round(yearlyCo2 / 0.17), [yearlyCo2]);

  return (
    <section className="calculator-section card-box">
      <div className="section-header">
        <h2 className="section-title">{t.calcTitle}</h2>
        <p className="section-subtitle">{t.calcSubtitle}</p>
      </div>

      <div className="calculator-layout-grid">
        <div className="calc-inputs-column">
          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="commute-range" className="calc-label">
                🚲 {t.inputBikeKm}
              </label>
              <span className="calc-value-badge">{commuteKm} km</span>
            </div>
            <input
              id="commute-range"
              type="range"
              min="0"
              max="150"
              step="5"
              value={commuteKm}
              onChange={(e) => setCommuteKm(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0 km</span>
              <span>150 km</span>
            </div>
          </div>

          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="plant-meals-range" className="calc-label">
                🥗 {t.inputPlantMeals}
              </label>
              <span className="calc-value-badge">{plantMeals} meals</span>
            </div>
            <input
              id="plant-meals-range"
              type="range"
              min="0"
              max="21"
              step="1"
              value={plantMeals}
              onChange={(e) => setPlantMeals(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0 meals</span>
              <span>21 meals/wk</span>
            </div>
          </div>

          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="reusable-range" className="calc-label">
                🛍️ {t.inputReusableItems}
              </label>
              <span className="calc-value-badge">{reusableItems} items</span>
            </div>
            <input
              id="reusable-range"
              type="range"
              min="0"
              max="30"
              step="1"
              value={reusableItems}
              onChange={(e) => setReusableItems(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0</span>
              <span>30 items</span>
            </div>
          </div>

          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="eco-actions-range" className="calc-label">
                💡 {t.inputEcoWashHours}
              </label>
              <span className="calc-value-badge">{ecoActions} actions</span>
            </div>
            <input
              id="eco-actions-range"
              type="range"
              min="0"
              max="20"
              step="1"
              value={ecoActions}
              onChange={(e) => setEcoActions(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0</span>
              <span>20 times</span>
            </div>
          </div>
        </div>

        <div className="calc-results-column">
          <div className="results-card">
            <h3 className="results-card-title">{t.calcResultsTitle}</h3>

            <div className="result-metric-highlight">
              <span className="metric-large-number">{weeklyCo2.toFixed(1)} <small>kg CO₂</small></span>
              <span className="metric-sublabel">{t.weeklyCo2Savings}</span>
            </div>

            <div className="results-dual-row">
              <div className="metric-mini-box">
                <span className="metric-mini-value">{yearlyCo2 >= 1000 ? (yearlyCo2 / 1000).toFixed(2) + ' t' : yearlyCo2.toFixed(0) + ' kg'}</span>
                <span className="metric-mini-label">{t.yearlyCo2Savings}</span>
              </div>
              <div className="metric-mini-box highlight-money">
                <span className="metric-mini-value">~{yearlyMoney} €</span>
                <span className="metric-mini-label">{t.yearlyMoneySavings}</span>
              </div>
            </div>

            <div className="equivalency-list">
              <div className="equiv-item">
                <span className="equiv-icon">🌲</span>
                <div className="equiv-text">
                  <strong>{treesPlanted} {t.treesEquivalent}</strong>
                  <small>absorbed annually by your efforts</small>
                </div>
              </div>

              <div className="equiv-item">
                <span className="equiv-icon">🔋</span>
                <div className="equiv-text">
                  <strong>{phoneCharges.toLocaleString()} {t.phoneChargesEquivalent}</strong>
                  <small>in weekly clean energy equivalent</small>
                </div>
              </div>

              <div className="equiv-item">
                <span className="equiv-icon">🚗</span>
                <div className="equiv-text">
                  <strong>{carKmSaved.toLocaleString()} km {t.carKmEquivalent}</strong>
                  <small>prevented on the road each year</small>
                </div>
              </div>
            </div>

            <p className="calculator-disclaimer-text">{t.calcDisclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Categorized Eco Tips component
function EcoTips({ tips, t }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [helpfulSet, setHelpfulSet] = useState(new Set());

  const toggleHelpful = (tipId) => {
    setHelpfulSet(prev => {
      const next = new Set(prev);
      if (next.has(tipId)) {
        next.delete(tipId);
      } else {
        next.add(tipId);
      }
      return next;
    });
  };

  // Filter tips by category and keyword search using .filter()
  const filteredTips = useMemo(() => {
    return tips.filter(tip => {
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tip.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [tips, selectedCategory, searchQuery]);

  return (
    <section className="tips-section card-box">
      <div className="section-header">
        <h2 className="section-title">{t.tipsTitle}</h2>
        <p className="section-subtitle">{t.tipsSubtitle}</p>
      </div>

      <div className="tips-controls-row">
        <div className="category-pills-wrap" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            {t.categoryAll}
          </button>
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'home' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('home')}
          >
            🏡 {t.categoryHome}
          </button>
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'transport' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('transport')}
          >
            🚲 {t.categoryTransport}
          </button>
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'food' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('food')}
          >
            🥑 {t.categoryFood}
          </button>
        </div>

        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={t.searchTipsPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tips"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="tips-grid">
        {filteredTips.length > 0 ? (
          filteredTips.map(tip => {
            const isHelpful = helpfulSet.has(tip.id);
            return (
              <article key={tip.id} className="tip-card">
                <div className="tip-header-row">
                  <span className={`category-tag tag-${tip.category}`}>
                    {tip.category}
                  </span>
                  <span className="tip-difficulty-badge">
                    {tip.difficulty}
                  </span>
                </div>

                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-desc">{tip.desc}</p>

                <div className="tip-card-footer">
                  <span className="tip-rating">{tip.rating}</span>
                  <button
                    type="button"
                    className={`helpful-btn ${isHelpful ? 'is-helpful' : ''}`}
                    onClick={() => toggleHelpful(tip.id)}
                  >
                    <span>{isHelpful ? '💚' : '🤍'}</span>
                    <span>{isHelpful ? t.helpfulThanks : t.helpfulBtn}</span>
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty-state-card">
            <p>{t.noTipsMatch}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Daily commitment pledge component
function DailyPledge({ t }) {
  const [isPledged, setIsPledged] = useState(false);

  return (
    <section className="pledge-section card-box">
      <div className="pledge-content">
        <div className="pledge-icon" aria-hidden="true">🌍</div>
        <div>
          <h2 className="pledge-title">{t.pledgeTitle}</h2>
          <p className="pledge-desc">{t.pledgeDesc}</p>
        </div>
      </div>
      <button
        type="button"
        className={`pledge-btn ${isPledged ? 'pledged-active' : ''}`}
        onClick={() => setIsPledged(prev => !prev)}
      >
        {isPledged ? t.pledgeSigned : t.pledgeButton}
      </button>
    </section>
  );
}

// Clean footer component
function Footer({ language, onToggleLanguage, t }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <p className="footer-quote">{t.footerQuote}</p>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-credit">
            © {new Date().getFullYear()} {t.brandTitle}. {t.footerBuiltWith}
          </p>
          
          <div className="footer-links">
            <button
              type="button"
              className="footer-link-btn"
              onClick={onToggleLanguage}
            >
              Language: <strong>{language === 'en' ? 'English' : 'Suomi'}</strong>
            </button>
            <a
              href="https://github.com/FAHAD11ABBAS/eco-living-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-github-link"
            >
              <span role="img" aria-label="code">💻</span> {t.footerSourceCode}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main application component
export default function App() {
  // Theme state with local storage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eco_hub_theme') || 'light';
  });

  // Language state ('en' or 'fi')
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('eco_hub_lang') || 'en';
  });

  // Completed habits state
  const [completedHabits, setCompletedHabits] = useState(() => {
    const saved = localStorage.getItem('eco_hub_completed_habits');
    return saved ? JSON.parse(saved) : [1, 2];
  });

  // Current translation dictionary
  const t = useMemo(() => translations[language] || translations.en, [language]);

  // Sync theme changes to html data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eco_hub_theme', theme);
  }, [theme]);

  // Sync language selection
  useEffect(() => {
    localStorage.setItem('eco_hub_lang', language);
  }, [language]);

  // Sync completed habits
  useEffect(() => {
    localStorage.setItem('eco_hub_completed_habits', JSON.stringify(completedHabits));
  }, [completedHabits]);

  // Habit handlers
  const handleToggleHabit = (habitId) => {
    setCompletedHabits(prev => {
      if (prev.includes(habitId)) {
        return prev.filter(id => id !== habitId);
      } else {
        return [...prev, habitId];
      }
    });
  };

  const handleMarkAllHabits = () => {
    const allIds = t.habits.map(h => h.id);
    setCompletedHabits(allIds);
  };

  const handleResetHabits = () => {
    setCompletedHabits([]);
  };

  // Switch language between English and Finnish
  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'fi' : 'en'));
  };

  // Switch between light and dark theme
  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Calculate total CO2 saved from today's completed habits
  const co2SavedToday = useMemo(() => {
    return t.habits
      .filter(h => completedHabits.includes(h.id))
      .reduce((sum, h) => sum + h.co2Saved, 0);
  }, [t.habits, completedHabits]);

  return (
    <div className="app-layout">
      {/* Subtle ambient floating leaves background */}
      <div className="ambient-leaf-bg" aria-hidden="true">
        <span className="floating-leaf leaf-1">🍃</span>
        <span className="floating-leaf leaf-2">🌱</span>
        <span className="floating-leaf leaf-3">🌿</span>
        <span className="floating-leaf leaf-4">🍃</span>
        <span className="floating-leaf leaf-5">🌱</span>
      </div>

      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        t={t}
      />

      <main className="main-content-container">
        <HeroStats
          completedCount={completedHabits.length}
          totalCount={t.habits.length}
          co2SavedToday={co2SavedToday}
          t={t}
        />

        <ProgressBar
          completedCount={completedHabits.length}
          totalCount={t.habits.length}
          t={t}
        />

        <EcoHabits
          habits={t.habits}
          completedHabitIds={completedHabits}
          onToggleHabit={handleToggleHabit}
          onMarkAll={handleMarkAllHabits}
          onResetAll={handleResetHabits}
          t={t}
        />

        <EcoCalculator t={t} />

        <EcoTips tips={t.tips} t={t} />

        <DailyPledge t={t} />
      </main>

      <Footer
        language={language}
        onToggleLanguage={handleToggleLanguage}
        t={t}
      />
    </div>
  );
}
