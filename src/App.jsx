import './App.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import Homepage from './component/Homepage';
import Navbar from './component/Navbar';
import Prediction from './component/Prediction';
import AboutUs from './component/AboutUs';
import Monthly from './component/Monthly';
import Daily from './component/Daily';
import Services from './component/Services';
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Navbar />,
      children:[
        {index:true, element: <Homepage />},
        {path:'/services', element: <Services />},
        { 
          path:'/prediction', 
          element: <Prediction />,
        },
        {path:'/prediction/monthly', element: <Monthly />},
        {path:'/prediction/daily', element: <Daily />},
        {path:'/about-us' , element: <AboutUs />}
      ]
    }
  ]);
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
