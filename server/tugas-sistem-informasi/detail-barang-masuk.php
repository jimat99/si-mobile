<?php 
require "koneksi.php";

$idBarangMasuk = $_GET["id_barang_masuk"];

$sqlGetDetailBarangMasuk = "SELECT * FROM detail_barang_masuk dbm "
  . "JOIN barang b ON dbm.id_barang = b.id_barang "
  . "WHERE id_barang_masuk = $idBarangMasuk";
$hasilSqlGetDetailBarangMasuk = mysqli_query($koneksiDb, $sqlGetDetailBarangMasuk);

$listDetailBarangMasuk = [];
while ($detailBarangMasuk = mysqli_fetch_object($hasilSqlGetDetailBarangMasuk)) {
  $listDetailBarangMasuk[] = $detailBarangMasuk;
}
$response["listDetailBarangMasuk"] = $listDetailBarangMasuk;
echo json_encode($response);