import React from "react";
import { createContext,useContext,useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import {v4 as uuidV4} from 'uuid';
import UseLocalStorage from "../hooks/UseLocalStorage.js";

export const BudgetContext = createContext(null);

export const UNCATEGORISED_BUDGET_ID = "uncategorized";

export function useBudgets() {
    return useContext(BudgetContext);
}

const BudgetProvider = ({children})=>{

    const [budgets,setbudget] = UseLocalStorage("budgets",[]);
    const [expenses,setexpenses] = UseLocalStorage("expenses",[]);

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense=> expense.budgetId===budgetId);
    }
    
    function addExpense({description, amount , budgetId}){

        setexpenses(Prev=> {
            return [...Prev, { id: uuidV4(), description,amount,budgetId }];
        })

    }

    function addBudget({name , max}){
        setbudget(Prev=> {
            if(Prev.find(budget => budget.name===name)){
                return Prev;
            }
            return [...Prev, { id: uuidV4(), name ,max }];
        })
    }

    function deleteBudget({ id }){
        
        setexpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetId !== id) return expense
                return {...expense, budgetId: UNCATEGORISED_BUDGET_ID}
            })
        })

        setbudget(prevBudget=> {
            return prevBudget.filter(budget=> budget.id!==id);
        })

    }

    function deleteExpense({ id }){

        setexpenses(prevExpense=>{
            return prevExpense.filter(expense=> expense.id!==id);
        })

    }


    return (
        <BudgetContext.Provider
        value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}
        >
            {children}
        </BudgetContext.Provider>
    )

}

export default BudgetProvider;