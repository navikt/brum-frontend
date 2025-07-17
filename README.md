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

### Utviklingsmiljø

- **Mock data** - Bruker MSW for å simulere API-kall
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