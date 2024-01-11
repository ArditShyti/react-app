import React, { useEffect, useState } from "react";
import BarChart from "./charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {addMonths, format } from 'date-fns';
import {get_transaction_log} from '../data/log_data'


const Report=({page})=>{
const [startDate, setStartDate] = useState(new Date());
const [startDateo, setStartDateo] = useState(new Date());
const [trc,setTrc]=useState([]);

useEffect(()=>{
  get_transaction_log(setTrc);
},[])

function getMonthsAndYears(startDate, endDate) {
  const monthsAndYears = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const monthAndYear = format(currentDate, 'MMMM yyyy');
    monthsAndYears.push(monthAndYear);

    currentDate = addMonths(currentDate, 1);
  }

  return monthsAndYears;
}


const result = getMonthsAndYears(startDate, startDateo);
console.log(result);

function getdata(trc,date){
  let trcdata=[]
  const trcDate=trc.created_time
  date.map((item)=>{
     
  })
}



if (page!='Reports') return null;
    return(
        <div>
            <Row>
                <Col xl={6}>
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
          </Col>
          <Col xl={6}>
          <div className="form-group">
            <DatePicker
              selected={startDateo}
              onChange={(date) => setStartDateo(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
            />
          </div>
          <button  onClick={()=>getMonthsAndYears(startDate, startDateo)} >Click Here</button>
          </Col>
          </Row>
        <BarChart />
        </div>
    )
}

export default Report;