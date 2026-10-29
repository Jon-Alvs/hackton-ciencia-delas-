import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../engine/Display';
import { Scene } from '../engine/Scene';
import type { GameContext } from '../game/GameContext';
import type { SceneMap } from '../game/SceneMap';

/** Tela final acessível após qualquer resultado da partida. */
export class EndingScene extends Scene<SceneMap['ending']> {
  private panel: HTMLElement | null = null;

  constructor(private readonly game: GameContext) { super(); }

  override enter(params: SceneMap['ending']): void {
    const success = params.result === 'success';
    const panel = document.createElement('section');
    panel.className = 'panel ending-panel';
    panel.setAttribute('aria-label', 'Resultado da missão');

    const eyebrow = document.createElement('span');
    eyebrow.className = 'ending-eyebrow';
    eyebrow.textContent = 'MISSÃO APOLLO · RESULTADO';

    const heading = document.createElement('h2');
    heading.textContent = success ? 'Missão concluída!' : 'A missão terminou';
    const message = document.createElement('p');
    message.textContent = success
      ? 'Você ajudou a priorizar as tarefas essenciais. Que tal viver a missão novamente?'
      : 'Nem toda missão sai como planejado. Tente outra vez e descubra novas estratégias!';

    const actions = document.createElement('div');
    actions.className = 'ending-actions';

    const replay = document.createElement('button');
    replay.type = 'button';
    replay.className = 'button';
    replay.textContent = '↻ Jogar novamente';
    replay.addEventListener('click', () => this.game.scenes.reset('game'));

    const home = document.createElement('button');
    home.type = 'button';
    home.className = 'button button-secondary';
    home.textContent = '⌂ Voltar ao início';
    home.addEventListener('click', () => this.game.scenes.reset('title'));

    actions.append(replay, home);
    panel.append(eyebrow, heading, message, actions);
    this.game.ui.append(panel);
    this.panel = panel;
    replay.focus();
  }

  override exit(): void { this.panel?.remove(); this.panel = null; }
  update(): void {}
  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#382440';
    ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  }
}
