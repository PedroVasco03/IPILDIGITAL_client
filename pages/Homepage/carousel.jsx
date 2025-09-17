import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import CarouselItem1 from "./carousel-Items/carouselItem"
import CarouselItem2 from "./carousel-Items/carouselItem2"
import CarouselItem3 from "./carousel-Items/carouselItem3"

export default function CarouselComponent() {
  return (
    <Swiper spaceBetween={50} slidesPerView={1} loop autoplay>
      <SwiperSlide><CarouselItem1 title="Bem vindo ao IPILDIGITAL" /></SwiperSlide>
      <SwiperSlide><CarouselItem2 title="Bem vindo ao IPILDIGITAL" /></SwiperSlide>
      <SwiperSlide><CarouselItem3 title="Bem vindo ao IPILDIGITAL" /></SwiperSlide>
    </Swiper>
  )
}
