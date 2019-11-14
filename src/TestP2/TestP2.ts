class TestP2 extends eui.Component implements  eui.UIComponent {
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


	// p2.js objects
	protected world: p2.World;
	protected boxBody: p2.Body;
	protected boxShape: p2.Box;
	protected planeBody: p2.Body;
	protected planeShape: p2.Plane;

	// For rendering p2.js bodies
	protected ball: Ball;
	protected 

	protected init(): void
	{
		// ---------------------------------------------------------------------
		// Background
		// ---------------------------------------------------------------------
		const bgWidth = this.skin.width;
		const bgHeight = this.skin.height;
		console.log(bgWidth, bgHeight);
		let bg: egret.Shape = new egret.Shape();
		bg.x = 0;
		bg.y = 0;
		// bg.graphics.lineStyle( 10, 0x00ff00 );
		bg.graphics.beginFill( 0x000000, 1);
		bg.graphics.drawRect( 0, 0, bgWidth, bgHeight );
		bg.graphics.endFill();
		this.addChild( bg );

		// ---------------------------------------------------------------------
		// p2.js
		// ---------------------------------------------------------------------
		// Create a world
		this.world = new p2.World({
			gravity: [0, 10]
		});

		// Add a Box
		this.boxShape = new p2.Box({
			width: 80, 
			height: 60
		});
		this.boxBody = new p2.Body({
			mass: 5, 
			position: [100, 100], 
			angularVelocity: 0.1
		});
		this.boxBody.addShape(this.boxShape);
		this.world.addBody(this.boxBody);

		// Add a Plane
		this.planeShape = new p2.Plane();
		this.planeBody = new p2.Body({
			position: [0, 1200],
		});
		this.planeBody.addShape(this.planeShape);
		this.world.addBody(this.planeBody);

		// ---------------------------------------------------------------------
		// Rendering
		// ---------------------------------------------------------------------

		this.shpBorderB = new egret.Shape();
		this.addChild( this.shpBorderB );

		this.ball = new Ball();
		this.addChild(this.ball);
		this.ball.x = 0;
		this.ball.y = 0;

		// ---------------------------------------------------------------------

		this.addEventListener(
			egret.TouchEvent.ENTER_FRAME,
			this.onEnterFrame,
			this
		);
	}


	protected onEnterFrame():void
	{
		this.world.step(1/15); // 我怎麼知道這個數字要給多少?
		this.render();
	}


	protected shpBorderB:egret.Shape;
	private render():void
	{
		this.shpBorderB.x = this.planeBody.position[0];
        this.shpBorderB.y = this.planeBody.position[1];
        this.shpBorderB.graphics.lineStyle( 10, 0x00ff00 );
        this.shpBorderB.graphics.beginFill( 0xff0000, 1);
        this.shpBorderB.graphics.drawRect( 0, 0, 100, 200 );
        this.shpBorderB.graphics.endFill();

		// // console.log(this.boxBody.position[0]);
		this.ball.x = this.boxBody.position[0];
		this.ball.y = this.boxBody.position[1];
		// console.log(this.boxBody.position[1]);
	}
}