import { ref, reactive, computed } from 'vue';
import ValidationService from '../services/validationService';
import { generateReferenceNumber } from '../utils/helpers';

export function useFormValidation() {
  const errors = reactive({});
  const touched = reactive({});

  const validateField = (fieldName, value, validationType) => {
    let result;

    switch (validationType) {
      case 'name':
        result = ValidationService.validateName(value);
        break;
      case 'email':
        result = ValidationService.validateEmail(value);
        break;
      case 'phone':
        result = ValidationService.validatePhone(value);
        break;
      case 'street':
        result = ValidationService.validateStreet(value);
        break;
      case 'city':
        result = ValidationService.validateCity(value);
        break;
      case 'zip':
        result = ValidationService.validateZip(value);
        break;
      case 'date':
        result = ValidationService.validateDate(value);
        break;
      default:
        result = { isValid: true, error: null };
    }

    if (result.isValid) {
      delete errors[fieldName];
    } else {
      errors[fieldName] = result.error;
    }

    return result.isValid;
  };

  const markAsTouched = (fieldName) => {
    touched[fieldName] = true;
  };

  const isFieldValid = (fieldName) => {
    return !errors[fieldName];
  };

  const hasError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const getError = (fieldName) => {
    return hasError(fieldName) ? errors[fieldName] : '';
  };

  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key]);
    Object.keys(touched).forEach(key => delete touched[key]);
  };

  const isFormValid = computed(() => {
    return Object.keys(errors).length === 0;
  });

  return {
    errors,
    touched,
    validateField,
    markAsTouched,
    isFieldValid,
    hasError,
    getError,
    clearErrors,
    isFormValid
  };
}

export function useDonationForm() {
  const formData = reactive({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Address
    street: '',
    houseNumber: '',
    city: '',
    zipCode: '',
    
    // Pickup specific
    pickupDate: '',
    pickupTime: '',
    
    // Dropoff specific
    dropoffLocation: '',
    
    // Donation Details
    clothingTypes: [],
    sizes: [],
    genders: [],
    quality: '',
    quantity: '',
    notes: ''
  });

  const referenceNumber = ref('');

  const {
    errors,
    touched,
    validateField,
    markAsTouched,
    hasError,
    getError,
    clearErrors,
    isFormValid
  } = useFormValidation();

  const generateReference = () => {
    referenceNumber.value = generateReferenceNumber();
    return referenceNumber.value;
  };

  const resetForm = () => {
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key] = [];
      } else {
        formData[key] = '';
      }
    });
    clearErrors();
    referenceNumber.value = '';
  };

  const getFormData = () => {
    return {
      ...formData,
      referenceNumber: referenceNumber.value,
      submittedAt: new Date().toISOString()
    };
  };

  return {
    formData,
    referenceNumber,
    errors,
    touched,
    validateField,
    markAsTouched,
    hasError,
    getError,
    isFormValid,
    generateReference,
    resetForm,
    getFormData
  };
}
