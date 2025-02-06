import { Routes, Route, NavLink } from 'react-router-dom';
import Orders from './Orders';
import { useNavigate } from 'react-router-dom';
import WatchList from './WatchList';
import { useEffect } from 'react';

const DashBoard = () => {
const navigate = useNavigate();
  useEffect(() => {
   

    window.addEventListener('resize', handleResize());
  }, [])

  const handleResize = () => {
    let timer:number|undefined ;

  
   return()=>{
 if(timer){
clearTimeout(timer)
}
timer = setTimeout(()=>{
  
  if(window.innerWidth >1024){
    if(window.location.pathname === '/watchList'){
      navigate("/orders")
    }
   
  }
  timer=undefined;
    },500)

 }
     
  };
    return (  <>
    <div className='dashboard'>
      <nav>
        <ul>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Orders</NavLink>
          </li>
          <li className='watchlistRouter'>
          <NavLink to="/watchList" className={({ isActive }) => `watchlistRouter ${isActive ? 'active-tab' : ''}`}>WatchList</NavLink>
          </li>
          {/* <li>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Portfolio</NavLink>
          </li> */}
        </ul>
      </nav>

      <Routes>
       
        <Route path="/orders" element={<Orders />} />
         <Route  path="/watchList" element={<WatchList />} /> 
      </Routes>
    </div>
    </>);
}
 
export default DashBoard;