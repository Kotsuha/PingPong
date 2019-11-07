class Ball extends eui.Component implements eui.UIComponent {
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


	protected init():void // 業務邏輯
	{
		this.addEventListener(
			egret.TouchEvent.ENTER_FRAME,
			this.doEnterFrame,
			this
		)
	}


	protected doEnterFrame():void
	{
		// 暫時找不到類似 C# Action 或 Event 的功能，先這樣。要改 ENTER_FRAME 做了啥事就改這邊。
		this.move();
	}


	protected move():void
	{
		this.x++;
	}
	
}