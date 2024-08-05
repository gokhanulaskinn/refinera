import React, { useEffect } from 'react';

const CloseIframePage: React.FC = () => {
  useEffect(() => {
    window.parent.postMessage('closeIframe', '*');
  }, []);

  return <div>Yönlendiriliyorsunuz...</div>;
};

export default CloseIframePage;
