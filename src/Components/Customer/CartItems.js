// import React, { useEffect } from 'react'
// import CartItem  from './CartItem'  
// import {useDispatch, useSelector} from 'react-redux'
// import {loaditems,updateitemlist} from '../../redux/cart'
// import { collection, onSnapshot } from 'firebase/firestore'
// import {db} from '../../firebase'
  

// function CartItems() {
//   const di=useDispatch()
//   useEffect(()=>{
//       di(loaditems())
//   },[])

// useEffect(()=>{
//   onSnapshot(collection(db,'Cars'),(qsnap)=>{
//     let  pro=[]
//     qsnap.docs.forEach((doc,index)=>{
//       let data=doc.data();
//       data['id']=index+1
//       pro.push(data);
//     })
//     di(
//       updateitemlist(pro))
//   })
// },[])  

//   const {items}=useSelector((state)=>state.cart);
  
//   console.log(items)
  

    

//   return(
//     <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'400px',position:'absolute',top:'15%',width:'100%'}}>
//        {items.map((item)=>{

//           return <CartItem props={item}/>

//                 })}
//     </div>
   
//   )
 
 
// }

// export default CartItems

import React, { useEffect } from 'react'
import CartItem  from './CartItem'  
import {useDispatch, useSelector} from 'react-redux'
import {loaditems,updateitemlist} from '../../redux/cart'
import { collection, onSnapshot } from 'firebase/firestore'
import {db} from '../../firebase'

function CartItems() {
    const di=useDispatch()
  useEffect(()=>{
      di(loaditems())
  },[])

// useEffect(()=>{
//   onSnapshot(collection(db,'Cars'),(qsnap)=>{
//     let  pro=[]
//     qsnap.docs.forEach((doc,index)=>{
//       let data=doc.data();
//       data['id']=index+1
//       pro.push(data);
//     })
//     di(
//       updateitemlist(pro))
//   })
// },[])  

  const {items}=useSelector((state)=>state.cart);

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'400px',position:'absolute',top:'15%',width:'100%'}}>
        {items.map((item)=>{

           return <CartItem props={item}/>
              // console.log(item)
                 })}
     </div>
  )
}

export default CartItems