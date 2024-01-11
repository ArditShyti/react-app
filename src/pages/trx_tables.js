import { React, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { get_transaction_log } from "../data/log_data";
import './trxtable.css';
import Dropdown from 'react-bootstrap/Dropdown';
import EditAcc from "./editaccountpopup";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { useUser } from "./login/useuser";
import { mainAxios } from "./login/helpers";



const TrxTable = ({ id, transaction, rpage, trxcode, setTransac, settc,account,currencies,acctype }) => {

    const [visibleRow, setVisibleRow] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [desc, setDesc] = useState('');
    const [valueoftrx, setValueOf] = useState('0');
    const [tccode, setTccode] = useState(1);
    const logout=useUser((user)=>user.logout);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('User'));
    const idForpost=id;



    const logout_func=()=>{
        logout();
        localStorage.removeItem('User');
        navigate('/login');
    }


    function returndatatable(id, transaction) {
        const data = transaction.filter((a) => a.related_acc_id == id);
        return data;
    }
    const copyfunc = (index) => {
        setDesc(index.trx_desc);
        setValueOf(index.original_amt);
    }
    const formatedstartdate = startDate.toISOString().replace(/\.\d{3}Z$/, '');
    const posst = {
        "created_timestamp": formatedstartdate,
        "maker_id": user.user.user.user_id,
        "transaction_code": tccode,
        "original_amt": valueoftrx,
        "fx_rate": 0.0,
        "trx_desc": desc,
        "related_acc_id": idForpost,
        "dr_cr_flag": "Y",
        "ccy_amt": 0.0,
        "origianl_ccy_code": 1,
        "posted": "N"
    }

    const deleteRows = async (id) => {
        try {
            await mainAxios.delete(`/api/v1/transaction_log/${id}`);
            get_transaction_log(setTransac);
        } catch (error) {
            console.log('Error ne fshirjen e rreshtit', error);
        }
    }

    const editingRows = async (id, tcode) => {
        try {
            posst.transaction_code = tcode;
            await mainAxios.put(`/api/v1/transaction_log/${id}`, posst);
            get_transaction_log(setTransac);
            get_transaction_log(settc);
        } catch (error) {
            console.log('Error ne editimin e rreshtit', error);
        }
    }


    const expenseMethod = async () => {
        try {
            setTccode(1);
            posst.transaction_code = 1;
            await mainAxios.post('/api/v1/transaction_log', posst);
            get_transaction_log(setTransac);

        } catch (error) {
            console.log('Error ne new Trx', error);
        }
    }

    const incomeMethod = async () => {
        try {
            setTccode(2);
            posst.transaction_code = 2;
            await mainAxios.post('/api/v1/transaction_log', posst);
            get_transaction_log(setTransac);

        } catch (error) {
            console.log('Error ne new Trx', error);
        }
    }

    // const [currenciesName,setCurrenciesName]=useState("");
    // const [specificAccount,setSpecificAccount]=useState([]);
    // const [accName,setAccName]=useState("");

    let SpecificAccount=[];
    SpecificAccount = account.find(c => c.acc_id === id);
    let accName="";
    let currenciesName="";
    if (SpecificAccount) {
      accName = SpecificAccount.acc_title;
    
      const specificCurrencies = currencies.find(c => c.ccy_code === SpecificAccount.ccy_code);
    
      if (specificCurrencies) {
        currenciesName = specificCurrencies.ccy_name;
      } else {
        console.log("Currency not found for the specific account");
      }
    } else {
      console.log("Account not found");
    }
     




    const datatable = returndatatable(id, transaction);

    const carraydt = () => {
        const dt = transaction.map((item) => {
            const data = new Date(item.created_timestamp);
            const year = data.getFullYear();
            const month = data.getMonth() + 1;
            const day = data.getDate();
            const thedate = year + '-' + month + '-' + day;
            return thedate;
        })
        const simpledata = [...new Set(dt)];
        const sorteddata = (simpledata) => {
            const thisdt = simpledata.map((item) => {
                return new Date(item);
            });
            const sortData = thisdt.sort((a, b) => b > a ? 1 : -1);
            return sortData;
        }
        const datasort = sorteddata(simpledata);
        return datasort;
    }
    const convertformat = (dt) => {
        let dat;
        if (dt instanceof Date) {
            dat = dt
        } else {
            dat = new Date(dt);
        }
        const year = dat.getFullYear();
        const month = dat.getMonth() + 1;
        const dita = dat.getDate();
        const format = year + '/' + month + '/' + dita;
        return format;
    }

    const trx = datatable.map((item) => {
        item.created_timestamp = convertformat(item.created_timestamp);
        return item;
    })


    const datat = trx.map((item) => {
        return item.created_timestamp;
    })
    let formateddatat = datat.map((item) => {
        item = convertformat(item);
        return item;
    })

    formateddatat = [...new Set(formateddatat)];
    formateddatat = formateddatat.sort((a, b) => b > a ? -1 : 1);



    const toggleRow = (index) => {
        if (index === visibleRow) {
            setVisibleRow(null);
        } else {
            setVisibleRow(index);
            setEditRow(null);
        }
    };

    function getFee(row){
        if(row.trx_desc=="Kalim ne Llogari 3"){
            console.log(row.sub_tx[0].trx_desc);
        }
    }

    const toggleEditRow = (index) => {
        if (index.trx_id === editRow) {
            setEditRow(null);
        } else {
            setEditRow(index.trx_id);
            setDesc(index.trx_desc);
            setValueOf(index.original_amt);
        }
    }
    function findtrxcode(trccode) {
        const trxxcode = trxcode.find((c) => c.transaction_code === trccode).code_desc;
        return trxxcode;
    }
    const renderTableRows = (data) => {
        function getclsname(row){
            let clsname="trintablegreen";
            if(findtrxcode(row.transaction_code)==='Terheqje'){
                clsname="trintablered";
            }else if(findtrxcode(row.transaction_code)==='Depozitim'){
                clsname="trintablegreen";
            }
            return clsname;
        }
        ;
        return data.map((row) => (              
            <>
                {editRow !== row.trx_id && (
                    <tr className="trintablegreen"  onClick={() => toggleRow(row.trx_id)}>
                        {findtrxcode(row.transaction_code) === 'Terheqje' && (
                            <td style={{ 'color': 'red' }} colSpan="2">{findtrxcode(row.transaction_code)}</td>
                        )}
                        {findtrxcode(row.transaction_code) === 'Depozitim' && (
                            <td style={{ 'color': 'green' }} colSpan="2">{findtrxcode(row.transaction_code)}</td>
                        )}
                        <td>{row.trx_desc}</td>
                        <td>{format(row.created_timestamp,'dd MMM  HH:mm')}</td>
                        {findtrxcode(row.transaction_code) === 'Terheqje' && (
                            <td style={{ 'color': 'red' }}>-{row.original_amt}</td>
                        )
                        }
                        {findtrxcode(row.transaction_code) === 'Depozitim' && (
                            <td style={{ 'color': 'green' }}>{row.original_amt}</td>
                        )
                        }
                    </tr>
                )}
                {editRow !== row.trx_id && row.sub_tx.length > 0 &&(
                        <tr className="trintablegreen">
                         <td colSpan="2">{findtrxcode(row.sub_tx[0].transaction_code)}</td>
                         <td>{row.sub_tx[0].trx_desc}</td>
                         <td>{format(row.sub_tx[0].created_timestamp,'dd MMM  HH:mm')}</td>
                         <td>{row.sub_tx[0].original_amt}</td>
                        </tr>
                )}
                {visibleRow === row.trx_id && editRow !== row.trx_id && (
                    <tr>
                        <td colSpan="3"><button onClick={() => toggleEditRow(row)} style={{ 'backgroundColor': 'white', 'color': 'orange', 'border': 'none' }}>Edit</button></td>
                        <td><button onClick={() => copyfunc(row)} style={{ 'backgroundColor': 'white', 'color': 'black', 'border': 'none' }}>Copy</button></td>
                        <td><button onClick={() => deleteRows(row.trx_id)} style={{ 'backgroundColor': 'white', 'color': 'red', 'border': 'none' }}>Delete</button></td>

                    </tr>
                )}
                {editRow === row.trx_id && (
                    <> <tr>
                        <td colSpan="2">
                            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </td>
                        <td>
                            <input type="number" value={valueoftrx} onChange={(e) => setValueOf(parseFloat(e.target.value))} />
                        </td>
                        {row.transaction_code == 2 && (
                            <td>
                                <button onClick={() => editingRows(row.trx_id, 2)} style={{ 'backgroundColor': 'white', 'color': 'green', 'border': 'none' }}>-&nbsp;&nbsp;Depozitim</button>
                            </td>
                        )}
                        {row.transaction_code == 1 && (
                            <td>
                                <button onClick={() => editingRows(row.trx_id, 1)} style={{ 'backgroundColor': 'white', 'color': 'red', 'border': 'none' }}>-&nbsp;&nbsp;Terheqje</button>
                            </td>
                        )}
                    </tr>
                        <tr>
                            <td colSpan="2">

                            </td>
                            <td>
                                <div className="container" style={{ 'width': '100%' }}>
                                    <div className="row" style={{ 'width': '100%' }} >
                                        <div className="col" style={{ 'width': '100%' }}>
                                            <div className="form-group">
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button onClick={() => setEditRow(null)} style={{ 'backgroundColor': 'white', 'color': 'black', 'border': 'none' }}>Cancel</button>
                            </td>
                        </tr>
                    </>
                )}

            </>
        ));
    };
    const rreshtifundit = (trx) => {
        let allminus = 0;
        let allplus = 0;
        let allbarazim = 0;
        trx.filter((c) => c.transaction_code === 2).map((item) => {
            allplus = parseInt(allplus) + parseInt(item.original_amt);
            return allplus;
        })
        trx.filter((c) => c.transaction_code === 1).map((item) => {
            allminus = parseInt(allminus) + parseInt(item.original_amt);
            return allminus;
        })
        allbarazim = allplus - allminus;
        return (
            <>
                {allminus != 0 && allplus != 0 && (
                    <>
                        <tr className="rrfundit">
                            <td colSpan="4">Total : </td>
                            <td>{allplus}-{allminus}={allbarazim}</td>
                        </tr>
                    </>
                )}
                {allminus != 0 && allplus == 0 && (
                    <>
                        <tr className="rrfundit">
                            <td colSpan="4">Total : </td>
                            <td>{allbarazim}</td>
                        </tr>
                    </>
                )}
                {allminus == 0 && allplus != 0 && (
                    <>
                        <tr className="rrfundit">
                            <td colSpan="4">Total : </td>
                            <td>{allbarazim}</td>
                        </tr>
                    </>
                )}
            </>
        )

    }

    const renderRow = (formdata, trx) => {


        return formdata.map((item) => {
            const trxx = trx.filter((c) => c.created_timestamp === item);
            let minus = 0;
            const minusdt = trxx.filter((c) => c.transaction_code === 1);
            minusdt.map((item) => {
                minus = parseInt(minus) + parseInt(item.original_amt);
                return -minus;
            })
            let plus = 0;
            trxx.filter((c) => c.transaction_code === 2).map((item) => {
                plus = parseInt(plus) + parseInt(item.original_amt);
                return plus;
            })
            const barazim = plus - minus;

            return (
                <>
                    {renderTableRows(trxx)}
                    <tr style={{'backgroundColor':'#2d4557'}} className="rrdatave">
                        {minus != 0 && plus != 0 && (
                            <><td colSpan="2" style={{  'color': 'black' }}>{item}</td>
                                <td style={{  'color': 'green' }}>{plus}</td>
                                <td style={{  'color': 'red' }}>-{minus}</td>
                                <td style={{  'color': 'black' }}>={barazim}</td>
                            </>
                        )}
                        {minus != 0 && plus == 0 && (
                            <><td colSpan="4" style={{  'color': 'black' }}>{item}</td>
                                <td style={{  'color': 'red' }}>-{minus}</td>
                            </>
                        )}
                        {minus == 0 && plus != 0 && (
                            <><td colSpan="4" style={{  'color': 'black' }}>{item}</td>
                                <td style={{  'color': 'green' }}>{plus}</td>
                            </>
                        )}
                    </tr>
                </>
            );
        });
    };

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    

    if (rpage !== 'Trx') return null;
    return (
        <>
            <div style={{'position':'relative','width': '100%','height': '100%','marginBottom':'20px'}} >
            <div style={{'backgroundColor':'#8fd4e2','color':'#2d4557','width':'100%','height':'40px','position':'relative','display': 'flex', 'justifyContent': 'space-between' }}>
                    <span style={{'marginTop':'7px','paddingLeft':'15px'}} ><b>{accName} {currenciesName}</b></span>
                    <Dropdown >
      <Dropdown.Toggle style={{'backgroundColor':'#8fd4e2','color':'#2d4557','height':'30px','border':'none','marginTop':'0px'}} id="dropdown-basic">
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>handleShow()} href="#/action-1">Settings</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Periodic Reports</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Category</Dropdown.Item>
        <Dropdown.Item onClick={()=>logout_func()} href="#/action-3">Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </div>
            <div style={{ 'position': 'absolute','width': '100%', 'height': '70%','overflowY':'scroll' }}>
                <table style={{'position':'absolute','width': '100%'}}>
                    <tbody>
                        {renderRow(formateddatat, trx)}
                        {rreshtifundit(trx)}
                    </tbody>
                </table>
                </div>
                
                <div style={{'position':'absolute','bottom':'0' ,'width': '100%' ,'padding':'10px','backgroundColor':"#e6e6e6c2"}}>
                    {/* <table style={{ 'width': '100%' }}>
                        <tbody>
                            <tr>
                                <td >
                                    <input style={{ 'width': '90%', 'height': '30px' }} type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                                </td>
                                <td>
                                    <input style={{ 'width': '90%', 'height': '30px' }} type="number" value={valueoftrx} onChange={(e) => setValueOf(parseFloat(e.target.value))} />
                                </td>
                                <td>
                                    <button onClick={() => incomeMethod()} style={{ 'backgroundColor': 'white', 'color': 'green', 'border': 'none' }}>-&nbsp;&nbsp;Depozitim</button>
                                </td>
                                <td>

                                    <button onClick={() => expenseMethod()} style={{ 'backgroundColor': 'white', 'color': 'red', 'border': 'none' }}>-&nbsp;&nbsp;Terheqje</button>
                                </td>
                            </tr>
                            <tr>
                                <td>

                                </td>
                                <td colSpan="2" >
                                    <div className="container" style={{ 'width': '100%' }}>
                                        <div className="row" style={{ 'width': '100%' }} >
                                            <div className="col" style={{ 'width': '100%' }}>
                                                <div className="form-group">
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button style={{ 'backgroundColor': 'white', 'color': 'black', 'border': 'none' }}>Cancel</button>
                                </td>
                            </tr>

                        </tbody>
                    </table> */}
                    <div style={{'width':'40%','height':'50px','float':'left'}} >
                    <input style={{ 'width': '90%', 'height': '30px' }} type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div style={{'width':'40%','height':'50px','float':'left'}} >
                    <input style={{ 'width': '90%', 'height': '30px' }} type="number" value={valueoftrx} onChange={(e) => setValueOf(parseFloat(e.target.value))} />
                    </div>
                    <div style={{'width':'20%','height':'50px','float':'left'}} >
                    <button onClick={() => incomeMethod()} style={{ 'backgroundColor': 'white', 'color': 'green', 'border': 'none','width': '90%', 'height': '30px' }}>-&nbsp;&nbsp;Depozitim</button>
                    </div>
                    <div style={{'width':'80%','height':'50px','float':'left'}} >
                    <div className="container" style={{ 'width': '100%' }}>
                                        <div className="row" style={{ 'width': '100%' }} >
                                            <div className="col" style={{ 'width': '100%' }}>
                                                <div className="form-group">
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>                   
                                     </div>
                    <div style={{'width':'20%','height':'50px','float':'left'}} >
                    <button onClick={() => expenseMethod()} style={{ 'backgroundColor': 'white', 'color': 'red', 'border': 'none','width': '90%', 'height': '30px'}}>-&nbsp;&nbsp;Terheqje</button>
                    </div>
                </div>
                </div>
            <EditAcc show={show} setShow={setShow} account={account} currencies={currencies} acctype={acctype} sacc={SpecificAccount}/>
        </>
    )
}

export default TrxTable;