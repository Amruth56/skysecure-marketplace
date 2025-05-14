"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ForgotPasswordForm() {
  const router = useRouter();
  
  // State for form steps
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  
  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for verification
  const [verificationState, setVerificationState] = useState({
    emailVerified: false,
    otpSent: false,
    otpVerified: false,
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== "" && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Handle email verification
  const handleVerifyEmail = () => {
    if (!formData.email) {
      showToast("Please enter your email address", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    // Simulate email verification (in a real app, this would be an API call)
    setVerificationState({
      ...verificationState,
      otpSent: true,
    });

    // Show toast notification
    showToast("Verification code sent to your email", "info");

    // Reset OTP
    setOtp(["", "", "", "", "", ""]);

    // Start countdown timer (30 seconds)
    setCountdown(30);

    // Move to OTP step
    setStep(2);
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      showToast("Please enter a valid 6-digit code", "error");
      return;
    }

    // Simulate OTP verification (in a real app, this would be an API call)
    setVerificationState({
      ...verificationState,
      otpVerified: true,
    });

    showToast("Email verified successfully", "success");
    
    // Move to password reset step
    setStep(3);
  };

  // Handle password reset
  const handleResetPassword = () => {
    if (!formData.newPassword) {
      showToast("Please enter a new password", "error");
      return;
    }

    if (formData.newPassword.length < 8) {
      showToast("Password must be at least 8 characters long", "error");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    // Simulate password reset (in a real app, this would be an API call)
    showToast("Password updated successfully", "success");
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (countdown > 0) return;
    
    // Simulate resending OTP
    showToast("Verification code resent to your email", "info");
    
    // Reset OTP
    setOtp(["", "", "", "", "", ""]);
    
    // Start countdown timer (30 seconds)
    setCountdown(30);
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

      <div className="mt-8">
        <h2 className="text-2xl font-medium text-gray-800 mb-2">Reset your password</h2>
        <p className="text-gray-600 mb-8">
          {step === 1
            ? "Enter your email address to receive a verification code"
            : step === 2
            ? "Enter the verification code sent to your email"
            : "Create a new password for your account"}
        </p>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  Verify
                </button>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div>
            <p className="text-gray-600 mb-6">
              We've sent a verification code to {formData.email}
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

            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                className={`text-sm font-medium ${
                  countdown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                }`}
                onClick={handleResendOtp}
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

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-[#2553A1] text-white py-2 px-4 rounded-md font-medium mb-4 hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Email
              </button>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              className="w-full bg-[#2553A1] text-white py-2 px-4 rounded-md font-medium mb-4 hover:bg-blue-700 transition-colors"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ForgotPasswordForm;
