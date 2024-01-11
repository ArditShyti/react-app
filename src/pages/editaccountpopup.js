import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

function EditAcc({show,setShow,account,currencies,acctype,sacc}) {
    const handleClose = () => setShow(false);

  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
    <InputGroup className="">
        <InputGroup.Text className="rounded-0" style={{'width':'150px'}} >Name</InputGroup.Text>
        <Form.Control
          value={sacc.acc_title}
          className="rounded-0"
          // onChange={(e)=>setvalues("acc_title",e.target.value)}
          placeholder="Username"
          aria-label="Username"
        />
      </InputGroup>
      <InputGroup  >
        <InputGroup.Text className="rounded-0" style={{'width':'150px'}}>Description</InputGroup.Text>
        <Form.Control
        value={sacc.acc_desc}
          //  onChange={(e)=>setvalues("acc_desc",e.target.value)}
          className="rounded-0" as="textarea" aria-label="Description" />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text disabled className="rounded-0" style={{'width':'150px'}}>Account type</InputGroup.Text>
      <Form.Select  
      disabled
      className="rounded-0"
      // onClick={(e)=>setvalues("acc_desc",e.target.value)}
      // value={accType}
      // onChange={handleAccountTypeChange}
      >
        <option>Account type</option>
        {acctype.map((item)=>{
          return(
            <option>{item.acc_type}</option>
          )
        })}
      </Form.Select>
      </InputGroup>
      <InputGroup >
        <InputGroup.Text className="rounded-0" style={{'width':'150px'}} >Balanca</InputGroup.Text>
        <Form.Control
        disabled
        value={sacc.balance}
          className="rounded-0"
          // onChange={(e)=>setvalues("balance",parseFloat(e.target.value))}
          type='number'
          placeholder="Amount"
          aria-label="Amount"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup >
        <InputGroup.Text className="rounded-0" style={{'width':'150px'}}  >Currencies</InputGroup.Text>
        <Form.Select className="rounded-0" disabled>
          {currencies.map((item)=>{
            return(
              <option>{item.ccy_name}</option>
            )
          })}
      </Form.Select>
      
      </InputGroup>
      </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default EditAcc;