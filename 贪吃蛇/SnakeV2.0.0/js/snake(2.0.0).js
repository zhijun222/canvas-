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
// 12. 复制蛇 记录一份关于蛇的坐标，用于判断是否结束游戏

// 步骤：
    // 1.0 声明父类
    class Game {
        // .0 构造器
        constructor(){
             // .0 添加属性
             this.btnStart=document.getElementById("btnStart");
             this.btnPause=document.getElementById("btnPause");
             this.btnModel=document.getElementById("btnModel");
             this.textElement=document.getElementById("textElement");
             this.titleElement=document.getElementById("titleElement");
             this.canvas=document.getElementById("canvas");

             this.ctx = this.canvas.getContext("2d");
             this.width = 600;
             this.height = 600;
             this.space = 20;
             this.row = this.height / this.space;
             this.col =  this.width / this.space;
             this.canvas.width = this.width;
             this.canvas.height = this.height;

             //.0 记录蛇信息数组
             this.snakeArray = [
                 {x:this.space * 0,y:0,color:"blue"},
                 {x:this.space * 1,y:0,color:"blue"},
                 {x:this.space * 2,y:0,color:"red"}
             ]
             //.记录食物的信息
             this.food = {
                     x:5 * this.space,
                     y:8 * this.space,
                     color:"orange"
                }
             
             //  ....
        }
        // .0 添加方法
        init(){
            // .0 测试
            // this.drawLine(100,100,500,100);
            // this.drawRect(100,100,50,50);
            // this.drawText(100,100,"hello");
        }
        // .0 绘制线
        drawLine(x0,y0,x1,y1,color="#fff"){
            this.ctx.beginPath();
            this.ctx.strokeStyle=color;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(x0,y0);
            this.ctx.lineTo(x1,y1);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        // .0 绘制矩形
        drawRect(x,y,w,h,color="#00f"){
            // console.log(x,y,w,h)
            this.ctx.beginPath();
            this.ctx.fillStyle=color;
            this.ctx.fillRect(x,y,w,h);
            this.ctx.fill();
            this.ctx.closePath();
        }
        // .0 绘制文本
        drawText(x,y,text,color="#fff"){
            this.ctx.beginPath();
            this.ctx.fillStyle = color;
            this.ctx.font="20px 微软雅黑";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(text,x,y);
            this.ctx.closePath();
        }
        // .0 随机数
        random(min,max){
            return Math.floor(Math.random()*(max-min)+min);
        }
    }

    // 2.0 声明子类 (舞台)
    class Layout extends Game {
        // .0 构造器
        constructor(){
            // .0 超级类
            super();
        }
        // .0 绘制地图
        drawMap(){
            // .0 循环
            // 行
            for(var i  = 0 ; i < this.row ; i ++){
                // .0 绘制线
                this.drawLine(0,i * this.space,this.width,i * this.space);
            }
            // 列
            for(var j  = 0 ; j < this.col ; j ++){
                // .0 绘制线
                this.drawLine(j * this.space,0,j * this.space,this.height);
            }
        }
    }
    // 3.0 声明子类 （蛇）
    class Snake extends Game {
        // .0 构造器
        constructor(){
            super();
        }
        // .0 绘制蛇
        drawSnake(){
            // .0 绘制地图
            new Layout().drawMap();
            // .0 绘制食物
            new Food().drawFood();
            // 蛇的数据
            // console.log(this.snakeArray)
            // .0 绘制蛇
            for(var i = 0 ; i < this.snakeArray.length;i ++){
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
        constructor(){
            super();
        }
        drawFood(){
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

    // .0 创建父类 Game   的实例
    let g =  new Game()
    // .0 调用初始化
    // g.init();
     // .0 创建子类 Snake  的实例
    let s = new Snake();
    s.drawSnake();


    // .0 创建子类 Layout 的实例
    // let l =  new Layout();
    // l.drawMap();
   




    // .0 输出对象
    // console.log(g);
    // console.log(l);