import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../../ss 1.svg';
import { Outlet } from "react-router";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import './Navbar.css';
function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);

  const tl = useRef();

  useGSAP(() => {
    tl.current = gsap
      .timeline()
      .from(navRef.current, {
        opacity:0,
        duration: 1.3,
      })
      .from('.nav-item',{
        y:-100,
        duration:1,
        delay:0,
        opacity:0,
        stagger:0.2
      })
      gsap.from(logoRef.current, {
        x: -100,
        delay:1
      });
  }, );
  let classname = 'hover:text-yellow-300 cursor-pointer p-2 transition-shadow duration-300 nav-item';
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      {currentPath==='/' && <img ref={logoRef} src={logo} className="bg-yellow-300 absolute" alt="Logo" /> }
      <div className="w-screen absolute flex justify-center items-center h-14 top-3">
        <div 
          ref={navRef} 
          className="nav flex border-slate-200 border-2 justify-center items-center font-electolize gap-32 text-xl font-sans font-extrabold tracking-widest z-10 h-14 px-8 text-zinc-200 rounded-md"
        >
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive 
                ? `${classname} bg-neutral-500 rounded-sm` 
                : `${classname} bg-transparent`
            } 
            end
          >
            HOME
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) =>
              isActive 
                ? `${classname} bg-neutral-500 rounded-sm` 
                : `${classname} bg-transparent`
            }
          >
            SERVICES
          </NavLink>
          <NavLink 
            to="/prediction" 
            className={({ isActive }) =>
              isActive 
                ? `${classname} bg-neutral-500 rounded-sm` 
                : `${classname} bg-transparent`
            }
          >
            PREDICTION
          </NavLink>
          <NavLink 
            to="/about-us" 
            className={({ isActive }) =>
              isActive 
                ? `${classname} bg-neutral-500 rounded-sm` 
                : `${classname} bg-transparent`
            }
          >
            ABOUT US
          </NavLink>
        </div>
      </div>
        {currentPath==='/' && <button className="bg-neutral-500 absolute top-3 right-3 font-electolize font-bold hover:bg-neutral-800" disabled> LOGIN </button> }
      <main className='h-screen w-screen'>
        <Outlet />
      </main>
        
    </>
  );
}  
export default Navbar;
