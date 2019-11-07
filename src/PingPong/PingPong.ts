class PingPong extends eui.Component implements  eui.UIComponent {

	protected ball: Ball;

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
			this.doEnterFrame,
			this
		);
		this.ball.setVelocity(5, 5);
	}


	protected doEnterFrame():void
	{
		// 暫時找不到類似 C# Action 或 Event 的功能，先這樣。要改 ENTER_FRAME 做了啥事就改這邊。
		this.running();
	}


	protected running():void // 一直跑一直跑
	{
		this.ball.move();
	}
	
}