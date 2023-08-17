document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var game = new PixelJS.Engine();
        game.init({
            container: 'pixeljs',
            width: 800,
            height: 600
        });

        PixelJS.assetPath = '../assets';

        var backgroundLayer = game.createLayer('background');
        var grass = backgroundLayer.createEntity();
        backgroundLayer.static = true;
        grass.pos = { x: 0, y: 0 };
        grass.asset = new PixelJS.Tile();
        grass.asset.prepare({
            name: 'grass(1).jpg',
            size: {
                width: 800,
                height: 600
            }
        });

        var playerLayer = game.createLayer('players');
        var player = new PixelJS.Player();
        player.addToLayer(playerLayer);
        player.pos = { x: 200, y: 300 };
        player.size = { width: 100, height: 100 };
        player.velocity = { x: 150, y: 150 };
        player.asset = new PixelJS.AnimatedSprite();
        player.asset.prepare({
            name: 'char(1).png',
            frames: 3,
            rows: 4,
            speed: 100,
            defaultFrame: 1
        });

        var itemLayer = game.createLayer('items');
        var coin = itemLayer.createEntity();
        coin.pos = { x: 400, y: 150 };
        coin.size = { width: 12, height: 16 };
        coin.asset = new PixelJS.AnimatedSprite();
        coin.asset.prepare({
            name: 'coin.png',
            frames: 8,
            rows: 1,
            speed: 80,
            defaultFrame: 0
        });
        var bush = itemLayer.createEntity();
        bush.pos = { x: 450, y: 190 };
        bush.size = { width: 12, height: 16 };
        bush.asset = new PixelJS.Sprite();
        bush.asset.prepare({
            name: 'bush.png',
            height: 75,
            width: 75,
        });
        

        //var collectSound = game.createSound('collect');
        //collectSound.prepare({ name: 'coin.mp3' });

        player.onCollide = function (entity) {
            if (entity === coin) {
                //collectSound.play();
                coin.pos = {
                    x: Math.floor(Math.random() * (700 - 100 + 1) + 100),
                    y: Math.floor(Math.random() * (500 - 100 + 1) + 100)
                };
                

                score += 1;
                scoreLayer.redraw = true;
                scoreLayer.drawText(
                    'Coins: ' + score,
                    50,
                    50,
                    '14pt "Trebuchet MS", Helvetica, sans-serif',
                    '#FFFFFF',
                    'left'
                );
            }
        };

        playerLayer.registerCollidable(player);
        itemLayer.registerCollidable(coin);
        itemLayer.registerCollidable(bush);

        var score = 0;
        var scoreLayer = game.createLayer("score");
        scoreLayer.static = true;

        game.loadAndRun(function (elapsedTime, dt) {
        });
    }
}
