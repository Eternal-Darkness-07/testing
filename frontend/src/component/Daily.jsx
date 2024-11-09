
function Daily() {
  return (
    <>
      <div className="h-screen w-screen bg-[#100C2A] text-white font-electolize font-bold text-4xl"> 
        <div className="absolute top-52 text-center w-screen">  
          <h1 className='text-amber-500 text-6xl'>Todays Predicted Peak Value is</h1>
          <div className="flex gap-20 w-screen items-center justify-center">
            <button disabled className="my-8 text-4xl rounded-md cursor-text bg-red-600 hover:bg-red-600">
              Max 4.682 GW 
            </button>
          </div>
        </div>
    </div>
    </>
  )
}

export default Daily
