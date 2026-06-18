document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('platik-form');
  const submitBtn = document.getElementById('submit-btn');
  const errorBox  = document.getElementById('form-error');
  const thankYou  = document.getElementById('thank-you');

  // --- Barra de progreso (basada en paso) ---
  const progressFill = document.getElementById('progress-fill');
  const progressStep = document.getElementById('progress-step');

  const TOTAL_STEPS = 4;

  function updateStepProgress(step) {
    const pct = step / TOTAL_STEPS * 100;
    progressFill.style.width = pct + '%';
    progressStep.textContent = `Paso ${step} de ${TOTAL_STEPS}`;
  }

  // --- Navegación por pasos ---
  let currentStep = 1;

  function goToStep(target, direction) {
    const fromEl = document.getElementById(`step-${currentStep}`);
    const toEl   = document.getElementById(`step-${target}`);

    const exitClass  = direction === 'fwd' ? 'step-exiting-fwd'  : 'step-exiting-back';
    const enterClass = direction === 'fwd' ? 'step-entering-fwd' : 'step-entering-back';

    fromEl.classList.add(exitClass);

    setTimeout(() => {
      fromEl.classList.add('hidden');
      fromEl.classList.remove(exitClass);

      toEl.classList.remove('hidden');
      toEl.classList.add(enterClass);
      currentStep = target;
      updateStepProgress(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => toEl.classList.remove(enterClass), 360);
    }, 260);
  }

  // --- Portada → formulario ---
  document.getElementById('btn-start').addEventListener('click', () => {
    const portada = document.getElementById('portada');
    portada.classList.add('portada-exiting');
    setTimeout(() => {
      portada.classList.add('hidden');
      document.getElementById('progress-wrap').classList.remove('hidden');
      document.getElementById('platik-form').classList.remove('hidden');
      updateStepProgress(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 380);
  });

  // --- Datos de prefijos telefónicos ---
  const PHONE_DATA = [
    { label: 'España',                   code: '+34',  min: 9,  max: 9  },
    { label: 'Afganistán',               code: '+93',  min: 9,  max: 9  },
    { label: 'Albania',                  code: '+355', min: 9,  max: 9  },
    { label: 'Alemania',                 code: '+49',  min: 3,  max: 12 },
    { label: 'Andorra',                  code: '+376', min: 6,  max: 9  },
    { label: 'Angola',                   code: '+244', min: 9,  max: 9  },
    { label: 'Arabia Saudí',             code: '+966', min: 9,  max: 9  },
    { label: 'Argelia',                  code: '+213', min: 9,  max: 9  },
    { label: 'Argentina',                code: '+54',  min: 10, max: 11 },
    { label: 'Armenia',                  code: '+374', min: 8,  max: 8  },
    { label: 'Australia',                code: '+61',  min: 9,  max: 9  },
    { label: 'Austria',                  code: '+43',  min: 4,  max: 13 },
    { label: 'Azerbaiyán',               code: '+994', min: 9,  max: 9  },
    { label: 'Bahréin',                  code: '+973', min: 8,  max: 8  },
    { label: 'Bangladés',                code: '+880', min: 10, max: 10 },
    { label: 'Bélgica',                  code: '+32',  min: 8,  max: 9  },
    { label: 'Bielorrusia',              code: '+375', min: 9,  max: 9  },
    { label: 'Bolivia',                  code: '+591', min: 8,  max: 8  },
    { label: 'Bosnia-Herzegovina',       code: '+387', min: 8,  max: 8  },
    { label: 'Brasil',                   code: '+55',  min: 10, max: 11 },
    { label: 'Bulgaria',                 code: '+359', min: 8,  max: 9  },
    { label: 'Camerún',                  code: '+237', min: 9,  max: 9  },
    { label: 'Canadá',                   code: '+1',   min: 10, max: 10 },
    { label: 'Chile',                    code: '+56',  min: 9,  max: 9  },
    { label: 'China',                    code: '+86',  min: 11, max: 11 },
    { label: 'Chipre',                   code: '+357', min: 8,  max: 8  },
    { label: 'Colombia',                 code: '+57',  min: 10, max: 10 },
    { label: 'Corea del Norte',          code: '+850', min: 8,  max: 10 },
    { label: 'Corea del Sur',            code: '+82',  min: 9,  max: 11 },
    { label: 'Costa Rica',               code: '+506', min: 8,  max: 8  },
    { label: 'Croacia',                  code: '+385', min: 8,  max: 9  },
    { label: 'Cuba',                     code: '+53',  min: 8,  max: 8  },
    { label: 'Dinamarca',                code: '+45',  min: 8,  max: 8  },
    { label: 'Ecuador',                  code: '+593', min: 9,  max: 9  },
    { label: 'Egipto',                   code: '+20',  min: 10, max: 10 },
    { label: 'El Salvador',              code: '+503', min: 8,  max: 8  },
    { label: 'Emiratos Árabes Unidos',   code: '+971', min: 9,  max: 9  },
    { label: 'Eslovaquia',               code: '+421', min: 9,  max: 9  },
    { label: 'Eslovenia',                code: '+386', min: 8,  max: 8  },
    { label: 'Estados Unidos',           code: '+1',   min: 10, max: 10 },
    { label: 'Estonia',                  code: '+372', min: 7,  max: 8  },
    { label: 'Etiopía',                  code: '+251', min: 9,  max: 9  },
    { label: 'Filipinas',                code: '+63',  min: 10, max: 10 },
    { label: 'Finlandia',                code: '+358', min: 5,  max: 11 },
    { label: 'Francia',                  code: '+33',  min: 9,  max: 9  },
    { label: 'Georgia',                  code: '+995', min: 9,  max: 9  },
    { label: 'Ghana',                    code: '+233', min: 9,  max: 9  },
    { label: 'Grecia',                   code: '+30',  min: 10, max: 10 },
    { label: 'Guatemala',                code: '+502', min: 8,  max: 8  },
    { label: 'Honduras',                 code: '+504', min: 8,  max: 8  },
    { label: 'Hong Kong',                code: '+852', min: 8,  max: 8  },
    { label: 'Hungría',                  code: '+36',  min: 8,  max: 9  },
    { label: 'India',                    code: '+91',  min: 10, max: 10 },
    { label: 'Indonesia',                code: '+62',  min: 9,  max: 12 },
    { label: 'Irak',                     code: '+964', min: 10, max: 10 },
    { label: 'Irán',                     code: '+98',  min: 10, max: 10 },
    { label: 'Irlanda',                  code: '+353', min: 9,  max: 9  },
    { label: 'Islandia',                 code: '+354', min: 7,  max: 7  },
    { label: 'Israel',                   code: '+972', min: 9,  max: 9  },
    { label: 'Italia',                   code: '+39',  min: 9,  max: 11 },
    { label: 'Jamaica',                  code: '+1',   min: 10, max: 10 },
    { label: 'Japón',                    code: '+81',  min: 9,  max: 11 },
    { label: 'Jordania',                 code: '+962', min: 9,  max: 9  },
    { label: 'Kazajistán',               code: '+7',   min: 10, max: 10 },
    { label: 'Kenia',                    code: '+254', min: 9,  max: 9  },
    { label: 'Kuwait',                   code: '+965', min: 8,  max: 8  },
    { label: 'Letonia',                  code: '+371', min: 8,  max: 8  },
    { label: 'Líbano',                   code: '+961', min: 7,  max: 8  },
    { label: 'Libia',                    code: '+218', min: 9,  max: 10 },
    { label: 'Lituania',                 code: '+370', min: 8,  max: 8  },
    { label: 'Luxemburgo',               code: '+352', min: 6,  max: 11 },
    { label: 'Macao',                    code: '+853', min: 8,  max: 8  },
    { label: 'Macedonia del Norte',      code: '+389', min: 8,  max: 8  },
    { label: 'Malasia',                  code: '+60',  min: 9,  max: 10 },
    { label: 'Malta',                    code: '+356', min: 8,  max: 8  },
    { label: 'Marruecos',                code: '+212', min: 9,  max: 9  },
    { label: 'México',                   code: '+52',  min: 10, max: 10 },
    { label: 'Moldavia',                 code: '+373', min: 8,  max: 8  },
    { label: 'Montenegro',               code: '+382', min: 8,  max: 8  },
    { label: 'Mozambique',               code: '+258', min: 9,  max: 9  },
    { label: 'Nepal',                    code: '+977', min: 10, max: 10 },
    { label: 'Nicaragua',                code: '+505', min: 8,  max: 8  },
    { label: 'Nigeria',                  code: '+234', min: 8,  max: 8  },
    { label: 'Noruega',                  code: '+47',  min: 8,  max: 8  },
    { label: 'Nueva Zelanda',            code: '+64',  min: 8,  max: 9  },
    { label: 'Omán',                     code: '+968', min: 8,  max: 8  },
    { label: 'Países Bajos',             code: '+31',  min: 9,  max: 9  },
    { label: 'Pakistán',                 code: '+92',  min: 10, max: 10 },
    { label: 'Panamá',                   code: '+507', min: 8,  max: 8  },
    { label: 'Paraguay',                 code: '+595', min: 9,  max: 9  },
    { label: 'Perú',                     code: '+51',  min: 9,  max: 9  },
    { label: 'Polonia',                  code: '+48',  min: 9,  max: 9  },
    { label: 'Portugal',                 code: '+351', min: 9,  max: 9  },
    { label: 'Puerto Rico',              code: '+1',   min: 10, max: 10 },
    { label: 'Qatar',                    code: '+974', min: 8,  max: 8  },
    { label: 'Reino Unido',              code: '+44',  min: 9,  max: 10 },
    { label: 'República Checa',          code: '+420', min: 9,  max: 9  },
    { label: 'República Dominicana',     code: '+1',   min: 10, max: 10 },
    { label: 'Rumanía',                  code: '+40',  min: 9,  max: 9  },
    { label: 'Rusia',                    code: '+7',   min: 10, max: 10 },
    { label: 'Serbia',                   code: '+381', min: 8,  max: 9  },
    { label: 'Singapur',                 code: '+65',  min: 8,  max: 8  },
    { label: 'Siria',                    code: '+963', min: 9,  max: 9  },
    { label: 'Sri Lanka',                code: '+94',  min: 9,  max: 9  },
    { label: 'Sudáfrica',                code: '+27',  min: 9,  max: 9  },
    { label: 'Suecia',                   code: '+46',  min: 7,  max: 9  },
    { label: 'Suiza',                    code: '+41',  min: 9,  max: 9  },
    { label: 'Tailandia',                code: '+66',  min: 9,  max: 9  },
    { label: 'Taiwán',                   code: '+886', min: 9,  max: 9  },
    { label: 'Tanzania',                 code: '+255', min: 9,  max: 9  },
    { label: 'Túnez',                    code: '+216', min: 8,  max: 8  },
    { label: 'Turquía',                  code: '+90',  min: 10, max: 10 },
    { label: 'Ucrania',                  code: '+380', min: 9,  max: 9  },
    { label: 'Uganda',                   code: '+256', min: 9,  max: 9  },
    { label: 'Uruguay',                  code: '+598', min: 8,  max: 9  },
    { label: 'Uzbekistán',               code: '+998', min: 9,  max: 9  },
    { label: 'Venezuela',                code: '+58',  min: 10, max: 11 },
    { label: 'Vietnam',                  code: '+84',  min: 9,  max: 10 },
    { label: 'Yemen',                    code: '+967', min: 9,  max: 9  },
    { label: 'Zimbabue',                 code: '+263', min: 9,  max: 9  },
  ];

  // Poblar el select de prefijos
  const phonePrefixSel = document.getElementById('phone-prefix');
  PHONE_DATA.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = p.label + ' (' + p.code + ')';
    if (i === 0) opt.selected = true;
    phonePrefixSel.appendChild(opt);
  });

  // Validación en tiempo real
  const emailEl    = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const phoneEl    = document.getElementById('telefono');
  const phoneError = document.getElementById('telefono-error');
  const emailRx    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  emailEl.addEventListener('blur', () => {
    if (emailEl.value.trim() && !emailRx.test(emailEl.value.trim())) {
      emailError.classList.remove('hidden');
    } else {
      emailError.classList.add('hidden');
    }
  });

  function validatePhoneInline() {
    const digits = phoneEl.value.replace(/\D/g, '');
    if (!digits) { phoneError.classList.add('hidden'); return; }
    const entry = PHONE_DATA[Number(phonePrefixSel.value)];
    if (entry && (digits.length < entry.min || digits.length > entry.max)) {
      const rangeTxt = entry.min === entry.max ? entry.min + ' dígitos' : entry.min + '–' + entry.max + ' dígitos';
      phoneError.textContent = 'Se esperan ' + rangeTxt + ' para ' + entry.label;
      phoneError.classList.remove('hidden');
    } else {
      phoneError.classList.add('hidden');
    }
  }

  phoneEl.addEventListener('blur', validatePhoneInline);
  phonePrefixSel.addEventListener('change', () => { if (phoneEl.value) validatePhoneInline(); });

  function validateStep1() {
    // Campos de texto obligatorios básicos
    const basicReq = [
      form.querySelector('#nombre-restaurante'),
      form.querySelector('#persona-contacto'),
    ];
    for (const el of basicReq) {
      if (!el.value.trim()) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const errEl = document.getElementById('step-1-error');
        if (errEl) { errEl.classList.remove('hidden'); setTimeout(() => errEl.classList.add('hidden'), 4000); }
        return false;
      }
    }

    // Validación de email
    if (!emailEl.value.trim() || !emailRx.test(emailEl.value.trim())) {
      emailError.classList.remove('hidden');
      emailEl.focus();
      emailEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    emailError.classList.add('hidden');

    // Validación de teléfono
    const digits = phoneEl.value.replace(/\D/g, '');
    const entry  = PHONE_DATA[Number(phonePrefixSel.value)];
    const minD   = entry ? entry.min : 6;
    const maxD   = entry ? entry.max : 15;
    if (!digits || digits.length < minD || digits.length > maxD) {
      const rangeTxt = (entry && minD === maxD) ? minD + ' dígitos' : minD + '–' + maxD + ' dígitos';
      phoneError.textContent = digits ? 'Se esperan ' + rangeTxt + ' para ' + (entry ? entry.label : 'este prefijo') : 'Introduce un número de teléfono';
      phoneError.classList.remove('hidden');
      phoneEl.focus();
      phoneEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    phoneError.classList.add('hidden');

    return true;
  }

  document.getElementById('btn-next-1').addEventListener('click', () => {
    if (validateStep1()) goToStep(2, 'fwd');
  });

  document.getElementById('btn-prev-2').addEventListener('click', () => goToStep(1, 'back'));
  document.getElementById('btn-next-2').addEventListener('click', () => goToStep(3, 'fwd'));

  document.getElementById('btn-prev-3').addEventListener('click', () => goToStep(2, 'back'));
  document.getElementById('btn-next-3').addEventListener('click', () => goToStep(4, 'fwd'));

  document.getElementById('btn-prev-4').addEventListener('click', () => goToStep(3, 'back'));

  // --- Bloquear envío con Enter ---
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  // --- Design Studio (Step 2) ---
  const TEMAS = [
    { value: '01 · Negro & Blanco',   label: 'Negro & Blanco',   bg: '#080808', acc: '#f5f5f5', text: '#f5f5f5' },
    { value: '02 · Blanco & Negro',   label: 'Blanco & Negro',   bg: '#f4f1ea', acc: '#111111', text: '#111111' },
    { value: '03 · Marino & Naranja', label: 'Marino & Naranja', bg: '#0c1a28', acc: '#e06028', text: '#eee8d8' },
    { value: '04 · Vino Tinto',       label: 'Vino Tinto',       bg: '#1c0810', acc: '#b81830', text: '#f0e4d4' },
    { value: '05 · Marfil & Vino',    label: 'Marfil & Vino',    bg: '#f4f0e4', acc: '#881830', text: '#280e18' },
    { value: '06 · Verde Oliva',      label: 'Verde Oliva',      bg: '#111808', acc: '#688030', text: '#dce8c4' },
    { value: '07 · Marino & Dorado',  label: 'Marino & Dorado',  bg: '#091428', acc: '#c09838', text: '#e4d8c0' },
    { value: '08 · Negro & Dorado',   label: 'Negro & Dorado',   bg: '#080808', acc: '#c09838', text: '#ece0c8' },
    { value: '09 · Oliva & Dorado',   label: 'Oliva & Dorado',   bg: '#111808', acc: '#c09838', text: '#e4ecc8' },
  ];

  const FONDOS = [
    { value: 'Bar la malul apei',  src: 'Fondo%20de%20carta/Bar%20la%20malul%20apei.png' },
    { value: 'Sunset Dining',      src: 'Fondo%20de%20carta/Sunset%20Dining.jfif' },
    { value: 'Fondo 03',           src: 'Fondo%20de%20carta/descarga%20(35).jfif' },
    { value: 'Fondo 04',           src: 'Fondo%20de%20carta/descarga%20(36).jfif' },
    { value: 'Fondo 05',           src: 'Fondo%20de%20carta/descarga%20(37).jfif' },
    { value: 'Fondo 06',           src: 'Fondo%20de%20carta/descarga%20(38)%20-%20copia.png' },
    { value: 'Dinner with a view', src: 'Fondo%20de%20carta/dinner%20with%20a%20view.png' },
    { value: 'Sin fondo de carta', src: null },
  ];

  const DEMO_CATS = ['Entrantes', 'Principales', 'Postres'];

  const DEMO_DISHES = [
    [
      { name: 'Croquetas de jamón',   price: '8,50 €',  photo: 'Emplatados/hf_20260610_183612_f3714119-a683-4832-8ddc-e4bdc7988670.png', badges: [] },
      { name: 'Ensalada César',       price: '11,00 €', photo: 'Emplatados/hf_20260611_121331_3c1a776a-3c08-4f8b-b59e-63ef9a496be7.png', badges: ['veg'] },
      { name: 'Carpaccio de ternera', price: '14,00 €', photo: 'Emplatados/hf_20260611_121344_9d1043b0-6367-4bfc-b071-b2d1c713b13d.png', badges: ['sg'] },
    ],
    [
      { name: 'Solomillo a la brasa', price: '26,00 €', photo: 'Emplatados/hf_20260611_122104_14ecd42c-a8b3-44e2-90c0-aa246a21c7b5.png', badges: ['sg'] },
      { name: 'Merluza a la vasca',   price: '22,00 €', photo: 'Emplatados/hf_20260611_122109_9a9f72d0-abb6-4633-a54a-482726bd3146.png', badges: ['hal'] },
      { name: 'Risotto de boletus',   price: '19,00 €', photo: 'Emplatados/hf_20260610_183621_caef8043-6523-45aa-b49f-0c8969bde684.png', badges: ['veg'] },
    ],
    [
      { name: 'Tarta de queso vasca', price: '7,00 €',  photo: 'Emplatados/hf_20260611_121548_ed270bba-5bde-4729-a3f8-a6be768ac7db.png', badges: ['sg'] },
      { name: 'Coulant de chocolate', price: '7,50 €',  photo: 'Emplatados/hf_20260611_121554_ebf7beed-cf1e-450e-be5e-7d84824d6243.png', badges: [] },
      { name: 'Crème brûlée',        price: '6,50 €',  photo: 'Emplatados/hf_20260611_153257_997c75ca-2785-4ff3-a91d-6878539e4444.png', badges: ['veg'] },
    ],
  ];

  const demoMenu       = document.getElementById('demo-menu');
  const demoBg         = document.getElementById('demo-bg');
  const demoCatsEl     = document.getElementById('demo-cats');
  const demoDishesEl   = document.getElementById('demo-dishes');
  const temaHidden     = document.getElementById('tema-value');
  const fondoHidden    = document.getElementById('fondo-value');
  const swatchGrid     = document.getElementById('swatch-grid');
  const fondoThumbGrid = document.getElementById('fondo-thumb-grid');

  function applyTema(idx) {
    const t = TEMAS[idx];
    demoMenu.style.setProperty('--dm-bg',   t.bg);
    demoMenu.style.setProperty('--dm-acc',  t.acc);
    demoMenu.style.setProperty('--dm-text', t.text);
    demoMenu.style.background = t.bg;
    temaHidden.value = t.value;
  }

  function renderDemoDishes(catIdx) {
    demoDishesEl.innerHTML = '';
    DEMO_DISHES[catIdx].forEach(d => {
      const el = document.createElement('div');
      el.className = 'demo-dish';
      const badgesHtml = d.badges.map(b =>
        '<span class="demo-dish-badge demo-dish-badge--' + b + '">' + b.toUpperCase() + '</span>'
      ).join('');
      el.innerHTML =
        '<div class="demo-dish-photo" style="background-image:url(\'' + d.photo + '\')">' +
          '<div class="demo-dish-badges">' + badgesHtml + '</div>' +
          '<div class="demo-dish-foot">' +
            '<span class="demo-dish-name">' + d.name + '</span>' +
            '<span class="demo-dish-price">' + d.price + '</span>' +
          '</div>' +
        '</div>' +
        '<span class="demo-dish-link">Ver detalle →</span>';
      demoDishesEl.appendChild(el);
    });
  }

  // Category tabs
  const demoSectionTitle = document.getElementById('demo-section-title');
  DEMO_CATS.forEach((cat, i) => {
    const el = document.createElement('div');
    el.className = 'demo-cat' + (i === 0 ? ' demo-cat--active' : '');
    el.textContent = cat;
    el.addEventListener('click', () => {
      demoCatsEl.querySelectorAll('.demo-cat').forEach((c, j) => c.classList.toggle('demo-cat--active', j === i));
      if (demoSectionTitle) demoSectionTitle.textContent = cat;
      renderDemoDishes(i);
    });
    demoCatsEl.appendChild(el);
  });

  // Color swatches
  TEMAS.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swatch-btn' + (i === 0 ? ' is-selected' : '');

    const colorDiv = document.createElement('div');
    colorDiv.className = 'swatch-color';
    colorDiv.style.background = 'linear-gradient(135deg, ' + t.bg + ' 45%, ' + t.acc + ' 100%)';
    colorDiv.title = t.label;

    btn.appendChild(colorDiv);
    btn.addEventListener('click', () => {
      swatchGrid.querySelectorAll('.swatch-btn').forEach((b, j) => b.classList.toggle('is-selected', j === i));
      applyTema(i);
    });
    swatchGrid.appendChild(btn);
  });

  // Fondo thumbnails
  FONDOS.forEach((f, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isLast = i === FONDOS.length - 1;

    if (f.src) {
      btn.className = 'fondo-thumb-btn';
      const img = document.createElement('img');
      img.src = f.src;
      img.alt = f.value;
      img.loading = 'lazy';
      btn.appendChild(img);
    } else {
      btn.className = 'fondo-thumb-btn fondo-none is-selected';
      const lbl = document.createElement('span');
      lbl.className = 'fondo-none-lbl';
      lbl.textContent = 'Sin fondo';
      btn.appendChild(lbl);
    }

    btn.addEventListener('click', () => {
      fondoThumbGrid.querySelectorAll('.fondo-thumb-btn').forEach((b, j) => b.classList.toggle('is-selected', j === i));
      if (f.src) {
        demoBg.style.backgroundImage = "url('" + f.src + "')";
        demoBg.classList.add('has-image');
      } else {
        demoBg.style.backgroundImage = '';
        demoBg.classList.remove('has-image');
      }
      fondoHidden.value = f.value;
    });
    fondoThumbGrid.appendChild(btn);
  });

  // Initialize design studio
  renderDemoDishes(0);
  applyTema(0);
  fondoHidden.value = FONDOS[FONDOS.length - 1].value;

  // --- Numeración de emplatados (excluye "Otro") ---
  document.querySelectorAll('.emplatado-item:not(.emplatado-item--otro)').forEach((item, i) => {
    const badge = document.createElement('span');
    badge.className = 'emplatado-num';
    badge.textContent = String(i + 1).padStart(2, '0');
    item.appendChild(badge);
  });

  // --- Catálogo de emplatados: toggle ---
  const catalogoToggle = document.getElementById('catalogo-toggle');
  const catalogoBody   = document.getElementById('catalogo-emplatados');
  const catalogoArrow  = document.getElementById('catalogo-toggle-arrow');
  const catalogoText   = document.getElementById('catalogo-toggle-text');

  function openCatalogo() {
    catalogoBody.classList.remove('hidden');
    catalogoArrow.classList.add('open');
    catalogoText.textContent = 'Ocultar catálogo de emplatados';
  }

  function closeCatalogo() {
    catalogoBody.classList.add('hidden');
    catalogoArrow.classList.remove('open');
    catalogoText.textContent = 'Ver catálogo de emplatados';
  }

  catalogoToggle.addEventListener('click', () => {
    catalogoBody.classList.contains('hidden') ? openCatalogo() : closeCatalogo();
  });

  // --- Modo carta: plato a plato / subir carta ---
  const modePlato      = document.getElementById('mode-plato');
  const modeSubir      = document.getElementById('mode-subir');
  const panelPlato     = document.getElementById('panel-plato-a-plato');
  const panelSubir     = document.getElementById('panel-subir-carta');
  const otraSection    = document.getElementById('emplatado-otro-section');
  const otraItem       = document.getElementById('emplatado-otro');
  const otraDescWrap   = document.getElementById('emplatado-otro-desc-wrap');
  const otraDescInput  = document.getElementById('emplatado-otro-desc');
  const orderData      = document.getElementById('emplatados-order-data');
  const cartaFileInput = document.getElementById('carta-file-input');
  const section05      = document.getElementById('platos-section').closest('.form-section');

  let emplatadoSels = [];

  function syncOrderData() {
    orderData.value = emplatadoSels.map((s, i) => {
      const prefix = `Plato ${String(i + 1).padStart(2, '0')}: `;
      if (s.isOtro) {
        const desc = otraDescInput.value.trim();
        return prefix + 'Otro' + (desc ? ' — ' + desc : '');
      }
      return prefix + `Emplatado nº ${s.num}`;
    }).join('\n');
  }

  function refreshOrderBadges() {
    emplatadoSels.forEach((s, i) => {
      let badge = s.item.querySelector('.emplatado-order');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'emplatado-order';
        s.item.appendChild(badge);
      }
      badge.textContent = i + 1;
    });
    syncOrderData();
  }

  document.querySelectorAll('.emplatado-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!section05.classList.contains('emplatados-selectable')) return;
      const isOtro = item.classList.contains('emplatado-item--otro');
      const numEl  = item.querySelector('.emplatado-num');
      const num    = numEl ? numEl.textContent : '';
      const idx    = emplatadoSels.findIndex(s => s.item === item);

      if (idx !== -1) {
        emplatadoSels.splice(idx, 1);
        item.classList.remove('is-selected-emplatado');
        const badge = item.querySelector('.emplatado-order');
        if (badge) badge.remove();
        if (isOtro) otraDescWrap.classList.add('hidden');
        refreshOrderBadges();
      } else {
        emplatadoSels.push({ item, num, isOtro });
        item.classList.add('is-selected-emplatado');
        if (isOtro) otraDescWrap.classList.remove('hidden');
        refreshOrderBadges();
      }
    });
  });

  otraDescInput && otraDescInput.addEventListener('input', syncOrderData);

  const avanzadaCheck  = document.getElementById('avanzada-check');
  const avanzadaNotice = document.getElementById('avanzada-notice');

  function clearEmplatadoSels() {
    emplatadoSels.forEach(s => {
      s.item.classList.remove('is-selected-emplatado');
      const badge = s.item.querySelector('.emplatado-order');
      if (badge) badge.remove();
    });
    emplatadoSels = [];
    otraDescWrap.classList.add('hidden');
    syncOrderData();
  }

  function activateSubirMode() {
    panelPlato.classList.add('hidden');
    panelSubir.classList.remove('hidden');
    otraSection.style.display = 'none';
    section05.classList.remove('emplatados-selectable');
    cartaFileInput.disabled = false;
    orderData.disabled = false;
  }

  function activatePlatoMode() {
    panelSubir.classList.add('hidden');
    panelPlato.classList.remove('hidden');
    otraSection.style.display = 'none';
    section05.classList.remove('emplatados-selectable');
    clearEmplatadoSels();
    avanzadaCheck.checked = false;
    avanzadaNotice.classList.add('hidden');
    closeCatalogo();
    cartaFileInput.disabled = true;
    orderData.disabled = true;
  }

  avanzadaCheck && avanzadaCheck.addEventListener('change', () => {
    if (avanzadaCheck.checked) {
      otraSection.style.display = '';
      section05.classList.add('emplatados-selectable');
      avanzadaNotice.classList.remove('hidden');
      openCatalogo();
    } else {
      otraSection.style.display = 'none';
      section05.classList.remove('emplatados-selectable');
      avanzadaNotice.classList.add('hidden');
      clearEmplatadoSels();
      closeCatalogo();
    }
  });

  modePlato && modePlato.addEventListener('change', activatePlatoMode);
  modeSubir && modeSubir.addEventListener('change', activateSubirMode);

  // --- Gestión de platos ---
  const dishList      = document.getElementById('dish-list');
  const dfNombre      = document.getElementById('df-nombre');
  const dfDesc        = document.getElementById('df-desc');
  const dfCat         = document.getElementById('df-cat');
  const dfCatCustomWrap = document.getElementById('df-cat-custom-wrap');
  const dfCatCustom   = document.getElementById('df-cat-custom');
  const dfEmplatado           = document.getElementById('df-emplatado');
  const dfEmplatadoCustomCheck = document.getElementById('df-emplatado-custom-check');
  const dfEmplatadoCustomWrap  = document.getElementById('df-emplatado-custom-wrap');
  const dfEmplatadoCustom      = document.getElementById('df-emplatado-custom');
  const dfVideoNo        = document.getElementById('df-video-no');
  const dfVideoSi        = document.getElementById('df-video-si');
  const dfVideoDescWrap  = document.getElementById('df-video-desc-wrap');
  const dfVideoDesc      = document.getElementById('df-video-desc');
  const btnAddDish    = document.getElementById('btn-add-dish');
  const btnCancelDish = document.getElementById('btn-cancel-dish');
  const dishFormLabel = document.getElementById('dish-form-label');
  const platosData    = document.getElementById('platos-data');

  let dishes = [];
  let editingIndex = null;

  dfCat.addEventListener('change', () => {
    dfCatCustomWrap.style.display = dfCat.value === 'Personalizado' ? '' : 'none';
  });

  dfEmplatadoCustomCheck.addEventListener('change', () => {
    const on = dfEmplatadoCustomCheck.checked;
    dfEmplatadoCustomWrap.style.display = on ? '' : 'none';
    dfEmplatado.disabled = on;
    if (on) dfEmplatado.value = '';
  });

  [dfVideoNo, dfVideoSi].forEach(r => r.addEventListener('change', () => {
    dfVideoDescWrap.style.display = dfVideoSi.checked ? '' : 'none';
  }));

  function syncPlatosData() {
    platosData.value = dishes.length
      ? dishes.map((d, i) => {
          const cat = d.catCustom || d.cat;
          return [
            `PLATO ${String(i + 1).padStart(2, '0')}: ${d.nombre}`,
            cat            ? `  Categoría: ${cat}`        : '',
            d.emplatadoCustom ? `  Emplatado personalizado: ${d.emplatadoCustom}`
                            : (d.emplatado ? `  Emplatado nº: ${d.emplatado}` : ''),
            d.video        ? `  Vídeo: Sí${d.videoDesc ? ' — ' + d.videoDesc : ''}` : '  Vídeo: No',
            d.desc         ? `  Descripción: ${d.desc}`   : '',
          ].filter(Boolean).join('\n');
        }).join('\n\n')
      : '';
  }

  function renderDishes() {
    dishList.innerHTML = '';
    dishes.forEach((dish, i) => {
      const cat  = dish.catCustom || dish.cat;
      const card = document.createElement('div');
      card.className = 'dish-card';
      card.innerHTML = `
        <div class="dish-card-head">
          <span class="dish-card-num">· ${String(i + 1).padStart(2, '0')} ·</span>
          <span class="dish-card-name">${dish.nombre}</span>
          ${cat ? `<span class="dish-card-cat">${cat}</span>` : ''}
          <div class="dish-card-actions">
            <button type="button" class="dish-btn-edit" data-i="${i}">Editar</button>
            <button type="button" class="dish-btn-del"  data-i="${i}">✕</button>
          </div>
        </div>
        ${dish.desc      ? `<p class="dish-card-desc">${dish.desc}</p>` : ''}
        <div class="dish-card-tags">
          ${dish.emplatadoCustom
            ? `<span class="dish-card-emplatado">Emplatado · ${dish.emplatadoCustom}</span>`
            : (dish.emplatado ? `<span class="dish-card-emplatado">Emplatado · ${dish.emplatado}</span>` : '')}
          ${dish.video     ? `<span class="dish-card-video">Con vídeo${dish.videoDesc ? ' — ' + dish.videoDesc : ''}</span>` : ''}
        </div>
      `;
      dishList.appendChild(card);
    });

    dishList.querySelectorAll('.dish-btn-edit').forEach(btn =>
      btn.addEventListener('click', () => startEdit(Number(btn.dataset.i)))
    );
    dishList.querySelectorAll('.dish-btn-del').forEach(btn =>
      btn.addEventListener('click', () => {
        dishes.splice(Number(btn.dataset.i), 1);
        renderDishes();
        syncPlatosData();
      })
    );

    syncPlatosData();
  }

  function clearForm() {
    dfNombre.value      = '';
    dfDesc.value        = '';
    dfCat.value         = '';
    dfCatCustom.value   = '';
    dfCatCustomWrap.style.display = 'none';
    dfEmplatado.value              = '';
    dfEmplatado.disabled           = false;
    dfEmplatadoCustomCheck.checked = false;
    dfEmplatadoCustom.value        = '';
    dfEmplatadoCustomWrap.style.display = 'none';
    dfVideoNo.checked   = true;
    dfVideoDesc.value   = '';
    dfVideoDescWrap.style.display = 'none';
    editingIndex        = null;
    dishFormLabel.textContent = '+ Nuevo plato';
    btnAddDish.textContent    = 'Añadir plato';
    btnCancelDish.classList.add('hidden');
  }

  function startEdit(i) {
    const dish = dishes[i];
    editingIndex          = i;
    dfNombre.value        = dish.nombre;
    dfDesc.value          = dish.desc;
    dfCat.value           = dish.catCustom ? 'Personalizado' : dish.cat;
    dfCatCustom.value     = dish.catCustom || '';
    dfCatCustomWrap.style.display = dish.catCustom ? '' : 'none';
    dfEmplatadoCustomCheck.checked = !!dish.emplatadoCustom;
    dfEmplatadoCustomWrap.style.display = dish.emplatadoCustom ? '' : 'none';
    dfEmplatadoCustom.value = dish.emplatadoCustom || '';
    dfEmplatado.value       = dish.emplatadoCustom ? '' : dish.emplatado;
    dfEmplatado.disabled    = !!dish.emplatadoCustom;
    dfVideoSi.checked     = dish.video;
    dfVideoNo.checked     = !dish.video;
    dfVideoDesc.value     = dish.videoDesc || '';
    dfVideoDescWrap.style.display = dish.video ? '' : 'none';
    dishFormLabel.textContent     = `Editando plato ${String(i + 1).padStart(2, '0')}`;
    btnAddDish.textContent        = 'Guardar cambios';
    btnCancelDish.classList.remove('hidden');
    document.getElementById('dish-form').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  btnAddDish.addEventListener('click', () => {
    const nombre = dfNombre.value.trim();
    if (!nombre) { dfNombre.focus(); return; }

    const cat       = dfCat.value;
    const catCustom = cat === 'Personalizado' ? dfCatCustom.value.trim() : '';
    const video     = dfVideoSi.checked;
    const videoDesc = video ? dfVideoDesc.value.trim() : '';

    const emplatadoCustom = dfEmplatadoCustomCheck.checked ? dfEmplatadoCustom.value.trim() : '';
    const dish = { nombre, desc: dfDesc.value.trim(), cat, catCustom, emplatado: dfEmplatado.value.trim(), emplatadoCustom, video, videoDesc };

    if (editingIndex !== null) {
      dishes[editingIndex] = dish;
    } else {
      dishes.push(dish);
    }

    clearForm();
    renderDishes();
  });

  btnCancelDish.addEventListener('click', clearForm);

  // --- Envío del formulario (AJAX → Web3Forms JSON API) ---
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorBox.classList.add('hidden');

    const nombreRestaurante = form.querySelector('#nombre-restaurante').value.trim();
    form.querySelector('input[name="subject"]').value = nombreRestaurante
      ? `Nueva personalización de carta — ${nombreRestaurante}`
      : 'Nueva personalización de carta — Platik';

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });

      const data = await response.json();

      if (data.success) {
        progressFill.style.width = '100%';
        progressStep.textContent = '¡Enviado!';
        form.classList.add('hidden');
        thankYou.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.message || 'Error desconocido');
      }
    } catch (err) {
      errorBox.textContent = 'No hemos podido enviar el formulario. Por favor, escríbenos directamente a contacto@platik.es o inténtalo de nuevo.';
      errorBox.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar formulario';
    }
  });
});
