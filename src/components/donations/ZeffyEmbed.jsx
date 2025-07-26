import React from 'react';

const ZeffyEmbed = ({ src }) => {
  if (!src) {
    return null;
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '120%' }}>
      <iframe
        src={src}
        title="Zeffy Donation Form"
        className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
        allowpaymentrequest="true"
        allowTransparency="true"
      ></iframe>
    </div>
  );
};

export default ZeffyEmbed;