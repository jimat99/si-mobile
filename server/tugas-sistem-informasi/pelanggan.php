<?php 

require "koneksi.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$response = [];

if ($requestMethod === "GET") {
  // Jika get semua pelanggan
  if (empty($_GET)) {
    $sqlGetPelanggan = "SELECT * FROM pelanggan WHERE is_deleted = 'tidak'";
    $hasilSqlGetPelanggan = mysqli_query($koneksiDb, $sqlGetPelanggan);

    $listPelanggan = [];
    while ($pelanggan = mysqli_fetch_object($hasilSqlGetPelanggan)) {
      $listPelanggan[] = $pelanggan;
    }
    $response["listPelanggan"] = $listPelanggan;
  } 
  // Jika get satu pelanggan
  elseif (isset($_GET["id"])){
    $idPelanggan = $_GET["id"];
    $sqlGetPelanggan = "SELECT * FROM pelanggan WHERE id_pelanggan = $idPelanggan";
    $hasilSqlGetPelanggan = mysqli_query($koneksiDb, $sqlGetPelanggan);
    $pelanggan = mysqli_fetch_object($hasilSqlGetPelanggan);

    $response["pelanggan"] = $pelanggan;
  } 
  // Get semua pelanggan untuk picker dan pelanggan pertama.
  elseif (isset($_GET["get_for_picker"])) {
    $sqlGetPelanggan = "SELECT * FROM pelanggan WHERE is_deleted = 'tidak'";
    $sqlGetPelangganPertama = "SELECT * FROM pelanggan WHERE is_deleted = 'tidak' LIMIT 1";
    $hasilSqlGetPelanggan = mysqli_query($koneksiDb, $sqlGetPelanggan);
    $hasilSqlGetPelangganPertama = mysqli_query($koneksiDb, $sqlGetPelangganPertama);

    $listPickerItem = [];
    while ($pelanggan = mysqli_fetch_object($hasilSqlGetPelanggan)) {
      $pickerItem = new stdClass();
      $pickerItem->label = $pelanggan->nama;
      $pickerItem->value = $pelanggan;
      $listPickerItem[] = $pickerItem;
    }
    $response["listPickerItem"] = $listPickerItem;
    $response["pelangganPertama"] = mysqli_fetch_object($hasilSqlGetPelangganPertama);
  }
  echo json_encode($response);
} 
elseif ($requestMethod === "POST") {
  // Post data
  if (empty($_GET)) {
    $postData     = json_decode(file_get_contents("php://input"));
    $nama         = $postData->nama;
    $alamat       = $postData->alamat;
    $nomorTelepon = $postData->nomorTelepon;  

    $sqlInsertPelanggan = "INSERT INTO pelanggan (nama, alamat, nomor_telepon) "
      . "VALUES ('$nama', '$alamat', '$nomorTelepon')";
    mysqli_query($koneksiDb, $sqlInsertPelanggan); 
  } 
  // Update data
  else {
    $idPelanggan = $_GET["id"];

    $postData     = json_decode(file_get_contents("php://input"));
    $nama         = $postData->nama;
    $alamat       = $postData->alamat;
    $nomorTelepon = $postData->nomorTelepon;

    $sqlUpdatePelanggan = "UPDATE pelanggan "
      . "SET nama = '$nama', alamat = '$alamat', nomor_telepon = '$nomorTelepon' "
      . "WHERE id_pelanggan = '$idPelanggan'";
    mysqli_query($koneksiDb, $sqlUpdatePelanggan);
  }
}
elseif ($requestMethod === "DELETE"){
  $idPelanggan = $_GET["id"];  
  $sqlHapusPelanggan = "UPDATE pelanggan SET is_deleted = 'ya' WHERE id_pelanggan = $idPelanggan";
  mysqli_query($koneksiDb, $sqlHapusPelanggan);
}
