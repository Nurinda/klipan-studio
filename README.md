# Clipora

Editor video berbasis browser untuk tim kumparan. Semua proses jalan di perangkat pengguna, jadi video tidak dikirim ke server.

## Yang bisa dipakai
- Timeline: split, hapus, duplikat, undo, kecepatan, volume, fade, trim, zoom, geser, cermin
- Layout panel ala editor desktop: tab Media, Teks, Stiker, Transisi, Efek, Filter, Template, Suara, Proyek
- Timeline 4 lane (Teks, Overlay, Video, Audio) dengan kunci, sembunyikan, bisukan, dan ruler waktu
- Transisi (6), efek (7), 16 filter, template teks (termasuk lower third dan breaking news)
- Shortcut: Space, S, Q, W, M, Home/End, panah (1 frame), Shift+panah (10 frame), Ctrl+S/E/I/Y
- Transisi, 16 filter, pengaturan kecerahan, kontras, saturasi
- Teks (font, latar, animasi), stiker emoji, gambar overlay
- Track audio sendiri: voice-over, musik, efek suara, dan musik latar bawaan
- Rekam layar, caption otomatis (Whisper), impor dan ekspor SRT
- Masker (bulat, kotak, bintang), blend mode, mode muat dengan latar blur, suara cempreng, fade audio
- Tarik tepi klip untuk trim, simpan otomatis di browser (lanjutkan proyek terakhir)
- Kurva kecepatan (editor kurva + preset), teks ke suara, bersihkan noise, hapus jeda, hapus kata pengisi
- Geser teks dan overlay langsung di preview, seret ruler untuk scrub
- Tab Logo: pasang logo kumparan atau logo lain di pojok pilihan, ukuran dan opacity diatur, otomatis mengikuti durasi video
- Simpan dan buka proyek (.json; file media perlu diimpor ulang)
- Ekspor MP4/WebM, 480p sampai 1080p

- Overlay video (PiP) di 2 track, keyframe (opacity, zoom, posisi, rotasi) dengan easing, freeze frame, reverse (ffmpeg.wasm)
- Chroma key dan hapus latar AI (MediaPipe) untuk overlay
- Copy/paste (Ctrl+C/V), drag untuk memindah dan mengurutkan klip, snapping
- Ekspor MP4 sungguhan lewat ffmpeg.wasm (core dimuat dari jsDelivr saat dibutuhkan)

## Deploy
Tidak ada proses build. Hubungkan repo ini ke Netlify, kosongkan build command, publish directory `.`.

## Catatan
Ekspor direkam secara real-time, jadi tab harus tetap terbuka sampai selesai. Caption otomatis butuh internet saat pertama dipakai.

Lisensi: MIT
