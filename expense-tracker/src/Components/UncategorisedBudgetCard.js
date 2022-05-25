import React from 'react'
import { UNCATEGORISED_BUDGET_ID, useBudgets } from '../context/BudgetContext'
import BudgetCard from './BudgetCard'

export default function UncategorisedBudgetCard(props) {

    const {getBudgetExpenses} = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORISED_BUDGET_ID).reduce((total,expense)=> total+expense.amount,0);

    if(amount === 0){
        return null
    }

  return (
    <BudgetCard  amount={amount}   name="Uncategorised" gray {...props} />
  )
}
