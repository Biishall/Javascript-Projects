document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem('expenses')) ||  [];
  let totalAmount = calculateTotal();

  renderExpenses()

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    //whenever any form is submitted, any input comes up in the string format. we should change it
    const amount = parseFloat(expenseAmountInput.value.trim());

    //check if the name is empty or the amount is not a number
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(), //industry standards are nanoid, uuid
        name,
        amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();

      //clear input after submit
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0); //important to calc sum of array
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function renderExpenses(){
    expenseList.innerHTML = ""
    expenses.forEach(expense => {
      const li = document.createElement('li')
      li.innerHTML =`
      ${expense.name} - €${expense.amount}
      <button data-id="${expense.id}">Delete</button>
      `;

      expenseList.appendChild(li)
    })
  }

  expenseList.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
      const expenseId = parseInt(e.target.getAttribute('data-id'))

      //give me fresh expenses list where the expenseId should not be there 
      expenses = expenses.filter(expense => expense.id !== expenseId)

      saveExpensesToLocal()
      renderExpenses()
      updateTotal()
    }
  })
});
