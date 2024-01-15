import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

//smoke test
it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} title="Test Carousel"/>);
});

//Snapshot test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

//BE CAREFUL: the currCardIdx goes out of the bounds of the photos array, possibly due to the goForward function incrementing currCardIdx beyond the length of the photos array.

//
test('left arrow should go to the previous image', () => {
  const photos = 
  [{ 
    src: 'image1.jpg', 
    caption: 'Image 1' }, 
    { 
      src: 'image2.jpg', 
      caption: 'Image 2' 
    }];

    const { getByAltText, container } = render(
     <Carousel 
      photos={photos} 
      title="Test Carousel" 
    />
  );

  const rightArrow = container.querySelector('.bi-arrow-right-circle');
    // Go to the second image
    fireEvent.click(rightArrow);

    //THE PLACEMENT OF 70 IS KEY.  IT NEEDS TO GO AFTER THE RIGHT ARROW CLICK, COULD ALSO ADD IF (leftArrow), and then else
  const leftArrow = container.querySelector('.bi-arrow-left-circle');

  // Expect the second image to be displayed
  let imageDisplayed = getByAltText('Image 2');
  expect(imageDisplayed).toBeInTheDocument();

  // Now go back to the first image
  fireEvent.click(leftArrow);

  // Check if the first image is displayed again
  imageDisplayed = getByAltText('Image 1');
  expect(imageDisplayed).toBeInTheDocument();
});