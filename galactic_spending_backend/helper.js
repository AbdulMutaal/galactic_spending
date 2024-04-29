export async function fetchStarshipCostByFilm() {
    for(let i=0; i < json.length; i++) {
        const film = json[i];
        const starships = film.starships;
        const starships_count = starships.length;
        
        // console.log("{");
        // console.log(" episode_id : ", film.episode_id);
        // console.log(" release_date : ", film.release_date);
        // console.log(" starships count :", starships_count);
        // console.log(" starships : ", starships)
        // console.log("}");

        let starship_cost = 0

        for(let j=0; j < starships_count; j++) {
            const starship = starships[j];

            await fetch(starship)
            .then((res1) => res1.json()) // Parse the JSON content from the API to be consumed
            .then((json1) => {
                console.log(json1.cost_in_credits);
                starship_cost += parseInt(json1.cost_in_credits);
                
            }) // Log the JSON response to your console
            .catch((error1) => console.error(error1)) // Log the API error (if any) to your console

        }
        
        console.log("{");
        console.log(" episode_id : ", film.episode_id);
        console.log(" cost : ", starship_cost);
        console.log("}");

    }
}