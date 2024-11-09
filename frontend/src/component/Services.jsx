import ServicesChart from '../charts/ServicesChart';

function Services() {
  return (
    <>
      <div className="h-screen w-screen bg-[#100C2A] font-electolize font-bold">
        <div className="flex flex-col items-center justify-start h-full">
          <div className="mt-24 gap-10">
            <h3 className="text-white text-3xl">UPCOMING FEATURE</h3>
          </div>
          {/* Chart container */}
          <div className="flex-grow flex items-center justify-center ">
            <ServicesChart />
          </div>
        </div>
      </div>
    </>

  )
}

export default Services
