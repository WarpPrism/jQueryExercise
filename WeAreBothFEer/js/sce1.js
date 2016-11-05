(function() {
    G = {};
    G.windowAW = window.screen.availWidth;
    G.windowAH = window.screen.availHeight;

    sce1 = {};
    sce1.init = initSce1;
    
    function initSce1() {
        sce1.can = $('#canvas1')[0];
        sce1.ctx = sce1.can.getContext('2d');
        sce1.can.width = G.windowAW;
        sce1.can.height = G.windowAH;

        sce1.cw = sce1.can.width;
        sce1.ch = sce1.can.height;
        sce1.skyPic = new Image();
        sce1.starPic = new Image();
        sce1.skyPic.src = 'imgs/sky.jpeg';
        sce1.starPic.src = 'imgs/star.png';
        // 星星数量 星星数组
        sce1.starNum = 50;
        sce1.stars = [];

        sce1.lastTime = Date.now();
        sce1.deltaTime = 0;

        generateStars();
        sce1Loop();
    }
    function sce1Loop() {
        var now = Date.now();
        sce1.deltaTime = now - sce1.lastTime;
        sce1.lastTime = now;

        window.requestAnimFrame(sce1Loop);
        drawSkyImg();
        drawStars();
    }
    function generateStars() {
        for (var i = 0; i < sce1.starNum; i++) {
            var a_star = new STAR();
            a_star.init();
            sce1.stars.push(a_star);
        }
    }
    function drawStars() {
        for (var i = 0; i < sce1.starNum; i++) {
            sce1.stars[i].draw();
            sce1.stars[i].update();
        }

    }
    function drawSkyImg() {
        sce1.ctx.drawImage(sce1.skyPic, 0, 0, sce1.cw, sce1.ch);
    }

    // define star class
    var STAR = function() {
        this.x;
        this.y;
        this.picNo;
        this.timer;
    }
    STAR.prototype.init = function() {
        this.x = (Math.random() * sce1.cw).toFixed(2);
        this.y = (Math.random() * sce1.ch * 0.8).toFixed(2);
        this.picNo = Math.floor(Math.random() * 7);
        this.timer = 0;
    }
    STAR.prototype.draw = function() {
        sce1.ctx.drawImage(sce1.starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
    }
    STAR.prototype.update = function() {
        this.timer += sce1.deltaTime;
        if (this.timer > 100) {
            this.picNo++;
            this.picNo %= 7;
            this.timer = 0;
        }
    }
})();