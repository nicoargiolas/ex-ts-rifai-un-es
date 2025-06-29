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

function isRecipe(dati: unknown): dati is Recipe {
    if (
        dati && typeof dati === "object" && dati !== null &&
        "caloriesPerServing" in dati && typeof dati.caloriesPerServing === "number" &&
        "cookTimeMinutes" in dati && typeof dati.cookTimeMinutes === "number" &&
        "cuisine" in dati && typeof dati.cuisine === "string" &&
        "difficulty" in dati && typeof dati.difficulty === "string" &&
        "id" in dati && typeof dati.id === "number" &&
        "image" in dati && typeof dati.image === "string" &&
        "ingredients" in dati && dati.ingredients instanceof Array && dati.ingredients.every(i => typeof i === "string") &&
        "instructions" in dati && dati.instructions instanceof Array && dati.instructions.every(i => typeof i === "string") &&
        "mealType" in dati && dati.mealType instanceof Array && dati.mealType.every(m => typeof m === "string") &&
        "name" in dati && typeof dati.name === "string" &&
        "prepTimeMinutes" in dati && typeof dati.prepTimeMinutes === "number" &&
        "rating" in dati && typeof dati.rating === "number" &&
        "reviewCount" in dati && typeof dati.reviewCount === "number" &&
        "servings" in dati && typeof dati.servings === "number" &&
        "tags" in dati && dati.tags instanceof Array && dati.tags.every(t => typeof t === "string") &&
        "userId" in dati && typeof dati.userId === "number"
    ) {
        return true
    } else {
        return false
    }
}

async function getChefBirthday(id: number): Promise<any> {
    let userId: number;
    try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!response.ok) {
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`)
        };
        const data: unknown = await response.json();
        if (!isRecipe(data)) {
            throw new Error("Formato dati non valido")
        }
        userId = data.userId;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error("Errore sconosciuto:", error)
        }
        return null
    }
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`)
        };
        const data = await response.json();
        return data
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error("Errore sconosciuto:", error)
        }
        return null
    }
}

getChefBirthday(1)
    .then(birthday => console.log("Data di nascita dello chef:", birthday))
    .catch(error => console.error("Errore:", error.message));