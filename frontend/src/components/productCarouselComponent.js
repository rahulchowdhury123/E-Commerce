import Carousel from 'react-bootstrap/Carousel';
import { LinkContainer } from 'react-router-bootstrap';



const ProductCarouselComponent=()=>{
    const dynamicStyles = {
        // width:'100%',
        height: '300px',
        objectFit:'cover',
      
        // Add more styles as needed
      };
    return (
        <Carousel>
        <Carousel.Item>
          <img crossOrigin='anonymous' className='d-block w-100' src="carousel/carousel-1.png" alt='Third slide' style={dynamicStyles}/>
          <Carousel.Caption>
            <LinkContainer to='/product-details/1' style={{cursor:'pointer'}}>
                  <h3>Best Seller in Laptop Category</h3>
            </LinkContainer>
            <p>Dell Inspiron 15 300 Laptop, 15.6 inch HD</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img className='d-block w-100' src="carousel/carousel-2.png" alt='Third slide' style={dynamicStyles}/>
          <Carousel.Caption>
          <LinkContainer to='/product-details/1' style={{cursor:'pointer'}}>
                  <h3>Best Seller in Book Category</h3>
            </LinkContainer>
            <p>World Of Eric Carle, Hear Bear Roar 30-Button Animal Sound Book </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img className='d-block w-100' src="carousel/carousel-3.png" alt='Third slide' style={dynamicStyles}/>
          <Carousel.Caption>
          <LinkContainer to='/product-details/1' style={{cursor:'pointer'}}>
                  <h3>Best Seller in Camera Category</h3>
            </LinkContainer>
            <p>4x Canvas Video Camera 60FPS 48MP</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}
export default ProductCarouselComponent