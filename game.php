<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <li><a href="games/empty">Empty Template</a></li>
	<li><a href="games/multiplayer-snake/">Snake</a></li>
    <li><a href="games/SAP-Ecco/">Adversarial Shortest Path</a></li>
        <!--?php include $base."leftMenuGame.php"; ?-->
    </nav>
    <article>
        <h1 id="gameName">Adversarial Shortest Path</h1>
        <h3 id="groupName">By Team Jeopardy</h3>
        <div class="jumbotron">
        <h3>Instruction:</h3>
        <p>- Player's current position is displayed as 'Green' and destination as 'Yellow'.</p>
        <p>- In each turn Player can move to any connecting node, represented by 'Red'.</p>
        <p>- Player's goal is to reach destination by travelling minimum cost path.</p>
        <p>- In each turn Adversary can double the cost of any edge.</p>
        <p>- Hover over an edge to display its current cost.</p>
        <p>In each game you play two roles, first as 'player' then as 'adversary'. Whoever uses smaller cost path from source to destination is the winner.</p>
        </div>
        <h3>Play game in pop up window:<h3>
        <form id="gameSettings" class="well"></form>
        <h4>Screenshot:</h4>
        <img src="games/SAP-Ecco/screenshot.png" width="100%" heigth="100%"></img>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    var description = "Player's current position is displayed as 'Green' and destination as 'Yellow'. In each turn Player can move to any connecting node, represented by 'Red'. Player's goal is to reach destination by travelling minimum cost path.</br>In each turn Adversary can double the cost of any edge.</br>Hover over an edge to display its current cost.";
    newWindowBtn(2000,2000,"games/SAP-Ecco/index_.html", []);
</script>
</body>
</html>
