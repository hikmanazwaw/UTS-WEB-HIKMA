# Interactive Personal Portfolio - UTS Pemrograman Web

Website portfolio satu halaman milik **Hikma Nazwa Agustin** (Sistem Informasi, Universitas Nusantara PGRI Kediri, semester 3). Dibuat dengan HTML5, Bootstrap 5, dan JavaScript dasar tanpa backend.

## Tujuan
Menerapkan HTML semantik, Bootstrap 5, JavaScript function, event listener, dan manipulasi DOM, serta publikasi lewat GitHub Pages.

## Fitur
- Navbar responsif dengan hamburger menu dan tombol dark mode
- Hero, About, Skills (progress bar), Projects, Tools, Contact, Footer
- Pencarian proyek langsung (judul/deskripsi) dan filter kategori
- Modal detail proyek (Lihat Detail dan Lihat Kode)
- Kalkulator estimasi biaya website (validasi dan format Rupiah)
- Validasi formulir kontak (hanya di browser, tidak mengirim ke server)
- Tahun footer otomatis

## Teknologi
HTML5, CSS3, Bootstrap 5.3 (CDN), Bootstrap Icons, JavaScript.

## Struktur Folder
```
UTS-WEB-HIKMA/
├── index.html
├── css/style.css
├── js/script.js
├── img/profile.jpg
├── img/project-placeholder.jpg
└── README.md
```

## Menjalankan Secara Lokal
1. Unduh atau ekstrak folder proyek.
2. Buka `index.html` di browser (atau gunakan ekstensi Live Server di VS Code).
3. Koneksi internet diperlukan untuk memuat Bootstrap dan font dari CDN.

## Mengganti Data dan Gambar
- Nama, NPM, minat utama, email: cari teks `[NPM]`, `[Email]`, `[Isi minat utama...]` di `index.html`.
- Foto profil: ganti `img/profile.jpg` dengan fotomu (nama file sama, rasio persegi).
- Thumbnail proyek: ganti `img/project-placeholder.jpg`, atau buat gambar baru dan ubah atribut `src`.
- Proyek: edit atribut `data-title`, `data-description`, `data-tech`, `data-repo`, `data-demo` pada setiap `<article>` (teks kartu juga perlu disamakan).
- Nilai skill: ubah `data-level` pada `.progress-bar`.
- Tarif kalkulator: ubah `WEBSITE_RATES` dan `COMPLEXITY_MULTIPLIERS` di `js/script.js`.

## Mengunggah ke GitHub
```bash
git init
git add .
git commit -m "UTS Pemrograman Web: portfolio"
git branch -M main
git remote add origin [URL-REPOSITORY-GITHUB-ANDA]
git push -u origin main
```

## Mengaktifkan GitHub Pages
1. Buka repository di GitHub, pilih **Settings** lalu **Pages**.
2. Pada **Source**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
3. Tunggu beberapa menit sampai alamat situs muncul.

- URL repository: `[ISI SETELAH REPOSITORY DIBUAT]`
- URL website: `[ISI SETELAH GITHUB PAGES AKTIF]`

## Pengujian Fitur
1. **Dark mode**: klik ikon bulan/matahari di navbar; tema dan ikon berubah.
2. **Pencarian**: ketik "portfolio" di kolom cari; ketik "zzz" untuk melihat pesan "Proyek tidak ditemukan".
3. **Filter**: klik tiap kategori; hanya proyek terkait yang tampil.
4. **Modal**: klik "Lihat Detail" atau "Lihat Kode"; detail proyek muncul.
5. **Kalkulator**: Portfolio, 3 halaman, Menengah menghasilkan Rp 900.000; isi 0, 2,5, atau kosong untuk melihat pesan error.
6. **Formulir**: kirim kosong (muncul error per kolom), isi email salah, lalu isi semua dengan benar (muncul pesan berhasil).
7. **Hamburger menu**: perkecil lebar browser di bawah 992px.

## Checklist UTS
- [ ] Struktur folder sesuai, file terhubung dengan jalur relatif
- [ ] Elemen semantik: header, nav, main, section, article, aside, footer
- [ ] Bootstrap: navbar, grid, card, modal, form, badge, progress
- [ ] Semua JavaScript di `js/script.js`, tanpa error di Console
- [ ] Placeholder data pribadi sudah diganti
- [ ] Repository GitHub dan GitHub Pages aktif, URL diisi di README
