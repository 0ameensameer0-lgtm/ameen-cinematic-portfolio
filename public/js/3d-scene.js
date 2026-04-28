let scene;
let camera;
let renderer;
let developerRig = {};
let particles;
let animationFrameId;

function init3DScene() {
  const container = document.getElementById('hero3d');
  if (!container || typeof THREE === 'undefined') return;

  scene = new THREE.Scene();

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 2.2, 10.6);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  buildScene();
  createDeveloperRig();
  createParticleField();

  window.addEventListener('resize', onWindowResize);
  animate3DScene();
}

function buildScene() {
  const ambient = new THREE.AmbientLight(0xdbeeff, 1.45);
  scene.add(ambient);

  const rimLight = new THREE.PointLight(0x56c2ff, 1.2, 40);
  rimLight.position.set(-6, 5, 4);
  scene.add(rimLight);

  const accentLight = new THREE.PointLight(0xff8a5b, 0.6, 35);
  accentLight.position.set(5, 3, 6);
  scene.add(accentLight);

  const floor = new THREE.Mesh(
    new THREE.CylinderGeometry(5.2, 6.2, 0.5, 48),
    new THREE.MeshStandardMaterial({
      color: 0x091423,
      metalness: 0.35,
      roughness: 0.78,
      transparent: true,
      opacity: 0.95
    })
  );
  floor.position.y = -2.15;
  scene.add(floor);

  const desk = new THREE.Group();
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.28, 2.2),
    new THREE.MeshStandardMaterial({ color: 0x173252, metalness: 0.32, roughness: 0.45 })
  );
  deskTop.position.y = -0.4;
  desk.add(deskTop);

  [-2.1, 2.1].forEach((x) => {
    [-0.8, 0.8].forEach((z) => {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 1.65, 12),
        new THREE.MeshStandardMaterial({ color: 0x7898bc, metalness: 0.8, roughness: 0.3 })
      );
      leg.position.set(x, -1.18, z);
      desk.add(leg);
    });
  });
  scene.add(desk);

  const monitorGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.1, 1.8),
    new THREE.MeshBasicMaterial({
      color: 0x6be6ff,
      transparent: true,
      opacity: 0.1
    })
  );
  monitorGlow.position.set(0.05, 1.2, -0.55);
  scene.add(monitorGlow);

  developerRig.monitorGlow = monitorGlow;
}

function createDeveloperRig() {
  const rig = new THREE.Group();

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xe1b89f,
    roughness: 0.74,
    metalness: 0.05
  });
  const hoodieMaterial = new THREE.MeshStandardMaterial({
    color: 0x1d4467,
    roughness: 0.72,
    metalness: 0.12
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x0d1726,
    roughness: 0.88,
    metalness: 0.08
  });
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x56c2ff,
    roughness: 0.48,
    emissive: 0x12324a,
    metalness: 0.22
  });

  const chair = new THREE.Group();
  const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 1.4), darkMaterial);
  chairSeat.position.set(0, -1.08, 0.2);
  chair.add(chairSeat);

  const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.25, 0.22), darkMaterial);
  chairBack.position.set(0, 0.08, 0.95);
  chair.add(chairBack);
  rig.add(chair);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.68, 1.55, 8, 18), hoodieMaterial);
  torso.position.set(0, 0.1, 0.3);
  torso.rotation.z = 0.03;
  rig.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 24), skinMaterial);
  head.position.set(0, 1.7, 0.3);
  rig.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.54, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55), darkMaterial);
  hair.position.set(0, 1.88, 0.3);
  hair.rotation.x = -0.2;
  rig.add(hair);

  const laptop = new THREE.Group();
  const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 1.12), darkMaterial);
  laptopBase.position.set(0.05, -0.12, -0.1);
  laptop.add(laptopBase);

  const laptopScreen = new THREE.Mesh(
    new THREE.BoxGeometry(1.72, 1.08, 0.08),
    new THREE.MeshStandardMaterial({
      color: 0x9cf2ff,
      emissive: 0x175675,
      emissiveIntensity: 1.15,
      roughness: 0.28,
      metalness: 0.2
    })
  );
  laptopScreen.position.set(0.05, 0.55, -0.62);
  laptopScreen.rotation.x = -0.82;
  laptop.add(laptopScreen);
  rig.add(laptop);

  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.44, 18), accentMaterial);
  mug.position.set(-1.52, -0.15, 0.35);
  rig.add(mug);

  const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 10, 20), accentMaterial);
  mugHandle.position.set(-1.33, -0.12, 0.35);
  mugHandle.rotation.y = Math.PI / 2;
  rig.add(mugHandle);

  const leftArmGroup = new THREE.Group();
  const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.0, 14), hoodieMaterial);
  leftUpperArm.position.set(-0.55, 0.82, 0.1);
  leftUpperArm.rotation.z = 0.9;
  leftArmGroup.add(leftUpperArm);

  const leftForearmPivot = new THREE.Group();
  leftForearmPivot.position.set(-1.0, 0.38, -0.1);
  const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.12, 14), hoodieMaterial);
  leftForearm.rotation.z = 1.12;
  leftForearm.position.set(-0.37, -0.2, -0.16);
  leftForearmPivot.add(leftForearm);

  const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 14), skinMaterial);
  leftHand.position.set(-0.86, -0.47, -0.31);
  leftForearmPivot.add(leftHand);
  leftArmGroup.add(leftForearmPivot);
  rig.add(leftArmGroup);

  const rightArmGroup = new THREE.Group();
  const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.0, 14), hoodieMaterial);
  rightUpperArm.position.set(0.55, 0.82, 0.1);
  rightUpperArm.rotation.z = -0.9;
  rightArmGroup.add(rightUpperArm);

  const rightForearmPivot = new THREE.Group();
  rightForearmPivot.position.set(1.0, 0.38, -0.1);
  const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.12, 14), hoodieMaterial);
  rightForearm.rotation.z = -1.12;
  rightForearm.position.set(0.37, -0.2, -0.16);
  rightForearmPivot.add(rightForearm);

  const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 14), skinMaterial);
  rightHand.position.set(0.86, -0.47, -0.31);
  rightForearmPivot.add(rightHand);
  rightArmGroup.add(rightForearmPivot);
  rig.add(rightArmGroup);

  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 1.52, 16), darkMaterial);
  leftLeg.position.set(-0.35, -1.28, 0.54);
  leftLeg.rotation.z = 0.1;
  rig.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 1.52, 16), darkMaterial);
  rightLeg.position.set(0.35, -1.28, 0.54);
  rightLeg.rotation.z = -0.1;
  rig.add(rightLeg);

  const keyboardPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.5),
    new THREE.MeshBasicMaterial({
      color: 0x7de5ff,
      transparent: true,
      opacity: 0.08
    })
  );
  keyboardPanel.position.set(0.02, -0.03, -0.35);
  keyboardPanel.rotation.x = -Math.PI / 2;
  rig.add(keyboardPanel);

  const floatingPanelA = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.95, 0.05),
    new THREE.MeshStandardMaterial({
      color: 0x143456,
      emissive: 0x17395c,
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: 0.88
    })
  );
  floatingPanelA.position.set(-3.1, 1.1, -0.8);
  floatingPanelA.rotation.y = 0.34;
  scene.add(floatingPanelA);

  const floatingPanelB = floatingPanelA.clone();
  floatingPanelB.position.set(3.1, 1.45, -1.0);
  floatingPanelB.rotation.y = -0.42;
  scene.add(floatingPanelB);

  rig.position.y = -0.15;
  scene.add(rig);

  developerRig = {
    ...developerRig,
    rig,
    head,
    torso,
    leftArmGroup,
    rightArmGroup,
    leftForearmPivot,
    rightForearmPivot,
    laptopScreen,
    floatingPanelA,
    floatingPanelB
  };
}

function createParticleField() {
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 140;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.35) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x7ee5ff,
    size: 0.055,
    transparent: true,
    opacity: 0.6
  });

  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
}

function animate3DScene() {
  animationFrameId = requestAnimationFrame(animate3DScene);

  const time = performance.now() * 0.001;

  if (developerRig.rig) {
    developerRig.rig.position.y = -0.15 + Math.sin(time * 1.2) * 0.06;
    developerRig.rig.rotation.y = Math.sin(time * 0.35) * 0.15;
  }

  if (developerRig.head) {
    developerRig.head.rotation.y = Math.sin(time * 0.7) * 0.12;
    developerRig.head.rotation.x = Math.cos(time * 0.8) * 0.05;
  }

  if (developerRig.torso) {
    developerRig.torso.rotation.x = Math.sin(time * 0.9) * 0.03;
  }

  if (developerRig.leftForearmPivot && developerRig.rightForearmPivot) {
    developerRig.leftForearmPivot.rotation.z = Math.sin(time * 3.2) * 0.12;
    developerRig.rightForearmPivot.rotation.z = -Math.sin(time * 3.1) * 0.12;
    developerRig.leftForearmPivot.rotation.x = Math.cos(time * 2.1) * 0.05;
    developerRig.rightForearmPivot.rotation.x = -Math.cos(time * 2.1) * 0.05;
  }

  if (developerRig.leftArmGroup && developerRig.rightArmGroup) {
    developerRig.leftArmGroup.rotation.y = Math.sin(time * 1.4) * 0.05;
    developerRig.rightArmGroup.rotation.y = -Math.sin(time * 1.4) * 0.05;
  }

  if (developerRig.laptopScreen) {
    developerRig.laptopScreen.material.emissiveIntensity = 1 + Math.sin(time * 2.2) * 0.18;
  }

  if (developerRig.monitorGlow) {
    developerRig.monitorGlow.material.opacity = 0.09 + (Math.sin(time * 2.1) + 1) * 0.02;
  }

  if (developerRig.floatingPanelA && developerRig.floatingPanelB) {
    developerRig.floatingPanelA.position.y = 1.1 + Math.sin(time * 0.9) * 0.15;
    developerRig.floatingPanelA.rotation.z = Math.sin(time * 0.5) * 0.04;
    developerRig.floatingPanelB.position.y = 1.45 + Math.cos(time * 0.85) * 0.16;
    developerRig.floatingPanelB.rotation.z = -Math.sin(time * 0.45) * 0.05;
  }

  if (particles) {
    particles.rotation.y += 0.0008;
    particles.rotation.x = Math.sin(time * 0.22) * 0.08;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById('hero3d');
  if (!container || !camera || !renderer) return;

  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init3DScene);
} else {
  init3DScene();
}
