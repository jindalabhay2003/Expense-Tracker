import './App.css';
import { Button, Stack } from 'react-bootstrap';
import Container from "react-bootstrap/Container"
import { useState } from 'react';
import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import { UNCATEGORISED_BUDGET_ID, useBudgets } from './context/BudgetContext';
import AddExpenseModal from './Components/AddExpenseModel'
import UncategorisedBudgetCard from './Components/UncategorisedBudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard';
import ViewExpensesModal from './Components/ViewExpenseModal';

function App() {

  const [showAddBudgetModel, setShowAddBudgetModel] = useState(false);
  const [showAddExpenseModel, setShowAddExpenseModel] = useState(false);
  const [ViewExpensesModelBudgetId, setViewExpensesModelBudgetId] = useState(false);
  const {budgets,expenses, getBudgetExpenses} = useBudgets();
  const [addExpenseModelBudgetId, setaddExpenseModelBudgetId] = useState();

  function openExpenseModal(budgetId){
    setShowAddExpenseModel(true);
    setaddExpenseModelBudgetId(budgetId);
  }

  return ( <> <Container className='my-4'>

    <Stack direction='horizontal' gap="2" className='mb-4'>
      <h1 className='me-auto' >Budgets</h1>
      <Button variant='primary' onClick={()=>setShowAddBudgetModel(true)} >Add Budget</Button>
      <Button variant='outline-primary' onClick={openExpenseModal} >Add Expense</Button>
    </Stack>

    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1rem",
      alignItems: "flex-start",
    }}
    >
      {
        budgets.map(budget => {
          // const amountmap = getBudgetExpenses(budget.id).reduce((total,expense)=> total+expense.amount,0);
          const amountmap = getBudgetExpenses(budget.id);
          var amount = 0;

          amountmap.map(a=>(
            amount += parseInt(a.amount)
          ))
          return (
            <BudgetCard 
            key={budget.id}
            name={budget.name}
            amount={amount}
            max={budget.max}
            openExpenseModalClick={()=> openExpenseModal(budget.id)}
            ViewExpenseModalClick={()=> setViewExpensesModelBudgetId(budget.id)}
            />
          )
        })
      }
      {/* <BudgetCard name="Entertainment" amount={1200} max={1000} gray ></BudgetCard> */}
      <UncategorisedBudgetCard ViewExpenseModalClick={()=> setViewExpensesModelBudgetId(UNCATEGORISED_BUDGET_ID)} openExpenseModalClick={()=> openExpenseModal(UNCATEGORISED_BUDGET_ID)}/>
      <TotalBudgetCard />
    </div>

  </Container>
  <AddBudgetModal show={showAddBudgetModel} handleclose={()=>setShowAddBudgetModel(false)}  />
  <AddExpenseModal defaultBudgetId={addExpenseModelBudgetId} show={showAddExpenseModel} handleclose={()=>setShowAddExpenseModel(false)}  />
  { ViewExpensesModelBudgetId && <ViewExpensesModal  budgetId={ViewExpensesModelBudgetId} handleclose={()=>setViewExpensesModelBudgetId()}  />}
  </>
  )
}

export default App;
