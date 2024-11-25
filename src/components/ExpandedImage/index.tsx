/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';


interface PopupImageProps {
  imageUrl: string;
  altText: string;
  open: boolean
  setOpen: (value: boolean) => void
}

const PopupImage = ({ imageUrl, altText, open, setOpen }: PopupImageProps) => {

  const closeModal = () => {
    setOpen(false);
  };

  const handleDownload = () => {

    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  return (
    <div>
      <Modal className="custom-modal"  show={open} onRequestClose={closeModal}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '3rem' }}>
          <div style={{  display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '2rem'}}>
            <Button onClick={() => handleDownload()}>Download</Button>
            <Button onClick={closeModal}>X</Button>
          </div>
          <img style={{ width: 900, height: 600 }} src={imageUrl} alt={altText} />
        </div>
      </Modal>
    </div>
  );
};

export default PopupImage;
