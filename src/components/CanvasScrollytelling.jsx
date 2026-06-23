'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CanvasScrollytelling() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track scroll progress using a GSAP proxy object
    const scrollProxy = { progress: 0 };
    
    // Register scroll trigger on the window or container
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        gsap.to(scrollProxy, {
          progress: self.progress,
          duration: 0.5,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      },
    });

    // ----------------------------------------------------
    // 3D MODEL DEFINITION & MORPHING MATH
    // ----------------------------------------------------
    const TOTAL_NODES = 200;
    const nodes = [];

    // Define 3D Villa Vertices (approx. 50 points)
    // Scale factor to make it look prominent
    const s = 1.3;
    const villaVertices = [
      // Main box base (8 points)
      { x: -100 * s, y: 80 * s, z: -50 * s }, // 0
      { x: 20 * s, y: 80 * s, z: -50 * s },  // 1
      { x: 20 * s, y: 80 * s, z: 50 * s },   // 2
      { x: -100 * s, y: 80 * s, z: 50 * s },  // 3
      { x: -100 * s, y: 0 * s, z: -50 * s },  // 4
      { x: 20 * s, y: 0 * s, z: -50 * s },   // 5
      { x: 20 * s, y: 0 * s, z: 50 * s },    // 6
      { x: -100 * s, y: 0 * s, z: 50 * s },   // 7

      // Second floor (8 points)
      { x: -100 * s, y: -80 * s, z: -50 * s }, // 8
      { x: 20 * s, y: -80 * s, z: -50 * s },  // 9
      { x: 20 * s, y: -80 * s, z: 50 * s },   // 10
      { x: -100 * s, y: -80 * s, z: 50 * s },  // 11

      // Staggered Right Wing base (4 points)
      { x: 20 * s, y: 40 * s, z: -35 * s },   // 12
      { x: 120 * s, y: 40 * s, z: -35 * s },  // 13
      { x: 120 * s, y: 40 * s, z: 35 * s },   // 14
      { x: 20 * s, y: 40 * s, z: 35 * s },    // 15

      // Right Wing Roof (4 points)
      { x: 20 * s, y: -30 * s, z: -35 * s },  // 16
      { x: 120 * s, y: -30 * s, z: -35 * s }, // 17
      { x: 120 * s, y: -30 * s, z: 35 * s },  // 18
      { x: 20 * s, y: -30 * s, z: 35 * s },   // 19

      // Balcony glass rails (4 points)
      { x: -100 * s, y: -20 * s, z: 55 * s }, // 20
      { x: 20 * s, y: -20 * s, z: 55 * s },   // 21
      { x: 20 * s, y: 0 * s, z: 55 * s },    // 22
      { x: -100 * s, y: 0 * s, z: 55 * s },   // 23

      // Main Entrance/Pathway points (6 points)
      { x: -40 * s, y: 80 * s, z: 50 * s },   // 24
      { x: 0 * s, y: 80 * s, z: 50 * s },    // 25
      { x: -40 * s, y: 80 * s, z: 120 * s },  // 26
      { x: 0 * s, y: 80 * s, z: 120 * s },   // 27
      { x: -40 * s, y: 15 * s, z: 50 * s },   // 28 (door frame top left)
      { x: 0 * s, y: 15 * s, z: 50 * s },    // 29 (door frame top right)

      // Slanting roof overhangs (4 points)
      { x: -110 * s, y: -90 * s, z: -60 * s }, // 30
      { x: 30 * s, y: -90 * s, z: -60 * s },   // 31
      { x: 30 * s, y: -90 * s, z: 60 * s },    // 32
      { x: -110 * s, y: -90 * s, z: 60 * s },   // 33

      // Columns (4 points)
      { x: 110 * s, y: 80 * s, z: -30 * s },  // 34
      { x: 110 * s, y: 80 * s, z: 30 * s },   // 35
      { x: 60 * s, y: 80 * s, z: -30 * s },   // 36
      { x: 60 * s, y: 80 * s, z: 30 * s }     // 37
    ];

    // Connect specific indices for the Villa wireframe
    const villaEdges = [
      // Base Box bottom
      [0, 1], [1, 2], [2, 3], [3, 0],
      // Base Box vertical
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Mid floor
      [4, 5], [5, 6], [6, 7], [7, 4],
      // Upper vertical
      [4, 8], [5, 9], [6, 10], [7, 11],
      // Roof floor box
      [8, 9], [9, 10], [10, 11], [11, 8],
      // Overhanging Roof
      [30, 31], [31, 32], [32, 33], [33, 30],
      // Connections to overhanging roof
      [8, 30], [9, 31], [10, 32], [11, 33],

      // Right wing base
      [12, 13], [13, 14], [14, 15], [15, 12],
      // Right wing vertical
      [12, 16], [13, 17], [14, 18], [15, 19],
      // Right wing roof
      [16, 17], [17, 18], [18, 19], [19, 16],

      // Columns to support right wing
      [13, 34], [14, 35], [12, 36], [15, 37],

      // Glass Balcony rails
      [20, 21], [21, 22], [22, 23], [23, 20],

      // Pathway & Door
      [24, 26], [25, 27], [26, 27],
      [28, 29], [28, 24], [29, 25]
    ];

    // Initialize 200 nodes
    for (let i = 0; i < TOTAL_NODES; i++) {
      // 1. STATE A: House Vertices or Floating Dust
      let x_A, y_A, z_A;
      if (i < villaVertices.length) {
        // Precise Villa vertex
        x_A = villaVertices[i].x;
        y_A = villaVertices[i].y;
        z_A = villaVertices[i].z;
      } else {
        // Floating particle dust around the villa
        const angle = Math.random() * Math.PI * 2;
        const radius = 250 + Math.random() * 250;
        x_A = Math.cos(angle) * radius;
        y_A = -200 + Math.random() * 400;
        z_A = Math.sin(angle) * radius;
      }

      // 2. STATE B: Constellation Sphere (interlocking lenders network)
      // Distribute nodes evenly on a sphere using Golden Spiral
      const phi = Math.acos(-1 + (2 * i) / TOTAL_NODES);
      const theta = Math.sqrt(TOTAL_NODES * Math.PI) * phi;
      const sphereRadius = 240 * s;

      const x_B = Math.sin(phi) * Math.cos(theta) * sphereRadius;
      const y_B = Math.cos(phi) * sphereRadius;
      const z_B = Math.sin(phi) * Math.sin(theta) * sphereRadius;

      nodes.push({
        // State A
        x_A,
        y_A,
        z_A,
        // State B
        x_B,
        y_B,
        z_B,
        // Current position (animated)
        x: x_A,
        y: y_A,
        z: z_A,
        size: 2 + Math.random() * 3,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Handle Window Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // ----------------------------------------------------
    // RENDER LOOP
    // ----------------------------------------------------
    let time = 0;
    const fov = 600;

    const render = () => {
      time += 0.005;
      const progress = scrollProxy.progress;

      // Dynamic backgrounds: Deep slate charcoal gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      // Interpolate from deep charcoal to slightly lighter charcoal based on scroll
      const color1 = gsap.utils.interpolate('#151717', '#0e1011', progress);
      const color2 = gsap.utils.interpolate('#1F242E', '#151717', progress);
      bgGrad.addColorStop(0, color1);
      bgGrad.addColorStop(1, color2);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Setup matrices/rotations
      // Rotation angle based on time (slow ambient spin) AND scroll progress (interactive spin)
      const rotY = time * 0.4 + progress * Math.PI * 1.5;
      const rotX = Math.sin(time * 0.2) * 0.15 + (progress * 0.4 - 0.2);

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Project nodes to 2D
      const projectedNodes = [];
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < TOTAL_NODES; i++) {
        const node = nodes[i];

        // 1. Interpolate coordinates between State A and State B
        const targetX = gsap.utils.interpolate(node.x_A, node.x_B, progress);
        const targetY = gsap.utils.interpolate(node.y_A, node.y_B, progress);
        const targetZ = gsap.utils.interpolate(node.z_A, node.z_B, progress);

        // 2. Rotate around Y-axis
        let x1 = targetX * cosY - targetZ * sinY;
        let z1 = targetZ * cosY + targetX * sinY;

        // 3. Rotate around X-axis
        let y1 = targetY * cosX - z1 * sinX;
        let z2 = z1 * cosX + targetY * sinX;

        // Push z-translation back slightly
        z2 += 500;

        // 4. Perspective Projection
        const scale = fov / (fov + z2);
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y1 * scale;

        projectedNodes.push({
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          pulse: Math.sin(time * 3 + node.pulseOffset) * 0.5 + 0.5,
          size: node.size,
          isVillaPoint: i < villaVertices.length
        });
      }

      // Draw Lines - Villa Edges (Fade out as progress -> 1)
      if (progress < 0.98) {
        ctx.strokeStyle = `rgba(217, 180, 143, ${0.4 * (1 - progress)})`; // accent-gold color (#D9B48F)
        ctx.lineWidth = 1.2;
        
        villaEdges.forEach(([p1, p2]) => {
          const proj1 = projectedNodes[p1];
          const proj2 = projectedNodes[p2];

          if (proj1 && proj2) {
            ctx.beginPath();
            ctx.moveTo(proj1.x, proj1.y);
            ctx.lineTo(proj2.x, proj2.y);
            ctx.stroke();
          }
        });
      }

      // Draw Lines - Interlocking Network (Fade in as progress -> 0.1)
      // To keep rendering fast and clean, only draw lines between nodes in B state if they are close
      if (progress > 0.05) {
        ctx.lineWidth = 0.8;
        const networkAlpha = Math.min(0.35, (progress - 0.05) * 1.5);
        ctx.strokeStyle = `rgba(217, 180, 143, ${networkAlpha})`;

        // Connect nodes based on distance
        for (let i = 0; i < TOTAL_NODES; i++) {
          const p1 = projectedNodes[i];
          // Limit connection checks to keep O(N) performance high
          for (let j = i + 1; j < TOTAL_NODES; j++) {
            const p2 = projectedNodes[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Connect if close enough on screen (proportional to distance and scale)
            const maxDist = 85 * ((p1.scale + p2.scale) / 2);
            if (dist < maxDist) {
              const alphaMultiplier = (1 - dist / maxDist) * networkAlpha;
              ctx.strokeStyle = `rgba(217, 180, 143, ${alphaMultiplier})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw Nodes (glowing points)
      for (let i = 0; i < TOTAL_NODES; i++) {
        const p = projectedNodes[i];
        
        // Villa points glow gold in early scroll, while others glow subtly
        let alpha = p.isVillaPoint ? 0.85 : 0.45;
        // In full network mode, all points glow beautifully
        if (progress > 0.5) {
          alpha = gsap.utils.interpolate(alpha, 0.9, (progress - 0.5) * 2);
        }

        const size = p.size * p.scale * (1 + p.pulse * 0.15);
        
        ctx.fillStyle = p.isVillaPoint || progress > 0.4
          ? `rgba(217, 180, 143, ${alpha})` // accent-gold
          : `rgba(255, 255, 255, ${alpha * 0.6})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fill();

        // Draw outer ring for key active nodes
        if (p.isVillaPoint && progress < 0.3) {
          ctx.strokeStyle = `rgba(217, 180, 143, ${alpha * 0.3 * (1 - progress)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    // Start render loop
    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
