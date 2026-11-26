/**
 * ============================================================================
 * RAUKAR (راهکار) — raukarpro.com
 * QUICK 2-MINUTE CONFIGURATION BLOCK
 * Edit the 4 values below before uploading to GitHub Pages!
 * ============================================================================
 */
const CONFIG = {
  // 1. Your WhatsApp number with country code (digits ONLY, no + or spaces)
  //    Example US/Canada: "12025551234"
  YOUR_WHATSAPP_NUMBER: "YOUR_WHATSAPP_NUMBER",

  // 2. Your US Zelle email or phone number
  YOUR_ZELLE_EMAIL: "[YOUR_ZELLE_EMAIL_OR_PHONE]",

  // 3. Your Canada Interac e-Transfer email
  YOUR_INTERAC_EMAIL: "[YOUR_INTERAC_EMAIL]",

  // 4. Your 11-character YouTube Video ID (e.g., "dQw4w9WgXcQ")
  //    Leave empty "" to show the clean styled placeholder until your video is ready.
  //    Autoplay parameters (?autoplay=1&mute=1&playsinline=1&rel=0) are added automatically.
  YOUTUBE_VIDEO_ID: "",

  // Approximate USD -> CAD conversion rate for Canadian diaspora reference
  CAD_EXCHANGE_RATE: 1.38,
  BRAND_NAME: "Raukar (راهکار)"
};

/* ============================================================================
   PRODUCT CATALOG DATA
   ============================================================================ */
const PRODUCTS = {
  mini: {
    id: "mini",
    name: "Mini Essentials Kit",
    nameFa: "بستهٔ ضروری و ایمنی",
    priceUsd: 40,
    diyOnly: true
  },
  tier1: {
    id: "tier1",
    name: "Tier 1: DIY Warm & Safe Room Kit",
    nameFa: "بستهٔ درجه ۱: اتاق گرم و مصون",
    priceUsd: 70,
    diyOnly: true
  },
  tier2: {
    id: "tier2",
    name: "Tier 2: Complete 1-Room Winterization (Kabul Install)",
    nameFa: "بستهٔ درجه ۲: عایق‌بندی کامل با تخنیک‌کار کابل",
    priceUsd: 90,
    diyOnly: false
  }
};

/* ============================================================================
   CITY DELIVERY RULES
   ============================================================================ */
const CITIES = {
  kabul:     { label: "Kabul City (کابل)",           type: "express",  minDays: 2, maxDays: 3 },
  parwan:    { label: "Parwan (پروان)",              type: "hub",      minDays: 4, maxDays: 6 },
  logar:     { label: "Logar (لوگر)",                type: "hub",      minDays: 4, maxDays: 6 },
  wardak:    { label: "Wardak (وردک)",               type: "hub",      minDays: 4, maxDays: 6 },
  kapisa:    { label: "Kapisa (کاپیسا)",             type: "hub",      minDays: 4, maxDays: 6 },
  mazar:     { label: "Mazar-i-Sharif (مزارشریف)",   type: "waitlist", minDays: 0, maxDays: 0 },
  herat:     { label: "Herat (هرات)",                type: "waitlist", minDays: 0, maxDays: 0 },
  kandahar:  { label: "Kandahar (قندهار)",           type: "waitlist", minDays: 0, maxDays: 0 },
  jalalabad: { label: "Jalalabad (جلال‌آباد)",        type: "waitlist", minDays: 0, maxDays: 0 }
};

/* ============================================================================
   APPLICATION STATE
   ============================================================================ */
let cart = loadCart();
let activeOrderCode = null;

function loadCart() {
  try {
    const saved = localStorage.getItem("raukar_cart_v1");
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem("raukar_cart_v1", JSON.stringify(cart));
  } catch (e) {
    // Ignore storage errors in private browsing
  }
}

function formatCad(usd) {
  return Math.round(usd * CONFIG.CAD_EXCHANGE_RATE);
}

function getWhatsAppBaseUrl(message) {
  const num = (CONFIG.YOUR_WHATSAPP_NUMBER || "").replace(/[^0-9]/g, "");
  const target = num || "YOUR_WHATSAPP_NUMBER";
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}

/* ============================================================================
   1. HERO YOUTUBE AUTOPLAY INITIALIZER
   ============================================================================ */
function initHeroVideo() {
  const container = document.getElementById("hero-video-container");
  const iframe = document.getElementById("hero-youtube-iframe");
  const placeholder = document.getElementById("hero-video-placeholder");
  if (!container || !iframe || !placeholder) return;

  // Check CONFIG first, then HTML data-video-id attribute
  let videoId = (CONFIG.YOUTUBE_VIDEO_ID || "").trim();
  if (!videoId) {
    const attrVal = (container.getAttribute("data-video-id") || "").trim();
    if (attrVal && !attrVal.includes("PASTE_YOUTUBE_VIDEO_ID_HERE")) {
      videoId = attrVal;
    }
  }

  if (videoId) {
    // Autoplay on load requires mute=1 & playsinline=1 in modern mobile/desktop browsers
    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&mute=1&playsinline=1&rel=0`;
    iframe.classList.remove("is-hidden");
    placeholder.classList.add("is-hidden");
  }
}

/* ============================================================================
   2. QUICK WHATSAPP VOICE NOTE & FOOTER LINKS
   ============================================================================ */
function initStaticWhatsAppLinks() {
  const voiceMsg =
    "Salam Raukar team! I would like to order a winterization kit for my family in Afghanistan via voice note. (سلام، می‌خواهم از طریق وایس مسج یک بستهٔ زمستانی برای خانواده ام سفارش بدهم.)";

  const heroBtn = document.getElementById("hero-voice-note-btn");
  if (heroBtn) heroBtn.href = getWhatsAppBaseUrl(voiceMsg);

  const footerLink = document.getElementById("footer-whatsapp-link");
  if (footerLink) {
    footerLink.href = getWhatsAppBaseUrl("Salam Raukar team! I have a question about winterization kits for Afghanistan.");
  }

  // Update CAD reference badges on product cards based on CONFIG.CAD_EXCHANGE_RATE
  document.querySelectorAll("[data-cad-for]").forEach((el) => {
    const usd = Number(el.getAttribute("data-cad-for"));
    if (!Number.isNaN(usd)) {
      el.textContent = `~$${formatCad(usd)} CAD`;
    }
  });

  // Display configured Zelle & Interac placeholders
  const zelleEl = document.getElementById("zelle-display");
  const interacEl = document.getElementById("interac-display");
  if (zelleEl) zelleEl.textContent = CONFIG.YOUR_ZELLE_EMAIL;
  if (interacEl) interacEl.textContent = CONFIG.YOUR_INTERAC_EMAIL;

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ============================================================================
   3. DYNAMIC CITY-BASED DELIVERY DATE ESTIMATOR
   ============================================================================ */
function addDays(baseDate, days) {
  const d = new Date(baseDate.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function formatShortDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function getDeliverySummaryText(cityKey) {
  const city = CITIES[cityKey] || CITIES.kabul;
  const today = new Date();
  if (city.type === "express") {
    return `${formatShortDate(addDays(today, city.minDays))} – ${formatShortDate(addDays(today, city.maxDays))} (Express Door-to-Door)`;
  }
  if (city.type === "hub") {
    return `${formatShortDate(addDays(today, city.minDays))} – ${formatShortDate(addDays(today, city.maxDays))} (Provincial Hub Pickup)`;
  }
  return "Coming Soon — Waitlist";
}

function renderDeliveryEstimate(cityKey) {
  const resultEl = document.getElementById("delivery-result");
  if (!resultEl) return;

  const city = CITIES[cityKey] || CITIES.kabul;
  const today = new Date();

  resultEl.className = "estimator-result";

  if (city.type === "express") {
    const start = formatShortDate(addDays(today, city.minDays));
    const end = formatShortDate(addDays(today, city.maxDays));
    resultEl.classList.add("status-express");
    resultEl.innerHTML = `
      <span class="est-badge est-badge-green">✓ Express Door-to-Door &amp; Technician Install</span>
      <div class="est-dates">Estimated Delivery: ${start} – ${end}</div>
      <p class="est-desc"><strong>${city.label}:</strong> Express 2–3 day door-to-door delivery from today. All kits available—including <strong>Tier 2 Kabul Technician Installation</strong>.</p>
      <p class="est-fa fa" dir="rtl"><strong>تحویل سریع درب منزل در کابل (۲ تا ۳ روز آینده):</strong> تمام بسته‌ها از جمله نصب توسط تخنیک‌کار (بستهٔ درجه ۲) در کابل قابل دسترس است.</p>
    `;
  } else if (city.type === "hub") {
    const start = formatShortDate(addDays(today, city.minDays));
    const end = formatShortDate(addDays(today, city.maxDays));
    resultEl.classList.add("status-hub");
    resultEl.innerHTML = `
      <span class="est-badge est-badge-amber">📦 Provincial Hub Pickup (DIY Kits Only)</span>
      <div class="est-dates">Estimated Pickup Ready: ${start} – ${end}</div>
      <p class="est-desc"><strong>${city.label}:</strong> 4–6 days from today via our trusted provincial pickup hub. Available for <strong>Mini Essentials ($40)</strong> and <strong>Tier 1 DIY Kit ($70)</strong>.</p>
      <p class="est-fa fa" dir="rtl"><strong>تحویل در نمایندگی ولایت (۴ تا ۶ روز آینده):</strong> فعلاً برای بسته‌های نصب توسط فامیل (بستهٔ ضروری و درجه ۱) قابل دسترس است.</p>
    `;
  } else {
    const waitlistMsg = `Salam Raukar team! Please add me to the WhatsApp waitlist for ${city.label}.`;
    resultEl.classList.add("status-waitlist");
    resultEl.innerHTML = `
      <span class="est-badge est-badge-slate">⏳ Coming Soon — Join Waitlist</span>
      <div class="est-dates">${city.label}: Launching Soon</div>
      <p class="est-desc">We are expanding our verified delivery network to ${city.label}. Join our WhatsApp waitlist to be notified first when slots open.</p>
      <p class="est-fa fa" dir="rtl">خدمات ما به زودی در این شهر آغاز می‌شود. برای اطلاع سریع‌تر عضو لیست انتظار واتساپ شوید.</p>
      <div style="margin-top: 14px;">
        <a href="${getWhatsAppBaseUrl(waitlistMsg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          💬 Join WhatsApp Waitlist for ${city.label.split(" ")[0]}
        </a>
      </div>
    `;
  }
}

function initDeliveryEstimator() {
  const estSelect = document.getElementById("city-estimator-select");
  const checkoutSelect = document.getElementById("checkout-city");
  if (!estSelect) return;

  renderDeliveryEstimate(estSelect.value);

  estSelect.addEventListener("change", () => {
    renderDeliveryEstimate(estSelect.value);
    if (checkoutSelect) {
      checkoutSelect.value = estSelect.value;
      updateKabulInstallWarning();
    }
  });

  if (checkoutSelect) {
    checkoutSelect.addEventListener("change", () => {
      estSelect.value = checkoutSelect.value;
      renderDeliveryEstimate(checkoutSelect.value);
      updateKabulInstallWarning();
    });
  }
}

/* ============================================================================
   4. CART MANAGEMENT & RENDERING
   ============================================================================ */
function getCartTotals() {
  let count = 0;
  let totalUsd = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    if (PRODUCTS[id] && qty > 0) {
      count += qty;
      totalUsd += PRODUCTS[id].priceUsd * qty;
    }
  });
  return { count, totalUsd, totalCad: formatCad(totalUsd) };
}

function addToCart(productId) {
  if (!PRODUCTS[productId]) return;
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart();
  renderAllCartViews();
  showToast(`Added "${PRODUCTS[productId].name}" to cart ✓`);
}

function updateQty(productId, delta) {
  if (!cart[productId]) return;
  cart[productId] += delta;
  if (cart[productId] <= 0) {
    delete cart[productId];
  }
  saveCart();
  renderAllCartViews();
}

function clearCart() {
  cart = {};
  saveCart();
  renderAllCartViews();
  const paymentPanel = document.getElementById("payment-panel");
  if (paymentPanel) paymentPanel.classList.add("is-hidden");
}

function updateKabulInstallWarning() {
  const warning = document.getElementById("kabul-install-warning");
  const checkoutCity = document.getElementById("checkout-city");
  if (!warning || !checkoutCity) return;

  const hasTier2 = (cart.tier2 || 0) > 0;
  const isNotKabul = checkoutCity.value !== "kabul";
  warning.classList.toggle("is-hidden", !(hasTier2 && isNotKabul));
}

function renderCartListInto(containerEl) {
  if (!containerEl) return;
  const entries = Object.entries(cart).filter(([id, qty]) => PRODUCTS[id] && qty > 0);

  if (entries.length === 0) {
    containerEl.innerHTML = `
      <div class="empty-cart-box">
        Your cart is empty. Add a winterization kit above to get started.
        <span class="fa block-fa" dir="rtl">سبد خرید شما خالی است. لطفاً یکی از بسته‌های بالا را انتخاب کنید.</span>
      </div>
    `;
    return;
  }

  containerEl.innerHTML = entries.map(([id, qty]) => {
    const p = PRODUCTS[id];
    const lineUsd = p.priceUsd * qty;
    return `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span>$${p.priceUsd} USD each • Subtotal: <strong>$${lineUsd}</strong></span>
        </div>
        <div class="qty-controls">
          <button type="button" class="qty-btn" data-qty-id="${id}" data-delta="-1" aria-label="Decrease quantity">&minus;</button>
          <span class="qty-val">${qty}</span>
          <button type="button" class="qty-btn" data-qty-id="${id}" data-delta="1" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `;
  }).join("");

  containerEl.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateQty(btn.getAttribute("data-qty-id"), Number(btn.getAttribute("data-delta")));
    });
  });
}

function renderAllCartViews() {
  const { count, totalUsd, totalCad } = getCartTotals();

  // Header & floating badges
  const headerBadge = document.getElementById("header-cart-count");
  if (headerBadge) headerBadge.textContent = count;

  const floatingPill = document.getElementById("floating-cart-pill");
  const floatingCount = document.getElementById("floating-cart-count");
  const floatingTotal = document.getElementById("floating-cart-total");
  if (floatingPill && floatingCount && floatingTotal) {
    floatingCount.textContent = count;
    floatingTotal.textContent = `$${totalUsd} USD`;
    floatingPill.classList.toggle("is-hidden", count === 0);
  }

  // Render lists in both checkout section and slide-out drawer
  renderCartListInto(document.getElementById("checkout-cart-items"));
  renderCartListInto(document.getElementById("drawer-cart-items"));

  // Totals
  const checkoutUsd = document.getElementById("checkout-total-usd");
  const checkoutCad = document.getElementById("checkout-total-cad");
  const drawerUsd = document.getElementById("drawer-total-usd");
  const drawerCad = document.getElementById("drawer-total-cad");

  if (checkoutUsd) checkoutUsd.textContent = `$${totalUsd} USD`;
  if (checkoutCad) checkoutCad.textContent = `~$${totalCad} CAD`;
  if (drawerUsd) drawerUsd.textContent = `$${totalUsd} USD`;
  if (drawerCad) drawerCad.textContent = `~$${totalCad} CAD`;

  updateKabulInstallWarning();
}

/* ============================================================================
   5. SHORT ORDER CODE GENERATOR (Format: RK-XXXX) & CHECKOUT SUBMIT
   ============================================================================ */
function generateShortOrderCode() {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 1000..9999
  return `RK-${randomNum}`;
}

function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  const errorBox = document.getElementById("form-error");
  const paymentPanel = document.getElementById("payment-panel");
  if (!form || !paymentPanel) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.classList.add("is-hidden");

    const { count, totalUsd, totalCad } = getCartTotals();
    const recipientName = document.getElementById("recipient-name").value.trim();
    const recipientPhone = document.getElementById("recipient-phone").value.trim();
    const cityKey = document.getElementById("checkout-city").value;
    const isSplitPay = document.getElementById("split-pay-checkbox").checked;
    const cityObj = CITIES[cityKey];

    // Validation
    if (count === 0) {
      showError("Please add at least one kit to your cart before generating an Order Code. (لطفاً اول یک بسته به سبد خرید اضافه کنید.)");
      return;
    }
    if (!recipientName || !recipientPhone) {
      showError("Please enter the recipient's name and Afghan phone number. (لطفاً نام و شماره تماس گیرنده در افغانستان را وارد کنید.)");
      return;
    }
    if (cityObj && cityObj.type === "waitlist") {
      showError(`${cityObj.label} is currently on our waitlist. Please select Kabul or a nearby province, or join the WhatsApp waitlist above.`);
      return;
    }

    // Generate unique short order code (RK-XXXX)
    activeOrderCode = generateShortOrderCode();

    // Update UI with generated code & amounts
    document.getElementById("generated-order-code").textContent = activeOrderCode;
    document.querySelectorAll(".inline-code-mirror").forEach((el) => {
      el.textContent = activeOrderCode;
    });
    document.querySelectorAll(".pm-usd-amount").forEach((el) => {
      el.textContent = `$${totalUsd} USD`;
    });
    document.querySelectorAll(".pm-cad-amount").forEach((el) => {
      el.textContent = `~$${totalCad} CAD`;
    });
    document.querySelectorAll(".split-half-note").forEach((el) => {
      el.classList.toggle("is-hidden", !isSplitPay);
    });

    // Build pre-filled WhatsApp confirmation message
    const itemLines = Object.entries(cart)
      .filter(([id, qty]) => PRODUCTS[id] && qty > 0)
      .map(([id, qty]) => `- ${qty}x ${PRODUCTS[id].name} ($${PRODUCTS[id].priceUsd * qty} USD)`)
      .join("\n");

    const splitLine = isSplitPay ? "\nPayment Mode: Sibling Split-Pay (2 siblings sending half each)" : "";
    const waMessage =
      `Salam Raukar Team! I am confirming my order:\n\n` +
      `Order Code: ${activeOrderCode}\n` +
      `Items:\n${itemLines}\n` +
      `Total: $${totalUsd} USD (~$${totalCad} CAD)${splitLine}\n\n` +
      `Delivery City: ${cityObj.label}\n` +
      `Est. Window: ${getDeliverySummaryText(cityKey)}\n` +
      `Recipient Name: ${recipientName}\n` +
      `Recipient Phone: ${recipientPhone}\n\n` +
      `I will write ONLY ${activeOrderCode} in my Zelle/Interac memo.`;

    const waBtn = document.getElementById("whatsapp-confirm-btn");
    if (waBtn) {
      waBtn.href = getWhatsAppBaseUrl(waMessage);
    }

    // Reveal panel & scroll smoothly to it
    paymentPanel.classList.remove("is-hidden");
    paymentPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`Order Code ${activeOrderCode} ready!`);
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove("is-hidden");
  }
}

/* ============================================================================
   6. COPY TO CLIPBOARD BUTTONS
   ============================================================================ */
function copyText(text, triggerBtn, originalLabel) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      flashCopied(triggerBtn, originalLabel);
    }).catch(() => fallbackCopy(text, triggerBtn, originalLabel));
  } else {
    fallbackCopy(text, triggerBtn, originalLabel);
  }
}

function fallbackCopy(text, triggerBtn, originalLabel) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    flashCopied(triggerBtn, originalLabel);
  } catch (e) {
    showToast("Copy failed — please copy manually.");
  }
  document.body.removeChild(ta);
}

function flashCopied(btn, originalLabel) {
  btn.textContent = "✓ Copied!";
  showToast("Copied to clipboard ✓");
  setTimeout(() => {
    btn.textContent = originalLabel;
  }, 2000);
}

function initCopyButtons() {
  const copyCodeBtn = document.getElementById("copy-code-btn");
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener("click", () => {
      if (!activeOrderCode) return;
      copyText(activeOrderCode, copyCodeBtn, "📋 Copy Code");
    });
  }

  document.querySelectorAll(".btn-mini-copy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-copy-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        copyText(targetEl.textContent.trim(), btn, "Copy");
      }
    });
  });
}

/* ============================================================================
   7. CART DRAWER, MOBILE MENU, FAQ ACCORDION & TOAST
   ============================================================================ */
function initDrawerAndNav() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const openBtn = document.getElementById("open-cart-btn");
  const closeBtn = document.getElementById("close-cart-btn");
  const floatingPill = document.getElementById("floating-cart-pill");
  const drawerCheckoutBtn = document.getElementById("drawer-checkout-btn");

  function openDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
  }

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  if (floatingPill) {
    floatingPill.addEventListener("click", () => {
      document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (drawerCheckoutBtn) {
    drawerCheckoutBtn.addEventListener("click", () => {
      closeDrawer();
      document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Mobile Menu
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = !mobileNav.hidden;
      mobileNav.hidden = isOpen;
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.hidden = true;
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
}

function initFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;
      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

/* ============================================================================
   BOOT
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initHeroVideo();
  initStaticWhatsAppLinks();
  initDeliveryEstimator();
  initDrawerAndNav();
  initCheckoutForm();
  initCopyButtons();
  initFaqAccordion();
  renderAllCartViews();

  // Bind Add to Cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.getAttribute("data-id"));
    });
  });

  // Bind Clear Cart button
  const clearBtn = document.getElementById("clear-cart-btn");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
