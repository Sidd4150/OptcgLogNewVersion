# One Piece Card Game Application
## Siddhartha Shakya 20700187
## Overview/Description

This web application is designed to help users manage and explore data for the One Piece Card Game. It provides features for viewing card details and managing decks and also displays prices of the cards. Some problems I faced were getting the deck load to work and also making sure that the zip worked. I used youtube videos and also W2Schools for help .



## Features

* **Card Display:** View a list of cards with details such as name, description, color, and price.
* **Modal View:** Click on a card to see an enlarged image and detailed information.
* **Deck Builder:** Create and save custom decks.


## Technologies Used

* **Frontend:** React, HTML, CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB


## Project Structure

The project is structured as follows:

\* `OPTCG-app/`: Contains the React frontend code.

\* `server/`: Contains the Node.js Express backend code.

\* `modules/`: Contains backend modules, including configuration and database connection files.

\* `routes/`: Contains the route definitions for the Express application.



## Configuration



## Data Fetching

\* The application fetches card data from a remote API (tcgcsv.com).

\* The fetched data is stored in a MongoDB database.

## Assumptions

\* The application assumes a running MongoDB instance.

\* The application assumes the presence of a  tcgcsv.com API.
