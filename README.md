# Brum Frontend

En moderne dashboard-applikasjon for å vise statistikk og tiltak fra ulike avdelinger i NAV.

## 📋 Innhold

- [Om prosjektet](#om-prosjektet)
- [Teknologier](#teknologier)
- [Kom i gang](#kom-i-gang)
- [Utvikling](#utvikling)
- [Prosjektstruktur](#prosjektstruktur)
- [Deployment](#deployment)

## 🎯 Om prosjektet

Brum Frontend er en Next.js-applikasjon som gir brukerne:

- **Dashboard** - Oversikt over statistikk og nøkkeltall
- **Interaktive grafer** - Datavisualisering med Highcharts
- **Datatabeller** - Detaljert visning av informasjon
- **Filtrering** - Mulighet til å tilpasse datavisningen
- **Responsivt design** - Fungerer på alle enheter

## 🛠️ Teknologier

- **Next.js 15** - React-rammeverk med App Router
- **React 19** - Brukergrensesnitt
- **TypeScript** - Type-sikkerhet
- **NAV Design System (Aksel)** - UI-komponenter
- **Highcharts** - Interaktive diagrammer
- **Pino** - Logging
- **MSW** - Mock Service Worker for testing
- **Docker** - Containerisering

## 🚀 Kom i gang

### Forutsetninger

```bash
# Installer Node.js 20 eller nyere
node --version  # Bør være v20+
npm --version
```

### Installasjon

1. **Klon prosjektet**
   ```bash
   git clone <repository-url>
   cd brum-frontend
   ```

2. **Installer pakker**
   ```bash
   npm install
   ```

3. **Start utviklingsserver**
   ```bash
   npm run dev
   ```

4. **Åpne i nettleser**
   
   Gå til [http://localhost:3000](http://localhost:3000)

## 💻 Utvikling

### Tilgjengelige kommandoer

```bash
npm run dev          # Start utviklingsserver
npm run build        # Bygg for produksjon
npm run start        # Start produksjonsserver
npm run lint         # Sjekk kode med ESLint
npm run format       # Formater kode med Prettier
npm run format:check # Sjekk kodeformatering
```

### Utviklingsmiljø

- **Mock data** - Bruker MSW for å simulere API-kall
- **Hot reload** - Automatisk oppdatering under utvikling
- **TypeScript** - Type-sjekking i sanntid
- **ESLint** - Kodekvalitetskontroll

## 📁 Prosjektstruktur

```
brum-frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API-endepunkter
│   ├── dashboard/         # Dashboard-side
│   ├── layout.tsx         # Hovedlayout
│   └── page.tsx          # Forside
├── components/            # React-komponenter
│   ├── chart/            # Diagram-komponenter
│   ├── data/             # Data-komponenter
│   └── layout/           # Layout-komponenter
├── hooks/                # Custom React hooks
├── lib/                  # Hjelpefunksjoner
│   ├── types/           # TypeScript-typer
│   └── utils/           # Verktøy
├── mocks/               # Mock-data for testing
├── providers/           # React context providers
├── public/              # Statiske filer
└── styles/              # CSS-filer
```

### Viktige filer

- `app/page.tsx` - Hovedside
- `app/dashboard/page.tsx` - Dashboard
- `components/chart/BrumChart.tsx` - Hoveddiagram
- `components/data/BrumTable.tsx` - Datatabell
- `lib/types/brumData.ts` - Datatyper

## 🐳 Deployment

### Docker

```bash
# Bygg Docker-image
docker build -t brum-frontend .

# Kjør container
docker run -p 3000:3000 brum-frontend
```

### Produksjon

```bash
# Bygg applikasjon
npm run build

# Start produksjonsserver
npm run start
```

### Miljøvariabler

```bash
NODE_ENV=production
BRUM_API_URL=<backend-url>
NODE_AUTH_TOKEN=<npm-token>
```

## 🔧 Hvordan bidra

1. **Opprett en ny branch**
   ```bash
   git checkout -b feature/ny-funksjon
   ```

2. **Gjør endringer**
   - Følg eksisterende kodestruktur
   - Bruk TypeScript
   - Legg til tester hvis nødvendig

3. **Sjekk kode**
   ```bash
   npm run lint
   npm run format
   ```

4. **Commit endringer**
   ```bash
   git add .
   git commit -m "feat: beskrivelse av endring"
   ```

5. **Push og opprett PR**
   ```bash
   git push origin feature/ny-funksjon
   ```

## 📚 Ytterligere ressurser

- [Next.js dokumentasjon](https://nextjs.org/docs)
- [NAV Design System](https://aksel.nav.no/)
- [Highcharts dokumentasjon](https://www.highcharts.com/docs)
- [TypeScript dokumentasjon](https://www.typescriptlang.org/docs/)

## 🆘 Hjelp

Hvis du har spørsmål eller problemer:

1. Sjekk [eksisterende issues](../../issues)
2. Opprett en ny issue med detaljert beskrivelse
3. Kontakt utviklingsteamet

---

Laget med ❤️ av NAV IT