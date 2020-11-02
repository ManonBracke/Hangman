const els = {
    score: null,
    answer: null,
    choices: null
};

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 10;


const init = () => {

    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');


    word = pickWord();

    wordMapping = getWordMapping(word);
    console.log('wordMapping', wordMapping);

    choices = generateChoices();

    choicesMapping = getChoicesMapping(choices);

    displayWord(wordMapping);

    displayChoices(choicesMapping);


    // Quand on appuie sur la lettre avec le click
    els.choices.addEventListener('click', ({ target }) => {
        // evt:MouseEvent evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        }
    });

    // Quand on appuie sur une touche
    document.addEventListener('keydown', ({ keyCode }) => {
        const letter = String.fromCharCode(keyCode);

        if (keyCode >= 65 && keyCode <= 90) {
            checkLetter(letter);
        }
    });


};

// La lettre trouvé
const checkLetter = (letter) => {
    console.log(letter);
    let isLetterInWord = false;
    let isAllLettersFound = true;

    wordMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });
    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
    });
    displayChoices(choicesMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
};
// Quand on perd 
const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
    els.choices.innerHTML = `<h1>You dead, bro!</h1>`;
};
// Quand on gagne 
const winGame = () => {
    els.choices.innerHTML = `<h1>You live!</h1>`;
};


window.addEventListener('load', () => {
    init();
});

//Autre façon de faire 
//window.onload= init;
//window.onload = () => {
//    init();
//}
//window.addEventListener('load', init);


//Random pour le mot
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};