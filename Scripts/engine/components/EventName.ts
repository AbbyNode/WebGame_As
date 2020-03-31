export enum EventName {
	/* eslint-disable @typescript-eslint/camelcase */

	// GameObject
	GameObject_Init,
	GameObject_Update,
	GameObject_Destroy,

	// Transform
	Transform_PositionChange,

	// PlayerController

	// Collider
	Collider_RequestMove,
	Collider_CollidedFrame,
	Collider_CollidedTick,
	Collider_MoveRequestAccepted,
	Collider_MoveRequestDenied,
	Collider_TriggerEnter,
	Collider_TriggerExit,

	// Mover
	Mover_RequestStart,
	Mover_RequestStop,
	Mover_Turned,
	Mover_StartedMoving,
	Mover_StoppedMoving,

	/* eslint-enable @typescript-eslint/camelcase */
}
