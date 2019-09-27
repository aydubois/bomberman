<?php 
    session_start();
    $message = 'Vous êtes bien déconnecté. A bientôt !';
    
    if(isset($_SESSION['id']) AND isset($_POST['disconnect'])){
        session_destroy();
    }

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Deconnexion Bomberman</title>
    <link rel="stylesheet" type="text/css" href="../css/connexion.css">
    <link rel="stylesheet" type="text/css" href="../css/nav.css">
</head>

<body>
    <header>
        <img src="../pictures/logo.png" alt="logo">
        <h1>BOMBERMAN</h1>
        <?php include('../php/nav.php')?>
    </header>
    <section>
        <?php   if (!isset($_SESSION['id'])){ ?> <p> <?php echo $message; ?>
        </p>

        <p>
<?php } else{ ?> </p>
        <p>Tu es sûr de vouloir partir ?</p>
        <form action="../php/bomb_disconnection.php" method="POST">
            <input type="submit" value="Se déconnecter" name="disconnect">
        </form>
<?php } ?>
    </section>
</body>

</html>