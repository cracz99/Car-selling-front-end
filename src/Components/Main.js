import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Signup from './Signup'
function Main() {
  return (
    <Container style={{marginTop:'10%'}}>
        <Row >
            <Col  sm={12} 	xl={{span:6,offset:3}} lg={{span:7,offset:2}} md={{span:10,offset:2}} >   
                <Signup/>
                
            </Col>
           
        </Row>
        {/* xxl={12}  className='d-flex justify-content-center align-content-center' */}

        
    </Container>
  )
}

export default Main