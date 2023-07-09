class GameManager {
  private _eventBus: Phaser.Events.EventEmitter;
  private _game: Phaser.Game;

  constructor() {
    this._eventBus = new Phaser.Events.EventEmitter();
  }

  public getEventBus(): Phaser.Events.EventEmitter {
    return this._eventBus;
  }

  public get game(): Phaser.Game {
    return this._game;
  }

  init(game: Phaser.Game) {
    if (!!this._game) {
      throw new Error("GameManager already initialized");
    }
    this._game = game;
  }
}

export const GAME_MANAGER = new GameManager();
