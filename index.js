

// Ecrivez une fonction

const arrayNumbers = [0,1,3,7,9,5]

function getMaxNumber(numbers) { 

    let max = numbers[0]; // on declare une variable max on l'initialise avec numbers[0]

    //On parcourt le tableau numbers avec une boucle for
    for (let i = 0; i < numbers.lenght; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}
const result =getMaxNumber(arrayNumberss)
console.log(result)