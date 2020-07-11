// JavaScript Document

//Selectors
const nameInput = document.querySelector('.name-box');
const amountInput = document.querySelector('.amount-box');
const dueDateInput = document.querySelector('.due-date-box');

const addButton = document.querySelector('.addbutton');
const expenseList = document.querySelector('.expense-list');
const filterOption = document.querySelector('.filter-expense');

// Event Listeners
addButton.addEventListener("click", addExpense);
expenseList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterExpense);
document.addEventListener('DOMContentLoaded', getExpense);


function deleteCheck(e) {
    const item = e.target;
    
    //DELTE Expense
    if(item.classList[0] === 'trash-btn') {
        const expense = item.parentElement;
        //Animation
        expense.classList.add("fall");
        removeLocalExpenses(expense);
        expense.addEventListener('transitionend', function(){
            expense.remove();
        });    
    }
    
    // CHECKMARK
    if(item.classList[0] === 'completed-btn') {
        const expense = item.parentElement;
        expense.classList.add('completed');
    }
}

function addExpense(event) {
    //Prevent form from submitting
     event.preventDefault();
    //Expense Div
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense");
    //Create LI
    const newExpense = document.createElement('li');
    newExpense.innerText = `${nameInput.value} --- ${amountInput.value} --- ${dueDateInput.value}`;
    newExpense.classList.add('expense-item');
    expenseDiv.appendChild(newExpense);
    
    /// SAVING TO LOCAL STORAGE
    saveExpense(nameInput.value);
    
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    expenseDiv.appendChild(completedButton);
    
    //Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    expenseDiv.appendChild(trashButton);
    
    //APPEND TO LIST
    expenseList.appendChild(expenseDiv);
    
    nameInput.value = "";
    amountInput.value = "";
    dueDateInput.value = "";
    
}


//FILTER
function filterExpense(e) {
    const expense = expenseList.childNodes;
    
    expense.forEach(function(expense){
        
        switch(e.target.value) {
            case "all":
                expense.style.display = "flex";
                break;
            case 'completed':
                if(expense.classList.contains('completed')) {
                    expense.style.display = "flex";
                }else {
                    expense.style.display = "none";
                }
                break;
                
            case "uncompleted": 
                if(!expense.classList.contains("completed")) {
                    expense.style.display = "flex";
                }else {
                    expense.style.display = "none";
                }
                break;
                
        }
        
         });
}




// Local Storage

function saveExpense(expense) {
    // CHEck -- IF STORAGE HAS INFORMATINO
    
    let expenseArray;
    if(localStorage.getItem('expense') === null) {
        expenseArray = [];
    }else {
        expenseArray = JSON.parse(localStorage.getItem('expense'));
    }
    expenseArray.push(expense);
    localStorage.setItem('expense', JSON.stringify(expenseArray));
}


function getExpense(){
        let expenseArray;
    if(localStorage.getItem('expense') === null) {
        expenseArray = [];
    }else {
        expenseArray = JSON.parse(localStorage.getItem('expense'));
    }
    
    expenseArray.forEach(function(expense){
        
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense");
    //Create LI
    const newExpense = document.createElement('li');
    newExpense.innerText = `${expense}`; //--- ${amountInput.value} --- ${dueDateInput.value}`;
    newExpense.classList.add('expense-item');
    expenseDiv.appendChild(newExpense);
    

    
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    expenseDiv.appendChild(completedButton);
    
    //Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    expenseDiv.appendChild(trashButton);
    
    //APPEND TO LIST
    expenseList.appendChild(expenseDiv);
        
        
        
    });
}


function removeLocalExpenses(expense) {
    let expenseArray;
    if(localStorage.getItem('expense') === null) {
        expenseArray = [];
    }else {
        expenseArray = JSON.parse(localStorage.getItem('expense'));
    }
    
    const expenseIndex = expense.children[0].innerText;
    expenseArray.splice(expenseArray.indexOf(expenseIndex), 1);
    
    localStorage.setItem('expense', JSON.stringify(expenseArray));
    
}









