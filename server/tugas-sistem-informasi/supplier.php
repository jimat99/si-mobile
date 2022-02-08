<?php 

require "koneksi.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$response = [];

if ($requestMethod === "GET") {
  // Jika get semua supplier
  if (empty($_GET)) {
    $sqlGetSupplier = "SELECT * FROM supplier WHERE is_deleted = 'tidak'";
    $hasilSqlGetSupplier = mysqli_query($koneksiDb, $sqlGetSupplier);

    $listSupplier = [];
    while ($supplier = mysqli_fetch_object($hasilSqlGetSupplier)) {
      $listSupplier[] = $supplier;
    }
    $response["listSupplier"] = $listSupplier;
  } 
  // Jika get satu supplier
  elseif (isset($_GET["id"])){
    $idSupplier = $_GET["id"];
    $sqlGetSupplier = "SELECT * FROM supplier WHERE id_supplier = $idSupplier";
    $hasilSqlGetSupplier = mysqli_query($koneksiDb, $sqlGetSupplier);
    $supplier = mysqli_fetch_object($hasilSqlGetSupplier);

    $response["supplier"] = $supplier;
  } 
  // Get semua supplier untuk picker dan supplier pertama.
  elseif (isset($_GET["get_for_picker"])) {
    $sqlGetSupplier = "SELECT * FROM supplier WHERE is_deleted = 'tidak'";
    $sqlGetSupplierPertama = "SELECT * FROM supplier WHERE is_deleted = 'tidak' LIMIT 1";
    $hasilSqlGetSupplier = mysqli_query($koneksiDb, $sqlGetSupplier);
    $hasilSqlGetSupplierPertama = mysqli_query($koneksiDb, $sqlGetSupplierPertama);

    $listPickerItem = [];
    while ($supplier = mysqli_fetch_object($hasilSqlGetSupplier)) {
      $pickerItem = new stdClass();
      $pickerItem->label = $supplier->nama;
      $pickerItem->value = $supplier;
      $listPickerItem[] = $pickerItem;
    }
    $response["listPickerItem"] = $listPickerItem;
    $response["supplierPertama"] = mysqli_fetch_object($hasilSqlGetSupplierPertama);
  }
  echo json_encode($response);
} 
elseif ($requestMethod === "POST") {
  // Post data
  if (empty($_GET)) {
    $postData     = json_decode(file_get_contents("php://input"));
    $nama         = $postData->nama;
    $alamat       = $postData->alamat;
    $email        = $postData->email;
    $nomorTelepon = $postData->nomorTelepon;  

    $sqlInsertSupplier = "INSERT INTO supplier (nama, alamat, email, nomor_telepon) "
      . "VALUES ('$nama', '$alamat', '$email', '$nomorTelepon')";
    mysqli_query($koneksiDb, $sqlInsertSupplier); 
  } 
  // Update data
  else {
    $idSupplier = $_GET["id"];

    $postData     = json_decode(file_get_contents("php://input"));
    $nama         = $postData->nama;
    $alamat       = $postData->alamat;
    $email        = $postData->email;
    $nomorTelepon = $postData->nomorTelepon;

    $sqlUpdateSupplier = "UPDATE supplier "
      . "SET nama = '$nama', alamat = '$alamat', email = '$email', nomor_telepon = '$nomorTelepon' "
      . "WHERE id_supplier = '$idSupplier'";
    mysqli_query($koneksiDb, $sqlUpdateSupplier);
  }
}
elseif ($requestMethod === "DELETE"){
  $idSupplier = $_GET["id"];  
  $sqlHapusSupplier = "UPDATE supplier SET is_deleted = 'ya' WHERE id_supplier = $idSupplier";
  mysqli_query($koneksiDb, $sqlHapusSupplier);
}
