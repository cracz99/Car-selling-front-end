import React,{useState,useRef} from 'react'
import { Card,Button,Form,FloatingLabel,Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../Context/AuthContext'
import { Container,Row,Col } from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'



function Login() {

  const emailRef=useRef();
  const passRef=useRef();
  const [error,setError]=useState('')
  const[loading,setLoading]=useState(false)
  const {login}=useAuth()
  const redirect=useNavigate()

const submitHandler=async (e)=>{
  e.preventDefault();

  try
  {
    setError('')
    setLoading(true)
    await login(emailRef.current.value,passRef.current.value);
    console.log(emailRef.current.value,passRef.current.value)
    redirect('/dashboard')
  }
  catch(e){
    console.log(e)
      setError(`Failed to LOGIN!! ${e.message.slice(e.message.indexOf('/')+1,e.message.lastIndexOf(')')).replace('-',' ')}`);

  }
  setLoading(false)

}
  return (
    <Container style={{marginTop:'10%'}}>
    <Row >
        <Col  sm={12} 	xl={{span:6,offset:3}} lg={{span:7,offset:2}} md={{span:10,offset:2}} >   
        <Card bg={'dark'} text={'white'} style={{ minWidth:'400px',maxWidth:'100%',minHeight:'20vh'}}>
        <Card.Body>
          <h2>LOGIN </h2>

            {error && <Alert variant='danger'>{error}</Alert>}

                <Form onSubmit={submitHandler} >
                    <Form.Group id='email' style={{margin:'4%'}}>
                    <FloatingLabel controlId="email" style={{color:'black'}} label="Email Address"className="m-3" >
                      <Form.Control ref={emailRef} type='email' placeholder="Email Address"  required/>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group id='password' style={{margin:'4%'}}>
                    <FloatingLabel controlId="password" style={{color:'black'}} label="Password"className="m-3" >
                    <Form.Control ref={ passRef} type='password'  placeholder="password"  required/>
                      </FloatingLabel>
                    </Form.Group>

                   
                          <Button disabled={loading} variant='outline-light' type="submit" >LOGIN</Button>
                </Form>

                    

                <div className='w-100 text-center mt-2 d-flex justify-content-between'>
                     <p>Not Registered? <Link className='link' to='/'>Signup</Link></p>
                
                    <p>Forgot Password? <Link className='link' to='/forgot'>Forgot</Link></p>
                </div>
        </Card.Body>
      </Card>
            
        </Col>
       
    </Row>
    {/* xxl={12}  className='d-flex justify-content-center align-content-center' */}

    
</Container>
    // <div className='w-25 m-2 ' style={{position:'absolute',left:'35%',top:'20%', }}>
      
     
     
    

    
  
      
    
  )
 
}

export default Login