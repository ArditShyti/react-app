import React from "react";

const AccountItemsF=({accounts,setId,setPage})=>{

  const vendosfDjatht=(id)=>{
    setPage('Trx');
    setId(id)
}

    return(
        <div onClick={()=>vendosfDjatht(accounts.acc_id)} style={{'marginTop':'20px','margin':'5px','padding':'10px','marginBottom':'20px','backgroundColor':'white'}} className="accitem">
                <p style={{'backgroundColor':'#e6e6e6','color':'green','width':'100%'}}>{accounts.acc_title ? accounts.acc_title : "Account Name"}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>
    <span>{accounts.acc_title}</span>
  </div>
  <div>
    <span>{accounts.balance}</span>
  </div>
</div>

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>
    <span>{accounts.acc_desc}</span>
  </div>
  <div>
    <span>{accounts.balance}</span>
  </div>
</div>
            </div>
    )
};

export default AccountItemsF;