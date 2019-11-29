class Block extends eui.Component implements  eui.UIComponent {

	/**
	 * 指定碰撞區域。到時 p2 會去吻合這個。
	 */
	public rect: eui.Rect;

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
		
	}


	// I am a block.
	// Currently what I do is: when something hit me, I callback and destroy my self


	protected selfDestroy():void
	{
		// Destroy myself

	}
}