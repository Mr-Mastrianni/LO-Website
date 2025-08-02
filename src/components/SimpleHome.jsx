import React from 'react';

const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            LIVING is larger than Life.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            A charitable neuro-oncology literacy organization bridging the gap between patients, physicians, and the science of medicine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Learn More About Us
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Partner with Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;
