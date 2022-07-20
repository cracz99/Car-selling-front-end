import React,{useEffect, useRef, useState}    from 'react'
import { Card,Button,Form,FloatingLabel,Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../Context/AuthContext'
import { Container,Row,Col } from 'react-bootstrap'
import {Link,Navigate,useNavigate} from 'react-router-dom'
import { doc, getDoc ,updateDoc} from "firebase/firestore";
import {db} from '../firebase'

function Upmain() {

    

    const emailRef=useRef();
    const passRef=useRef();
    const passconfRef=useRef();
    const phonenumberRef=useRef();
    const addressRef=useRef();
    const dealerRef=useRef();
    const [error,setError]=useState('')
    const {currentUser,updateemail,updatepassword}=useAuth()
    const[data,setdata]=useState('')
    const[msg,setmsg]=useState('')
    const nav=useNavigate()
    useEffect( ()=>{
       async function da()
        {
            const docRef = doc(db, "users", currentUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            setdata(docSnap.data());
            } 
        }
        da();

    } ,[currentUser.email] )

      const submitHandler=async (e)=>{
        e.preventDefault();
        
        if(passRef.current.value!==passconfRef.current.value)
        {
            
          return setError(`Passwords don't match`);
        }
        else
        {
        if(passRef.current.value)
        {
            updatepassword(passRef.current.value)
        }




        if(data.type!=='seller')
        {
            console.log(emailRef.current.value,passRef.current.value,phonenumberRef.current.value,addressRef.current.value)
            const dref = doc(db, "users", currentUser.email);
                await updateDoc(dref, {
                address:addressRef.current.value,
                email:currentUser.email,
                phone:phonenumberRef.current.value,
                type:'customer'
                });
                setmsg('Info Updated!!')
        }
        else
        {   
            console.log(emailRef.current.value,passRef.current.value,phonenumberRef.current.value,addressRef.current.value,dealerRef.current.value)
            const dref = doc(db, "users", currentUser.email);
                await updateDoc(dref, {
                address:addressRef.current.value,
                company:dealerRef.current.value,
                email:currentUser.email,
                phone:phonenumberRef.current.value,
                type:'seller'
                });
            setmsg('Info Updated!!')
        }
    }
        // try
        // {
        //   setError('')
        //   setLoading(true)
        //   await signup(emailRef.current.value,passRef.current.value);
        //   console.log(emailRef.current.value,passRef.current.value,passconfRef.current.value,phonenumberRef.current.value,addressRef.current.value,dealerRef.current.value)
        //   if(seller===true)
        //   {
        //       sellerdb(emailRef.current.value,phonenumberRef.current.value,addressRef.current.value,dealerRef.current.value)
        //   }
        //   else
        //   {
        //     customerdb(emailRef.current.value,phonenumberRef.current.value,addressRef.current.value)
        //   }
          
        //   redirect('/login')
        // }
        // catch(e){
        //   console.log(e)
        //     setError(`Failed to create an account!! ${e.message.slice(e.message.indexOf('/')+1,e.message.lastIndexOf(')')).replace('-',' ')}`);
      
        // }
        // setLoading(false)
      
      }

  return (
    <div style={{position:'absolute',top:'10%',width:'100%'}}>
        <Container style={{marginTop:'10%'}}>
    <Row >
        <Col  sm={12} 	xl={{span:6,offset:3}} lg={{span:7,offset:2}} md={{span:10,offset:2}} >   
        <Card bg={'dark'} text={'white'} style={{ minWidth:'400px',maxWidth:'100%',minHeight:'20vh'}}>
        <Card.Body>
          <h2>UPDATE</h2>

            {error && <Alert variant='danger' onClose={()=>nav('/dashboard')} dismissible>{error}</Alert>} 
            {msg && <Alert variant='success' onClose={()=>nav('/dashboard')} dismissible>{msg}</Alert>} 

                <Form onSubmit={submitHandler} >
                    <Form.Group id='email' style={{margin:'4%'}}>
                    <FloatingLabel controlId="email" style={{color:'black'}} label="Email Address"className="m-3" >
                      <Form.Control ref={emailRef} type='email' placeholder="Email Address" defaultValue={currentUser.email} disabled required/>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group id='password' style={{margin:'4%'}}>
                    <FloatingLabel controlId="password" style={{color:'black'}} label="Password"className="m-3" >
                    <Form.Control ref={ passRef} type='password'  placeholder="password"  required/>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group id='confpassword' style={{margin:'4%'}}>
                    <FloatingLabel controlId="confpassword" style={{color:'black'}} label="Confirm Password" className="m-3" >
                    <Form.Control ref={ passconfRef} type='password'  placeholder="Confirm password"  required/>
                      </FloatingLabel>
                    </Form.Group>

                            {data.type==='seller'?<>
                            
                            <Form.Group id='Company' style={{margin:'4%'}}>
                                  <FloatingLabel controlId="Company" style={{color:'black'}} label="Dealer of?"className="m-3" >
                                  <Form.Control type='text'ref={dealerRef} placeholder="Company" required/>
                                    </FloatingLabel>
                                  </Form.Group>

                                  <Form.Group id='PhoneNumber' style={{margin:'4%'}}>
                                  <FloatingLabel controlId="PhoneNumber" style={{color:'black'}} label="PhoneNumber"className="m-3" >
                                  <Form.Control type='text' ref={phonenumberRef} placeholder="PhoneNumber" required/>
                                    </FloatingLabel>
                                  </Form.Group>

                                  <Form.Group id='Address' style={{margin:'4%'}}>
                                    <FloatingLabel controlId="Address" style={{color:'black'}} label="Address"className="m-3" >
                                    <Form.Control type='text' ref={addressRef} placeholder="Address"  required/>
                                      </FloatingLabel>
                                  </Form.Group>
                            
                            </>:
                            
                            
                            <>
                            <Form.Group id='PhoneNumber' style={{margin:'4%'}}>
                            <FloatingLabel controlId="phonenumber" style={{color:'black'}} label="PhoneNumber"className="m-3" >
                            <Form.Control ref={phonenumberRef} type='text' placeholder="PhoneNumber" required/>
                              </FloatingLabel>
                            </Form.Group>

                            <Form.Group id='Address' style={{margin:'4%'}}>
                              <FloatingLabel controlId="Address" style={{color:'black'}} label="Address"className="m-3" >
                              <Form.Control ref={addressRef} type='text'  placeholder="Address"  required/>
                                </FloatingLabel>
                            </Form.Group>
                            </>
                            
                            }
                   
                          <Button  variant='outline-light' type="submit" >UPDATE</Button>
                </Form>
                <div className='w-100 text-center mt-2'>
                    <p>  <Link className='link' to='/dashboard'>BACK</Link> </p>
                </div>
                    

               
        </Card.Body>
      </Card>
            
        </Col>
       
    </Row>
    {/* xxl={12}  className='d-flex justify-content-center align-content-center' */}

    
</Container>
       </div>
  )
}

export default Upmain