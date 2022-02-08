<?php 

require "koneksi.php";

$postData     = json_decode(file_get_contents("php://input"));
$nama         = $postData->nama;
$username     = $postData->username;
$password     = password_hash($postData->password, PASSWORD_DEFAULT);
$alamat       = $postData->alamat;
$email        = $postData->email;
$nomorTelepon = $postData->nomorTelepon;
$response = [];

$sqlRegisterUser = "INSERT INTO user (nama, username, password, alamat, email, nomor_telepon, role)  "
  . "VALUES ('$nama', '$username', '$password', '$alamat', '$email', '$nomorTelepon', 'admin')";

$hasilSqlRegisterUser = mysqli_query($koneksiDb, $sqlRegisterUser);

if ($hasilSqlRegisterUser) {
  $response["isRegisterSukses"] = true;
} else {
  $response["isRegisterSukses"] = false;
}

echo json_encode($response);