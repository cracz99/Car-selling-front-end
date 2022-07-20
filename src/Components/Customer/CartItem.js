
import { deleteDoc,doc,collection, setDoc } from 'firebase/firestore'
import {db} from '../../firebase'
import { useAuth } from '../../Context/AuthContext'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {addtocart,deletefromcart} from '../../redux/cart'
import {Link} from 'react-router-dom'
import {Modal,Button, Alert,Form} from 'react-bootstrap'
import view from '../../Assets/Images/view.png'
import buy from '../../Assets/Images/buy.png'


function CartItem(props) {

  const {currentUser}=useAuth();
  
  const [modal,setmode]=useState(false)
  const[a,seta]=useState(false)
  const[loan,setloan]=useState(false)
  const[lsuccess,setlsuccess]=useState(false)
  const[lfailure,setlfailure]=useState(false)
  const[lmsg,setlmsg]=useState('')

  const[name,setname]=useState('')
  const[mari,setmar]=useState('')
  const[gender,setgender]=useState('')
  const[income,setincome]=useState('')
  const[dob,setdob]=useState('')
  const[edu,setedu]=useState('')
  const[own,setown]=useState('')
  const[loc,setloc]=useState('')
  const[existloan,setexistloan]=useState('')
  const[dependents,setdep]=useState('')
  const[loanamt,setloanamt]=useState('')
  const[repayment,setrepayment]=useState('')
  
  const[err,seterr]=useState('')
  const[erra,seterra]=useState(false)
  


  const[creditScore,setcreditScore]=useState('')
  const[maxLoanAmountEligible,setmaxLoanAmountEligible]=useState('')
  const[loanInterest,setloanInterest]=useState('')
  const[totalLoanToBeRepaid,settotalLoanToBeRepaid]=useState('')

async function loanhandler()
{
 
  await setDoc(doc(db,'Loans',currentUser.email),{
    "Credit Score":creditScore,
    "Loan Interest":loanInterest,
    "Total Loan ToBeRepaid":totalLoanToBeRepaid
  }).then(()=>{
    setlsuccess(false)
    seta(true)
  })
}
  async function displayrazorpay(currentUser,props)
  {
    
    console.log(currentUser)
  
    
    const  data=await fetch('http://localhost:2000/razorpay',
    
    {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
       
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify({'item':props.props}) 
    }
    
    
    ).then((t)=>t.json())
  
    console.log(data);
  
  
    const options = {
      "key": "rzp_test_GsENwbkeZCaN7L", 
      "currency":data.currency,
      "amount":data.amount,
      "order_id":data.id,
      "name": "Payment",
      "description": "Thank you for trusting us!!", 
      "handler": async function(response){
          setmode(false)
          seta(true)
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          
          console.log(response)
          const dref=doc(db,'Payments',response.razorpay_payment_id)
          await setDoc(dref,response)
      },
      "prefill": {
  
          "email": currentUser.email
      },
  };
  
  const paymentObject=new window.Razorpay(options)
  paymentObject.open();
  }


  async function submithandler(e)
  {
    e.preventDefault();
    console.log(name,mari,gender,income,dob,edu,own,loc,existloan,dependents,loanamt,repayment)
    const byr=dob.slice(0,dob.indexOf('-'))
    var now = new Date();
    const age=now.getFullYear()-parseInt(byr);
    if(age>18)
    {
      console.log('eligible!')
    
     
      console.log(income,loanamt,existloan,gender,mari,dependents,edu,loc)
      const data={
        ApplicantIncome: [parseFloat(income)],
      CoapplicantIncome: [0],
      LoanAmount: [parseFloat(loanamt)],
      Credit_History: [existloan],
      Gender: [gender],
      Married: [mari],
      Dependents: [parseFloat(dependents)],
      Education: [edu],
      Property_Area: [loc],
      }


      const op= await fetch('http://0.0.0.0:8000/predict_loan_eligibility',
      
      
      {
        method: 'POST',  
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
         
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data)
      }
      ).then((res)=>res.json());

      
       const{success,creditScore,eligiblity}=op;
      

      if (success && creditScore>0.40 ) {
        /**
         * Assumption: a credit score of less than 37% (0.37) Gets your loan rejected
         * Maximum loan awarded to a person is = salary/income * (creditScore-0.25)*20
         * A person of credit score of 100% will get loan of salary*18
         * Interest rate=20% PM
         */
        let loanInterest = 0;
        let awardedLoan = false;
        let totalLoanToBeRepaid = 0;
        const interestRate = 0.2;
        //Round off the negative diff to 0, i.e credit <0.37 Round to nearest 500
        const maxLoanAmountEligible =
          Math.floor(
            (income * Math.max(0, creditScore - 0.37) * 20) / 500
          ) * 500;
  
        if (loanamt < maxLoanAmountEligible) {
          loanInterest = (
            (loanamt * interestRate * repayment) /
            12
          ).toFixed(2);
          totalLoanToBeRepaid = parseFloat(loanamt) + parseFloat(loanInterest);
          awardedLoan = !awardedLoan;
        }
        //  console.log(maxLoanAmountEligible)
        setloan(false)
        setmode(false)
        
        console.log(


          awardedLoan,
          loanamt,
           creditScore,
          maxLoanAmountEligible,
          loanInterest,
          totalLoanToBeRepaid,
        )

        
          setloanamt(loanamt)
        setcreditScore(creditScore)
        setmaxLoanAmountEligible(maxLoanAmountEligible)
        setloanInterest(loanInterest)
        settotalLoanToBeRepaid(totalLoanToBeRepaid)

        setlsuccess(true)
          
      }
      else{
        setloan(false)
        setmode(false)
        
        setlmsg(`
        Thank you, but we can't give you a loan!
        You have a low credit score i.e ${creditScore}
        `)

        setlfailure(true)
      }



    }
    else
    {
      seterra(true)
      seterr('YOU ARE LESS THAN 18, GO PLAY!!')

    }

   

setname('')
setmar('')
 setgender('')
  setincome('')
  setdob('')
  setedu('')
 setown('')
  setloc('')
  setexistloan('')
  setdep('')
  setloanamt('')
  setrepayment('')

  }
  return (
    <>

<Modal centered show={lsuccess} onHide={()=>setlsuccess(false)} >
     <Modal.Header closeButton>
       Success!!!
      </Modal.Header>
      <Modal.Body style={{justifyContent:'center'}}>
      
        
        <p>{`Credit Score:${creditScore}`}</p>
        <p>{`Loan Interest:${loanInterest}`}</p>
        <p>{`Total Loan ToBeRepaid:${totalLoanToBeRepaid}`}</p>
        
              
      </Modal.Body>
      <Modal.Footer>
           <Button onClick={()=>loanhandler()}>Confirm Loan</Button>
            <Button onClick={()=>setlsuccess(false)}>Close</Button>
      </Modal.Footer>
       </Modal>

       <Modal centered show={lfailure} onHide={()=>setlfailure(false)} >
     <Modal.Header closeButton>
       Failure :( !!  
      </Modal.Header>
      <Modal.Body style={{display:'flex',justifyContent:'center'}}>
      
       <p>{lmsg}</p>
        
              
      </Modal.Body>
       </Modal>

     <Modal centered show={a} onHide={()=>seta(false)} >
     <Modal.Header closeButton>
       Confirmation
      </Modal.Header>
      <Modal.Body style={{display:'flex',justifyContent:'center'}}>
              <h4>Thank you, Order placed successfully!</h4>
              
      </Modal.Body>
       </Modal>
    <div style={styles.cartitem} key={props.props.id}>
    <div style={styles.leftblock}>
        <img style={styles.image} alt='this is blank ' src={props?.props?.u?.[0]}/>
    </div>
    <div style={styles.rightblock}>
        <div style={styles.title}>Name:{props.props.carname}</div>
        <div style={styles.title}>Type:{props.props.type}</div>
        <div style={styles.title}>Price:{props.props.price}</div>
        <div style={styles.actions}>
          <Link to={`/buy/${props.props.id}`} style={{margin:'2%'}}>
            <img style={styles.action_icons} src={view} alt='view'/> 
          </Link>
          <img style={styles.action_icons} src={buy}  alt='buy' onClick={()=>setmode(true)}/>



          <Modal size="lg" centered show={modal} onHide={()=>setmode(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How do you want to pay?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display:'flex',justifyContent:'center'}}>
        <Button style={{margin:'2%'} }  onClick={()=>{displayrazorpay(currentUser,props)}}>Card</Button>
        <Button style={{margin:'2%'}}   onClick ={()=>setloan(true)}>Need Loan</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setmode(false)}>Close</Button>
      </Modal.Footer>
    </Modal>




    <Modal size="lg" centered show={loan} onHide={()=>setloan(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Fill in the details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display:'flex',justifyContent:'center'}}>
        
        
        <Form onSubmit={submithandler}>
        <Form.Text className="text-muted">
                                  We'll never share your details with anyone else.
                                </Form.Text>
                        <Form.Group className="mb-3" controlId="full name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={(e)=>setname(e.target.value)} type="text" placeholder="Enter full name" required/>
                                
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="marital status">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Select value={mari} onChange={(e)=>{setmar(e.target.value)}} placeholder='' required>
                                    <option value='' default disabled>Choose </option>
                                    <option value="1">Married</option>
                                    <option value="0">Single</option>
                                   
                                  </Form.Select>
                                
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                                <Form.Label>Gender</Form.Label> 
                                {/* <Form.Select  > */}
                                  {/* <Form.Control as='select' value={''} onChange={(e)=>{setgender(e.target.value)
                                console.log(e.target.value)
                                }} required>  */}
                                <Form.Select  value={gender} onChange={(e)=>{setgender(e.target.value)
                                
                                }} required> 
                                  <option value='' default disabled>Choose </option>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>

                                  </Form.Select>
                                   
                                    {/* <Form.text>we didnt add others as we didnt find data </Form.text> */}
                                  
                                  {/* </Form.Select> */}
                                  <Form.Text className="text-muted">
                                      Sorry, we didn't add 'LGBTQ+', did not find datasets :)
                                </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="income">
                                <Form.Label>Income</Form.Label>
                                <Form.Control value={income} onChange={(e)=>setincome(e.target.value)} type="number" placeholder="Income" required/>
                                
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="dob">
                                <Form.Label>Date of birth</Form.Label>
                                <Form.Control value={dob} onChange={(e)=>setdob(e.target.value)} type="date" placeholder="date of birth" required/>
                                
                    </Form.Group>




                    <Form.Group className="mb-3" controlId="education">
                                <Form.Label>highest level of education</Form.Label> 
                                <Form.Select value={edu} onChange={(e)=>setedu(e.target.value)} placeholder='' required>
                                    <option value='' default disabled>Choose </option>
                                    <option value="1">Post Graduate</option>
                                    <option value="0">Degree</option>
                                    <option value="0">Diploma</option>
                                    <option value="1">Undergraduate</option>
                                    <option value="0">Not Attended School</option>
                                 
                                  
                                  </Form.Select>
                          
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="education">
                                <Form.Label>Home Ownership</Form.Label> 
                                <div>
                                <Form.Check
                                inline
                                label="own"
                                name="ho"
                                type='radio'
                                value='own'
                                onClick={(e)=>setown(e.target.value)}
                                id={`1`}
                              />
                                 <Form.Check
                                inline
                                label="mortgage"
                                name="ho"
                                value='mortgage'
                                onClick={(e)=>setown(e.target.value)}
                                type='radio'
                                id={`2`}
                              />
                                 <Form.Check
                                inline
                                label="rent"
                                name="ho" 
                                value='rent'
                                onClick={(e)=>setown(e.target.value)}
                                type='radio'
                                id={`3`}
                              />
                                     </div>             
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="education">
                                <Form.Label>Residential Location</Form.Label> 
                                <div>
                                <Form.Check
                                inline
                                label="Rural"
                                value="0"
                                name="rl"
                                type='radio'
                                onClick={(e)=>setloc(e.target.value)}
                                id={`1`}
                              />
                                 <Form.Check
                                inline
                                label="Urban"
                                name="rl"
                                value='1'
                                type='radio'
                                onClick={(e)=>setloc(e.target.value)}
                                id={`2`}
                              />
                            
                                     </div>             
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="education">
                                <Form.Label>Existing Loan</Form.Label> 
                                <div>
                                <Form.Check
                                inline
                                label="Yes"
                                name="el"
                                type='radio'
                                value="0"
                                onClick={(e) => {
                                  setexistloan(e.target.value);
                                }}
                                id={`1`}
                              />
                                 <Form.Check
                                inline
                                label="No"
                                name="el"
                                type='radio'
                                value="1"
                                id={`2`}
                                onClick={(e) => {
                                  setexistloan(e.target.value);
                                  console.log(e.target.value)
                                }}
                              />
                            
                                     </div>             
                    </Form.Group>



                    <Form.Group className="mb-3" controlId="dependents">
                                <Form.Label>Dependents</Form.Label>
                                <Form.Control  value={dependents} type="number" onChange={(e)=>setdep(e.target.value)} placeholder="Dependents" required/>
                                
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loanamt">
                                <Form.Label>Loan Amount</Form.Label>
                                <Form.Control type="number" value={loanamt} onChange={(e)=>setloanamt(e.target.value)} placeholder="Loan Amount" required/>
                                
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="repaymentperiod">
                                <Form.Label>repayment period</Form.Label> 
                                <Form.Select value={repayment} onChange={(e)=>setrepayment(e.target.value)} placeholder='' required>
                                    <option value='' default disabled>Choose </option>
                                    <option value="3">3 Months</option>
                                    <option value="8">8 Months</option>
                                    <option value="1">1 Year</option>
                                    <option value="2 ">2 Years</option>
                                    
                              
                                  </Form.Select>
                          
                    </Form.Group>
                              {erra && <Alert variant='danger'>{err} </Alert>}
                    <Button type='submit' >Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setloan(false)}>Close</Button>
      </Modal.Footer>
    </Modal>



      
             {/* <img style={styles.action_icons} src='https://cdn-icons-png.flaticon.com/512/1828/1828926.png' alt='add' onClick={()=>dispatcher(addtocart(props.props.id))}/>
             <img style={styles.action_icons} src='https://cdn-icons.flaticon.com/png/512/3941/premium/3941860.png?token=exp=1651660715~hmac=98e5c19baca0644c04dd094f9370fa36' alt='sub' onClick={()=>dispatcher(deletefromcart())}/> */}
          </div>  
    </div>

    
</div>
     
 
    </>
  
    
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
        margin:'1%',
        color:'black',
        display:'inline-block'
    },
    actions:
    {
      margin:'5%',
      display:'flex',
      padding:'2%',
      justifyContent:'center'
    },
    action_icons:{display:'block',height:'2rem',position:'relative',left:'-3%',margin:'2%'},
cartitem:{
    display:"inline-flex",
    justifyContent:'center',
    border:"1px solid black",
    margin:"3% 0% 3% 3%",
    flexWrap:'wrap',
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
   width:'100%',
    padding:"5%"
  }
  
}

export default CartItem 