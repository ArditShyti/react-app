import React, { useEffect, useState } from "react";
import "./styles.scss";
import Sidebar from "./components/Sidebar";
import { get_account,get_transaction_log,get_transaction_codes,get_account_types,get_currencies } from "../data/log_data";
import Accounts from "../pages/accounts";
import AccountsF from "./Accountsf";
import TrxTableF from "./trxtables";

export default function MainPhoneView() {
  let [visible, setVisible] = useState(true);
  const [account,setAccount]=useState([]);
  const [page,setPage]=useState('Accounts')
  const [id,setId]=useState(0);
  const [transaction,setTransaction_log]=useState([]);
  const [transaction_codes,setTransaction_codes]=useState([]);
  const [trenzec,setTrenzes]=useState([]);
  const [acctype,setAcc_type]=useState([]);
  const [curr,setCurr]=useState([]);

  useEffect(()=>{
    get_account(setAccount);
    get_transaction_log(setTransaction_log);
    get_transaction_log(setTrenzes);
    get_transaction_codes(setTransaction_codes);
    get_account_types(setAcc_type);
    get_currencies(setCurr);
  },[account])

  const showNav = {
    transform: "translateX(0%)"
  };
  const hideNav = {
    transform: "translateX(-100%)"
  };

  const links = ["Home", "Shop for pants", "Wishlist", "Cart", "Login"];

  function handleClick() {
    setVisible(!visible);
  }

  return (
    <div className="App">
      <div className="pull" onClick={() => handleClick()}>
        <h4>Log</h4>
      </div>
      {page==='Accounts'&&(
      <div className="accounts">
        <AccountsF accounts={account} page={page} setPage={setPage} setId={setId} />
      </div>
      )}
      {page==='Trx'&&(
      <div className="transactions">
      <TrxTableF
       id={id}
       transaction={transaction}  
       page={page}
       trxcode={transaction_codes} 
       setTransac={setTransaction_log} 
       settc={setTrenzes} 
       account={account} 
       currencies={curr} 
       acctype={acctype} />
      </div>
)}




      {visible ? (
        <Sidebar style={hideNav} links={links} />
      ) : (
        <Sidebar style={showNav} links={links} />
      )}
    </div>
  
  );
}
