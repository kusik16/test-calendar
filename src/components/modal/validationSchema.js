import * as Yup from 'yup';

const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	date: Yup.string().required('Date is required'),
});

export default validationSchema;
