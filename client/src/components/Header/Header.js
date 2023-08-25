import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Col, InputGroup,FormControl,Container} from "react-bootstrap";
import { useUser } from "../../hooks/useUser";
import { CATEGORIES } from "../../util";
import { ReactComponent as Add} from '../../assets/plus.svg'
import './Header.css'

const Header = () => {
    const {user} = useUser()
        
    const [show, setShow] = useState(false)
    const [expense, setExpense] = useState({
        topic: '',
        amount: 0,
        status: '-',
        category: 'Transport'
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('https://budgettrackap.onrender.com/api/addactivity',{
            user,expense,
                headers: {
                  'Content-Type': 'application/json'
                },
          
        }).then((res)=>{
            setExpense({
            topic: '',
            amount: 0,
            status: '-',
            category: 'Transport'
        })
        window.location.reload()}).catch(err => console.log(err))
    }

    const handleChange = (e) => {
        e.preventDefault();
        setExpense({
            ...expense,
            [e.target.name] : e.target.value
        })  
    }

    return ( 
        <Col >
            <h2 className="d-flex justify-content-between">
                <span>Dashboard</span>
                <span >
                    <Add onClick={() => setShow(!show)}/>
                </span>
            </h2>
            <Container className="mx-auto w-75 w-responsive my-3">
            {show && <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Category">
                    <Form.Control as="select"  name="category" onChange={handleChange} required>
                        {CATEGORIES.map(category => <option key={category}>{category}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control placeholder="topic"  name="topic" value={expense.topic} onChange={handleChange} required/>
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend onClick={handleChange} >
                        <Button variant={expense.status === '-' ? 'success' : 'primary'}  name="status" value="-" >-</Button>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Amount"
                        aria-label="Expense"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange} required/>
                    <InputGroup.Append onClick={handleChange}>
                    <Button variant={expense.status === '+' ? 'success' : 'primary'} name="status" value="+"  >&#65291;
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
                
                <Col className="my-3 d-flex justify-content-center">
                    <Button type="submit" size="lg" className="add-btn">Add</Button>
                </Col>
            </Form>}
            </Container>
        </Col>
    )
}

export default Header;