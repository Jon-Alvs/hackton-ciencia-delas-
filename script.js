(() => {
  const $ = (selector) => document.querySelector(selector);

  // Curiosidade do topo: há uma alternativa local caso fatos.js não carregue.
  const fatosLocais = [
    "Margaret Hamilton liderou a equipe responsável pelo software de voo das missões Apollo.",
    "Os alarmes 1201 e 1202 indicavam sobrecarga de recursos do computador de orientação.",
    "O software da Apollo foi projetado para priorizar tarefas importantes durante a descida lunar."
  ];
  const listaFatos = (typeof FATOS !== "undefined" && Array.isArray(FATOS) && FATOS.length) ? FATOS : fatosLocais;
  let indiceFato = Math.floor(Date.now() / 86400000) % listaFatos.length;
  const textoFato = $("#fato-txt");
  const mostrarFato = () => { if (textoFato) textoFato.textContent = listaFatos[indiceFato]; };
  $("#fato-next")?.addEventListener("click", () => {
    indiceFato = (indiceFato + 1) % listaFatos.length;
    mostrarFato();
  });
  mostrarFato();

  const historias = [
    {
      data: "Década de 1960",
      titulo: "Antes de chegar à Lua",
      imagem: "assets/saturn-v.svg",
      alt: "Ilustração do foguete Saturn V na plataforma de lançamento",
      legenda: "O foguete Saturn V",
      paragrafos: [
        "Para levar astronautas à Lua e trazê-los de volta com segurança, a NASA precisava de foguetes, equipamentos e um sistema de software confiável.",
        "O computador de bordo tinha recursos muito limitados para os padrões atuais. Cada tarefa precisava ser planejada com cuidado."
      ],
      citacao: "A exploração espacial também depende de decisões tomadas em linhas de código."
    },
    {
      data: "Uma pioneira da computação",
      titulo: "Quem foi Margaret Hamilton?",
      imagem: "assets/margaret-hamilton.svg",
      alt: "Ilustração de Margaret Hamilton junto a listagens de código",
      legenda: "Margaret Hamilton e o código da Apollo",
      paragrafos: [
        "Margaret Hamilton foi uma matemática e cientista da computação que liderou a equipe do MIT Instrumentation Laboratory responsável pelo software de voo das missões Apollo.",
        "Seu trabalho ajudou a consolidar a engenharia de software como uma área essencial para sistemas complexos e críticos."
      ],
      citacao: "Não bastava fazer o computador funcionar: era preciso prepará-lo para o inesperado."
    },
    {
      data: "Planejar para o inesperado",
      titulo: "E se algo desse errado?",
      imagem: "assets/codigo-apollo.svg",
      alt: "Ilustração de listagens e documentos de programação da Apollo",
      legenda: "O planejamento por trás do software",
      paragrafos: [
        "O que aconteceria se o computador recebesse solicitações demais ao mesmo tempo? Como distinguir o que era urgente do que poderia esperar?",
        "A equipe desenvolveu o software para lidar com determinadas situações de sobrecarga, priorizando as tarefas essenciais em vez de simplesmente abandonar a missão."
      ],
      citacao: "Sistemas confiáveis são projetados pensando também nos momentos difíceis."
    },
    {
      data: "20 de julho de 1969",
      titulo: "Alarmes durante a descida",
      imagem: "assets/eagle-descida.svg",
      alt: "Ilustração do módulo lunar Eagle durante a descida",
      legenda: "O módulo lunar Eagle se aproxima da superfície",
      paragrafos: [
        "Durante a descida da Apollo 11, o computador de orientação emitiu os alarmes 1201 e 1202, relacionados à sobrecarga de recursos.",
        "O software priorizou tarefas importantes, e a equipe de controle avaliou as informações para decidir se a descida poderia continuar."
      ],
      citacao: "Em uma missão crítica, informação clara e decisões rápidas fazem diferença."
    },
    {
      data: "Uma conquista coletiva",
      titulo: "A equipe por trás da missão",
      imagem: "assets/sala-de-controle.svg",
      alt: "Ilustração de uma sala de controle de missão espacial",
      legenda: "A equipe de controle em ação",
      paragrafos: [
        "O pouso da Apollo 11 foi resultado do trabalho conjunto de astronautas, engenheiros, programadores, técnicos e equipes de controle.",
        "A contribuição de Hamilton foi importante, mas a história também pertence às muitas pessoas que trabalharam para tornar a missão possível."
      ],
      citacao: "Grandes conquistas são construídas por muitas mãos."
    },
    {
      data: "20 de julho de 1969",
      titulo: "Um passo histórico",
      imagem: "assets/eagle-na-lua.svg",
      alt: "Ilustração do módulo lunar Eagle na superfície da Lua",
      legenda: "O Eagle na superfície lunar",
      paragrafos: [
        "O módulo lunar Eagle pousou na Lua e a Apollo 11 entrou para a história. A missão mostrou a importância de combinar tecnologia, planejamento e colaboração.",
        "Em 2016, Margaret Hamilton recebeu a Medalha Presidencial da Liberdade por suas contribuições ao programa espacial dos Estados Unidos."
      ],
      citacao: "O legado de Margaret inspira quem transforma perguntas difíceis em soluções."
    }
  ];

  // Histórias curtas em quadros: as cenas de Margaret preservam o conteúdo original.
  const quadro = (data, titulo, paragrafos, citacao, simbolo, legenda) => ({data,titulo,paragrafos,citacao,simbolo,legenda});
  const colecao = {
    margaret: {nome:"Margaret Hamilton",decoracao:"APOLLO 11 · 1969",cenas:historias},
    katherine: {nome:"Katherine Johnson",decoracao:"NASA · MATEMÁTICA",cenas:[
      quadro("1918 · Virgínia Ocidental","Uma curiosidade sem limites",["Desde cedo, Katherine demonstrou um talento extraordinário para os números. Sua família apoiou seus estudos em uma época de grandes barreiras raciais e de gênero."],"A curiosidade pode abrir caminhos onde antes havia obstáculos.","∑","Os primeiros passos de uma matemática"),
      quadro("1953 · NACA","Um lugar entre os cálculos",["Katherine começou a trabalhar na NACA, agência que antecedeu a NASA. Ela integrou equipes de matemáticas que realizavam cálculos essenciais para pesquisas aeronáuticas."],"Por trás de cada voo, havia muito trabalho matemático.","✎","Matemática em ação"),
      quadro("1962 · Missão orbital","A confiança nos números",["Antes do voo orbital de John Glenn, Katherine conferiu cálculos de trajetória feitos por computadores eletrônicos. Seu trabalho ajudou a validar os resultados."],"Precisão também é uma forma de coragem.","◌","Trajetórias para o espaço"),
      quadro("Um legado duradouro","A ciência também tem seu nome",["Katherine contribuiu para a exploração espacial e tornou-se uma referência para novas gerações de cientistas e matemáticas."],"O futuro da ciência precisa de muitos talentos.","✦","Uma inspiração para novas gerações")
    ]},
    ada: {nome:"Ada Lovelace",decoracao:"SÉCULO XIX · COMPUTAÇÃO",cenas:[
      quadro("1815 · Londres","Uma mente curiosa",["Ada Lovelace cresceu interessada em matemática e em máquinas, combinando imaginação e raciocínio lógico."],"A imaginação também faz parte da ciência.","✧","Imaginação e matemática"),
      quadro("Década de 1830","Conhecendo uma máquina extraordinária",["Ada conheceu as ideias de Charles Babbage para a Máquina Analítica, um projeto de máquina de calcular programável."],"E se uma máquina pudesse seguir instruções complexas?","⚙","A Máquina Analítica"),
      quadro("1843 · As notas","Muito além dos cálculos",["Ao traduzir um artigo sobre a Máquina Analítica, Ada acrescentou notas detalhadas, incluindo um algoritmo destinado à máquina. Ela também percebeu possibilidades além da aritmética."],"Programar começa com a capacidade de imaginar possibilidades.","⌘","As notas de Ada"),
      quadro("Seu legado","Uma pioneira da programação",["Seu trabalho é lembrado como um marco da história da computação, mesmo que a Máquina Analítica não tenha sido concluída em sua época."],"Grandes ideias podem atravessar séculos.","✦","Uma ideia à frente de seu tempo")
    ]},
    marie: {nome:"Marie Curie",decoracao:"RADIOATIVIDADE · CIÊNCIA",cenas:[
      quadro("1867 · Varsóvia","O desejo de estudar",["Marie Skłodowska nasceu na Polônia e enfrentou obstáculos para seguir sua formação científica. Mais tarde, estudou em Paris."],"Aprender pode ser um ato de perseverança.","✎","Uma jovem dedicada à ciência"),
      quadro("1898 · Paris","Novos elementos",["Marie e Pierre Curie anunciaram descobertas relacionadas ao polônio e ao rádio, ampliando as pesquisas sobre radioatividade."],"A natureza ainda guardava perguntas surpreendentes.","⚛","Investigações sobre a matéria"),
      quadro("1903 e 1911","Dois prêmios Nobel",["Marie recebeu o Nobel de Física em 1903, compartilhado com Pierre Curie e Henri Becquerel, e o Nobel de Química em 1911."],"Seu trabalho marcou mais de uma área da ciência.","✳","Reconhecimento científico"),
      quadro("Um legado científico","Descobertas que permanecem",["Suas pesquisas influenciaram a física, a química e aplicações médicas, embora a exposição à radiação também tenha revelado riscos importantes."],"Conhecimento e responsabilidade devem caminhar juntos.","✦","O legado de Marie Curie")
    ]},
    rosalind: {nome:"Rosalind Franklin",decoracao:"DNA · CRISTALOGRAFIA",cenas:[
      quadro("1920 · Londres","A ciência como escolha",["Rosalind Franklin estudou química e desenvolveu habilidades em pesquisa experimental e análise de materiais."],"Observar com rigor pode transformar perguntas em descobertas.","◇","A formação de uma pesquisadora"),
      quadro("Década de 1950","Investigando o DNA",["No King's College London, Rosalind estudou fibras de DNA por difração de raios X, produzindo dados importantes sobre sua estrutura."],"Uma imagem pode revelar pistas invisíveis aos olhos.","✳","Pesquisa com raios X"),
      quadro("1952 · Fotografia 51","Uma pista decisiva",["A célebre Fotografia 51, obtida por Raymond Gosling sob supervisão de Franklin, ajudou a compreender a estrutura helicoidal do DNA."],"Cada detalhe experimental importa.","⌁","A estrutura do DNA"),
      quadro("Um legado reconhecido","Muito além de uma fotografia",["Rosalind também pesquisou carvão, grafite e vírus. Sua contribuição à biologia estrutural é hoje amplamente reconhecida."],"A ciência avança com dados, cuidado e colaboração.","✦","O legado de Rosalind Franklin")
    ]},
    dorothy: {nome:"Dorothy Vaughan",decoracao:"NASA · COMPUTAÇÃO",cenas:[
      quadro("1910 · Missouri","Uma trajetória de dedicação",["Dorothy Vaughan estudou matemática e trabalhou como professora antes de ingressar na pesquisa aeronáutica."],"O conhecimento pode abrir novas oportunidades.","∑","Matemática e educação"),
      quadro("1943 · Langley","Uma equipe de matemáticas",["Dorothy entrou na NACA, onde mulheres realizavam cálculos fundamentais para pesquisas sobre aeronaves."],"A ciência é feita por equipes.","✎","Cálculos para a aeronáutica"),
      quadro("1949 · Liderança","Abrindo caminhos",["Dorothy tornou-se supervisora do grupo West Area Computing, destacando-se como uma das primeiras mulheres negras a ocupar uma função de supervisão na NACA."],"Liderar também é criar espaço para outras pessoas.","♡","Liderança na pesquisa"),
      quadro("Era dos computadores","Aprender para transformar",["Com a chegada dos computadores eletrônicos, Dorothy se dedicou à programação, incluindo FORTRAN, e ajudou colegas na transição tecnológica."],"Aprender algo novo pode transformar uma equipe inteira.","⌘","Novas linguagens, novos caminhos")
    ]},
    wu: {nome:"Chien-Shiung Wu",decoracao:"FÍSICA · EXPERIMENTOS",cenas:[
      quadro("1912 · China","A paixão pela física",["Chien-Shiung Wu nasceu na China e seguiu seus estudos científicos nos Estados Unidos, onde se tornou uma física experimental de destaque."],"Perguntas difíceis merecem experimentos cuidadosos.","☼","O início de uma trajetória"),
      quadro("Década de 1940","Pesquisa e precisão",["Wu realizou estudos importantes em física nuclear e contribuiu para trabalhos ligados ao Projeto Manhattan durante a Segunda Guerra Mundial."],"A precisão experimental é essencial para a ciência.","⚛","Pesquisas em física nuclear"),
      quadro("1956–1957","Um experimento surpreendente",["Wu liderou um experimento com decaimento beta que mostrou a violação da conservação da paridade na interação fraca, contrariando uma suposição aceita até então."],"A ciência precisa testar até mesmo as ideias mais estabelecidas.","↔","O experimento de Wu"),
      quadro("Um legado essencial","Uma referência na física",["Seu trabalho transformou a física de partículas e inspirou novas gerações de pesquisadoras."],"Descobrir é também ter coragem de questionar.","✦","O legado de Chien-Shiung Wu")
    ]}
  };
  let cientistaAtual = "margaret";
  let atual = 0;
  const imagem = $("#story-image"), simbolo = $("#story-art-symbol"), titulo = $("#story-title");
  const data = $("#story-date"), texto = $("#story-text"), citacao = $("#story-quote");
  const anterior = $("#story-prev"), proximo = $("#story-next"), pontos = $("#story-dots");
  const numero = $("#story-number"), total = $("#story-total"), legenda = $("#story-image-caption");
  const palco = $("#cutscene-stage");
  function renderizarPontos() {
    pontos.replaceChildren();
    colecao[cientistaAtual].cenas.forEach((cena, indice) => {
      const ponto = document.createElement("button");
      ponto.type = "button";
      ponto.className = indice === atual ? "active" : "";
      ponto.setAttribute("aria-label", `Ir para a cena ${indice + 1}: ${cena.titulo}`);
      if (indice === atual) ponto.setAttribute("aria-current", "step");
      ponto.addEventListener("click", () => { atual = indice; renderizarHistoria(); });
      pontos.append(ponto);
    });
  }
  function renderizarHistoria() {
    const biografia = colecao[cientistaAtual], cena = biografia.cenas[atual];
    palco.classList.remove("scene-enter"); void palco.offsetWidth; palco.classList.add("scene-enter");
    imagem.hidden = !cena.imagem;
    simbolo.hidden = Boolean(cena.imagem);
    if (cena.imagem) { imagem.src = cena.imagem; imagem.alt = cena.alt; }
    else simbolo.textContent = cena.simbolo || "✦";
    legenda.textContent = cena.legenda;
    titulo.textContent = cena.titulo;
    data.textContent = cena.data;
    texto.replaceChildren();
    cena.paragrafos.forEach(paragrafo => { const p = document.createElement("p"); p.textContent = paragrafo; texto.append(p); });
    citacao.textContent = cena.citacao;
    numero.textContent = String(atual + 1).padStart(2, "0");
    total.textContent = String(biografia.cenas.length).padStart(2, "0");
    $("#scene-person").textContent = biografia.nome.toUpperCase();
    $("#scene-label").textContent = `CENA ${String(atual + 1).padStart(2,"0")} / ${String(biografia.cenas.length).padStart(2,"0")}`;
    $("#scene-decoration").textContent = biografia.decoracao;
    anterior.disabled = atual === 0;
    proximo.disabled = atual === biografia.cenas.length - 1;
    $("#story-replay").hidden = atual !== biografia.cenas.length - 1;
    renderizarPontos();
  }
  function trocarCientista(chave) {
    if (!colecao[chave]) return;
    cientistaAtual = chave; atual = 0;
    document.querySelectorAll("[data-scientist]").forEach(botao => {
      const selecionado = botao.dataset.scientist === chave;
      botao.classList.toggle("selected", selecionado);
      botao.setAttribute("aria-pressed", String(selecionado));
    });
    $("#selected-scientist-heading").textContent = `A história de ${colecao[chave].nome}`;
    renderizarHistoria();
    $("#historia").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",block:"start"});
  }
  document.querySelectorAll("[data-scientist]").forEach(botao => botao.addEventListener("click", () => trocarCientista(botao.dataset.scientist)));
  anterior.addEventListener("click", () => { if (atual > 0) { atual--; renderizarHistoria(); } });
  proximo.addEventListener("click", () => { if (atual < colecao[cientistaAtual].cenas.length - 1) { atual++; renderizarHistoria(); } });
  $("#story-replay").addEventListener("click", () => { atual = 0; renderizarHistoria(); });
  document.addEventListener("keydown", evento => {
    if (!palco.contains(document.activeElement)) return;
    if (evento.target.matches("input, textarea, select, button, a")) return;
    if (evento.key === "ArrowRight" && atual < colecao[cientistaAtual].cenas.length - 1) { evento.preventDefault(); atual++; renderizarHistoria(); }
    if (evento.key === "ArrowLeft" && atual > 0) { evento.preventDefault(); atual--; renderizarHistoria(); }
  });
  renderizarHistoria();

  // Navegação compacta em telas pequenas.
  const menu = $("#main-nav");
  const botaoMenu = $("#menu-toggle");
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("open");
    botaoMenu.setAttribute("aria-expanded", "false");
  }));

  // Formulário: a mensagem só é confirmada como enviada quando o Formspree responder.
  const form = $("#form");
  const mensagem = $("#form-msg");
  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensagem.className = "form-message";
    if (!form.elements.mensagem.value.trim()) {
      mensagem.textContent = "Escreva uma mensagem antes de enviar.";
      mensagem.classList.add("error");
      return;
    }
    if (form.action.includes("SEU_ID_AQUI")) {
      mensagem.textContent = "O formulário ainda não está conectado. Configure seu ID do Formspree para receber mensagens.";
      mensagem.classList.add("error");
      return;
    }
    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;
    botao.style.opacity = ".65";
    try {
      const resposta = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!resposta.ok) throw new Error("Falha ao enviar");
      mensagem.textContent = "Obrigada! Sua mensagem foi enviada.";
      form.reset();
    } catch {
      mensagem.textContent = "Não foi possível enviar agora. Confira sua conexão e tente novamente.";
      mensagem.classList.add("error");
    } finally {
      botao.disabled = false;
      botao.style.opacity = "";
    }
  });
})();