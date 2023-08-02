/* Es. 1 */
function findMostUsedLetter(str) {
    str = str.toLowerCase();
  
    let maxCount = 0;
    let mostUsedLetter = '';
  
    for (let i = 0; i < str.length; i++) {
      let count = 0;
      let currentLetter = str[i];
  
      if (currentLetter.match(/[a-z]/)) {
        for (let j = 0; j < str.length; j++) {
          if (str[j] === currentLetter) {
            count++;
          }
        }
  
        if (count > maxCount) {
          maxCount = count;
          mostUsedLetter = currentLetter;
        }
      }
    }
  
    return mostUsedLetter;
  }

  let stringa = "Ciao Amico, come stai?";
  let letteraPiuUsata = findMostUsedLetter(stringa);
  console.log("Lettera più usata:", letteraPiuUsata);
    
/* Es. 2 */
function checkAnagramma(nome1, nome2) {
    let reverseNome2 = nome2.split('').sort().join('')
    if (nome1.split("").sort().join('') === reverseNome2) {
        return true
    } return false
}
let resultCheckAnagramma = checkAnagramma('ciao', 'oiac')
console.log(resultCheckAnagramma)


/* Es. 3 */
const findAnagrammi = (arr, parola) => {
  const anagrammiArr = []
  for (const anagramma of arr) {
    if (checkAnagramma(parola, anagramma)) {
      anagrammiArr.push(anagramma)
    }
  }
  return anagrammiArr
}
let resultfindAnagrammi = findAnagrammi(["carenti", "incerta", "espatrio"],"cartine")
console.log('Risultato findAnagrammi: ', resultfindAnagrammi)

/* Es. 4 */
function checkPalindromo(string4){
    return string4.split('').reverse().join('') === string4
}
let resultCheckPalindromo = checkPalindromo('osso')
console.log(`La parola inserita è palindroma? ${resultCheckPalindromo}`);


/* Es. 5 */
function reverseNumb(num1) {
    // let numberToString = (String(num1).split("").reverse().join(''))
    return Number(String(num1).split('').reverse().join(''))
}
let resultReverseNumb = reverseNumb(234)
console.log(resultReverseNumb);
 

/* Es. 6 */
function printStairs(x){
    if (x >= 0){
        for (let index = 0; index < x; index++) {
            console.log('#'.repeat(index))
        } 
    } return false
}
printStairs(4)


/* Es. 7 */
function reverseString(string5) {
    return string5.split("").reverse().join('')
}
let resultReverseString = reverseString('Ciao')
console.log(resultReverseString);


/* Es. 8 */
function createArray(array, num2){
    return array.slice(num2)
}
createArray([1, 2, 3, 4],2)


/* Es. 9*/



/* Es. 10 */
