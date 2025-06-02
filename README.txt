🃏 Deck Builder & Card Search App

A web application that allows users to search for trading cards, view card prices, and build/save custom decks. Inspired by other similar tools but redesigned with simplicity and clarity in mind.

🔍 Features

🔎 Card Search: Look up cards by name and view their current prices.

💸 Price Checker: Compare prices for cards — whether you're buying, trading, or just curious about the most expensive ones.

🧠 Deck Builder: Create and save custom decks for future reference or cost estimation.

🗃️ Saved Decks: Easily return to your saved builds to refine or test new ideas.

👑 Leader Filtering: Filter cards by specific leaders to tailor your deck.

💠 Tech Stack

Frontend: React (Vite), React Hooks, Axios

Backend: Express.js (Node.js)

Database: MongoDB (via Mongoose)

Deployment: Render

Utilities:

Pagination


🧹 Key Challenges & Solutions

Leader Filtering Issue: Originally implemented as a POST request, but payload size was too large. Refactored to use a GET request at /getLeaders, apply filtering server-side, and return filtered results.


🧪 Learning Resources

React Pagination & Hooks: YouTube tutorials

General Web Dev Help: W3Schools

🚀 Getting Started

1. Clone the Repository

git clone
cd OptcgLogNewversion

2. Setup
npm install
cd Optcg folder
npm rub build
npm start


4. Open in Browser

Go to http://localhost:5173 (or whatever Vite provides) to use the app.
