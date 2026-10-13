# Eco Living Hub 🌿

**Eco Living Hub** on moderni ja interaktiivinen web-sovellus, joka auttaa käyttäjiä omaksumaan kestävän kehityksen mukaisia ekotapoja jokapäiväisessä elämässään. Sovellus yhdistää reaaliaikaisen säädatan, kustomoitavan ekotapojen hallinnan (CRUD), dynaamisen aktiivisuusseurannan sekä visuaaliset analyysityökalut helppokäyttöiseksi ja innostavaksi kokonaisuudeksi.

Sovelluksen avulla voit seurata omia ekotekojasi, laskea konkreettisia hiilijalanjäljen ja rahasäästöjen vaikutuksia sekä saada sääolosuhteisiin mukautettuja liikkumis- ja toimintasuosituksia joka päivä.

---

### 🚀 Keskeiset ominaisuudet

- **🌤️ Sääpohjaiset suositukset:** Integroitu Open-Meteo API -rajapintaan, joka antaa reaaliaikaisia suosituksia sään mukaan (esim. pyöräily, kävely, energiansäästö).
- **📝 Ekotapojen hallinta (CRUD):** Luo, muokkaa, poista ja seuraa omia päivittäisiä ekotapojasi.
- **💾 Paikallinen tallennus:** Tiedot tallentuvat turvallisesti selaimen muistiin (localStorage) JSON-korruptionestolla.
- **🔥 Dynaaminen aktiivisuusseuranta:** Laske putket (Streak) tarkasti kalenteripäivien mukaan.
- **📊 Visuaalinen analyysi:** Havainnollista edistymistäsi selkeillä Recharts-kaavioilla ja saavutettavalla taulukkonäkymällä.
- **🔒 Automaattinen testaus ja tietoturva:** 29 automatisoitua Vitest-yksikkötestiä sekä syötteiden sanitointi (XSS-suojaus).


- 🔗 **Live-demo (GitHub Pages):** [https://fahad11abbas.github.io/eco-living-hub/](https://fahad11abbas.github.io/eco-living-hub/)
- 💻 **Lähdekoodi (GitHub):** [https://github.com/FAHAD11ABBAS/eco-living-hub](https://github.com/FAHAD11ABBAS/eco-living-hub)
---

## 1. Sovelluksen keskeiset ominaisuudet

1. **Sääperusteinen ekosuositus (Säärajapinta)**
   - Hakee avoimesta Open-Meteo-rajapinnasta Helsingin tulevan tunnin ennusteen (lämpötila, tuulen nopeus ja 1 tunnin sademäärä).
   - Laskee automaattisesti arjen suosituksen sääntöhierarkian mukaisesti.
   - Lataustilat ja virhetilanteiden hallinta ("Haetaan säätietoja...", "Yritä uudelleen" -painike).

2. **Omien ekotapojen hallinta (CRUD) & Tietojen pysyvyys**
   - Käyttäjä voi luoda, lukea, muokata ja poistaa omia tapoja (otsikko, kuvaus, kategoria, CO₂-säästö ja kuvake).
   - Tiedot tallennetaan selaimeen (`localStorage`), josta ne latautuvat sivun uudelleenlatauksessa ilman tietokantapalvelinta.
   - JSON-korruptionesto: sovellus ei kaadu, vaikka selaimen tallennustila sisältäisi virheellistä dataa.
   - Suomenkieliset toast-ilmoitukset onnistuneista toiminnoista ja virheistä.

3. **Päiväkohtainen seuranta & Dynaaminen eko-putki (Streak)**
   - Suoritukset kirjataan kalenteripäivittäin muodossa `YYYY-MM-DD`.
   - Samaa tekoa ei voi kuitata useampaan kertaan samalle päivälle.
   - Putki lasketaan dynaamisesti: vähintään yksi suoritus per päivä pitää putken käynnissä. Välipäivä nollaa putken, mutta kuluva kesken oleva päivä ei katkaise eilistä ansaittua putkea.

4. **7 päivän historiakaavio & Saavutettavuus**
   - Graafinen viikkoseuranta toteutettu `recharts`-kirjastolla.
   - Mahdollisuus vaihtaa graafisen kaavion ja esteettömän taulukkonäkymän välillä (ruudunlukijaystävällinen HTML-taulukko).

5. **Hiilijalanjälki- ja säästölaskuri**
   - Interaktiiviset säätimet työmatkaliikkumiselle, kasvisaterioille, muovin välttämiselle ja energiansäästölle.
   - Korjattu nollalogiikka: kun säästöt ovat 0, puu- ja rahasäästöt näyttävät tasan 0 ilman ylimääräisiä vääristymiä.

6. **Monikielisyys (i18n)**
   - Ensisijainen ja oletuskieli on suomi (`fi`).
   - Käyttäjä voi vaihtaa kielen suomen ja englannin välillä milloin tahansa otsikon painikkeesta.

---

## 2. Sääsuosituksen päätössäännöt (Hierarkia)

Sovellus noutaa tulevan tunnin ennustetiedot ja soveltaa seuraavaa hierarkiaa:

1. **Sade $\ge 0.2$ mm TAI Tuuli $\ge 8.0$ m/s:**
   - Suositus: *Lajittele jätteet sisätiloissa* (Sisätoimi).
   - Perustelu: Märkä tai myrskyinen sää ohjaa tekemään ekotekoja turvallisesti ja mukavasti sisätiloissa (esim. lajittelu, lepotilalaitteiden sammutus, hävikkiruoka).
2. **Muuten, jos Lämpötila $\ge 5.0$ °C:**
   - Suositus: *Kävely tai pyöräily* (Aktiivinen liikkuminen).
   - Perustelu: Mieto ulkoilusää soveltuu lihasvoimalla liikkumiseen, mikä vähentää suoraan polttoainepäästöjä.
3. **Muussa tapauksessa (Lämpötila $< 5.0$ °C):**
   - Suositus: *Käytä joukkoliikennettä autoilun sijaan* (Joukkoliikenne).
   - Perustelu: Kylmällä säällä joukkoliikenne on ekologinen ja energiatehokas vaihtoehto yksityisautoilulle.

---

## 3. Historiakaavion kirjastovalinta (Recharts)

Projektissa käytetään `recharts`-kirjastoa 7 päivän toteutuneiden ekotekojen visualisointiin.

### Plussat:
- **Deklaratiivinen React-integraatio:** Komponenttipohjainen rakenne (`<ResponsiveContainer>`, `<BarChart>`, `<Bar>`, `<Tooltip>`) sopii luontevasti Reactin tilanhallintaan.
- **Responsiivisuus:** Mukautuu automaattisesti eri näytön leveyksiin mobiililaitteista suuriin näyttöihin.
- **Kevyt konfiguraatio:** Selkeät akselit, legendit ja visuaalisesti yhdenmukainen teemoitus CSS-muuttujien kanssa.

### Miinukset ja ratkaisut:
- **Paketin koko:** Recharts kasvattaa koontipaketin kokoa suhteessa perinteiseen Canvas-toteutukseen.
- **Saavutettavuus:** SVG-graafit voivat olla hankalia ruudunlukijoille. Tämän vuoksi sovellukseen toteutettiin erillinen **Taulukkonäkymä (Accessible Table View)**, jolla tiedot voi lukea semanttisena HTML-taulukkona.

---

## 4. Tietoturva ja syötteiden validointi (Security Audit)

Sovellukseen on toteutettu seuraavat tietoturvakäytännöt:
- **Ei API-avainten vuotamista:** Sääennuste hyödyntää avointa Open-Meteo-rajapintaa, joka ei vaadi salaista avainta koodissa tai selaimen pyynnöissä.
- **Syötteiden sanitointi (XSS-esto):** Kaikki käyttäjän syöttämät tekstit siivotaan HTML-tageista ja erikoismerkeistä (`sanitizeText`).
- **Merkkimäärärajoitukset:** Tavan otsikko on rajattu enintään 60 merkkiin ja kuvaus enintään 160 merkkiin. Tyhjiä syötteitä ei hyväksytä.
- **Numeerinen validointi:** CO₂-säästöarvot rajataan sallitulle välille (0.1–25 kg).
- **Selaintallennuksen virheensieto:** `safeGetStorage` ja `safeSetStorage` ottavat kiinni mahdolliset `SyntaxError`- tai `QuotaExceededError`-virheet ja estävät sovelluksen kaatumisen.
- **React Error Boundary:** Odottamattomat renderöintivirheet napataan virherajalla, joka tarjoaa käyttäjälle suomenkielisen palautuspainikkeen.

---

## 5. Testaus ja tulokset

Projektissa on kattavat yksikkötestit toteutettuna **Vitest**-testikehyksellä.

Testit kattavat:
1. **Sääsäännöt (`tests/weatherRules.test.js`):** Raja-arvot sateelle (0.2 mm), tuulelle (8 m/s), lämpötilalle (5 °C) sekä kielivalinnoille.
2. **Dynaaminen putki (`tests/streakCalculator.test.js`):** Peräkkäiset päivät, välipäivät, kuluvan päivän keskeneräisyyden huomiointi ja useat suoritukset samana päivänä.
3. **Hiililaskuri (`tests/carbonCalculations.test.js`):** Nollalogiikan varmistus (0 kg CO₂ = 0 puuta) ja laskentakaavojen oikeellisuus.
4. **Sanitointi (`tests/sanitizer.test.js`):** HTML-tagien poisto, pituusrajat ja virheilmoitukset.
5. **Tallennuksen vikasietoisuus (`tests/storageHelper.test.js`):** Korruptoituneen JSON-datan sieto selaimen muistissa.

Aja testit komentoriviltä:
```bash
npm test
```

### Testitulokset:
```text
 ✓ tests/weatherRules.test.js (9 tests)
 ✓ tests/streakCalculator.test.js (8 tests)
 ✓ tests/carbonCalculations.test.js (3 tests)
 ✓ tests/sanitizer.test.js (6 tests)
 ✓ tests/storageHelper.test.js (3 tests)

 Test Files  5 passed (5)
      Tests  29 passed (29)
```

---

## 6. Asennus ja käynnistys paikallisesti

### Vaatimukset:
- Node.js (v18 tai uudempi)
- npm

### Vaiheet:
1. Kloonaa repositorio:
   ```bash
   git clone https://github.com/FAHAD11ABBAS/eco-living-hub.git
   ```
2. Siirry projektikansioon:
   ```bash
   cd eco-living-hub
   ```
3. Asenna riippuvuudet:
   ```bash
   npm install
   ```
4. Käynnistä kehityspalvelin:
   ```bash
   npm run dev
   ```
5. Avaa selain osoitteessa `http://localhost:5173/eco-living-hub/`.

### Muut komennot:
- **Testien suoritus:** `npm test`
- **Tuotantoversion kääntäminen:** `npm run build`
- **Julkaisu GitHub Pagesiin:** `npm run deploy`

---

## 7. Projektirakenne

```text
eco-living-hub/
├── public/                 # Staattiset tiedostot ja favicon
├── src/
│   ├── components/         # Modulaariset käyttöliittymäkomponentit
│   │   ├── Header.jsx
│   │   ├── HeroStats.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── WeatherWidget.jsx      # Sääsuositus ja rajapintaintegraatio
│   │   ├── EcoHabits.jsx          # Tapojen tarkistuslista ja CRUD
│   │   ├── HabitModal.jsx         # Omien tapojen luonti- ja muokkauslomake
│   │   ├── HistoryChart.jsx       # 7 päivän Recharts-kaavio ja taulukko
│   │   ├── EcoCalculator.jsx      # Hiili- ja säästölaskuri
│   │   ├── EcoTips.jsx            # Vinkkilista ja haku
│   │   ├── DailyPledge.jsx        # Päivän ekolupaus
│   │   ├── NotificationToast.jsx  # Toast-ilmoitukset suomeksi
│   │   ├── ErrorBoundary.jsx      # Virheraja odottamattomille virheille
│   │   └── Footer.jsx
│   ├── services/           # Ulkoiset palvelut ja tallennus
│   │   ├── weatherService.js      # Open-Meteo rajapintakutsut
│   │   └── storageService.js      # localStorage CRUD ja JSON-suojaus
│   ├── utils/              # Apu- ja laskentafunktiot
│   │   ├── weatherRules.js        # Sääpäätöshierarkia
│   │   ├── streakCalculator.js    # Dynaaminen putkilaskentalogiikka
│   │   ├── carbonCalculations.js  # Päästöjen ja vastineiden laskenta
│   │   ├── sanitizer.js           # Syötteiden sanitointi ja validointi
│   │   └── dateHelper.js          # Kalenteripäivien käsittely
│   ├── i18n/
│   │   └── translations.js        # Suomen- ja englanninkieliset käännökset
│   ├── App.css             # Vanilla CSS -tyylit ja teemamuuttujat
│   ├── App.jsx             # Pääsovelluskomponentti
│   └── main.jsx
├── tests/                  # Automatisoidut Vitest-yksikkötestit
│   ├── weatherRules.test.js
│   ├── streakCalculator.test.js
│   ├── carbonCalculations.test.js
│   ├── sanitizer.test.js
│   └── storageHelper.test.js
├── index.html
├── package.json
└── vite.config.js
```





8. Tekijä

Abbas Fahad Farhood Alfarttoosi (FAHAD11ABBAS)

Huomautus: Projektin idea, koodi, ratkaisut sekä ulkoasun suunnittelu ja muotoilu ovat kokonaan opiskelijan itsensä toteuttamia. AI-työkalua on käytetty apuna suomen kielen käännöksissä, tekstien ja koodin tarkistuksessa sekä joidenkin teknisten ongelmien ratkaisemisessa ja konsultoinnissa. Opiskelija on lisäksi hyödyntänyt projektin toteutuksessa Business College Helsingin opettajien arvokkaita ohjeita, neuvoja ja suosituksia. Lämmin kiitos heille kaikesta tuesta ja työstä opintojeni hyväksi.*
