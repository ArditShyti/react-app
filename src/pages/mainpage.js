import React, { useEffect,useCallback } from "react";
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuBar from './sidebar'
import Accounts from "./accounts";
import Transaction from "./trc_log";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarii from "./rightpage";
import Form from 'react-bootstrap/Form';
import { get_account,get_transaction_log,get_transaction_codes,get_account_types,get_currencies} from "../data/log_data";
//get_account_types,get_currencies,get_organisation,get_permission,get_role_permission,get_sub_accounts,get_transaction_codes,get_transaction_log,get_user_group,get_user_roles,get_users,
import './main.css'
import { mainAxios } from "./login/helpers";
import { useUser } from "./login/useuser";

const MainPage=()=>{
const [page,setPage]=useState('Accounts');
const [rightpage,setRightPage]=useState('newacc');
const [account,setAccount]=useState([]);
const [transaction,setTransaction_log]=useState([]);
const [transaction_codes,setTransaction_codes]=useState([]);
const [trenzec,setTrenzes]=useState([]);
const [acctype,setAcc_type]=useState([]);
const [id,setId]=useState(0);
const [curr,setCurr]=useState([]);
const [search,setSearch]=useState('');
const [taccounts,setTAccount]=useState([]);
const user = useUser((userStore) => userStore.user);

const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === 't') {
        setPage('Transactions');
    }
    if(event.ctrlKey&& event.key==='a'){
        setPage('Accounts');
    }
    if(event.ctrlKey && event.key==='s'){
        setRightPage('newacc')
    }
    if(event.ctrlKey && event.key==='r'){
        setRightPage('newtransaction')
    }
  }, []);
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

useEffect(()=>{

  const fetchData = async () => {
    if (page === 'Accounts' && search.length !== 0) {
      try {
        const acco = await mainAxios.get(`/api/v1/accounts/search?filters=acc_title%3D${search}&filters=acc_desc%3D${search}`);
        console.log(acco);
        if (Array.isArray(acco.data.data)) {
          setAccount(acco.data.data);
          console.log(acco.data.data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }
  }
  fetchData();

 const fetchTData = async () => {
    if (page === 'Transactions' && search.length !== 0) {
      try {
        const transaction = await mainAxios.get(`/api/v1/transaction_log/search?filters=trx_desc%3D${search}`);

        if (Array.isArray(transaction.data.data)) {
          setTransaction_log(transaction.data.data);
          setTrenzes(transaction.data.data);
        }
      } catch (error) {
        console.error("Error fetching transaction logs:", error);
      }
    }
  };

  fetchTData(); 

},[search])

useEffect(()=>{
    get_account(setAccount);
    get_account(setTAccount);
    get_transaction_log(setTransaction_log);
    get_transaction_log(setTrenzes);
    get_transaction_codes(setTransaction_codes);
    get_account_types(setAcc_type);
    get_currencies(setCurr);
  },[]);


    return (
        <>
        <div className="wholeapp" style={{'width':'100%','height':'100%','position':'fixed'}}>
       
            <div className="side" style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>

                <MenuBar 
                setPage={setPage}
                ></MenuBar>
                </div>
        

                <div className="qender" >
                <Form.Control
                style={{'height':'60px','top':'0px','backgroundColor':'#2d4557','color':'white','width':'100%','left':'0px','position':'absolute','display':'flex','border':'none'}}
                className="rounded-0 inputqender"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                type='Text'
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                />
                <div style={{'display':'flex','justifyContent':'center','alignItems':'center','overflowY':'scroll','width':'100%','height':'90%','top':'60px','position':'absolute'}}>
                {account &&(
                <Accounts 
                accounts={account} 
                page={page} 
                setRightPage={setRightPage}
                setId={setId} />
                )}
                {transaction && trenzec &&(
                <Transaction 
                transaction={transaction} 
                tren={trenzec} 
                accounts={taccounts} 
                page={page}
                setRightPage={setRightPage}
                setId={setId}
                 />
                 )}
                </div>
                </div>
                
                <div className="rights">
                <Navbarii 
                className="w-100"
                setacc={setAccount}
                sttr={setTrenzes}
                curr={curr}
                acctype={acctype}
                account={account}
                rightpage={rightpage} 
                setRightPage={setRightPage} 
                id={id} 
                transaction={transaction} 
                trxcode={transaction_codes} 
                setTransac={setTransaction_log}/>
                </div>
         
        </div>
        </>
    )
}

export default MainPage;