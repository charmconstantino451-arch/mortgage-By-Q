'use client';

import { useEffect, useRef } from 'react';

export default function Scene3D({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Define 3D wireframe house structure (vertices & edges)
    // Slabs (Ground floor, First floor, Roof)
    const villaVertices = [];
    const villaEdges = [];

    // Define horizontal rectangular slabs
    const addSlab = (y, w, d) => {
      const startIdx = villaVertices.length;
      villaVertices.push(
        { x: -w, y, z: -d, type: 'house' }, // Back-Left
        { x: w, y, z: -d, type: 'house' },  // Back-Right
        { x: w, y, z: d, type: 'house' },   // Front-Right
        { x: -w, y, z: d, type: 'house' }   // Front-Left
      );
      villaEdges.push(
        [startIdx, startIdx + 1],
        [startIdx + 1, startIdx + 2],
        [startIdx + 2, startIdx + 3],
        [startIdx + 3, startIdx]
      );
      return startIdx;
    };

    // Create a 2-story modern villa layout
    const slab0 = addSlab(-3, 6, 4); // Ground Foundation
    const slab1 = addSlab(0, 6, 4);  // Mid slab
    const slab2 = addSlab(3, 4, 3);  // Upper roof slab (set back on left side)

    // Vertical Columns connecting slabs
    // Main structural columns
    for (let i = 0; i < 4; i++) {
      villaEdges.push([slab0 + i, slab1 + i]);
    }
    // Upper floor columns
    for (let i = 0; i < 4; i++) {
      villaEdges.push([slab1 + i, slab2 + i]);
    }

    // Facade frame details
    const startFacade = villaVertices.length;
    // Ground floor front glass doors
    villaVertices.push(
      { x: -2, y: -3, z: 4, type: 'house' },
      { x: -2, y: 0, z: 4, type: 'house' },
      { x: 2, y: -3, z: 4, type: 'house' },
      { x: 2, y: 0, z: 4, type: 'house' }
    );
    villaEdges.push(
      [startFacade, startFacade + 1],
      [startFacade + 2, startFacade + 3]
    );

    // Cantilever overhang columns and details
    const startCantilever = villaVertices.length;
    villaVertices.push(
      { x: 5, y: 0, z: 5, type: 'house' },
      { x: 5, y: -3, z: 5, type: 'house' }
    );
    villaEdges.push(
      [slab1 + 2, startCantilever],
      [startCantilever, startCantilever + 1]
    );

    // 2. Generate 200 lender network nodes in a spherical lattice
    const networkNodes = [];
    const totalNodes = 200;
    
    // Golden ratio spherical distribution for perfect spacing
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < totalNodes; i++) {
      const yCoord = 1 - (i / (totalNodes - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - yCoord * yCoord); // radius at y
      const theta = phi * i; // golden angle increment

      const xCoord = Math.cos(theta) * radius;
      const zCoord = Math.sin(theta) * radius;

      // Random network offsets to make it organic
      networkNodes.push({
        x: xCoord * 8,
        y: yCoord * 8,
        z: zCoord * 8,
        type: 'network',
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Determine network connections (edges between nearby nodes)
    const networkEdges = [];
    const maxConnectionDist = 3.5;
    for (let i = 0; i < totalNodes; i++) {
      let connections = 0;
      for (let j = i + 1; j < totalNodes; j++) {
        const dx = networkNodes[i].x - networkNodes[j].x;
        const dy = networkNodes[i].y - networkNodes[j].y;
        const dz = networkNodes[i].z - networkNodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        // Limit connections to keep it clean
        if (dist < maxConnectionDist && connections < 3) {
          networkEdges.push([i, j]);
          connections++;
        }
      }
    }

    // Handle Window Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Perspective Projection Logic
    const project = (x, y, z, angleY, angleX) => {
      // Rotate Y
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      // Rotate X
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      // Project with perspective
      const cameraDist = 18;
      const fovScale = Math.min(width, height) * 0.95;
      
      const scale = fovScale / (z2 + cameraDist);
      const px = width / 2 + x1 * scale;
      const py = height / 2 - y2 * scale;

      return { x: px, y: py, depth: z2 };
    };

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Define progression stages based on scroll
      // Stage 1 (0.0 to 0.45): Pure Villa
      // Stage 2 (0.45 to 0.65): Morphing
      // Stage 3 (0.65 to 1.0): Network Nodes
      const scrollVal = scrollProgress;
      
      let morphFactor = 0;
      if (scrollVal > 0.45) {
        morphFactor = Math.min(1, (scrollVal - 0.45) / 0.2); // goes 0 to 1
      }

      // Smooth camera rotations
      const angleY = (scrollVal * Math.PI * 1.5) + (tick * 0.001);
      const angleX = -0.15 + Math.sin(tick * 0.002) * 0.05 + (scrollVal * 0.3);

      // Calculate morphed vertices
      const currentVertices = [];
      
      // We will map the villa vertices into a subset of network nodes during morph
      const villaToNetworkMapping = villaVertices.map((v, i) => {
        // Map to a deterministic node index
        const targetNodeIdx = Math.floor((i / villaVertices.length) * totalNodes);
        return targetNodeIdx;
      });

      // Project house vertices
      villaVertices.forEach((v, idx) => {
        const targetNode = networkNodes[villaToNetworkMapping[idx]];
        const currentX = v.x + (targetNode.x - v.x) * morphFactor;
        const currentY = v.y + (targetNode.y - v.y) * morphFactor;
        const currentZ = v.z + (targetNode.z - v.z) * morphFactor;

        currentVertices.push(project(currentX, currentY, currentZ, angleY, angleX));
      });

      // Project network nodes
      const projectedNetworkNodes = networkNodes.map(node => {
        // During morph, network nodes scale up from the center or fade in
        const scaleIn = Math.min(1, scrollVal / 0.45);
        const currentX = node.x * (morphFactor > 0 ? 1 : scaleIn * 0.6);
        const currentY = node.y * (morphFactor > 0 ? 1 : scaleIn * 0.6);
        const currentZ = node.z * (morphFactor > 0 ? 1 : scaleIn * 0.6);

        return project(currentX, currentY, currentZ, angleY, angleX);
      });

      // Draw structural grid / connections
      ctx.lineWidth = 0.8;

      // 1. Draw House Edges (fade out during morph)
      if (morphFactor < 1) {
        ctx.strokeStyle = `rgba(217, 180, 143, ${0.18 * (1 - morphFactor)})`;
        villaEdges.forEach(([start, end]) => {
          const p1 = currentVertices[start];
          const p2 = currentVertices[end];
          
          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      }

      // 2. Draw Network Edges (fade in based on scroll/morph)
      const networkOpacity = Math.max(0, (scrollVal - 0.2) / 0.4);
      if (networkOpacity > 0) {
        ctx.strokeStyle = `rgba(217, 180, 143, ${0.1 * networkOpacity})`;
        ctx.lineWidth = 0.5;
        networkEdges.forEach(([start, end]) => {
          const p1 = projectedNetworkNodes[start];
          const p2 = projectedNetworkNodes[end];

          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Micro-pulsing signal moving along the connection line
            const timeParam = (tick * 0.015 + start) % 1.0;
            const signalX = p1.x + (p2.x - p1.x) * timeParam;
            const signalY = p1.y + (p2.y - p1.y) * timeParam;
            ctx.fillStyle = `rgba(217, 180, 143, ${0.35 * networkOpacity})`;
            ctx.beginPath();
            ctx.arc(signalX, signalY, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // 3. Draw Nodes (fading in and glowing)
      const nodeFadeIn = Math.min(1, scrollVal / 0.3);
      if (nodeFadeIn > 0) {
        projectedNetworkNodes.forEach((pNode, idx) => {
          const baseSize = idx % 3 === 0 ? 2 : 1.2;
          const pulse = Math.sin(tick * 0.05 + networkNodes[idx].pulseOffset) * 0.5 + 0.5;
          const nodeSize = baseSize + pulse * 1.5;

          // Nodes closer to camera are brighter and larger
          const depthMultiplier = Math.max(0.2, (20 - pNode.depth) / 25);
          const opacity = 0.35 * nodeFadeIn * depthMultiplier * (morphFactor > 0 ? 1 : 0.6);

          ctx.fillStyle = `rgba(217, 180, 143, ${opacity})`;
          ctx.beginPath();
          ctx.arc(pNode.x, pNode.y, nodeSize * depthMultiplier, 0, Math.PI * 2);
          ctx.fill();

          // Core bright center for larger nodes
          if (baseSize === 2 && opacity > 0.15) {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.5})`;
            ctx.beginPath();
            ctx.arc(pNode.x, pNode.y, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 bg-[#151717]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
