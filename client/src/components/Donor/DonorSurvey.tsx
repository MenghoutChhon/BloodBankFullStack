import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { submitSurvey } from "../../services/surveyService";
import { useAuthContext } from "../../contexts/AuthContext";
import "./DonorSurvey.css";

type FormData = {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  phoneNumber: string;
  email: string;
  nationalID: string;
  bloodType: string;
  weight: number;
  previousDonation: string;
  lastDonationDate: string;
  tattoosOrPiercings: string;
  feelingWell: string;
  recentIllness: string;
  medication: string;
  pregnancy: string;
  chronicDiseases: string;
  eligible: boolean;
  province: string;
  donationCenter: string;
  contactLanguage: string;
};

const DonorSurvey: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuthContext();

  const [formData, setFormData] = useState<FormData>({
    fullName: location.state?.fullName || user?.fullName || "",
    gender: "",
    dateOfBirth: "",
    age: 0,
    phoneNumber: "",
    email: location.state?.email || user?.email || "",
    nationalID: "",
    bloodType: "",
    weight: 0,
    previousDonation: "",
    lastDonationDate: "",
    tattoosOrPiercings: "",
    feelingWell: "",
    recentIllness: "",
    medication: "",
    pregnancy: "",
    chronicDiseases: "",
    eligible: false,
    province: "",
    donationCenter: "",
    contactLanguage: ""
  });

  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "dateOfBirth" ? { age: calculateAge(value) } : {}),
      ...(name === "previousDonation" && value === "No" ? { lastDonationDate: "" } : {})
    }));
  };

  const validateForm = (): boolean => {
    // Required fields validation
    const requiredFields: (keyof FormData)[] = [
      'fullName', 'gender', 'dateOfBirth', 'phoneNumber', 'email',
      'nationalID', 'bloodType', 'weight', 'previousDonation',
      'tattoosOrPiercings', 'feelingWell', 'recentIllness', 'medication',
      'pregnancy', 'chronicDiseases', 'province', 'donationCenter', 'contactLanguage'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field} field`);
        return false;
      }
    }

    // Age validation (must be at least 18)
    if (formData.age < 18) {
      setError("You must be at least 18 years old to donate");
      return false;
    }

    // Weight validation (must be at least 50kg)
    if (formData.weight < 50) {
      setError("You must weigh at least 50kg to donate");
      return false;
    }

    // Last donation date validation if previous donation was "Yes"
    if (formData.previousDonation === "Yes" && !formData.lastDonationDate) {
      setError("Please provide your last donation date");
      return false;
    }

    // Eligible checkbox validation
    if (!formData.eligible) {
      setError("Please confirm you meet the eligibility criteria");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user || !token) {
      setError("You must be logged in to submit the survey.");
      setIsSubmitting(false);
      return;
    }

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare cleaned data for submission
      const submissionData = {
        ...formData,
        donor: user.id,
        // Clean up disabled/optional fields
        lastDonationDate: formData.previousDonation === "Yes" ? formData.lastDonationDate : null,
        // Convert empty strings to null for optional fields
        pregnancy: formData.pregnancy === "N/A" ? null : formData.pregnancy
      };

      console.log("Submitting survey data:", submissionData);
      await submitSurvey(submissionData, token);
      setShowThankYou(true);
    } catch (error) {
      console.error("Submission error:", error);
      setError(
        error instanceof Error 
          ? error.message 
          : "Survey submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donor-landing-bg">
      <main className="donor-main-content">
        <div className="form-card donor-form-card">
          {showThankYou ? (
            <div className="text-center">
              <div className="donor-survey-checkmark">✓</div>
              <h2 className="form-card-title">Thank You!</h2>
              <p>Your donation survey has been successfully submitted.</p>
              <p>
                We will review your information and contact you with the next steps.<br />
                <strong>Please check your email for confirmation.</strong>
              </p>
              <ol className="donor-survey-instructions">
                <li>Wait for a confirmation email.</li>
                <li>Attend the donation center at your scheduled time.</li>
                <li>Follow any instructions provided by our team.</li>
              </ol>
              <button
                className="cta-btn login-btn donor-survey-btn"
                onClick={() => navigate("/donor/dashboard")}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <h2 className="form-card-title">Health & Eligibility Survey</h2>
              <p className="form-description donor-survey-description">
                <strong>All donors must complete this health and eligibility survey.</strong>
                <br />
                Please answer every question honestly. This helps protect your health and ensures a safe blood supply for everyone.
              </p>
              
              {error && (
                <div className="form-error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} autoComplete="off">
                {/* FULL NAME */}
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* GENDER */}
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* DATE OF BIRTH */}
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split('T')[0]} // Prevent future dates
                  />
                </div>

                {/* AGE (READ ONLY) */}
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    readOnly
                  />
                </div>

                {/* PHONE NUMBER */}
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* NATIONAL ID */}
                <div className="form-group">
                  <label htmlFor="nationalID">National ID</label>
                  <input
                    type="text"
                    id="nationalID"
                    name="nationalID"
                    value={formData.nationalID}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* BLOOD TYPE */}
                <div className="form-group">
                  <label htmlFor="bloodType">Blood Type</label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* WEIGHT */}
                <div className="form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight || ''}
                    onChange={handleChange}
                    required
                    min="50"
                    step="0.1"
                  />
                </div>

                {/* PREVIOUS DONATION */}
                <div className="form-group">
                  <label htmlFor="previousDonation">Previous Donation</label>
                  <select
                    id="previousDonation"
                    name="previousDonation"
                    value={formData.previousDonation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* LAST DONATION DATE */}
                <div className="form-group">
                  <label htmlFor="lastDonationDate">Last Donation Date</label>
                  <input
                    type="date"
                    id="lastDonationDate"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                    disabled={formData.previousDonation !== "Yes"}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* TATTOOS OR PIERCINGS */}
                <div className="form-group">
                  <label htmlFor="tattoosOrPiercings">Tattoos or Piercings in last 6 months?</label>
                  <select
                    id="tattoosOrPiercings"
                    name="tattoosOrPiercings"
                    value={formData.tattoosOrPiercings}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* FEELING WELL */}
                <div className="form-group">
                  <label htmlFor="feelingWell">Are you feeling well today?</label>
                  <select
                    id="feelingWell"
                    name="feelingWell"
                    value={formData.feelingWell}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* RECENT ILLNESS */}
                <div className="form-group">
                  <label htmlFor="recentIllness">Recent illness or infection?</label>
                  <select
                    id="recentIllness"
                    name="recentIllness"
                    value={formData.recentIllness}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* MEDICATION */}
                <div className="form-group">
                  <label htmlFor="medication">Currently taking medication?</label>
                  <select
                    id="medication"
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* PREGNANCY */}
                <div className="form-group">
                  <label htmlFor="pregnancy">Pregnant or recently pregnant?</label>
                  <select
                    id="pregnancy"
                    name="pregnancy"
                    value={formData.pregnancy}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                {/* CHRONIC DISEASES */}
                <div className="form-group">
                  <label htmlFor="chronicDiseases">Chronic diseases?</label>
                  <select
                    id="chronicDiseases"
                    name="chronicDiseases"
                    value={formData.chronicDiseases}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* PROVINCE */}
                <div className="form-group">
                  <label htmlFor="province">Province</label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DONATION CENTER */}
                <div className="form-group">
                  <label htmlFor="donationCenter">Donation Center</label>
                  <input
                    type="text"
                    id="donationCenter"
                    name="donationCenter"
                    value={formData.donationCenter}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* CONTACT LANGUAGE */}
                <div className="form-group">
                  <label htmlFor="contactLanguage">Preferred Contact Language</label>
                  <input
                    type="text"
                    id="contactLanguage"
                    name="contactLanguage"
                    value={formData.contactLanguage}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ELIGIBLE CHECKBOX */}
                <div className="form-group donor-survey-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="eligible"
                      checked={formData.eligible}
                      onChange={handleChange}
                      required
                      className="donor-survey-checkbox"
                    />
                    I confirm that I meet the eligibility criteria for blood donation.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="cta-btn login-btn donor-survey-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Survey"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DonorSurvey;