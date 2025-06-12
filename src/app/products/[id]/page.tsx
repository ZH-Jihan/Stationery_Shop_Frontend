import TableSection from "@/components/app/productDetails/TableSection";

const ProductDetailsPage = async (
  props: { params: { id: string } } // Type for useParams
) => {
  const productId = props.params.id; // productId obtained from useParams

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs Placeholder */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Home &gt; Category &gt; Subcategory &gt; Product Name Placeholder{" "}
        {productId}
      </div>

      {/* Product ID: {productId} - This is a placeholder, will fetch product data later */}

      {/* Main content area - adjust grid/flex for responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: Product Image Gallery (Placeholder) */}
        <div>
          {/* Placeholder for image gallery */}
          <div className="bg-gray-200 dark:bg-gray-700 h-96 flex items-center justify-center rounded-lg">
            <span className="text-gray-600 dark:text-gray-300">
              Product Image Gallery Placeholder
            </span>
          </div>
        </div>

        {/* Right column: Product Info and Add to Cart */}
        <div>
          {/* Product Title and Price */}
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Gree 1 Ton Muse-Split Non-Inverter AC
          </h1>
          <div className="text-gray-800 dark:text-gray-200 mb-4">
            <span className="text-pink-600 dark:text-pink-400 text-2xl font-semibold mr-2">
              43,160৳
            </span>
            <span className="text-gray-500 dark:text-gray-400 line-through mr-4">
              52,000৳
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Regular Price: 46,500৳
            </span>
          </div>
          <div className="mb-6 text-gray-800 dark:text-gray-200">
            <p className="mb-1">Status: In Stock</p>
            <p className="mb-1">Product Code: 39913</p>
            <p>Brand: Gree</p>
          </div>

          {/* Key Features */}
          <div className="mb-6 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Model: GS-12XMU32</li>
              <li>Cooling Capacity: 12000 BTU/hr</li>
              <li>Condenser Type: Copper Tube</li>
              <li>Refrigerator: R32 Eco-Friendly</li>
              <li>Intelligent Auto Restart, LED Display</li>
            </ul>
          </div>

          {/* View More Info Link */}
          <div className="mb-6">
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View More Info
            </a>
          </div>

          {/* Discount Offer */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              Discount Offer Ends in
            </h2>
            {/* Timer/Offer details */}
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-yellow-800 dark:text-yellow-200">
              <div className="flex space-x-4 mb-2">
                <div>
                  <span className="font-bold text-lg">02</span> Days
                </div>
                <div>
                  <span className="font-bold text-lg">21</span> Hours
                </div>
                <div>
                  <span className="font-bold text-lg">02</span> Minutes
                </div>
                <div>
                  <span className="font-bold text-lg">58</span> Seconds
                </div>
              </div>
              <p className="font-semibold">Only For Online Order</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              Payment Options
            </h2>
            {/* Payment options */}
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-blue-800 dark:text-blue-200">
              <div className="mb-2">
                <span className="font-bold text-xl mr-2">43,160৳</span>
                <span className="line-through text-gray-600 dark:text-gray-300 mr-2">
                  52,000৳
                </span>
                <span>Cash Discount Price</span>
              </div>
              <p className="mb-2">Online / Cash Payment</p>
              <div>
                <span className="font-bold text-xl mr-2">3,875৳/month</span>
                <span className="text-gray-600 dark:text-gray-300 mr-2">
                  Regular Price: 46,500৳
                </span>
                <span>0% EMI for up to 12 Months&apos;</span>
              </div>
            </div>
          </div>

          {/* Quantity and Buy Now Button */}
          <div className="flex items-center mb-6">
            {/* Quantity selector with plus/minus buttons */}
            <div className="mr-4 flex items-center border rounded-md border-gray-300 dark:border-gray-600">
              <button className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-md focus:outline-none">
                -
              </button>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-12 text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
              <button className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md focus:outline-none">
                +
              </button>
            </div>
            {/* Buy Now button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded dark:bg-blue-800 dark:hover:bg-blue-900 transition duration-200">
              Buy Now
            </button>
          </div>

          {/* Save and Add to Compare */}
          <div className="flex space-x-6 text-blue-600 dark:text-blue-400 text-sm font-semibold">
            <button className="hover:underline focus:outline-none">Save</button>
            <button className="hover:underline focus:outline-none">
              Add to Compare
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section (Specification, Description, Questions, Reviews) */}
      <TableSection />

      {/* Related Product Section (Placeholder) */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Related Product
        </h2>
        {/* Related products grid/list placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Related Product 1
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Related Product 2
            </p>
          </div>
          {/* Add more related product placeholders as needed */}
        </div>
      </div>

      {/* Recently Viewed Section (Placeholder) */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Recently Viewed
        </h2>
        {/* Recently viewed products grid/list placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Recently Viewed Product 1
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Recently Viewed Product 2
            </p>
          </div>
          {/* Add more recently viewed product placeholders as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
