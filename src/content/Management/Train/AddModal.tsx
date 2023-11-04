import PropTypes from 'prop-types';
import axios from 'axios';
import {
  TextField,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Button
} from '@mui/material';
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { successNotification } from '@/utils/notification';
const validationSchema = Yup.object().shape({
  module_num: Yup.string().required('Module Number is required'),
  session_title: Yup.string().required('Session Title is required'),
  video_link: Yup.string().required('Video Link is required'),
  doc_link: Yup.string().required('Doc Link is required')
});

interface FormValues {
  module_num: string;
  session_title: string;
  video_link: string;
  doc_link: string;
}

function AddModal(props) {
  const { onClose, data, open, id } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{data.id ? 'Edit' : 'Add'}</DialogTitle>
      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, { setSubmitting }) => {
          // Handle form submission
          if (!data.id)
            axios
              .post('/api/train/data', {
                ...values,
                program_id: id,
                status: 'pending',
                created_at: new Date()
              })
              .then(async () => {
                onClose();
                successNotification('Successful.');
              })
              .catch((error) => console.log('*******err', error));
          else
            axios
              .put('/api/train/data', {
                ...values,
                updated_at: new Date()
              })
              .then(async () => {
                onClose();
                successNotification('Successful.');
              })
              .catch((error) => console.log('*******err', error));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent dividers>
              <Field name="module_num">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Module Number"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.module_num && form.touched.module_num
                    )}
                    helperText={<ErrorMessage name="module_num" />}
                  />
                )}
              </Field>
              <Field name="session_title">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Session Title"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.session_title && form.touched.session_title
                    )}
                    helperText={<ErrorMessage name="session_title" />}
                  />
                )}
              </Field>
              <Field name="video_link">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Video Link"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.video_link && form.touched.video_link
                    )}
                    helperText={<ErrorMessage name="video_link" />}
                  />
                )}
              </Field>
              <Field name="doc_link">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Doc Link"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.doc_link && form.touched.doc_link
                    )}
                    helperText={<ErrorMessage name="doc_link" />}
                  />
                )}
              </Field>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                Ok
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

AddModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  data: PropTypes.object,
  id: PropTypes.string
};

export default AddModal;
