import * as yup from 'yup';

export const articleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  status: yup.string().required(),
  topic_id: yup.string().nullable().required(),
  content_creator_id: yup.string().nullable().required(),
});
