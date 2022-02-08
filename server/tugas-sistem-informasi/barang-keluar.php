<?php 

require "koneksi.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$response = [];

if ($requestMethod === "GET") {
  $sqlGetBarangKeluar = "SELECT bk.*, "
    . "p.nama AS nama_pelanggan, u.nama AS nama_user "
    . "FROM barang_keluar bk "
    . "JOIN pelanggan p ON bk.id_pelanggan = p.id_pelanggan "
    . "JOIN user u ON bk.id_user = u.id_user";
  $hasilSqlGetBarangKeluar = mysqli_query($koneksiDb, $sqlGetBarangKeluar);

  $listBarangKeluar = [];
  while ($barangKeluar = mysqli_fetch_object($hasilSqlGetBarangKeluar)) {
    $listBarangKeluar[] = $barangKeluar;
  }
  $response["listBarangKeluar"] = $listBarangKeluar;
  echo json_encode($response);
}
elseif ($requestMethod === "POST") {
  $postData          = json_decode(file_get_contents("php://input"));
  $arrIdBarang       = $postData->arrIdBarang;
  $arrHargaPerBarang = $postData->arrHargaPerBarang;
  $idPelanggan       = $postData->idPelanggan;
  $idUser            = $postData->idUser;  
  $arrJumlahBarang   = $postData->arrJumlahBarang;  

  $sqlGetIdBarangKeluar = "SELECT AUTO_INCREMENT FROM information_schema.tables "
    . "WHERE table_name = 'barang_keluar' AND table_schema = 'tugas_sistem_informasi'";
  $hasilSqlGetIdBarangKeluar = mysqli_query($koneksiDb, $sqlGetIdBarangKeluar);
  $idBarangKeluar = mysqli_fetch_object($hasilSqlGetIdBarangKeluar)->AUTO_INCREMENT;


  $sqlInsertDetailBarangKeluar;
  $jumlahInputanBarang = count($arrIdBarang);
  $jumlahBarangSemua = 0;
  $totalHargaSemua = 0;
  for ($i = 0; $i < $jumlahInputanBarang; $i++) {
    $jumlahBarangSemua += $arrJumlahBarang[$i];
    $totalHarga = $arrHargaPerBarang[$i] * $arrJumlahBarang[$i];
    $totalHargaSemua += $totalHarga;

    $sqlInsertDetailBarangKeluar[] = "INSERT INTO detail_barang_keluar (id_barang_keluar, id_barang, jumlah_barang, total_harga) "
      . "VALUES ($idBarangKeluar, $arrIdBarang[$i], $arrJumlahBarang[$i], $totalHarga)";

    $sqlKurangiStok = "UPDATE barang SET stok = stok - $arrJumlahBarang[$i] WHERE id_barang = $arrIdBarang[$i]";
    mysqli_query($koneksiDb, $sqlKurangiStok);    
  }

  $sqlInsertBarangKeluar = "INSERT INTO barang_keluar (id_pelanggan, id_user, jumlah_barang, total_harga, tanggal_keluar) "
    . "VALUES ($idPelanggan, $idUser, $jumlahBarangSemua, $totalHargaSemua, CURDATE())";
  mysqli_query($koneksiDb, $sqlInsertBarangKeluar);

  foreach ($sqlInsertDetailBarangKeluar as $value) {
    mysqli_query($koneksiDb, $value); 
  }
} 
