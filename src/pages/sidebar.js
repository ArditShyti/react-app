import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen,faCalendar,faHourglass,faStickyNote,faChartPie,faTag,faBell,faGear,faQuestion,faComment,faBusinessTime} from '@fortawesome/free-solid-svg-icons';


const MenuBar=({setPage})=>{
const changePage =(direction)=>{
    setPage(direction);
}


return(
<Sidebar backgroundColor='#bac3d3' style={{'height':'100%','textAlign':'start','border':'none'}}>
<div className="logotext" style={{'padding':'15px','width':'250px','height':'60px','backgroundColor':'#2d4557','color':'white'}}>
              <p>Big Logo</p>
            </div>
  <Menu>
    <MenuItem style={{'backgroundColor':'white'}} onClick={() => changePage('Business')}><FontAwesomeIcon icon={faBusinessTime} style={{ 'color': 'lightgreen' }} /> <b style={{'color':'#2d4557' }}> My Business</b> </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}} onClick={() => changePage('Accounts')}><FontAwesomeIcon icon={faBookOpen} style={{ 'color': 'lightgreen' }} /> <b style={{'color':'#2d4557' }}> Accounts</b>  </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}} onClick={() => changePage('Transactions')}><FontAwesomeIcon icon={faCalendar} style={{ 'color': 'lightgreen' }}/> <b style={{'color':'#2d4557' }}> Transactions</b> </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}}><FontAwesomeIcon icon={faHourglass} style={{ 'color': 'lightgreen' }}/><b style={{'color':'#2d4557' }}> Upcoming Transactions</b>  </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}}><FontAwesomeIcon icon={faStickyNote} style={{ 'color': 'lightgreen' }} /> <b style={{'color':'#2d4557' }}> Notes</b> </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}} onClick={() => changePage('Reports')}><FontAwesomeIcon icon={faChartPie} style={{ 'color': 'lightgreen' }}/><b style={{'color':'#2d4557' }}> Reports</b>  </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}}><FontAwesomeIcon icon={faTag} style={{ 'color':'lightgreen' }} /> <b style={{'color':'#2d4557' }}> Categories</b>  </MenuItem>
    <MenuItem style={{'backgroundColor':'white','border':'1px 0px 0px 0px solid black'}}><FontAwesomeIcon icon={faBell} style={{ 'color': 'lightgreen' }} /><b style={{'color':'#2d4557' }}> Notification</b>  </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}}><FontAwesomeIcon icon={faGear} style={{ 'color': 'lightgreen' }} /> <b style={{'color':'#2d4557' }}> Settings</b> </MenuItem>
    <MenuItem style={{'backgroundColor':'white'}}><FontAwesomeIcon icon={faQuestion} style={{ 'color': 'lightgreen' }} /><b style={{'color':'#2d4557' }}> Help</b>  </MenuItem>
    <MenuItem style={{'backgroundColor':'white','borderRadius':'0px 0px 15px 15px'}}><FontAwesomeIcon icon={faComment} style={{ 'color': 'lightgreen' }} /> <b style={{'color':'#2d4557' }}> Feedback</b> </MenuItem>
  </Menu>
</Sidebar>
)
}

export default MenuBar;
