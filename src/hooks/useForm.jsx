import { useState } from "react";

/**
 * useForm is a custom React hook which provides a convenient way to manage state
 * and validation for forms. It takes in three parameters: a submitHandler
 * function which is called when the form is submitted, an initialValues object
 * which is used as the initial state for the form, and a validatorSettings object
 * which defines the validation rules for the form.
 * 
 * The useForm hook returns an object with five properties: values, onChange,
 * onSubmit, errors, and setValues. The values property is an object which
 * contains the current state of the form, the onChange property is a function
 * which is used to update the state when a form input is changed, the onSubmit
 * property is a function which is used to handle form submission, the errors
 * property is an object which contains any validation errors, and the setValues
 * property is a function which is used to update the state of the form.
 * 
 * The useForm hook also defines a validate function which is used to validate
 * the form when it is submitted. The validate function checks each field in the
 * form against the validation rules defined in the validatorSettings object.
 * If any of the fields fail validation, the validate function returns false
 * and the errors object is updated to contain the validation errors. If all of
 * the fields pass validation, the validate function returns true and the errors
 * object is cleared.
 * 
 * The useForm hook is a convenient way to manage state and validation for
 * forms in React applications. It provides a simple and declarative way to
 * define the validation rules for a form, and it automatically handles the
 * updating of the state and validation of the form when the user interacts with
 * it.
 * @param {function} submitHandler The function that is called when the form is submitted.
 * @param {object} initialValues An object which is used as the initial state for the form.
 * @param {object} validatorSettings An object which defines the validation rules for the form.
 * @returns {object} An object with five properties: values, onChange, onSubmit, errors, and setValues.
 */
export default function useForm(submitHandler, initialValues, validatorSettings) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!validatorSettings) {
      return true;
    }

    let validationErrors = {};

    Object.keys(validatorSettings || {}).forEach((fieldName) => {
      const errorMessage = validatorSettings[fieldName] && validatorSettings[fieldName](values[fieldName]);
      if (errorMessage) {
        validationErrors[fieldName] = errorMessage;
      } else {
        validationErrors[fieldName] = '';
      }
    });

    setErrors(validationErrors);
    return Object.values(validationErrors).every((error) => !error);
  };

  const onChange = (event) => {
    const fieldName = event.target?.name;
    const fieldValue = event.target?.value;

    if (fieldName && fieldValue !== undefined) {
      const newState = {
        ...values,
        [fieldName]: fieldValue,
      };

      setValues(newState);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: undefined,
      }));
    }
  };

  // Променена onSubmit функция за да приема опционален event
  const onSubmit = async (event) => {
    // Ако е подаден event, предотвратяваме default поведението
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    try {
      setLoading(true);
      const isValid = validate();
      
      if (isValid) {
        const result = await submitHandler?.(values);
        
        if (result && !result.success) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            form: result.error,
          }));
          console.error("Submit Handler Status - ❌:", result);
        } else {
          console.log("Submit Handler Status - ✅!");
        }
      } else {
        console.log('Validation failed');
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrors({ form: error?.message });
    } finally {
      setLoading(false);
    }
  };

  // Нова функция за директно извикване без event
  const submitForm = async () => {
    try {
      setLoading(true);
      const isValid = validate();
      
      if (isValid) {
        const result = await submitHandler?.(values);
        
        if (result && !result.success) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            form: result.error,
          }));
          console.error("Submit Handler Status - ❌:", result);
        } else {
          console.log("Submit Handler Status - ✅!");
        }
      } else {
        console.log('Validation failed');
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrors({ form: error?.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    onChange,
    onSubmit,
    submitForm, // Нова функция
    errors,
    setValues,
    loading // Добавяме loading state
  };
}