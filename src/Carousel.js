import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
//added default props
 function Carousel({ photos = [], title= " " }) {//photos= an array of objects, where each object contains a src (URL of the image) and a caption & title= string describing the collection of images
  const [currCardIdx, setCurrCardIdx] = useState(0);//0 - is index. this state tracks it and what is being displayed

  const currCard = photos[currCardIdx];// DETERMINES WHICH IMAGE FROM THE PHOTOS ARRAY SHOULD BE CURRENTLY DISPLAYED
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }
  function goBackward() {
    if (currCardIdx > 0) {
      setCurrCardIdx(currCardIdx - 1);
    }
  }

  //BUG 1. NO FUNCTION TO NAVIGATE THE BACKWARD= THEREFORE BOTH ARROWS ARE TIED TOT HE GOFORWARD
  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {currCardIdx > 0 && ( 
        <i
          className="bi bi-arrow-left-circle"
          onClick={goBackward}
        />
     )}

        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
       {currCardIdx < total - 1 && ( 
        <i
          className="bi bi-arrow-right-circle"
          onClick={goForward}
        />
        )} 
      </div>
    </div>
  );
}

export default Carousel;
