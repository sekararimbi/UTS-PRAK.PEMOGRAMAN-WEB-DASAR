// ============================================================
//  script.js — Restoran Nusantara
//  SOAL 4: Validasi Form JavaScript
//  SOAL 5: DOM Dinamis — Array of Object
// ============================================================


// ============================================================
//  SOAL 5: DATA MENU (Array of Object) + DOM Dinamis
// ============================================================

// Data awal disimpan dalam array of object (minimal 4 item)
let dataMenu = [
  { id: 1, nama: "Mie Goreng Spesial", emoji: "🍜", harga: 28000 },
  { id: 2, nama: "Nasi Goreng Kampung", emoji: "🍳", harga: 22000 },
  { id: 3, nama: "Es Teh Manis",        emoji: "🧋", harga: 8000  },
  { id: 4, nama: "Bakso Jumbo",         emoji: "🥣", harga: 20000 },
];

let nextId = 5; // counter ID unik

/**
 * Render semua item menu ke dalam #menu-list menggunakan DOM
 */
function renderMenu() {
  const container = document.getElementById("menu-list");
  container.innerHTML = ""; // kosongkan dulu

  if (dataMenu.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#888;">Belum ada menu. Tambahkan menu di atas!</p>';
    return;
  }

  // Loop array of object → buat elemen DOM untuk setiap item
  dataMenu.forEach(function (item) {
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.setAttribute("data-id", item.id);

    div.innerHTML = `
      <span class="emoji">${item.emoji}</span>
      <h4>${item.nama}</h4>
      <p class="price">Rp ${item.harga.toLocaleString("id-ID")}</p>
      <button class="btn-hapus" onclick="hapusMenu(${item.id})" title="Hapus">✕</button>
    `;

    container.appendChild(div);
  });
}

/**
 * Tambah menu baru ke array & re-render (tanpa reload halaman)
 */
function tambahMenu() {
  const inputNama  = document.getElementById("input-nama");
  const inputEmoji = document.getElementById("input-emoji");
  const inputHarga = document.getElementById("input-harga");
  const errEl      = document.getElementById("error-dinamis");

  const nama  = inputNama.value.trim();
  const emoji = inputEmoji.value.trim() || "🍽️";
  const harga = parseInt(inputHarga.value);

  // Validasi sederhana
  if (!nama) {
    errEl.textContent = "⚠️ Nama menu tidak boleh kosong!";
    return;
  }
  if (isNaN(harga) || harga <= 0) {
    errEl.textContent = "⚠️ Harga harus berupa angka positif!";
    return;
  }

  errEl.textContent = ""; // hapus pesan error

  // Tambah ke array
  dataMenu.push({ id: nextId++, nama, emoji, harga });

  // Reset input
  inputNama.value  = "";
  inputEmoji.value = "";
  inputHarga.value = "";

  renderMenu(); // re-render DOM
}

/**
 * Hapus item berdasarkan id dari array & re-render (tanpa reload)
 */
function hapusMenu(id) {
  dataMenu = dataMenu.filter(function (item) {
    return item.id !== id;
  });
  renderMenu();
}


// ============================================================
//  SOAL 4: VALIDASI FORM JAVASCRIPT
// ============================================================

/**
 * Tampilkan pesan error di bawah field
 */
function tampilError(idError, pesan) {
  const el = document.getElementById(idError);
  el.textContent = pesan;
}

/**
 * Reset semua pesan error & class invalid
 */
function resetError() {
  const fields = ["nama", "email", "password", "telp", "kota"];
  fields.forEach(function (f) {
    document.getElementById("err-" + f).textContent = "";
    const el = document.getElementById(f);
    if (el) el.classList.remove("invalid");
  });
  document.getElementById("err-gender").textContent = "";
  document.getElementById("err-setuju").textContent = "";
}

/**
 * Validasi utama form registrasi — dipanggil saat tombol diklik
 */
function validasiForm() {
  resetError();

  let valid = true;

  // --- 1. Validasi Nama (field wajib tidak boleh kosong) ---
  const nama = document.getElementById("nama").value.trim();
  if (nama === "") {
    tampilError("err-nama", "⚠️ Nama lengkap wajib diisi.");
    document.getElementById("nama").classList.add("invalid");
    valid = false;
  }

  // --- 2. Validasi Email (format email valid) ---
  const email = document.getElementById("email").value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // pola dasar email
  if (email === "") {
    tampilError("err-email", "⚠️ Email wajib diisi.");
    document.getElementById("email").classList.add("invalid");
    valid = false;
  } else if (!regexEmail.test(email)) {
    tampilError("err-email", "⚠️ Format email tidak valid. Contoh: nama@gmail.com");
    document.getElementById("email").classList.add("invalid");
    valid = false;
  }

  // --- 3. Validasi Password (wajib & minimal 8 karakter) ---
  const password = document.getElementById("password").value;
  if (password === "") {
    tampilError("err-password", "⚠️ Password wajib diisi.");
    document.getElementById("password").classList.add("invalid");
    valid = false;
  } else if (password.length < 8) {
    tampilError("err-password", "⚠️ Password minimal 8 karakter.");
    document.getElementById("password").classList.add("invalid");
    valid = false;
  }

  // --- 4. Validasi Nomor Telepon (angka & harus positif) ---
  const telp = document.getElementById("telp").value;
  if (telp === "") {
    tampilError("err-telp", "⚠️ Nomor telepon wajib diisi.");
    document.getElementById("telp").classList.add("invalid");
    valid = false;
  } else if (parseInt(telp) <= 0) {
    tampilError("err-telp", "⚠️ Nomor telepon harus bernilai positif.");
    document.getElementById("telp").classList.add("invalid");
    valid = false;
  }

  // --- 5. Validasi Kota (select wajib dipilih) ---
  const kota = document.getElementById("kota").value;
  if (kota === "") {
    tampilError("err-kota", "⚠️ Silakan pilih kota domisili.");
    document.getElementById("kota").classList.add("invalid");
    valid = false;
  }

  // --- 6. Validasi Gender (radio wajib dipilih) ---
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    tampilError("err-gender", "⚠️ Jenis kelamin wajib dipilih.");
    valid = false;
  }

  // --- 7. Validasi Checkbox Persetujuan ---
  const setuju = document.getElementById("setuju").checked;
  if (!setuju) {
    tampilError("err-setuju", "⚠️ Anda harus menyetujui syarat & ketentuan.");
    valid = false;
  }

  // --- Jika semua valid → tampilkan pesan sukses ---
  const suksesEl = document.getElementById("sukses-msg");
  if (valid) {
    suksesEl.textContent = "✅ Registrasi berhasil! Selamat datang, " + nama + "!";
    // (di proyek nyata: kirim data ke server via fetch/AJAX)
  } else {
    suksesEl.textContent = "";
  }
}


// ============================================================
//  INISIALISASI: render menu saat halaman pertama dibuka
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  renderMenu();
});
