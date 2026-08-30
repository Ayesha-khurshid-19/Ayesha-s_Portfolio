/* ==========================================================================
   AYESHA KHURSHID — AI ENGINEER PORTFOLIO
   Interactive Engine: 3D Canvas, Modals, PDF Resume, Filters & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThreeJsCanvas();
  initTimelineProgress();
  initStatCounters();
  initProjectFilters();
  initModals();
  initCertViewer();
  initCaseStudySystem();
  initResumeDownload();
  initCopyButtons();
  initContactForm();

  // Animation System Initializations
  initScrollReveal();
  initProject3DTilt();
  initSkillPopIn();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & SMOOTH SCROLL
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkElems = document.querySelectorAll('.nav-link');

  // Sticky navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id], div[id="certifications"]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 130;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkElems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Close mobile menu on click & smooth scroll handler
  navLinkElems.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. THREE.JS INTERACTIVE 3D CANVAS (HERO BACKGROUND WITH FALLBACKS)
   -------------------------------------------------------------------------- */
function initThreeJsCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Check prefers-reduced-motion or mobile low-power mode
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: !isMobile
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

    // Create 3D Torus Knot Geometry in Palette Colors
    const geometry = new THREE.TorusKnotGeometry(2.2, 0.5, isMobile ? 60 : 120, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x9A5B69, // Dusty Mauve
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Create Floating Particle Network
    const particlesCount = isMobile ? 40 : 80;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 16;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      color: 0xE39B86, // Peach Accent
      transparent: true,
      opacity: 0.6
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // Parallax mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    if (!isMobile) {
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
      });
    }

    // // Single static render for low-power mobile or full animation loop
    // if (isMobile) {
    //   torusKnot.rotation.x = 0.4;
    //   torusKnot.rotation.y = 0.6;
    //   renderer.render(scene, camera);
    // } else {
    //   let animationFrameId;
    //   function animate() {
    //     animationFrameId = requestAnimationFrame(animate);

    //     targetX += (mouseX - targetX) * 0.05;
    //     targetY += (mouseY - targetY) * 0.05;

    //     torusKnot.rotation.x += 0.003;
    //     torusKnot.rotation.y += 0.004;

    //     torusKnot.rotation.y += targetX;
    //     torusKnot.rotation.x += targetY;

    //     particlesMesh.rotation.y -= 0.001;

    //     renderer.render(scene, camera);
    //   }
    //   animate();
    // }

    // // Resize Handler
    // window.addEventListener('resize', () => {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   if (isMobile) renderer.render(scene, camera);
    // });
    
        if (!isMobile) {
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
      });
    } else {
      window.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        if (!t) return;
        mouseX = (t.clientX - window.innerWidth / 2) * 0.0008;
        mouseY = (t.clientY - window.innerHeight / 2) * 0.0008;
      }, { passive: true });
    }

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      torusKnot.rotation.x += isMobile ? 0.0015 : 0.003;
      torusKnot.rotation.y += isMobile ? 0.002 : 0.004;

      torusKnot.rotation.y += targetX;
      torusKnot.rotation.x += targetY;

      particlesMesh.rotation.y -= 0.001;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  } catch (e) {
    console.log('3D Canvas fallback active:', e);
  }
}

/* --------------------------------------------------------------------------
   3. TIMELINE PROGRESS LINE & ENTRY SLIDE ANIMATIONS
   -------------------------------------------------------------------------- */
function initTimelineProgress() {
  const timeline = document.getElementById('experience-timeline');
  const progressLine = document.getElementById('timeline-progress');
  const items = document.querySelectorAll('.timeline-item');
  if (!timeline || !progressLine) return;

  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const totalHeight = rect.height;
      const visible = windowHeight - rect.top;
      const percentage = Math.min(Math.max((visible / totalHeight) * 100, 0), 100);
      progressLine.style.height = `${percentage}%`;
    }
  });

  // Staggered reveal for timeline entries
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

/* --------------------------------------------------------------------------
   4. STAT COUNTERS ANIMATION (REPEATABLE ON EVERY SCROLL INTO VIEW)
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const stat = entry.target;
      const rawTarget = stat.getAttribute('data-target');
      const target = parseFloat(rawTarget);
      if (isNaN(target)) return;

      const suffix = stat.getAttribute('data-suffix') || (stat.textContent.includes('+') ? '+' : '');
      const isFloat = !Number.isInteger(target);

      // Cancel any in-progress animation frame to prevent stacked/overlapping animations
      if (stat._animFrameId) {
        cancelAnimationFrame(stat._animFrameId);
        stat._animFrameId = null;
      }

      if (entry.isIntersecting) {
        // Reset counter to 0 before starting count-up
        stat.textContent = (isFloat ? '0.00' : '0') + suffix;

        const hasComma = rawTarget.includes(',') || target >= 1000;
        const duration = 1400; // ms
        let startTime = null;

        function animateCounter(currentTime) {
          if (!startTime) startTime = currentTime;
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);

          // Cubic ease-out curve for smooth 60fps count-up
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = easedProgress * target;

          let valStr = '';
          if (isFloat) {
            valStr = currentValue.toFixed(2);
          } else if (hasComma) {
            valStr = Math.floor(currentValue).toLocaleString();
          } else {
            valStr = Math.floor(currentValue).toString();
          }

          stat.textContent = valStr + suffix;

          if (progress < 1) {
            stat._animFrameId = requestAnimationFrame(animateCounter);
          } else {
            const finalStr = isFloat
              ? target.toFixed(2)
              : (hasComma ? Math.floor(target).toLocaleString() : Math.floor(target).toString());
            stat.textContent = finalStr + suffix;
            stat._animFrameId = null;
          }
        }

        stat._animFrameId = requestAnimationFrame(animateCounter);
      } else {
        // Reset counter back to 0 when exiting viewport so it is ready to re-animate next time
        stat.textContent = (isFloat ? '0.00' : '0') + suffix;
      }
    });
  }, { threshold: 0.2 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/* --------------------------------------------------------------------------
   5. PROJECT FILTER SYSTEM
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. MODALS SYSTEM
   -------------------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (overlay) => {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(overlay => closeModal(overlay));
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // ESC key to close active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(overlay => {
        if (overlay.classList.contains('active')) {
          closeModal(overlay);
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6b. CERTIFICATE VIEWER MODAL
   -------------------------------------------------------------------------- */
function initCertViewer() {
  const buttons = document.querySelectorAll('.view-cert-btn');
  const modal = document.getElementById('cert-modal');
  const body = document.getElementById('cert-modal-body');
  const openTabLink = document.getElementById('cert-modal-open-tab');
  if (!modal || !body || !openTabLink) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const certUrl = btn.getAttribute('data-cert');
      const isImage = /\.(jpg|jpeg|png|webp)$/i.test(certUrl);

      if (isImage) {
        body.innerHTML = `<img src="${certUrl}" alt="Certificate" style="width:100%; height:100%; object-fit:contain; background:#f5f5f5;">`;
      } else {
        body.innerHTML = `<iframe src="${certUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH" title="Certificate" style="width:100%; height:100%; border:none;"></iframe>`;
      }

      openTabLink.href = certUrl;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* --------------------------------------------------------------------------
   7. TECHNICAL CASE STUDY SYSTEM (DEEP-DIVE MODALS)
   -------------------------------------------------------------------------- */
const caseStudyData = {
  'virtualfit': {
    title: 'FYP: VirtualFit — Deep Learning Try-On & Styling Engine',
    badge: 'Dawood University FYP (2026) | Supervised by Dr. Engr. Imran Khan',
    problem: 'Online fashion e-commerce suffers from high return rates because customers cannot visualize how clothes look on their unique body shape before purchasing.',
    solution: 'Designed an integrated 3-pillar AI system comprising computer vision virtual try-on, NLP style consultation chatbot, and body-attribute recommendation model.',
    implementation: [
      'Engineered image synthesis pipeline fitting clothing items onto user-uploaded body photos using deep learning pose and garment warping.',
      'Developed conversational NLP chatbot guiding users on fashion styling, outfit matching, and item queries.',
      'Implemented recommendation engine analyzing body shape, skin tone undertones, and user preferences.'
    ],
    pipeline: [
      'User Image & Garment Input Ingestion',
      'Pose Estimation & Body Mesh Segmentation',
      'Garment Warping & Thin-Plate Spline Transformation',
      'Try-On Image Synthesis & Refinement',
      'NLP Style Assistant & Recommendation Integration'
    ],
    tradeoffs: 'Prioritized high visual fidelity and texture preservation over lightweight edge inference to ensure realistic preview quality.',
    challenges: 'Solving clothing deformation around joint bends. Resolved by introducing keypoint-guided structural alignment.',
    metrics: 'Achieved high structural similarity score and user satisfaction across batch test trials.',
    stack: ['PyTorch', 'Computer Vision', 'NLP', 'Deep Learning', 'Python', 'Flask']
  },
  'rag-quote': {
    title: 'RAG-Powered Quote Autocomplete & Voice Assistant',
    badge: 'Production GenAI & Voice RAG System',
    problem: 'Searching large unstructured text corpora for loosely remembered quotes fails with standard keyword search when phrasing is partial or spoken.',
    solution: 'Built a unified text & voice semantic retrieval engine using LangGraph, Supabase pgvector, OpenAI Whisper, and Sentence-Transformers.',
    implementation: [
      'Embedded multi-thousand quote corpus into Supabase pgvector vector store using Sentence-Transformers.',
      'Orchestrated multi-turn conversational follow-ups (e.g., "give me another like that") using LangGraph state graphs.',
      'Chained OpenAI Whisper speech-to-text directly into retrieval endpoint to handle spoken queries in real-time.'
    ],
    pipeline: [
      'Spoken Audio / Typed Partial Quote Input',
      'OpenAI Whisper Speech Transcription (Voice Path)',
      'Sentence-Transformer Vector Embedding',
      'Supabase pgvector Cosine Similarity Search',
      'LangGraph Conversational Orchestration & Answer Delivery'
    ],
    tradeoffs: 'Used single unified retrieval endpoint for both text and voice, reducing backend complexity and latency.',
    challenges: 'Handling noisy or ambiguous voice transcripts. Solved by tuning vector similarity thresholds and adding multi-candidate fallback.',
    metrics: 'Reached ~95% retrieval accuracy on partial and fuzzy quote inputs across multi-turn sessions.',
    stack: ['LangGraph', 'Supabase pgvector', 'OpenAI Whisper', 'FastAPI', 'Sentence-Transformers', 'Python']
  },
  'satellite': {
    title: 'Object-Based Image Retrieval for Satellite Imagery',
    badge: 'Computer Vision & Deep Learning',
    problem: 'Traditional pixel-level image retrieval fails to match satellite scenes that share structural land-cover composition but differ in lighting or raw pixel values.',
    solution: 'Built a content-based image retrieval (CBIR) system leveraging instance segmentation to match satellite scenes by object composition.',
    implementation: [
      'Fine-tuned Mask R-CNN with ResNet-50 + FPN backbone on the LandCover.ai dataset.',
      'Segmented structural categories: buildings, woodland, water bodies, and roads per scene.',
      'Extracted object-level compositional vectors for semantic scene similarity matching.'
    ],
    pipeline: [
      'Satellite Scene Image Upload',
      'Mask R-CNN Feature Extraction (ResNet-50 + FPN)',
      'Instance Segmentation (Buildings, Water, Roads, Woodland)',
      'Composition Vector Generation & Distance Matrix Evaluation',
      'Top-K Structurally Similar Satellite Scene Retrieval'
    ],
    tradeoffs: 'Used deep instance segmentation feature vectors over global color histograms to guarantee structural similarity regardless of seasonal lighting.',
    challenges: 'High memory overhead during dense segmentation. Solved via feature map downsampling and feature vector caching.',
    metrics: 'Significantly outperformed baseline color-histogram retrieval in structural land-use matching precision.',
    stack: ['PyTorch', 'Mask R-CNN', 'ResNet-50', 'FPN', 'LandCover.ai', 'OpenCV', 'Python']
  },
  'histopath': {
    title: 'Histopathological Image Preprocessing & Normalization',
    badge: 'Medical Image Computing',
    problem: 'Stain color variations across laboratories and tissue warping across serial sections degrade downstream machine learning diagnostic performance.',
    solution: 'Developed an automated 3-stage registration and stain color normalization pipeline for histopathological slides.',
    implementation: [
      'Implemented rigid affine registration for global scaling and alignment.',
      'Applied homography matrix correction for perspective spatial alignment.',
      'Used B-spline elastic registration for local non-linear tissue warping compensation.',
      'Validated spatial accuracy using Target Registration Error (TRE) and Mean Square Error (MLE).'
    ],
    pipeline: [
      'Raw Tissue Slide Image Pair Loading',
      'Stain Color Normalization (Macenko / Vahadane)',
      'Stage 1: Rigid Affine Alignment',
      'Stage 2: Homography Perspective Correction',
      'Stage 3: B-Spline Elastic Deformable Warping',
      'Quantitative TRE & MLE Error Metrics Validation'
    ],
    tradeoffs: 'Selected multi-stage registration to balance computational speed with fine-grained non-rigid alignment accuracy.',
    challenges: 'Local tissue distortion artifacts. Mitigated using B-spline grid regularization.',
    metrics: 'Achieved sub-pixel Target Registration Error (TRE) across serial histological cut sections.',
    stack: ['SimpleITK', 'OpenCV', 'Python', 'NumPy', 'Scipy', 'Medical Imaging']
  },
  'drowsiness': {
    title: 'Real-Time Driver Drowsiness & Fatigue Alert System',
    badge: 'Real-Time Computer Vision',
    problem: 'Driver fatigue and momentary eye closures cause critical safety hazards; automated systems require high frame-rate detection without false positives.',
    solution: 'Designed a real-time computer vision system evaluating Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) to detect sustained fatigue.',
    implementation: [
      'Tracked 68 facial landmarks at 30+ FPS using MediaPipe and dlib landmark predictors.',
      'Calculated EAR for eye closure and MAR for yawning in real-time frame sequences.',
      'Engineered multi-frame sliding window thresholding to prevent false alarms from natural eye blinks.'
    ],
    pipeline: [
      'Live Webcam Video Stream Ingestion',
      'MediaPipe Facial Landmark Detection',
      'EAR (Eye Aspect Ratio) & MAR (Mouth Aspect Ratio) Computation',
      'Sliding Window Temporal Threshold Evaluation',
      'Real-Time Audio Visual Fatigue Alert Triggering'
    ],
    tradeoffs: 'Prioritized lightweight landmark calculation for smooth 30+ FPS execution on standard CPU hardware without GPU requirement.',
    challenges: 'Lighting variations and head rotation causing landmark jitter. Resolved via Kalman filtering smoothing.',
    metrics: 'Zero false alarms from regular blinks; 98%+ fatigue detection rate within 1.5 seconds of sustained closure.',
    stack: ['MediaPipe', 'OpenCV', 'dlib', 'Python', 'NumPy']
  },
  'breast-cancer': {
    title: 'Interpretable Breast Cancer Histopathology Classifier',
    badge: 'Medical AI & Explainable ML',
    problem: 'Black-box deep learning models lack clinical interpretability required by pathologists when classifying cancer biopsy slides.',
    solution: 'Created an interpretable classification framework combining handcrafted GLCM texture/morphology features with Random Forest ensembles.',
    implementation: [
      'Extracted Gray-Level Co-occurrence Matrix (GLCM) texture metrics (contrast, dissimilarity, homogeneity, energy).',
      'Calculated nuclear morphology parameters (area, perimeter, circularity, eccentricity).',
      'Trained Random Forest ensemble and analyzed Gini feature importance rankings for clinical validation.'
    ],
    pipeline: [
      'Histopathological Biopsy Image Input',
      'Nuclei Segmentation & Morphological Feature Extraction',
      'GLCM Texture Feature Matrix Construction',
      'Random Forest Ensemble Training & Cross-Validation',
      'Gini Importance Ranking & Pathologist Interpretability Report'
    ],
    tradeoffs: 'Chose handcrafted feature engineering + Random Forest over end-to-end CNN to provide transparent diagnostic decision factors.',
    challenges: 'High feature correlation. Resolved via pairwise correlation pruning and recursive feature elimination.',
    metrics: 'High classification accuracy with verified clinical correlation of top texture parameters.',
    stack: ['Scikit-Learn', 'Random Forest', 'GLCM', 'OpenCV', 'Pandas', 'Python']
  },
  'shipping': {
    title: 'Full-Stack Shipping & Logistics Management System',
    badge: 'Production Logistics Platform (2026)',
    problem: 'Logistics operators struggle with manual quotation generation, delayed bill of lading issuance, and fragmented financial profit tracking.',
    solution: 'Engineered a unified full-stack management platform automating document workflow, live document previews, and profit/loss analytics.',
    implementation: [
      'Automated PDF invoice, quotation, and bill-of-lading generation with embedded live previews.',
      'Integrated Supabase database for persistent shipment tracking and audit logging.',
      'Implemented automated GitHub Actions CI/CD pipeline for frictionless production deployment.'
    ],
    pipeline: [
      'Shipment Order / Quotation Form Entry',
      'Supabase Database Audit Record Creation',
      'Automated PDF Generation Engine',
      'Live Document Preview & Client Dispatch',
      'Real-Time P&L Dashboard & CI/CD Automated Build'
    ],
    tradeoffs: 'Used Supabase backend-as-a-service to enable instant realtime updates and built-in row level security.',
    challenges: 'Ensuring pixel-perfect PDF rendering across varied client devices. Solved via custom HTML-to-canvas rendering engine.',
    metrics: '100% automated document issuance with zero manual calculation errors across shipping logs.',
    stack: ['Python', 'Supabase', 'PostgreSQL', 'CI/CD', 'GitHub Actions', 'HTML/CSS']
  }
};

function initCaseStudySystem() {
  const caseStudyBtns = document.querySelectorAll('[data-casestudy]');
  const modal = document.getElementById('case-study-modal');
  const titleElem = document.getElementById('cs-modal-title');
  const bodyElem = document.getElementById('cs-modal-body');

  caseStudyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-casestudy');
      const data = caseStudyData[key];
      if (!data || !modal) return;

      titleElem.textContent = data.title;

      let html = `
        <span class="case-study-badge">${data.badge}</span>
        
        <h4 class="case-section-title"><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</h4>
        <p>${data.problem}</p>

        <h4 class="case-section-title"><i class="fa-solid fa-lightbulb"></i> Solution Overview</h4>
        <p>${data.solution}</p>

        <h4 class="case-section-title"><i class="fa-solid fa-code"></i> Key Technical Implementation</h4>
        <ul style="margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.implementation.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 class="case-section-title"><i class="fa-solid fa-diagram-project"></i> System Architecture Pipeline Flow</h4>
        <div class="pipeline-flow">
          ${data.pipeline.map((step, idx) => `
            <div class="pipeline-step">
              <div class="pipeline-step-num">${idx + 1}</div>
              <div><strong>Step ${idx + 1}:</strong> ${step}</div>
            </div>
          `).join('')}
        </div>

        <h4 class="case-section-title"><i class="fa-solid fa-scale-balanced"></i> Technical Tradeoffs & Challenges</h4>
        <p><strong>Tradeoffs:</strong> ${data.tradeoffs}</p>
        <p style="margin-top: 0.5rem;"><strong>Engineering Challenge:</strong> ${data.challenges}</p>

        <div class="metrics-box">
          <i class="fa-solid fa-chart-line"></i> <strong>Verified Results & Metrics:</strong><br>
          ${data.metrics}
        </div>

        <h4 class="case-section-title"><i class="fa-solid fa-layer-group"></i> Tech Stack</h4>
        <div class="skill-chips-wrapper" style="margin-top: 0.5rem;">
          ${data.stack.map(tech => `<span class="tech-chip">${tech}</span>`).join('')}
        </div>
      `;

      bodyElem.innerHTML = html;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* --------------------------------------------------------------------------
   8. DIRECT PDF RESUME GENERATION & DOWNLOAD (jsPDF)
   -------------------------------------------------------------------------- */
function initResumeDownload() {
  const triggers = document.querySelectorAll('.download-resume-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      showToast('Generating official Resume PDF...', 'info');

      try {
        if (window.jspdf && window.jspdf.jsPDF) {
          generatePdfWithJsPdf();
        } else {
          fallbackPdfDownload();
        }
      } catch (e) {
        console.error('PDF Generation Error:', e);
        fallbackPdfDownload();
      }
    });
  });
}

function generatePdfWithJsPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  // Palette colors
  const navy = [43, 67, 101];
  const mauve = [154, 91, 105];
  const textDark = [30, 49, 75];

  let y = 18;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...navy);
  doc.text('AYESHA KHURSHID', 20, y);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...mauve);
  doc.text('Artificial Intelligence Engineer', 20, y + 6);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Karachi, Pakistan | khurshidayesha003@gmail.com', 20, y + 12);
  doc.text('LinkedIn: linkedin.com/in/ayesha-khurshid-a79b31259', 20, y + 17);

  // Line separator
  doc.setDrawColor(...mauve);
  doc.setLineWidth(0.8);
  doc.line(20, y + 21, 190, y + 21);

  y += 28;

  // Profile Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...navy);
  doc.text('PROFILE SUMMARY', 20, y);
  doc.line(20, y + 1.5, 190, y + 1.5);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...textDark);
  const profileLines = doc.splitTextToSize(
    'Full-stack AI Engineer with 1+ year experience in Generative AI, Machine Learning, Deep Learning, Computer Vision, and Automation. Proven track record of architecting and deploying production-ready AI solutions.',
    170
  );
  doc.text(profileLines, 20, y);
  y += profileLines.length * 5 + 4;

  // Experience Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...navy);
  doc.text('WORK EXPERIENCE', 20, y);
  doc.line(20, y + 1.5, 190, y + 1.5);
  y += 6;

  const expData = [
    {
      role: 'Full Stack AI Engineer — Phoenix Technologies',
      date: 'Mar 2026 – Present | Karachi',
      desc: 'Architected and deployed end-to-end AI solutions (LLM chatbots, content generation, workflow automation) integrating OpenAI and Anthropic Claude APIs. Owned full-stack development, database architecture, cloud deployment, and CI/CD.'
    },
    {
      role: 'Data Science Intern — 10Pearls Shine Program',
      date: 'Apr 2026 – Jun 2026 | Karachi',
      desc: 'Built and deployed an end-to-end AQI prediction pipeline (ingestion, cleaning, validation, feature engineering, Hopsworks feature management) with a live capstone app.'
    },
    {
      role: 'Generative AI Intern — OneStop Vendors',
      date: 'Oct 2024 – Jan 2025 (14 Weeks) | Karachi',
      desc: 'Built and deployed an AI voice bot for Ufone franchise call automation and an intelligent sales bot for customer inquiries and service promotion.'
    }
  ];

  expData.forEach(item => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...navy);
    doc.text(item.role, 20, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...mauve);
    doc.text(item.date, 190, y, { align: 'right' });
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...textDark);
    const lines = doc.splitTextToSize(item.desc, 170);
    doc.text(lines, 20, y);
    y += lines.length * 4.5 + 4;
  });

  // Education
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...navy);
  doc.text('EDUCATION & HONORS', 20, y);
  doc.line(20, y + 1.5, 190, y + 1.5);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...navy);
  doc.text('BS Artificial Intelligence — Dawood University of Engineering & Technology', 20, y);
  doc.text('Nov 2022 – 2026', 190, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  doc.text('CGPA: 3.74 / 4.0 | HEC 4-Year Merit Scholarship Recipient | PM Youth Laptop Scheme Awardee', 20, y);
  y += 8;

  // Skills Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...navy);
  doc.text('TECHNICAL SKILLS', 20, y);
  doc.line(20, y + 1.5, 190, y + 1.5);
  y += 6;

  const skillsText = [
    'AI & ML: DL, NLP, CV, LangChain, LangGraph, RAG, Prompt Engineering, OpenAI API, Anthropic Claude',
    'Frameworks: PyTorch, TensorFlow, Scikit-learn, FastAPI, Flask, OpenCV, Pandas, NumPy, Streamlit',
    'Tools & Web: Docker, Git, CI/CD, pgvector, Pinecone, React, Node.js, REST APIs, MongoDB, Supabase'
  ];

  skillsText.forEach(skillLine => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...textDark);
    doc.text('• ' + skillLine, 20, y);
    y += 4.5;
  });

  doc.save('Ayesha_Khurshid_Resume.pdf');
  showToast('Resume downloaded successfully!', 'success');
}

function fallbackPdfDownload() {
  const content = `AYESHA KHURSHID — ARTIFICIAL INTELLIGENCE ENGINEER
Email: khurshidayesha003@gmail.com 
LinkedIn: https://www.linkedin.com/in/ayesha-khurshid-a79b31259/
Location: Karachi, Pakistan

================================================================================
PROFILE SUMMARY
================================================================================
Full-stack AI Engineer with 1+ year experience in Generative AI, Machine Learning,
Deep Learning, Computer Vision, and Automation. Proven track record of delivering
production-ready AI solutions.

================================================================================
EXPERIENCE
================================================================================
Full Stack AI Engineer | Phoenix Technologies | Mar 2026 – Present
• Architected and deployed end-to-end AI solutions (LLM chatbots, content generation,
  workflow automation) integrating OpenAI and Anthropic Claude via prompt pipelines.
• Owned full-stack dev, database architecture, cloud deployment, and CI/CD.

Data Science Intern | 10Pearls Shine Program | Apr 2026 – Jun 2026
• Built and deployed an end-to-end AQI prediction pipeline (ingestion, cleaning,
  feature engineering, model training, Hopsworks feature management).

Generative AI Intern | OneStop Vendors | Oct 2024 – Jan 2025
• Built and deployed an AI voice bot for Ufone franchise call automation and an
  intelligent sales bot for customer inquiries.

================================================================================
EDUCATION
================================================================================
BS Artificial Intelligence | Dawood University of Engineering & Tech (2022–2026)
• CGPA: 3.74 / 4.0 | HEC 4-Year Merit Scholarship | PM Youth Laptop Scheme

================================================================================
TECHNICAL SKILLS
================================================================================
AI & ML: DL, NLP, CV, LangChain, LangGraph, RAG, Prompt Engineering, OpenAI/Claude APIs
Frameworks: PyTorch, TensorFlow, Scikit-learn, FastAPI, Flask, OpenCV, Pandas/NumPy
Tools & DBs: Docker, Git, CI/CD, pgvector, Supabase, PostgreSQL, MongoDB, React, Node.js
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Ayesha_Khurshid_Resume.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Resume downloaded as Ayesha_Khurshid_Resume.txt', 'success');
}

/* --------------------------------------------------------------------------
   9. COPY TO CLIPBOARD & TOAST SYSTEM
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy]');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
      }).catch(err => {
        showToast('Failed to copy text', 'error');
      });
    });
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-xmark';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. CONTACT FORM HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    const mailtoUrl = `mailto:khurshidayesha003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

    window.location.href = mailtoUrl;

    showToast('Opening your email client to send message to Ayesha Khurshid...', 'success');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   11. SCROLL REVEAL FOR ALL PORTFOLIO SECTIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    'section:not(#hero), .about-highlights-card, .edu-card, .cert-card, .achievement-card, .contact-info-card, .contact-form-wrapper'
  );

  revealTargets.forEach(target => {
    target.classList.add('scroll-reveal');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });
  revealTargets.forEach(target => revealObserver.observe(target));
}

/* --------------------------------------------------------------------------
   12. PROJECT CARDS STAGGERED REVEAL & 3D PERSPECTIVE TILT
   -------------------------------------------------------------------------- */
function initProject3DTilt() {
  const projectGrid = document.getElementById('projects-grid');
  const projectCards = document.querySelectorAll('.project-card');
  if (!projectCards.length) return;

  // Staggered scroll-reveal for project cards
  if (projectGrid) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          projectCards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add('revealed');
            }, idx * 110);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

    observer.observe(projectGrid);
  }
}

/* --------------------------------------------------------------------------
   13. SKILL CHIPS STAGGERED POP-IN ANIMATION
   -------------------------------------------------------------------------- */
function initSkillPopIn() {
  const skillsSection = document.getElementById('skills');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');
  if (!skillsSection) return;

  // Assign staggered transition delays to skill chips within each category
  skillCategoryCards.forEach(card => {
    const chips = card.querySelectorAll('.skill-chip');
    chips.forEach((chip, idx) => {
      chip.style.transitionDelay = `${idx * 45}ms`;
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillCategoryCards.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add('revealed');
          }, idx * 100);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

  observer.observe(skillsSection);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.scroll-reveal, .project-card, .skill-category-card')
      .forEach(el => el.classList.add('revealed'));
  }, 4000);
});
