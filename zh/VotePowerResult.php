<?php
     $result_share = $_GET['result_share'];
     $result = $_GET['result'];
     $opp = $_GET['opp'];
     $image = "https://pages.malaysiakini.com/undipower/zh/img/fb_opp" . $opp . "_you_" . $result . ".jpg";
?>

<!DOCTYPE html>
<head>
     <!-- This url should be the same as the href you passed in to showDialog -->
     <meta property="og:url" content="<?="https://pages.malaysiakini.com".$_SERVER['HTTP_POST'].$_SERVER['REQUEST_URI'];?>" /> 
     <meta property="og:title" content="<?=$result_share?>"/>
     <meta property="og:description" content="你手中的一票在国会有多大影响力？跟其他选区的代表较量一下，比比看谁的选票实力更大。"/> 
     <meta property="og:image" content="<?=$image?>"/>
     <meta property="fb:app_id" content="1275566669256484">
     <meta property="og:locale" content="zh_CN">
     <meta property="og:type" content="article">
     <meta property="og:site_name" content="Malaysiakini">
     <meta property="article:author" content="https://www.facebook.com/mkinicn/">
</head>

<!-- both url is the url where your story page is hosted -->
<?php
include('https://pages.malaysiakini.com/undipower/zh/');
?>
<script>window.location.href = 'https://pages.malaysiakini.com/undipower/zh/';</script>