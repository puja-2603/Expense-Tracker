//1

const balance= document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form= document.getElementById("form");
const text = document.getElementById("text");
const amount= document.getElementById("amount");

// const dummyTransactions = [
//     {id: 1,text: "Flower", amount: -20},
//     {id: 2, text: "Salary", amount: 300},
//     {id: 3, text: "Book", amount: -10},
//     {id: 4, text: "Camera", amount: 150},
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('Transactions'));
let Transactions = localStorage.getItem('Transactions') !== null ? localStorageTransactions : [];


//5
//Add Transactions
function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim() === ''|| amount.value.trim()===''
    ){
        alert('Please Enter Text And Value')
    }
    else{
        const transaction={
            id:generateID(),
            text: text.value,
            amount: +amount.value
        }

        Transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value='';
        amount.value ='';
    }
}

//Generate Random Id
//5.5
function generateID(){
    return Math.floor(Math.random() *100000000);
}

//2

//Add Transactions to DOM List
function addTransactionDOM(transaction){
    const sign = transaction.amount< 0 ? "-" : "+";
    const item = document.createElement("li");


    //Add class based on value
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );




    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

        list.appendChild(item);
}

//4
//Update the balance income and expense

function updateValues(){
    const amounts = Transactions.map((transaction) => transaction.amount);
    // reduce -> (acc,item) => (acc+= item),0) -> 0-> is the initial value
    const total = amounts
    .reduce((acc,item) => (acc+= item),0)
    .toFixed(2);
    
    const income = amounts
    .filter((item) => item>0)
    .reduce((acc,item) => (acc+= item),0)
    .toFixed(2);
    
    const expense =(
     amounts
     .filter(item => item<0)
     .reduce((acc,item) => (acc += item),0)* -1)
     .toFixed(2);

    balance.innerText= `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//removeTransaction
function removeTransaction(id){
    Transactions = Transactions.filter((transaction) => transaction.id !== id);
    updateLocalStorage();
    Init();
}


//Update Local Storage
function updateLocalStorage(){
    localStorage.setItem(
        'Transactions',
        JSON.stringify(Transactions)
    );
}

//3
//Init App
function Init(){
    list.innerHTML ="";
    Transactions.forEach(addTransactionDOM);
    updateValues();
}

//addTransactionDOM(Transactions);
Init();

form.addEventListener('submit',addTransaction);