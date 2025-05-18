# One Piece Card Game Application

## Overview

This web application is designed to help users manage and explore data for the One Piece Card Game. It provides features for viewing card details and managing decks.

## Features

* **Card Display:** View a list of cards with details such as name, description, color, and price.
* **Modal View:** Click on a card to see an enlarged image and detailed information.
* **Deck Builder:** (If fully implemented) Create and save custom decks.
* **Responsive Design:** The application is designed to adapt to different screen sizes.

## Technologies Used

* **Frontend:** React, HTML, CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Other:** Vite

## Project Structure

The project is structured as follows:

\* `OPTCG-app/`: Contains the React frontend code.

\* `server/`: Contains the Node.js Express backend code.

\* `modules/`: Contains backend modules, including configuration and database connection files.

\* `routes/`: Contains the route definitions for the Express application.

## Backend Setup

1.  **Clone the repository.**
2.  **Navigate to the `server` directory:** `cd server`
3.  **Install dependencies:** `npm install`
4.  **Set up MongoDB:**
    * Ensure MongoDB is installed and running.
    * Update the connection string in `modules/config.js` with your MongoDB URI.
5.  **Start the server:** `npm run start`

## Frontend Setup (React - OPTCG-app)

1.  **Navigate to the `OPTCG-app` directory:** `cd OPTCG-app`
2.  **Install dependencies:** `npm install`
3.  **Build the application:** `npm run build`

## Running the Application

1.  **Start the backend server** (see "Backend Setup").
2.  **Navigate to the frontend directory:** `cd OPTCG-app`
3.  **Serve the built application:** You can use a simple server like `npx serve dist` to serve the built files.  The application should be accessible at `http://localhost:3000`.

## Configuration

* `modules/config.js`:  This file contains configuration settings for the server, database connection, and other application-wide settings.  Be sure to configure the `database.connectionString` property with your MongoDB connection string.

## Data Fetching

\* The application fetches card data from a remote API (tcgcsv.com).

\* The fetched data is stored in a MongoDB database.

## Assumptions

\* The application assumes a running MongoDB instance.

\* The application assumes the presence of a  tcgcsv.com API.
