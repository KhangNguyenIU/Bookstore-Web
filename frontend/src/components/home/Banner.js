import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import {GOOGLE} from '../../react.env'
const items = [
  {
    //src: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80',
    src: "/img/banner1.jpg",
    altText: 'Your world of words',
    caption: "Your world of words"
  },
  {
    src: 'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/home-6-slider-image-1b.jpg',
    altText: 'Slide 2',
    caption: 'Your world of words'
  },
  {
    src: 'https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    altText: 'Slide 3',
    caption: 'Your world of words'
  }
];

const Banner = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        {/* <img src={item.src} alt={item.altText} style={{ width: '100%', height: '25rem' }} /> */}
        <div style={{ backgroundImage: `url(${item.src})`, height: "450px", width: '100%' }}>
          <div className="s-flex flex-column text-center justify-content-center align-items-center"
            style={{ paddingTop: '7rem' }}>
            <p className="banner-title">{item.caption}</p>
            <div style={{ margin: '0px auto', maxWidth: "600px" }}>
              <p className="banner-content">Explore the most valuable source of books that we will bring you to your imaginary world</p>
            </div>
            <Button
              variant="contained"
              //color="primary"
              style={{
                backgroundColor: "#ec524b",
                color: 'white',
                padding: "15px 25px",
                marginTop: '1rem',
                marginBottom: '1rem',
                borderRadius: '0px'
              }}
            >
              Read More
              </Button>
          </div>
        </div>
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} style={{ color: 'black' }} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Banner;