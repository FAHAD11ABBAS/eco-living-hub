
Eco Living Hub - Projekti- ja koodiopas
Live Demo: https://fahad11abbas.github.io/eco-living-hub/
Source Code: https://github.com/FAHAD11ABBAS/eco-living-hub

1. Projektin yleiskatsaus
Tämä on koulun näyttötyöprojektini. Se on yhden sivun verkkosovellus, joka on rakennettu Reactilla ja puhtaalla CSS:llä. Se auttaa käyttäjiä seuraamaan ekologisia tapoja, laskemaan hiili- ja rahasäästöjä sekä lukemaan ekovinkkejä helposti.

2. Käyttöliittymän ominaisuudet ja taustalogiikka
Yläpalkki ja asetukset:

Mitä se tekee: Näyttää otsikon, tumman/vaalean tilan vaihtimen sekä englannin ja suomen kielen valitsimen.

Miksi: Antaa nopean pääsyn käyttöliittymän teemoihin ja kieliin mistä tahansa.

Tilastot ja edistymispalkki:

Mitä se tekee: Näyttää yhteenverolaskurit ja animoidun edistymispalkin, joka täyttyy sitä mukaa kun tapoja merkitään tehdyiksi.

Miksi: Antaa visuaalista motivaatiota ja reaaliaikaista palautetta.

Päivittäinen ekotottumusten tarkistuslista:

Mitä se tekee: Luettelo vihreistä teoista valintaruuduilla ja suodattimilla (Kaikki, Tehtävät, Valmiit).

Miksi: Auttaa käyttäjiä seuraamaan päivittäisiä tehtäviä ja päivittää hiilidioksidipisteet heti, kun ne valitaan.

Ekolaskuri:

Mitä se tekee: Interaktiiviset liukusäätimet työmatka- ja ruokavalinnoille, jotka laskevat viikoittaiset ja vuotuiset hiilidioksidipäästöt sekä euroina (€) säästetyt rahat.

Miksi: Antaa käyttäjille nähdä numeerisen todisteen säästöistään reaaliajassa.

Luokitellut ekovinkit ja haku:

Mitä se tekee: Vinkkilista kategoria painikkeilla (Koti, Liikenne, Ruoka) ja reaaliaikaisella hakukentällä.

Miksi: Mahdollistaa nopean haun ja suodatuksen ilman selaamista.

Tausta- ja teemasuunnittelu:

Mitä se tekee: Käyttää puhtaita CSS-muuttujia sujuviin vaaleisiin/tummiin teemoihin ja lempeisiin lehtianimaatioihin taustalla.

Miksi: Pitää sovelluksen kevyenä, visuaalisesti houkuttelevana ja itse rakennettuna ilman raskaita käyttöliittymäkirjastoja.

3. Tekniset valinnat ja miksi käytin niitä
React-komponentit: Jaoitin sovelluksen pieniin, uudelleenkäytettäviin moduulitiedostoihin, jotta koodi pysyy puhtaana ja järjestyksessä.

useState-koukku: Käytetään dynaamisten muutosten, kuten tapojen tarkistamisen, laskimen liukusäätimien päivittämisen, hakusanojen kirjoittamisen sekä teemojen ja kielien vaihtamisen hallintaan.

useEffect-koukku ja localStorage: Käytetään käyttäjän asetuksien (teema, kieli ja suoritetut tavat) tallentamiseen, jotta tiedot eivät katoa sivua päivitettäessä.

Taulukkomenetelmät (.map, .filter, .reduce):

.map() listojen dynaamiseen esittämiseen.

.filter() tapojen ja vinkkien lajittelemiseen tilan, kategorian tai haun mukaan.

.reduce() päivittäisten hiilidioksidipisteiden kokonaismäärän laskemiseen.

























# Eco Living Hub 🌿 - Project & Code Guide

Live Demo: https://fahad11abbas.github.io/eco-living-hub/  
Source Code: https://github.com/FAHAD11ABBAS/eco-living-hub  

## 1. Project Overview
This is my school skill demo project. It is a single-page web app built with React and Vanilla CSS. It helps users track green habits, calculate carbon and money savings, and read eco tips easily.

## 2. Frontend Features & Background Logic
- **Header & Settings:** 
  - *What it does:* Shows the title, Dark/Light mode toggle, and English/Finnish language switch.
  - *Why:* Gives quick access to interface themes and languages from anywhere.
- **Hero Stats & Progress Bar:** 
  - *What it does:* Shows summary counters and an animated progress bar that fills up as habits are checked.
  - *Why:* Gives visual motivation and real-time feedback.
- **Daily Eco Habits Checklist:** 
  - *What it does:* A list of green actions with checkboxes and filters (All, To Do, Completed).
  - *Why:* Helps users track daily tasks and instantly updates CO2 points when checked.
- **Eco Calculator:** 
  - *What it does:* Interactive sliders for commute and food choices that calculate weekly/yearly CO2 and money saved in Euros (€).
  - *Why:* Lets users see numerical proof of their savings in real-time.
- **Categorized Eco Tips & Search:** 
  - *What it does:* Tips list with category buttons (Home, Transport, Food) and a live search box.
  - *Why:* Allows quick searching and filtering without scrolling.
- **Background & Theme Design:** 
  - *What it does:* Uses pure CSS variables for smooth light/dark themes and gentle floating leaf animations in the background.
  - *Why:* Keeps the app lightweight, visually appealing, and handcrafted without heavy UI frameworks.

## 3. Technical Choices & Why I Used Them
- **React Components:** Split the app into small, reusable modular files to keep the code clean and organized.
- **useState Hook:** Used to handle dynamic changes like checking habits, updating calculator sliders, typing search keywords, and switching themes/languages.
- **useEffect Hook & localStorage:** Used to save user preferences (theme, language, and completed habits) so data isn't lost on page reload.
- **Array Methods (.map, .filter, .reduce):** 
  - `.map()` to render lists dynamically.
  - `.filter()` to sort habits and tips by status, category, or search.
  - `.reduce()` to calculate total daily CO2 points.


## 4. How to Run Locally on PC
1. Clone the repository:
   ```bash
   git clone https://github.com/FAHAD11ABBAS/eco-living-hub.git
   ```
2. Open the folder:
   ```bash
   cd eco-living-hub
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173/` in your browser.

## 5. Author
Abbas Alfarttoosi (FAHAD11ABBAS)
