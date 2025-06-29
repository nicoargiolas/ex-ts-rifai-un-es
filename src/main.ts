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
        (dati.difficulty === "Easy" || dati.difficulty === "Medium" || dati.difficulty === "Difficult") &&
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

type Chef = {
    address: object,
    age: number,
    bank: object,
    birthDate: string,
    bloodGroup: string,
    company: object,
    crypto: object,
    ein: string,
    email: string,
    eyeColor: string,
    readonly firstName: string,
    gender: "male" | "female",
    hair: object,
    height: number,
    readonly id: number,
    image: string,
    ip: string,
    readonly lastName: string,
    macAddress: string,
    maidenName: string,
    password: string,
    phone: string,
    role: string,
    ssn: string,
    university: string,
    userAgent: string,
    readonly username: string,
    weight: number
}

function isChef(dati: unknown): dati is Chef {
    if (
        dati && typeof dati === "object" && dati !== null &&
        "address" in dati && typeof dati.address === "object" && dati.address !== null &&
        "age" in dati && typeof dati.age === "number" &&
        "bank" in dati && typeof dati.bank === "object" && dati.bank !== null &&
        "birthDate" in dati && typeof dati.birthDate === "string" &&
        "bloodGroup" in dati && typeof dati.bloodGroup === "string" &&
        "company" in dati && typeof dati.company === "object" && dati.company !== null &&
        "crypto" in dati && typeof dati.crypto === "object" && dati.crypto !== null &&
        "ein" in dati && typeof dati.ein === "string" &&
        "email" in dati && typeof dati.email === "string" &&
        "eyeColor" in dati && typeof dati.eyeColor === "string" &&
        "firstName" in dati && typeof dati.firstName === "string" &&
        "gender" in dati && typeof dati.gender === "string" &&
        (dati.gender === "male" || dati.gender === "female") &&
        "hair" in dati && typeof dati.hair === "object" && dati.hair !== null &&
        "height" in dati && typeof dati.height === "number" &&
        "id" in dati && typeof dati.id === "number" &&
        "image" in dati && typeof dati.image === "string" &&
        "ip" in dati && typeof dati.ip === "string" &&
        "lastName" in dati && typeof dati.lastName === "string" &&
        "macAddress" in dati && typeof dati.macAddress === "string" &&
        "maidenName" in dati && typeof dati.maidenName === "string" &&
        "password" in dati && typeof dati.password === "string" &&
        "phone" in dati && typeof dati.phone === "string" &&
        "role" in dati && typeof dati.role === "string" &&
        "ssn" in dati && typeof dati.ssn === "string" &&
        "university" in dati && typeof dati.university === "string" &&
        "userAgent" in dati && typeof dati.userAgent === "string" &&
        "username" in dati && typeof dati.username === "string" &&
        "weight" in dati && typeof dati.weight === "number"
    ) {
        return true
    } else {
        return false
    }
}

async function getChefBirthday(id: number): Promise<string | null> {
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
        const data: unknown = await response.json();
        if (!isChef(data)) {
            throw new Error("Formato dei dati non valido")
        }
        return data.birthDate
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