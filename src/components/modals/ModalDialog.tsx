import CsLineIcons from '/src/cs-line-icons/CsLineIcons';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface ModalDialogProps {
  title: string;
  placeholder: string;
  label: string;

  icon: string;

  confirmText: string;
  cancelText: string;

  ref: React.Ref<unknown>;
}

export interface ModalDialogRef {
  showQuestion: <T>() => Promise<T>;
}

const ModalDialog = forwardRef((props: ModalDialogProps, ref: React.Ref<unknown> | undefined) => {
  const [show, setShow] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [resolve, setResolve] = React.useState<(value: unknown) => void>(() => {});

  const [value, setValue] = React.useState('');

  const showQuestion = () => {
    return new Promise((resolve) => {
      setShow(true);
      setResolve(() => resolve);
    });
  };

  const handleAccept = async () => {
    resolve && resolve(value);
    setShow(false);
    setValue('');
  };

  const handleDeny = async () => {
    resolve && resolve(false);
    setShow(false);
    setValue('');
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    showQuestion,
  }));

  return (
    <Modal className="modal-right large" show={show} onHide={handleDeny}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>{props.label}</label>
        <div className="mb-3 filled mt-2">
          <CsLineIcons icon={props.icon} />
          <Form.Control value={value} onChange={handleChangeValue} type="text" placeholder={props.placeholder} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleAccept} type="button" className="mb-1 btn btn-primary">
          {props.confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ModalDialog;
