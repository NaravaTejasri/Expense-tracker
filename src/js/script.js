const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 },
];

let transactions = dummyTransactions;

//Add transaction 

function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value //here we add + symbol bcz we are converting string into number
        };
        //console.log(transaction);
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        
        text.value = '';
        amount.value= '';
    }

}
//Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}



//Add transactions to dom

function addTransactionDOM(transaction) { 
  //Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus': 'plus');
  
  item.innerHTML = `
   ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span>
   <button class=""delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
   list.appendChild(item);

}

//Update the balnce , income and expense

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount );
    //console.log(amounts); //here we get the amounts from transactions

    const total = amounts.reduce((acc, item) => (acc += item), 0);
    //console.log(total);// here we get total amount after adding '+' and '-' values.
    
    const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    //console.log(income); //here we get only + amounts and added to get total amount
    
    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1 )
    .toFixed(2);
    //console.log(expense); //here we get only - amounts 
   
    balance.innerText = `???${total}`;
    money_plus.innerText = `???${income}`;
    money_minus.innerText = `???${expense}`;

}

//Remove transaction by Id
function removeTransaction(id) {
    transactions = transactions. filter(transaction => transaction.id !== id);
    init();
}

//init app
function init(){
   list.innerHTML ='';
   transactions.forEach(addTransactionDOM);
   updateValues();
}

init();

//add eventlisteners
form.addEventListener('submit', addTransaction);

