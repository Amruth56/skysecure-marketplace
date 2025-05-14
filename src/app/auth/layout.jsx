import React from "react";
import Link from "next/link";
import Image from 'next/image'
import {
  Security,
  Lightning,
  GlobalProtection,
  Support,
} from "@/components/icons";

export default function AuthLogin({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <Link href="/">
          <Image src="/skysecure-logo.png" alt="Skysecure" width={100} height={200} />
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/help" className="text-gray-600 hover:text-gray-900">
            Help
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center items-center px-4 py-4">
        <div
          className="w-full max-w-5xl bg-white shadow-md rounded-xl overflow-hidden flex"
          style={{ height: "calc(100vh - 180px)" }}
        >
          {/* Left side: login or signup form */}
          <div className="w-2/3 p-6 overflow-y-auto">{children}</div>

          <aside className="bg-gray-50 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-8 mt-4">
                Why choose Skysecure?
              </h3>

              <ul className="space-y-8 mb-8">
                <li className="flex items-start">
                  {" "}
                  <span className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                    {" "}
                    <Security className="h-5 w-5 text-green-600" />
                  </span>
                  <div>
                    <strong>Advanced Security</strong>
                    <p className="text-gray-600 text-sm">
                      Multi-layered protection for all your digital assets and
                      sensitive information.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                    <Lightning className="h-5 w-5 text-green-600" />
                  </span>
                  <div>
                    <strong>Lightning Fast</strong>
                    <p className="text-gray-600 text-sm">
                      Optimized performance ensures your security doesn't slow
                      you down.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                    <GlobalProtection className="h-5 w-5 text-green-600" />
                  </span>
                  <div>
                    <strong>Global Protection</strong>
                    <p className="text-gray-600 text-sm">
                      Stay protected wherever you go with our worldwide security
                      network.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
                    <Support className="h-5 w-5 text-green-600" />
                  </span>
                  <div>
                    <strong>24/7 Support</strong>
                    <p className="text-gray-600 text-sm">
                      Our dedicated team is always available to help you with
                      any issues.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-inner">
              <div className="flex items-center mb-2">
                <span className="text-green-500 font-bold mr-2">★★★★★</span>
                <span className="text-gray-700 text-sm">
                  4/5 from 2,500+ reviews
                </span>
              </div>
              <blockquote className="text-gray-600 italic mb-3">
                "Skysecure has been a game-changer for our company's security
                infrastructure."
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src="/person-logo.png"
                    alt="User Avatar"
                    width={40}
                    height={20}
                  />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Saptesh Praish</p>
                  <p className="text-gray-500 text-xs">
                    IT Enterprise, Indegene
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white flex justify-between p-10 py-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Skysecure. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}
