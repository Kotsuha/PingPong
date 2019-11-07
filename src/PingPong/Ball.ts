class Ball extends eui.Component implements eui.UIComponent {

	// Velocity
	protected _vx: number = 0;
	protected _vy: number = 0;
	// Acceleration
	protected _ax: number = 0;
	protected _ay: number = 0;
	// Radius
	protected _radius: number = 10;

	get vx(): number {
		return this._vx;
	}
	set vx(value: number) {
		this._vx = value;
	}

	get vy(): number {
		return this._vy;
	}
	set vy(value: number) {
		this._vy = value;
	}

	get radius(): number {
		return this._radius;
	}
	set radius(value: number) {
		this._radius = value;
	}

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
		this._vx = x;
		this._vy = y;
		return this;
	}

	public setAcceleration(x: number, y: number):Ball
	{
		this._ax = x;
		this._ay = y;
		return this;
	}


	protected init():void // 業務邏輯
	{
		// this.addEventListener(
		// 	egret.TouchEvent.ENTER_FRAME,
		// 	this.doEnterFrame,
		// 	this
		// );
	}


	// protected doEnterFrame():void
	// {
	// 	// 暫時找不到類似 C# Action 或 Event 的功能，先這樣。要改 ENTER_FRAME 做了啥事就改這邊。
	// 	// this.move();
	// }


	public move():void
	{
		this.x += this._vx;
		this.y += this._vy;

		if (this.x + this._radius >= this.parent.width)
		{
			this.x = this.parent.width - this._radius;
			this._vx *= -1;
		}
		else if (this.x - this._radius <= 0)
		{
			this.x = 0 + this._radius;
			this._vx *= -1;
		}
		if (this.y + this._radius >= this.parent.height)
		{
			this.y = this.parent.height - this._radius;
			this._vy *= -1;
		}
		else if (this.y - this._radius <= 0)
		{
			this.y = 0 + this._radius;
			this._vy *= -1;
		}
		
		// this.v_x += this.a_x;
		// this.v_y += this.a_y;
	}
}