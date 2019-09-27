<nav>
    <ul>
        <?php if(!isset($_SESSION['id'])){ ?>
            <li><a href="../php/bomb_registration.php">Inscription</li></a>
        <li><a href="../php/bomb_connexion.php">Connexion</li></a> 
        <?php } else{ ?>
            <li><a href="../php/bomb_disconnection.php">Se déconnecter</li></a>
            <li><a>Profil</li></a>
            <li><a href="../bomberman.php">Jouer</li></a>
    </ul>
        <?php } ?> 
</nav>