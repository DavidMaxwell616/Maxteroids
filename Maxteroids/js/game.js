    var game = new Phaser.Game(800,600,
      Phaser.AUTO, 'phaser-example', 
    {preload: preload, create: create, update: update });     
 
        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#000000';

            cursors = game.input.keyboard.createCursorKeys();
        }
        function updateText(size) {

            introText.setText("- You have clicked -\n" + count + " times !");

        }

        function update() {

            if (!gameStart)
            {
            var introText = game.add.text(game.width/2, game.height/2, "MAXTEROIDS", {
                font: "1px Arial",
                fill: "#ff0044",
                align: "center"
            });

                
            for (var i = 1; i < 62; i++) {
                if (i < 62) {
                    introText.fontSize = i;
                    //lblTitle.ForeColor = i * 4; // QBColor(Int(Rnd * 15) + 1)
                }
                /*
                var introText2 = "Rotate Right - Right Arrow \n" +
                    "Rotate Left - Left Arrow \n" +
                    "Thrust - Up Arrow \n" +
                    "Activate Shield - Down Arrow \n" +
                    "Fire - Space Bar \n" +
                    "Press Any Key to Start";
                game.add.text(game.width / 2, game.height *.75, introText2, {
                    font: "32px Arial",
                    fill: "#ff0044",
                    align: "center"
                });
                */

                }
            }
            else
            {
                // game.physics.arcade.collide(sprite, layer);

                //sprite.body.velocity.x = 0;
                //sprite.body.velocity.y = 0;
                //sprite.body.angularVelocity = 0;

                if (cursors.left.isDown) {
                    sprite.body.velocity.x = -1;
                } else if (cursors.right.isDown) {
                    sprite.body.velocity.x = 1;
                } else if (cursors.up.isDown) {
                    sprite.body.velocity.y = -1;
                } else if (cursors.down.isDown) {
                    sprite.body.velocity.y = 1;
                }
            }
        }

        function InitializeEnemy() {
            var i, randomx;
            for (i = 1; i <= NumEnemy; i++) {
                if (Enemy[i].Active == false) {
                    Enemy[i].cy = Int(Math.Rnd * game.height);
                    Enemy[i].Size = 600 - (i * 50);
                    if (Conversion.Int(Math.Rnd * 5) - 2 < 0)
                        Enemy[i].cx = game.width;
                    else
                        Enemy[i].cx = 0;
                    if (Enemy[i].cx == 0)
                        Enemy[i].xv = 15;
                    else
                        Enemy[i].xv = -15;
                    Enemy[i].yv = randomExcluded(-15, 15, 0);
                }
            }

            Enemy[i].Color = randomExcluded(1, 15, 0);;
            for (i = 1; i <= 100; i++)
                EnemyBullet[i].Active = false;
        }

        function InitializeRocks() {
            var i, j, randomx, randomy;
            for (i = 1; i <= MaxRocks; i++) {

                randomx = randomExcluded(-20, 20, 0);;
                randomy = randomExcluded(-20, 20, 0);;
                Rocks[i].xv = randomx;
                Rocks[i].yv = randomy;
                Rocks[i].Size = BigRock;
                var chooser = randomExcluded(1, 4, 0);
                switch (chooser) {
                case 1:
                {
                    Rocks[i].x = 0; // Int(Rnd * game.width)
                    Rocks[i].Y = Int(Math.Rnd * game.height);
                    break;
                }

                case 2:
                {
                    Rocks[i].x = game.width;
                    Rocks[i].Y = Int(Math.Rnd * game.height);
                    break;
                }

                case 3:
                {
                    Rocks[i].x = Int(Math.Rnd * game.width);
                    Rocks[i].Y = 0; // Int(Rnd * game.height)
                    break;
                }

                case 4:
                {
                    Rocks[i].x = Int(Math.Rnd * game.width);
                    Rocks[i].Y = game.height;
                    break;
                }
                }

                for (j = 1; j <= 12; j++) {
                    Rocks[i].PointXDist[j] = BigRock; // (Int(Rnd * (Rocks[i].size)))
                    Rocks[i].PointYDist[j] = BigRock; // (Int(Rnd * (Rocks[i].size)))
                    Rocks[i].PointX[j] = (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(j * 30))) * Rocks[i].Size);
                    Rocks[i].PointY[j] = (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(j * 30))) * Rocks[i].Size);

                    if (i <= NumRocks)
                        Rocks[i].Active = true;
                    else
                        Rocks[i].Active = false;
                }
            }
        }

        function randomExcluded(min, max, excluded) {
            var n = Math.floor(Math.random() * (max - min) + min);
            if (n >= excluded) n++;
            return n;
        }

        function initializeShip() {
            MainShip.cx = game.width / 2;
            MainShip.cy = game.height / 2;
            Direction = 0;
            MainShip.Active = true;
            da = 0;
            db = 0;
            MainShip.Forward = false;
            MainShip.ShieldStrength = 200;
        }

        function drawShip() {
            var i, randomx, randomy;
            Picture1.ForeColor = Information.RGB(255, 255, 255);
            if (ShipExplode.exploding & !ShipExplode.explodeSwitch) {
                ShipExplode.explodeSwitch = true;
                for (i = 1; i <= NumParticles; i++) {
                    ShipParticle[i].xspeed = randomExcluded(-40, 40, 0);;
                    ShipParticle[i].yspeed = randomExcluded(-40, 40, 0);;
                    ShipParticle[i].x = MainShip.cx;
                    ShipParticle[i].Y = MainShip.cy;
                    ShipParticle[i].Size = 2 + randomExcluded(1, 11, 0);;
                    ShipParticle[i].Color = randomExcluded(1, 255, 0);
                }

                if (!(DebugMode))
                    ShipsLeft = ShipsLeft - 1;
                for (i = 1; i <= 4; i++) {
                    ShipExplode.BlowCenterX[i] = MainShip.cx;
                    ShipExplode.BlowCenterY[i] = MainShip.cy;
                    ShipExplode.BlowVelocityX[i] = randomExcluded(-10, 10, 0);;
                    ShipExplode.BlowVelocityY[i] = randomExcluded(-10, 10, 0);;
                    ShipExplode.BlowX[i] = MainShip.x[i];
                    ShipExplode.BlowY[i] = MainShip.Y[i];
                    ShipExplode.BlowX[i + 4] = MainShip.x[i];
                    ShipExplode.BlowY[i + 4] = MainShip.Y[i];
                }
            }

            if (ShipExplode.exploding)
                blowupShip();

            // body of ship
            MainShip.x[1] = (MainShip.cx + (Math.sin(Direction)) * 300);
            MainShip.Y[1] = (MainShip.cy + (Math.cos(Direction)) * 300);
            MainShip.x[2] = (MainShip.cx + (Math.sin(Direction + Degrees(150))) * 360);
            MainShip.Y[2] = (MainShip.cy + (Math.cos(Direction + Degrees(150))) * 360);
            MainShip.x[3] = (MainShip.cx + (Math.sin(Direction + Degrees(180))) * 210);
            MainShip.Y[3] = (MainShip.cy + (Math.cos(Direction + Degrees(180))) * 210);
            MainShip.x[4] = (MainShip.cx + (Math.sin(Direction + Degrees(210))) * 360);
            MainShip.Y[4] = (MainShip.cy + (Math.cos(Direction + Degrees(210))) * 360);
            // thruster
            MainShip.x[5] = (MainShip.cx + (Math.sin(Direction + Degrees(160))) * 330);
            MainShip.Y[5] = (MainShip.cy + (Math.cos(Direction + Degrees(160))) * 330);
            MainShip.x[6] = (MainShip.cx + (Math.sin(Direction + Degrees(180))) * 440);
            MainShip.Y[6] = (MainShip.cy + (Math.cos(Direction + Degrees(180))) * 440);
            MainShip.x[7] = (MainShip.cx + (Math.sin(Direction + Degrees(200))) * 330);
            MainShip.Y[7] = (MainShip.cy + (Math.cos(Direction + Degrees(200))) * 330);

            Picture1.Line(MainShip.x[1], MainShip.Y[1]) - (MainShip.x[2], MainShip.Y[2]);
            Picture1.Line - (MainShip.x[3], MainShip.Y[3]);
            Picture1.Line - (MainShip.x[4], MainShip.Y[4]);
            Picture1.Line - (MainShip.x[1], MainShip.Y[1]);

            // Shields
            if (MainShip.Shields & MainShip.ShieldStrength > 0) {
                Picture1.ForeColor = RGB(MainShip.ShieldStrength, MainShip.ShieldStrength, MainShip.ShieldStrength);
                MainShip.ShieldStrength = MainShip.ShieldStrength - 1;
                Picture1.Circle(MainShip.cx,
                    MainShip.cy); 
            }


            if (360 - UnDegrees(Direction) > 50)
                BaseStart = Direction + Degrees(50);
            else
                BaseStart = Direction + Degrees(50) - Degrees(360);

            if (360 - UnDegrees(Direction) > 130)
                BaseEnd = Direction + Degrees(130);
            else
                BaseEnd = Direction + Degrees(130) - Degrees(360);

            if (MainShip.Forward == true) {
                Picture1.ForeColor = Information.RGB(255, 0, 0);

                Picture1.Line(MainShip.x(5), MainShip.Y(5)) - (MainShip.x(6), MainShip.Y(6))
                Picture1.Line - (MainShip.x(7), MainShip.Y(7))

            }

            MainShip.OldCX = MainShip.cx;
            MainShip.OldCY = MainShip.cy;
            return;
        }

        function blowupShip() {
            MainShip.Active = false;
            //Picture1.ForeColor = Information.RGB(255, 0, 0);

            for (i = 1; i <= NumParticles; i++) {
                Picture1.Circle(ShipParticle[i].x,
                    ShipParticle[i]
                    .Y);
                ShipParticle(i).x = ShipParticle[i].x + ShipParticle[i].xspeed;
                ShipParticle(i).Y = ShipParticle[i].Y + ShipParticle[i].yspeed;
            }

            ShipExplode.BlowX[1] = (ShipExplode.BlowCenterX[1] + (Math.sin(ShipExplode.BlowDirection)) * 300);
            ShipExplode.BlowY[1] = (ShipExplode.BlowCenterY[1] + (Math.cos(ShipExplode.BlowDirection)) * 300);
            ShipExplode.BlowX[2] =
                (ShipExplode.BlowCenterX[1] + (Math.sin(ShipExplode.BlowDirection + Degrees(150))) * 360);
            ShipExplode.BlowY[2] =
                (ShipExplode.BlowCenterY[1] + (Math.cos(ShipExplode.BlowDirection + Degrees(150))) * 360);

            ShipExplode.BlowX[6] =
                (ShipExplode.BlowCenterX[2] + (Math.sin(ShipExplode.BlowDirection + Degrees(150))) * 360);
            ShipExplode.BlowY[6] =
                (ShipExplode.BlowCenterY[2] + (Math.cos(ShipExplode.BlowDirection + Degrees(150))) * 360);
            ShipExplode.BlowX[7] =
                (ShipExplode.BlowCenterX[2] + (Math.sin(ShipExplode.BlowDirection + Degrees(180))) * 210);
            ShipExplode.BlowY[7] =
                (ShipExplode.BlowCenterY[2] + (Math.cos(ShipExplode.BlowDirection + Degrees(180))) * 210);

            ShipExplode.BlowX[3] =
                (ShipExplode.BlowCenterX[3] + (Math.sin(ShipExplode.BlowDirection + Degrees(180))) * 210);
            ShipExplode.BlowY[3] =
                (ShipExplode.BlowCenterY[3] + (Math.cos(ShipExplode.BlowDirection + Degrees(180))) * 210);
            ShipExplode.BlowX[4] =
                (ShipExplode.BlowCenterX[3] + (Math.sin(ShipExplode.BlowDirection + Degrees(210))) * 360);
            ShipExplode.BlowY[4] =
                (ShipExplode.BlowCenterY[3] + (Math.cos(ShipExplode.BlowDirection + Degrees(210))) * 360);

            ShipExplode.BlowX[8] =
                (ShipExplode.BlowCenterX[4] + (Math.sin(ShipExplode.BlowDirection + Degrees(210))) * 360);
            ShipExplode.BlowY[8] =
                (ShipExplode.BlowCenterY[4] + (Math.cos(ShipExplode.BlowDirection + Degrees(210))) * 360);
            ShipExplode.BlowX[5] = (ShipExplode.BlowCenterX[4] + (Math.sin(ShipExplode.BlowDirection)) * 300);
            ShipExplode.BlowY[5] = (ShipExplode.BlowCenterY[4] + (Math.cos(ShipExplode.BlowDirection)) * 300);

            //Picture1.ForeColor = Information.RGB(255, 255, 255);
            //Picture1.Line(ShipExplode.BlowX(1),
            //    ShipExplode.BlowY(
            //        1)); 
            //Picture1.Line(ShipExplode.BlowX(6),
            //    ShipExplode.BlowY(
            //        6)); 
            //Picture1.Line(ShipExplode.BlowX(3),
            //    ShipExplode.BlowY(
            //        3)); 
            //Picture1.Line(ShipExplode.BlowX(8),
            //    ShipExplode.BlowY(
            //        8)); 
            for (i = 1; i <= 4; i++) {
                ShipExplode.BlowCenterX[i] = ShipExplode.BlowCenterX[i] + ShipExplode.BlowVelocityX[i];
                ShipExplode.BlowCenterY[i] = ShipExplode.BlowCenterY[i] + ShipExplode.BlowVelocityY[i];
            }

            ShipExplode.BlowDirection = ShipExplode.BlowDirection + Degrees(5);
            if (ShipExplode.BlowDirection == Degrees(360))
                ShipExplode.BlowDirection = Degrees(0);

            if (360 - UnDegrees(ShipExplode.BlowDirection) > 50)
                BaseStart = ShipExplode.BlowDirection + Degrees(50);
            else
                BaseStart = ShipExplode.BlowDirection + Degrees(50) - Degrees(360);

            if (360 - UnDegrees(ShipExplode.BlowDirection) > 130)
                BaseEnd = ShipExplode.BlowDirection + Degrees(130);
            else
                BaseEnd = ShipExplode.BlowDirection + Degrees(130) - Degrees(360);

            // OldCX = cx
            // OldCY = cy
            ShipExplode.ExplodeCount = ShipExplode.ExplodeCount + 1;
            if (ShipExplode.ExplodeCount > ShipExplodeCount) {
                ShipExplode.exploding = false;
                ShipExplode.ExplodeCount = 0;
                ShipExplode.explodeSwitch = false;
                initializeShip();
                if (ShipsLeft == 0)
                    System.Environment.Exit(0);
            }
        }

        function DrawEnemyBullets() {
            for (i = 1; i <= 100; i++) {
                if (EnemyBullet(i).Active == true) {

                    // activate heatseakers (level 8 and above)
                    if (EnemyBullet[i].type == 2) {
                        if (MainShip.cx > EnemyBullet[i].bulletx)
                            EnemyBullet[i].bulletxv = EnemyBullet[i].bulletxv + 1;
                        if (MainShip.cx < EnemyBullet[i].bulletx)
                            EnemyBullet[i].bulletxv = EnemyBullet[i].bulletxv - 1;
                        if (MainShip.cy > EnemyBullet[i].bullety)
                            EnemyBullet[i].bulletyv = EnemyBullet[i].bulletyv + 1;
                        if (MainShip.cy > EnemyBullet[i].bullety)
                            EnemyBullet[i].bulletyv = EnemyBullet[i].bulletyv - 1;
                    }

                    EnemyBullet[i].Pulse = EnemyBullet[i].Pulse + 1;
                    if (EnemyBullet[i].Pulse > 50)
                        EnemyBullet[i].Pulse = 1;
                    Picture1.Circle(EnemyBullet[i].bulletx,
                        EnemyBullet[i]
                        .bullety); /* TODO ERROR: Skipped SkippedTokensTrivia */ /* TODO ERROR: Skipped SkippedTokensTrivia */
                    EnemyBullet[i].bulletx = EnemyBullet[i].bulletx + EnemyBullet[i].bulletxv;
                    EnemyBullet[i].bullety = EnemyBullet[i].bullety + EnemyBullet[i].bulletyv;
                    EnemyBullet[i].Counter = EnemyBullet[i].Counter + 1;

                    if (EnemyBullet[i].bulletx < 0)
                        EnemyBullet[i].bulletx = game.width;
                    if (EnemyBullet[i].bulletx > game.width)
                        EnemyBullet[i].bulletx = 0;
                    if (EnemyBullet[i].bullety < 0)
                        EnemyBullet[i].bullety = game.height;
                    if (EnemyBullet[i].bullety > game.height)
                        EnemyBullet[i].bullety = 0;

                    if ((EnemyBullet[i].bulletx > MainShip.cx - MainShip.Size) &
                        (EnemyBullet[i].bulletx < MainShip.cx + MainShip.Size) &
                        (EnemyBullet[i].bullety > MainShip.cy - MainShip.Size) &
                        (EnemyBullet[i].bullety < MainShip.cy + MainShip.Size) &
                        MainShip.Shields == false) {
                        ShipExplode.exploding = true;
                        EnemyBullet[i].Counter = 200;
                    }

                    if (EnemyBullet[i].Counter > 200) {
                        EnemyBullet[i].Active = false;
                        EnemyBullet[i].Counter = 0;
                    }
                }
            }
        }

        function DrawEnemy() {
            var i, j;

            for (i = 1; i <= NumEnemy; i++) {
                if (Enemy[i].Active) {
                    //Picture1.ForeColor = QBColor(Enemy[i].Color);
                    Enemy[i].Size = 600 - (i * 50);
                    /*
                    Picture1.Line(Enemy(i).cx - (Enemy(i).Size / 2), Enemy(i).cy) -
                        (Enemy(i).cx + (Enemy(i).Size / 2), Enemy(i).cy);
                    Picture1.Line -
                        (Enemy(i).cx + (Enemy(i).Size * 0.25), (Enemy(i).cy - Enemy(i).Size * 0.25));
                    Picture1.Line -
                        (Enemy(i).cx - (Enemy(i).Size * 0.25), (Enemy(i).cy - Enemy(i).Size * 0.25));
                    Picture1.Line - (Enemy(i).cx - (Enemy(i).Size / 2), Enemy(i).cy);
                    Picture1.Line -
                        (Enemy(i).cx - (Enemy(i).Size * 0.25), (Enemy(i).cy + Enemy(i).Size * 0.25));
                    Picture1.Line -
                        (Enemy(i).cx + (Enemy(i).Size * 0.25), (Enemy(i).cy + Enemy(i).Size * 0.25));
                    Picture1.Line - (Enemy(i).cx + (Enemy(i).Size / 2), Enemy(i).cy);
                    */
                    Enemy[i].cx += Enemy[i].xv;
                    Enemy[i].cy += Enemy[i].yv;
                    Enemy[i].cx += Enemy[i].xv;
                    Enemy[i].cy += Enemy[i].yv;

                    // sometimes an enemy gets stuck in the corner
                    if (Enemy[i].cx == 0 & Enemy[i].cy == 0) {
                        Enemy[i].xv = -15;
                        Enemy[i].yv = -15;
                    }

                    // velocity check
                    if (Abs(Enemy[i].xv) > 15)
                        Enemy[i].xv = 15;
                    if (Abs(Enemy[i].yv) > 15)
                        Enemy[i].yv = 15;


                    if (Enemy[i].cx < 0) {
                        Enemy[i].Active = false;
                        Enemy[i].cx = game.width;
                    }

                    if (Enemy[i].cx > game.width) {
                        Enemy[i].Active = false;
                        Enemy[i].cx = 0;
                    }

                    // verticle screenwrap
                    if (Enemy[i].cy < 0)
                        Enemy[i].cy = game.height;
                    if (Enemy[i].cy > game.height)
                        Enemy[i].cy = 0;

                    // change direction
                    if (i != 10) {
                        if (randomExcluded(1, 1000, 0) == 800) {
                            Enemy[i].xv = randomExcluded(-20, 20, 0);
                            Enemy[i].yv = randomExcluded(-20, 20, 0);
                        }
                    }


                    if (randomExcluded(1, 1000, 0) == 1) {
                        if (bulletup > 99)
                            bulletup = 1;
                        bulletup = bulletup + 1;
                        if (EnemyBullet(bulletup).Active == false) {
                            EnemyBullet(bulletup).Active = true;
                            EnemyBullet(bulletup).bulletx = Enemy[i].cx;
                            EnemyBullet(bulletup).bullety = Enemy[i].cy;
                            // give missile direction
                            if (i < 8)
                                EnemyBullet(bulletup).type = 1;
                            else
                                EnemyBullet(bulletup).type = 2;

                            if (MainShip.cx < Enemy[i].cx)
                                EnemyBullet(bulletup).bulletxv = -15;
                            if (MainShip.cx > Enemy[i].cx)
                                EnemyBullet(bulletup).bulletxv = 15;
                            if (MainShip.cy < Enemy[i].cy)
                                EnemyBullet(bulletup).bulletyv = -15;
                            if (MainShip.cy > Enemy[i].cy)
                                EnemyBullet(bulletup).bulletyv = 15;
                        }
                    }

                    // activate kamikazees
                    if (i == 10) {
                        if (MainShip.cx > Enemy[i].cx)
                            Enemy[i].xv ++;
                        if (MainShip.cx < Enemy[i].cx)
                            Enemy[i].xv --;
                        if (MainShip.cy > Enemy[i].cy)
                            Enemy[i].yv ++;
                        if (MainShip.cy > Enemy[i].cy)
                            Enemy[i].yv --;
                    }

                    // ship collision
                    if (((Enemy[i].cx + (Enemy[i].Size / 2) > MainShip.cx - MainShip.Size) &
                        (Enemy[i].cx - (Enemy[i].Size / 2) < MainShip.cx + MainShip.Size) &
                        (Enemy[i].cy - (Enemy[i].Size / 2) > MainShip.cy - MainShip.Size) &
                        (Enemy[i].cy + (Enemy[i].Size / 2) < MainShip.cy + MainShip.Size) &
                        MainShip.Shields)) {
                        ShipExplode.exploding = true;
                        Enemy[i].exploding = true;
                    }
                }
            }
        }

        function DrawRocks() {
            var i, j;
            for (i = 1; i <= NumRocks; i++) {
                //Picture1.ForeColor = Information.RGB(255, 255, 255);
                if (Rocks[i].Active) {
                    for (j = 1; j <= 12; j++) {
                        Rocks[i].PointX[1] =
                            (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(45))) * (Rocks[i].Size)); // * 0.75))
                        Rocks[i].PointY[1] =
                            (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(45))) * (Rocks[i].Size)); // * 0.75))
                        Rocks[i].PointX[2] = (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(90))) * Rocks[i].Size);
                        Rocks[i].PointY[2] = (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(90))) * Rocks[i].Size);
                        Rocks[i].PointX[3] =
                            (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(170))) * (Rocks[i].Size)); // * 0.55))
                        Rocks[i].PointY[3] =
                            (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(170))) * (Rocks[i].Size)); // * 0.55))
                        Rocks[i].PointX[4] =
                            (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(180))) * (Rocks[i].Size)); // * 0.55))
                        Rocks[i].PointY[4] =
                            (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(180))) * (Rocks[i].Size)); // * 0.55))
                        Rocks[i].PointX[5] = (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(200))) * Rocks[i].Size);
                        Rocks[i].PointY[5] = (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(200))) * Rocks[i].Size);
                        Rocks[i].PointX[6] = (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(270))) * Rocks[i].Size);
                        Rocks[i].PointY[6] = (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(270))) * Rocks[i].Size);
                        Rocks[i].PointX[7] = (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(300))) * Rocks[i].Size);
                        Rocks[i].PointY[7] = (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(300))) * Rocks[i].Size);
                        // Rocks[i].PointX(j) = (Rocks[i].x + (Math.sin(Rocks[i].Rotate + Degrees(j * 30))) * Rocks[i].size)
                        // Rocks[i].PointY(j) = (Rocks[i].Y + (Math.cos(Rocks[i].Rotate + Degrees(j * 30))) * Rocks[i].size)
                        if (j < 7)
                            Picture1.Line(Rocks[i].PointX(j),
                                Rocks[i].PointY(
                                    j)); 
                    }

                    Picture1.Line(Rocks[i].PointX[7],
                        Rocks[i].PointY(
                            7)); 
                }

                Rocks[i].x += Rocks[i].xv;
                Rocks[i].Y += Rocks[i].yv;


                // collision check
                if (Rocks[i].Active &
                    ((MainShip.cx > Rocks[i].x - Rocks[i].Size) &
                        (MainShip.cx < Rocks[i].x + Rocks[i].Size) &
                        (MainShip.cy > Rocks[i].Y - Rocks[i].Size) &
                        (MainShip.cy < Rocks[i].Y + Rocks[i].Size)) &
                    (MainShip.Shields == false | MainShip.ShieldStrength == 0))
                    ShipExplode.exploding = true;

                for (j = 1; j <= NumEnemy; j++) {
                    if (Rocks[i].Active &
                        Enemy(j).Active &
                        ((Enemy(j).cx + (Enemy(j).Size / 2) > Rocks[i].x - Rocks[i].Size) &
                            (Enemy(j).cx + (Enemy(j).Size / 2) < Rocks[i].x + Rocks[i].Size) &
                            (Enemy(j).cy - (Enemy(j).Size / 2) < Rocks[i].Y + Rocks[i].Size) &
                            (Enemy(j).cy + (Enemy(j).Size / 2) > Rocks[i].Y + Rocks[i].Size)))
                        Enemy(j).exploding = true;
                }


                // wrap rocks
                if (Rocks[i].x < 0)
                    Rocks[i].x = game.width;
                if (Rocks[i].x > game.width)
                    Rocks[i].x = 0;
                if (Rocks[i].Y < 0)
                    Rocks[i].Y = game.height;
                if (Rocks[i].Y > game.height)
                    Rocks[i].Y = 0;
                Rocks[i].Rotate = Rocks[i].Rotate + 0.01;


                if (360 - UnDegrees(Rocks[i].Rotate) > 50)
                    BaseStart = Rocks[i].Rotate + Degrees(50);
                else
                    BaseStart = Rocks[i].Rotate + Degrees(50) - Degrees(360);

                if (360 - UnDegrees(Rocks[i].Rotate) > 130)
                    BaseEnd = Rocks[i].Rotate + Degrees(130);
                else
                    BaseEnd = Rocks[i].Rotate + Degrees(130) - Degrees(360);

                if (RockExplode(1).exploding)
                    RockExplosion(Rocks[i].x, Rocks[i].Y);
            }
        }

        function Reset() {
          Startup = true;
          Pie = 3.14159265358979;
          Radians = (2 * Pie) / 360;
          Direction = Degrees(180);
          MainShip.Speed = 1;
          ShipsLeft = 5;
          RockNumStart = 4;
          Level = 1;
          NumEnemy = 1;
          //ReDim MainShip.x(20)
          //ReDim MainShip.Y(20)
          //ReDim ShipExplode.BlowX(20)
          //ReDim ShipExplode.BlowY(20)
          ReallyFiring = true;
          MainShip.ShieldStrength = 255;
          MainShip.cx = game.width / 2;
          MainShip.cy = game.height / 2;
          MainShip.Active = true;
          Enemy[1].Active = false;
          Enemy[1].Color = Conversion.Int(Math.Rnd * 15) + 1;
          MainShip.Size = 300;
          da = 0;
          db = 0;
          MainShip.Forward = false;
        }

        function Reset() {
            MainShip.Active = true;
            NumRocks = RockNumStart;
            if (Level < 10)
                NumEnemy = Level;
            RocksLeft = NumRocks;
            InitializeRocks();

            while (!1 == 2) {
                if (GetActiveWindow != Form1.hWnd)
                    RefreshWin = true;
                if (RefreshWin == true) {
                    if (GetActiveWindow == Form1.hWnd) {
                        RefreshWin = false;
                        DoEvents();
                        Picture1.Refresh();
                        Picture1.SetFocus();
                        DoEvents();
                    }
                }

                MainShip.cx = MainShip.cx + da;
                MainShip.cy = MainShip.cy + db;
                CheckWrap();
                DrawShip();
                DrawRocks();
                DrawEnemyBullets();
                for (i = 1; i <= NumEnemy; i++) {
                    if (Conversion.Int(Math.Rnd * 1000) <= i & Enemy[i].Active == false & Enemy[i].exploding == false)
                        Enemy[i].Active = true;
                    if (Enemy[i].exploding)
                        EnemyExplosion(Enemy[i].cx, Enemy[i].cy);
                    if (Enemy[i].Active)
                        DrawEnemy();
                }

                lblScore.Caption = "Score = " + Score;
                lblShips.Caption = "Ships = " + ShipsLeft;
                lblLevel.Caption = "Level = " + Level;
                if (RocksLeft == 0) {
                    RockNumStart = RockNumStart + 1;
                    Level = Level + 1;
                    Reset();
                }

                if (!exploding) {
                    if (TurnLeft == true)
                        Direction = Direction + Degrees(5);
                    if (TurnRight == true)
                        Direction = Direction - Degrees(5);

                    if (Direction == Degrees(360))
                        Direction = Degrees(0);
                    if (Direction < Degrees(0))
                        Direction = Degrees(355);

                    if (MainShip.Forward == true) {
                        da += ((Math.sin(Direction)) * MainShip.Speed);
                        db += ((Math.cos(Direction)) * MainShip.Speed);
                    }

                    if (Firing == true & ReallyFiring == true & Shields == false) {
                        var TempBullet;
                        // First Bullet
                        TempBullet = FindFreeBullet;
                        BulletsLoose = BulletsLoose + 1;
                        Projectile[TempBullet].bulletx = MainShip.x[1];
                        Projectile[TempBullet].bullety = MainShip.Y[1];
                        Projectile[TempBullet].Active = true;
                        Projectile[TempBullet].BulletDirection = Direction;

                        ReallyFiring = false;
                    }

                }
                if (BulletsLoose > 0)
                    UpdateBullets();

                DoEvents();
                Sleep(10);
                Picture1.Cls();
            }

        }

        function Picture1_KeyDown(KeyCode, Shift) {
            if (MainShip.Active) {
                if (KeyCode == vbKeyLeft)
                    TurnLeft = true;
                if (KeyCode == vbKeyRight)
                    TurnRight = true;
                if (KeyCode == vbKeyUp)
                    MainShip.Forward = true;
                if (KeyCode == vbKeySpace)
                    Firing = true;
                if (KeyCode == vbKeyDown)
                    MainShip.Shields = true;
            }
            if (KeyCode == vbKeyEscape)
                System.Environment.Exit(0);
        }

        function Picture1_KeyUp(KeyCode, Shift) {
            if (MainShip.Active == false)
                return;
            if (KeyCode == vbKeyLeft)
                TurnLeft = false;
            if (KeyCode == vbKeyRight)
                TurnRight = false;
            if (KeyCode == vbKeyUp)
                MainShip.Forward = false;
            if (KeyCode == vbKeySpace) {
                ReallyFiring = true;
                Firing = false;
            }

            if (KeyCode == vbKeyDown)
                MainShip.Shields = false;
        }

        function CheckWrap() {
            if (MainShip.cy > game.height)
                MainShip.cy = 0;
            if (MainShip.cy < 0)
                MainShip.cy = game.height;
            if (MainShip.cx > game.width)
                MainShip.cx = 0;
            if (MainShip.cx < 0)
                MainShip.cx = game.width;
        }

        function Degrees(Number) {
            Degrees = (Number * Radians);
        }

        function UnDegrees(Number) {
            UnDegrees = (Number / Radians);
        }

        function UpdateBullets() {
            var i, j, randomx, randomy;
            for (i = 1; i <= Projectile.length; i++) {
                if (Projectile[i].Active == true) {
                    if (Projectile[i].bulletx > game.width)
                        Projectile[i].bulletx = 0;
                    if (Projectile[i].bulletx < 0)
                        Projectile[i].bulletx = game.width;
                    if (Projectile[i].bullety > game.height)
                        Projectile[i].bullety = 0;
                    if (Projectile[i].bullety < 0)
                        Projectile[i].bullety = game.height;
                    Projectile[i].bulletx = Projectile[i].bulletx + ((Math.sin(Projectile(i).BulletDirection)) * 50);
                    Projectile[i].bullety = Projectile[i].bullety + ((Math.cos(Projectile(i).BulletDirection)) * 50);
                    Picture1.ForeColor = Information.RGB(255, 255, 255);
                    Picture1.Line(Projectile[i].bulletx,
                        Projectile[i]
                        .bullety); /* TODO ERROR: Skipped SkippedTokensTrivia */ /* TODO ERROR: Skipped SkippedTokensTrivia */
                    Projectile[i].Counter = Projectile(i).Counter + 1;
                    if (Projectile[i].Counter > 80) {
                        Projectile[i].Active = false;
                        BulletsLoose = BulletsLoose - 1;
                        Projectile[i].Counter = 0;
                        Debug.Print(BulletsLoose);
                    }
                }

                for (j = 1; j <= NumEnemy; j++) {
                    if (Projectile[i].Active &
                        Enemy[j].Active &
                        ((Projectile[i].bulletx > Enemy[j].cx - Enemy[j].Size) &
                            (Projectile[i].bulletx < Enemy[j].cx + Enemy[j].Size) &
                            (Projectile[i].bullety > Enemy[j].cy - Enemy[j].Size) &
                            (Projectile[i].bullety < Enemy[j].cy + Enemy[j].Size))) {
                        Enemy[j].exploding = true;
                        Projectile[i].Active = false;
                    }
                }
                // bullet/asteroid collision check
                for (j = 1; j <= NumRocks; j++) {
                    if (Projectile[i].Active &
                        Rocks[j].Active &
                        ((Projectile[i].bulletx > Rocks[j].x - Rocks[j].Size) &
                            (Projectile[i].bulletx < Rocks[j].x + Rocks[j].Size) &
                            (Projectile[i].bullety > Rocks[j].Y - Rocks[j].Size) &
                            (Projectile[i].bullety < Rocks[j].Y + Rocks[j].Size))) {
                        Projectile[i].Active = false;
                        RockExplode[1].explodeSwitch = true;
                        RockExplode[1].exploding = true;
                        RockExplosion(Rocks[j].x, Rocks[j].Y);
                        if (Rocks[j].Size == SmallRock) {
                            Rocks[j].Active = false;
                            Score = Score + 1000;
                            RocksLeft = RocksLeft - 1;
                            return;
                        }

                        NumRocks = NumRocks + 1;
                        RocksLeft = RocksLeft + 1;
                        Rocks[NumRocks].Active = true;
                        Rocks[NumRocks].x = Rocks[j].x;
                        Rocks[NumRocks].Y = Rocks[j].Y;
                        Rocks[NumRocks].Size = SmallRock;

                        randomx = randomExcluded(-20, 20, 0);
                        randomy = randomExcluded(-20, 20, 0);

                        Rocks[NumRocks].xv = randomx;
                        Rocks[NumRocks].yv = randomy;
                        if (Rocks[j].Size == BigRock)
                            Rocks[j].Size = SmallRock;
                        Score = Score + 500;
                    }
                }
            }

        }

        function FindFreeBullet() {
            for (i = 1; i <= UBound(Projectile); i++) {
                if (Projectile(i).Active == false) {
                    FindFreeBullet = i;
                    return;
                }
            }
        }

        function RockExplosion(explode_x, explode_y) {
            var i;
            // rock explosion
            if ((RockExplode(1).exploding)) {
                if ((RockExplode(1).explodeSwitch)) {
                    for (i = 1; i <= NumParticles; i++) {
                        RockParticle[i].xspeed = randomExcluded(-10, 10, 0);
                        RockParticle[i].yspeed = randomExcluded(-10, 10, 0);
                        RockParticle[i].x = explode_x;
                        RockParticle[i].Y = explode_y;
                        RockParticle[i].Size = 2 + randomExcluded(1, 11, 0);;
                        RockExplode[1].explodeCount = 0;
                        RockExplode[1].explodeSwitch = false;
                    }
                }


                if (RockExplode[1].explodeCount < 100) {
                    RockExplode[1].explodeCount = RockExplode[1].explodeCount + 1;
                    for (i = 1; i <= NumParticles; i++) {
                        Picture1.Circle(RockParticle[i].x,
                            RockParticle[i]
                            .Y); /* TODO ERROR: Skipped SkippedTokensTrivia */ /* TODO ERROR: Skipped SkippedTokensTrivia */ // RockParticle(l).Color

                        RockParticle[i].x = RockParticle[i].x + RockParticle[i].xspeed;
                        RockParticle[i].Y = RockParticle[i].Y + RockParticle[i].yspeed;
                    }

                    if (RockExplode[1].explodeCount == 100) {
                        RockExplode[1].explodeCount = 0;
                        RockExplode[1].exploding = false;
                    }
                }
            }
        }

        function EnemyExplosion(explode_x, explode_y) {
            var i, j;
            // enemy explosion
            for (j = 1; j <= NumEnemy; j++) {
                if (Enemy[j].exploding == true) {
                    Enemy[j].Active = false;

                    if (!(Enemy[j].explodeSwitch)) {
                        for (i = 1; i <= NumParticles; i++) {
                            Enemy[j].ParticleXSpeed[i] = -40 + randomExcluded(1, 80, 0);
                            Enemy[j].ParticleYSpeed[i] = -40 + randomExcluded(1, 80, 0);;
                            Enemy[j].ParticleX[i] = explode_x;
                            Enemy[j].ParticleY[i] = explode_y;
                            Enemy[j].ParticleSize[i] = 2 + randomExcluded(1, 11, 0);;
                            Enemy[j].ParticleColor[i] = Enemy[j].Color;
                            Enemy[j].explodeCount = 0;
                            Enemy[j].explodeSwitch = true;
                        }
                    }

                    Enemy[j].explodeCount++;
                    for (i = 1; i <= NumParticles; i++) {
                        Picture1.Circle(Enemy[j].ParticleX[i],
                            Enemy[j]
                            .ParticleY[i]); /* TODO ERROR: Skipped SkippedTokensTrivia */ /* TODO ERROR: Skipped SkippedTokensTrivia */

                        Enemy[j].ParticleX[i] = Enemy[j].ParticleX[i] + Enemy[j].ParticleXSpeed[i];
                        Enemy[j].ParticleY[i] = Enemy[j].ParticleY[i] + Enemy[j].ParticleYSpeed[i];
                    }

                    // setup next enemy
                    if (Enemy[j].explodeCount > 99) {
                        Enemy[j].explodeCount = 0;
                        Enemy[j].exploding = false;
                        Enemy[j].explodeSwitch = false;
                        //Enemy[j].Color = randomExcluded(1, 15, 0);
                        Enemy[j].Size = 600 - (i * 50);

                        if (randomExcluded(-20, 20, 0) < 0) {
                            Enemy[j].cx = game.width;
                            Enemy[j].xv = -15;
                        } else {
                            Enemy[j].cx = 0;
                            Enemy[j].xv = 15;
                        }
                    }
                }
            }

        }


