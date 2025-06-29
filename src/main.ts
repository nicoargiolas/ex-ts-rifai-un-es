// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente

// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch

// Esempio di utilizzo

// getChefBirthday(1)
//   .then(birthday => console.log("Data di nascita dello chef:", birthday))
//   .catch(error => console.error("Errore:", error.message));
// Esempio di output atteso

// Data di nascita dello chef: 1990-06-15

type Recipe = {
    caloriesPerServing: number,
    cookTimeMinutes: number,
    cuisine: string,
    difficulty: "Easy" | "Medium" | "Difficult",
    readonly id: number,
    image: string,
    ingredients: string[],
    instructions: string[],
    mealType: string[],
    name: string,
    prepTimeMinutes: number,
    rating: number,
    reviewCount: number,
    servings: number,
    tags: string[],
    userId: number
}

async function getChefBirthday(id: number): Promise<any> {
    let recipe: any;
    try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        recipe = await response.json();
    } catch (error) {
        console.error(error)
    }
    return recipe
}

console.log(getChefBirthday(1));
