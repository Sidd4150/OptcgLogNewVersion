# One Piece TCG Log

A full-stack card search and deck builder for the One Piece Trading Card Game. Search cards by name, filter by price or card type, view live market prices pulled from TCGPlayer, and save custom decks to the cloud.

**[Live Demo](https://optcglognewversion-production.up.railway.app/)**

---

## Features

- **Card Search** — search any card by name across the full One Piece TCG catalog
- **Price Tracking** — live market prices sourced from TCGPlayer via the tcgcsv API
- **Filter & Sort** — sort by price ascending/descending or filter to Leader cards only
- **Deck Builder** — add up to 4 copies of any card, enforcing official deck rules
- **Save & Load Decks** — persist decks to MongoDB and reload them in any session
- **Paginated Card Grid** — 30 cards per page with responsive layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Data Source | TCGPlayer via [tcgcsv.com](https://tcgcsv.com) |
| Deployment | Railway |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas connection string
- A Railway or similar deployment for the backend (or run locally)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/OptcgLogNewVersion.git
cd OptcgLogNewVersion
```

### 2. Set up environment variables

Create a `.env` in the project root:

```
MONGO_USER=your_mongo_username
MONGO_PASS=your_mongo_password
```

Create a `.env` in `OPTCG-app-dev/`:

```
VITE_API_URL=http://localhost:3000/
```

### 3. Install dependencies

```bash
# Backend
npm install

# Frontend
cd OPTCG-app-dev
npm install
```

### 4. Run the app

**Backend** (from project root):
```bash
npm start
```

**Frontend** (from `OPTCG-app-dev/`):
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

### 5. (Optional) Seed card data

Hit this endpoint once to pull card data from TCGPlayer into your database:

```
GET http://localhost:3000/update-cards
```

---

## Project Structure

```
OptcgLogNewVersion/
├── OPTCG-app-dev/          # React + Vite frontend
│   └── src/
│       ├── components/     # CardList, Search, Pagination, Header, Footer
│       └── pages/          # CardDisplay, DeckList, About
├── routes/                 # Express API routes
├── public/scripts/         # DB interactions, card/deck fetching
├── modules/                # DB connection, config, credentials
└── tests/                  # DB connection test
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getCards` | Returns all cards |
| GET | `/getLeaders` | Returns Leader-type cards only |
| GET | `/getDecks` | Returns all saved decks |
| POST | `/saveDeck` | Saves a new deck |
| GET | `/update-cards` | Fetches latest card data from TCGPlayer |
