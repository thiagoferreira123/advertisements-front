import 'react-dropzone-uploader/dist/styles.css';
import { useRef, useCallback } from 'react';
import Dropzone, { defaultClassNames, IFileWithMeta, StatusValue } from 'react-dropzone-uploader';

import DropzonePreview from '../components/dropzone/DropzonePreview';
import { notify } from '../components/toast/NotificationIcon';
import api, { apiUrl } from '../services/useAxios';

interface MultipleDropzoneComponentProps {
  endpoint: string;
  placeholder?: string;
  maxFiles?: number;
  accept?: string;
  maxSizeBytes?: number;
  className?: string;
  onChange: (_value: IFileWithMeta[]) => void; // Alterado para retornar IFileWithMeta[]
  onRemove?: (response: string) => void;
}

const MultipleDropzoneComponent = (
  ({ endpoint, placeholder, maxFiles = 20, accept = 'image/*', maxSizeBytes = 16 * 1024 * 1024, className, onChange, onRemove }: MultipleDropzoneComponentProps) => {
    const dropzoneRef = useRef<Dropzone>(null);
    const filesRef = useRef<IFileWithMeta[]>([]);

    // Function to handle changes in file status
    const handleChangeStatus = useCallback(
      (file: IFileWithMeta, status: StatusValue, allFiles: IFileWithMeta[]) => {
        // Set the current files in the ref
        filesRef.current = allFiles;

        // Notify parent with the updated files, sending all files
        onChange(allFiles); // Agora retorna todos os arquivos IFileWithMeta[]

        // Handle specific statuses for error messages or file removal
        switch (status) {
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
            notify(`Não é possível enviar mais de ${maxFiles} arquivos!`, 'Erro', 'close', 'danger');
            file.remove();
            break;
          case 'removed':
            if (file.xhr?.response) {
              api.delete(endpoint, { data: { url: file.xhr.response } });
              onRemove?.(file.xhr.response); // Notify the parent that a file was removed
            } else {
              console.error('Erro ao remover arquivo');
            }
            break;
          case 'error_upload':
            notify('Erro ao enviar arquivo', 'Erro', 'close', 'danger');
            file.remove();
            break;
          default:
            break;
        }
      },
      [endpoint, maxFiles, onChange, onRemove]
    );

    const getUploadParams = () => ({
      url: apiUrl + endpoint,
    });

    return (
      <Dropzone
        ref={dropzoneRef}
        submitButtonContent={null}
        onChangeStatus={handleChangeStatus} // Handle status changes here
        PreviewComponent={DropzonePreview}
        getUploadParams={getUploadParams}
        submitButtonDisabled
        maxFiles={maxFiles}
        accept={accept}
        maxSizeBytes={maxSizeBytes}
        inputWithFilesContent={null}
        classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
        inputContent={
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            Clique aqui para <br /> selecionar os arquivos
          </div>
        }
      />
    );
  }
);

export default MultipleDropzoneComponent;
