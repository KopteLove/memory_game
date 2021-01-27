const popupBtnStart = document.querySelector('.popup_btn-start');
const popupBtnNew = document.querySelector('.popup_btn-new');
const popupStart = document.querySelector('.popup_start');
const popupWin = document.querySelector('.popup_win');
const list = document.createElement('ul');
let numbers = [];
let quantity = 0;

popupBtnStart.addEventListener('click', () => {
    popupStart.classList.add('close');
    const levelGame = document.querySelector('input:checked');
    quantity = levelGame.value;
    createCard(quantity);
    generationRandomNumbers(numbers, quantity / 2);
    addNumber(numbers);
});

popupBtnNew.addEventListener('click', () => {
   popupWin.classList.add('close');
   popupStart.classList.remove('close');
});

list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.add('click');
    }
    let openCards = document.querySelectorAll('.click')
    if (openCards.length === 2) {
        if (openCards[0].dataset['num'] === openCards[1].dataset['num']) {
            openCards[0].classList.add('hide');
            openCards[1].classList.add('hide');
        }
        setTimeout(() => {
            openCards[0].classList.remove('click');
            openCards[1].classList.remove('click');
        }, 500);

    }
    winGame();
})

function winGame() {
    let cardsHide = document.querySelectorAll('.hide').length;
    if(cardsHide === list.children.length) {
        popupWin.classList.remove('close');
        newGame();
    }
}

function newGame() {
    list.remove();
    numbers = [];
    quantity = 0;
}

function generationRandomNumbers(arr, length) {
    for (let i = 1; i <= length; i++) {
        arr.push(i);
        arr.push(i);
    }
    arr.sort(() => {
        return Math.random() - 0.5;
    })
}

function createCard(quantity) {
    while (list.children.length > 0) {
        list.removeChild(list.firstChild);
    }
    for (let i = 1; i <= quantity; i++) {
        let li = document.createElement('li');
        list.append(li);
    }
    document.body.append(list);
}

function addNumber(numbers) {
    const cards = document.querySelectorAll('li');
    cards.forEach((item, index) => {
        item.setAttribute('data-num', `${numbers[index]}`);
    });
}

