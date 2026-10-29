import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../engine/Display';
import { Scene } from '../engine/Scene';
import type { GameContext } from '../game/GameContext';
import type { SceneMap } from '../game/SceneMap';

export class EndingScene extends Scene<SceneMap['ending']> {
  private panel: HTMLElement | null = null;

  constructor(private readonly game: GameContext) {
    super();
  }

  override enter(params: SceneMap['ending']): void {
    const panel = document.createElement('section');
    panel.className = `panel ending-panel ${params.result === 'success' ? 'ending-success' : 'ending-failure'}`;

    const eyebrow = document.createElement('p');
    eyebrow.className = 'ending-eyebrow';
    eyebrow.textContent = 'FIM DA TRANSMISSÃO · APOLLO';

    const heading = document.createElement('h2');
    heading.textContent = params.result === 'success' ? 'Missão concluída' : 'A missão foi interrompida';

    const text = document.createElement('p');
    text.textContent = params.result === 'success'
      ? 'Você manteve as tarefas essenciais em ordem e ajudou o computador de bordo a continuar operando. A missão chegou ao seu objetivo — um lembrete do poder da preparação, da colaboração e do software bem pensado.'
      : 'A memória ficou sobrecarregada antes que todas as tarefas essenciais fossem resolvidas. Na missão Apollo, cada prioridade importava. Tente novamente e reorganize as tarefas para proteger o computador de bordo.';

    const note = document.createElement('p');
    note.className = 'ending-note';
    note.textContent = 'A história de Margaret Hamilton mostra que o software também pode ser parte decisiva de uma grande conquista.';

    const again = document.createElement('button');
    again.className = 'button ending-button';
    again.textContent = 'Jogar novamente';
    again.addEventListener('click', () => this.game.scenes.reset('title'));

    const credits = document.createElement('span');
    credits.className = 'ending-credits';
    credits.textContent = 'CIÊNCIA DELAS · MULHERES QUE TRANSFORMAM A CIÊNCIA';

    panel.append(eyebrow, heading, text, note, again, credits);
    this.game.ui.append(panel);
    this.panel = panel;
  }

  override exit(): void {
    this.panel?.remove();
    this.panel = null;
  }

  update(): void {}

  render(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createLinearGradient(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    gradient.addColorStop(0, '#111827');
    gradient.addColorStop(1, '#25182b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

    ctx.beginPath();
    ctx.arc(LOGICAL_WIDTH * 0.78, LOGICAL_HEIGHT * 0.32, LOGICAL_HEIGHT * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(226, 194, 216, .08)';
    ctx.fill();
  }
}
