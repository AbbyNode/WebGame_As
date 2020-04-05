import { Platform } from "../objects/Platform.js";
import { Enemy } from "../objects/Enemy.js";
import { Portal } from "../objects/Portal.js";
export class LevelGenerator {
    static GenerateLevel(stage) {
        const levelObjects = [];
        const platform = new Platform({ width: 200, height: 200 });
        platform.transform.position = { x: 200, y: 500 };
        platform.init(stage);
        levelObjects.push(platform);
        const platform2 = new Platform({ width: 200, height: 300 });
        platform2.transform.position = { x: 500, y: 500 };
        platform2.init(stage);
        levelObjects.push(platform2);
        const enemy = new Enemy();
        enemy.transform.position = { x: 500, y: 330 };
        enemy.init(stage);
        levelObjects.push(enemy);
        const portal = new Portal();
        portal.transform.position = { x: 200, y: 330 };
        portal.init(stage);
        levelObjects.push(portal);
        return levelObjects;
    }
}
//# sourceMappingURL=LevelGenerator.js.map