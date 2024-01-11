import React from "react";

const AccountItems=({accounts,setId,setRightPage})=>{

  const vendosfDjatht=(id)=>{
    setRightPage('Trx');
    setId(id)
}

    return(
        <div onClick={()=>vendosfDjatht(accounts.acc_id)} style={{'marginTop':'20px','margin':'5px','padding':'10px','marginBottom':'20px','backgroundColor':'white','borderRadius':'20px'}} className="accitem">
                <p style={{'backgroundColor':'#8fd4e2','color':'#2d4557','width':'100%','borderRadius':'10px'}}><span>&nbsp;&nbsp;&nbsp;</span>{accounts.acc_title ?accounts.acc_title : "Account Name"}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>
    <span style={{'color':'lightgreen'}}><b>{accounts.acc_title}</b></span>
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

export default AccountItems;