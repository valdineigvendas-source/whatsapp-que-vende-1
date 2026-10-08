import { AttendanceSituation } from '../types';

export const REAL_ESTATE_FAO_SITUATIONS: AttendanceSituation[] = [
  {
    id: 'fao-sit-1',
    number: 1,
    title: 'Primeiro Contato & Abordagem Rápida',
    stageName: 'Abordagem Inicial',
    description: 'Quando o lead chega por anúncios no Instagram/Facebook, portais (ZAP, VivaReal) ou manda "Olá, tenho interesse".',
    faoPillar: 'Filtro (F)',
    iconName: 'MessageSquarePlus',
    options: [
      {
        id: 'opt-1-1',
        title: 'Opção 1: Consultiva Padrão FAO (Acolhimento + Filtro Imediato)',
        tone: 'Consultivo',
        text: `Olá, [Nome]! Tudo bem? Aqui é o [Seu Nome], consultor imobiliário.

Vi que você demonstrou interesse no [Nome do Imóvel / Região]. Já separei as fotos em alta resolução e os detalhes da planta aqui comigo!

Só para eu te orientar da forma mais precisa: você busca esse imóvel para moradia da sua família ou para investimento e valorização patrimonial?`,
        whenToUse: 'Ideal para 90% dos leads vindos de portais ou anúncios com formulário preenchido.',
        whyItWorks: 'Não despeja um PDF frio de 30 páginas. Cumprimenta com simpatia e devolve uma pergunta com duas alternativas claras, fazendo o lead responder rapidamente.',
        faoPillar: 'Filtro (F)',
      },
      {
        id: 'opt-1-2',
        title: 'Opção 2: Resposta para quem perguntou apenas: "Qual o valor / Preço?"',
        tone: 'Persuasivo',
        text: `Olá, [Nome]! Tudo bem? Posso te passar o valor exato e a tabela completa agora sim!

Antes, me conta rapidinho só para eu não te passar nada fora da sua realidade: você procura uma unidade com quantos quartos para atender o que você precisa hoje?`,
        whenToUse: 'Quando o lead é seco e manda apenas "Preço?", "Quanto custa?" ou "Valor?".',
        whyItWorks: 'Evita a síndrome de "passar preço e o cliente sumir". Valida que você vai passar o valor, mas ganha o direito de fazer uma pergunta de alinhamento antes.',
        faoPillar: 'Filtro (F)',
      },
      {
        id: 'opt-1-3',
        title: 'Opção 3: Quebra de Gelo Noturna ou Lead Fora de Horário',
        tone: 'Empático',
        text: `Oi, [Nome]! Vi seu recado sobre o imóvel no [Bairro/Condomínio]. Já salvei seu contato por aqui!

Para você não receber mensagem fora de hora, quando fica melhor conversarmos rapidamente para eu te enviar os vídeos e detalhes: amanhã pela manhã (por volta das 10h) ou no início da tarde?`,
        whenToUse: 'Quando o lead enviou mensagem tarde da noite ou no domingo.',
        whyItWorks: 'Demonstra respeito extremo pelo tempo do cliente e já agenda o próximo contato sem parecer vendedor ansioso.',
        faoPillar: 'Alinhamento (A)',
      },
    ],
  },
  {
    id: 'fao-sit-2',
    number: 2,
    title: 'Diagnóstico & Filtro de Necessidades',
    stageName: 'Filtro do Perfil',
    description: 'Perguntas estratégicas para descobrir tamanho da família, configuração de quartos, lazer e momento de compra.',
    faoPillar: 'Filtro (F)',
    iconName: 'HelpCircle',
    options: [
      {
        id: 'opt-2-1',
        title: 'Opção 1: Filtro de Espaço & Composição Familiar',
        tone: 'Consultivo',
        text: `Perfeito, [Nome]! Para eu selecionar as plantas que fazem mais sentido para você e te poupar tempo:

Quantas pessoas vão morar com você e quantos dormitórios/suítes são essenciais para manter o conforto da sua rotina?`,
        whenToUse: 'Logo após o lead confirmar que busca imóvel para moradia própria.',
        whyItWorks: 'Mostra preocupação genuína com a rotina e a família dele, evitando enviar opções irrelevantes.',
        faoPillar: 'Filtro (F)',
      },
      {
        id: 'opt-2-2',
        title: 'Opção 2: Filtro de Localização & Mobilidade',
        tone: 'Direto',
        text: `Entendi perfeitamente! E quanto à localização na região:

Proximidade de escolas, vias de acesso rápido ou facilidade para o trabalho é um critério inegociável para você, ou você prioriza mais a tranquilidade e silêncio do condomínio?`,
        whenToUse: 'Quando o cliente está em dúvida sobre o bairro ou quer avaliar mais de uma região.',
        whyItWorks: 'Mapeia a real prioridade de estilo de vida por trás da busca por endereço.',
        faoPillar: 'Filtro (F)',
      },
      {
        id: 'opt-2-3',
        title: 'Opção 3: Filtro de Momento & Prazo de Mudança',
        tone: 'Consultivo',
        text: `Uma pergunta chave, [Nome]:

Você tem prazo imediato para se mudar (precisa do imóvel pronto para morar) ou tem tranquilidade para aguardar a entrega de um projeto na planta com fluxo de pagamento facilitado?`,
        whenToUse: 'Para definir se você vai ofertar estoque pronto ou lançamentos em construção.',
        whyItWorks: 'Evita oferecer imóvel na planta para quem foi despejado ou precisa casar em 60 dias.',
        faoPillar: 'Filtro (F)',
      },
    ],
  },
  {
    id: 'fao-sit-3',
    number: 3,
    title: 'Qualificação Financeira & Forma de Pagamento',
    stageName: 'Filtro de Viabilidade',
    description: 'Como sondar financiamento, FGTS, recursos próprios e permuta sem constranger o comprador.',
    faoPillar: 'Filtro (F)',
    iconName: 'BadgeDollarSign',
    options: [
      {
        id: 'opt-3-1',
        title: 'Opção 1: Investigação Elegante de Financiamento Bancário',
        tone: 'Consultivo',
        text: `[Nome], para eu desenhar o fluxo financeiro mais confortável para o seu planejamento:

Você pretende utilizar financiamento bancário com FGTS, ou a aquisição será feita com recursos próprios / à vista? Se for financiamento, você já tem alguma carta de crédito pré-aprovada?`,
        whenToUse: 'Quando a conversa já avançou e você precisa entender a viabilidade de crédito.',
        whyItWorks: 'Trata o financiamento como estratégia de planejamento inteligente, sem tom de desconfiança.',
        faoPillar: 'Filtro (F)',
      },
      {
        id: 'opt-3-2',
        title: 'Opção 2: Sondagem de Permuta (Imóvel ou Carro na Entrada)',
        tone: 'Direto',
        text: `Entendi! E me diz uma coisa: você possui algum imóvel ou veículo que pretenda colocar na negociação como parte de pagamento, ou a entrada será 100% financeira?`,
        whenToUse: 'Para antecipar a maior surpresa de negociações imobiliárias: o cliente querer empurrar um lote ou carro usado na reta final.',
        whyItWorks: 'Isola a questão da permuta antes de gastar energia apresentando imóveis que não aceitam troca.',
        faoPillar: 'Filtro (F)',
      },
      {
        id: 'opt-3-3',
        title: 'Opção 3: Calibragem de Parcela Mensal Planejada',
        tone: 'Empático',
        text: `Excelente! Para não te mostrar nada fora do que você desenhou:

Qual é a faixa de investimento total ou valor de parcela mensal que fica confortável para o seu orçamento hoje, sem apertar a sua família?`,
        whenToUse: 'Para definir o teto do cliente de forma humanizada e empática.',
        whyItWorks: 'Foca no conforto da família em vez de perguntar secamente "Quanto você ganha?".',
        faoPillar: 'Filtro (F)',
      },
    ],
  },
  {
    id: 'fao-sit-4',
    number: 4,
    title: 'Apresentação do Imóvel & Ancoragem de Valor',
    stageName: 'Alinhamento & Desejo',
    description: 'Como apresentar as características do imóvel conectando com os desejos revelados no filtro.',
    faoPillar: 'Alinhamento (A)',
    iconName: 'Sparkles',
    options: [
      {
        id: 'opt-4-1',
        title: 'Opção 1: Apresentação Foco Família & Qualidade de Vida',
        tone: 'Persuasivo',
        text: `[Nome], lembrei exatamente do que você me falou sobre espaço para as crianças e segurança!

Essa unidade tem [X] m², [X] suítes amplas e uma varanda gourmet com vista livre que recebe o sol da manhã. Além disso, o condomínio conta com piscina aquecida, quadra e segurança 24h blindada.

Gravei um tour em vídeo de 40 segundos mostrando a amplitude da sala. Dá uma olhada e me diz o que achou! 👇`,
        whenToUse: 'Ao enviar os materiais do imóvel selecionado após a qualificação.',
        whyItWorks: 'Liga as características do imóvel diretamente às dores e desejos que o cliente confessou.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-4-2',
        title: 'Opção 2: Apresentação Foco Investidor & Rentabilidade',
        tone: 'Direto',
        text: `[Nome], analisando os números desta oportunidade:

O valor do metro quadrado aqui está [X]% abaixo da média dos empreendimentos vizinhos, e a taxa de vacância na região é quase zero para locação. A estimativa conservadora de rentabilidade é de [X]% a.a. + a valorização da entrega das chaves.

Vale muito a pena analisarmos a lâmina de rentabilidade!`,
        whenToUse: 'Para clientes com perfil de investimento e patrimônio.',
        whyItWorks: 'Usa a linguagem fria de retorno sobre investimento (ROI), metro quadrado e liquidez.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-4-3',
        title: 'Opção 3: Apresentação com Condição Diferenciada da Construtora',
        tone: 'Consultivo',
        text: `[Nome], consegui uma condição excepcional diretamente com a diretoria da construtora para essa semana:

Entrada parcelada em [X] vezes direto na tabela pré-chaves, com desconto exclusivo de [X] reais na unidade do andar intermediário. Essa condição não está aberta no site público.

Você gostaria de aproveitar essa janela de oportunidade?`,
        whenToUse: 'Para criar senso de oportunidade e exclusividade VIP.',
        whyItWorks: 'Ativa o gatilho da exclusividade e do acesso privilegiado via corretor.',
        faoPillar: 'Alinhamento (A)',
      },
    ],
  },
  {
    id: 'fao-sit-5',
    number: 5,
    title: 'Isolamento de Objeções (O Pilar Chave do Método FAO)',
    stageName: 'Isolamento Pré-Visita',
    description: 'A pergunta de ouro do SDR: identificar e neutralizar travas ANTES de marcar a visita, garantindo alto comparecimento.',
    faoPillar: 'Objeção & Agendamento (O)',
    iconName: 'ShieldAlert',
    options: [
      {
        id: 'opt-5-1',
        title: 'Opção 1: Isolamento de Critérios Decisivos (Pergunta Clássica FAO)',
        tone: 'Consultivo',
        text: `[Nome], deixa eu te fazer uma pergunta bem transparente:

Se esse imóvel atender tudo o que você me pediu na prática, a planta agradar e a localização for exatamente o que sua família busca, teria mais algum detalhe ou impedimento que te impediria de avançar?`,
        whenToUse: 'Antes de propor o dia e horário da visita.',
        whyItWorks: 'Se o cliente tiver qualquer objeção oculta (dinheiro preso, cônjuge resistente, indecisão), ele vai falar agora. Isso poupa viagens perdidas.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
      {
        id: 'opt-5-2',
        title: 'Opção 2: Isolamento do Cônjuge ou Decisor Compartilhado',
        tone: 'Consultivo',
        text: `Perfeito! E me conta: além de você, tem mais alguém que decide essa compra com você, como esposo(a), noivo(a) ou sócio?

Pergunto porque uma decisão tão importante fica muito mais fácil quando as duas pessoas olham juntas no mesmo momento!`,
        whenToUse: 'Para garantir que o decisor real participe do processo.',
        whyItWorks: 'Elimina a desculpa número 1 do mercado: "Vou falar com minha esposa e depois te ligo".',
        faoPillar: 'Objeção & Agendamento (O)',
      },
      {
        id: 'opt-5-3',
        title: 'Opção 3: Isolamento Financeiro e de Fluxo',
        tone: 'Direto',
        text: `Se a simulação financeira e o fluxo de pagamento ficarem exatamente dentro da parcela que combinamos, você estaria pronto para dar o próximo passo ou ainda depende de alguma outra venda/recurso?`,
        whenToUse: 'Para clientes que dizem que dependem de vender um lote ou esperar rescisão.',
        whyItWorks: 'Separa o comprador quente do comprador que só poderá fechar daqui a 12 meses.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
    ],
  },
  {
    id: 'fao-sit-6',
    number: 6,
    title: 'Venda da Visita Presencial (Agendamento Estratégico)',
    stageName: 'Agendamento de Visita',
    description: 'Imóvel se vende ao vivo! Condução para a visita usando a técnica da dupla opção de horário e local.',
    faoPillar: 'Objeção & Agendamento (O)',
    iconName: 'CheckCircle2',
    options: [
      {
        id: 'opt-6-1',
        title: 'Opção 1: Dupla Opção de Horário no Meio de Semana',
        tone: 'Persuasivo',
        text: `[Nome], fotos e plantas no WhatsApp ajudam muito, mas a energia do imóvel, a luz do sol batendo na sala e a acústica você só sente pisando lá dentro.

Para a gente dar esse pulo lá sem pressa: para você fica melhor amanhã às 12h30 (no almoço) ou às 17h30 no final do dia?`,
        whenToUse: 'Para agendar durante a semana.',
        whyItWorks: 'Técnica da dupla alternativa. Em vez de perguntar "Quer visitar?", você pergunta "Qual horário prefere?". O cérebro escolhe entre as duas opções.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
      {
        id: 'opt-6-2',
        title: 'Opção 2: Dupla Opção para Final de Semana',
        tone: 'Consultivo',
        text: `Final de semana é o momento mais tranquilo para visitar com calma e sentir o clima do condomínio e da vizinhança.

Você prefere no sábado pela manhã às 10h00 ou no domingo às 11h30? Já deixo a autorização de entrada pronta na portaria para você!`,
        whenToUse: 'Para quem trabalha a semana inteira e precisa do sábado/domingo.',
        whyItWorks: 'Antecipa a autorização na portaria, transmitindo exclusividade e comodidade.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
      {
        id: 'opt-6-3',
        title: 'Opção 3: Dupla Opção de Ponto de Encontro',
        tone: 'Empático',
        text: `Para sua maior comodidade:

Você prefere que a gente se encontre diretamente na portaria do imóvel, ou prefere passar aqui no escritório para tomar um café e vermos a documentação antes de ir?`,
        whenToUse: 'Após o horário já estar alinhado, para definir a logística com conforto.',
        whyItWorks: 'Dá ao cliente total controle e conforto sobre a experiência de atendimento.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
    ],
  },
  {
    id: 'fao-sit-7',
    number: 7,
    title: 'Blindagem de Presença & Confirmação Anti-No-Show',
    stageName: 'Confirmação da Visita',
    description: 'Sequência de mensagens para garantir que o cliente compareça e não deixe o corretor esperando na portaria.',
    faoPillar: 'Alinhamento (A)',
    iconName: 'History',
    options: [
      {
        id: 'opt-7-1',
        title: 'Opção 1: Confirmação 24 Horas Antes com Reserva de Portaria',
        tone: 'Consultivo',
        text: `Oi, [Nome]! Tudo bem por aí?

Passando só para te avisar que já alinhei nossa visita de amanhã às [Horário] com o proprietário/portaria. Já deixei a vaga de visitante liberada para o seu carro.

O(A) seu/sua parceiro(a) vai conseguir ir com você também?`,
        whenToUse: 'No dia anterior à visita, no final da tarde.',
        whyItWorks: 'Menciona que a vaga e a portaria já foram reservadas, gerando compromisso moral recíproco e checando a presença do cônjuge.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-7-2',
        title: 'Opção 2: Envio de Localização & Ponto de Referência no Dia',
        tone: 'Direto',
        text: `Bom dia, [Nome]! Tudo bem?

Segue o link da localização exata do nosso encontro de hoje às [Horário]:
📍 [Link do Waze / Google Maps]

O condomínio fica bem em frente ao [Ponto de referência fácil]. Estarei te aguardando na portaria social. Qualquer imprevisto no trânsito, só me dar um toque por aqui! Até logo!`,
        whenToUse: 'Na manhã do dia da visita, 3 a 4 horas antes.',
        whyItWorks: 'Facilita a chegada, tira o atrito de localização e reconfirma a presença sem parecer chato.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-7-3',
        title: 'Opção 3: Lembrete de Cortesia 1 Hora Antes',
        tone: 'Empático',
        text: `[Nome], já cheguei no imóvel para abrir as janelas, conferir a ventilação e deixar tudo impecável para você! Te espero aqui às [Horário]. Venha com calma!`,
        whenToUse: '60 minutos antes do encontro.',
        whyItWorks: 'Se o cliente estava pensando em desmarcar em cima da hora, essa mensagem elimina a possibilidade porque o corretor já está lá dedicado a ele.',
        faoPillar: 'Alinhamento (A)',
      },
    ],
  },
  {
    id: 'fao-sit-8',
    number: 8,
    title: 'Contorno de Objeções Típicas do Mercado Imobiliário',
    stageName: 'Contorno de Objeções',
    description: 'Respostas prontas para as 5 maiores desculpas de clientes no WhatsApp de corretores.',
    faoPillar: 'Objeção & Agendamento (O)',
    iconName: 'ShieldAlert',
    options: [
      {
        id: 'opt-8-1',
        title: 'Objeção 1: "Só quero saber o endereço exato com número"',
        tone: 'Persuasivo',
        text: `[Nome], com certeza! O imóvel fica na [Rua/Avenida de referência], no bairro [Bairro], a duas quadras do [Ponto de referência].

Por questão de segurança dos atuais moradores e protocolo rígido da portaria, o número exato e a entrada só são liberados com autorização e acompanhamento prévio.

O que acha de darmos um pulo lá juntos amanhã às [Horário 1] ou [Horário 2]?`,
        whenToUse: 'Quando o lead insiste em saber o número exato para ir sozinho ou contornar o corretor.',
        whyItWorks: 'Dá a localização aproximada sem entregar o número exato, justificando pela segurança dos moradores.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
      {
        id: 'opt-8-2',
        title: 'Objeção 2: "Vou passar de carro na frente e olhar por fora primeiro"',
        tone: 'Consultivo',
        text: `Super compreensível, [Nome]! Mas deixa eu te dar uma dica sincera de quem conhece o mercado:

A fachada e a rua não mostram o silêncio interno, a vista da sacada e a iluminação incrível que esse apartamento tem por dentro. Quem olha só por fora quase sempre descarta a melhor opção por engano.

Como estarei na região amanhã, não custa nada abrir a porta para você ver por dentro sem nenhum compromisso. Você prefere às 11h ou às 16h?`,
        whenToUse: 'Quando o cliente quer apenas passar na frente da portaria.',
        whyItWorks: 'Mostra o prejuízo que o cliente terá ao julgar o livro pela capa e remove a pressão de compromisso.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
      {
        id: 'opt-8-3',
        title: 'Objeção 3: "Achei o condomínio ou o valor do IPTU muito alto"',
        tone: 'Persuasivo',
        text: `Entendo sua preocupação, [Nome]. Quando a gente olha só a taxa isolada, parece pesado mesmo.

Mas olha o que está incluso nessa cota: [portaria 24h blindada, piscina aquecida, academia de ponta e água inclusa]. Se você somar o custo de academia para a família e segurança externa, esse valor na verdade gera economia real no mês.

Faz sentido para você quando colocamos esses benefícios na ponta do lápis?`,
        whenToUse: 'Quando o condomínio assusta o comprador.',
        whyItWorks: 'Troca a percepção de custo pela percepção de conveniência agregada e economia de despesas avulsas.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-8-4',
        title: 'Objeção 4: "Preciso falar com meu marido/minha esposa antes"',
        tone: 'Empático',
        text: `Com certeza, [Nome]! Decisão de família tem que ser tomada a quatro mãos para dar certo.

Para facilitar a vida de vocês dois: quer que eu grave um áudio de 1 minuto ou monte um resumo com as 3 vantagens principais para você mostrar a ele(a)? Ou melhor ainda: quando os dois teriam 20 minutinhos para irmos juntos?`,
        whenToUse: 'Quando o cliente usa o cônjuge como trava.',
        whyItWorks: 'Apoia o cliente para que ele seja o seu aliado em casa em vez de deixar a conversa morrer.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-8-5',
        title: 'Objeção 5: "Estou apenas pesquisando, sem pressa de comprar"',
        tone: 'Consultivo',
        text: `Perfeito, [Nome]! Pesquisar com calma é o melhor jeito de não fazer bobagem nem pagar caro.

Para você não ficar recebendo ligação chata de 10 imobiliárias diferentes, posso ser o seu consultor dedicado. Só te mando o que for oportunidade fora da curva no seu perfil.

Combinado assim? Se surgir uma oportunidade rara, posso te mandar por aqui?`,
        whenToUse: 'Para leads frios no início da jornada de pesquisa.',
        whyItWorks: 'Posiciona você como o único curador de confiança do cliente, blindando contra corretores concorrentes.',
        faoPillar: 'Filtro (F)',
      },
    ],
  },
  {
    id: 'fao-sit-9',
    number: 9,
    title: 'Follow-up Estratégico de SDR Imobiliário',
    stageName: 'Follow-up & Reengajamento',
    description: 'Como reativar compradores que visualizaram fotos e sumiram sem resposta.',
    faoPillar: 'Alinhamento (A)',
    iconName: 'UserCheck',
    options: [
      {
        id: 'opt-9-1',
        title: 'Opção 1: Follow-up de 24 Horas (Checagem Simples)',
        tone: 'Consultivo',
        text: `Oi, [Nome]! Tudo bem por aí?

Passando só para saber se você conseguiu dar uma olhada nas fotos e no vídeo que te enviei ontem. O que você achou da divisão dos cômodos? Encaixa no que você estava imaginando?`,
        whenToUse: '24 horas após envio de fotos sem resposta.',
        whyItWorks: 'Pergunta aberta e leve sobre a divisão dos cômodos, fácil de responder.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-9-2',
        title: 'Opção 2: Follow-up com Fato Novo / Unidade Similar (48h a 72h)',
        tone: 'Persuasivo',
        text: `[Nome], lembrei de você hoje cedo!

Acabou de liberar uma outra unidade aqui no mesmo perfil, só que em um andar com vista ainda mais aberta e o proprietário aceitou flexibilizar a entrada.

Quer que eu te mande os detalhes antes de colocar no portal aberto?`,
        whenToUse: 'Lead que parou de responder há 2 ou 3 dias.',
        whyItWorks: 'Traz um fato novo real. Ninguém resiste à curiosidade de ver uma unidade que acabou de liberar.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-9-3',
        title: 'Opção 3: Follow-up do Desapego Elegante (5 a 7 dias)',
        tone: 'Direto',
        text: `Olá, [Nome]! Como não tive mais seu retorno, imagino que você já tenha encontrado outro imóvel ou priorizado outros projetos por agora.

Para não ficar enchendo seu WhatsApp: posso encerrar seu acompanhamento por aqui, ou ainda tem interesse em encontrar o imóvel ideal no [Bairro]?`,
        whenToUse: 'Última tentativa de contato antes de arquivar o lead.',
        whyItWorks: 'Psicologia reversa. As pessoas odeiam perder contato ou admitir que sumiram. A taxa de resposta deste follow-up passa de 65%.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
    ],
  },
  {
    id: 'fao-sit-10',
    number: 10,
    title: 'Pós-Visita & Condução para Proposta / Fechamento',
    stageName: 'Proposta & Fechamento',
    description: 'Mensagens logo após a visita presencial para colher o termômetro do cliente e formalizar a proposta.',
    faoPillar: 'Objeção & Agendamento (O)',
    iconName: 'HeartHandshake',
    options: [
      {
        id: 'opt-10-1',
        title: 'Opção 1: Termômetro Pós-Visita (Nota de 0 a 10)',
        tone: 'Empático',
        text: `[Nome], foi um prazer enorme te acompanhar na visita hoje!

Me conta com toda sinceridade: de 0 a 10, o quanto aquele imóvel supriu o que você e sua família estavam imaginando para o novo lar de vocês?`,
        whenToUse: '2 a 3 horas após a realização da visita presencial.',
        whyItWorks: 'Mede a temperatura do lead sem parecer afobado para fechar na hora.',
        faoPillar: 'Alinhamento (A)',
      },
      {
        id: 'opt-10-2',
        title: 'Opção 2: Condução para Montagem de Proposta Formal',
        tone: 'Persuasivo',
        text: `[Nome], como você gostou bastante do imóvel e ele atende todas as suas prioridades, meu conselho profissional é colocarmos uma proposta formal no papel hoje ainda.

Se você me passar a sua condição ideal de entrada e saldo, eu defendo sua proposta diretamente com o proprietário para brigarmos pelo melhor valor. Podemos redigir os termos agora?`,
        whenToUse: 'Quando o cliente avaliou a visita positivamente.',
        whyItWorks: 'Transfere o papel do corretor para "defensor da proposta do cliente perante o proprietário".',
        faoPillar: 'Objeção & Agendamento (O)',
      },
      {
        id: 'opt-10-3',
        title: 'Opção 3: Blindagem Jurídica e Solicitação de Documentos',
        tone: 'Consultivo',
        text: `Excelente notícia, [Nome]! O proprietário viu com bons olhos a sua condição.

Para a sua tranquilidade e segurança jurídica absoluta: nossa assessoria já fez a checagem prévia da matrícula e certidões negativas do imóvel. Tudo 100% regularizado.

Podemos providenciar os documentos básicos (RG, CPF e comprovante de renda/residência) para emitirmos o contrato de promessa de compra e venda?`,
        whenToUse: 'Na fase final de minuta de contrato e reserva da unidade.',
        whyItWorks: 'Reforça a segurança jurídica, reduzindo a ansiedade natural de assinar contrato de alto valor.',
        faoPillar: 'Objeção & Agendamento (O)',
      },
    ],
  },
];
