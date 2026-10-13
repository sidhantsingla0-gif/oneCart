import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function OtpModal({
  isOpen,
  onClose,
  email,
  onVerify,
  onResend,
  isLoading,
  title = "2-Step Verification"
}) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setOtp("");
      setCountdown(60);
      setCanResend(false);

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }
    onVerify(otp);
  };

  const handleResendClick = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    await onResend();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-[450px] bg-[#1a1f2c] border border-slate-700/60 rounded-2xl p-6 md:p-8 shadow-2xl text-white flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
        {/* Shield icon header */}
        <div className="w-16 h-16 rounded-full bg-[#6060f5]/20 flex items-center justify-center mb-4 text-[#6060f5]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold mb-2 text-center">{title}</h3>
        <p className="text-slate-300 text-sm text-center mb-1">
          We sent a 6-digit verification code to
        </p>
        <p className="text-[#6060f5] font-semibold text-sm mb-6 text-center break-all">
          {email}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5">
          <div className="w-full">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              placeholder="••••••"
              value={otp}
              onChange={handleOtpChange}
              className="w-full h-14 bg-slate-900 border-2 border-slate-700 focus:border-[#6060f5] rounded-xl text-center text-3xl font-mono tracking-[12px] text-white outline-none transition-colors shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              otp.length === 6 && !isLoading
                ? "bg-[#6060f5] hover:bg-[#4f4fe6] text-white shadow-lg shadow-[#6060f5]/30"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              "Verify Code"
            )}
          </button>

          <div className="flex items-center justify-between w-full text-xs text-slate-400 mt-2 px-1">
            <button
              type="button"
              onClick={handleResendClick}
              disabled={!canResend || isLoading}
              className={`transition-colors cursor-pointer ${
                canResend
                  ? "text-[#6060f5] hover:underline font-semibold"
                  : "text-slate-500 cursor-not-allowed"
              }`}
            >
              {canResend ? "Resend Code" : `Resend in ${countdown}s`}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpModal;
