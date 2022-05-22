import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgets } from '../context/BudgetContext';

export default function AddBudgetModal({show,handleclose}) {

    const nameref = useRef();
    const maxref = useRef();
    const {addBudget} = useBudgets();

    const handlesubmit = (e)=>{

        e.preventDefault();
        addBudget({
            name: nameref.current.value,
            max: parseFloat(maxref.current.value)
        });
        
        handleclose();

    }

  return (
    <Modal show={show} onHide={handleclose} >
        <Form onSubmit={handlesubmit} >
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameref} type='text' required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='max'>
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control ref={maxref} type='number' min={0} step={0.01} required />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button variant='primary' onClick={handlesubmit} >Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
