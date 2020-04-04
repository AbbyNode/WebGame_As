import { Enemy } from "../objects/Enemy.js";
export class EnemyManager {
    constructor(stage) {
        this._stage = stage;
        this._enemies = [];
    }
    init() {
        // TODO: Enemy generator
        const enemy = new Enemy();
        enemy.transform.position = { x: 400, y: 400 };
        enemy.init(this._stage);
    }
    update() {
        this._enemies.forEach(enemy => {
            enemy.update();
        });
    }
}
//# sourceMappingURL=EnemyManager.js.map