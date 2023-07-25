/* Es. 1 */
function checkNumber(num1, num2){
    if ((num1 === 50) || (num2 === 50) || (num1 + num2 === 50)) {
        return true
    }
    return false
}

let resultCheckNumber = checkNumber(60, 60)
console.log(resultCheckNumber)


/* Es. 2 */
function removeString(string1, position){
    let originalString = string1.split('')
    originalString.splice(position, 1)
    return originalString.join('')
}

let resultRemoveString = removeString('Epicode', 2)
console.log(`Risultato della stringa taglia è ${resultRemoveString}`);


/* Es. 3 */
function checkRangeNumb(num3, num4) {
    if (
        (num3 >= 40 && num3 <= 60 && num4 >= 40 && num4 <= 60) || (num3 >= 70 && num3 <= 100 && num4 >= 70 && num4 <= 100)
    ) {
        return true
    } 
    return false
}

let resultCheckRangeNumb = checkRangeNumb(55, 56)
console.log(`I numeri inseriti sono compresi tra 40 e 60 0 70 e 100? ${resultCheckRangeNumb}`)


/* Es. 4 */
function checkNameCountry(country){
    let prefix1 = 'New '
    let prefix2 = 'Los '

    if ((country.startsWith(prefix1)) || (country.startsWith(prefix2))){
        return country
    }
    return false
}

let resultcheckNameCountry = checkNameCountry('New York')
console.log(resultcheckNameCountry);


/* Es. 5 */
function checkNumbOfElemArray(array){
    let total = 0
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        total += element
    }
    return total
}

let sumArray = [1,5,3,6,8]
let resultCheckNumbOfElemArray = checkNumbOfElemArray(sumArray)
console.log(`La somma degli elementi dell'array è ${resultCheckNumbOfElemArray}`);


/* Es. 6 */
function checkNumbInArray(array){
    if ((array.includes(1)) || (array.includes(3))) {
        return true
    }
    return false
}

let newArray = [2,5,4,6,8]
let resultCheckNumbInArray= checkNumbInArray(newArray)
console.log(`L'array contiente 1 o 3? ${resultCheckNumbInArray}`);


/* Es. 7 */
function checkAngle(degree){
    switch (true) {
        case degree < 90:
            return 'acuto'
            break;
        case degree > 90  && degree < 180:
            return 'ottuso'
            break;
        case degree == 90:
            return 'retto'
            break;
        case degree == 180:
            return 'piatto'
            break;
        default:
            return 'angolo sconosciuto'
            break;
    }
}

let angle = 120
let resultCheckAngle= checkAngle(angle)
console.log(`L'angolo di ${angle}° è di tipo ${resultCheckAngle}`);


/* Es. 8 */
function createAcronym(word) {
    let arrayWord = word.split(" ")
    let acronym = ""
    for (let i = 0; i < arrayWord.length; i++) {
      const letter = arrayWord[i]
      acronym += letter.charAt(0)
    }
    return acronym.toUpperCase()
}

let resultCreateAcronym = createAcronym('Ciamo Mi chiamo Nikolaas')
console.log(resultCreateAcronym);

