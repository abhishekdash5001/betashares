import { useEffect } from 'react'


import './index.scss';
import WatchList from './components/WatchList'
import { MainContextProvider } from './contextProvider/MainContext'
import DashBoard from './components/Dashboard'
import { BrowserRouter } from 'react-router-dom';
import Dialog from './components/Dialog';



function App() {


 

  return (
    <>
      <MainContextProvider>
        <div className="flex mainContainer">
          <section className='w-3/10 watchList watchlistRouter'>
            <WatchList />
          </section>
          <section className='w-7/10 userInfo'>
            <BrowserRouter>
              <DashBoard />
            </BrowserRouter>
          </section>

        </div>
        <Dialog/>


      </MainContextProvider>

    </>
  )
}

export default App
