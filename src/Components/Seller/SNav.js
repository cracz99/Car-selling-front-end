import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Container,Row,Col,Alert } from 'react-bootstrap'

import update from '../../Assets/Images/update.png'
import logo from '../../Assets/Images/logout.png'
import { useAuth } from '../../Context/AuthContext'
function SNav() {
  const[e,sete]=useState('')
  const[open,setopen]=useState('')
  const nav=useNavigate()
  const {logout}=useAuth()

  async function handlelogout(e)
  {
    e.preventDefault()
    try
    {
      await logout();
      nav('/login')
    }
    catch(e)
    {
      sete('Unable to logout')
      setopen(true)
      console.log('yo')
    }
  }

  return (
      <Container fluid style={{height:'15vh',minWidth:'400px',position:'fixed',zIndex:'10',backgroundImage: 'linear-gradient(331deg, rgb(247 231 231), rgb(255, 255, 255))'}}> 

            <Row className='h-100'   style={{border:'1px solid  '}}>
                
                  
                <Col className='h-100' lg={{offset:4,span:8}} md={{offset:2,span:10}}   sm={{offset:0,span:12}}  style={{position:'relative'}}>
                                        
                                        <Link to='/update'>
                                            <img style={styles.update} src={update} alt='update'/>
                                        </Link>

                                        <Link to=''>
                                            <img  style={styles.logout} src={logo} onClick={handlelogout} alt='logout'/>
                                          </Link>
                                    {open && <Alert variant='danger' onClose={()=>setopen(false)} dismissible>{e}</Alert>}
                      </Col> 
                  
            </Row>

    </Container>
  )
}
const styles={
  cart:{
    height:'40%',
    position:'absolute',
    top:'15%',
    right:'50%',
    
  },
  update:{
    height:'50%',
    position:'absolute',
    top:'12%',
    right:'27%',
 
  },
  logout:{
    height:'40%',
    position:'absolute',
    top:'15%',
    right:'5%',
    

  },
  cartcount:{
    position:'absolute',
    left:'50%',
    top:'5%'
  }

}

export default SNav