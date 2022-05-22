import './App.css';
import { Button, Stack } from 'react-bootstrap';
import Container from "react-bootstrap/Container"
import { useState } from 'react';
import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import { useBudgets } from './context/BudgetContext';
import AddExpenseModal from './Components/AddExpenseModel'

function App() {

  const [showAddBudgetModel, setShowAddBudgetModel] = useState(false);
  const [showAddExpenseModel, setShowAddExpenseModel] = useState(false);
  const {budgets,expenses, getBudgetExpenses} = useBudgets();

  return ( <> <Container className='my-4'>

    <Stack direction='horizontal' gap="2" className='mb-4'>
      <h1 className='me-auto' >Budgets</h1>
      <Button variant='primary' onClick={()=>setShowAddBudgetModel(true)} >Add Budget</Button>
      <Button variant='outline-primary' onClick={()=>setShowAddExpenseModel(true)} >Add Expense</Button>
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
          const amount = getBudgetExpenses(budget.id).reduce((total,expense)=> total+expense.amount,0);
          return (
            <BudgetCard 
            key={budget.id}
            name={budget.name}
            amount={amount}
            max={budget.max}
            />
          )
        })
      }
      {/* <BudgetCard name="Entertainment" amount={1200} max={1000} gray ></BudgetCard> */}
    </div>

  </Container>
  <AddBudgetModal show={showAddBudgetModel} handleclose={()=>setShowAddBudgetModel(false)}  />
  <AddExpenseModal show={showAddExpenseModel} handleclose={()=>setShowAddExpenseModel(false)}  />
  </>
  )
}

export default App;
