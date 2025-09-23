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

  /**
   * The onChange function is called whenever a form input changes. It
   * takes in an event object as a parameter, and uses the event object
   * to get the name and value of the form input that changed.
   * 
   * If the form input has a name and the value is not undefined, it
   * updates the state of the form by creating a new state object and
   * calling setValues with the new state object.
   * 
   * It also updates the errors object by calling setErrors with an object
   * that has the same properties as the previous errors object, but with
   * the value of the field that changed set to undefined. This is done
   * to clear out any validation errors for the field when it changes.
   */
  const onChange = (event) => {
    const fieldName = event.target?.name;
    const fieldValue = event.target?.value;

    if (fieldName && fieldValue !== undefined) {
      // Create a new state object with the updated field value
      const newState = {
        ...values,
        [fieldName]: fieldValue,
      };

      // Update the state of the form
      setValues(newState);

      // Clear out any validation errors for the field
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: undefined,
      }));
    }
  };

  const onSubmit = async (event) => {
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

  /**
   * Submits the form data to the submit handler function.
   * If the form data is valid, calls the submit handler function with the form data.
   * If the submit handler function returns an error, sets the form error to the error message.
   * If the form data is invalid, logs a validation failed message.
   * If an unexpected error occurs, logs the error message and sets the form error to the error message.
   * Finally, sets the loading state to false.
   */
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
    submitForm,
    errors,
    setValues,
    loading
  };
}