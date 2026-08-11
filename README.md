# Installatiehandleiding

Welkom bij MoovieMatcher!

Wat kun je verwachten van deze website: je kunt een vragenlijst invullen en zo aanbevelingen krijgen voor films om te kijken die je zullen verrassen. Daarnaast kun je ook een overzicht zien van de beschikbare films en een specifieke categorie kiezen om te zien welke films er in die categorie verschijnen. Ook is het mogelijk om een film op te slaan en deze terug te zien op een aparte pagina. En dit alles kun je alleen doen wanneer je ingelogd bent. Je registreert je eerst en het is ook mogelijk om uit te loggen.

Wat mogelijk is:
-	Een account aanmaken en daarmee inloggen en uitloggen.
-	Inzien welke films beschikbaar zijn en ze per categorie filteren.
-	Een vragenlijst invullen en op basis daarvan aanbevelingen ontvangen.
-	Films opslaan en terugzien op een pagina opgeslagen films.

Hier is alvast de hoofdpagina te zien:
![img_4.png](img_4.png)
Op deze pagina kun je een vragenlijst invullen en dan krijg je films aangeraden die buiten je comfortzone liggen. 

## benodigdheden

1.	Code editor
2.	node.js
3.	API key en tmdb url
4.	Project id en url

### 1 Code editor
Voor het maken van deze applicatie heb ik gebruik gemaakt van Webstorm. Maar ook een andere code editor zou gebruikt kunnen worden. Als je gebruik wilt maken van Webstorm zou je die hier kunnen downloaden en installeren: https://www.jetbrains.com/webstorm/download/?section=windows

### 2 node.js
Node.js gebruik je om de code te runnen buiten de browser en daardoor is het straks mogelijk om de website te kunnen starten.
Via deze link kun je node.js downloaden: "https://nodejs.org/en"
Later in de handleiding is er een uitgebreidere uitleg over de installatie van node.js

### 3 API key en tmdb url
Voor deze applicatie is er gebruik gemaakt van de The Movie Database (TMDB). Om hier gebruik van te kunnen maken heb je een API key nodig. Dit is de API key die gebruikt kan worden:

“9e44b6912eabb276f49bed50f63b50ac”

Dit is de url van tmdb:

"https://api.themoviedb.org/3"

Later zal er meer uitleg volgen over waar deze geplaatst kan worden.

### 4 Project id en url
Voor het gebruik van de backend is er een project id nodig.
“c781fc07-bbf8-488e-aee9-456f6882e830”

en deze url: “https://novi-backend-api-wgsgz.ondigitalocean.app/api“

Ook hierover zal later meer uitleg volgen waar deze geplaatst kan worden. 

## Handleiding
In deze handleiding zal ik stap voor stap uitleggen hoe je de applicatie op kunt starten. 

### 1 Installatie node.js
1.	Kies op de site "https://nodejs.org/en" de juiste download optie, windows of mac afhankelijk van de computer die je gebruikt.
2.	Start de installatie
3.	Accepteer de voorwaarden
4.	Let erop dat "Add to PATH" of "Add to PATH environment variable" aangevinkt staat.
5.	Rond de installatie af

Hierna open je de runtime environment naar keuze en controleer je of de installatie goed gegaan is. Dit doe je door in de terminal:

`node -v`

te typen. Als het goed is krijg je nu de versie te zien die geïnstalleerd is.
Daarna controleer je nog of npm werkt. Hiermee start je later de website op. Typ in de terminal:

`npm -v`

Je krijgt dan als het goed gegaan is ook de versie van npm te zien.
Dan weet je dat de installatie van node.js goed gegaan is.

### 2 Installeren dependencies
Nu kun je de dependencies gaan installeren. Open het bestand

Hiervoor typ je in de terminal:

`npm install`

Het zou ook kunnen dat je code editor zelf al aangeeft dat je npm kunt installeren en dat er een pop up komt met de vraag of je dit wilt installeren. Die kun je ook aanklikken om het te installeren.


Wanneer het geïnstalleerd is gebruik het volgende comment:

`npm run dev`

om de applicatie te starten. Er komt dan een linkje zoals: "http://localhost:5173/" in de terminal te staan. Klik die aan om naar de website te gaan.


Wil je weer uit deze modus? Gebruik dan:

`ctrl + c`  voor windows en
`command + c` voor mac

### 3 Invullen API key en project id
Ik heb in mijn code gebruik gemaakt van een omgevingsbestand (.env). Dus overal waar de API key ingevuld moet staan staat deze variabele zodat wanneer mijn bestanden naar GIT gepusht worden niet overal mijn API key meegaat. In mijn project staat een .env.dist bestand. Hierin staat al de variabelen.

Maak in de map eindopdracht-frontend een nieuw bestand aan en noem deze .env.

Kopieer de waarden die in .env.dist staan en plak deze in het nieuwe .env bestand. 

Vul bij `VITE_API_KEY` deze key in:

"9e44b6912eabb276f49bed50f63b50ac"

En bij `VITE_TMDB_URL` vul je deze url van the movie database in:

https://api.themoviedb.org/3

Bij `VITE_NOVI_API_URL`
vul je de url van API in: 

“https://novi-backend-api-wgsgz.ondigitalocean.app/api“

Bij `VITE_NOVI_PROJECT_ID` vul je de volgende project id in:

“c781fc07-bbf8-488e-aee9-456f6882e830”

## Testgebruikers
De vragenlijst en categorieën pagina zijn zonder een account te gebruiken. Maar wil je ook films opslaan dan heb je een eigen account nodig en zul je moeten inloggen. Eerder al zijn de gegevens gegeven om te kunnen inloggen. Vul deze in op de inlogpagina om in te kunnen loggen. Je token is een uur geldig, dus je zult na een uur opnieuw weer moeten inloggen.
Het is ook mogelijk om zelf een nieuw account aan te maken en later met die gegevens in te loggen.

Hieronder de inloggegevens van testgebruikers die al geregistreerd staan. Deze kunnen gebruikt worden om de website te testen, maar het is natuurlijk ook mogelijk om je als nieuwe gebruiker te registreren en daarna me die gegevens in te loggen.

| **Gebruikersnaam/emailadres**| **wachtwoord** |
|------------------------------|----------------|
| admin@mooviematcher.nl       | 	admin123      |
| user@mooviematcher.nl        | 	user123       |

Op dit moment hebben admin en user nog dezelfde bevoegdheden, mogelijk dat dit op een later moment nog aangepast gaat worden, maar voor deze functionaliteiten was het niet per se nodig dat een admin meer bevoegdheden zou hebben.

Veel plezier met het gebruik van MoovieMatcher!