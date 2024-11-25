import React, { forwardRef, useImperativeHandle } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ModalQuestionProps {
  title: string;
  message: string;

  confirmText: string;
  cancelText: string;

  ref: React.Ref<unknown>;
}

export interface ModalQuestionRef {
  showQuestion: () => Promise<boolean>;
}

const ModalQuestion = forwardRef((props: ModalQuestionProps, ref: React.Ref<unknown> | undefined) => {

  const [show, setShow] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [resolve, setResolve] = React.useState<(value: boolean) => void>(() => { });

  const showQuestion = () => {
    return new Promise<boolean>((resolve) => {
      setShow(true);
      setResolve(() => resolve);
    });
  }

  const handleAccept = async () => {
    resolve && resolve(true);
    setShow(false);
  }

  const handleDeny = async () => {
    resolve && resolve(false);
    setShow(false);
  }

  useImperativeHandle(ref, () => ({
    showQuestion,
  }));


  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">

        {props.message}

        <div className="d-flex justify-content-center mt-3 gap-2">
          <Button onClick={handleAccept} type="button" className="mb-1 btn btn-primary">
            {props.confirmText}
          </Button>
          <Button variant='secondary' onClick={handleDeny} type="button" className="mb-1 btn btn-primary">
            {props.cancelText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ModalQuestion;
