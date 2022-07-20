import React,{useEffect, useState} from 'react'
import { Container,Row } from 'react-bootstrap'
import {collection, onSnapshot, query,getDocs,where} from 'firebase/firestore'
import {db} from '../../firebase'
import {Form,Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loaditems ,updateitemlist} from '../../redux/cart'

function Hamburger() {
  const [pro,setpro]=useState([])
  useEffect(()=>{
   
    onSnapshot(collection(db,'companies'),(qsnap)=>{
          let  pro=[]
          qsnap.docs.forEach((doc,index)=>{
            let data=doc.data();
            data['id']=index+1
            pro.push(data);
          })
        //  console.log(pro)
        setpro(pro)
        })
      
  },[])

    const [ham,setHamburger]=useState(true)
    const [own,setown]=useState([])
    const di=useDispatch()
    const togglehamburger=()=>{
      setHamburger(!ham)
      console.log(ham)
    }


    useEffect(()=>{
      
    })
    function handleRe(e)
    { 
      
      
          di(loaditems())
       
        
    }  
    function handleSub(e)
    { 
      
        e.preventDefault()
        var length=e.target.length
        var co=false;

        for(var i=0;i<length;i++)
        {
          if(e.target[i].checked==true)
          {
            console.log(i)
              co=true;   
              break;    
          }
          
        }
        if(co==false)
        {
          di(loaditems())
         
        }
        else
        {    
          console.log('hi')
          let x=[]
          for(let i=0;i<length;i++)
        {
          
          if(e.target[i].checked==true)
          {  
             console.log(e.target[i]['value']) 
              x.push(e.target[i]['value'])
          }

        }
        
   console.log(x)
    
   let n_l=[]
   x.map(async(cname)=>{
    const q = query(collection(db, "Cars"), where("company", "==", cname));
    const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
    n_l=[...n_l,doc.data()]
    });
    console.log(n_l)

    di(updateitemlist(n_l))

  }
   
   
   )
  
   
   
        
        }  

      // console.log(own)
      // // console.log(pro)
      // pro.map((value)=>{
      //   console.log(value)
      // })
        




    }
  return (
    <>
        <div className='hamburger' onClick={togglehamburger} style={{position:'fixed'}} >

            <div className='burger burger1'></div>
            <div className='burger burger2'></div>
            <div className='burger burger3'></div>
        </div>
        <div>
        <Container  id={ham?'y':'n'} style={{alignItems:'center',width:'23vw',marginLeft:0,minHeight:'80vh',position:'fixed',border:'1px solid black',top:'15%',backgroundImage:'linear-gradient(331deg, rgb(247 231 231), rgb(255, 255, 255))'}} >
         <Row style={{position:'absolute',top:'35%',left:'15%'}}>

         <Form onSubmit={handleSub} onReset={handleRe}>
         <Form.Label>Select a company name</Form.Label> 
           {pro.map((value)=>(
             
             <Form.Group className="mb-3" controlId="education">
             
             <div>
                  <Form.Check
                  inline
                  label={value['comp']}
                  name="ho"
                  type='checkbox'
                  value={value['comp']}
                  

                  id={`1`}
                />  
                
              </div>             
 </Form.Group>
           ))}
         
                    <Button type='submit' style={{margin:'1%'}}>Apply</Button>
                    <Button type='reset' >Reset</Button>
          </Form>
            
             
         </Row>
   </Container>
   </div>
    </>
  )
}

export default Hamburger