import { IWord } from "@/interfaces";



export const disorderWords = (words: IWord[]): IWord[] => {

    for (let i = words.length - 1; i > 0; i--) {
        let indiceAleatorio = Math.floor(Math.random() * (i + 1));
        let temporal = words[i];
        words[i] = words[indiceAleatorio];
        words[indiceAleatorio] = temporal;
    }

    return words
}


export const selectIdealWords = (words: IWord[]): IWord[] => {

    let maxLength = 20 // cant max por ronda

    if (words.length <= 12) maxLength = words.length //si el arreglo tiene menos de 12 palabras, se revisan todas 
    if (words.length > 12 && words.length <= 40) maxLength = Math.floor(words.length / 2) //si tiene entre 12 y 40, se revisan la mitad

    let easy: IWord[] = []
    let medium: IWord[] = []
    let hard: IWord[] = []

    words.forEach(word => {
        if (word.points === 2) easy.push(word)
        if (word.points === 1) medium.push(word)
        if (word.points === 0) hard.push(word)
    })

    // si todas las palabras ya son faciles se devuelven 20 palabras al azar
    if (easy.length === words.length) {
        return disorderWords((easy.sort((a, b) => a.current_review - b.current_review)).slice(0, 19)) //ordenar por fecha mas antigua primero
    }

    easy = easy.sort((a, b) => a.current_review - b.current_review)     //ordenar por fecha mas antigua
    medium = medium.sort((a, b) => b.current_review - a.current_review) //ordenar por fecha mas reciente
    hard = hard.sort((a, b) => b.current_review - a.current_review)    //ordenar por fecha mas reciente


    let maxEasy = Math.floor((20 * maxLength) / 100)     //20%
    let maxMedium = Math.floor((40 * maxLength) / 100)   //40%
    let maxHard = Math.floor((40 * maxLength) / 100)     //40%


    if (easy.length > maxEasy) {
        easy = easy.slice(0, maxEasy - 1) // ==> 20%
    }

    if (medium.length > maxMedium) {
        medium = medium.slice(0, maxMedium - 1) // ==> 40%
    }

    if (hard.length > maxHard) {
        hard = hard.slice(0, maxHard - 1) // ==> 40%
    }

    console.log(easy.length, medium.length, hard.length);



    const select_words = [...easy, ...medium, ...hard]

    return disorderWords(select_words)
}



export const isDuplicate = (words: IWord[], id: string): boolean => {
    return words.filter(word => word._id === id).length > 1
}