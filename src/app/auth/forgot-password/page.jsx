import React from 'react';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <div className="p-6">
      {/* stepper */}
      {/* <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-blue-700 text-sm font-medium">Step 1 of 2</p>
          <p className="text-gray-500 text-sm">50%</p>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="w-1/2 bg-[#2553A1] h-2 rounded-full"></div>
        </div>
      </div> */}

      {/* Forgot Password Form */}
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordPage;
