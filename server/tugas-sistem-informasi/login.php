<?php 

require "koneksi.php";

$postData = json_decode(file_get_contents("php://input"));
$username = $postData->username;
$password = $postData->password;
$response = [];

$sqlGetUserPassword = "SELECT password FROM user WHERE username = '$username'";

$hasilSqlGetUserPassword = mysqli_query($koneksiDb, $sqlGetUserPassword);

// Jika username ditemukan
if ($hasilSqlGetUserPassword->num_rows > 0) {
  $user = mysqli_fetch_object($hasilSqlGetUserPassword);

  // Jika password benar
  if (password_verify($password, $user->password)) {
    $sqlGetUserLogin = "SELECT id_user, nama, username, "
      . "alamat, email, nomor_telepon, role "
      . "FROM user WHERE username = '$username'";

    $hasilSqlGetUserLogin = mysqli_query($koneksiDb, $sqlGetUserLogin);

    $user = mysqli_fetch_object($hasilSqlGetUserLogin);

    $response["isLoginSukses"] = true;
    $response["user"]          = $user;
  } 
  // Jika password salah
  else {
    $response["isLoginSukses"] = false;
  }
} 
// Jika username tidak ditemukan
else {
  $response["isLoginSukses"] = false;
}

echo json_encode($response);