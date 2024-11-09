import { useNavigate} from 'react-router-dom';
function Prediction() {
  const navigate = useNavigate();

  const handleSelection = (selection) => {
    if (selection === 'monthly') {
      navigate('/prediction/monthly');
    } else if (selection === 'daily') {
      navigate('/prediction/daily');
    }
  };
  return (
    <div className="h-screen w-screen bg-[#100C2A] text-white font-electolize font-bold text-4xl"> 
        <div className="absolute top-52 text-center w-screen">  
          <h1 className='text-amber-500'>Select Prediction Timeframe</h1>
          <p className='text-amber-500 py-4 text-center '>Please choose whether to predict for a specific day or month:</p>
          <div className="options flex gap-20 w-screen items-center justify-center">
            <button onClick={() => handleSelection('monthly')} className="option-button text-2xl rounded-md">
              Monthly Load Prediction
            </button>
            <button onClick={() => handleSelection('daily')} className="option-button text-2xl rounded-md">
              Daily Load Prediction
            </button>
          </div>
        </div>
    </div>
  )
}

export default Prediction
