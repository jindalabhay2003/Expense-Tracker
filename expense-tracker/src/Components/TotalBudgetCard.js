import React from 'react'
import {  useBudgets } from '../context/BudgetContext'
import BudgetCard from './BudgetCard'

export default function TotalBudgetCard() {

    const {expenses, budgets} = useBudgets();

    let am = 0;
    expenses.map(expense => (
        am = am + parseInt(expense.amount)
    ))

    const max = budgets.reduce((total,budget)=> total+budget.max,0);

    if(max === 0){
        return null
    }

  return (
    <BudgetCard  amount={am}   name="Total" gray max={max} hideButtons />
  )
}
