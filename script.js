// VALIDASI FORM
document.getElementById("formRegis").addEventListener("submit", function(e) {
    e.preventDefault();

    let nama = document.getElementById("nama").value;
    let email = document.getElementById("email").value;
    let telp = document.getElementById("telp").value;

    let valid = true;

    // Nama
    if (nama === "") {
        document.getElementById("errNama").innerText = "Nama wajib diisi";
        valid = false;
    } else {
        document.getElementById("errNama").innerText = "";
    }

    // Email
    if (!email.includes("@")) {
        document.getElementById("errEmail").innerText = "Email tidak valid";
        valid = false;
    } else {
        document.getElementById("errEmail").innerText = "";
    }

    // Telepon
    if (telp <= 0) {
        document.getElementById("errTelp").innerText = "Harus angka positif";
        valid = false;
    } else {
        document.getElementById("errTelp").innerText = "";
    }

    if (valid) {
        alert("Registrasi berhasil!");
    }
});


// DATA DINAMIS
let menu = [
    { nama: "Sate Ayam" },
    { nama: "Bakso" },
    { nama: "Soto" },
    { nama: "Nasi Uduk" }
];

function tampilMenu() {
    let list = document.getElementById("listMenu");
    list.innerHTML = "";

    menu.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.nama} <button onclick="hapusMenu(${index})">Hapus</button>`;
        list.appendChild(li);
    });
}

function tambahMenu() {
    let input = document.getElementById("inputMenu").value;
    if (input !== "") {
        menu.push({ nama: input });
        tampilMenu();
    }
}

function hapusMenu(index) {
    menu.splice(index, 1);
    tampilMenu();
}

// tampil awal
tampilMenu();