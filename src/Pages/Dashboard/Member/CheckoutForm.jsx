import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/axiosInstance";

const CheckoutForm = ({
  booking,
  finalPrice,
  couponCode,
  discount,
  onPaymentSuccess,
}) => {
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    try {
      // Directly call your backend to handle payment (without Stripe SDK here)
      const res = await api.post("/create-payment-intent", {
        price: finalPrice,
      });

      const clientSecret = res?.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Failed to get payment credentials.");
      }

      // Assume payment handled via backend or other flow
      // You can add your own logic here for payment confirmation

      // Simulate payment success for now
      toast.success("Payment successful!");
      onPaymentSuccess();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err?.response?.data?.error || err.message || "Payment failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Since Stripe card input removed, add your own inputs here if needed */}

      <button
        type="submit"
        disabled={processing}
        className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white w-full disabled:opacity-50"
      >
        {processing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

export default CheckoutForm;
