<h1 class="title" style="text-align: center;">Tugas Kecil 1 Strategi Algoritma</h1> 
<h3 class="title" style="text-align: center;">Cyberpunk 2077 Minigame Breach Protocol</h3>

<div class="identity" style="margin: 2vh 0 0 0;">
	<p>Nama	:	Bagas Sambega Rosyada</p>
	<p>NIM		:	13522071 </p>
</div>

## Daftar Isi
1. [Deskripsi Umum](#deskripsi-umum)
2. [Deskripsi Program](#deskripsi-program)
3. [Requirement](#requirement)
4. [Cara Penggunaan Program](#cara-penggunaan-program)

## Deskripsi Umum
Tugas Kecil 1 Strategi Algoritma ini bertujuan untuk membuat program untuk menyelesaikan permainan minigame _**Breach Protocol**_ dari permainan Cyberpunk 2077. 
Dalam permainan ini, pengguna akan memasukkan sebuah matriks yang berisi sekumpulan token dan juga sekuens-sekuens yang merupakan rules dengan nilai _reward_-nya masing-masing.

Program ini bertujuan untuk mencari sekuens yang bisa menghasilkan nilai total _reward_ paling besar, dengan pola pencarian bergantian secara vertikal, horizontal, vertikal, horizontal, vertikal, horizontal, dan seterusnya hingga panjangnya maksimal mencapai panjang _buffer_.

Pola pencarian yang dilakukan adalah dengan menggunakan algoritma _brute force_ atau _exhaustive search_, dalam program ini yaitu menggunakan pola rekursif untuk mencari seluruh kemungkinan kombinasi token yang ada, lalu mencari nilai _reward_ maksimum yang bisa dihasilkan.

## Deskripsi Program
<table style="text-align: center;">
    <tr>
        <th>GUI</th>
        <th>Styling</th>
        <th>Logic</th>
    </tr>
    <tr>
        <td>HTML</td>
        <td>CSS</td>
        <td>Javascript</td>
    </tr>
</table>

### Struktur Program
```
.
├── README.md
├── src/
│   ├── index.html
│   ├── style.css
│   ├── random/
│   │   ├── random.html
│   │   ├── random.css
│   │   └── random.js
│   └── upload/
│       ├── upload.html
│       ├── upload.css
│       └── upload.js
├── test/
│   ├── test1
│   ├── test2
│   ├── test3
│   └── test4
└── docs
```

## Requirement
- Web Browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.)
- Internet (untuk mengakses Google Font API)

## Cara Penggunaan Program
1. Clone repository ini
```
git clone https://github.com/bagassambega/Tucil1_13522071.git
```
2. Buka file `index.html` pada folder `src` menggunakan web browser atau dengan _double click_ pada file tersebut.
3. Pilih salah satu dari dua opsi:
    - **Random**: Untuk menghasilkan matriks secara acak
    - **Upload**: Untuk mengunggah file permainan yang sudah ada
4. Jika memilih mode **Random**, masukkan panjang dan lebar matriks, panjang _buffer_,
token-token yang akan di-_generate_, banyak sekuens dan panjang maksimal sekuens. 
5. Jika memilih mode **Upload**, pilih file dengan ekstensi `.txt` yang akan diunggah. Format file `.txt` yang diunggah harus sesuai dengan format berikut:
```
<panjang buffer>
<panjang matriks> <lebar matriks>
<matriks>
<jumlah sekuens>
<sekuens 1>
<reward 1>
<sekuens 2>
<reward 2>
...
<sekuens n>
<reward n>
```
6. Setelah semua data berhasil dimasukkan, klik tombol **Solve**.
7. Setelah proses _solving_ selesai, hasil permainan dan _reward_ akan muncul, dan pengguna dapat memilih untuk mengunduh hasil
permainan menjadi file `.txt`

#### Note
**Solve** pada program input acak menggunakan proses yang lebih berat dibandingkan pada mode **upload**, sehingga matriks berukuran cukup besar dapat menyebabkan _browser_ berjalan lambat. Jika hal tersebut terlanjur terjadi, tunggu hingga proses selesai atau _force refresh_ menggunakan `Ctrl + F5`.
