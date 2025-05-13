import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://your-backend.onrender.com/api/auth/verify/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("Email verified! You can now login.");
          // Optionally redirect after a delay
          // setTimeout(() => navigate("/login"), 2000);
        } else {
          setStatus(data.message || "Verification failed.");
        }
      })
      .catch(() => setStatus("Verification failed."));
  }, [token, navigate]);

  return <div>{status}</div>;
}
