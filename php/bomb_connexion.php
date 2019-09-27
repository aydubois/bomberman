<?php
    session_start();


// Si le formulaire de connexion à été rempli
 if(isset($_POST['pseudo']) AND isset($_POST['password'])){

    // On vérifie qu'aucune connexion est en cours
    if($_SESSION){
        $allready_connect =  'Vous êtes déjà connecté';
    }
    else{
    //On récupère les données du formulaires
    $copseudo = htmlspecialchars($_POST['pseudo']);
    $copass = htmlspecialchars($_POST['password']);

    //On se connecte à la bdd
    try{
        $bdd = new PDO('mysql:host=database;dbname=mydatabase;charset=utf8','audrey','test');
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }

    //On vérifie que ces données sont correctes
    $connect = $bdd->prepare('SELECT * FROM bomber_user WHERE pseudo=?');
    $connect->execute(array($copseudo));
    $aff_connect = $connect->fetch();
    $pass_hash = $aff_connect['password'];
    $copass_ok = password_verify($copass,$pass_hash);

    $comail = $aff_connect['mail'];


    // Si données incorrectes -> retry Sinon ouverture session + cookie
    if($copass_ok==false){
        $data_wrong = "Les informations saisies sont erronnées. <br/> Veuillez recommencer.";
    }
    else{
        session_start();
        $_SESSION['id']=$aff_connect['id'];
        $_SESSION['pseudo']= $copseudo;
        $_SESSION['mail']=$comail;
        $_SESSION['password']=$pass_hash;
        $data_true = 'Bienvenue sur votre compte '. $_SESSION['pseudo'];
    
        setcookie('identify',$copseudo,time()+3600*30,null,null,false,true);
        setcookie('hash_pass',$pass_hash,time()+3600*30,null,null,false,true);
        
        //si checkbox checked création cookie pour login auto
        if(isset($_POST['auto'])){
            setcookie('auto','auto_checked',time()+3600*30,null,null,false,true);
        }
        elseif(!isset($_POST['auto'])){
            setcookie('auto','unchecked',time()+3600*30,null,null,false,true);
        }    
        //  -> insert timestamp connection
        $ins_info = $bdd->prepare('UPDATE bomber_user SET last_connexion = NOW() WHERE id = :id');
        $ins_info->execute(array(
        'id' => $_SESSION['id']
        ));
    }
    $connect->closeCursor();
 }}

 //Si les cookies d'identification sont déjà présents
 elseif(isset($_COOKIE['identify']) AND isset($_COOKIE['hash_pass'])AND isset($_COOKIE['auto'])){
    if($_COOKIE['auto']=='auto_checked'){
        //vérification qu'ils sont OK
            //On se connecte à la bdd
        try{
            $bdd = new PDO('mysql:host=database;dbname=mydatabase;charset=utf8','audrey','test');
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
            // On cherche le pass de la bdd et on compare avec le cookie
        $connect_auto = $bdd->prepare('SELECT * FROM bomber_user WHERE pseudo=?');
        $connect_auto->execute(array($_COOKIE['identify']));
        $aff_connect_auto = $connect_auto->fetch();
        $pass_hash_auto = $aff_connect_auto['password'];
        $copass_auto_ok = password_verify($_COOKIE['hash_pass'],$pass_hash_auto);

        
    
        if($_COOKIE['hash_pass']==$pass_hash_auto){
            $allreadydata  = 'vous avez été automatiquement connecté. Bienvenue '. $_COOKIE['identify'];
            session_start();
            $_SESSION['id']=$aff_connect['id'];
            $_SESSION['pseudo']= $copseudo;
        }
        else{
            $data_error = 'Problème de connexion automatique, veuillez resaisir vos identifiants';
        }
        $connect_auto->closeCursor();
    }
    
 }
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Connexion Bomberman</title>
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
    <?php   if (isset($data_true)){ ?> <div class="connexion_ok"><p> <?php echo $data_true; ?>
    </p>
        <a href="../bomberman.php"><button>Jouer</button></a> </div>
        <p>
<?php } 
                    elseif(isset($allreadydata)){echo $allreadydata;}
                    elseif(isset($allready_connect)){echo $allready_connect;}
                    else{ 
                        if(isset($data_wrong)){echo $data_wrong;}
                        elseif(isset($data_error)){echo $data_error;}
                    ?> </p>
        <p>Connecte-toi</p>
        <form action="../php/bomb_connexion.php" method="POST">
            <div class="info"><label>Pseudo : </label><input type="text" name="pseudo"></div>
            <div class="info"><label>Mot de passe : </label><input type="password" name="password"></div>
            <div class="info"><label> Connexion automatique </label><input type="checkbox" name="auto"></div>
            <input type="submit" value="C'est parti !!!">
        </form>
                    <?php } ?>
        </section>
</body>

</html>