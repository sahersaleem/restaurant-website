export default function PaymentSuccessPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-yellow-500 text-5xl mb-4">👑</div>
          <h1 className="text-2xl font-bold text-gray-800">Subscription Successful</h1>
          <p className="mt-3 text-gray-600">
            You are now <span className="font-semibold text-red-600">featured for 1 month</span>!
          </p>
          <p className="mt-3 text-gray-500">
            Enjoy the royal treatment! Your restaurant is now highlighted as a premium choice for your customers.
          </p>
          <div className="mt-6">
            <a
              href="/dashboard" // replace with your dashboard route
              className="inline-block bg-red text-white px-6 py-2 rounded-full hover:bg-red transition"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }
  