import React ,{useState}from 'react'
import { Button,Form,Col,Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword,setKeyword] = useState('')
    let history = useHistory()

    const submitHandler =(e)=>{
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}&page=1`)
        }else{
            //when a user is on a different page, we send him to that original path 
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        //the button should be inline with form
        <Form onSubmit={submitHandler} inline> 
            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        // className='mr-sm-2 ms-sm-5 '
                    ></Form.Control>
                </Col>
                <Col xs="auto">
                    <Button
                        type='submit'
                        variant='outline-success'
                        className='p-2'
                    >Submit
                    </Button>
                </Col>  
            </Row>
        </Form>
    )
}

export default SearchBox
