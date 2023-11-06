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
  name: Yup.string().required('Program Name is required'),
  description: Yup.string().required('Description is required')
});

interface FormValues {
  name: string;
  description: Text;
}

function ProgramModal(props) {
  const { onClose, data, open } = props;

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
          console.log(data.id);
          if (!data.id)
            axios
              .post('/api/program', {
                ...values,
                created_at: new Date()
              })
              .then(async () => {
                onClose();
                successNotification('Successful.');
              })
              .catch((error) => console.log('*******err', error));
          else
            axios
              .put('/api/program', {
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
              <Field name="name">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Program Name"
                    fullWidth
                    margin="dense"
                    {...field}
                    error={Boolean(form.errors.name && form.touched.name)}
                    helperText={<ErrorMessage name="name" />}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="Description"
                    fullWidth
                    margin="dense"
                    multiline
                    rows={4}
                    {...field}
                    error={Boolean(
                      form.errors.description && form.touched.description
                    )}
                    helperText={<ErrorMessage name="description" />}
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

ProgramModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  data: PropTypes.object
};

export default ProgramModal;
