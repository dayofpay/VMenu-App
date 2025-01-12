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

  /**
   * This function is used to validate the form when it is submitted. It checks
   * each field in the form against the validation rules defined in the
   * validatorSettings object. If any of the fields fail validation, the
   * validate function returns false and the errors object is updated to
   * contain the validation errors. If all of the fields pass validation, the
   * validate function returns true and the errors object is cleared.
   * @returns {boolean} True if the form is valid, false if it is not.
   */
  const validate = () => {
    if (!validatorSettings) {
      return true; // if there is no special validation settings, return true
    }

    let validationErrors = {};

    /**
     * Loop through each field in the form and check it against the validation
     * rules defined in the validatorSettings object. If any of the fields fail
     * validation, update the validationErrors object with the error messages.
     */
    Object.keys(validatorSettings || {}).forEach((fieldName) => {
      const errorMessage = validatorSettings[fieldName] && validatorSettings[fieldName](values[fieldName]);
      if (errorMessage) {
        validationErrors[fieldName] = errorMessage;
      } else {
        validationErrors[fieldName] = '';
      }
    });

    /**
     * Update the errors object with the validation errors. If there are no errors,
     * clear the errors object.
     */
    setErrors(validationErrors);
    return Object.values(validationErrors).every((error) => !error);
  };

  /**
   * This function is used to update the state of the form when a form input is
   * changed. It takes in an event object as a parameter, which is the event
   * object passed to the onChange event handler by React.
   * @param {object} event The event object passed to the onChange event handler.
   * @returns {void} Does not return a value.
   */
  const onChange = (event) => {
    const fieldName = event.target?.name;
    const fieldValue = event.target?.value;

    /**
     * If the event object has a name and value property, update the state of
     * the form with the new value.
     */
    if (fieldName && fieldValue !== undefined) {
      /**
       * Create a new state object with the updated value.
       */
      const newState = {
        ...values,
        [fieldName]: fieldValue,
      };

      /**
       * Update the state with the new state object.
       */
      setValues(newState);

      /**
       * Clear the error message for the field that was just updated.
       */
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: undefined,
      }));
    }
  };

  /**
   * This function is used to handle form submission. It takes in an event object
   * as a parameter, which is the event object passed to the onSubmit event
   * handler by React.
   * @param {object} event The event object passed to the onSubmit event handler.
   */
  const onSubmit = async (event) => {
    event?.preventDefault();

    /**
     * Call the validate function to validate the form. If the form is invalid,
     * do not call the submitHandler function.
     */
    try {
      const isValid = validate();
      if (isValid) {
        /**
         * Call the submitHandler function with the state of the form as an
         * argument.
         */
        const result = await submitHandler?.(values);

        /**
         * If the submitHandler function returns an object with a success
         * property that is false, update the errors object with the error
         * message.
         */
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
    }
  };

  return {
    values,
    onChange,
    onSubmit,
    errors,
    setValues,
  };
}

