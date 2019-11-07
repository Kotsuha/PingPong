class Ball extends eui.Component implements eui.UIComponent {

	// Velocity
	protected v_x: number = 0;
	protected v_y: number = 0;
	// Acceleration
	protected a_x: number = 0;
	protected a_y: number = 0;
	// Radius
	protected radius: number = 10;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		console.log("partAdded() is called!", this)
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		console.log("childrenCreated() is called!", this)
		this.init();
	}


	public setVelocity(x: number, y: number):Ball
	{
		this.v_x = x;
		this.v_y = y;
		return this;
	}

	public setAcceleration(x: number, y: number):Ball
	{
		this.a_x = x;
		this.a_y = y;
		return this;
	}


	protected init():void // 業務邏輯
	{
		this.addEventListener(
			egret.TouchEvent.ENTER_FRAME,
			this.doEnterFrame,
			this
		);
	}


	protected doEnterFrame():void
	{
		// 暫時找不到類似 C# Action 或 Event 的功能，先這樣。要改 ENTER_FRAME 做了啥事就改這邊。
		// this.move();
	}


	public move():void
	{
		this.x += this.v_x;
		this.y += this.v_y;

		if (this.x + this.radius >= this.parent.width)
		{
			this.x = this.parent.width - this.radius;
			this.v_x *= -1;
		}
		else if (this.x - this.radius <= 0)
		{
			this.x = 0 + this.radius;
			this.v_x *= -1;
		}
		if (this.y + this.radius >= this.parent.height)
		{
			this.y = this.parent.height - this.radius;
			this.v_y *= -1;
		}
		else if (this.y - this.radius <= 0)
		{
			this.y = 0 + this.radius;
			this.v_y *= -1;
		}
		
		// this.v_x += this.a_x;
		// this.v_y += this.a_y;
	}
}