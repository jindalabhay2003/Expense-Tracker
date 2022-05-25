import React from 'react'
import { Button,Modal, Stack } from 'react-bootstrap'
import { UNCATEGORISED_BUDGET_ID, useBudgets } from '../context/BudgetContext';
import { currencyFormatter } from '../Utils';

export default function ViewExpensesModal({budgetId,handleclose}) {
    const {budgets,deleteBudget,getBudgetExpenses,deleteExpense} = useBudgets();

    const expenses = getBudgetExpenses(budgetId);

    const budget = UNCATEGORISED_BUDGET_ID===budgetId?{name: "Uncategorised", id:UNCATEGORISED_BUDGET_ID}:
    budgets.find(b => (b.id === budgetId));

  return (
    <Modal show={ budgetId!=null } onHide={handleclose} >
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction='horizontal' gap="2" >
                        <div>Expenses - {budget?.name}</div>
                        {
                            budgetId!==UNCATEGORISED_BUDGET_ID && (
                                <Button onClick={()=> {deleteBudget(budgetId);handleclose()}} variant='outline-danger' >Delete</Button>
                            )
                        }
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='vertical' gap="3" >
                    {
                        expenses.map(expense => (
                            <Stack direction='horizontal' gap="2" >
                                <div className='me-auto fs-4 ' >{expense.description}</div>
                                <div className='fs-5' >{currencyFormatter.format(expense.amount)} </div>
                                <Button onClick={()=>deleteExpense(expense)} size="sm" variant='outline-danger' >&times;</Button>
                            </Stack>
                        ))
                    }
                </Stack>
            </Modal.Body>
    </Modal>
  )
}
