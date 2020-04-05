import { Platform } from "../objects/Platform.js";
import { Enemy } from "../objects/Enemy.js";
import { Portal } from "../objects/Portal.js";
import { Pickup } from "../objects/Pickup.js";
export class LevelGenerator {
    static GenerateLevel(stage, platformCount = 10) {
        const levelObjects = [];
        const heightValues = [200, 300, 400];
        const distanceValues = [0, 100, 200, 300];
        const enemyXVariation = [-60, 0, 60];
        const enemyYValues = [360, 310, 260];
        const pickupXVariation = [-100, 0, 100];
        const pickupYValues = [260, 210, 160];
        let x = 200;
        // First platform
        const firstPlatform = LevelGenerator.GeneratePlatform(x, 300);
        firstPlatform.init(stage);
        levelObjects.push(firstPlatform);
        for (let index = 1; index <= platformCount; index++) {
            let distanceIndex = LevelGenerator.RandomInt(0, distanceValues.length - 1);
            let distance = distanceValues[distanceIndex];
            x += 200 + distance;
            //
            // Generate platforms
            let heightIndex = LevelGenerator.RandomInt(0, heightValues.length - 1);
            let height = heightValues[heightIndex];
            const platform = LevelGenerator.GeneratePlatform(x, height);
            platform.init(stage);
            levelObjects.push(platform);
            //
            // Generate enemies
            if (Math.random() >= 0.6) {
                const xVarIndex = LevelGenerator.RandomInt(0, enemyXVariation.length - 1);
                const xVar = enemyXVariation[xVarIndex];
                const enemyY = enemyYValues[heightIndex];
                const enemy = LevelGenerator.GenerateEnemy(x + xVar, enemyY);
                enemy.init(stage);
                levelObjects.push(enemy);
            }
            // Generate pickups
            if (Math.random() >= 0.4) {
                const xVarIndex = LevelGenerator.RandomInt(0, pickupXVariation.length - 1);
                const xVar = pickupXVariation[xVarIndex];
                const pickupY = pickupYValues[heightIndex];
                const pickup = LevelGenerator.GeneratePickup(x + xVar, pickupY);
                pickup.init(stage);
                levelObjects.push(pickup);
            }
        }
        // Last platform
        let distanceIndex = LevelGenerator.RandomInt(0, distanceValues.length - 1);
        let distance = distanceValues[distanceIndex];
        x += 200 + distance;
        const lastPlatform = LevelGenerator.GeneratePlatform(x, 300);
        lastPlatform.init(stage);
        levelObjects.push(lastPlatform);
        // With a portal
        const portal = new Portal();
        portal.transform.position = { x: x, y: 250 };
        portal.init(stage);
        levelObjects.push(portal);
        return levelObjects;
    }
    static GeneratePlatform(x, height) {
        const platform = new Platform({ width: 200, height: height });
        platform.transform.position = { x: x, y: 500 };
        return platform;
    }
    static GenerateEnemy(x, y) {
        const enemy = new Enemy();
        enemy.transform.position = { x: x, y: y };
        return enemy;
    }
    static GeneratePickup(x, y) {
        const pickup = new Pickup();
        pickup.transform.position = { x: x, y: y };
        return pickup;
    }
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    static RandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
//# sourceMappingURL=LevelGenerator.js.map