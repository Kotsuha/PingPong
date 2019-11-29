class PingPong extends eui.Component implements eui.UIComponent {

	// Exml Objects

	protected blockGroup: eui.Group;

	// Component
	protected ball: Ball;
	protected board: Board;
	protected topWall: Wall;
	protected rightWall: Wall;
	protected bottomWall: Wall;
	protected leftWall: Wall;
	protected blocks: Block[] = [];

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
	protected p2BlockBodies: p2.Body[] = [];

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.init();
	}


	protected init(): void {
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
		this.init_eui();
	}


	protected init_p2(): void {

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

		// Block
		{
			let blocks = this.blockGroup.$children;

			for (let i = 0; i < this.blockGroup.$children.length; i++) {

				let block = this.blockGroup.$children[i] as Block;
				this.blocks.push(block);

				const x = block.x;
				const y = block.y;
				const w = block.rect.width;
				const h = block.rect.height;

				let p2BlockBody = new p2.Body({
					mass: 1,
					position: [x, y]
				});
				p2BlockBody.type = p2.Body.STATIC;
				let p2BlockShape = new p2.Box({
					width: w,
					height: h
				});
				p2BlockShape.material = this.genericMaterial;
				p2BlockBody.addShape(p2BlockShape);
				this.world.addBody(p2BlockBody);
				this.p2BlockBodies.push(p2BlockBody);
			}
		}
	}

	protected init_eui() {
	}


	protected onEnterFrame(): void {
		// 暫時找不到類似 C# Action 或 Event 的功能，先這樣。要改 ENTER_FRAME 做了啥事就改這邊。
		this.running();
	}


	protected onTouchMove(evt: egret.TouchEvent): void {
		this.p2BoardBody.position[0] = evt.stageX;
		console.log(evt.stageX);
		// this.p2board.x = evt.stageX;
		// this.board.y = evt.stageY;
	}


	// 一直跑一直跑
	protected running(): void {
		this.world.step(1 / 15); // 先暫時用 1/60 吧，我猜大概是要用 deltaTime

		// Sync Egret rendering and p2.js calculated values



		// 球
		this.ball.x = this.p2BallBody.position[0];
		this.ball.y = this.p2BallBody.position[1];

		// 板子
		this.board.x = this.p2BoardBody.position[0];
		this.board.y = this.p2BoardBody.position[1];

		// 方塊
		for (let i: number = 0; i < this.blocks.length; i++) {
			let box = (this.p2BlockBodies[i].shapes[0] as p2.Box);

			// 這些東西如果不會一直變，就不用一直做了。如果位置不會變，應該也不用一直做。
			// this.blocks[i].rect.width = box.width;
			// this.blocks[i].rect.height = box.height;
			// this.blocks[i].anchorOffsetX = this.blocks[i].width / 2;
			// this.blocks[i].anchorOffsetY = this.blocks[i].height / 2;

			this.blocks[i].x = this.p2BlockBodies[i].position[0];
			this.blocks[i].y = this.p2BlockBodies[i].position[1];
		}

		// export class Shape {

		//     static idCounter: number;
		//     static CIRCLE: number;
		//     static PARTICLE: number;
		//     static PLANE: number;
		//     static CONVEX: number;
		//     static LINE: number;
		//     static BOX: number;
		//     static CAPSULE: number;
		//     static HEIGHTFIELD: number;
	}

}