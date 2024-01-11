import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { get_transaction_log } from '../data/log_data';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AddFee=({show,setshow,account,trxcode,curr,settc,settra})=> {
    const handleClose = () => setshow(false);
    const [startDate, setStartDate] = useState(new Date());
    const [tr_type,setTrType]=useState('Terheqje');
    const [accname,setAccname]=useState('');
    const [descr,setDescr]=useState('');
    const [amount,setAmount]=useState(0);
    const [currencies,setCurrencies]=useState(0);
    const [cname,setCname]=useState('');
    const [total,setTotal]=useState(0);
    const [tcode,setTcode]=useState(0);
    const [accId,setAccId]=useState(0);
    const user = JSON.parse(localStorage.getItem('User'));
    const [activeSection, setActiveSection] = useState('home');


    const formatedstdate=startDate.toISOString().replace(/\.\d{3}Z$/, '');

    const forPost={
     "created_timestamp": formatedstdate,
     "maker_id":user.user.user.user_id, 
     "transaction_code": tcode,
     "original_amt": parseFloat(amount),
     "fx_rate": parseFloat(currencies),
     "trx_desc": descr,
     "related_acc_id": accId,
     "dr_cr_flag": "Y",
     "ccy_amt": total,
     "origianl_ccy_code": 1,
     "posted": "N"
   }
   
   const funcpost=async()=>{
     try{
       await axios.post('/api/v1/transaction_log',forPost);
       get_transaction_log(settc);
       get_transaction_log(settra);
     }catch(error){
       console.log('Error ne metoden add transaction',error);
     }
   }
   
    const getTotal=()=>{
     const tot=amount*currencies;
     setTotal(tot);
    }
   
    const getAccId=()=>{
     const val=account.find((c)=>c.acc_title===accname);
     let acID=0;
     if (val!=undefined){
        acID=val.acc_id;
     }
     if(val!=undefined){
     setAccId(acID);
     }else{
       setAccId(0);
     }
    }
    useEffect(()=>{
     getAccId();
    },[accname])
   
    const getTcode=()=>{
     const val=trxcode.find((c)=>c.code_desc===tr_type);
     let trcode=0;
     if(val!=undefined){
       trcode=val.transaction_code;
     }
     if(val!=undefined){
     setTcode(trcode);
     }else{
       setTcode(0);
     }
    }
    useEffect(()=>{
     getTcode();
    },[currencies,tr_type])
   
    useEffect(()=>{
     getTotal();
    },[amount,currencies])
       const handleChange=()=>{
          console.log(startDate);
       }

       const renderSection = () => {
        switch (activeSection) {
          case 'home':
            return (
              <div id="home">
               <InputGroup className="rounded-0">
        <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Amount</InputGroup.Text>
        <Form.Control
          className=""
          onChange={(e)=>setAmount(e.target.value)}
          type='number'
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="rounded-0">
        <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Currencies</InputGroup.Text>
        <Form.Select className="rounded-0" onChange={(e) => setCname(e.target.value)} >
          {curr.map((item)=>{
            return(
              <option>{item.ccy_name}</option>
            )
          })}
      </Form.Select>
      <Form.Control
          className="rounded-0"
          type='number'
          onChange={(e) => setCurrencies(e.target.value)}
          placeholder="currencies"
          aria-label="curr"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Vlera</InputGroup.Text>
      <Form.Control
          className="rounded-0"
          type='text'
          value={total+" "+cname}
          placeholder="vlera"
          aria-label="vler"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
              </div>
            );
          case 'pricing':
            return (
              <div id="pricing">
                    <InputGroup className="rounded-0">
                <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Percentage</InputGroup.Text>
        <Form.Control
          className=""
          onChange={(e)=>setAmount(e.target.value)}
          type='number'
          placeholder="Percentage"
          aria-label="Amount"
          aria-describedby="basic-addon1"
        />
        </InputGroup>
                <InputGroup className="rounded-0">
        <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Amount</InputGroup.Text>
        <Form.Control
          className=""
          onChange={(e)=>setAmount(e.target.value)}
          type='number'
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="rounded-0">
        <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Currencies</InputGroup.Text>
        <Form.Select className="rounded-0" onChange={(e) => setCname(e.target.value)} >
          {curr.map((item)=>{
            return(
              <option>{item.ccy_name}</option>
            )
          })}
      </Form.Select>
      <Form.Control
          className="rounded-0"
          type='number'
          onChange={(e) => setCurrencies(e.target.value)}
          placeholder="currencies"
          aria-label="curr"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Vlera</InputGroup.Text>
      <Form.Control
          className="rounded-0"
          type='text'
          value={total+" "+cname}
          placeholder="vlera"
          aria-label="vler"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
              </div>
            );
          // Add more cases for other sections as needed
          default:
            return null;
        }
      };
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Fee</Modal.Title>
          </Modal.Header>
          <Modal.Body>

    <div style={{'width':'100%','margin':'5px','padding':'10px'}}>
      <Row>
        <Col xl={12}>
          <div style={{'border':'1px solid black','borderRadius':'10px','backgroundColor':'white'}}>
            <div style={{'backgroundColor':'#8fd4e2','color':'white','width':'100%','height':'30px','borderRadius':'10px 10px 0px 0px'}}>
              <span style={{'paddingLeft':'20px','color':'#2d4557'}}>Add Fee</span>
            </div>
    <Form>
    <InputGroup className="">
        <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }} >Transaction Type</InputGroup.Text>
        <Form.Select className="rounded-0" onChange={(e)=>setTrType(e.target.value)}>
        {trxcode.map((item)=>{
          return(
            <option>{item.code_desc}</option>
          )
        })}
      </Form.Select>
      </InputGroup>
      <InputGroup className="rounded-0">
        <InputGroup.Text  style={{'width':'180px', 'color':'#2d4557' }} >Transaction Date</InputGroup.Text>
        <DatePicker
         style={{ 'border': 'none', 'margin': '0', 'height': '100% !important', 'width': '100%' }}
         width="100%"
         className="border-0 m-0 h-100 w-100" 
         selected={startDate} 
         onChange={(date) => setStartDate(date)} />
      </InputGroup>
      <InputGroup className="rounded-0">
        <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>Description</InputGroup.Text>
        <Form.Control className="rounded-0" onChange={(e) => setDescr(e.target.value)} as="textarea" aria-label="Description" />
      </InputGroup>
      <InputGroup className="rounded-0">
        <InputGroup.Text className="rounded-0" style={{'width':'180px', 'color':'#2d4557' }}>To</InputGroup.Text>
        <Form.Select className="rounded-0" onChange={(e)=>setAccname(e.target.value)}>
          {account.map((item)=>{
            return(
              <option>{item.acc_title}</option>
            )

          })}
        
      </Form.Select>
      </InputGroup>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setActiveSection('home')} href="#home">Amount</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('pricing')} href="#pricing">Percentage</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {renderSection()}
      
    </Form>
    <Button className="rounded-0"  onClick={()=>funcpost()} style={{'backgroundColor':'#8fd4e2','border':'none','color':'#2d4557'}}>Add Fee</Button>
    </div>
    </Col>
    </Row>
    </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Add Fee
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default AddFee;

