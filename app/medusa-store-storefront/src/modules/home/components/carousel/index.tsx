'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ProductCollectionWithPreviews } from "types/global";
import Image from "next/image";

import adsBannerImage from '../../../../assets/home-carousel/ads-banner.jpeg'
import adsComputerBannerImage from '../../../../assets/home-carousel/ad-banner.png'
import netflixBannerImage from '../../../../assets/home-carousel/netflix-banner.jpeg'

// import { register } from 'swiper/element/bundle';

// register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = ({ collections }: {
  collections: ProductCollectionWithPreviews[]
}) => {
  // const LexArtProductsCollection = collections.find(col => col.handle === "merch");

  // const { products }: any = LexArtProductsCollection;

  const products = [
    { title: 'ads-smartphone-banner', thumbnail: adsBannerImage },
    { title: 'ads-computer-banner', thumbnail: adsComputerBannerImage },
    { title: 'netflix-banner', thumbnail: netflixBannerImage },
  ]
  // if (!products) {
  //   return null
  // }
  // console.log(products)

  return (
    <div className="h-[75vh] w-full relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center">

      <Swiper
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay, Navigation]}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation
        // pagination={{ type: 'fraction' }}
        className='h-full w-full'
      >
        { products.map((product: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <div className='flex h-full w-full items-center justify-center'>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  // width={400}
                  // height={400}
                />
              </div>
            </SwiperSlide>
          )
          })
        }
      </Swiper>

      </div>
    </div>
  )
}

export default Carousel
