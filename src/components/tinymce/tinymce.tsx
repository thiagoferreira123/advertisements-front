import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Tinymce() {
  return (
    <Editor
      apiKey='bef3ulc00yrfvjjiawm3xjxj41r1k2kl33t9zlo8ek3s1rpg'
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media | table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        table: {
          title: 'Table',
          items: 'inserttable | cell row column | advtablesort | tableprops deletetable'
        },
        language: 'pt_BR',
      }}
    />
  );
}
