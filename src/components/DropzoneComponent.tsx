import DropzonePreview from '@/components/dropzone/DropzonePreview';
import { notify } from '@/components/toast/NotificationIcon';
import api, { apiUrl } from '@/services/useAxios';
import { useRef } from 'react';
import Dropzone, { defaultClassNames, IFileWithMeta, StatusValue } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

interface DropzoneComponentProps {
  name: string;
  endpoint: string;
  placeholder?: string;
  onChange: (_name: string, _value: string) => void;
}

const DropzoneComponent = ({name, endpoint, placeholder, onChange}: DropzoneComponentProps) => {
  const uploaderRef = useRef(null);

  const handleChangeStatus = (file: IFileWithMeta, status: StatusValue) => {
    switch (status) {
      case 'done':
        onChange(name, file?.xhr?.response);
        break;
      case 'error_validation':
        file.remove();
        break;
      case 'rejected_file_type':
        notify('Tipo de arquivo inválido.', 'Erro', 'close', 'danger');
        break;
      case 'error_file_size':
        notify('Tamanho de arquivo excede o limite permitido.', 'Erro', 'close', 'danger');
        file.remove();
        break;
      case 'rejected_max_files':
        notify('Não é possível enviar mais de 1 arquivo!', 'Erro', 'close', 'danger');
        file.remove?.();
        break;
      case 'removed':
        onChange(name, '');
        file.xhr?.response && api.delete(endpoint, { data: { url: file.xhr.response } });
        if (!file?.xhr?.response || !file.xhr.response) return console.error('Erro ao salvar arquivo');
        if (!file.xhr.response[0]) return console.error('Erro ao salvar arquivo');
        break;
      case 'error_upload':
        notify('Erro ao enviar arquivo', 'Erro', 'close', 'danger');
        file.remove?.();
        break;
      default:
        break;
    }
  };

  const getUploadParams = () => ({
    url: apiUrl + endpoint,
  });

  return (
    <Dropzone
      ref={uploaderRef}
      submitButtonContent={null}
      onChangeStatus={handleChangeStatus}
      PreviewComponent={DropzonePreview}
      getUploadParams={getUploadParams}
      submitButtonDisabled
      maxFiles={1}
      accept="image/*, application/pdf"
      maxSizeBytes={16 * 1024 * 1024} // 16 MB
      inputWithFilesContent={null}
      classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
      inputContent={placeholder ? placeholder : "Clique aqui para selecionar o arquivo"}
    />
  );
};

export default DropzoneComponent;
