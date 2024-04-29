const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = 8080;

app.use( express.json() )

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

async function fetchStarshipCostByFilm(json) {
    let obj = [];

    for(let i=0; i < json.length; i++) {
        const film = json[i];
        const starships = film.starships;
        const starships_count = starships.length;

        let starship_cost = 0

        for(let j=0; j < starships_count; j++) {
            const starship = starships[j];

            await fetch(starship)
            .then((res1) => res1.json()) // Parse the JSON content from the API to be consumed
            .then((json1) => {
                starship_cost += json1.cost_in_credits != "unknown" ? parseInt(json1.cost_in_credits) : 0;

            }) // Log the JSON response to your console
            .catch((error1) => console.error(error1)) // Log the API error (if any) to your console

        }

        const tempObj = {};
        tempObj.episode_id = film.episode_id;
        tempObj.cost = starship_cost;
        tempObj.starships_count = starships_count;

        obj.push(tempObj);
    }

    obj = obj.sort((a, b) => a.episode_id - b.episode_id)

    return obj;
}



// req - incoming data
// res - data we want to send back
app.get("/starshipCost", async (req, res) => {

    let response = null;
    
    const data = await fetch("https://swapi.info/api/films")
    .then((res) => res.json()) // Parse the JSON content from the API to be consumed
    .then(async (json) => {
        
        response = await fetchStarshipCostByFilm(json);

        
    }) // Log the JSON response to your console
    .catch((error) => console.error(error)) // Log the API error (if any) to your console

    res.status(200).send(response);


});

app.listen(
    PORT, 
    () => console.log(`It's alive on http://localhost:${PORT}`)
)