import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: 'Sign Up - Skysecure Marketplace',
  description: 'Create your account on Skysecure Marketplace',
};

export default async function SignupPage() {
  // This is a server component, so you can perform server-side operations here
  // For example, you could fetch data from a database or API
  // const initialData = await fetchInitialData();
  
  return (
    <div className="p-6">
      {/* stepper */}
      {/* <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-blue-500 text-xs">Step 1 of 2 </p>
          <p className="text-xs">50%</p>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="w-1/2 bg-[#2553A1] h-2 rounded-full"></div>
        </div>
      </div> */}
      {/* signup content */}
      <div className="mt-8">
        <h2 className="">Create your account</h2>
        <p className="py-4 text-gray-500 ">
          Fill in your details to get started with{" "}
          Skysecure
        </p>
      </div>
      
      {/* Client component for interactive form */}
      <SignupForm />
    </div>
  );
}
