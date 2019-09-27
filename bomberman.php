<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <title>Bomberman v.1</title>
    <link rel="stylesheet" type="text/css" href="/css/game.css">
    <link rel="stylesheet" type="text/css" href="/css/nav.css">

</head>

<body>
    <header>
        <img src="./pictures/logo.png" alt="logo">
        <h1>BOMBERMAN</h1>
        <?php include('./php/nav.php')?>
    </header>

    <section>
        <button id="start">Commencer</button>
        <div id="sentence">
            <p>  ...Et c'est parti pour le show ! Tout le monde est prêt, tout le monde est chaud !</p>
        </div>
        <div id="main_wrapper">
            <article>
                <div id="boxTimer">
                    <p id="timer"></p>
                </div>

                <div id="score">
                    <h2>Scores : </h2>
                </div>

            </article>
            <div id="game"></div>
            <div id="divPlayer"></div>

            <div id="settings"></div>
        </div>
    </section>


    <footer>

    </footer>
    <!--  <script src="//unpkg.com/brain.js"></script>
    
    <script type="module" src="/AI/AI_2_0.js"></script>   -->
    <script type="module" src="/js/game.js"></script>
</body>