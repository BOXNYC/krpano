package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;

	import krpano_as3_interface;


	public class followmouse extends Sprite
	{
		private var krpano : krpano_as3_interface = null;

		private var control_mousetype_backup:String = null;


		public function followmouse()
		{
			if (stage == null)
			{
				this.addEventListener(Event.ADDED_TO_STAGE, startplugin);
				this.addEventListener(Event.REMOVED_FROM_STAGE, stopplugin);
			}
		}


		private function startplugin(evt:Event):void
		{
			krpano = krpano_as3_interface.getInstance();

			if ( krpano.get("version") < "1.0.7" )
			{
				krpano.call("error(followmouse plugin - wrong krpano version! 1.0.7 or higher needed);");
				return;
			}

			stage.addEventListener(Event.MOUSE_LEAVE,     mouse_out);
			stage.addEventListener(MouseEvent.MOUSE_MOVE, mouse_move);
		}


		private function stopplugin(evt:Event):void
		{
			stage.removeEventListener(Event.MOUSE_LEAVE,     mouse_out);
			stage.removeEventListener(MouseEvent.MOUSE_MOVE, mouse_move);
		}



		private function mouse_move (event:MouseEvent):void
		{
			var mx:Number = stage.mouseX;
			var my:Number = stage.mouseY;
			var sx:Number = stage.stageWidth  * 0.5;
			var sy:Number = stage.stageHeight * 0.5;


			// calc motion vectors: -1.0 to +1.0
			var vx:Number = (mx - sx) / sx;
			var vy:Number = (my - sy) / sy;

			if ( event.buttonDown || (vx > -0.5 && vx < 0.5 && vy > -0.5 && vy < 0.5) )
			{
				// middle area - normal control

				krpano.set("hlookat_moveforce", 0);
				krpano.set("vlookat_moveforce", 0);
			}
			else
			{
				// outer area - automatic followmouse movement

				vx = 2.0 * (vx < 0 ? -1.0 : +1.0) * (Math.max(Math.abs(vx),0.5) - 0.5);
				vy = 2.0 * (vy < 0 ? -1.0 : +1.0) * (Math.max(Math.abs(vy),0.5) - 0.5);

				// stop very slow moving
				if (Math.abs(vx) < 0.01)	vx = 0;
				if (Math.abs(vy) < 0.01)	vy = 0;

				// set move forces
				krpano.set("hlookat_moveforce", vx);
				krpano.set("vlookat_moveforce", vy);
			}
		}


		private function mouse_out(event:*):void
		{
			krpano.set("hlookat_moveforce", 0);
			krpano.set("vlookat_moveforce", 0);
		}

	}
}
