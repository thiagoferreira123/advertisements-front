import React from 'react';
import { Card } from 'react-bootstrap';
import Glide from '/src/components/carousel/Glide';

const CarouselBasic = () => {
  return (
    <Glide>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Glide.Item key={`basic.${i}`}>
          <Card className="mb-3">
            <Card.Img variant="top" src="/img/backgrounds-website/1.webp" alt="card image" />
            <Card.Body>
              <p className='text-center'>Aqui vai um checkbox</p>
            </Card.Body>
          </Card>
        </Glide.Item>
      ))}
    </Glide>
  );
};

export default CarouselBasic;
