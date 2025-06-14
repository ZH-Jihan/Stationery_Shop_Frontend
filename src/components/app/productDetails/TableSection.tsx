"use client";

import { TProduct } from "@/interface/product";
import { useState } from "react";

interface TableSectionProps {
  product: TProduct;
}

const TableSection = ({ product }: TableSectionProps) => {
  const [activeTab, setActiveTab] = useState("specification");

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
            Reviews (0)
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
            Specifications
          </h2>
          <div className="text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Basic Information
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Warranty Information
              </h3>
              <p>{product.warranty}</p>
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
            <p className="whitespace-pre-line">{product.description}</p>
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
            Reviews (0)
          </h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>There are no reviews yet. Be the first one to write a review.</p>
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
