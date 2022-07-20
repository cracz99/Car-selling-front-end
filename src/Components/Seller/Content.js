import React,{useState,useRef} from 'react'
import {Button,Modal,Form} from 'react-bootstrap'
import {useAuth} from '../../Context/AuthContext'
import {db} from '../../firebase'
import {setDoc,getDoc,doc,addDoc,collection,query,where,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
import Products from './Products'
import { useDispatch } from 'react-redux'
import {getitems} from '../../redux/cart';
import { getStorage, ref ,uploadBytes,getDownloadURL} from "firebase/storage";
import {storage} from '../../firebase'

function Content() {
    var companyname=''
    const carname=useRef()
    const description=useRef()
    const [type,sett]=useState('')
    const topspeed=useRef()
    const zts=useRef()
    const mileage=useRef()
    const torque=useRef()
    const exteriorcol=useRef()
    const interiorcol=useRef()
    const price=useRef()
    const cari=useRef()
    const dis=useDispatch()


    const checkdb=async(mail)=>{
        const docRef=doc(db,'users',currentUser.email);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists())
        {
          const data=docSnap.data();
          // console.log(data)
           companyname= data.company 
        }
    }

    const fileu=(e)=>
    {
        console.log(e.target.files[0])
        console.log(storage)
        const file=e.target.files[0]
        
        const mountainsRef = ref(storage, `${currentUser.email}/${file.name}` );
        
        uploadBytes(mountainsRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!',snapshot);
          }).then(()=>{
            getDownloadURL(ref(storage, `${currentUser.email}/${file.name}`)).then(async(url)=>{
                const name=file.name.slice(0,file.name.indexOf('.'))
                const cref=collection(db,'Cars')
                const pref=doc(cref,name);

                const cref1=collection(db,'Carbycompany',currentUser.email,'carslist')
                const pref1=doc(cref1,name);

                const docSnap= await getDoc(pref);
                const docSnap1= await getDoc(pref1);

              if (docSnap.exists() && docSnap1.exists()) {
                  console.log('hi')
                await updateDoc(pref,{
                    u:arrayUnion(url)
                });
                await updateDoc(pref1,{
                    u:arrayUnion(url)
                });
              }
              else
              {
                  console.log('yee!')
                await  setDoc(pref,{
                  u:''
                }).then(async()=>{
                    await  setDoc(pref1,{
                        u:''
                      })
                  
                }).then(async()=>{
                    await updateDoc(pref,{
                        u:arrayUnion(url)
                    })
                }).then(async()=>{
                    await updateDoc(pref1,{
                        u:arrayUnion(url)
                    })
                })
              
              


            
              }
            })
          })
        
    
    }
    const submitHandler=async(e)=>{
        setshow(false)
        e.preventDefault();

        
        
        console.log(carname.current.value, description.current.value,type, topspeed.current.value, zts.current.value, mileage.current.value, torque.current.value, exteriorcol.current.value, interiorcol.current.value, price.current.value, companyname)
        const data={
            carname:carname.current.value,
            description:description.current.value,
            type:type,
            topspeed:topspeed.current.value,
            zts:zts.current.value,
            mileage:mileage.current.value,
            torque:torque.current.value,
            exteriorcol:exteriorcol.current.value,
            interiorcol:interiorcol.current.value,
            price:price.current.value,
            company:companyname

        }
        const cref=collection(db,'Carbycompany',currentUser.email,'carslist')
        const cna=carname.current.value
        const data2=data;
        const dref=doc(cref,carname.current.value)
        updateDoc(dref,data).then(async(data)=>{
            console.log(cna)    
            const cref1=doc(db,'Cars',cna);
             await updateDoc(cref1,data2);
             
        })
        
       





        const cars=collection(db,'companies');
        const cn=companyname
        const d={
            "comp":cn
        }
        const dref1=doc(cars,cn)
        setDoc(dref1,d).then(async(data)=>{
            console.log('done!')
             
        })
         


        
    }
    const[modashow,setshow]=useState(false);
    const {currentUser}=useAuth();
    // console.log(currentUser)
    checkdb(currentUser.email)


  return (
    <div style={{position:'absolute',top:'15%'}} >
        <div style={{position:'relative'}}>
                <Button style={styles.button} onClick ={()=>setshow(true)} variant="dark">Add Car</Button>
        </div>
        

            <Modal show ={modashow} onHide={()=>setshow(false)}  centered>
                                <Modal.Header closeButton>
                                        <Modal.Title>Fill the details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group className="mb-3" controlId="CarName">
                                                    <Form.Label>Car Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="CarName"
                                                        ref={carname}
                                                        autoFocus
                                                        required
                                                    />
                                                    </Form.Group>


                                                    <Form.Group
                                                    className="mb-3"
                                                    controlId="Description"
                                                    >
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control placeholder="Highlights..." as="textarea" rows={3} ref={description} required/>
                                                    </Form.Group>

                                                    
                                                        <Form.Group>
                                                        <Form.Check inline label="Electric" name="type" value="Electric" type={'radio'} id={`inline-${'radio'}-1`} onClick={(e)=>sett(e.currentTarget.value)} />

                                                        <Form.Check inline label="Diesel" name="type" value="Diesel" type={'radio'} id={`inline-${'radio'}-2`}
                                                        onClick={(e)=>sett(e.currentTarget.value)}
                                                        />

                                                        <Form.Check inline label="Petrol" name="type" value="Petrol" type={'radio'} id={`inline-${'radio'}-3`}
                                                        
                                                        onClick={(e)=>sett(e.currentTarget.value)}
                                                        />
                                                        </Form.Group>
                                                  
                                                    
                                                        <Form.Group className="mb-3" controlId="Price">
                                                            <Form.Label>Top Speed</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Top Speed(in kmph)"
                                                                ref={topspeed}
                                                                required />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="0-60">
                                                            <Form.Label>0-60</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="0-60 kmph in sec"
                                                                ref={zts} required
                                                            />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="Mileage/Range">
                                                            <Form.Label>Mileage/Range</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Mileage/Range in km"
                                                                ref={mileage} required
                                                            />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="Maximum Torque">
                                                            <Form.Label>Maximum Torque</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Maximum Torque in N-m"
                                                                ref={torque} required
                                                            />
                                                    </Form.Group>


                                                    <Form.Group className="mb-3" controlId="Price">
                                                            <Form.Label>Exterior Color</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Exterior Color"
                                                                ref={exteriorcol} required
                                                            />
                                                    </Form.Group>


                                                    <Form.Group className="mb-3" controlId="Interior Color">
                                                            <Form.Label>Interior Color</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Interior Color"
                                                                ref={interiorcol} required
                                                            />  
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="Price">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Price in rupees(use commas)"
                                                        ref={price} required
                                                    />
                                                    </Form.Group>



                                                    <Form.Group className="mb-3" controlId="car image">
                                                    <Form.Label>Car Image</Form.Label>
                                                    <p></p>
                                                    <Form.Control
                                                        type="file"
                                                        placeholder="Upload car image"
                                                        ref={cari} 
                                                        onChange={fileu}
                                                        required
                                                    />
                                                     <Form.Text className="text-muted">
                                                     please make sure you upload as carname.format there should be no spaces in between
                                                            </Form.Text>
                                                    </Form.Group>

                                                    <Button type='submit' >Submit</Button>
                                                </Form>
                                </Modal.Body>


                                <Modal.Footer>
                                    
                                    <Button onClick={()=>setshow(false)}>Close</Button>
                                </Modal.Footer>
            </Modal>


        <div>
     
                <Products/>
        </div>

    </div>
  )
}
const styles={
    button:{
        
        left:'14%',
        top:'7em',
        margin:'2%'
    }
}
export default Content