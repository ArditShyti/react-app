import React from "react";


const Trclogitem=({trc,transaction,accounts,setRightPage,setId})=>{

    const trx=transaction.find((c)=>c.trx_id===trc.trx_id);
    const convertstrTodt=(str)=>{
        const dt=new Date(str);
        return dt;
    }

    const getTimee=(str)=>{
        const dt=convertstrTodt(str);
        const hour=dt.getHours();
        const min=dt.getMinutes();
        const thetime=hour+':'+min;
        return thetime;
    }

    const vendosfDjatht=(id)=>{
        setRightPage('Trx');
        setId(id)
    }
    let ngjyraborder="black" ;
    if(trx){
    if(trx.transaction_code===1){
        ngjyraborder="red";

    }else if(trx.transaction_code===2){
        ngjyraborder="green";
    }else{
        ngjyraborder="black"
    }
}
    return(
    <>
         <div onClick={()=>vendosfDjatht(trc.related_acc_id)} style={{'marginTop':'20px','margin':'5px','padding':'10px','marginBottom':'20px','backgroundColor':'white','borderLeft':`5px solid ${ngjyraborder}`}} className="trxlogitem">
         {trx &&(
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    
                    <div>
                        <span style={{'color':'#454545'}}><b>{(accounts.find(c=>c.acc_id===trc.related_acc_id)).acc_title+' '+getTimee(trx.created_timestamp)}</b></span>
                    </div>
                    <div>
                        <span>{trx.original_amt}</span>
                    </div>
                </div>
            
                <div>
                    <div style={{ display: 'flex'}}>
                        <span>{trx.trx_desc}</span>
                    </div>
                </div>
                </>
                )}
        </div>
    </>
    )
}

export default Trclogitem;