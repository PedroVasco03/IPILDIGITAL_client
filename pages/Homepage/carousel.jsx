import { useState } from "react";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import { motion } from "framer-motion";
import style from "../css/carousel.module.css";
import CarouselItem1 from "./carousel-Items/carouselItem";
import CarouselItem2 from "./carousel-Items/carouselItem2";
import CarouselItem3 from "./carousel-Items/carouselItem3";

const items = [
  {
    src: <CarouselItem1 title="Bem vindo ao IPILDIGITAL" />,
    key: 1,
  },
  {
    src: <CarouselItem2 title="Bem vindo ao IPILDIGITAL" />,
    key: 2,
  },
  {
    src: <CarouselItem3 title="Bem vindo ao IPILDIGITAL" />,
    key: 3,
  },
];

const CarouselComponent = () => {
  const [activeIndex, setAtiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setAtiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setAtiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setAtiveIndex(newIndex);
  };

  const slide = items.map((item) => {
    return (
      <CarouselItem
        key={item.key}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        {item.src}
      </CarouselItem>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // antes de aparecer
      animate={{ opacity: 1, y: 0 }} // entra deslizando pra cima
      transition={{ duration: 0.8 }}
    >
      <Carousel
        className={style.carousel}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        {slide}
        <CarouselControl
          direction="prev"
          directionText="previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </motion.div>
  );
};

export default CarouselComponent;
