import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || window.innerWidth;
    const H = el.clientHeight || window.innerHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000);
    camera.position.set(0, 0, 6);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pL1 = new THREE.PointLight(0x3d7fff, 5, 25);
    pL1.position.set(4, 4, 4);
    scene.add(pL1);
    const pL2 = new THREE.PointLight(0x7c3aed, 3, 20);
    pL2.position.set(-4, -3, 2);
    scene.add(pL2);
    const pL3 = new THREE.PointLight(0x00d4ff, 2, 18);
    pL3.position.set(0, 5, -2);
    scene.add(pL3);

    /* ── Particles ── */
    const N = 2000;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const palette = [
      new THREE.Color('#3d7fff'),
      new THREE.Color('#00d4ff'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#00f5a0'),
    ];
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.7 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ── 3-D wireframe shapes ── */
    const shapes = [];
    const defs = [
      { geo: new THREE.TorusKnotGeometry(0.55, 0.15, 100, 16), color: '#3d7fff', x:  2.8, y:  1.2, z: -2.5 },
      { geo: new THREE.TorusGeometry(0.7, 0.1, 16, 60),         color: '#00d4ff', x: -3.0, y: -0.8, z: -1.5 },
      { geo: new THREE.OctahedronGeometry(0.55),                 color: '#7c3aed', x:  1.0, y: -2.2, z: -3.0 },
      { geo: new THREE.IcosahedronGeometry(0.45),                color: '#00f5a0', x: -1.8, y:  2.0, z: -2.0 },
      { geo: new THREE.TetrahedronGeometry(0.5),                 color: '#f59e0b', x:  3.2, y: -1.8, z: -1.0 },
    ];
    defs.forEach(d => {
      const m = new THREE.Mesh(
        d.geo,
        new THREE.MeshStandardMaterial({ color: d.color, wireframe: true, transparent: true, opacity: 0.45 })
      );
      m.position.set(d.x, d.y, d.z);
      scene.add(m);
      shapes.push({ mesh: m, ox: d.x, oy: d.y });
    });

    /* ── Grid plane ── */
    const gridHelper = new THREE.GridHelper(30, 30, 0x1a2540, 0x0d1830);
    gridHelper.position.y = -4;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    scene.add(gridHelper);

    /* ── Mouse parallax ── */
    let mx = 0, my = 0;
    const onMove = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    /* ── Animate ── */
    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      points.rotation.y = t * 0.025;
      points.rotation.x = t * 0.012;

      shapes.forEach((s, i) => {
        s.mesh.rotation.x = t * 0.28 + i * 1.2;
        s.mesh.rotation.y = t * 0.35 + i * 0.7;
        s.mesh.position.y = s.oy + Math.sin(t * 0.6 + i) * 0.35;
      });

      pL1.position.x = Math.sin(t * 0.4) * 5;
      pL2.position.y = Math.cos(t * 0.3) * 4;

      camera.position.x += (mx * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (my * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    tick();

    /* ── Resize ── */
    const onResize = () => {
      const w = el.clientWidth; const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
