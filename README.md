# Klipan Studio
Editor video di browser (terinspirasi https://github.com/jub0t/concat). Tema warna: teal + merah + putih. Tanpa build step.
## Deploy
1. Upload folder ini ke GitHub (repo baru, drag & drop file).
2. Netlify > Add new site > Import from Git > pilih repo (build command kosong, publish directory `.`). Atau drag & drop folder ke Netlify.
## Fitur
Impor video/audio/gambar, timeline, split/hapus/duplikat/undo, kecepatan, volume, fade, trim, 8 filter, teks, rasio, auto-caption Whisper (butuh internet saat pertama), ekspor MP4/WebM.
Tambahan: voice-over, rekam layar, track audio, zoom/geser klip, simpan/buka proyek (.json, media diimpor ulang), impor/ekspor SRT.
## Catatan
Ekspor direkam real-time, jadi biarkan tab aktif sampai selesai. Auto-caption memakai transformers.js dari CDN jsDelivr.
Lisensi: MIT.
