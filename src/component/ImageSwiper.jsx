// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';
import './ImageSwiper.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Card from './Card';

export default function ImageSwiper() {
  return (
    <div className='swiper-container'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card image="../Nikhil.jpg" name="Nikhil Dadhich" description="Web Developer"/>
        </SwiperSlide>
        <SwiperSlide>
          <Card image="../Arth.jpg" name="Arth Parashar" description="Lead"/>
        </SwiperSlide>
        <SwiperSlide>
          <Card image="../Ravi.jpg" name="Ravi Kotadiya" description="ML Developer"/>
        </SwiperSlide>
        <SwiperSlide>
          <Card image="../Viswajeet.jpg" name="Vishwajeet Valse" description="Web Developer"/>
        </SwiperSlide>
        <SwiperSlide>
          <Card image="../Runya.jpg" name="Runya Masram" description="Design"/>
        </SwiperSlide>
        <SwiperSlide>
          <Card image="../Anirudh.jpg" name="Aniruddha Date" description="Design"/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
