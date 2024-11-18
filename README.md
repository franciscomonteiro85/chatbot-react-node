# chatbot-react-node

Simple chat application that returns static answers

## Project Setup

I set up the project with Node v22.11.0 and npm v10.9.0. Then we need to run `npm i` on both the client and the server folder, to install dependencies.

## Database

To configure the database i created a free cluster on MongoDB Cloud. Replace the username, password and the clusterId with the ones on your connection string.

We will need to create a .env file, under the server folder with the following stucture:

MONGO_DB_CONNECTION_STRING="mongodb+srv://{username}:{password}@cluster0.{clusterId}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

## Running the project

To run the backend, we need to run `npm run start` on the server folder.

To run the frontend, we need to run `npm run dev` on the client folder.

Open the browser on http://localhost:5173
