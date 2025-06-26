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
          form: "There was an error submitting the form. Please try again.",
        },
      };
    default:
      return state;
  }
}

function ContactForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (formState.selectedServices.length === 0) {
        errors.selectedServices = "Please select at least one service";
      }
    } else if (step === 2) {
      if (!formState.companyName.trim())
        errors.companyName = "Company name is required";
      if (!formState.contactPerson.trim())
        errors.contactPerson = "Contact person is required";
      if (!formState.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formState.email))
        errors.email = "Email is invalid";
      if (!formState.phone.trim()) errors.phone = "Phone number is required";
      if (!formState.country) errors.country = "Country is required";
      if (!formState.transactionAmount)
        errors.transactionAmount = "Transaction amount is required";
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
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Unknown error");
      }

      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (error) {
      console.error("Form submission error:", error.message);
      dispatch({ type: "SUBMIT_ERROR" });
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
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>Your inquiry has been successfully submitted.</p>
            <p>
              One of our financial specialists will contact you within 24 hours.
            </p>
            <button
              className="primary-button"
              onClick={() => window.location.reload()}
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

            <div className="form-content">{renderStep()}</div>

            <div className="form-navigation">
              {formState.currentStep > 1 && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handlePrevStep}
                  disabled={formState.isSubmitting}
                >
                  Back
                </button>
              )}

              {formState.currentStep < 3 ? (
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleNextStep}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="primary-button"
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              )}
            </div>

            {formState.errors.form && (
              <div className="form-error">{formState.errors.form}</div>
            )}
          </form>
        </div>
      )}
    </section>
  );
}

export default ContactForm;
