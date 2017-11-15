<?php
     $result_share = $_GET['result_share'];
     // $price = $_GET['price'];
?>

<!DOCTYPE html>
<head>
     <!-- This url should be the same as the href you passed in to showDialog -->
     <meta property="og:url" content="<?="http://".$_SERVER['HTTP_POST'].$_SERVER['REQUEST_URI'];?>" /> 
     <meta property="og:title" content="<?=$result_share?>"/>
     <meta property="og:description" content="My description"/> 
     <meta property="og:image" content="https://pages.malaysiakini.com/votepower-kk/img/avatar_me_480x480.png" />

	 
</head>

<!-- both url is the url where your story page is hosted -->
<?php
include('https://pages.malaysiakini.com/votepower-kk/index.html');
?>
<script>window.location.href = 'https://pages.malaysiakini.com/votepower-kk/index.html';</script>