import React, { useEffect ,useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import {doc,onSnapshot} from 'firebase/firestore'
import {db} from '../../firebase'
import SNav from './SNav';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {Card,Button,Modal,Alert} from 'react-bootstrap'

function ViewItem() {
    const ur=window.location.toString();
    const a=ur.split('/')
    const id=a[4]
    const {currentUser}=useAuth();
    const[item,setitem]=useState()
    const[torque,setTorque]=useState(false);
    const[loading,setloading]=useState(true);
    const [undef,setundef]=useState(false);
    const [show,setShow]=useState(false);
    const nav=useNavigate()
    useEffect(()=>{
     async  function getdb()
      {
        const cars= doc(db,'Carbycompany',currentUser.email,'carslist',id)
        

        await onSnapshot(cars,(qsnap)=>{
          const d=qsnap.data()
          if(d==null)
          {
            setundef(true)
          }
            
            // const pro=qsnap.docs.map((doc)=>
            // {
            //     console.log(doc.data())
            //     const data=doc.data();
            //     data['id']=doc.id
            //     return data;
            // })
            // setitem(pro);
            setitem(d)
            setloading(false)
        })
      }
      getdb();
     
    },[])

    if(loading)
    {
      return(<div>Loading...........</div>)
    }
    else if(undef)
    {
      return(
        <Alert variant="danger" onClose={()=>nav('/dashboard')} dismissible>
        <Alert.Heading>The Item you're trying to access doesn't exist!</Alert.Heading>
     
      </Alert>
      )
    }
    else{
      return (
        <div>
            <SNav/>
            
              <Card  bg={'light'} text={'dark'} className="text-center">
                      {/* <Card.Header></Card.Header> */}
                      <Card.Body>
                        <Card.Title>{item.carname}</Card.Title>
    
                        <Card.Text>
                          <img src='https://cdn-icons.flaticon.com/png/512/471/premium/471662.png?token=exp=1651412667~hmac=52940d5b8e60c24051de4bf8644b669d' style={styles.info} onClick={()=>setTorque(true)}/>
                          Torque
                        <Card.Img src={'https://cdn-icons-png.flaticon.com/512/3079/3079165.png'} alt='Torque' style={styles.zts}/>
                        
                          {item.torque}

                          <Modal show={torque} onHide={()=>setTorque(false)} centered> 
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Torque
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
        <p>
        In simple terms, the definition of torque is the engine's rotational force. It differs from horsepower as it refers to the amount of work an engine can exert, while horsepower defines how quickly that work can be delivered. It’s why torque is often referred to in layman’s terms as ‘pulling power’, ‘oomph’, or ‘grunt’. 
        </p>
        <p>Torque is usually measured in Newton metres (Nm)</p>
      </Modal.Body>
     
    </Modal>

                        </Card.Text>
                      <Card.Text>
                      Type
                          <Card.Img src={'https://cdn-icons.flaticon.com/png/512/2175/premium/2175407.png?token=exp=1651410797~hmac=9300301d2cd1e239e9f77261a33744d2'} alt='Type' style={styles.zts}/>
                        
                        {item.type}
                      </Card.Text>
                      
                        <Card.Text>
                          TopSpeed
                          <Card.Img src={'https://cdn-icons.flaticon.com/png/512/2612/premium/2612924.png?token=exp=1651409287~hmac=20e3bb25f01d3cf4d444373addd983a5'} alt='topspeed' style={styles.img}/>
                           {item.topspeed}
                        </Card.Text>


                        <Card.Text>
                          Zero-To-Sixty(0-60)
                          <Card.Img src={'https://cdn-icons.flaticon.com/png/512/3240/premium/3240637.png?token=exp=1651410039~hmac=d9ad23e374dd908851b3df64acdac72a'} alt='topspeed' style={styles.zts}/>
                          {item.zts}
                        </Card.Text>


                        <Card.Text>
                          Mileage/Range
                          <Card.Img src={'https://cdn-icons-png.flaticon.com/512/483/483497.png'} alt='topspeed' style={styles.zts}/>
                          {item.mileage}
                        </Card.Text>

                        <Card.Text>
                          Exterior Color
                        <Card.Img src={'https://cdn-icons-png.flaticon.com/512/4905/4905617.png'} alt='topspeed' style={styles.zts}/>
                          
                          {item.exteriorcol}
                        </Card.Text>

                        <Card.Text>
                          Interior Color
                          <Card.Img src={'https://cdn-icons-png.flaticon.com/512/1023/1023409.png'} alt='topspeed' style={styles.zts}/>
                        
                        {item.interiorcol}


                        </Card.Text>
                        
                      
    
                        <Card.Text>
                          {item.description}
                        </Card.Text>
                       
                        <Link to='/dashboard'>
                        <Button variant="primary" >  Back</Button>
                        </Link>
                      </Card.Body>
                      {/* <Card.Footer className="text-muted"> */}
                        {/* <Link to='/dashboard'>Back </Link> */}
                        {/* </Card.Footer> */}
                </Card>
         </div>
      )
    }
  
}
const styles={
  img:{
    height:'70px',
    width:'70px',
    margin:'2% 2% 2% 2%'
  },
  zts:{
    height:'50px',
    width:'50px',
    margin:'2% 2% 2% 2%'
  },
  info:{
    height:'30px',
    width:'30px',
    margin:'2%'
  }
}

export default ViewItem