"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

function LoginForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  // State to track input type
  const [isEmail, setIsEmail] = useState(false);

  // State for verification
  const [verificationState, setVerificationState] = useState({
    otpSent: false,
    verified: false,
    currentVerification: null // 'email' or 'phone' or null
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

    // Check if input is email
    if (name === "emailOrPhone") {
      // More robust email detection
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmail(emailRegex.test(value));
      
      // For development, log the detection
      console.log("Input:", value, "Is Email:", emailRegex.test(value));
    }
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

  // Handle login
  const handleLogin = () => {
    if (!formData.emailOrPhone) {
      showToast("Please enter your email or phone number", "error");
      return;
    }

    if (isEmail && !formData.password) {
      showToast("Please enter your password", "error");
      return;
    }

    if (!isEmail) {
      // For phone number, send OTP
      setVerificationState({
        ...verificationState,
        otpSent: true,
        currentVerification: "phone",
      });

      // Show toast notification
      showToast("Verification code sent to your phone", "info");

      // Reset OTP
      setOtp(["", "", "", "", "", ""]);

      // Start countdown timer (30 seconds)
      setCountdown(30);
    } else {
      // For email, simulate login with password
      showToast("Login successful", "success");
      
      // In a real app, you would authenticate with the server
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  // Handle OTP verification
  const verifyOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      showToast("Please enter a valid 6-digit code", "error");
      return;
    }

    // Simulate verification (in a real app, this would be an API call)
    setVerificationState({
      ...verificationState,
      verified: true,
      currentVerification: null,
    });

    showToast("Verification successful", "success");
    
    // In a real app, you would redirect to the next step or dashboard
    // For now, we'll just reset the form
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
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

      {/* OTP Verification Modal */}
      {verificationState.currentVerification && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Verify your {verificationState.currentVerification}
            </h3>
            <p className="text-gray-600 mb-6">
              We've sent a verification code to {formData.emailOrPhone}
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
                className={`text-sm font-medium  ${
                  countdown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 cursor-pointer"
                }`}
                onClick={() =>
                  countdown === 0 && handleLogin()
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
                className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
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
                className="flex-1 py-2 bg-[#2553A1] rounded-md text-white font-medium cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={verifyOtp}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-medium text-gray-800 mb-2">Sign in to your account</h2>
        <p className="text-gray-600 mb-8">Enter your details to access Skysecure</p>
        
        <div className="mb-4">
          <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Email or Phone Number
          </label>
          <input
            id="emailOrPhone"
            name="emailOrPhone"
            type="text"
            value={formData.emailOrPhone}
            onChange={handleChange}
            placeholder="Enter your Email or phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isEmail && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-[#2553A1] text-white py-2 px-4 rounded-md font-medium mb-4 hover:bg-blue-700 transition-colors"
        >
          {isEmail ? "Login" : "Send OTP"}
        </button>

        <div className="text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-black hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
