// 需求分析：
// 1.0 初始化
// 2.0 绘制蛇
// 3.0 绘制地图
// 4.0 初始化食物
// 5.0 创建食物

// 6.0 事件监听
// 7.0 蛇移动函数
// 8.0 蛇头和食物碰撞检测
// 9.0 重新绘制 更新地图 更新蛇 检测蛇和食物碰撞 复制蛇
// 10. 吃到食物 添加蛇身体
// 11. 判断是否结束游戏
// 12. 复制蛇数据 记录一份关于蛇的坐标，用于判断是否结束游戏

// 步骤：
// ES6 编码 类
// 1.0 声明父类
class Game {
    // .0 构造器
    constructor(space=30) {
        // .0 添加属性
        this.btnStart = document.getElementById("btnStart");
        this.btnPause = document.getElementById("btnPause");
        this.btnModel = document.getElementById("btnModel");
        this.textElement = document.getElementById("textElement");
        this.titleElement = document.getElementById("titleElement");
        this.canvas = document.getElementById("canvas");

        this.ctx = this.canvas.getContext("2d");
        this.width = 600;
        this.height = 600;
        this.space = space;
        this.row = this.height / this.space;
        this.col = this.width / this.space;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        //.0 记录蛇信息数组
        this.snakeArray = [
            { x: this.space * 0, y: 0, color: "blue" },
            { x: this.space * 1, y: 0, color: "blue" },
            { x: this.space * 2, y: 0, color: "red" }
        ]
        //.0记录食物的信息
        this.food = {
            x: 5 * this.space,
            y: 8 * this.space,
            color: "orange"
        }
        // .0 记录方向
        this.direction = "right";
        this.score = 0;
        this.timer = null;
        this.seconds = 1000 / 10;
        //  ....
    }
    // .0 添加方法
    init() {
        // .0 测试
        // this.drawLine(100,100,500,100);
        // this.drawRect(100,100,50,50);
        // this.drawText(100,100,"hello");
        // this.createFood();
    }
    // .0 绘制线
    drawLine(x0, y0, x1, y1, color = "#fff") {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    // .0 绘制矩形
    drawRect(x, y, w, h, color = "#00f") {
        // console.log(x,y,w,h)
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.fill();
        this.ctx.closePath();
    }
    // .0 绘制文本
    drawText(x, y, text, color = "#fff") {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.font = "20px 微软雅黑";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, x, y);
        this.ctx.closePath();
    }
    // .0 随机数
    random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    // .0 创建食物
    createFood() {
        // .0 设置随机的食物数据
        this.food = {
            x: this.random(0, this.col) * this.space,
            y: this.random(0, this.row) * this.space,
            color: "orange"
        }
        // .0 定义布尔值
        var isRepeat = false;

        // .0 循环
        for (var i = 0; i < this.snakeArray.length; i++) {
            if (this.food.x == this.snakeArray[i].x && this.food.y == this.snakeArray[i].y) {
                // .0  记录创建的食物在蛇的身体上
                isRepeat = true;
            }
        }
        console.log(this.food)
        // .0 判断
        if (isRepeat) {
            // .0 重新创建食物
            this.createFood();
        } else {
            // .0 绘制食物
            this.drawRect(
                this.food.x,
                this.food.y,
                this.space,
                this.space,
                this.food.color
            )
        }

    }
}
// 2.0 声明子类 (地图)
class Layout extends Game {
    // .0 构造器
    constructor() {
        // .0 超级类
        super();
    }
    // .0 绘制地图
    drawMap() {
        // .0 循环
        // 行
        for (var i = 0; i < this.row; i++) {
            // .0 绘制线
            this.drawLine(0, i * this.space, this.width, i * this.space);
        }
        // 列
        for (var j = 0; j < this.col; j++) {
            // .0 绘制线
            this.drawLine(j * this.space, 0, j * this.space, this.height);
        }
    }
}
// 3.0 声明子类 （蛇）
class Snake extends Game {
    // .0 构造器
    constructor() {
        super();
    }
    // .0 绘制蛇
    drawSnake() {
        // 蛇的数据
        // console.log(this.snakeArray)
        // .0 绘制蛇
        for (var i = 0; i < this.snakeArray.length; i++) {
            // .0 绘制矩形
            this.drawRect(
                this.snakeArray[i].x,
                this.snakeArray[i].y,
                this.space,
                this.space,
                this.snakeArray[i].color
            );
        }
    }
}
// 4.0 声明子类 （食物）
class Food extends Game {
    // 构造器
    constructor() {
        // 超级类
        super();
    }
    // 绘制食物的方法
    drawFood() {
        // console.log(this.food)
        this.drawRect(
            this.food.x,
            this.food.y,
            this.space,
            this.space,
            this.food.color
        )
    }
}


// 5.0 声明子类 （蛇移动的业务）
class SnakeMove extends Game {
    // .0 构造器
    constructor() {
        super();
    }
    // 0. 设置画布
    drawView(space=30) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // // .0 创建父类 Game   的实例
        let g = new Game(space)
        // .0 创建子类 Snake  的实例
        let s = new Snake();
        // .0 创建子类 Layout 的实例
        let l = new Layout();
        // .0 创建子类 Food 的实例
        var f = new Food();
        // .0 调用相关的方法
        l.drawMap();
        s.drawSnake();
        f.drawFood();
    }
    // .0 事件监听
    addKeyEvent() {
        // .0 设置一下延迟
        var delay = null;
        var isChange = true;
        // .0 绑定事件
        document.onkeydown = event => {
            // .0 判断 设置延迟
            if (!isChange) {
                return;
            }
            // .0 获取键值码
            var keyCode = event.keyCode;
            // .0 根据键值码设置 方向
            if (this.direction != "right" && keyCode == 37) {
                this.direction = "left"
            }
            if (this.direction != "left" && keyCode == 39) {
                this.direction = "right"
            }
            if (this.direction != "down" && keyCode == 38) {
                this.direction = "up";
            }
            if (this.direction != "up" && keyCode == 40) {
                this.direction = "down";
            }
            // .0 设置布尔值
            isChange = false;
            // console.log( this.direction )
            // .0 延迟100ms
            delay = setTimeout(() => {
                isChange = true;
                clearTimeout(delay);
            }, 100)

        }

    }
    // .0 处理蛇运动的逻辑
    move() {
        // 设置蛇移动位置
        var x = 0;
        var y = 0;
        // 控制流语句
        switch (this.direction) {
            case "right":
                x = this.space;
                break;
            case "left":
                x = -this.space;
                break;
            case "down":
                y = this.space;
                break;
            case "up":
                y = -this.space;
                break;
        }


        // .0 判断蛇是否超出活动范围
        // this.gameOver();
        // .0 清除画布指定区域
        this.clearCanvas();
        // .0 处理蛇移动的逻辑
        for (var i = 0; i < this.snakeArray.length - 1; i++) {
            // .0 更新蛇的数据
            this.snakeArray[i].x = this.snakeArray[i + 1].x;
            this.snakeArray[i].y = this.snakeArray[i + 1].y;
        }
        // .0 设置蛇的头部数据
        this.snakeArray[this.snakeArray.length - 1].x += x;
        this.snakeArray[this.snakeArray.length - 1].y += y;

        // console.log( this.snakeArray);
        // .0 绘制地图
        // l.drawMap();
        // .0 绘制蛇
        this.drawSnake2();
        // .0 检测蛇头和食物碰撞
        this.eatFood();
        // .0 复制蛇数据
        this.copySnake();
    }
    // .0 再次绘制蛇
    drawSnake2() {
        for (var i = 0; i < this.snakeArray.length; i++) {
            this.drawRect(
                this.snakeArray[i].x,
                this.snakeArray[i].y,
                this.space,
                this.space,
                this.snakeArray[i].color
            )
        }
    }
    // .0 蛇头部和食物发生碰撞
    eatFood() {
        // .0 记录蛇头部数据
        var obj = {
            x: this.snakeArray[this.snakeArray.length - 1].x,
            y: this.snakeArray[this.snakeArray.length - 1].y,
            color: this.snakeArray[this.snakeArray.length - 1].color
        }
        // .0 判断
        if (obj.x == this.food.x && obj.y == this.food.y) {
            // .0 增加蛇的长度
            this.addSnakeBody();
            // .0 增加分数
            this.score += 5;
            this.textElement.innerText = this.score;
            // .0 重新创建食物
            this.createFood();
        }
    }
    // .0 增加蛇的身体
    addSnakeBody() {
        // .0 记录一个方块(身体)
        var _obj = {
            x: this.snakeArray[0].x - this.space,
            y: this.snakeArray[0].y - this.space,
            color: "blue"
        }
        // .0 往蛇数组 snakeArray 添加数据
        this.snakeArray.unshift(_obj);
    }
    // .0 点击开始游戏、暂停游戏、设置模式
    addClickEvent() {
        // .0 事件绑定 
        // 点击开始游戏
        this.btnStart.onclick = () => {
            // .0 清除定时器
            clearInterval(this.timer);
            // .0 执行定时器
            this.timer = setInterval(() => {
                this.move();
            }, this.seconds)
        }
        // 点击暂停游戏
        this.btnPause.onclick = () => {
            // .0 清除定时器
            clearInterval(this.timer);
        }
        // 点击设置闯关的模式
        var count = 0;
                            // 行 * 列   尺寸
        // 0  表示 新手模式     20 * 20   30  =  600 * 600
        // 1  表示 一般模式     30 * 30   20  =  600 * 600
        // 2  表示 复杂模式     50 * 50   12  =  600 * 600
        this.btnModel.onclick = () => {
            // .0 清除定时器
            clearInterval(this.timer);
            // 自增
            count++;
            // .0 尺寸
            var space = 30;
            // 重置count变量
            count = count > 2 ? 0 : count;
            // 控制流语句
            switch (count) {
                case 0:
                        space = 30;
                        this.btnModel.innerText = "新手模式";
                    break;
                case 1:
                        space = 20;
                        this.btnModel.innerText = "一般模式";
                    break;
                case 2:
                        space = 12;
                        this.btnModel.innerText = "复杂模式";
                    break;
            }
           
            // 重置画布
            this.drawView(space);
        }
    }
    // .0 清除画布
    clearCanvas() {
        // .0 蛇移动的时候 清除指定的区域
        this.ctx.clearRect(
            this.snakeArray[0].x,
            this.snakeArray[0].y,
            this.space,
            this.space
        )
    }
    // .0 处理游戏是否结束的逻辑
    gameOver(array) {
        // .0 记录蛇头的数据
        var obj = {
            x: this.snakeArray[this.snakeArray.length - 1].x,
            y: this.snakeArray[this.snakeArray.length - 1].y
        }
        // .0 判断
        var col = this.col - 1;
        var row = this.row - 1;
        // .0 水平方向
        if (obj.x < 0 || obj.x > (col * this.space)) {
            console.log("x 轴超出范围 游戏结束");
            clearInterval(this.timer);
            return;
        }
        // .0 垂直方向
        if (obj.y < 0 || obj.y > (row * this.space)) {
            console.log("y 轴超出范围 游戏结束");
            clearInterval(this.timer);
            return;
        }

        // .0 第一种检测方式：判断蛇头部和蛇身体发生碰撞
        // for(var i = 0 ; i < this.snakeArray.length-1;i ++){
        //     if(obj.x == this.snakeArray[i].x && obj.y == this.snakeArray[i].y){
        //         console.log("蛇头碰撞身体 游戏结束 1");
        //         clearInterval(this.timer);
        //         return;
        //     }
        // }
        // .0 第二种检测方式：判断蛇头部和蛇身体发生碰撞
        for (var i = 0; i < array.length; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[j].x == array[i].x && array[j].y == array[i].y) {
                    console.log("蛇头碰撞身体 游戏结束 2");
                    clearInterval(this.timer);
                    return;
                }
            }
        }
    }
    // .0 复制蛇数据
    copySnake() {
        // .0 数组 复制蛇的数据
        this.array = []
        // .0 通过循环的方式
        for (var i = 0; i < this.snakeArray.length; i++) {
            this.array.push({
                x: this.snakeArray[i].x,
                y: this.snakeArray[i].y,
                color: this.snakeArray[i].color
            })
        }
        // .0 判断 蛇头和蛇身体碰撞
        this.gameOver(this.array);
    }
}


// .0 创建子类 SnakeMove 的实例
var snake = new SnakeMove();
// // .0 绘制视图界面
snake.drawView();
snake.addKeyEvent();
snake.addClickEvent();







    // .0 调用初始化
    // g.init();
    // .0 输出对象
    // console.log(g);
    // console.log(l);