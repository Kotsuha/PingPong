class PingPong extends eui.Component implements  eui.UIComponent {

	// Component
	protected ball: Ball;
	protected board: Board;
	protected topWall: Wall;
	protected rightWall: Wall;
	protected bottomWall: Wall;
	protected leftWall: Wall;

	// p2.js
	protected world: p2.World;
	protected p2BallBody: p2.Body;
	protected p2BallShape: p2.Circle;
	protected p2TopWallBody: p2.Body;
	protected p2TopWallShape: p2.Box;
	protected p2RightWallBody: p2.Body;
	protected p2RightWallShape: p2.Box;
	protected p2BottomWallBody: p2.Body;
	protected p2BottomWallShape: p2.Box;
	protected p2LeftWallBody: p2.Body;
	protected p2LeftWallShape: p2.Box;
	protected p2BoardBody: p2.Body;
	protected p2BoardShape: p2.Box;
	protected genericMaterial: p2.Material;
	protected genericContactMaterial: p2.ContactMaterial;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		this.init();
	}


	protected init():void
	{
		this.addEventListener(
			egret.TouchEvent.ENTER_FRAME,
			this.onEnterFrame,
			this
		);
		// this.ball.setVelocity(3.5, -5.5);

		this.addEventListener( // 因為是移動裝置的 touch，滑鼠的話要點著不放
			egret.TouchEvent.TOUCH_MOVE,
			this.onTouchMove,
			this
		);

		this.init_p2();
	}


	protected init_p2():void {

		// World
		{
			this.world = new p2.World({ gravity: [0, 9.82] });
			this.world.applyDamping = false; // Thanks to William! 現在東西移動不會一直減速了
			this.world.applyGravity = false;
		}

		// Generic Material
		{
			this.genericMaterial = new p2.Material();
			this.genericContactMaterial = new p2.ContactMaterial(this.genericMaterial, this.genericMaterial, {
				// friction: 0, // 好像還是要有摩擦力，這樣才可以甩板子改變球的移動方向
				restitution: 1, // 歸還? 要讓碰撞以後的速度完全不減直接歸還，設 1
			});
			this.world.addContactMaterial(this.genericContactMaterial);
		}

		// Ball
		{
			this.p2BallBody = new p2.Body({
				mass: 1,
				position: [this.ball.x, this.ball.y],
				angularVelocity: 0, // 0.1
				velocity: [0, 100]
			});
			this.p2BallShape = new p2.Circle({
				radius: this.ball.width / 2,
			});
			this.p2BallShape.material = this.genericMaterial;
			this.p2BallBody.addShape(this.p2BallShape);
			this.world.addBody(this.p2BallBody);
		}

		// Board
		{
			this.p2BoardBody = new p2.Body({
				mass: 1,
				position: [this.board.x, this.board.y],
			});
			this.p2BoardBody.type = p2.Body.KINEMATIC;
			this.p2BoardShape = new p2.Box({
				width: this.board.width,
				height: this.board.height
			});
			this.p2BoardShape.material = this.genericMaterial;
			this.p2BoardBody.addShape(this.p2BoardShape);
			this.world.addBody(this.p2BoardBody);
		}

		// Wall (如何簡化)
		{
			// Top Wall
			this.p2TopWallBody = new p2.Body({
				mass: 0,
				position: [this.topWall.x, this.topWall.y]
			});
			this.p2TopWallBody.type = p2.Body.STATIC;
			this.p2TopWallShape = new p2.Box({
				width: this.topWall.width,
				height: this.topWall.height
			});
			this.p2TopWallShape.material = this.genericMaterial;
			this.p2TopWallBody.addShape(this.p2TopWallShape);
			this.world.addBody(this.p2TopWallBody);

			// Right Wall
			this.p2RightWallBody = new p2.Body({
				mass: 0,
				position: [this.rightWall.x, this.rightWall.y]
			});
			this.p2RightWallBody.type = p2.Body.STATIC;
			this.p2RightWallShape = new p2.Box({
				width: this.rightWall.width,
				height: this.rightWall.height
			});
			this.p2RightWallShape.material = this.genericMaterial;
			this.p2RightWallBody.addShape(this.p2RightWallShape);
			this.world.addBody(this.p2RightWallBody);

			// Bottom Wall
			this.p2BottomWallBody = new p2.Body({
				mass: 0,
				position: [this.bottomWall.x, this.bottomWall.y]
			});
			this.p2BottomWallBody.type = p2.Body.STATIC;
			this.p2BottomWallShape = new p2.Box({
				width: this.bottomWall.width,
				height: this.bottomWall.height
			});
			this.p2BottomWallShape.material = this.genericMaterial;
			this.p2BottomWallBody.addShape(this.p2BottomWallShape);
			this.world.addBody(this.p2BottomWallBody);

			// Left Wall
			this.p2LeftWallBody = new p2.Body({
				mass: 0,
				position: [this.leftWall.x, this.leftWall.y]
			});
			this.p2LeftWallBody.type = p2.Body.STATIC;
			this.p2LeftWallShape = new p2.Box({
				width: this.leftWall.width,
				height: this.leftWall.height
			});
			this.p2LeftWallShape.material = this.genericMaterial;
			this.p2LeftWallBody.addShape(this.p2LeftWallShape);
			this.world.addBody(this.p2LeftWallBody);

			// 本來以為能這樣簡化，但大概是傳值傳址問題，這段不能用
			// let walls = [
			// 	{
			// 		egretComponent: this.bottomWall, 
			// 		p2Body: this.p2BottomWallBody, 
			// 		p2Shape: this.p2BottomWallShape
			// 	},
			// ];
			// walls.forEach((wall) => {
			// 	// Body
			// 	wall.p2Body = new p2.Body({
			// 		mass: 0,
			// 		position: [wall.egretComponent.x, wall.egretComponent.y]
			// 	});
			// 	wall.p2Body.type = p2.Body.STATIC;
			// 	// Shape
			// 	wall.p2Shape = new p2.Box({
			// 		width: wall.egretComponent.width,
			// 		height: wall.egretComponent.height
			// 	});
			// 	wall.p2Shape.material = this.genericMaterial;
			// 	wall.p2Body.addShape(wall.p2Shape);
			// 	this.world.addBody(wall.p2Body);
			// });
		}
	}


	protected onEnterFrame():void
	{
		// 暫時找不到類似 C# Action 或 Event 的功能，先這樣。要改 ENTER_FRAME 做了啥事就改這邊。
		this.running();
	}


	protected onTouchMove(evt:egret.TouchEvent):void
	{
		this.p2BoardBody.position[0] = evt.stageX;
		console.log(evt.stageX);
		// this.p2board.x = evt.stageX;
		// this.board.y = evt.stageY;
	}


	protected running():void // 一直跑一直跑
	{
		// Ball
		// if (true) {
		// 	this.ball.x += this.ball.vx;
		// 	this.ball.y += this.ball.vy;

		// 	// 邊界
		// 	if (this.ball.x + this.ball.radius >= this.width)
		// 	{
		// 		this.ball.x = this.width - this.ball.radius;
		// 		this.ball.vx *= -1;
		// 	}
		// 	else if (this.ball.x - this.ball.radius <= 0)
		// 	{
		// 		this.ball.x = 0 + this.ball.radius;
		// 		this.ball.vx *= -1;
		// 	}
		// 	if (this.ball.y + this.ball.radius >= this.height)
		// 	{
		// 		this.ball.y = this.height - this.ball.radius;
		// 		this.ball.vy *= -1;
		// 	}
		// 	else if (this.ball.y - this.ball.radius <= 0)
		// 	{
		// 		this.ball.y = 0 + this.ball.radius;
		// 		this.ball.vy *= -1;
		// 	}

		// 	// 障礙物 (之後想改成矩陣，加一堆障礙物，在更之後就去找 Box2d 或其他現成物裡解決方案)
		// 	const BOARD_LEFT  = this.board.x - this.board.width / 2;
		// 	const BOARD_RIGHT = this.board.x + this.board.width / 2;
		// 	const BOARD_UP    = this.board.y - this.board.height / 2;
		// 	const BOARD_DOWN  = this.board.y + this.board.height / 2;
		// 	if (this.ball.x + (this.ball.radius / 2) >= BOARD_LEFT
		// 	 && this.ball.x - (this.ball.radius / 2) <= BOARD_RIGHT
		// 	 && this.ball.y + (this.ball.radius / 2) >= BOARD_UP
		// 	 && this.ball.y - (this.ball.radius / 2) <= BOARD_DOWN)
		// 	{
		// 		this.ball.alpha = 0.5;

		// 		// 側面碰撞不做了，去找物理引擎吧
		// 		if (this.ball.x >= this.board.x - this.board.width / 2 && this.ball.x <= this.board.x + this.board.width / 2)
		// 			this.ball.vy *= -1;
		// 	}
		// 	else
		// 		this.ball.alpha = 1;
		// }

		this.world.step(1/15); // 先暫時用 1/60 吧，我猜大概是要用 deltaTime

		// 球
		this.ball.x = this.p2BallBody.position[0];
		this.ball.y = this.p2BallBody.position[1];

		// 板子
		this.board.x = this.p2BoardBody.position[0];
		this.board.y = this.p2BoardBody.position[1];

		this.bottomWall.x = this.p2BottomWallBody.position[0];
		this.bottomWall.y = this.p2BottomWallBody.position[1];
	}
	
}