import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewAccount from './newacc';
import { useState } from 'react';
import NewTransaction from './newtransactions';
import TrxTable from './trx_tables';
import Report from './reports';
import { useUser } from './login/useuser';

const Navbarii=({rightpage,setRightPage,id,transaction,trxcode,setTransac,account,acctype,curr,sttr,setacc})=>{
const user = useUser((userStore) => userStore.user);


const changeRightPage =(rpage)=>{
setRightPage(rpage);
}
  return (
    <div style={{'position':'absolute','width':'100%','height':'100%','backgroundColor':'#bac3d3'}}>
<Row>
    <Col>
    <Navbar expand="lg"  style={{'height':'60px','backgroundColor':'#2d4557'}}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{'height':'40px','backgroundColor':'lightgreen','color':'#2d4557','borderRadius':'15px','margin':'15px'}} href="#NewAccount" onClick={() => changeRightPage('newacc')}>+ Account</Nav.Link>
            <Nav.Link style={{'height':'40px','backgroundColor':'lightgreen','color':'#2d4557','borderRadius':'15px','margin':'15px'}} href="#NewTransaction" onClick={() => changeRightPage('newtransaction')}>+ Transaction</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Col>
</Row>
<Row style={{'height':'90%','position':'relative'}}>
    <Col>
       <NewAccount page={rightpage} acctype={acctype} currencies={curr} setacc={setacc} />
       <NewTransaction page={rightpage} account={account} trxcode={trxcode} acctype={acctype} curr={curr} settc={sttr} settra={setTransac}/>
       <TrxTable 
       id={id}
       transaction={transaction}  
       rpage={rightpage}
       trxcode={trxcode} 
       setTransac={setTransac} 
       settc={sttr} 
       account={account} 
       currencies={curr} 
       acctype={acctype} />
       <Report page={rightpage} />
    </Col>
</Row>
    
    </div>
  );
}

export default Navbarii;