# Klipan Studio

Editor video berbasis browser untuk tim kumparan. Semua proses jalan di perangkat pengguna, jadi video tidak dikirim ke server.

## Yang bisa dipakai
- Timeline: split, hapus, duplikat, undo, kecepatan, volume, fade, trim, zoom, geser, cermin
- Transisi, 16 filter, pengaturan kecerahan, kontras, saturasi
- Teks (font, latar, animasi), stiker emoji, gambar overlay
- Track audio sendiri: voice-over, musik, efek suara, dan musik latar bawaan
- Rekam layar, caption otomatis (Whisper), impor dan ekspor SRT
- Simpan dan buka proyek (.json; file media perlu diimpor ulang)
- Ekspor MP4/WebM, 480p sampai 1080p

## Deploy
Tidak ada proses build. Hubungkan repo ini ke Netlify, kosongkan build command, publish directory `.`.

## Catatan
Ekspor direkam secara real-time, jadi tab harus tetap terbuka sampai selesai. Caption otomatis butuh internet saat pertama dipakai.

Lisensi: MIT
