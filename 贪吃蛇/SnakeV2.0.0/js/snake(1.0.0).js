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
    // 1.0 声明类
    class Game {
        // .0 构造器
        constructor(option){
             // .0 添加属性
             this.btnStart = option.btnStart;
             this.btnPause = option.btnPause;
             this.btnModel = option.btnModel;
             this.textElement = option.textElement;
             this.titleElement = option.titleElement;
             this.canvas = option.canvas;
             this.ctx = this.canvas.getContext("2d");
             this.width = 600;
             this.height = 600;
             this.space = 20;
             this.row = this.height / this.space;
             this.col =  this.width / this.space;
             this.canvas.width = this.width;
             this.canvas.height = this.height;
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
    }

    // 2.0 声明子类
    class Stage extends Game {
        // .0 构造器
        constructor(){
            super();
        }
        // .0 绘制地图
        // drawMap(){
        //     // .0 循环
        //     for(var i  = 0 ; i < this.row ; i ++){

        //     }
        // }
    }


    // .0 创建Game的实例
    let g =  new Game({
        btnStart:document.getElementById("btnStart"),
        btnPause:document.getElementById("btnPause"),
        btnModel:document.getElementById("btnModel"),
        textElement:document.getElementById("textElement"),
        titleElement:document.getElementById("titleElement"),
        canvas:document.getElementById("canvas")
    })
    // .0 调用初始化
    g.init();

    // .0 输出对象
    console.log(g);

    // .0 创建子类Map
    // let m =  new Stage();
    // console.log(m)
    // m.drawMap();