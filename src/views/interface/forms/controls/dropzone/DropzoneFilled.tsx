import React from 'react';
import Dropzone, { defaultClassNames } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import DropzonePreview from '/src/components/dropzone/DropzonePreview';
import { apiUrl } from '../../../../../services/useAxios';

const DropzoneFilled = () => {
  const getUploadParams = () => ({ url: apiUrl + 'https://httpbin.org/post' });

  const onChangeStatus = (fileWithMeta, status) => {
    console.log(fileWithMeta);
    console.log(status);
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      PreviewComponent={DropzonePreview}
      submitButtonContent={null}
      accept="image/*"
      submitButtonDisabled
      SubmitButtonComponent={null}
      inputWithFilesContent={null}
      onChangeStatus={onChangeStatus}
      classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
      inputContent="Drop Files"
    />
  );
};

export default DropzoneFilled;
