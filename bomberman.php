<?php session_start(); 
if(isset($_POST['nb_enemy'])){
    $nb_enemy = $_POST['nb_enemy'];
    $nb_enemy = (int)$nb_enemy;
} else{
    $nb_enemy = 1;
}
    $nb_enemy = json_encode($nb_enemy);
?>
<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <title>Bomberman v.1</title>
    <link rel="stylesheet" type="text/css" href="/css/game.css">
    <link rel="stylesheet" type="text/css" href="/css/nav.css">

</head>

<script> let nbEnemy = <?= $nb_enemy ?> ; </script>
<body>
    <header>
        <img src="./pictures/logo.png" alt="logo">
        <h1>BOMBERMAN</h1>
        <?php include('./php/nav.php')?>
    </header>

    <section>
        <?php if(isset($_SESSION['id'])){ ?>
        <div class="settings">
            <form action="bomberman.php" method="POST">
                <h2>Nombre d'adversaires : </h2>
                <input type="radio" name="nb_enemy" value="1" checked>
                <label for="1"> 1 </label>
                <input type="radio" name="nb_enemy" value="2">
                <label for="2"> 2 </label>
                <input type="radio" name="nb_enemy" value="3">
                <label for="3"> 3 </label>

                <input type="submit" value="enregistrer les changements">
            </form>
        </div>
        <button id="start">Commencer</button>
        <div id="sentence">
            <p> Bonjour <?= $_SESSION['pseudo'] ?>, nous sommes prêts à combattre.</p> <?php }else{ ?>
            <p> Vous devez être connecté pour jouer. </p>
            <?php } ?>
        </div>
        <div id="main_wrapper">
            <article>
                <div id="boxTimer">
                    <p id="timer"></p>
                </div>
                <div id="life">
                    <h2>Vies <br /> restantes : </h2>
                    <p> <?= $_SESSION['pseudo'] ?> : <span id="player_life"> </span></p>
                    <p> Adversaire 1 : <span id='life_ai_1'>  </span></p>
            <?php if($nb_enemy >= 2){ ?> <p> Adversaire 2 : <span id='life_ai_2'>  </span></p> <?php } 
            if($nb_enemy == 3){ ?>
                <p> Adversaire 3 : <span id='life_ai_3'>  </span></p>
        <?php    } ?>
                </div>
                <div id="score">
                    <h2>Scores : </h2>
                </div>

            </article>
            <div id="game"></div>
            <div id="divPlayer"></div>

        </div>
    </section>


    <footer>

    </footer>
    <!--  <script src="//unpkg.com/brain.js"></script>
    
    <script type="module" src="/AI/AI_2_0.js"></script>   -->
    <script type="module" src="/js/game.js"></script>
</body>