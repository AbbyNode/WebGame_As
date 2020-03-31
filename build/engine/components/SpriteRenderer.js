import { GameComponent } from "../gameobject/GameComponent.js";
import { EventName } from "./EventName.js";
export class SpriteRenderer extends GameComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(gameObject, spriteSheetData) {
        super(gameObject);
        // https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
        const spriteSheet = new createjs.SpriteSheet(spriteSheetData);
        this._sprite = new createjs.Sprite(spriteSheet);
        this._facingRight = true;
        this.gameObject.container.addChild(this.sprite);
        this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
            this.destroy();
        });
        // this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, data => {
        // 	this.sprite.x = data.x;
        // 	this.sprite.y = data.y;
        // });
        this.gameObject.eventManager.addListener(EventName.Mover_Turned, data => {
            this.facingRight = data.facingRight;
        });
        // TODO: Move these events out to entity class or something
        this.gameObject.eventManager.addListener(EventName.Mover_StartedMoving, () => {
            this.sprite.gotoAndPlay("walk");
        });
        this.gameObject.eventManager.addListener(EventName.Mover_StoppedMoving, () => {
            this.sprite.gotoAndPlay("idle");
        });
    }
    get sprite() {
        return this._sprite;
    }
    get facingRight() {
        return this._facingRight;
    }
    set facingRight(toggle) {
        this._facingRight = toggle;
        this.sprite.scaleX = (toggle ? 1 : -1);
    }
    destroy() {
        this._sprite.removeAllEventListeners();
        this.gameObject.container.removeChild(this.sprite);
    }
}
//# sourceMappingURL=SpriteRenderer.js.map