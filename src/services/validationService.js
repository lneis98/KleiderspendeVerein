import CONFIG from '../utils/constants';

class ValidationService {
  static validateName(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Name ist erforderlich' };
    }
    
    if (value.trim().length < CONFIG.MIN_NAME_LENGTH) {
      return { 
        isValid: false, 
        error: `Name muss mindestens ${CONFIG.MIN_NAME_LENGTH} Zeichen lang sein` 
      };
    }
    
    if (value.length > CONFIG.MAX_NAME_LENGTH) {
      return { 
        isValid: false, 
        error: `Name darf maximal ${CONFIG.MAX_NAME_LENGTH} Zeichen lang sein` 
      };
    }
    
    return { isValid: true, error: null };
  }

  static validateEmail(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'E-Mail ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.EMAIL.test(value)) {
      return { isValid: false, error: 'Ungültige E-Mail-Adresse' };
    }
    
    return { isValid: true, error: null };
  }

  static validatePhone(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Telefonnummer ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.PHONE.test(value)) {
      return { isValid: false, error: 'Ungültige Telefonnummer' };
    }
    
    const digits = value.replace(/\D/g, '');
    if (digits.length < CONFIG.MIN_PHONE_DIGITS) {
      return { 
        isValid: false, 
        error: `Telefonnummer muss mindestens ${CONFIG.MIN_PHONE_DIGITS} Ziffern enthalten` 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate street address
   * @param {string} value - Street to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateStreet(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Straße ist erforderlich' };
    }
    
    if (value.trim().length < CONFIG.MIN_STREET_LENGTH) {
      return { 
        isValid: false, 
        error: `Straße muss mindestens ${CONFIG.MIN_STREET_LENGTH} Zeichen lang sein` 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate city
   * @param {string} value - City to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateCity(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Stadt ist erforderlich' };
    }
    
    if (value.trim().length < CONFIG.MIN_CITY_LENGTH) {
      return { 
        isValid: false, 
        error: `Stadt muss mindestens ${CONFIG.MIN_CITY_LENGTH} Zeichen lang sein` 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate ZIP code
   * @param {string} value - ZIP code to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateZip(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Postleitzahl ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.ZIP_CODE.test(value)) {
      return { isValid: false, error: 'Ungültige Postleitzahl' };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate date (must be in the future)
   * @param {string} value - Date to validate (YYYY-MM-DD format)
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateDate(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Datum ist erforderlich' };
    }
    
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return { isValid: false, error: 'Datum muss in der Zukunft liegen' };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate reference number
   * @param {string} value - Reference number to validate
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateReferenceNumber(value) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Referenznummer ist erforderlich' };
    }
    
    if (!CONFIG.PATTERNS.REFERENCE_NUMBER.test(value)) {
      return { 
        isValid: false, 
        error: 'Ungültige Referenznummer (Format: KS + 10 Ziffern)' 
      };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate that at least one item is selected
   * @param {Array} items - Array of selected items
   * @returns {Object} - { isValid: boolean, error: string }
   */
  static validateSelection(items) {
    if (!items || items.length === 0) {
      return { isValid: false, error: 'Bitte wählen Sie mindestens eine Option' };
    }
    
    return { isValid: true, error: null };
  }

  /**
   * Validate entire form object
   * @param {Object} formData - Form data object
   * @param {Array} requiredFields - Array of required field names
   * @returns {Object} - { isValid: boolean, errors: Object }
   */
  static validateForm(formData, requiredFields) {
    const errors = {};
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim().length === 0) {
        errors[field] = 'Dieses Feld ist erforderlich';
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default ValidationService;
