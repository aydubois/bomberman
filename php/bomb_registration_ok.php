<?php
//Récupération des données du formulaire
    $mdp_new1 = htmlspecialchars($_POST['password1']);
    $mdp_new2 = htmlspecialchars($_POST['password2']);
    $pseudo_new = htmlspecialchars($_POST['pseudo']);
    $mail_new = $_POST['mail'];

// Vérification que le mail est bien un mail
    if(preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#",$mail_new)){
        $verif1 = true;
    }
    else{
        $verif1 = false;
        echo 'L\'email est incorrect';
    }

// Vérification mdp1 = mdp2 si c'est ok on crypte
    if($mdp_new1==$mdp_new2){
        $mdp_new_hash = password_hash($mdp_new1,PASSWORD_DEFAULT);
        $verif2 = true;
    }
    else{
        $verif2 = false;
        echo 'Tu as tapé deux mots de passe différents ! Réessaie';
    }


// Connexion à la bdd  
    try{
        $bdd= new PDO('mysql:host=database;dbname=mydatabase;charset=utf8','audrey','test');
    }
    catch(PDOException $e){ echo $e->getMessage();
        exit();
    }
// Vérification que le pseudo et/ou l'email ne sont pas déjà dans la bdd
$verif_ma = $bdd->prepare('SELECT pseudo, mail FROM bomber_user WHERE pseudo=? OR mail=?');
$verif_ma->execute(array($pseudo_new,$mail_new));
$aff_verif_ma = $verif_ma->fetchAll();

if(empty($aff_verif_ma)){
    $verif3 = true;
}
else{
     $verif3 = false;        
    echo 'Ce pseudo ou cet e-mail est déjà utilisé';
}
$verif_ma->closeCursor();

// Si toutes les vérifications ok alors on insère le nouveau membre dans la bdd
if($verif1==true AND $verif2==true AND $verif3==true){
    $ins_info = $bdd->prepare('INSERT INTO bomber_user(pseudo,password,mail,start_date) VALUES( :pseudo, :password, :mail, NOW())');
    $ins_info->execute(array(
        'pseudo'=>$pseudo_new,
        'password'=>$mdp_new_hash,
        'mail'=>$mail_new
    ));
}
else{
    echo ' - Erreur : vous n\'avez pas pu être enregistré';
}

?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Enregistrement OK Bomberman</title>
    <link rel="stylesheet" type="text/css" href="../css/register.css">
    <link rel="stylesheet" type="text/css" href="../css/nav.css">
</head>

<body>
    <header>
        <img src="../pictures/logo.png" alt="logo">
        <h1>BOMBERMAN</h1>
        <?php include('../php/nav.php')?>
    </header>
    <section class="register_ok">
        <p>Ton inscription a bien été validée.</p>
        <a href="../bomberman.php"><button>Jouer</button></a>
    </section>
</body>

</html>