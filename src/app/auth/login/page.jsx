import React from 'react'

function LoginPage() {
  return (
    <div className= "p-6">
      {/* stepper */}
      <div>
        <div className="flex justify-between items-center mb-2">
        <p className="text-blue-500 text-xs">Step 1 of 2 </p>
        <p className="text-xs">50%</p>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="w-1/2 bg-blue-600 h-2 rounded-full"></div>
        </div>
      </div>

      {/* phone number verification */}
      <div>
        
        <h1>Verify your phone number</h1>
      </div>
    </div>
  )
}

export default LoginPage
