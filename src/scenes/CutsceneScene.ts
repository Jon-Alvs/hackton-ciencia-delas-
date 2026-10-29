import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../engine/Display';
import { Scene } from '../engine/Scene';
import type { GameContext } from '../game/GameContext';

interface StoryFrame {
  eyebrow: string;
  title: string;
  body: string;
  detail: string;
  art: string;
  artLabel: string;
}

const FRAMES: StoryFrame[] = [
  {
    eyebrow: 'CAPÍTULO 01 · A CORRIDA ESPACIAL',
    title: 'Uma missão impossível?',
    body: 'Em 1969, a humanidade se preparava para dar um passo inédito: levar pessoas à Lua e trazê-las de volta em segurança.',
    detail: 'Cada decisão precisava funcionar a milhares de quilômetros da Terra.',
    art: 'earth',
    artLabel: 'A Terra vista do espaço',
  },
  {
    eyebrow: 'CAPÍTULO 02 · QUEM ESCREVEU O FUTURO',
    title: 'Conheça Margaret Hamilton',
    body: 'Enquanto foguetes e módulos eram construídos, equipes de engenheiras e engenheiros desenvolviam o software que guiaria a missão Apollo.',
    detail: 'Margaret Hamilton liderou uma equipe responsável por parte essencial desse trabalho.',
    art: 'portrait',
    artLabel: 'Retrato ilustrado de uma engenheira diante de códigos',
  },
  {
    eyebrow: 'CAPÍTULO 03 · CÓDIGO SOB PRESSÃO',
    title: 'Quando cada segundo importa',
    body: 'Durante a descida da Apollo 11, alarmes do computador apareceram. O sistema precisou priorizar tarefas importantes em meio à sobrecarga.',
    detail: 'O software ajudou a tripulação a continuar a missão com informações essenciais.',
    art: 'code',
    artLabel: 'Linhas de código e alertas de computador',
  },
  {
    eyebrow: 'CAPÍTULO 04 · SUA VEZ DE ENTRAR NA HISTÓRIA',
    title: 'A missão está em suas mãos',
    body: 'Agora você vai enfrentar uma versão inspirada nos desafios de gerenciamento de tarefas do computador de bordo.',
    detail: 'Organize as tarefas, proteja a memória e ajude a missão a chegar ao fim.',
    art: 'moon',
    artLabel: 'Módulo lunar sobre a superfície da Lua',
  },
];

export class CutsceneScene extends Scene {
  private panel: HTMLElement | null = null;
  private frameIndex = 0;
  private keyHandler: ((event: KeyboardEvent) => void) | null = null;

  constructor(private readonly game: GameContext) {
    super();
  }

  override enter(): void {
    this.frameIndex = 0;
    const panel = document.createElement('section');
    panel.className = 'cutscene';
    panel.setAttribute('aria-label', 'Introdução cinematográfica');
    this.game.ui.append(panel);
    this.panel = panel;

    this.keyHandler = (event: KeyboardEvent) => {
      // Botões já têm ativação nativa por teclado; evita avançar duas cenas no mesmo Enter.
      if (event.target instanceof HTMLButtonElement) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.next();
      } else if (event.key === 'Escape') {
        this.startGame();
      }
    };
    window.addEventListener('keydown', this.keyHandler);
    this.renderFrame();
  }

  override exit(): void {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = null;
    this.panel?.remove();
    this.panel = null;
    document.body.classList.remove('in-cutscene');
  }

  update(): void {}

  render(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createLinearGradient(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    gradient.addColorStop(0, '#111827');
    gradient.addColorStop(0.55, '#17152a');
    gradient.addColorStop(1, '#25182b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

    // Campo de estrelas discreto, desenhado sem imagens externas.
    for (let i = 0; i < 58; i++) {
      const x = (i * 137 + 47) % LOGICAL_WIDTH;
      const y = (i * 71 + 19) % LOGICAL_HEIGHT;
      const radius = i % 7 === 0 ? 1.8 : 0.8;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = i % 5 === 0 ? 'rgba(238, 199, 146, .8)' : 'rgba(235, 230, 255, .48)';
      ctx.fill();
    }
  }

  private renderFrame(): void {
    const panel = this.panel;
    if (!panel) return;
    const frame = FRAMES[this.frameIndex];
    if (!frame) return;
    document.body.classList.add('in-cutscene');
    panel.dataset.art = frame.art;
    panel.innerHTML = '';

    const top = document.createElement('div');
    top.className = 'cutscene-top';
    const brand = document.createElement('span');
    brand.className = 'cutscene-brand';
    brand.textContent = 'CIÊNCIA DELAS';
    const skip = document.createElement('button');
    skip.className = 'cutscene-skip';
    skip.type = 'button';
    skip.textContent = 'Pular introdução ↗';
    skip.addEventListener('click', () => this.startGame());
    top.append(brand, skip);

    const progress = document.createElement('div');
    progress.className = 'cutscene-progress';
    progress.setAttribute('aria-label', `Cena ${this.frameIndex + 1} de ${FRAMES.length}`);
    FRAMES.forEach((_, index) => {
      const segment = document.createElement('span');
      segment.className = index <= this.frameIndex ? 'is-active' : '';
      progress.append(segment);
    });

    const content = document.createElement('div');
    content.className = 'cutscene-content';

    const copy = document.createElement('div');
    copy.className = 'cutscene-copy';
    const eyebrow = document.createElement('p');
    eyebrow.className = 'cutscene-eyebrow';
    eyebrow.textContent = frame.eyebrow;
    const heading = document.createElement('h1');
    heading.textContent = frame.title;
    const body = document.createElement('p');
    body.className = 'cutscene-body';
    body.textContent = frame.body;
    const detail = document.createElement('p');
    detail.className = 'cutscene-detail';
    detail.textContent = frame.detail;
    copy.append(eyebrow, heading, body, detail);

    const art = document.createElement('div');
    art.className = `cutscene-art art-${frame.art}`;
    art.setAttribute('role', 'img');
    art.setAttribute('aria-label', frame.artLabel);
    const artObject = document.createElement('div');
    artObject.className = 'art-object';
    const artGlow = document.createElement('div');
    artGlow.className = 'art-glow';
    const artLabel = document.createElement('span');
    artLabel.className = 'art-caption';
    artLabel.textContent = frame.artLabel;
    art.append(artGlow, artObject, artLabel);
    content.append(copy, art);

    const bottom = document.createElement('div');
    bottom.className = 'cutscene-bottom';
    const hint = document.createElement('span');
    hint.className = 'cutscene-hint';
    hint.textContent = 'ENTER ou ESPAÇO para continuar';
    const next = document.createElement('button');
    next.className = 'button cutscene-next';
    next.type = 'button';
    next.textContent = this.frameIndex === FRAMES.length - 1 ? 'Iniciar missão' : 'Continuar';
    next.addEventListener('click', () => this.next());
    bottom.append(hint, next);

    panel.append(top, progress, content, bottom);
    next.focus({ preventScroll: true });
  }

  private next(): void {
    if (this.frameIndex >= FRAMES.length - 1) {
      this.startGame();
      return;
    }
    this.frameIndex += 1;
    this.renderFrame();
  }

  private startGame(): void {
    this.game.scenes.replace('game');
  }
}
