import React from "react";
import Trclogitem from "./trc_log_items";
import {format} from 'date-fns';

const Transaction=({transaction,tren,accounts,page,setRightPage,setId})=>{
const carraydt=()=>{
    const dt=transaction.map((item)=>{
        const data=new Date(item.created_timestamp);
        const year=data.getFullYear();
        const month=data.getMonth()+1;
        const day=data.getDate();
        const thedate=year+'-'+month+'-'+day;
        return thedate;
    })
      const simpledata=[...new Set(dt)];
      const sorteddata=(simpledata)=>{
      const thisdt=simpledata.map((item)=>{
        return new Date(item);
      });
      const sortData = thisdt.sort((a, b) => b > a ? 1: -1);
      return sortData;
      }
      const datasort=sorteddata(simpledata);
      return datasort;
}
const convertformat=(dt)=>{
    let dat;
    if(dt instanceof Date){
        dat=dt
    }else{
        dat=new Date(dt);
    }
    const year=dat.getFullYear();
    const month=dat.getMonth()+1;
    const dita=dat.getDate();

    const format=year+'-'+month+'-'+dita;
    return format;
}
const trx=transaction.map((item)=>{
    item.created_timestamp=convertformat(item.created_timestamp);
    return item;
})
const datat=carraydt();
const formateddatat=datat.map((item)=>{
    item=convertformat(item);
return item;
})
    if (page!=='Transactions') return null ;
    return(
        <>

        
        <div style={{'width':'400px','height':'100%'}} >
        <div style={{'backgroundColor':'#8fd4e2','color':'white','width':'100%','height':'40px','borderRadius':'0px 0px 15px 15px'}}>
              <h3 style={{'paddingLeft':'15px','color':'#2d4557'}} >Transactions</h3>
            </div>            
            {formateddatat.map((item) => {
        const trxx = trx.filter((c) => c.created_timestamp === item);
        const tx=tren;
        const st=setRightPage;

        return (
          <div key={item}>
            <p style={{ 'backgroundColor':'#2d4557','color':'white' }}>{format((item),'dd/MM/yyyy')}</p>
            
            {trxx.map((item) => (
              <Trclogitem 
              key={item.id} 
              trc={item} 
              transaction={tx} 
              accounts={accounts} 
              setRightPage={st}
              setId={setId}
              />
            ))}
          </div>
        );
      })}
            
            {/* {transaction.map((item)=>(
              <Trclogitem trc={item} accounts={accounts} />
          ))} */}
        </div>
        </>
    )
}

export default Transaction;