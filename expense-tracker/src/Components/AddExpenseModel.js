import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgets } from '../context/BudgetContext';

export default function AddBudgetModal({show,handleclose,defaultBudgetId="Test"}) {

    const descriptionref = useRef();
    const amountref = useRef();
    const budgetIdref = useRef();
    const {addExpense,budgets} = useBudgets();

    const handlesubmit = (e)=>{

        e.preventDefault();
        addExpense({
            description: descriptionref.current.value,
            amount: amountref.current.value,
            budgetId: budgetIdref.current.value
        });
        
        handleclose();

    }

  return (
    <Modal show={show} onHide={handleclose} >
        <Form onSubmit={handlesubmit} >
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionref} type='text' required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='max'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountref} type='number' min={0} step={0.01} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='budget'>
                    <Form.Label>Budget</Form.Label>
                    <Form.Select ref={budgetIdref}  
                    defaultValue={defaultBudgetId}
                    >
                    {
                        budgets.map(budget=>(
                            <option key={budget.id} value={budget.id}>
                                {budget.name}
                            </option>
                        ))
                    }
                    
                    </Form.Select> 
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' onClick={handlesubmit} >Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
