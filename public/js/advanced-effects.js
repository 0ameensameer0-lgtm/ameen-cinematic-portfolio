// ============================================
// Advanced 3D Effects and Particles
// ============================================

class ParticleSystem {
  constructor(container, particleCount = 200) {
    this.container = container;
    this.particleCount = particleCount;
    this.particles = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        color: this.getRandomColor()
      };
      this.particles.push(particle);
    }
  }

  getRandomColor() {
    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#a855f7', '#f97316'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;

      // Bounce off edges
      if (particle.x < 0 || particle.x > window.innerWidth) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > window.innerHeight) {
        particle.vy *= -1;
      }
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.container.width, this.container.height);

    this.particles.forEach(particle => {
      const scale = 1 - (particle.z / 1000);
      const size = particle.size * scale;

      ctx.globalAlpha = particle.opacity * scale;
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, size, size);
      ctx.globalAlpha = 1;
    });
  }

  animate() {
    this.update();
    this.draw(this.container.getContext('2d'));
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// Advanced Morphing Shapes
// ============================================

class MorphingShape {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.animate();
  }

  drawCircle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      this.ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
      rot += step;

      this.ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
      rot += step;
    }

    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
  }

  animate() {
    this.time += 0.01;

    // Clear canvas
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw morphing shapes
    const radius = 50 + Math.sin(this.time) * 20;
    
    this.ctx.fillStyle = `rgba(99, 102, 241, ${0.5 + Math.cos(this.time) * 0.3})`;
    this.drawCircle(
      this.centerX + Math.sin(this.time) * 50,
      this.centerY + Math.cos(this.time * 0.8) * 50,
      radius
    );

    this.ctx.fillStyle = `rgba(236, 72, 153, ${0.5 + Math.sin(this.time * 0.7) * 0.3})`;
    this.drawStar(
      this.centerX + Math.cos(this.time) * 50,
      this.centerY + Math.sin(this.time * 1.2) * 50,
      5,
      40 + Math.sin(this.time * 1.5) * 15,
      20 + Math.sin(this.time * 1.5) * 10
    );

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// Mouse Trail Effect
// ============================================

class MouseTrail {
  constructor() {
    this.points = [];
    this.maxPoints = 50;
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0
      });

      if (this.points.length > this.maxPoints) {
        this.points.shift();
      }
    });

    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.points.forEach((point, index) => {
      point.age += 1;
      const progress = point.age / this.maxPoints;
      const opacity = 1 - progress;

      this.ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.5})`;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 3 * (1 - progress), 0, Math.PI * 2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// Wave Animation
// ============================================

class WaveAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.time = 0;
    this.animate();
  }

  drawWave(yOffset, amplitude, frequency, color, alpha) {
    this.ctx.strokeStyle = color;
    this.ctx.globalAlpha = alpha;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    for (let x = 0; x < this.width; x += 5) {
      const y = yOffset + Math.sin((x + this.time) * frequency) * amplitude;
      if (x === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }

  animate() {
    // Clear canvas
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.time += 0.05;

    // Draw multiple waves
    this.drawWave(this.height / 4, 30, 0.01, '#6366f1', 0.6);
    this.drawWave(this.height / 2, 25, 0.015, '#ec4899', 0.5);
    this.drawWave(this.height / 1.5, 20, 0.02, '#06b6d4', 0.4);

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// Glow Effect
// ============================================

class GlowEffect {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.style.boxShadow = '0 0 0 0 rgba(99, 102, 241, 0.7)';

    let opacity = 1;
    const animate = () => {
      opacity -= 0.02;
      if (opacity < 0) opacity = 1;

      this.element.style.boxShadow = `0 0 ${20 + Math.sin(Date.now() * 0.003) * 10}px ${
        10 + opacity * 10
      }px rgba(99, 102, 241, ${0.5 + Math.sin(Date.now() * 0.003) * 0.3})`;

      requestAnimationFrame(animate);
    };

    animate();
  }
}

// ============================================
// Initialization
// ============================================

function initAdvanced3DEffects() {
  // Initialize particle system on hero section
  const hero3d = document.getElementById('hero3d');
  if (hero3d) {
    // Additional effects can be added here
  }

  // Optional: Mouse trail effect (comment out if too heavy)
  // new MouseTrail();

  // Add glow effects to buttons
  document.querySelectorAll('.cta-btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      new GlowEffect(btn);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdvanced3DEffects);
} else {
  initAdvanced3DEffects();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ParticleSystem,
    MorphingShape,
    MouseTrail,
    WaveAnimation,
    GlowEffect
  };
}
