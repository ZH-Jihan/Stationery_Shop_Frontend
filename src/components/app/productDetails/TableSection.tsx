"use client";

import { useState } from "react";

const TableSection = () => {
  const [activeTab, setActiveTab] = useState("specification"); // 'specification', 'description', 'questions', 'reviews'// Using the productId from useParams

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  return (
    <div className="mt-12">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <nav
          className="-mb-px flex flex-wrap justify-center sm:justify-start gap-x-4 sm:space-x-8"
          aria-label="Tabs"
        >
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "specification"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500"
            }`}
            onClick={() => handleTabClick("specification")}
            aria-current={activeTab === "specification" ? "page" : undefined}
          >
            Specification
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "description"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500"
            }`}
            onClick={() => handleTabClick("description")}
          >
            Description
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "questions"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500"
            }`}
            onClick={() => handleTabClick("questions")}
          >
            Questions (0)
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "reviews"
                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500"
            }`}
            onClick={() => handleTabClick("reviews")}
          >
            Reviews (1)
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {/* Specification Section */}
        <div
          id="specification-content"
          className={activeTab === "specification" ? "" : "hidden"}
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            Specification Section
          </h2>
          <div className="text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Basic Information
              </h3>
              <ul className="list-disc list-inside ml-4">
                <li>AC Type: Muse Split</li>
                <li>Technology: Non-Inverter</li>
                <li>Capacity: 1 Ton</li>
                <li>Coverage: 100-120 sqft</li>
                <li>Energy Saving Rating: 3 Star</li>
                <li>Capacity of Cooling (BTU): 12,000 BTU</li>
                <li>Noise Level: 32dB</li>
                <li>Compressor Type: Rotary</li>
                <li>Condenser Type: Golden Fin Condenser</li>
                <li>Refrigerant Type: Gas (R22/R32)</li>
                <li>
                  Others: Comfortable Sleeping Modes, Automatic Drying
                  Operation, Self Diagnosis On-Off timer, Removable Washable
                  Panel, Integrated Design
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Power
              </h3>
              <ul className="list-disc list-inside ml-4">
                <li>Power Type: 1Ph, 220-230V, 50Hz</li>
                <li>Power Consumption: 1280 Watts</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Warranty Information
              </h3>
              <p>
                05 years compressor and 01-years parts warranty by Gree.
                Warranty card must be kept for warranty claims. For warranty,
                Call Gree at 16649/ 09678333666. (Star Tech will not bear
                warranty claims).
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div
          id="description-content"
          className={activeTab === "description" ? "" : "hidden"}
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            Description
          </h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              The Gree 1 Ton Non-Inverter AC Muse-Split Type GS-12XMU32 is a
              smart and affordable cooling option for areas between 100 and 140
              square feet. It provides strong performance and quiet operation,
              with interior noise levels as low as 34 dB, thanks to its 12,000
              BTU cooling capacity. With its cutting-edge I-Feel Technology,
              this Gree 1 ton air conditioner automatically modifies the
              temperature according to your location for individualized comfort.
              When necessary, the Turbo Button provides immediate cooling, and
              its Comfortable Sleeping Mode optimizes nighttime settings for
              sound slumber. For enduring effectiveness and corrosion
              resistance, the Gree GS-12XMU32 1 Ton AC is outfitted with a
              Golden Fin condenser and a sturdy rotary compressor. The 1 Ton
              Smart AC is intended with customer comfort in mind and comes with
              a number of smart features like self-diagnosis for automated
              troubleshooting and intelligent auto-restart, which restores prior
              settings during a power interruption. The top-mounted healthy
              filter adds another layer of purification, and the Gree 1 Ton
              Non-Inverter AC Muse-Split Type GS-12XMU32&apos;s Cold Plasma
              Technology improves indoor air quality. The AC guarantees reliable
              operation under a variety of circumstances thanks to cold air
              prevention and intelligent defrosting. The environmentally
              friendly R32 refrigerant lowers the impact on the environment, and
              energy-saving features save operating expenses. The Gree 1 Ton
              Non-Inverter AC Muse-Split Type GS-12XMU32 is an attractive
              addition to any space because of its small size and curved
              appearance. Its low-voltage start-up guarantees dependable
              operation even in the face of power fluctuations. The Lock feature
              stops unwanted adjustments, and the LED display and timer feature
              make it easier to use.
            </p>
          </div>
        </div>

        {/* Questions Section */}
        <div
          id="questions-content"
          className={activeTab === "questions" ? "" : "hidden"}
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            Questions (0)
          </h2>
          {/* Questions content placeholder */}
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              There are no questions asked yet. Be the first one to ask a
              question.
            </p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-800 dark:hover:bg-blue-900">
              Ask Question
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div
          id="reviews-content"
          className={activeTab === "reviews" ? "" : "hidden"}
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            Reviews (1)
          </h2>
          {/* Reviews content placeholder */}
          <div className="text-gray-700 dark:text-gray-300">
            {/* Individual review placeholder */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="text-yellow-500">★★★★★</div>
                <span className="ml-2 text-sm font-semibold">5 out of 5</span>
              </div>
              <p className="mb-2">
                The AC was in excellent condition, and the packaging was also
                good. Overall, it was a satisfying experience.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By Sirazul Islam on 07 Feb 2025
              </p>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-800 dark:hover:bg-blue-900">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSection;
