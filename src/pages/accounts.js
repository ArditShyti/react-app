import React from "react";
import AccountItems from "./acc_items";

const Accounts=({accounts,page,setId,setRightPage})=>{

    if (page!=='Accounts') return null ;

    return(
        <>
        <div style={{'width':'400px','height':'100%'}}>
        <div style={{'backgroundColor':'#8fd4e2','color':'white','width':'100%','height':'40px','borderRadius':'0px 0px 15px 15px'}}>
              <h3 style={{'paddingLeft':'15px','color':'#2d4557'}} >Accounts</h3>
            </div>
            {accounts.map((item)=>(
              <AccountItems accounts={item} setId={setId} setRightPage={setRightPage} />
          ))}
        </div>
        </>
    )
}

export default Accounts;