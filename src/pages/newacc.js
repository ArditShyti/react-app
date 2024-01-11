import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { get_account } from '../data/log_data';
import { mainAxios } from './login/helpers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";


const NewAccount=({page,acctype,currencies,setacc})=>{
  const [accType,setAccType]=useState('Account type');
  const [currency,setCurrency]=useState('');
  const [accTypeData,setAccTypeData]=useState(0);
  const [currencyData,setCurrencyData]=useState([]);
  const [accname,setAccname]=useState('');
  const [desc,setDescr]=useState('');
  const [cname,setCname]=useState('');
  const [total,setTotal]=useState(0);
  const [amount,setAmount]=useState(0);
  

  const handleAccountTypeChange = (event) => {
    setAccType(event.target.value);
  };

  const getTotal=()=>{
    const tot=amount*currencyData;
    setTotal(tot);
   }
   useEffect(()=>{
    getTotal();
   },[amount,currencyData])

  const getAccId=()=>{
    const val=acctype.find((c)=>c.acc_type===accType);
    let acID=0;
    if (val!=undefined){
       acID=val.type_code;
    }
    if(val!=undefined){
    setAccTypeData(acID);
    }else{
      setAccTypeData(0);
    }
   }
   useEffect(()=>{
    getAccId();
   },[accType,amount])

   function kontrollovlerat(fusha){
    if(accForpost[fusha]!=""){
      return true;
    }else{
      toast.error("Fusha : "+fusha+" eshte e paplotesuar",{
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
   }

   function kontrolloInt(fusha){
    if(accForpost[fusha]!=0){
      return true;
    }else{
      toast.error("Fusha : "+fusha+" eshte e paplotesuar",{
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
   }
   

   let accForpost={
      "ccy_code": 0,
      "acc_desc": "",
      "last_updated": "2023-02-02T16:30:55.620492",
      "balance": 0,
      "acc_title": "",
      "acc_type": 0,
      "maker_id": 1
   }
   let checkval=false;
   let checkval_one=false;


   function ktheError(value){
    if(value){
      return true;
    }else{
      toast.error("Forma : eshte e paplotesuar",{
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
   }

  function setvalues(field,value){
    accForpost[field]=value;
    console.log('acc for post : ',accForpost);
  }

  function setcurrenc(value){
    let valone=currencies.find(c=>c.ccy_name===value);
    valone=valone.ccy_code;
    accForpost.ccy_code=valone;
    checkval=true;
    console.log('acc for post : ',accForpost);
  }

  function setactype(value){
    let valone=acctype.find(c=>c.acc_type===value);
    valone=valone.type_code;
    accForpost.acc_type=valone;
    checkval_one=true;
    console.log('acc for post : ',accForpost);
  }

   
 
  const funcpost=async()=>{
    try{
      if(kontrollovlerat("acc_desc") && kontrollovlerat("last_updated") && kontrollovlerat("acc_title") && kontrolloInt("ccy_code") && kontrolloInt("balance") && ktheError(checkval_one)){
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().replace(/\.\d+/, `.${currentDate.getMilliseconds()}`);
      accForpost["last_updated"]=formattedDate;
      await mainAxios.post('/api/v1/accounts',JSON.stringify(accForpost));
      get_account(setacc);
    }
    }catch(error){
      console.log('Error ne metoden add account',error);
    }
  }

    if (page!=='newacc') return null ;
  return (
    <div style={{'width':'50%','margin':'5px','padding':'10px'}}>
      <div style={{'border':'1px solid gray','borderRadius':'10px','backgroundColor':'white'}}>
            <div style={{'backgroundColor':'#8fd4e2','color':'white','width':'100%','height':'30px','borderRadius':'10px 10px 0px 0px'}}>
              <span style={{'paddingLeft':'20px','color':'#2d4557'}}>New Account</span>
            </div>
            <ToastContainer />
    <Form>
    <InputGroup className="">
        <InputGroup.Text className="rounded-0" style={{'width':'150px','color':'#2d4557'}} >Name</InputGroup.Text>
        <Form.Control
          className="rounded-0"
          onChange={(e)=>setvalues("acc_title",e.target.value)}
          placeholder="Username"
          aria-label="Username"
        />
      </InputGroup>
      <InputGroup  >
        <InputGroup.Text className="rounded-0" style={{'width':'150px', 'color':'#2d4557' }}>Description</InputGroup.Text>
        <Form.Control   onChange={(e)=>setvalues("acc_desc",e.target.value)}
                        className="rounded-0" as="textarea" aria-label="Description" />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text className="rounded-0" style={{'width':'150px', 'color':'#2d4557' }}>Account type</InputGroup.Text>
      <Form.Select  
      className="rounded-0"
      value={accType}
      onChange={(e)=>setactype(e.target.value)}
      >
        <option>Account type</option>
        {acctype.map((item)=>{
          return(
            <option>{item.acc_type}</option>
          )
        })}
      </Form.Select>
      </InputGroup>
      <InputGroup >
        <InputGroup.Text className="rounded-0" style={{'width':'150px', 'color':'#2d4557' }} >Balanca</InputGroup.Text>
        <Form.Control
          className="rounded-0"
          onChange={(e)=>setvalues("balance",parseFloat(e.target.value))}
          type='number'
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup >
        <InputGroup.Text className="rounded-0" style={{'width':'150px', 'color':'#2d4557' }} >Currencies</InputGroup.Text>
        <Form.Select className="rounded-0" onClick={(e) => setcurrenc(e.target.value)} onChange={(e) => setcurrenc(e.target.value)} >
          {currencies.map((item)=>{
            return(
              <option>{item.ccy_name}</option>
            )
          })}
      </Form.Select>
      
      </InputGroup>
      
    </Form>
    <Button style={{'backgroundColor':'#8fd4e2','border':'none','color':'#2d4557'}} className="rounded-0" onClick={()=>funcpost()} >Add Account</Button>
    </div>
    </div>
  );
}

export default NewAccount;