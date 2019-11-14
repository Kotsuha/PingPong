class PingPong extends eui.Component implements  eui.UIComponent {

	protected ball: Ball;
	protected board: Board;

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
		this.ball.setVelocity(3.5, -5.5);

		this.addEventListener( // 因為是移動裝置的 touch，滑鼠的話要點著不放
			egret.TouchEvent.TOUCH_MOVE,
			this.onTouchMove,
			this
		);
	}


	protected onEnterFrame():void
	{
		// 暫時找不到類似 C# Action 或 Event 的功能，先這樣。要改 ENTER_FRAME 做了啥事就改這邊。
		this.running();
	}


	protected onTouchMove(evt:egret.TouchEvent):void
	{
		this.board.x = evt.stageX;
		// this.board.y = evt.stageY;
	}


	protected running():void // 一直跑一直跑
	{
		// Ball
		if (true) {
			this.ball.x += this.ball.vx;
			this.ball.y += this.ball.vy;

			// 邊界
			if (this.ball.x + this.ball.radius >= this.width)
			{
				this.ball.x = this.width - this.ball.radius;
				this.ball.vx *= -1;
			}
			else if (this.ball.x - this.ball.radius <= 0)
			{
				this.ball.x = 0 + this.ball.radius;
				this.ball.vx *= -1;
			}
			if (this.ball.y + this.ball.radius >= this.height)
			{
				this.ball.y = this.height - this.ball.radius;
				this.ball.vy *= -1;
			}
			else if (this.ball.y - this.ball.radius <= 0)
			{
				this.ball.y = 0 + this.ball.radius;
				this.ball.vy *= -1;
			}

			// 障礙物 (之後想改成矩陣，加一堆障礙物，在更之後就去找 Box2d 或其他現成物裡解決方案)
			const BOARD_LEFT  = this.board.x - this.board.width / 2;
			const BOARD_RIGHT = this.board.x + this.board.width / 2;
			const BOARD_UP    = this.board.y - this.board.height / 2;
			const BOARD_DOWN  = this.board.y + this.board.height / 2;
			if (this.ball.x + (this.ball.radius / 2) >= BOARD_LEFT
			 && this.ball.x - (this.ball.radius / 2) <= BOARD_RIGHT
			 && this.ball.y + (this.ball.radius / 2) >= BOARD_UP
			 && this.ball.y - (this.ball.radius / 2) <= BOARD_DOWN)
			{
				this.ball.alpha = 0.5;

				// 側面碰撞不做了，去找物理引擎吧
				if (this.ball.x >= this.board.x - this.board.width / 2 && this.ball.x <= this.board.x + this.board.width / 2)
					this.ball.vy *= -1;
			}
			else
				this.ball.alpha = 1;
		}

		// 板子跟著滑鼠跑
	}
	
}