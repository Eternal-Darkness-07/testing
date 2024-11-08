import Thunder from '../svg/Thunder'
import { useRef } from 'react';
import gsap  from 'gsap';
import {useGSAP} from '@gsap/react';
import {Typewriter} from  'react-simple-typewriter';

function Homepage() {
  const thunderRef = useRef(null);
  const typeRef = useRef(null);
  // Shery.mouseFollower();
  useGSAP(()=>{
    gsap.from(thunderRef.current, {
      delay:0,
      x: '550px',
      duration:2
    });
    gsap.to(thunderRef.current, {
      delay:2,
      y: '-7vh',          // Move vertically down by 100px
      duration: 2,   // Duration for one cycle
      ease: "sine.inOut",  // Smooth easing
      repeat: -1,      // Infinite repeat
      yoyo: true,      // Reverse the animation (yo-yo effect)
      transformOrigin: "center center",
    });
    gsap.from(typeRef.current, {
      delay:0,
      opacity:0,
      duration:2
    });
  })
  return (
    <>
    <div className='w-screen h-screen overflow-hidden'>
      <div className="h-screen w-screen flex">
        <div ref={typeRef} className="type flex-1 flex items-center justify-start text-8xl font-electolize text-gray-50 font-bold -my-10 px-4">
        <Typewriter
        words={['शक्ति Tracker', 'Predict Optimize Energize','Fuel Your Future With Smart Energy Tracking'
        ]}
        loop={true}
        cursor
        cursorStyle=""
        typeSpeed={80}
        deleteSpeed={60}
        delaySpeed={1000}
        />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div ref={thunderRef} className=''>
            <Thunder />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Homepage
