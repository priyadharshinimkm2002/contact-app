import { Routes, Route} from 'react-router-dom';
import React from 'react';
import Contactlist from './components/Contact-list';
import NewContact from './components/New-contact';
import Update from './components/Update';
import Api from './components/Api';



function App() {
  return (
    <div className="App">
         <Routes>
              <Route exact path={'/'}  element={<Contactlist />}/>
              <Route exact path={'/Newcontact'}  element={<NewContact />}/>
              <Route exact path={'/Update'}  element={<Update/>}/>
              <Route exact path={'/Api'}  element={<Api/>}/>
          </Routes>
    </div>
  );
}

export default App;
