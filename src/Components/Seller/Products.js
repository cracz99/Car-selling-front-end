// import React, { useEffect,useState } from 'react'
// import {collection,getDocs, onSnapshot} from 'firebase/firestore'
// import {db} from '../../firebase'
// import {useAuth} from '../../Context/AuthContext'
// import Product from './Product'



// function Products() {
//     const [items,setitems]=useState([])
//     const {currentUser}=useAuth();
//     useEffect(()=>{


//         // (async()=>{

//         //     const cars=collection(db,'Carbycompany',currentUser.email,'carslist');
        
//         //     const querySnapshot = await getDocs(cars);
//         //     querySnapshot.docs.forEach((doc)=>{
//         //         const data=doc.data()  
//         //           setitems((items)=>{
//         //                 items.push(data)
//         //                 return [...items]  
//         //           })
//         //         })
//         // //   console.log(items)
//         // })();
//         // getfromcar();  
        
//        const cars= collection(db,'Carbycompany',currentUser.email,'carslist')
//         // const query= getDocs(cars).then((data)=>{
//         //     const pro=data.docs.map((doc)=>{
//         //         console.log(doc.data())
//         //             const data=doc.data();
//         //             data['id']=doc.id;
//         //             return data;
//         //     })
//         //     console.log(pro)
//         //     setitems(pro)
//         // })

//         onSnapshot(cars,(qsnap)=>{
//             const pro=qsnap.docs.map((doc)=>
//             {
//                 console.log(doc.data())
//                 const data=doc.data();
//                 data['id']=doc.id
//                 return data;
//             })
//             setitems(pro);
//         })
       
//         // setitems(query)
        
//     },[])
   
//     console.log(items)
   
//    return(
//     items.map((item)=>{
//             console.log(item.id)
//         return (
//             <>
//             {/* <Product key={item.id} props={item}/> */}
//             {/* <h1 key={item.id}>{item.type}</h1> */}
//             </>
//             )    
        
//     }
//     )) 
 
// }

// export default Products



import React, { useEffect,useState } from 'react'
import {collection,getDocs, onSnapshot} from 'firebase/firestore'
import {db} from '../../firebase'
import {useAuth} from '../../Context/AuthContext'
import Product from './Product'

function Products() {
    const [items,setitems]=useState([])
    const {currentUser}=useAuth();
    useEffect(()=>{
        const cars= collection(db,'Carbycompany',currentUser.email,'carslist')
        onSnapshot(cars,(qsnap)=>{
                        const pro=qsnap.docs.map((doc)=>
                        {
                            console.log(doc.data())
                            const data=doc.data();
                            data['id']=doc.id
                            return data;
                        })
                        setitems(pro);
                    })
        console.log(cars)
    },[])
    // console.log(items)
    
    return (
      
        items.map((item)=>{
                        console.log(item.id)
                    return (
                        <>
                        <Product key={item.id} props={item}/>
                        {/* <h1 key={item.id}>{item.type}</h1> */}
                        </>
                        )    
                    
                }
                )) 
  
}

export default Products