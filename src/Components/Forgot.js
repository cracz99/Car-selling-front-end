// import React from 'react'

// function Forgot() {
//   return (
//     <div>Forgot</div>
//   )
// }

// export default Forgot



import React,{useState,useRef} from 'react'
import { Card,Button,Form,FloatingLabel,Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../Context/AuthContext'
import { Container,Row,Col } from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'



function Forgot() {

  const emailRef=useRef();
  const [error,setError]=useState('')
  const[loading,setLoading]=useState(false)
  const {resetPassword}=useAuth()
  const redirect=useNavigate()
 const [msg,setmsg]=useState('')
const submitHandler=async (e)=>{
  e.preventDefault();

  try
  {
      setmsg('')
    setError('')
    setLoading(true)
    // await login(emailRef.current.value,passRef.current.value);
    // console.log(emailRef.current.value,passRef.current.value)
    await resetPassword(emailRef.current.value);
    
    setmsg('Mail sent! Please check your inbox')


    
  }
  catch(e){
    console.log(e)
      setError(`Failed to Reset!! ${e.message.slice(e.message.indexOf('/')+1,e.message.lastIndexOf(')')).replace('-',' ')}`);

  }
  setLoading(false)

}
  return (
    <Container style={{marginTop:'10%'}}>
        
    <Row >
        <Col  sm={12} 	xl={{span:6,offset:3}} lg={{span:7,offset:2}} md={{span:10,offset:2}} >   
        <Card bg={'dark'} text={'white'} style={{ minWidth:'400px',maxWidth:'100%',minHeight:'20vh'}}>
        <Card.Body>
          <h2> Password Reset </h2>
          {msg&&<Alert variant='success' onClose={()=>redirect('/login')} dismissible>{msg}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}

                <Form onSubmit={submitHandler} >
                    <Form.Group id='email' style={{margin:'4%'}}>
                    <FloatingLabel controlId="email" style={{color:'black'}} label="Email Address"className="m-3" >
                      <Form.Control ref={emailRef} type='email' placeholder="Email Address"  required/>
                      </FloatingLabel>
                    </Form.Group>

                   
                          <Button disabled={loading} variant='outline-light' type="submit" >RESET</Button>
                </Form>

                    

                <div className='w-100 text-center mt-2 d-flex justify-content-between'>
                     <p>Registered? <Link className='link' to='/login'>Login</Link></p>
                
                    <p>Not  Registered? <Link className='link' to='/'>SignUp</Link></p>
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

export default Forgot