<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Enregistrement Bomberman</title>
    <link rel="stylesheet" type="text/css" href="../css/register.css">
    <link rel="stylesheet" type="text/css" href="../css/nav.css">
</head>

<body>
    <header>
        <img src="../pictures/logo.png" alt="logo">
        <h1>BOMBERMAN</h1>
        <?php include('../php/nav.php')?>
    </header>
    <section>
        <p>Inscription</p>
        <form action="./bomb_registration_ok.php" method="POST">
            <div class="info"><label>Pseudo : </label><input type="text" name="pseudo" autocomplete="username"></div>
            <div class="info"><label>E-mail : </label><input type="email" name="mail" autocomplete="email"></div>
            <div class="info"><label>Mot de passe : </label><input type="password" name="password1" autocomplete="new-password"></div>
            <div class="info"><label>Confirmation du Mot de passe : </label><input type="password" name="password2" autocomplete="new-password"></div>
            <input type="submit" value="Je m'inscris">
        </form>
    </section>
</body>

</html>