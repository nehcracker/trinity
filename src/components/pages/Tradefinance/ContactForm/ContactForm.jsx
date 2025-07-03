// ContactForm.jsx
import React, { useReducer } from "react";
import ProgressIndicator from "./ProgressIndicator";
import ServiceSelection from "./ServiceSelection";
import EssentialDetails from "./EssentialDetails";
import ReviewSubmit from "./ReviewSubmit";
import "./ContactForm.css";

const initialFormState = {
  // Step 1: Service Selection
  selectedServices: [],

  // Step 2: Essential Details
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  country: "",
  transactionAmount: "",
  currency: "USD",
  timeline: "",
  description: "",

  // Step 3: Additional fields
  termsAccepted: false,
  privacyAccepted: false,
  marketingOptIn: false,

  // Form state
  currentStep: 1,
  isSubmitting: false,
  errors: {},
  formSubmitted: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: null, // Clear error when field is updated
        },
      };
    case "UPDATE_SERVICES":
      return {
        ...state,
        selectedServices: action.services,
        errors: {
          ...state.errors,
          selectedServices: null,
        },
      };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case "PREV_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "START_SUBMIT":
      return {
        ...state,
        isSubmitting: true,
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        formSubmitted: true,
        currentStep: 3,
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        errors: {
          ...state.errors,
          form: action.errorMessage || "There was an error submitting the form. Please try again.",
        },
      };
    default:
      return state;
  }
}

function ContactForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const validateTransactionAmount = (selectedServices, transactionAmount) => {
    if (!transactionAmount || transactionAmount.trim() === "") {
      return "Transaction amount is required";
    }

    // Remove any non-numeric characters except decimal point
    const cleanAmount = transactionAmount.replace(/[^0-9.-]+/g, '');
    const amount = parseFloat(cleanAmount);

    if (isNaN(amount) || amount <= 0) {
      return "Please enter a valid transaction amount";
    }

    // Define service categories with their minimum amounts
    const lpoServices = [
      "LOCAL PURCHASE ORDER (LPO) FINANCING", 
      "contract financing",
      "lpo financing",
      "lpo-financing"
    ];
    
    const highValueServices = [
      "bank guarantee", 
      "trade finance", 
      "SBLC", 
      "LC",
      "standby letter of credit",
      "letter of credit"
    ];

    // Convert selected services to lowercase for comparison
    const selectedLower = selectedServices.map(s => s.toLowerCase());

    // Check for high-value services first (higher minimum)
    const hasHighValueService = highValueServices.some(service => 
      selectedLower.some(selected => selected.includes(service.toLowerCase()))
    );

    // Check for LPO services
    const hasLpoService = lpoServices.some(service => 
      selectedLower.some(selected => selected.includes(service.toLowerCase()))
    );

    if (hasHighValueService && amount < 1000000) {
      return "Bank guarantee, trade finance, SBLC, and LC require a minimum of $1,000,000 USD";
    }

    if (hasLpoService && amount < 100000) {
      return "LPO financing and contract financing require a minimum of $100,000 USD";
    }

    return null;
  };

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (formState.selectedServices.length === 0) {
        errors.selectedServices = "Please select at least one service";
      }
    } else if (step === 2) {
      // Basic field validation
      if (!formState.companyName.trim())
        errors.companyName = "Company name is required";
      if (!formState.contactPerson.trim())
        errors.contactPerson = "Contact person is required";
      
      // Email validation
      if (!formState.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
        errors.email = "Please enter a valid email address";
      }
      
      if (!formState.phone.trim()) errors.phone = "Phone number is required";
      if (!formState.country) errors.country = "Country is required";
      
      // Transaction amount validation with minimum amount checks
      const amountError = validateTransactionAmount(
        formState.selectedServices, 
        formState.transactionAmount
      );
      if (amountError) {
        errors.transactionAmount = amountError;
      }
      
      if (!formState.currency) errors.currency = "Currency is required";
      if (!formState.timeline) errors.timeline = "Timeline is required";
      if (!formState.description.trim())
        errors.description = "Description is required";
    } else if (step === 3) {
      if (!formState.termsAccepted)
        errors.termsAccepted = "You must accept the terms and conditions";
      if (!formState.privacyAccepted)
        errors.privacyAccepted = "You must acknowledge the privacy policy";
    }

    return errors;
  };

  const handleNextStep = () => {
    const errors = validateStep(formState.currentStep);

    if (Object.keys(errors).length === 0) {
      dispatch({ type: "NEXT_STEP" });
    } else {
      dispatch({ type: "SET_ERRORS", errors });
    }
  };

  const handlePrevStep = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateStep(3);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    dispatch({ type: "START_SUBMIT" });

    try {
      const response = await fetch(
        "https://email-server.nehlmac4.workers.dev/api/email/lpo-financing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        let errorMessage = "There was an error submitting the form. Please try again.";
        
        switch (response.status) {
          case 400:
            errorMessage = "Please check your form data and try again.";
            break;
          case 429:
            errorMessage = "Too many requests. Please wait a moment and try again.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          case 503:
            errorMessage = "Service temporarily unavailable. Please try again later.";
            break;
          default:
            errorMessage = `Server error (${response.status}). Please try again.`;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Form submission failed");
      }

      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (error) {
      console.error("Form submission error:", error.message);
      dispatch({ 
        type: "SUBMIT_ERROR", 
        errorMessage: error.message 
      });
    }
  };

  const renderStep = () => {
    switch (formState.currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedServices={formState.selectedServices}
            dispatch={dispatch}
            errors={formState.errors}
          />
        );
      case 2:
        return (
          <EssentialDetails
            formState={formState}
            dispatch={dispatch}
            errors={formState.errors}
          />
        );
      case 3:
        const onInputChange = (field, value) => {
          dispatch({ type: "UPDATE_FIELD", field, value });
        };
        return (
          <ReviewSubmit
            formData={formState}
            onSubmit={handleSubmit}
            isSubmitting={formState.isSubmitting}
            onBack={handlePrevStep}
            onInputChange={onInputChange}
          />
        );
      default:
        return null;
    }
  };

  // Always wrap the form in the scroll target section
  return (
    <section id="contact-form">
      {formState.formSubmitted ? (
        <div className="contact-form-container">
          <div className="success-screen" role="status" aria-live="polite">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h2>Thank You!</h2>
            <p>Your inquiry has been successfully submitted.</p>
            <p>
              One of our financial specialists will contact you within 24 hours.
            </p>
            <button
              className="primary-button"
              onClick={() => window.location.reload()}
              aria-label="Submit another inquiry"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <div className="contact-form-container">
          <form onSubmit={handleSubmit}>
            <ProgressIndicator
              currentStep={formState.currentStep}
              totalSteps={3}
            />

            <div className={`form-content ${formState.isSubmitting ? 'submitting' : ''}`}>
              {renderStep()}
            </div>

            <div className="form-navigation">
              {formState.currentStep > 1 && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handlePrevStep}
                  disabled={formState.isSubmitting}
                  aria-label="Go back to previous step"
                >
                  <span aria-hidden="true">←</span> Back
                </button>
              )}

              {formState.currentStep < 3 ? (
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleNextStep}
                  aria-label="Continue to next step"
                >
                  Continue <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className={`primary-button ${formState.isSubmitting ? 'loading' : ''}`}
                  disabled={formState.isSubmitting}
                  aria-label={formState.isSubmitting ? "Submitting form" : "Submit inquiry"}
                >
                  {formState.isSubmitting && (
                    <span className="loading-spinner" aria-hidden="true"></span>
                  )}
                  {formState.isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              )}
            </div>

            {formState.errors.form && (
              <div 
                className="form-error" 
                role="alert"
                aria-live="polite"
              >
                {formState.errors.form}
              </div>
            )}
          </form>
        </div>
      )}
    </section>
  );
}

export default ContactForm;