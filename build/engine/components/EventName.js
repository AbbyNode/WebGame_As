export var EventName;
(function (EventName) {
    /* eslint-disable @typescript-eslint/camelcase */
    // GameObject
    EventName[EventName["GameObject_Init"] = 0] = "GameObject_Init";
    EventName[EventName["GameObject_Update"] = 1] = "GameObject_Update";
    EventName[EventName["GameObject_Destroy"] = 2] = "GameObject_Destroy";
    // Transform
    EventName[EventName["Transform_PositionChange"] = 3] = "Transform_PositionChange";
    // PlayerController
    // Collider
    EventName[EventName["Collider_RequestMove"] = 4] = "Collider_RequestMove";
    EventName[EventName["Collider_CollidedFrame"] = 5] = "Collider_CollidedFrame";
    EventName[EventName["Collider_CollidedTick"] = 6] = "Collider_CollidedTick";
    EventName[EventName["Collider_MoveRequestAccepted"] = 7] = "Collider_MoveRequestAccepted";
    EventName[EventName["Collider_MoveRequestDenied"] = 8] = "Collider_MoveRequestDenied";
    EventName[EventName["Collider_TriggerEnter"] = 9] = "Collider_TriggerEnter";
    EventName[EventName["Collider_TriggerExit"] = 10] = "Collider_TriggerExit";
    // Mover
    EventName[EventName["Mover_RequestStart"] = 11] = "Mover_RequestStart";
    EventName[EventName["Mover_RequestStop"] = 12] = "Mover_RequestStop";
    EventName[EventName["Mover_Turned"] = 13] = "Mover_Turned";
    EventName[EventName["Mover_StartedMoving"] = 14] = "Mover_StartedMoving";
    EventName[EventName["Mover_StoppedMoving"] = 15] = "Mover_StoppedMoving";
    /* eslint-enable @typescript-eslint/camelcase */
})(EventName || (EventName = {}));
//# sourceMappingURL=EventName.js.map