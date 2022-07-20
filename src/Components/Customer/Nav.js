import React,{useState} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
// import cart from '../../redux/cart'
import {Link, useNavigate} from 'react-router-dom';
// import Side from './Side';
import update from '../../Assets/Images/update.png'
import logou from '../../Assets/Images/logout.png'
import { useAuth } from '../../Context/AuthContext';
import { Alert } from 'react-bootstrap';
function Nav() {
    const {cartcount}=useSelector((state)=>state.cart);
    const {logout}=useAuth();
    const[e,sete]=useState('')
    const nav=useNavigate()
    const[open,setopen]=useState(false)
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
              
                {/* <Link to='/cart'>
                  <img  style={styles.cart} src='https://cdn-icons.flaticon.com/png/512/2838/premium/2838838.png?token=exp=1652125481~hmac=21279028d13cb4409ed981a954c4785e' alt='cart'/>
                  <p style={styles.cartcount}>{cartcount}</p>
                   */}
                  <Link to='/update'>
                  <img style={styles.update} src={update} alt='update'/>
                  </Link>

                  <Link to='/logout'>
                  <img  style={styles.logout} src={logou} onClick={handlelogout} alt='logout'/>
                  </Link>
              </Col> 
              {open && <Alert variant='danger' onClose={()=>setopen(false)} dismissible>{e}</Alert>}
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

export default Nav