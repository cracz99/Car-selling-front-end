// import { deleteDoc,doc,collection } from 'firebase/firestore'
// import {db} from '../../firebase'
// import { useAuth } from '../../Context/AuthContext'
// import React from 'react'
// import {Link} from 'react-router-dom'
// import {getitems} from '../../redux/cart'
// import { useDispatch } from 'react-redux'

// function Product(props) {
//     console.log(props)
//    const {currentUser}=useAuth();
//    const dispatch=useDispatch()
//     const handledelete=async (e)=>{
//         const cref= collection(db,'Carbycompany',currentUser.email,'carslist')
//         const dref=doc(cref,e.target.id)
//         console.log(e.target.id)
//          deleteDoc(dref).then(async()=>{
//           await deleteDoc(doc(collection(db,'Cars'),e.target.id) )
//          })

//         dispatch(getitems())
//     }
//   return (
   
//       <div style={styles.cartitem} key={props.props.id}>
//     <div style={styles.leftblock}>
//         <img style={styles.image} alt='this is blank ' src='https://images.unsplash.com/photo-1612468008274-9445bd56161e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGNhcnxlbnwwfHwwfHw%3D&w=1000&q=80'/>
//     </div>
//     <div style={styles.rightblock}>
//         <div style={styles.title}>Name:{props.props.carname}</div>
//         <div style={styles.title}>Type:{props.props.type}</div>
//         <div style={styles.title}>Price:{props.props.price}</div>
//         <div style={styles.actions}>
//                         {/*buttons */}

//                         <Link to={`/sell/${props.props.id}`}>
//                         <img style={styles.action_icons} src='https://cdn-icons.flaticon.com/png/512/2874/premium/2874802.png?token=exp=1651302805~hmac=ff039b3d65c79e9ff8aaa7e97dc84ccf' alt='view'/>
//                         </Link>

//                         <img id={props.props.id} style={styles.action_icons }src='https://cdn-icons.flaticon.com/png/512/3102/premium/3102186.png?token=exp=1651266383~hmac=d65d7cb7b0b77b4888dd21c90cb8b503' alt='delete' onClick={handledelete}/>
//         </div>  
//     </div>

    
// </div>
 
    
//   )
// }
// const styles={
//     image:{
//         padding:'1%',
//         height:'100%',
//         width:'100%',
//         borderRadius:4,
//         background:'grey',
//         minWidth:'200px',
//     },
//     title:{
//         fontSize:22,
//         color:'black',
//         display:'inline-block'
//     },
//     actions:
//     {
//       margin:'5%',
//       display:'flex',
//       padding:'1%'
//     },
//     action_icons:{display:'block',height:'2rem',position:'relative',left:'-3%',margin:'5%'},
// cartitem:{
//     display:"inline-flex",
//     border:"1px solid black",
//     margin:"3% 0% 3% 3%",
//     width: "35%",
//     minWidth:'400px'
//   }
//   ,
//   leftblock:{
//     /* background-color: aliceblue; */
//     margin:"3%",
//   }
  
//   ,rightblock:{
//     display: "inline-block",
//    margin:"7% 0% 0% 0%",
//     padding:"5%"
//   }
  
// }

// export default Product

import React from 'react'
import {Link} from 'react-router-dom'
import { deleteDoc,doc,collection } from 'firebase/firestore'
import {db} from '../../firebase'
import { useAuth } from '../../Context/AuthContext'
import {getitems} from '../../redux/cart'
import { useDispatch } from 'react-redux'
import del from '../../Assets/Images/delete.png'
import view from '../../Assets/Images/view.png'


function Product(props) {
  const {currentUser}=useAuth();
     const dispatch=useDispatch()
      const handledelete=async (e)=>{
          const cref= collection(db,'Carbycompany',currentUser.email,'carslist')
          const dref=doc(cref,e.target.id)
          console.log(e.target.id)
           deleteDoc(dref).then(async()=>{
            await deleteDoc(doc(collection(db,'Cars'),e.target.id) )
           })
  
          dispatch(getitems())
          console.log(props.props)
      }

    return (
      
            <div style={styles.cartitem} key={props.props.id}>
          <div style={styles.leftblock}>
              <img style={styles.image} alt='this is blank ' src={props?.props?.u?.[0]}/>
          </div>
          <div style={styles.rightblock}>
              <div style={styles.title}>Name:{props.props.carname}</div>
              <div style={styles.title}>Type:{props.props.type}</div>
              <div style={styles.title}>Price:{props.props.price}</div>
              <div style={styles.actions}>
                              {/*buttons */}
      
                              <Link to={`/sell/${props.props.id}`}>
                              <img style={styles.action_icons} src={view} alt='view'/>
                              </Link>

                              <Link to=''>
                              <img id={props.props.id} style={styles.action_icons }src={del} alt='delete' onClick={handledelete}/>
                              </Link>
              </div>  
          </div>
      
          
      </div>
       
          
        )
  
}
const styles={
    image:{
        padding:'1%',
        height:'100%',
        width:'100%',
        borderRadius:4,
        background:'grey',
        minWidth:'200px',
    },
    title:{
        fontSize:22,
        color:'black',
        display:'inline-block'
    },
    actions:
    {
      margin:'5%',
      display:'flex',
      padding:'1%'
    },
    action_icons:{display:'block',height:'2rem',position:'relative',left:'-3%',margin:'5%'},
cartitem:{
    display:"inline-flex",
    border:"1px solid black",
    margin:"3% 0% 3% 3%",
    width: "35%",
    minWidth:'400px'
  }
  ,
  leftblock:{
    /* background-color: aliceblue; */
    margin:"3%",
  }
  
  ,rightblock:{
    display: "inline-block",
   margin:"7% 0% 0% 0%",
    padding:"5%"
  }
  
}
export default Product