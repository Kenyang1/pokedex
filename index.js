document.getElementById("fetchButton").addEventListener("click", () => {
    console.log("Fetch button clicked!"); // Debugging line
    fetchData();
});

async function fetchData() {
    console.log("fetchData function executed"); // Debugging line
    const errorElement = document.getElementById("error");
    const pokemonCard = document.getElementById("pokemonCard");
    const pokemonNameLabel = document.getElementById("pokemonName1");
    const pokemonID = document.getElementById("pokemonID");
    const pokemonHeight = document.getElementById("pokemonHeight");
    const pokemonWeight = document.getElementById("pokemonWeight");
    const imgElement = document.getElementById("pokemonSprite");

    // Hide the card and error initially
    pokemonCard.style.display = "none";
    errorElement.style.display = "none";

    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        if (!pokemonName) {
            throw new Error("Please enter a Pokémon name.");
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource. Pokémon may not exist.");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging line

        // Populate card data
        pokemonNameLabel.textContent = `Name: ${data.name}`;
        pokemonID.textContent = `ID: ${data.id}`;
        pokemonHeight.textContent = `Height: ${data.height}`;
        pokemonWeight.textContent = `Weight: ${data.weight}`;
        imgElement.src = data.sprites?.front_default || "";
        imgElement.style.display = "block";

        // Show the card
        pokemonCard.style.display = "block";
    } catch (error) {
        console.error("Error:", error); // Debugging line
        errorElement.textContent = error.message;
        errorElement.style.display = "block";
    }
}
