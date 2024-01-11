import React from "react";
import AccountItemsF from "./acc_itemsf";

const AccountsF=({accounts,page,setId,setPage})=>{

    if (page!=='Accounts') return null ;

    return(
        <>
        <div style={{'width':'100%','height':'100%'}}>
        <div style={{'backgroundColor':'#1ea9ff','color':'white','width':'100%','height':'40px'}}>
              <h3>Accounts</h3>
            </div>
            {accounts.map((item)=>(
              <AccountItemsF accounts={item} setId={setId} setPage={setPage} />
          ))}
        </div>
        </>
    )
}

export default AccountsF;