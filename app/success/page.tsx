export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you! Aapka order submit ho gaya hai. Hum jaldi contact karenge.
        </p>

        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-black text-white rounded-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}