<?php 
require "koneksi.php";

$idBarangKeluar = $_GET["id_barang_keluar"];

$sqlGetDetailBarangKeluar = "SELECT * FROM detail_barang_keluar dbk "
  . "JOIN barang b ON dbk.id_barang = b.id_barang "
  . "WHERE id_barang_keluar = $idBarangKeluar";
$hasilSqlGetDetailBarangKeluar = mysqli_query($koneksiDb, $sqlGetDetailBarangKeluar);

$listDetailBarangKeluar = [];
while ($detailBarangKeluar = mysqli_fetch_object($hasilSqlGetDetailBarangKeluar)) {
  $listDetailBarangKeluar[] = $detailBarangKeluar;
}
$response["listDetailBarangKeluar"] = $listDetailBarangKeluar;
echo json_encode($response);