import "./App.css";
import axios from "axios";
import { useState } from "react";
const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: { "X-Requested-With": "XMLHttpRequest" },
});

async function getAccounts() {
    const accounts = await api.post("/cache-db", {
        database: "sample_analytics",
        collection: "accounts",
    });
    console.log(accounts);
    return accounts;
}

async function getlistingsAndReviews() {
    const data = await api
        .post("/cache-db", {
            database: "sample_airbnb",
            collection: "listingsAndReviews",
        })
        .then((response) => console.log(response.data[0]))
        .catch((error) => console.log(error));
    console.log(data);
    return data;
}

function App() {
    return (
        <div>
            <button onClick={getAccounts}>Load accounts cache</button>
            <button onClick={getlistingsAndReviews}>
                Load listingsAndReview cache
            </button>
        </div>
    );
}

export default App;
