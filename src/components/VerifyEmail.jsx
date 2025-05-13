import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: "Verifying your email..."
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/verify/${token}`
        );

        if (!response.ok) throw new Error("Verification failed");

        const data = await response.json();

        if (data.success) {
          setStatus({
            loading: false,
            success: true,
            message: "Email verified successfully!"
          });
          setTimeout(() => navigate("/login"), 3000);
        } else {
          throw new Error(data.message || "Invalid verification token");
        }
      } catch (error) {
        setStatus({
          loading: false,
          success: false,
          message: error.message || "Verification failed. Please try again."
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        {status.loading ? (
          <div className="animate-pulse">
            <div className="h-12 w-12 bg-blue-100 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 text-lg">{status.message}</p>
          </div>
        ) : status.success ? (
          <>
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Successful!
            </h1>
            <p className="text-gray-600 mb-6">{status.message}</p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Redirecting to login in 3 seconds...
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition"
              >
                Go to Login Immediately
              </button>
            </div>
          </>
        ) : (
          <>
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">{status.message}</p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold transition"
              >
                Register Again
              </button>
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <a
                  href="mailto:support@campusconnect.com"
                  className="text-blue-600 hover:underline"
                >
                  Contact support
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

