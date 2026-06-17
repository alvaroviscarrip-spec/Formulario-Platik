document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('platik-form');
  const submitBtn = document.getElementById('submit-btn');
  const errorBox = document.getElementById('form-error');
  const thankYou = document.getElementById('thank-you');

  // --- Barra de progreso ---
  const progressFill = document.getElementById('progress-fill');
  const progressPct  = document.getElementById('progress-pct');

  function calcProgress() {
    let score = 0;

    // Datos básicos (25 pts) — secciones 01, 02, 03
    if (form.querySelector('#nombre-restaurante').value.trim())   score += 7;
    if (form.querySelector('#persona-contacto').value.trim())     score += 6;
    if (form.querySelector('#telefono').value.trim())             score += 6;
    if (form.querySelector('#email').value.trim())                score += 6;

    // Diseño (25 pts) — sección 04
    if (form.querySelector('input[name="Temática visual"]:checked'))  score += 13;
    if (form.querySelector('input[name="Fondo de carta"]:checked'))   score += 12;

    // Carta (25 pts) — sección 05
    const enModoSubir = document.getElementById('mode-subir')?.checked;
    if (enModoSubir) {
      const fileInput = document.getElementById('carta-file-input');
      if (fileInput?.files?.length)      score += 13;
      if (typeof emplatadoSels !== 'undefined' && emplatadoSels.length) score += 12;
    } else {
      if (typeof dishes !== 'undefined' && dishes.length) score += 25;
    }

    // Extras (25 pts) — secciones 06, 07, 08
    if (form.querySelectorAll('input[name^="Perfil:"]:checked').length)  score += 10;
    if (form.querySelectorAll('input[name^="Extra:"]:checked').length)   score += 5;
    const obs = form.querySelector('textarea[name="Observaciones y notas adicionales"]');
    if (obs?.value.trim()) score += 10;

    return Math.min(score, 100);
  }

  function updateProgress() {
    const pct = calcProgress();
    progressFill.style.width = pct + '%';
    progressPct.textContent  = pct + '%';
    [25, 50, 75, 100].forEach((threshold, i) => {
      document.getElementById(`cp-dot-${i + 1}`)
        ?.classList.toggle('reached', pct >= threshold);
    });
  }

  form.addEventListener('input',  updateProgress);
  form.addEventListener('change', updateProgress);

  // --- Bloquear envío con Enter (solo el botón final lo permite) ---
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  // --- Temática visual: resaltar tarjeta seleccionada ---
  const themeRadios = form.querySelectorAll('input[name="Temática visual"]');

  function updateThemeCards() {
    themeRadios.forEach((radio) => {
      radio.closest('.theme-card').classList.toggle('is-selected', radio.checked);
    });
  }

  themeRadios.forEach((radio) => radio.addEventListener('change', updateThemeCards));

  // --- Fondo de carta: resaltar tarjeta seleccionada ---
  const fondoRadios = form.querySelectorAll('input[name="Fondo de carta"]');

  function updateFondoCards() {
    fondoRadios.forEach((radio) => {
      radio.closest('.theme-card').classList.toggle('is-selected', radio.checked);
    });
  }

  fondoRadios.forEach((radio) => radio.addEventListener('change', updateFondoCards));

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
      updateProgress();
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
    updateProgress();
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

  // --- Envío del formulario ---
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorBox.classList.add('hidden');

    const nombreRestaurante = form.querySelector('#nombre-restaurante').value.trim();
    form.querySelector('input[name="_subject"]').value = nombreRestaurante
      ? `Nueva personalización de carta — ${nombreRestaurante}`
      : 'Nueva personalización de carta — Platik';

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Respuesta inesperada del servidor (${response.status})`);
      }

      form.classList.add('hidden');
      thankYou.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      errorBox.textContent =
        'No hemos podido enviar el formulario. Por favor, escríbenos directamente a contacto@platik.es o inténtalo de nuevo en unos minutos.';
      errorBox.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar formulario';
    }
  });
});
