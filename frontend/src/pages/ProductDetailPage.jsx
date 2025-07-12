const ProductDetailPage = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <header className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-700">ReWear</h1>
        <div className="flex gap-6 items-center text-sm font-medium">
          <a href="#" className="text-gray-600 hover:text-purple-700">Home</a>
          <a href="#" className="text-gray-600 hover:text-purple-700">Browse</a>
          <a href="#" className="text-gray-600 hover:text-purple-700">Login</a>
          <a href="#" className="text-gray-600 hover:text-purple-700">Sign Up</a>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full shadow">Get Started</button>
        </div>
      </header>

      <div className="flex justify-between items-center my-8">
        <div className="w-1/3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 via-white to-purple-50 border border-purple-300 shadow-md text-purple-800 font-semibold text-sm text-center tracking-wide uppercase">
            Stylish Blue Shirt
        </div>

        <div className="flex items-center border rounded-full px-4 py-1 bg-white shadow">
          <input type="text" placeholder="Search..." className="outline-none px-2 py-1 bg-transparent" />
          <button className="text-gray-600">🔍</button>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Image Gallery */}
        <div className="flex-1 bg-white rounded-xl shadow-lg h-[400px] flex items-center justify-center text-gray-400 text-lg border border-gray-200">
          Product Images
        </div>

        {/* Product Description */}
        <div className="flex-1 bg-white rounded-xl shadow-lg h-[400px] border border-gray-200 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Stylish Blue Shirt</h2>
                <p className="text-gray-600 leading-relaxed">
                A lightly worn, stylish blue shirt perfect for semi-casual occasions. Well-maintained and available for swap or point-based redemption. The fabric is soft, breathable, and durable — ensuring both comfort and style. Great for layering or wearing solo.
                </p>
            </div>
            <div className="text-sm text-gray-500">
                <div className="mb-1">Uploaded by: <span className="text-purple-700">user@example.com</span></div>
                <div>Status: <span className="text-green-600 font-semibold">Available</span></div>
            </div>
            <div className="flex gap-4 pt-2">
                <button className="flex-1 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow hover:scale-105 transition">Swap Request</button>
                <button className="flex-1 px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow hover:scale-105 transition">Redeem via Points</button>
            </div>
            </div>

      </div>

      {/* Previous Listings */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Previous Listings</h3>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="h-36 rounded-xl bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-400"
            >
              Item {idx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
