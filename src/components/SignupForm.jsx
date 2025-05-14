"use client";
import React, { useState, useRef, useEffect } from "react";

function SignupForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    agreeToTerms: false,
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for verification
  const [verificationState, setVerificationState] = useState({
    emailVerificationSent: false,
    phoneVerificationSent: false,
    emailVerified: false,
    phoneVerified: false,
    currentVerification: null, // 'email' or 'phone' or null
  });

// State for OTP
const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // State for toast notifications
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "", // 'success', 'error', 'info'
  });

  // State for resend countdown
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef(null);

  // Effect for countdown timer
  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [countdown]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== "" && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Handle verification requests
  const handleVerify = (type) => {
    setVerificationState({
      ...verificationState,
      currentVerification: type,
      [type === "email"
        ? "emailVerificationSent"
        : "phoneVerificationSent"]: true,
    });

    // Show toast notification
    showToast(`Verification code sent to your ${type}`, "info");

    // Reset OTP
    setOtp(["", "", "", ""]);

    // Start countdown timer (30 seconds)
    setCountdown(30);
  };

  // Handle OTP verification
  const verifyOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      showToast("Please enter a valid 4-digit code", "error");
      return;
    }

    // Simulate verification (in a real app, this would be an API call)
    const type = verificationState.currentVerification;
    setVerificationState({
      ...verificationState,
      [type === "email" ? "emailVerified" : "phoneVerified"]: true,
      currentVerification: null,
    });

    showToast(`Your ${type} has been verified successfully`, "success");
  };

  // Show toast notification
  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type,
    });

    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    if (!formData.agreeToTerms) {
      showToast(
        "Please agree to the Terms of Service and Privacy Policy",
        "error"
      );
      return;
    }

    // Check if email and phone are verified
    if (!verificationState.emailVerified) {
      showToast("Please verify your email address", "error");
      return;
    }

    if (!verificationState.phoneVerified) {
      showToast("Please verify your phone number", "error");
      return;
    }

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      // For now, just simulate a successful signup
      showToast("Account created successfully!", "success");
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    }
  };

  return (
    <>
      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-100 text-green-800 border-l-4 border-green-500"
              : toast.type === "error"
              ? "bg-red-100 text-red-800 border-l-4 border-red-500"
              : "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
          }`}
        >
          <div className="flex items-center">
            {toast.type === "success" && (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {toast.type === "error" && (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {toast.type === "info" && (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <p>{toast.message}</p>
          </div>
        </div>
      )}
      {/* OTP Verification Modal */}
      {verificationState.currentVerification && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Verify your {verificationState.currentVerification}
            </h3>
            <p className="text-gray-600 mb-6">
              {verificationState.currentVerification === "email"
                ? `We've sent a verification code to ${formData.email}`
                : `We've sent a verification code to ${formData.phoneNumber}`}
            </p>

            <div className="flex justify-center space-x-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                className={`text-sm font-medium ${
                  countdown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600"
                }`}
                onClick={() =>
                  countdown === 0 &&
                  handleVerify(verificationState.currentVerification)
                }
                disabled={countdown > 0}
              >
                Resend code
              </button>
              {countdown > 0 && (
                <span className="text-gray-500 text-sm">
                  Resend in {countdown}s
                </span>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium"
                onClick={() =>
                  setVerificationState({
                    ...verificationState,
                    currentVerification: null,
                  })
                }
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 py-2 bg-[#2553A1] rounded-md text-white font-medium"
                onClick={verifyOtp}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4 mb-4">
          <div>
            <p className="pb-2 font-semibold text-gray-600">First Name</p>
            <input
              className="border border-gray-300 rounded-md h-10 px-3 w-full"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
            />
          </div>

          <div>
            <p className="pb-2 font-semibold text-gray-600">Last Name</p>
            <input
              className="border border-gray-300 rounded-md h-10 px-3 w-full"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div className="mb-4">
          <p className="pb-2 font-semibold text-gray-600">Email</p>
          <div className="relative flex items-center">
            <input
              className={`border ${
                verificationState.emailVerified
                  ? "border-green-500"
                  : "border-gray-300"
              } rounded-md h-10 px-3 w-full`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
            {verificationState.emailVerified ? (
              <div className="absolute right-3 text-green-500 flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Verified</span>
              </div>
            ) : (
              <button
                type="button"
                className={`absolute right-3 text-sm font-medium ${
                  !formData.email
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500 cursor-pointer hover:text-blue-600"
                }`}
                onClick={() => handleVerify("email")}
                disabled={!formData.email}
              >
                Verify
              </button>
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="pb-2 font-semibold text-gray-600">Password</p>
          <div className="relative">
            <input
              className="border border-gray-300 rounded-md h-10 px-3 w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a Strong Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="pb-2 font-semibold text-gray-600">Phone Number</p>
          <div className="relative flex items-center">
            <input
              className={`border ${
                verificationState.phoneVerified
                  ? "border-green-500"
                  : "border-gray-300"
              } rounded-md h-10 px-3 w-full`}
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="Enter Phone Number"
            />
            {verificationState.phoneVerified ? (
              <div className="absolute right-3 text-green-500 flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Verified</span>
              </div>
            ) : (
              <button
                type="button"
                className={`absolute right-3 text-sm font-medium ${
                  !formData.phoneNumber
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500 cursor-pointer hover:text-blue-600"
                }`}
                onClick={() => handleVerify("phone")}
                disabled={!formData.phoneNumber}
              >
                Verify
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <input
            type="checkbox"
            name="agreeToTerms"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <p>
            I agree to the{" "}
            <span className="text-blue-500">Terms of Service</span> and{" "}
            <span className="text-blue-500">Privacy Policy</span>
          </p>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-[#2553A1] text-white h-10 rounded-md"
          >
            Continue
          </button>
          <p className="text-xs flex justify-center py-1">
            Already have an account?{" "}
            <span className="text-blue-600 text-xs">Sign In</span>
          </p>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
