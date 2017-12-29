<?php
     $result_share = $_GET['result_share'];
     $result = $_GET['result'];
     $opp = $_GET['opp'];
     $image = "https://pages.malaysiakini.com/undipower/img/fb_opp" . $opp . "_you_" . $result . ".jpg";

?>

<!DOCTYPE html>
<head>
     <!-- This url should be the same as the href you passed in to showDialog -->
     <meta property="og:url" content="<?="https://pages.malaysiakini.com".$_SERVER['HTTP_POST'].$_SERVER['REQUEST_URI'];?>" /> 
     <meta property="og:title" content="<?=$result_share?>"/>
     <meta property="og:description" content="How powerful is your vote? Fight your way through our line-up of mighty leaders!"/> 
     <meta property="og:image" content="<?=$image?>"/>
     <meta property="fb:app_id" content="217374841612391">
     <meta property="og:locale" content="en_GB">
     <meta property="og:type" content="article">
     <meta property="og:site_name" content="Malaysiakini">
     <meta property="article:author" content="https://www.facebook.com/MalaysiaKini/">
</head>

<!-- both url is the url where your story page is hosted -->
<?php
include('https://pages.malaysiakini.com/undipower/');
?>
<script>window.location.href = 'https://pages.malaysiakini.com/undipower/';</script>