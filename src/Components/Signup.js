import React,{useState,useRef,} from 'react'
import { Card,Button,Form,FloatingLabel,Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../Context/AuthContext'
import {Link,useNavigate} from 'react-router-dom'
import {setDoc,doc} from 'firebase/firestore'
import {db} from '../firebase'

function Signup() {

  const [customer,setCustomer]=useState(false)
  const [seller,setSeller]=useState(false)
  const emailRef=useRef();
  const passRef=useRef();
  const passconfRef=useRef();
  // const typeRef=useRef('');
  const phonenumberRef=useRef();
  const addressRef=useRef();
  const dealerRef=useRef('');
  const {signup}=useAuth()
  const [error,setError]=useState('')
  const[loading,setLoading]=useState(false)
  const redirect=useNavigate()



  const sellerdb=async(email,phone,address,companyname)=>{
    const data={
      email:email,
      phone:phone,
      address:address,
      company:companyname,
      type:'seller'
    }
    await setDoc(doc(db, "users",emailRef.current.value), data);

    }


  const customerdb=async(email,phone,address)=>{
    const data={
      email:email,
      phone:phone,
      address:address,
      type:'customer'
    }
    await setDoc(doc(db, "users",emailRef.current.value), data);
  }


const submitHandler=async (e)=>{
  e.preventDefault();
  if(passRef.current.value!==passconfRef.current.value)
  {
    return setError(`Passwords don't match`);
  }

  try
  {
    setError('')
    setLoading(true)
    await signup(emailRef.current.value,passRef.current.value);
    console.log(emailRef.current.value,passRef.current.value,passconfRef.current.value,phonenumberRef.current.value,addressRef.current.value,dealerRef.current.value)
    if(seller===true)
    {
        sellerdb(emailRef.current.value,phonenumberRef.current.value,addressRef.current.value,dealerRef.current.value)
    }
    else
    {
      customerdb(emailRef.current.value,phonenumberRef.current.value,addressRef.current.value)
    }
    
    redirect('/login')
  }
  catch(e){
    console.log(e)
      setError(`Failed to create an account!! ${e.message.slice(e.message.indexOf('/')+1,e.message.lastIndexOf(')')).replace('-',' ')}`);

  }
  setLoading(false)

}
  return (
    
    // <div className='w-25 m-2 ' style={{position:'absolute',left:'35%',top:'20%', }}>
      
      <Card bg={'dark'} text={'white'} style={{minWidth:'400px',maxWidth:'100%',minHeight:'50vh'}}>
        <Card.Body>
          <h2>SIGNUP</h2>

            {error && <Alert variant='danger'>{error}</Alert>}

                <Form onSubmit={submitHandler}>
                    <Form.Group id='email'>
                    <FloatingLabel controlId="email" style={{color:'black'}} label="Email Address"className="m-3" >
                      <Form.Control ref={emailRef} type='email' placeholder="Email Address"  required/>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group id='password'>
                    <FloatingLabel controlId="password" style={{color:'black'}} label="Password"className="m-3" >
                    <Form.Control ref={ passRef} type='password'  placeholder="password"  required/>
                      </FloatingLabel>
                    </Form.Group>
                    

                    <Form.Group id='password'>
                    <FloatingLabel controlId="passconf" style={{color:'black'}} label="Confirm Password"className="m-3" >
                    <Form.Control ref={passconfRef} type='password'  placeholder="Confirm Password"  required/>
                      </FloatingLabel>
                    </Form.Group>

                    

                    <Form.Group id='type' className='fs-5'>
                        <Form.Label className='m-2' style={{display:'block'}}>Who are you?</Form.Label>
                        <Form.Check 
                          inline
                          label="Customer"
                          name="group1"
                          value="Customer"
                          type={'radio'}
                          
                          id={`inline-${'radio'}-1`}
                          onClick={()=>{setCustomer(true); setSeller(false)}}
                          />

                          <Form.Check 
                            inline
                            label="Seller"
                            name="group1"
                            value="Seller"
                            type={'radio'}
                            id={`inline-${'radio'}-2`}
                            onClick={()=>{setSeller(true); setCustomer(false)}}
                            /> 
                    </Form.Group>
                    {
                      customer && <div>
                                  <Form.Group id='PhoneNumber'>
                                  <FloatingLabel controlId="phonenumber" style={{color:'black'}} label="PhoneNumber"className="m-3" >
                                  <Form.Control ref={phonenumberRef} type='text' placeholder="PhoneNumber" required/>
                                    </FloatingLabel>
                                  </Form.Group>

                                  <Form.Group id='Address'>
                                    <FloatingLabel controlId="Address" style={{color:'black'}} label="Address"className="m-3" >
                                    <Form.Control ref={addressRef} type='text'  placeholder="Address"  required/>
                                      </FloatingLabel>
                                  </Form.Group>


                          </div>}
                    {
                      seller && <div>

                                  <Form.Group id='Company'>
                                  <FloatingLabel controlId="Company" style={{color:'black'}} label="Dealer of?"className="m-3" >
                                  <Form.Control type='text'ref={dealerRef} placeholder="Company" required/>
                                    </FloatingLabel>
                                  </Form.Group>

                                  <Form.Group id='PhoneNumber'>
                                  <FloatingLabel controlId="PhoneNumber" style={{color:'black'}} label="PhoneNumber"className="m-3" >
                                  <Form.Control type='text' ref={phonenumberRef} placeholder="PhoneNumber" required/>
                                    </FloatingLabel>
                                  </Form.Group>

                                  <Form.Group id='Address'>
                                    <FloatingLabel controlId="Address" style={{color:'black'}} label="Address"className="m-3" >
                                    <Form.Control type='text' ref={addressRef} placeholder="Address"  required/>
                                      </FloatingLabel>
                                  </Form.Group>


                      </div>
                    }
                          <Button disabled={loading} variant='outline-light' type="submit" >SIGNUP</Button>
                </Form>

                    

                <div className='w-100 text-center mt-2'>
                    <p> Already Registered? <Link className='link' to='/login'>Login</Link> </p>
                </div>

        </Card.Body>
      </Card>
     
    

    
  
      
    
  )
 
}

export default Signup