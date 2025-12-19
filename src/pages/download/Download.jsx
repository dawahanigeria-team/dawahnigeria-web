import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Download = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="w-full px-6 py-8 text-foreground">
      <div className="min-h-[50vh] flex items-center justify-center text-center">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Downloads</h1>
          <p className="text-color">Downloads feature is coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Download;
