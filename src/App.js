import './App.css';
import Main from './Components/Main';
import { AuthProvider } from './Context/AuthContext';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './Components/Customer/Dashboard'
import Login from './Components/Login'
import ViewItem from './Components/Seller/ViewItem';
import Viewprod from './Components/Customer/Viewprod'
import Update from './Components/Update'
import { Provider } from 'react-redux';
import store from '../src/redux/store'
import PrivateRoute from './Components/PrivateRoute';
import Forgot from './Components/Forgot';
function App() {
  return (
<div className="App">
    <Router>
         <AuthProvider>
         <Provider store={store}>
                
               
              <Routes>
             
                <Route  path='/' element={<Main/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/forgot' element={<Forgot/>}></Route>
                <Route  path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
                <Route path='/sell/:id' element={<PrivateRoute><ViewItem/></PrivateRoute>} > </Route>
                <Route path='/buy/:id' element={<PrivateRoute><Viewprod/></PrivateRoute>} ></Route>
                {/* <Route path='/cart' element={<Cartt/>}></Route> */}
                <Route path='/update' element={<PrivateRoute><Update/></PrivateRoute>}></Route>
                
              </Routes>
                
              </Provider>
        </AuthProvider>
    </Router>
</div>
 
  );
}

export default App;
