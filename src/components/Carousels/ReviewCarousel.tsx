import Slider, { Settings as SliderSettings } from "react-slick";
import ReviewCard from "@/components/Cards/ReviewCard";
import React from "react";
import "slick-carousel/slick/slick.css";

interface ReviewCarouselProps {
  reviews: any;
}

const ReviewCarousel = ({ reviews }: ReviewCarouselProps) => {
  const [activeCarousel, setActiveCarousel] = React.useState(0);

  const SliderConfig: SliderSettings = {
    dots: false,
    speed: 700,
    autoplay: true,
    cssEase: "linear",
    slidesToShow: 1,
    centerMode: true,
    infinite: true,
    variableWidth: true,
    adaptiveHeight: true,
    centerPadding: "20px",
    arrows: false,
    draggable: true
  };

  return (
    <div style={{ width: "100%" }}>
      <Slider
        afterChange={(slide: number) => setActiveCarousel(slide)}
        {...SliderConfig}
      >
        {/*{reviews?.map((item, idx) => (*/}
        {/*  <>*/}
        {/*    <div style={{ margin: "0 30px" }}>*/}
        {/*      <ReviewCard isActive={activeCarousel === idx} review={item} />*/}
        {/*    </div>*/}
        {/*  </>*/}
        {/*))}*/}
      </Slider>
      <br />
      <br />
    </div>
  );
};

export default ReviewCarousel;