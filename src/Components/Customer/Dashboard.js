import React, { useEffect,useState } from 'react'
import Nav from './Nav'
import Side from './Side'
import CartItems from './CartItems'
// import { Container,Row } from 'react-bootstrap'
import {useAuth} from '../../Context/AuthContext'
import { getDoc,doc } from 'firebase/firestore'
import {db} from '../../firebase'
import SDashboard from '../Seller/SDashboard'


function Dashboard() {
  const {currentUser}=useAuth();
  const[seller,sets]=useState('');
  useEffect(()=>{
     const fetc=(async()=>{
      const docRef=doc(db,'users',currentUser.email);
      const docSnap=await getDoc(docRef);
      if(docSnap.exists())
      {
        const data=docSnap.data();
         
        if(data.type==='seller')
          sets('t')
        else
          sets('f')
      }
    
    })


    fetc();
    console.log(seller)

  },[seller,currentUser])


if(seller==='') 
   return(<div> Loading.....</div>) 
else if(seller=='t')
    return (
      <SDashboard/>
    )
else if(seller=='f')
{
  return (
    <>

     <Nav/>
     <Side/>
     <CartItems/>
     </>
     
    
    // <h1>hello</h1>
  )
}
 
}

export default Dashboard