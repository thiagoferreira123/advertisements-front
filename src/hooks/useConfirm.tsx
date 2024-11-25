/* eslint-disable no-unused-vars */
// import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface UseConfirmOptions {
  title: string;
  description: string;
  onCancel: () => void;
  onOk: () => void;
}

interface UseConfirmReturn {
  confirm: (options: UseConfirmOptions) => void;
  handleClose: () => void;
  ConfirmModalComponent: React.ReactElement | null;
}

const useConfirm = (): UseConfirmReturn => {
  const [options, setOptions] = useState<UseConfirmOptions | null>(null);

  const handleClose = () => {
    setOptions(null);
  };

  const confirm = (options: UseConfirmOptions) => {
    setOptions(options);
  };

  return {
    confirm,
    handleClose,
    ConfirmModalComponent: options ? (
      <Modal centered show={!!options} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{options.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center d-flex flex-column gap-2 align-items-center justify-content-center">
          {/* <CsLineIcons width={30} height={30} icon="message" /> */}
          {options.description}
        </Modal.Body>
        <div className="d-flex align-items-center justify-content-center mt-3 gap-2 pb-4">
          <Button variant="outline-secondary" onClick={options.onCancel}>
            Cancelar
          </Button>
          <Button onClick={options.onOk} variant="primary">
            Confirmar
          </Button>
        </div>
      </Modal>
    ) : null,
  };
};

export default useConfirm;
