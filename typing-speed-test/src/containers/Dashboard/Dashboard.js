import React,{Component} from 'react';
import Timer from './Timer/Timer';
import TypingInfo from './TypingInfo/TypingInfo';
import NewGame from './NewGame/NewGame';
import './Dashboard.css';

class Dashboard extends Component {

    //Dashboard father component is constructed here from its child's'
      render(){
          return(
              <div className="Dashboard">
                  <TypingInfo/>
                  <Timer/>
                  <NewGame/>
              </div>

          );
      }
}

export default Dashboard;