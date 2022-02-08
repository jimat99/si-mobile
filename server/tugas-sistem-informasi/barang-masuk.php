<?php 

require "koneksi.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$response = [];

if ($requestMethod === "GET") {
  $sqlGetBarangMasuk = "SELECT bm.*, "
    . "s.nama AS nama_supplier, u.nama AS nama_user "
    . "FROM barang_masuk bm "
    . "JOIN supplier s ON bm.id_supplier = s.id_supplier "
    . "JOIN user u ON bm.id_user = u.id_user";
  $hasilSqlGetBarangMasuk = mysqli_query($koneksiDb, $sqlGetBarangMasuk);

  $listBarangMasuk = [];
  while ($barangMasuk = mysqli_fetch_object($hasilSqlGetBarangMasuk)) {
    $listBarangMasuk[] = $barangMasuk;
  }
  $response["listBarangMasuk"] = $listBarangMasuk;
  echo json_encode($response);
} 
elseif ($requestMethod === "POST") {
  $postData          = json_decode(file_get_contents("php://input"));
  $arrIdBarang       = $postData->arrIdBarang;
  $arrHargaPerBarang = $postData->arrHargaPerBarang;
  $idSupplier        = $postData->idSupplier;
  $idUser            = $postData->idUser;  
  $arrJumlahBarang   = $postData->arrJumlahBarang;  

  $sqlGetIdBarangMasuk = "SELECT AUTO_INCREMENT FROM information_schema.tables "
    . "WHERE table_name = 'barang_masuk' AND table_schema = 'tugas_sistem_informasi'";
  $hasilSqlGetIdBarangMasuk = mysqli_query($koneksiDb, $sqlGetIdBarangMasuk);
  $idBarangMasuk = mysqli_fetch_object($hasilSqlGetIdBarangMasuk)->AUTO_INCREMENT;


  $sqlInsertDetailBarangMasuk;
  $jumlahInputanBarang = count($arrIdBarang);
  $jumlahBarangSemua = 0;
  $totalHargaSemua = 0;
  for ($i = 0; $i < $jumlahInputanBarang; $i++) {
    $jumlahBarangSemua += $arrJumlahBarang[$i];
    $totalHarga = $arrHargaPerBarang[$i] * $arrJumlahBarang[$i];
    $totalHargaSemua += $totalHarga;

    $sqlInsertDetailBarangMasuk[] = "INSERT INTO detail_barang_masuk (id_barang_masuk, id_barang, jumlah_barang, total_harga) "
      . "VALUES ($idBarangMasuk, $arrIdBarang[$i], $arrJumlahBarang[$i], $totalHarga)";

    $sqlTambahStok = "UPDATE barang SET stok = stok + $arrJumlahBarang[$i] WHERE id_barang = $arrIdBarang[$i]";
    mysqli_query($koneksiDb, $sqlTambahStok);
  }

  $sqlInsertBarangMasuk = "INSERT INTO barang_masuk (id_supplier, id_user, jumlah_barang, total_harga, tanggal_masuk) "
    . "VALUES ($idSupplier, $idUser, $jumlahBarangSemua, $totalHargaSemua, CURDATE())";
  mysqli_query($koneksiDb, $sqlInsertBarangMasuk);

  foreach ($sqlInsertDetailBarangMasuk as $value) {
    mysqli_query($koneksiDb, $value); 
  }
} 
