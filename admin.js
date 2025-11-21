// Function untuk menangani preview Hero Image
function updateHeroImagePreview(imageUrl) {
    const preview = document.getElementById('hero-image-preview');
    const removeBtn = document.getElementById('remove-hero-image');
    
    // Hapus konten sebelumnya
    preview.innerHTML = '';
    
    if (imageUrl && imageUrl.trim() !== '') {
        // Jika ada URL gambar, tampilkan gambar
        preview.style.fontSize = '0';
        preview.innerHTML = `<img src="${imageUrl}" alt="Hero Image">`;
        removeBtn.style.display = 'inline-block';
    } else {
        // Jika tidak ada URL, tampilkan emoji default
        preview.style.fontSize = '3rem';
        preview.textContent = '🎂';
        removeBtn.style.display = 'none';
    }
}

// Handler untuk input file Hero Image
document.getElementById('admin-hero-image-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // Gunakan event.target.result (Base64 URL) untuk preview
            updateHeroImagePreview(event.target.result);
        };
        reader.readAsDataURL(file); // Membaca file sebagai Data URL (Base64)
    }
});

// Handler tombol hapus Hero Image
document.getElementById('remove-hero-image').addEventListener('click', () => {
    // Kosongkan input file
    document.getElementById('admin-hero-image-file').value = ''; 
    // Reset preview
    updateHeroImagePreview('');
});


// Fungsi dan Handler serupa harus dibuat untuk:
// 1. updateGalleryPreview(galleryNum, imageUrl)
// 2. updateProductPreview(productId, imageUrl)
// 3. updateFeaturedPreview(featuredNum, imageUrl)
// ... dan dipasangkan dengan event listener untuk semua input file gambar (misalnya featured-img-1, admin-gallery1-file, dll.)
// Contoh (menggunakan delegasi event untuk kemudahan):

document.querySelectorAll('.admin-input[type="file"]').forEach(input => {
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const id = e.target.id;
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                
                // Logika untuk menentukan preview mana yang akan di-update
                if (id.startsWith('featured-img-')) {
                    const featuredNum = e.target.getAttribute('data-featured');
                    // updateFeaturedPreview(parseInt(featuredNum), imageUrl); // Asumsi Anda memiliki fungsi ini
                } else if (id.startsWith('admin-gallery')) {
                    const galleryNum = id.replace('admin-gallery', '').replace('-file', '');
                    // updateGalleryPreview(parseInt(galleryNum), imageUrl); // Asumsi Anda memiliki fungsi ini
                }
                // ... Tambahkan logika untuk jenis gambar lain ...
            };
            reader.readAsDataURL(file);
        }
    });
});

// Fungsi untuk menyimpan seluruh konfigurasi
document.getElementById('save-config-btn').addEventListener('click', () => {
    // 1. Ambil semua nilai input teks dan warna
    const siteTitle = document.getElementById('admin-site-title').value;
    // ... ambil nilai input lain

    // 2. Ambil semua data URL gambar (Base64) dari preview atau simpan dalam format khusus.
    // Untuk gambar, Anda perlu menyimpan Base64 URL (event.target.result) ke dalam objek konfigurasi.
    const heroImageUrl = document.getElementById('hero-image-preview').querySelector('img') ? 
                         document.getElementById('hero-image-preview').querySelector('img').src : '';

    const newConfig = {
        site_title: siteTitle,
        hero_image_url: heroImageUrl,
        // ... konfigurasi lainnya
    };

    // 3. Simpan newConfig (misalnya ke localStorage atau ke server)
    localStorage.setItem('citarasamaron_admin_config', JSON.stringify(newConfig));

    // Tampilkan notifikasi sukses
    const successMsg = document.getElementById('save-success');
    successMsg.textContent = '✅ Semua perubahan berhasil disimpan!';
    successMsg.classList.add('show');
    setTimeout(() => { successMsg.classList.remove('show'); }, 4000);
});

