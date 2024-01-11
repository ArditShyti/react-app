 import { useEffect, useState } from "react";
import { mainAxios } from "../pages/login/helpers";

 
 export const get_transaction_log=async(setTransaction_log)=>{
    try{
      const data=await mainAxios.get('/api/v1/transaction_log/related_sub_tx_list');
      const acctype=data.data;
      const total_c=acctype.total_count;
      const itemperpage=acctype.items_per_page;
      let pagenr=total_c/itemperpage;
      if(pagenr>parseInt(pagenr)){
        pagenr++;
      }
      const intpagenr=parseInt(pagenr);
      let transaction_dt=[];
      let i=0;
      for( i=1;i<=intpagenr;i++){
        let dt=await mainAxios.get(`/api/v1/transaction_log/related_sub_tx_list?page=${i}`)
        let dat=dt.data.data;  
        transaction_dt=transaction_dt.concat(dat);
      }
      setTransaction_log(transaction_dt);



    }catch(error){
      console.log('Error getting transaction log',error);
    }
  }

  
 export const get_account_types=async(setAccount_types)=>{
    try{
      const data=await mainAxios.get('/api/v1/account_types');
      const acctype=data.data.data;
      setAccount_types(acctype);

    }catch(error){
      console.log('Error getting account type',error);
    }
  }

  export const get_account=async(setAccount)=>{
    try{
      const data=await mainAxios.get('/api/v1/accounts');
      const acctype=data.data;
      const total_c=acctype.total_count;
      const itemperpage=acctype.items_per_page;
      let pagenr=total_c/itemperpage;
      if(pagenr>parseInt(pagenr)){
        pagenr++;
      }
      const intpagenr=parseInt(pagenr);
      let transaction_dt=[];
      let i=0;
      for( i=1;i<=intpagenr;i++){
        let dt=await mainAxios.get(`/api/v1/accounts?page=${i}`)
        let dat=dt.data.data;  
        transaction_dt=transaction_dt.concat(dat);
      }
      setAccount(transaction_dt);

    }catch(error){
      console.log('Error getting accounts ',error);
    }
  }



 export const get_currencies=async(setCurrencies)=>{
    try{
      const data=await mainAxios.get('/api/v1/currencies');
      const acctype=data.data.data;
      setCurrencies(acctype);

    }catch(error){
      console.log('Error getting currencies',error);
    }
  }



 export const get_organisation=async(setOrganisation)=>{
    try{
      const data=await mainAxios.get('/api/v1/organisation');
      const acctype=data.data.data;
      setOrganisation(acctype);

    }catch(error){
      console.log('Error getting organisation',error);
    }
  }


  

 export const get_permission=async(setPermission)=>{
    try{
      const data=await mainAxios.get('/api/v1/permission');
      const acctype=data.data.data;
      setPermission(acctype);

    }catch(error){
      console.log('Error getting permission',error);
    }
  }


  

 export const get_role_permission=async(setRole_permission)=>{
    try{
      const data=await mainAxios.get('/api/v1/role_permission');
      const acctype=data.data.data;
      setRole_permission(acctype);

    }catch(error){
      console.log('Error getting role_permission',error);
    }
  }


  

 export const get_sub_accounts=async(setSub_accounts)=>{
    try{
      const data=await mainAxios.get('/api/v1/sub_accounts');
      const acctype=data.data.data;
      setSub_accounts(acctype);

    }catch(error){
      console.log('Error getting sub_accounts',error);
    }
  }



 export const get_transaction_codes=async(setTransaction_codes)=>{
    try{
      const data=await mainAxios.get('/api/v1/transaction_codes');
      const acctype=data.data.data;
      setTransaction_codes(acctype);

    }catch(error){
      console.log('Error getting transaction_codes',error);
    }
  }

 

 export const get_user_group=async(setUser_group)=>{
    try{
      const data=await mainAxios.get('/api/v1/user_group');
      const acctype=data.data.data;
      setUser_group(acctype);

    }catch(error){
      console.log('Error getting user_group',error);
    }
  }



 export const get_user_roles=async(setUser_roles)=>{
    try{
      const data=await mainAxios.get('/api/v1/user_roles');
      const acctype=data.data.data;
      setUser_roles(acctype);

    }catch(error){
      console.log('Error getting user_roles',error);
    }
  }



 export const get_users=async(setUsers)=>{
    try{
      const data=await mainAxios.get('/api/v1/users');
      const acctype=data.data.data;
      setUsers(acctype);

    }catch(error){
      console.log('Error getting users',error);
    }
  }




  
