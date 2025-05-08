
import { useEffect, useRef } from 'react';

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setDimensions = () => {
      const size = Math.min(window.innerWidth * 0.8, 500);
      canvas.width = size;
      canvas.height = size;
    };

    setDimensions();
    window.addEventListener('resize', setDimensions);

    // Animation variables
    let rotation = 0;
    const rotationSpeed = 0.001;
    let hoverEffect = 0;
    let requestId: number;

    // Nomad hub locations (longitude, latitude)
    const locations = [
      { name: "Bali", lon: 115.188919, lat: -8.409518, size: 2 },
      { name: "Lisbon", lon: -9.139337, lat: 38.722252, size: 2 },
      { name: "Mexico City", lon: -99.133209, lat: 19.432608, size: 2 },
      { name: "Chiang Mai", lon: 98.9931, lat: 18.7883, size: 1.5 },
      { name: "Medellin", lon: -75.5636, lat: 6.2476, size: 1.5 },
      { name: "Budapest", lon: 19.0402, lat: 47.4979, size: 1.5 }
    ];

    // Flight paths (from, to indices in the locations array)
    const flightPaths = [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 0 },
      { from: 3, to: 0 },
      { from: 2, to: 4 },
      { from: 5, to: 1 }
    ];

    // Convert longitude and latitude to 3D coordinates on the globe
    const lonLatToPoint = (lon: number, lat: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -radius * Math.sin(phi) * Math.cos(theta + rotation);
      const z = radius * Math.sin(phi) * Math.sin(theta + rotation);
      const y = radius * Math.cos(phi);

      // Calculate visibility based on position (front or back of globe)
      const visibility = x / radius;

      return { x: x, y: y, z: z, visibility };
    };

    // Calculate Bezier control point for flight path
    const getBezierControlPoint = (start: any, end: any) => {
      const mid = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
      
      // Move control point outward from the globe center
      const distance = Math.sqrt((mid.x * mid.x) + (mid.y * mid.y));
      const factor = 1 + (0.5 * Math.random() + 0.3); // Random curve height
      
      return {
        x: mid.x * factor,
        y: mid.y * factor
      };
    };

    // Draw the globe
    const drawGlobe = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width * 0.35;
      
      // Draw the globe with a subtle earth tone gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#E6D2B5'); // Sand
      gradient.addColorStop(0.5, '#BEB6A6'); // Stone
      gradient.addColorStop(1, '#8A8F7F'); // Olive
      
      // Globe base
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Globe highlight overlay
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
      
      // Grid lines effect
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 0.5;
      
      // Draw longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        const x1 = centerX + radius * Math.cos(angle);
        const y1 = centerY + radius * Math.sin(angle);
        const x2 = centerX + radius * Math.cos(angle + Math.PI);
        const y2 = centerY + radius * Math.sin(angle + Math.PI);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      
      // Draw latitude lines
      for (let i = 1; i < 5; i++) {
        const latRadius = radius * Math.sin(i * Math.PI / 10);
        const y = centerY + radius * Math.cos(i * Math.PI / 10);
        
        ctx.beginPath();
        ctx.arc(centerX, y, latRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        const y2 = centerY - radius * Math.cos(i * Math.PI / 10);
        
        ctx.beginPath();
        ctx.arc(centerX, y2, latRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw locations
      locations.forEach(location => {
        const point = lonLatToPoint(location.lon, location.lat, radius);
        
        // Only draw points on the visible side of the globe
        if (point.visibility > -0.15) {
          const alpha = (point.visibility + 0.15) / 1.15;
          const x = centerX + point.x;
          const y = centerY + point.y;
          
          // Draw location dot
          ctx.beginPath();
          ctx.arc(x, y, location.size * (alpha * 0.7 + 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(198, 110, 78, ${alpha.toFixed(2)})`;
          ctx.fill();
          
          // Draw glow effect
          ctx.beginPath();
          ctx.arc(x, y, location.size * 2 * (alpha * 0.7 + 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(198, 110, 78, ${(alpha * 0.3).toFixed(2)})`;
          ctx.fill();
        }
      });

      // Draw flight paths
      flightPaths.forEach((path, index) => {
        const fromLoc = locations[path.from];
        const toLoc = locations[path.to];
        
        const fromPoint = lonLatToPoint(fromLoc.lon, fromLoc.lat, radius);
        const toPoint = lonLatToPoint(toLoc.lon, toLoc.lat, radius);
        
        // Only draw if at least one end is visible
        if (fromPoint.visibility > -0.2 || toPoint.visibility > -0.2) {
          const fromX = centerX + fromPoint.x;
          const fromY = centerY + fromPoint.y;
          const toX = centerX + toPoint.x;
          const toY = centerY + toPoint.y;
          
          // Create bezier curve control point
          const control = getBezierControlPoint(
            { x: fromPoint.x, y: fromPoint.y },
            { x: toPoint.x, y: toPoint.y }
          );
          
          const controlX = centerX + control.x;
          const controlY = centerY + control.y;
          
          // Calculate average visibility for opacity
          const avgVisibility = (Math.max(fromPoint.visibility, -0.2) + Math.max(toPoint.visibility, -0.2)) / 2 + 0.2;
          const normalizedVisibility = avgVisibility / 1.2;
          
          // Draw the path
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.quadraticCurveTo(controlX, controlY, toX, toY);
          ctx.strokeStyle = `rgba(198, 110, 78, ${(normalizedVisibility * 0.5).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Animate a pulse along the path
          const pulsePos = (Date.now() / 2000 + index * 0.2) % 1;
          const pulseSize = 2 + Math.sin(Date.now() / 200) * 0.5;
          
          // Calculate position along the bezier curve
          const t = pulsePos;
          const pulsePosX = (1-t)*(1-t)*fromX + 2*(1-t)*t*controlX + t*t*toX;
          const pulsePosY = (1-t)*(1-t)*fromY + 2*(1-t)*t*controlY + t*t*toY;
          
          // Draw the pulse
          ctx.beginPath();
          ctx.arc(pulsePosX, pulsePosY, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${normalizedVisibility.toFixed(2)})`;
          ctx.fill();
        }
      });

      // Apply hover effect
      if (hoverEffect > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(198, 110, 78, ${hoverEffect.toFixed(2)})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      rotation += rotationSpeed;
      drawGlobe();
      requestId = requestAnimationFrame(animate);
    };

    // Add hover effect
    const handleMouseEnter = () => {
      const fadeIn = () => {
        if (hoverEffect < 0.6) {
          hoverEffect += 0.05;
          requestAnimationFrame(fadeIn);
        }
      };
      fadeIn();
    };

    const handleMouseLeave = () => {
      const fadeOut = () => {
        if (hoverEffect > 0) {
          hoverEffect -= 0.05;
          requestAnimationFrame(fadeOut);
        }
      };
      fadeOut();
    };

    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Handle device motion
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (event.rotationRate?.beta && event.rotationRate?.gamma) {
        const beta = event.rotationRate.beta / 300;
        const gamma = event.rotationRate.gamma / 300;
        rotation += (beta + gamma) / 10;
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener('resize', setDimensions);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleDeviceMotion);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 globe-gradient rounded-full"></div>
      <canvas
        ref={canvasRef}
        className="relative z-10 cursor-pointer"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

export default Globe;
