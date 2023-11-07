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
  over_goal: Yup.string().required('Overall goal is required'),
  learn_obj: Yup.string().required('Learning objectives is required'),
  video_litmos: Yup.string(),
  video_train: Yup.string(),
  video_implement: Yup.string(),
  doc_link: Yup.string()
});

interface FormValues {
  module_num: string;
  session_title: string;
  over_goal: string;
  learn_obj: string;
  video_litmos: string;
  video_train: string;
  video_implement: string;
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
              .post('/api/data', {
                ...values,
                program_id: id,
                created_at: new Date()
              })
              .then(async () => {
                onClose();
                successNotification('Successful.');
              })
              .catch((error) => console.log('*******err', error));
          else
            axios
              .put('/api/data', {
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
              <Field name="over_goal">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Overall goal"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.over_goal && form.touched.over_goal
                    )}
                    helperText={<ErrorMessage name="over_goal" />}
                  />
                )}
              </Field>
              <Field name="learn_obj">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Learning objectives"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.learn_obj && form.touched.learn_obj
                    )}
                    helperText={<ErrorMessage name="learn_obj" />}
                  />
                )}
              </Field>
              <Field name="video_litmos">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Video File - Litmos"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.video_litmos && form.touched.video_litmos
                    )}
                    helperText={<ErrorMessage name="video_litmos" />}
                  />
                )}
              </Field>
              <Field name="video_train">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Video File - Litmos (Training)"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.video_train && form.touched.video_train
                    )}
                    helperText={<ErrorMessage name="video_train" />}
                  />
                )}
              </Field>
              <Field name="video_implement">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Video File - Litmos (Implementation)"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(
                      form.errors.video_implement &&
                        form.touched.video_implement
                    )}
                    helperText={<ErrorMessage name="video_implement" />}
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
