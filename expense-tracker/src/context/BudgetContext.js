import React from "react";
import { createContext,useContext,useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import {v4 as uuidV4} from 'uuid';

export const BudgetContext = createContext(null);

export function useBudgets() {
    return useContext(BudgetContext);
}

const BudgetProvider = ({children})=>{

    const [Budgets,setbudget] = useState([]);
    const [expenses,setexpenses] = useState([]);

    function getBudgetExpenses(budgetId){
        expenses.filter(expense=> expense.budgetId===budgetId);
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
        // TODO: deal with expenses
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
            Budgets,
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