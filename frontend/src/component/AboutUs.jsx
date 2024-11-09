// AboutUs.js
import "./AboutUs.css";
import ImageSwiper from "./ImageSwiper";

function AboutUs() {
  return (
    <>
      <div className="min-h-screen w-screen bg-[#100C2A] text-white font-electolize">
        <div className="flex flex-col items-center w-full py-20">
          <p className="text-5xl text-center text-amber-300 font-extrabold">
            Empowering Smart Energy Management
          </p>
          <div className="p-4 w-full">
            <div className="flex justify-around items-stretch py-4 gap-5">
              <div className="bg-[#28223F] p-4 rounded-md flex-1 flex flex-col">
                <h1 className="text-4xl text-center text-amber-500 py-1">
                  OUR STORY
                </h1>
                <p className="text-2xl">
                  Shakti Tracker was born from a vision to optimize energy
                  consumption using advanced technology. We provide accurate
                  insights to manage electricity usage efficiently.
                </p>
              </div>
              <div className="bg-[#28223F] p-4 rounded-md flex-1 flex flex-col">
                <h1 className="text-4xl text-center text-amber-500 py-1">
                  TECHNOLOGY & FEATURES
                </h1>
                <p className="text-2xl">
                  <ul>- Real-time data processing</ul>
                  <ul>- Predictive analytics for peak demand</ul>
                  <ul>- User-friendly interface</ul>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden bg-[#28223F] p-4 rounded-md">
  <h1 className="text-4xl text-center  text-amber-500 font-electolize font-light -mb-16">TEAM</h1>
  <ImageSwiper />
</div>

          <div className="p-4 w-full">
            <div className="flex justify-around items-stretch py-4 gap-5">
              <div className="bg-[#28223F] p-4 rounded-md flex-1 flex flex-col">
                <h1 className="text-4xl text-center text-amber-500 py-1">
                  IMPACT
                </h1>
                <p className="text-2xl text-wrap">
                  Our mission is to empower individuals, businesses, and
                  communities to take control of their energy consumption. By
                  offering insightful data and actionable recommendations, we
                  enable users to optimize their energy usage, minimize
                  operational costs, and significantly reduce their
                  environmental footprint—ultimately contributing to a more
                  sustainable and eco-friendly future for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
