<?php 

require "koneksi.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

$sqlGetAdmin = "SELECT id_user, nama, username, alamat, email, nomor_telepon "
  . "FROM user WHERE role = 'admin'";
$hasilSqlGetAdmin = mysqli_query($koneksiDb, $sqlGetAdmin);

$listAdmin = [];
while ($admin = mysqli_fetch_object($hasilSqlGetAdmin)) {
  $listAdmin[] = $admin;
}
$response["listAdmin"] = $listAdmin;
echo json_encode($response);