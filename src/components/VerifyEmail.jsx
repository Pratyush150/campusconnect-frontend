import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying your email...");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/verify/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("🎉 Email verified successfully! Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus(data.message || "❌ Verification failed. Please try again.");
        }
      })
      .catch(() => {
        setStatus("⚠️ Connection error. Please check your internet connection.");
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
}
