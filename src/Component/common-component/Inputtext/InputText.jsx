import { Field, ErrorMessage } from 'formik'
import style from '../Inputtext/controls.module.css';

const InputText = props => {
  const { label, name, ...rest } = props
  return (
    <div className='d-flex flex-column mb-1'>
      <label htmlFor={name} className={style.bold}>{label}</label>
      <Field
        id={name}
        className="form-control input"
        name={name}
        {...rest} />
      {/* <ErrorMessage component="div" name={name} className={style.control__input_error} /> */}
    </div>
  )
}

export default InputText;
