import React from 'react';
import { Field } from 'redux-form';
import ReactQuill from 'react-quill';

 class renderQuill extends React.Component({ input }) {
  return (
    <ReactQuill
      {...input}
      onChange={(newValue, delta, source) => {
        if (source === 'user') {
          input.onChange(newValue);
        }
      }}
      onBlur={(range, source, quill) => {
        input.onBlur(quill.getHTML());
      }}
    />
  );
}
export default renderQuill;
