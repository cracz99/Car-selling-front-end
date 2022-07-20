import React, { useEffect ,useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import {doc,onSnapshot} from 'firebase/firestore'
import {db} from '../../firebase'
import Nav from './Nav';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {Card,Button,Modal,Alert} from 'react-bootstrap'
import i from '../../Assets/Images/i.png'
import electric from '../../Assets/Images/electric.png'
import top from '../../Assets/Images/zts.png'
import timer from '../../Assets/Images/timer.png'
import spray from '../../Assets/Images/spray.png'
import fuel from '../../Assets/Images/fuel.png'
import int from '../../Assets/Images/int.png'
function Viewprod() {
    const ur=window.location.toString();
    const a=ur.split('/')
    const id=a[4]
    const {currentUser}=useAuth();
    const[item,setitem]=useState()
    const[torque,setTorque]=useState(false);
    const[type,setType]=useState(false);
    const[topspeed,settopspeed]=useState(false);
    const[zts,setzts]=useState(false);
    const[mileage,setmileage]=useState(false);
    const[exterior,setexterior]=useState(false);
    const[interior,setinterior]=useState(false);


    const[loading,setloading]=useState(true);
    const [undef,setundef]=useState(false);
    const [show,setShow]=useState(false);
    const nav=useNavigate()
    useEffect(()=>{
     async  function getdb()
      {
        const cars= doc(db,'Cars',id)
        

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
          
            <Nav/>
            
              <Card  bg={'light'} text={'dark'} className="text-center" style={{position:'absolute',top:'15%',width:'100%'}}>
                      {/* <Card.Header></Card.Header> */}
                      
                      <Card.Body>
                        <Card.Title>{item.carname}</Card.Title>
    
                        <Card.Text>
                          <img src={i} style={styles.info} onClick={()=>setTorque(true)}/>
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
                      <img src={i} style={styles.info} onClick={()=>setType(true)}/>
                      Type
                          <Card.Img src={electric} alt='Type' style={styles.zts}/>
                        
                        {item.type}
                        <Modal show={type} onHide={()=>setType(false)} centered> 
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    Type 
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                  <p>
                                  Whether the car runs on gas or is electric
                                  </p>
                            
                                </Modal.Body>
                              
                              </Modal>
                      </Card.Text>
                      
                        <Card.Text>
                        <img src={i} style={styles.info} onClick={()=>settopspeed(true)}/>
                          TopSpeed
                          <Card.Img src={top} alt='topspeed' style={styles.zts}/>
                           {item.topspeed}
                           <Modal show={topspeed} onHide={()=>settopspeed(false)} centered> 
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    TopSpeed 
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                  <p>
                                  the fastest speed a vehicle can move at
                                  </p>
                            
                                </Modal.Body>
                              
                              </Modal>

                        </Card.Text>


                        <Card.Text>
                        <img src={i} style={styles.info} onClick={()=>setzts(true)}/>
                          Zero-To-Sixty(0-60)
                          <Card.Img src={timer} alt='topspeed' style={styles.zts}/>
                          {item.zts}
                          <Modal show={zts} onHide={()=>setzts(false)} centered> 
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                  Zero-To-Sixty(0-60)
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                  <p>
                                  The time it takes a vehicle to accelerate from 0 to 60 miles per hour
                                  </p>
                            
                                </Modal.Body>
                              
                              </Modal>
                        </Card.Text>


                        <Card.Text>
                        <img src={i} style={styles.info} onClick={()=>setmileage(true)}/>
                          Mileage/Range
                          <Card.Img src={fuel} alt='topspeed' style={styles.zts}/>
                          {item.mileage}
                          <Modal show={mileage} onHide={()=>setmileage(false)} centered> 
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                   Mileage
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                  <p>
                                  The mileage of a vehicle is the number of miles that it can travel using one gallon or litre of fuel.
                                  </p>
                            
                                </Modal.Body>
                              
                              </Modal>
                        </Card.Text>

                        <Card.Text>
                        <img src={i} style={styles.info} onClick={()=>setexterior(true)}/>
                          Exterior Color
                        <Card.Img src={spray} alt='topspeed' style={styles.zts}/>
                          
                          {item.exteriorcol}
                          <Modal show={exterior} onHide={()=>setexterior(false)} centered> 
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    Exterior Color
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                  <p>
                                  It describes the Exterior color of the car!
                                  </p>
                            
                                </Modal.Body>
                              
                              </Modal>
                        </Card.Text>

                        <Card.Text>
                        <img src={i} style={styles.info} onClick={()=>setinterior(true)}/>
                          Interior Color
                          <Card.Img src={int} alt='topspeed' style={styles.zts}/>
                        
                        {item.interiorcol}
                        <Modal show={interior} onHide={()=>setinterior(false)} centered> 
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    Interior
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                  <p>
                                  It describes the interior color of the car!
                                  </p>
                            
                                </Modal.Body>
                              
                        </Modal>

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

export default Viewprod