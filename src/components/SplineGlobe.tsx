
import { useEffect, useRef } from 'react';

const SplineGlobe = () => {
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full h-full" ref={splineContainerRef}>
      <spline-viewer 
        url="https://my.spline.design/worldplanet-dYMRfEnujtJEKH41LnxShtb2/" 
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SplineGlobe;
