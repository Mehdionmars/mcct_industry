/* MCCT — Expérience architecturale 3D pilotée au scroll (Three.js, hangar procédural remplaçable par un .glb) */
(function () {
  const ACC = 0x2478be, ACCS = '#2478BE';
  const FALLBACK_IMG = '/assets/gallery/IMG_7861.webp';
  const CHAPTERS_FR = [
    { s: 0.00, e: 0.15, num: '', label: 'INTRO', t1: 'MCCT INDUSTRIE', t2: 'L’INGÉNIERIE\nAU SERVICE\nDE L’INDUSTRIE.', sub: 'Faites défiler pour explorer notre univers industriel' },
    { s: 0.15, e: 0.30, num: '01', label: 'APPROCHE', t1: '01 — ENGINEERING', t2: 'DU CONCEPT\nÀ LA RÉALITÉ\nINDUSTRIELLE.', sub: 'Études, dimensionnement, plans d’exécution' },
    { s: 0.30, e: 0.50, num: '02', label: 'ENGINEERING', t1: '02 — STRUCTURE', t2: 'LA PRÉCISION\nÀ CHAQUE\nÉTAPE.', sub: 'Charpente acier — mode plan technique' },
    { s: 0.50, e: 0.70, num: '03', label: 'FABRICATION', t1: '03 — FABRICATION', t2: 'CONÇU POUR\nPERFORMER.', sub: 'Découpe, soudure, assemblage en atelier' },
    { s: 0.70, e: 0.85, num: '04', label: 'ASSEMBLAGE', t1: '04 — ASSEMBLAGE', t2: 'DE L’ATELIER\nAU CHANTIER.', sub: 'Vue éclatée : fondation, ossature, couverture' },
    { s: 0.85, e: 1.01, num: '05', label: 'MCCT', t1: 'MCCT INDUSTRIE', t2: 'CONSTRUIRE\nL’INDUSTRIE\nDE DEMAIN.', sub: '' }
  ];
  const CHAPTERS_EN = [
    { s: 0.00, e: 0.15, num: '', label: 'INTRO', t1: 'MCCT INDUSTRIE', t2: 'ENGINEERING\nAT THE SERVICE\nOF INDUSTRY.', sub: 'Scroll to explore our industrial world' },
    { s: 0.15, e: 0.30, num: '01', label: 'APPROACH', t1: '01 — ENGINEERING', t2: 'FROM CONCEPT\nTO INDUSTRIAL\nREALITY.', sub: 'Studies, sizing and shop drawings' },
    { s: 0.30, e: 0.50, num: '02', label: 'ENGINEERING', t1: '02 — STRUCTURE', t2: 'PRECISION\nAT EVERY\nSTAGE.', sub: 'Steel frame — technical drawing mode' },
    { s: 0.50, e: 0.70, num: '03', label: 'FABRICATION', t1: '03 — FABRICATION', t2: 'BUILT TO\nPERFORM.', sub: 'Cutting, welding and assembly in the workshop' },
    { s: 0.70, e: 0.85, num: '04', label: 'ASSEMBLY', t1: '04 — ASSEMBLY', t2: 'FROM WORKSHOP\nTO SITE.', sub: 'Exploded view: foundation, frame, roofing' },
    { s: 0.85, e: 1.01, num: '05', label: 'MCCT', t1: 'MCCT INDUSTRIE', t2: 'BUILDING\nTOMORROW’S\nINDUSTRY.', sub: '' }
  ];
  let CHAPTERS = CHAPTERS_FR;
  const KEYS = [
    { p: 0.00, pos: [30, 9, 44], tgt: [0, 4, 0] },
    { p: 0.15, pos: [16, 5, 28], tgt: [0, 4, 0] },
    { p: 0.30, pos: [4, 3.2, 17], tgt: [0, 3.5, 0] },
    { p: 0.50, pos: [0, 3, 5], tgt: [-7, 3, -6] },
    { p: 0.70, pos: [-5, 4, -3], tgt: [7, 2.5, -4] },
    { p: 0.85, pos: [-13, 7, -20], tgt: [0, 4, 0] },
    { p: 1.00, pos: [-27, 11, -37], tgt: [0, 5, 0] }
  ];
  const smooth = t => t * t * (3 - 2 * t);
  const bump = (p, a, b) => { if (p < a || p > b) return 0; const t = (p - a) / (b - a); return smooth(1 - Math.abs(t * 2 - 1)); };

  class IndustrialExperience extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      CHAPTERS = this.getAttribute('data-lang') === 'en' ? CHAPTERS_EN : CHAPTERS_FR;
      const coarsePtr = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      // Sur petit écran, le texte passe en blanc sur un voile sombre : le gris foncé
      // de la version desktop devient illisible par-dessus la maquette claire.
      const narrow = window.innerWidth < 900;
      this._narrow = narrow;
      const lowEnd = coarsePtr && ((navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4));
      this.style.cssText = 'display:block;height:' + (coarsePtr ? '340vh' : '500vh') + ';position:relative;background:#dfe3e6;';
      this.innerHTML = `
        <div data-stick style="position:sticky;top:0;height:100vh;overflow:hidden;">
          <div data-canvas style="position:absolute;inset:0;"></div>
          <div data-fallback style="position:absolute;inset:0;display:none;background:url('${FALLBACK_IMG}') center/cover;">
            <div style="position:absolute;inset:0;background:rgba(13,15,16,.55);"></div>
          </div>
          <div data-scrim style="position:absolute;inset:0;pointer-events:none;display:${narrow ? 'block' : 'none'};background:linear-gradient(180deg,rgba(13,15,16,0) 26%,rgba(13,15,16,.72) 58%,rgba(13,15,16,.93) 100%);"></div>
          <div data-overlay style="position:absolute;inset:0;pointer-events:none;"></div>
          <div data-ind style="position:absolute;left:${narrow ? '20px' : '40px'};bottom:${narrow ? '18px' : '36px'};font-family:'Space Grotesk','Manrope',sans-serif;font-weight:700;letter-spacing:.2em;font-size:12px;color:#17191C;">01 / 06 — INTRO</div>
          <div data-anno style="display:${narrow ? 'none' : 'block'};position:absolute;right:40px;top:20%;opacity:0;transition:opacity .5s;border:1px solid ${ACCS};background:rgba(245,245,242,.85);backdrop-filter:blur(6px);padding:14px 18px;font-family:'Manrope',sans-serif;">
            <div style="font-size:11px;font-weight:800;letter-spacing:.2em;color:${ACCS};">CHARPENTE ACIER — 01</div>
            <div style="font-size:12.5px;color:#3a3f45;margin-top:6px;">Portiques &amp; pannes — construction métallique</div>
            <div style="width:1px;height:60px;background:${ACCS};position:absolute;left:50%;top:100%;"></div>
          </div>
          <div data-dims style="display:${narrow ? 'none' : 'block'};position:absolute;left:50%;bottom:14%;transform:translateX(-50%);opacity:0;transition:opacity .5s;font-family:'Space Grotesk',monospace,sans-serif;font-size:12px;letter-spacing:.3em;color:${ACCS};white-space:nowrap;">←──── 44.00 m (illustratif) ────→</div>
        </div>`;
      const ov = this.querySelector('[data-overlay]');
      this._chapEls = CHAPTERS.map((c, i) => {
        const d = document.createElement('div');
        d.style.cssText = narrow
          ? 'position:absolute;left:20px;right:20px;bottom:98px;max-width:none;opacity:0;transition:opacity .4s,transform .6s;font-family:\'Manrope\',sans-serif;color:#fff;'
          : 'position:absolute;left:40px;top:50%;transform:translateY(-50%);max-width:560px;opacity:0;transition:opacity .4s,transform .6s;font-family:\'Manrope\',sans-serif;color:#17191C;';
        d.innerHTML = `<p style="margin:0 0 14px;font-size:12.5px;font-weight:800;letter-spacing:.26em;color:${ACCS};">${c.t1}</p>
          <h2 style="margin:0;font-family:'Space Grotesk','Manrope',sans-serif;font-size:${narrow ? 'clamp(1.9rem,7.5vw,2.6rem)' : 'clamp(2.2rem,4.6vw,4.6rem)'};line-height:${narrow ? '1.02' : '.98'};font-weight:700;letter-spacing:-0.02em;white-space:pre-line;">${c.t2}</h2>
          ${c.sub ? `<p style="margin:${narrow ? '12px' : '18px'} 0 0;font-size:${narrow ? '14px' : '15px'};color:${narrow ? '#c4cad0' : '#565e66'};">${c.sub}</p>` : ''}
          ${i === CHAPTERS.length - 1 ? `<a href="#projets" style="pointer-events:auto;display:inline-flex;align-items:center;gap:12px;margin-top:${narrow ? '18px' : '26px'};background:${ACCS};color:#fff;padding:16px 26px;font-size:12px;font-weight:800;letter-spacing:.16em;text-decoration:none;">${this.getAttribute('data-lang') === 'en' ? 'EXPLORE OUR PROJECTS' : 'EXPLORER NOS PROJETS'} →</a>` : ''}`;
        ov.appendChild(d);
        return d;
      });
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (lowEnd) return this.showFallback();
      import('https://unpkg.com/three@0.160.0/build/three.module.js')
        .then(THREE => this.init3d(THREE, reduced))
        .catch(() => this.showFallback());
      this._onScroll = () => { this._prog = this.progress(); };
      window.addEventListener('scroll', this._onScroll, { passive: true });
    }
    disconnectedCallback() {
      window.removeEventListener('scroll', this._onScroll);
      if (this._raf) cancelAnimationFrame(this._raf);
      if (this._renderer) this._renderer.dispose();
    }
    progress() {
      const r = this.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / (total || 1)));
    }
    showFallback() {
      this.querySelector('[data-fallback]').style.display = 'block';
      this._chapEls.forEach((el, i) => { el.style.opacity = i === 0 ? 1 : 0; el.style.color = '#fff'; });
      this._fallback = true;
      const upd = () => {
        const p = this.progress();
        const ci = CHAPTERS.findIndex(c => p >= c.s && p < c.e);
        this._chapEls.forEach((el, i) => {
          el.style.opacity = i === (ci < 0 ? 5 : ci) ? 1 : 0;
          el.querySelectorAll('h2,p').forEach(n => n.style.color = '');
          el.style.color = '#fff';
        });
        this.querySelector('[data-ind]').style.color = '#fff';
        this.setIndicator(p);
        this._raf = requestAnimationFrame(upd);
      };
      upd();
    }
    setIndicator(p) {
      const ci = Math.max(0, CHAPTERS.findIndex(c => p >= c.s && p < c.e));
      const c = CHAPTERS[ci < 0 ? CHAPTERS.length - 1 : ci];
      this.querySelector('[data-ind]').textContent = `0${(ci < 0 ? 5 : ci) + 1} / 06 — ${c.label}`;
    }
    init3d(THREE, reduced) {
      const holder = this.querySelector('[data-canvas]');
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      } catch (e) { return this.showFallback(); }
      this._renderer = renderer;
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.25 : 2));
      renderer.setSize(holder.clientWidth, holder.clientHeight);
      renderer.shadowMap.enabled = !coarse;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      holder.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdfe3e6);
      scene.fog = new THREE.Fog(0xdfe3e6, 40, 140);
      const cam = new THREE.PerspectiveCamera(45, holder.clientWidth / holder.clientHeight, 0.1, 300);

      // Lumières — visualisation architecturale
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const sun = new THREE.DirectionalLight(0xfff2e0, 1.6);
      sun.position.set(40, 50, 30); sun.castShadow = !coarse;
      sun.shadow.mapSize.set(1024, 1024);
      sun.shadow.camera.left = -40; sun.shadow.camera.right = 40; sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -40;
      scene.add(sun);
      const interiors = [];
      for (let z = -8; z <= 8; z += 8) {
        const l = new THREE.PointLight(0xfff6e8, 0, 30);
        l.position.set(0, 8.5, z); scene.add(l); interiors.push(l);
      }

      // Matériaux
      const mSteel = new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.55, roughness: 0.35, transparent: true });
      const mPanel = new THREE.MeshStandardMaterial({ color: 0xf2f2ee, metalness: 0.1, roughness: 0.8, transparent: true, side: THREE.DoubleSide });
      const mConc = new THREE.MeshStandardMaterial({ color: 0xc9c9c3, roughness: 0.95, transparent: true });
      const mDark = new THREE.MeshStandardMaterial({ color: 0x2a2e33, metalness: 0.4, roughness: 0.5, transparent: true });
      const mYellow = new THREE.MeshStandardMaterial({ color: 0xd9a514, metalness: 0.3, roughness: 0.5, transparent: true });
      const mats = [mSteel, mPanel, mConc, mDark, mYellow];

      // Groupes (pour la vue éclatée)
      const gFound = new THREE.Group(), gFrame = new THREE.Group(), gRoof = new THREE.Group(), gEquip = new THREE.Group();
      const W = 20, D = 14, H = 7, APEX = 10.5;

      const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ color: 0xd7d7d1, roughness: 1 }));
      ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
      const slab = new THREE.Mesh(new THREE.BoxGeometry(2 * W + 4, 0.4, 2 * D + 4), mConc);
      slab.position.y = 0.2; slab.receiveShadow = true; gFound.add(slab);

      const box = (w, h, d, m, x, y, z, g, ry, rz) => {
        const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
        me.position.set(x, y, z); if (ry) me.rotation.y = ry; if (rz) me.rotation.z = rz;
        me.castShadow = !coarse; g.add(me); return me;
      };
      // Portiques : poteaux + arbalétriers (7 files)
      const rafLen = Math.hypot(W, APEX - H) + 0.6, rafAng = Math.atan2(APEX - H, W);
      for (let i = 0; i <= 6; i++) {
        const z = -D + i * (2 * D / 6);
        box(0.5, H, 0.5, mSteel, -W, H / 2 + 0.4, z, gFrame);
        box(0.5, H, 0.5, mSteel, W, H / 2 + 0.4, z, gFrame);
        box(rafLen, 0.45, 0.45, mSteel, -W / 2, H + (APEX - H) / 2 + 0.4, z, gFrame, 0, rafAng);
        box(rafLen, 0.45, 0.45, mSteel, W / 2, H + (APEX - H) / 2 + 0.4, z, gFrame, 0, -rafAng);
        if (i > 0) { // contreventements
          const zc = z - D / 6;
          box(0.12, Math.hypot(2 * D / 6, H) - 0.5, 0.12, mSteel, -W + 0.3, H / 2 + 0.4, zc, gFrame, 0, 0).rotation.x = Math.atan2(2 * D / 6, H);
        }
      }
      // Pannes longitudinales
      for (let k = 0; k <= 4; k++) {
        const x = -W + k * (W / 2), y = H + (APEX - H) * (1 - Math.abs(x) / W) + 0.7;
        box(0.25, 0.25, 2 * D, mSteel, x, y, 0, gFrame);
        if (k < 4) box(0.25, 0.25, 2 * D, mSteel, -(-W + k * (W / 2)), y, 0, gFrame);
      }
      // Couverture (2 pans)
      const roofL = new THREE.Mesh(new THREE.BoxGeometry(rafLen, 0.12, 2 * D + 1), mPanel);
      roofL.position.set(-W / 2, H + (APEX - H) / 2 + 1, 0); roofL.rotation.z = rafAng; gRoof.add(roofL);
      const roofR = roofL.clone(); roofR.position.x = W / 2; roofR.rotation.z = -rafAng; gRoof.add(roofR);
      // Bardage latéral (extrémités ouvertes)
      box(0.15, H, 2 * D, mPanel, -W - 0.4, H / 2 + 0.4, 0, gFrame);
      box(0.15, H, 2 * D, mPanel, W + 0.4, H / 2 + 0.4, 0, gFrame);
      // Pont roulant
      box(2 * W - 1, 0.6, 0.8, mYellow, 0, H - 0.6, -2, gEquip);
      box(1.2, 1.2, 1.2, mDark, 3, H - 1.6, -2, gEquip);
      // Machines & équipements
      box(3, 1.6, 2, mDark, -8, 1.2, -6, gEquip);
      box(2, 2.4, 2, mDark, 7, 1.6, -7, gEquip);
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 9, 16), mDark);
      pipe.rotation.z = Math.PI / 2; pipe.position.set(-4, 1, -10); pipe.castShadow = !coarse; gEquip.add(pipe);
      box(4, 1, 3, mConc, 10, 0.9, 4, gEquip);
      box(0.4, 5, 0.4, mSteel, 14, 2.9, 8, gEquip); // mât
      scene.add(gFound, gFrame, gRoof, gEquip);

      // Modèle réel MCCT (.glb) — remplace la maquette procédurale si l'attribut `model` est fourni
      const modelUrl = this.getAttribute('model');
      if (modelUrl) {
        import('https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js').then(({ GLTFLoader }) => {
          new GLTFLoader().load(modelUrl, gltf => {
            const m = gltf.scene;
            // recentrage + mise à l'échelle sur l'emprise de la maquette
            const bb = new THREE.Box3().setFromObject(m);
            const size = bb.getSize(new THREE.Vector3());
            const ctr = bb.getCenter(new THREE.Vector3());
            const k = (2 * W) / Math.max(size.x, size.z, 0.001);
            m.scale.setScalar(k);
            m.position.set(-ctr.x * k, -bb.min.y * k, -ctr.z * k);
            m.traverse(o => { if (o.isMesh) { o.castShadow = !coarse; o.receiveShadow = true; if (o.material) o.material.transparent = true; mats.push(o.material); } });
            // le modèle réel prend la place de l'ossature ; la vue éclatée s'applique à lui
            [gFrame, gRoof, gEquip].forEach(g => { g.visible = false; });
            gFrame.add(m); gFrame.visible = true;
            m.traverse(o => { if (o.isMesh) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry), edgeMat); o.add(e); edges.push(e); } });
          }, undefined, () => { /* échec de chargement : la maquette procédurale reste affichée */ });
        }).catch(() => {});
      }

      // Textures procédurales — béton, bardage nervuré, acier brossé
      const tex = (w, h, draw, rx, ry) => {
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        draw(c.getContext('2d'), w, h);
        const t = new THREE.CanvasTexture(c);
        t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
        t.anisotropy = coarse ? 2 : 8;
        return t;
      };
      const noise = (ctx, w, h, amount, alpha) => {
        for (let i = 0; i < amount; i++) {
          ctx.fillStyle = 'rgba(0,0,0,' + (Math.random() * alpha).toFixed(3) + ')';
          ctx.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 1 + Math.random() * 2);
        }
      };
      const concreteTex = tex(256, 256, (c, w, h) => {
        c.fillStyle = '#cfcfc9'; c.fillRect(0, 0, w, h);
        noise(c, w, h, 5000, .18);
        c.strokeStyle = 'rgba(0,0,0,.10)'; c.lineWidth = 2;
        for (let i = 0; i <= 4; i++) { const p = i * 64; c.beginPath(); c.moveTo(p, 0); c.lineTo(p, h); c.moveTo(0, p); c.lineTo(w, p); c.stroke(); }
      }, 12, 12);
      const ribbedTex = tex(128, 128, (c, w, h) => {
        c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h);
        for (let x = 0; x < w; x += 16) {
          const g = c.createLinearGradient(x, 0, x + 16, 0);
          g.addColorStop(0, 'rgba(0,0,0,.16)'); g.addColorStop(.5, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(0,0,0,.16)');
          c.fillStyle = g; c.fillRect(x, 0, 16, h);
        }
        noise(c, w, h, 900, .07);
      }, 26, 4);
      const steelTex = tex(128, 128, (c, w, h) => {
        c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
        for (let i = 0; i < 260; i++) {
          c.strokeStyle = 'rgba(0,0,0,' + (Math.random() * .12).toFixed(3) + ')';
          const y = Math.random() * h; c.beginPath(); c.moveTo(0, y); c.lineTo(w, y + (Math.random() - .5) * 3); c.stroke();
        }
      }, 3, 3);
      ground.material.map = concreteTex;
      ground.material.color.set(0xe2e2dc);
      ground.material.needsUpdate = true;
      mConc.map = concreteTex; mConc.roughnessMap = concreteTex;
      mPanel.map = ribbedTex; mPanel.roughnessMap = ribbedTex;
      mSteel.roughnessMap = steelTex; mSteel.metalnessMap = steelTex;
      mDark.roughnessMap = steelTex;
      [mConc, mPanel, mSteel, mDark].forEach(m => { m.needsUpdate = true; });

      // Arêtes "blueprint"
      var edgeMat = new THREE.LineBasicMaterial({ color: ACC, transparent: true, opacity: 0 });
      var edges = [];
      [gFrame, gRoof].forEach(g => g.traverse(o => {
        if (o.isMesh) {
          const e = new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry), edgeMat);
          o.add(e); edges.push(e);
        }
      }));

      // Particules — atmosphère industrielle
      const pGeo = new THREE.BufferGeometry(), pn = coarse ? 120 : 320, pos = new Float32Array(pn * 3);
      for (let i = 0; i < pn; i++) { pos[i * 3] = (Math.random() - 0.5) * 2 * W; pos[i * 3 + 1] = Math.random() * APEX; pos[i * 3 + 2] = (Math.random() - 0.5) * 2 * D; }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const dust = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.5 }));
      scene.add(dust);

      // Souris (desktop, hors reduced motion) — cible lissée pour éviter tout tremblement
      let mxT = 0, myT = 0, mx = 0, my = 0;
      if (!coarse && !reduced) window.addEventListener('mousemove', e => {
        mxT = (e.clientX / window.innerWidth - 0.5) * 0.05;
        myT = (e.clientY / window.innerHeight - 0.5) * 0.03;
      }, { passive: true });

      const onResize = () => {
        cam.aspect = holder.clientWidth / holder.clientHeight; cam.updateProjectionMatrix();
        renderer.setSize(holder.clientWidth, holder.clientHeight);
      };
      window.addEventListener('resize', onResize);

      const cur = new THREE.Vector3(...KEYS[0].pos), curT = new THREE.Vector3(...KEYS[0].tgt);
      const tp = new THREE.Vector3(), tt = new THREE.Vector3(), a = new THREE.Vector3(), b = new THREE.Vector3();
      let visible = true;
      new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(this);

      const anno = this.querySelector('[data-anno]'), dims = this.querySelector('[data-dims]');
      const tick = t => {
        this._raf = requestAnimationFrame(tick);
        if (!visible) return;
        const p = reduced ? 0 : this.progress();
        // caméra
        let i = 0; while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
        const k0 = KEYS[i], k1 = KEYS[i + 1], lt = smooth(Math.min(1, Math.max(0, (p - k0.p) / (k1.p - k0.p))));
        tp.set(...k0.pos).lerp(a.set(...k1.pos), lt);
        tt.set(...k0.tgt).lerp(b.set(...k1.tgt), lt);
        cur.lerp(tp, reduced ? 1 : 0.08); curT.lerp(tt, reduced ? 1 : 0.08);
        cam.position.copy(cur); cam.lookAt(curT);
        mx += (mxT - mx) * 0.05; my += (myT - my) * 0.05;
        cam.rotation.y += mx; cam.rotation.x += my;
        // blueprint (chapitre 02)
        const bp = bump(p, 0.28, 0.52);
        mats.forEach(m => { m.opacity = 1 - bp * 0.82; });
        edgeMat.opacity = bp;
        anno.style.opacity = bump(p, 0.14, 0.32) > 0.4 ? 1 : 0;
        dims.style.opacity = bp > 0.5 ? 1 : 0;
        // vue éclatée (chapitre 04)
        const ex = bump(p, 0.68, 0.87);
        gRoof.position.y = ex * 4.5; gFrame.position.y = ex * 1.6; gFound.position.y = -ex * 1.2; gEquip.position.y = ex * 0.4;
        // jour → nuit (fin)
        const night = Math.min(1, Math.max(0, (p - 0.78) / 0.2));
        sun.intensity = 1.6 - night * 1.25;
        scene.background.setHSL(0.58, 0.08 + night * 0.12, 0.88 - night * 0.72);
        scene.fog.color.copy(scene.background);
        interiors.forEach(l => l.intensity = night * 14);
        // texte
        this._chapEls.forEach((el, ci) => {
          const c = CHAPTERS[ci];
          const on = p >= c.s && p < c.e;
          el.style.opacity = on ? 1 : 0;
          if (!this._narrow) el.style.transform = 'translateY(' + (on ? '-50%' : '-46%') + ')';
          const light = night > 0.5 && ci >= 4;
          el.querySelector('h2').style.color = this._narrow || light ? '#fff' : '#17191C';
        });
        this.querySelector('[data-ind]').style.color = this._narrow || night > 0.5 ? '#fff' : '#17191C';
        this.setIndicator(p);
        // particules
        dust.rotation.y = t * 0.00002;
        renderer.render(scene, cam);
      };
      tick(0);
    }
  }
  if (!customElements.get('industrial-experience')) customElements.define('industrial-experience', IndustrialExperience);
})();
