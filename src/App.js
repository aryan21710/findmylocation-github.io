import React from 'react';
import ReactDOM from "react-dom";
import Mylocation from './Mylocation';


const App=()=>{
  return (
    <div className="App">
      <Mylocation/>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));

