<?php 

require "koneksi.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$response = [];

if ($requestMethod === "GET") {
  // Jika get semua barang
  if (empty($_GET)) {
    $sqlGetBarang = "SELECT * FROM barang WHERE is_deleted = 'tidak'";
    $hasilSqlGetBarang = mysqli_query($koneksiDb, $sqlGetBarang);

    $listBarang = [];
    while ($barang = mysqli_fetch_object($hasilSqlGetBarang)) {
      $listBarang[] = $barang;
    }
    $response["listBarang"] = $listBarang;
  } 
  // Jika get satu barang
  elseif (isset($_GET["id"])){
    $idBarang = $_GET["id"];
    $sqlGetBarang = "SELECT * FROM barang WHERE id_barang = $idBarang";
    $hasilSqlGetBarang = mysqli_query($koneksiDb, $sqlGetBarang);
    $barang = mysqli_fetch_object($hasilSqlGetBarang);

    $response["barang"] = $barang;
  } 
  // Get semua barang untuk picker dan barang pertama.
  elseif (isset($_GET["get_for_picker"])) {
    $sqlGetBarang = "SELECT * FROM barang WHERE is_deleted = 'tidak'";
    $sqlGetBarangPertama = "SELECT * FROM barang WHERE is_deleted = 'tidak' LIMIT 1";
    $hasilSqlGetBarang = mysqli_query($koneksiDb, $sqlGetBarang);
    $hasilSqlGetBarangPertama = mysqli_query($koneksiDb, $sqlGetBarangPertama);

    $listPickerItem = [];
    while ($barang = mysqli_fetch_object($hasilSqlGetBarang)) {
      $pickerItem = new stdClass();
      $pickerItem->label = $barang->nama;
      $pickerItem->value = $barang;
      $listPickerItem[] = $pickerItem;
    }
    $response["listPickerItem"] = $listPickerItem;
    $response["barangPertama"] = mysqli_fetch_object($hasilSqlGetBarangPertama);
  }
  echo json_encode($response);
} 
elseif ($requestMethod === "POST") {
  // Post data
  if (empty($_GET)) {
    $nama       = $_POST["nama"];
    $ukuran     = $_POST["ukuran"];
    $hargaBeli  = intval($_POST["harga_beli"]);
    $hargaJual  = intval($_POST["harga_jual"]);
    $stok       = intval($_POST["stok"]);
    $formatFile = strtolower(pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION));
    $pathFoto   = "image/produk/" . date("d-m-Y-h-i-s") . ".$formatFile";

    if (in_array($formatFile, ["jpg", "jpeg", "png"])) {  
      move_uploaded_file($_FILES["foto"]["tmp_name"], $pathFoto);
    }

    $sqlInsertBarang = "INSERT INTO barang (nama, ukuran, harga_beli, harga_jual, stok, path_foto) "
      . "VALUES ('$nama', '$ukuran', $hargaBeli, $hargaJual, $stok, '$pathFoto')";
    mysqli_query($koneksiDb, $sqlInsertBarang);
    echo $sqlInsertBarang;
  } 
  // Update data
  else {
    $idBarang = $_GET["id"];

    $nama      = $_POST["nama"];
    $ukuran    = $_POST["ukuran"];
    $hargaBeli = intval($_POST["harga_beli"]);
    $hargaJual = intval($_POST["harga_jual"]);
    $stok      = intval($_POST["stok"]);

    // Update dengan foto
    if (isset($_FILES["foto"])) {
      $formatFile = strtolower(pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION));
      $pathFoto   = "image/produk/" . date("d-m-Y-h-i-s") . ".$formatFile";

      if (in_array($formatFile, ["jpg", "jpeg", "png"])) {  
        move_uploaded_file($_FILES["foto"]["tmp_name"], $pathFoto);
      }

      $sqlUpdateBarang = "UPDATE barang "
        . "SET nama = '$nama', ukuran = '$ukuran', harga_beli = $hargaBeli, "
        . "harga_jual = $hargaJual, stok = $stok, path_foto = '$pathFoto' "
        . "WHERE id_barang = '$idBarang'";
      mysqli_query($koneksiDb, $sqlUpdateBarang);
    } 
    // Update tanpa foto
    else {
      $sqlUpdateBarang = "UPDATE barang "
        . "SET nama = '$nama', ukuran = '$ukuran', harga_beli = $hargaBeli, "
        . "harga_jual = $hargaJual, stok = $stok "
        . "WHERE id_barang = '$idBarang'";
      mysqli_query($koneksiDb, $sqlUpdateBarang);
    }
  }
}
elseif ($requestMethod === "DELETE"){
  $idBarang = $_GET["id"];  
  $sqlHapusBarang = "UPDATE barang SET is_deleted = 'ya' WHERE id_barang = $idBarang";
  mysqli_query($koneksiDb, $sqlHapusBarang);
}
