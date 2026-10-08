import { MessageItem } from '../types';

export interface NicheProfile {
  id: string;
  name: string;
  shortName: string;
  serviceName: string;
  serviceShort: string;
  typicalTicket: string;
  typicalInstallment: string;
  perDayValue: string;
  typicalLocation: string;
  mainDifferentiator: string;
  secondDifferentiator: string;
  typicalBenefit: string;
  proBonus: string;
  optionOne: string;
  optionTwo: string;
  typicalTimeframe: string;
  nicheSpecificTag: string;
}

export const NICHE_PROFILES: Record<string, NicheProfile> = {
  'barbeiro': {
    id: 'barbeiro',
    name: 'Barbeiro / Barbearia',
    shortName: 'Barbeiro',
    serviceName: 'corte de cabelo e barba terapia',
    serviceShort: 'corte e barba',
    typicalTicket: 'R$ 75,00',
    typicalInstallment: '2x de R$ 40,00',
    perDayValue: 'R$ 2,50',
    typicalLocation: 'na barbearia com horário marcado',
    mainDifferentiator: 'pontualidade britânica (sem fila de espera) e toalha quente com óleos essenciais',
    secondDifferentiator: 'acabamento perfeito navalhado e produtos de linha profissional',
    typicalBenefit: 'visual impecável e barba alinhada para a semana inteira',
    proBonus: 'uma esfoliação facial refrescante de cortesia',
    optionOne: 'quinta às 17h30',
    optionTwo: 'sexta às 19h00',
    typicalTimeframe: 'hoje à tarde ou amanhã',
    nicheSpecificTag: 'Barbearia & Cabelo',
  },
  'dentista': {
    id: 'dentista',
    name: 'Dentista / Odontologia',
    shortName: 'Dentista',
    serviceName: 'avaliação clínica e procedimento odontológico',
    serviceShort: 'avaliação e tratamento',
    typicalTicket: 'R$ 480,00',
    typicalInstallment: '6x de R$ 80,00',
    perDayValue: 'R$ 2,60',
    typicalLocation: 'no consultório odontológico com biossegurança hospitalar',
    mainDifferentiator: 'exame minucioso com câmera intraoral e atendimento 100% humanizado e indolor',
    secondDifferentiator: 'materiais de estética dental de padrão suíço com garantia clínica',
    typicalBenefit: 'sorriso saudável, dentes claros e fim definitivo da sensibilidade ou dor',
    proBonus: 'uma aplicação tópica de flúor preventivo',
    optionOne: 'terça às 14h00',
    optionTwo: 'quinta às 16h30',
    typicalTimeframe: 'esta semana para não agravar o quadro',
    nicheSpecificTag: 'Odontologia & Saúde',
  },
  'manicure': {
    id: 'manicure',
    name: 'Manicure / Lash Designer',
    shortName: 'Manicure & Lash',
    serviceName: 'alongamento em fibra e esmaltação em gel',
    serviceShort: 'alongamento e cutilagem',
    typicalTicket: 'R$ 130,00',
    typicalInstallment: '3x de R$ 48,00',
    perDayValue: 'R$ 3,00',
    typicalLocation: 'no espaço de beleza em maca/cadeira ergonômica',
    mainDifferentiator: 'materiais 100% descartáveis e esterilizados em autoclave com registro Anvisa',
    secondDifferentiator: 'durabilidade comprovada de mais de 25 dias sem descolamento ou quebra',
    typicalBenefit: 'unhas impecáveis com curvatura natural e brilho espelhado',
    proBonus: 'uma blindagem de unhas com óleo de cutícula nutritivo',
    optionOne: 'quinta às 14h00',
    optionTwo: 'sábado às 09h30',
    typicalTimeframe: 'antes do final de semana',
    nicheSpecificTag: 'Beleza & Unhas',
  },
  'esteticista': {
    id: 'esteticista',
    name: 'Esteticista / Biomédica',
    shortName: 'Estética',
    serviceName: 'protocolo personalizado de rejuvenescimento e harmonização',
    serviceShort: 'procedimento estético',
    typicalTicket: 'R$ 550,00',
    typicalInstallment: '6x de R$ 98,00',
    perDayValue: 'R$ 3,20',
    typicalLocation: 'na clínica em ambiente climatizado e relaxante',
    mainDifferentiator: 'produtos com certificação Anvisa de alta pureza e anamnese personalizada',
    secondDifferentiator: 'acompanhamento pós-sessão por WhatsApp até a recuperação completa',
    typicalBenefit: 'pele viçosa, rejuvenescida e com firmeza visível já na primeira semana',
    proBonus: 'uma máscara de ouro com hidratação profunda de finalização',
    optionOne: 'quarta às 15h00',
    optionTwo: 'sexta às 11h00',
    typicalTimeframe: 'para estar com resultado pleno no seu evento',
    nicheSpecificTag: 'Estética & Bem-estar',
  },
  'personal-trainer': {
    id: 'personal-trainer',
    name: 'Personal Trainer / Consultoria',
    shortName: 'Personal Trainer',
    serviceName: 'consultoria de treinamento físico e acompanhamento individualizado',
    serviceShort: 'plano de treino',
    typicalTicket: 'R$ 290,00/mês',
    typicalInstallment: '3x de R$ 97,00',
    perDayValue: 'R$ 3,20',
    typicalLocation: 'presencial na academia ou com suporte no app',
    mainDifferentiator: 'metodologia baseada em biomecânica segura (zero risco de lesões) e periodização científica',
    secondDifferentiator: 'ajustes semanais e canal direto no WhatsApp para tirar dúvidas 7 dias por semana',
    typicalBenefit: 'queima de gordura acelerada, ganho de massa magra e muito mais energia diária',
    proBonus: 'uma planilha de organização de rotina e hábitos de sono',
    optionOne: 'segunda às 07h00',
    optionTwo: 'terça às 18h30',
    typicalTimeframe: 'para iniciar seu projeto ainda nesta semana',
    nicheSpecificTag: 'Fitness & Treinamento',
  },
  'fotografo': {
    id: 'fotografo',
    name: 'Fotógrafo / Videomaker',
    shortName: 'Fotografia',
    serviceName: 'ensaio fotográfico profissional com direção de poses e pós-produção',
    serviceShort: 'ensaio fotográfico',
    typicalTicket: 'R$ 850,00',
    typicalInstallment: '6x de R$ 150,00',
    perDayValue: 'R$ 4,80',
    typicalLocation: 'em estúdio fotográfico ou locação externa exclusiva',
    mainDifferentiator: 'direção de cena leve e descontraída (mesmo para quem tem vergonha de fotos) e luz de cinema',
    secondDifferentiator: 'tratamento minucioso de cor e entrega de galeria online privativa em alta resolução',
    typicalBenefit: 'fotos com ar editorial e elegante que transmitem máxima autoridade e beleza',
    proBonus: '5 fotos extras tratadas em resolução máxima para impressão',
    optionOne: 'sábado pela manhã às 08h30',
    optionTwo: 'domingo ao pôr do sol às 16h30',
    typicalTimeframe: 'para garantir a data antes que outro cliente trave a grade',
    nicheSpecificTag: 'Fotografia & Vídeo',
  },
  'eletricista': {
    id: 'eletricista',
    name: 'Eletricista / Manutenção Residencial',
    shortName: 'Eletricista',
    serviceName: 'revisão, laudo técnico e reforma do padrão elétrico residencial',
    serviceShort: 'serviço elétrico',
    typicalTicket: 'R$ 320,00',
    typicalInstallment: '4x de R$ 85,00',
    perDayValue: 'R$ 2,80',
    typicalLocation: 'no local com ferramentas e equipamentos de proteção certificados NR-10',
    mainDifferentiator: 'teste com multímetro de precisão, cabos normatizados antichamas e conformidade ABNT',
    secondDifferentiator: 'garantia formal por escrito de 1 ano contra qualquer falha ou queda de disjuntor',
    typicalBenefit: 'segurança absoluta para sua família, sem cheiro de queimado e economia na conta de luz',
    proBonus: 'uma checagem preventiva em todas as tomadas da casa sem custo',
    optionOne: 'amanhã às 09h00',
    optionTwo: 'quinta às 14h00',
    typicalTimeframe: 'com urgência para eliminar risco elétrico',
    nicheSpecificTag: 'Elétrica & Manutenção',
  },
  'advogado': {
    id: 'advogado',
    name: 'Advogado / Consultor Jurídico',
    shortName: 'Advocacia',
    serviceName: 'consulta jurídica especializada e análise técnica de documentos e contratos',
    serviceShort: 'assessoria jurídica',
    typicalTicket: 'R$ 650,00',
    typicalInstallment: '4x de R$ 170,00',
    perDayValue: 'R$ 5,50',
    typicalLocation: 'no escritório jurídico ou reunião por videoconferência com gravação e ata',
    mainDifferentiator: 'sigilo profissional ético resguardado pela OAB e parecer técnico detalhado de riscos',
    secondDifferentiator: 'estratégia processual ativa focada em resolução rápida e economia financeira',
    typicalBenefit: 'blindagem patrimonial e tranquilidade jurídica com respaldo legal incontestável',
    proBonus: 'uma minuta preliminar com checklist de documentos obrigatórios',
    optionOne: 'terça às 10h30',
    optionTwo: 'quarta às 15h00',
    typicalTimeframe: 'para não perder prazos legais decisivos',
    nicheSpecificTag: 'Direito & Assessoria',
  },
  'contador': {
    id: 'contador',
    name: 'Contador / BPO Financeiro',
    shortName: 'Contabilidade',
    serviceName: 'assessoria contábil mensal com planejamento tributário e redução legal de impostos',
    serviceShort: 'plano contábil',
    typicalTicket: 'R$ 380,00/mês',
    typicalInstallment: 'mensalidade flexível',
    perDayValue: 'R$ 4,00',
    typicalLocation: 'com canal direto e exclusivo de WhatsApp sem filas de chat robótico',
    mainDifferentiator: 'auditoria preventiva que impede multas da Receita Federal e otimiza o regime tributário',
    secondDifferentiator: 'atendimento direto com o contador responsável em menos de 15 minutos pelo WhatsApp',
    typicalBenefit: 'empresa 100% regularizada, certidões negativas em dia e economia real de impostos todo mês',
    proBonus: 'uma análise gratuita do seu enquadramento dos últimos 12 meses',
    optionOne: 'quarta às 11h00',
    optionTwo: 'quinta às 14h30',
    typicalTimeframe: 'antes do fechamento fiscal deste mês',
    nicheSpecificTag: 'Contabilidade & Finanças',
  },
  'corretor-imoveis': {
    id: 'corretor-imoveis',
    name: 'Corretor de Imóveis',
    shortName: 'Imóveis',
    serviceName: 'consultoria imobiliária personalizada e curadoria de imóveis de alta liquidez',
    serviceShort: 'visita e assessoria',
    typicalTicket: 'R$ 4.500,00',
    typicalInstallment: 'comissão facilitada',
    perDayValue: 'R$ 10,00',
    typicalLocation: 'com visita privativa no imóvel acompanhada pelo corretor',
    mainDifferentiator: 'análise prévia de toda a certidão de ônus e escritura para compra 100% blindada',
    secondDifferentiator: 'acesso a oportunidades exclusivas antes de irem para os portais imobiliários gerais',
    typicalBenefit: 'conquista do imóvel perfeito na melhor localização sem surpresas de condomínio ou burocracia',
    proBonus: 'uma simulação bancária de crédito imobiliário nas menores taxas de juros',
    optionOne: 'amanhã às 10h00',
    optionTwo: 'sábado às 15h30',
    typicalTimeframe: 'antes que a unidade seja reservada por outro comprador',
    nicheSpecificTag: 'Mercado Imobiliário',
  },
  'designer': {
    id: 'designer',
    name: 'Designer / Agência Digital',
    shortName: 'Design & Branding',
    serviceName: 'projeto completo de identidade visual, manual de marca e design comercial',
    serviceShort: 'projeto de design',
    typicalTicket: 'R$ 950,00',
    typicalInstallment: '5x de R$ 198,00',
    perDayValue: 'R$ 6,00',
    typicalLocation: 'com apresentação interativa via link com mockups realistas',
    mainDifferentiator: 'pesquisa de posicionamento de mercado e entrega em todos os formatos vetoriais editáveis',
    secondDifferentiator: 'rodada de refinamentos inclusa até você aprovar 100% da proposta',
    typicalBenefit: 'uma marca marcante que transmite sofisticação e permite cobrar mais caro dos seus clientes',
    proBonus: 'um pacote de 5 capas de destaques e templates de post para o Instagram',
    optionOne: 'quarta às 14h00',
    optionTwo: 'sexta às 10h00',
    typicalTimeframe: 'para lançar seu novo posicionamento no início do mês',
    nicheSpecificTag: 'Design & Branding',
  },
  'mecanico': {
    id: 'mecanico',
    name: 'Mecânico / Oficina Automotiva',
    shortName: 'Oficina Mecânica',
    serviceName: 'revisão preventiva do sistema mecânico, suspensão e freios com peças originais',
    serviceShort: 'revisão automotiva',
    typicalTicket: 'R$ 420,00',
    typicalInstallment: '4x de R$ 110,00',
    perDayValue: 'R$ 3,50',
    typicalLocation: 'na oficina equipada com elevador automotivo e scanner eletrônico',
    mainDifferentiator: 'vídeo gravado da peça no elevador mostrando o desgaste real antes de qualquer troca',
    secondDifferentiator: 'peças de primeira linha com nota fiscal e garantia de 6 meses de balcão e mão de obra',
    typicalBenefit: 'carro macio, seguro para viagens com a família e sem barulhos chatos na suspensão',
    proBonus: 'um alinhamento de faróis e calibragem com nitrogênio sem custo',
    optionOne: 'hoje às 13h30',
    optionTwo: 'amanhã às 08h00',
    typicalTimeframe: 'para liberar seu carro no mesmo dia útil',
    nicheSpecificTag: 'Mecânica & Carros',
  },
  'loja': {
    id: 'loja',
    name: 'Loja / Comércio Varejista',
    shortName: 'Loja & Varejo',
    serviceName: 'pedido exclusivo com separação imediata e embalagem para presente',
    serviceShort: 'pedido e entrega',
    typicalTicket: 'R$ 180,00',
    typicalInstallment: '3x de R$ 60,00',
    perDayValue: 'R$ 2,00',
    typicalLocation: 'com envio expresso via motoboy ou retirada na loja física',
    mainDifferentiator: 'produtos com garantia total de troca sem burocracia em até 7 dias corridos',
    secondDifferentiator: 'embalagem aromática especial com mimo surpresa dentro da caixa',
    typicalBenefit: 'receber exatamente o que viu nas fotos com entrega rápida na porta da sua casa',
    proBonus: 'um cupom de 10% de cashback para a próxima compra',
    optionOne: 'entrega hoje até às 17h',
    optionTwo: 'entrega amanhã pela manhã',
    typicalTimeframe: 'para despachar ainda no lote dos Correios/Motoboy de hoje',
    nicheSpecificTag: 'Varejo & Produtos',
  },
  'outros-servicos': {
    id: 'outros-servicos',
    name: 'Outros Prestadores de Serviços',
    shortName: 'Serviços',
    serviceName: 'atendimento especializado e execução profissional com garantia',
    serviceShort: 'serviço profissional',
    typicalTicket: 'R$ 280,00',
    typicalInstallment: '3x de R$ 98,00',
    perDayValue: 'R$ 3,00',
    typicalLocation: 'com atendimento direto e personalizado',
    mainDifferentiator: 'pontualidade rigorosa, profissional qualificado e contrato de garantia por escrito',
    secondDifferentiator: 'suporte direto no WhatsApp antes, durante e após a conclusão do trabalho',
    typicalBenefit: 'solução definitiva sem dores de cabeça nem retrabalhos custosos',
    proBonus: 'um diagnóstico complementar do que pode ser otimizado',
    optionOne: 'quinta às 14h00',
    optionTwo: 'sexta às 10h00',
    typicalTimeframe: 'nesta semana',
    nicheSpecificTag: 'Serviços Especializados',
  },
};

/**
 * Normalizes a user-friendly or internal profession string to one of the defined niche profiles
 */
export function resolveNicheProfile(professionString?: string | null): NicheProfile {
  if (!professionString) return NICHE_PROFILES['barbeiro'];

  const lower = professionString.toLowerCase();
  if (lower.includes('barbeir') || lower.includes('cabelo')) return NICHE_PROFILES['barbeiro'];
  if (lower.includes('dent') || lower.includes('odonto')) return NICHE_PROFILES['dentista'];
  if (lower.includes('manicur') || lower.includes('lash') || lower.includes('unha')) return NICHE_PROFILES['manicure'];
  if (lower.includes('estet') || lower.includes('biomed') || lower.includes('pele')) return NICHE_PROFILES['esteticista'];
  if (lower.includes('personal') || lower.includes('trein') || lower.includes('fitness')) return NICHE_PROFILES['personal-trainer'];
  if (lower.includes('foto') || lower.includes('video') || lower.includes('filme')) return NICHE_PROFILES['fotografo'];
  if (lower.includes('eletric') || lower.includes('energia') || lower.includes('manutenç')) return NICHE_PROFILES['eletricista'];
  if (lower.includes('advog') || lower.includes('jurid') || lower.includes('direito')) return NICHE_PROFILES['advogado'];
  if (lower.includes('contad') || lower.includes('fiscal') || lower.includes('bpo')) return NICHE_PROFILES['contador'];
  if (lower.includes('imóve') || lower.includes('corret') || lower.includes('casa')) return NICHE_PROFILES['corretor-imoveis'];
  if (lower.includes('design') || lower.includes('marca') || lower.includes('agênci')) return NICHE_PROFILES['designer'];
  if (lower.includes('mecanic') || lower.includes('oficina') || lower.includes('carro')) return NICHE_PROFILES['mecanico'];
  if (lower.includes('loja') || lower.includes('varej') || lower.includes('comérci')) return NICHE_PROFILES['loja'];
  if (lower.includes('servi') || lower.includes('prestador') || lower.includes('autônom') || lower.includes('geral')) return NICHE_PROFILES['outros-servicos'];

  return NICHE_PROFILES['barbeiro']; // default fallback
}

/**
 * Automates replacing all generic placeholders in a message with the niche's real vocabulary
 */
export function adaptMessageToNiche(msg: MessageItem, niche: NicheProfile): MessageItem {
  let content = msg.content;
  let title = msg.title;
  let situation = msg.situation;
  let explanation = msg.explanation;
  let suggestedFollowUp = msg.suggestedFollowUp;

  // Replace standard variable tokens
  content = content.replace(/\[Serviço\/Produto\]/g, niche.serviceName);
  content = content.replace(/\[Produto\/Serviço\]/g, niche.serviceName);
  content = content.replace(/\[Serviço feito anteriormente\]/g, `${niche.serviceShort} realizado conosco`);
  content = content.replace(/\[Serviço\]/g, niche.serviceShort);
  content = content.replace(/\[Problema\/Serviço\]/g, niche.serviceShort);
  content = content.replace(/\[resolver isso \/ fazer esse procedimento\]/g, `fazer esse ${niche.serviceShort}`);
  content = content.replace(/\[Resolver problema\]/g, `cuidar do seu ${niche.serviceShort}`);
  content = content.replace(/\[Solução definitiva\]/g, niche.serviceName);
  content = content.replace(/\[Valor\]/g, niche.typicalTicket);
  content = content.replace(/\[R\$ X\]/g, niche.typicalTicket);
  content = content.replace(/\[R\$ Y\]/g, niche.perDayValue);
  content = content.replace(/\[X parcelas de Y\]/g, niche.typicalInstallment);
  content = content.replace(/\[Diferencial 1[^\]]*\]/g, niche.mainDifferentiator);
  content = content.replace(/\[Diferencial 2[^\]]*\]/g, niche.secondDifferentiator);
  content = content.replace(/\[Diferencial[^\]]*\]/g, niche.mainDifferentiator);
  content = content.replace(/\[Opção 1[^\]]*\]/g, niche.optionOne);
  content = content.replace(/\[Opção 2[^\]]*\]/g, niche.optionTwo);
  content = content.replace(/\[Benefício 1\]/g, niche.typicalBenefit);
  content = content.replace(/\[Benefício 2\]/g, niche.mainDifferentiator);
  content = content.replace(/\[Bônus ou Serviço complementar[^\]]*\]/g, niche.proBonus);
  content = content.replace(/\[Bônus[^\]]*\]/g, niche.proBonus);
  content = content.replace(/\[Garantia\]/g, 'garantia total de satisfação');
  content = content.replace(/\[X meses\]/g, '6 meses');
  content = content.replace(/\[X dias\]/g, '7 dias');
  content = content.replace(/\[Valor\/mês\]/g, niche.typicalTicket);
  content = content.replace(/\[Local\]/g, niche.typicalLocation);
  content = content.replace(/\[Prazo \/ Urgência\]/g, niche.typicalTimeframe);
  content = content.replace(/\[Data \/ Horário\]/g, niche.optionOne);
  content = content.replace(/\[Dia e Hora\]/g, niche.optionOne);
  content = content.replace(/\[Chave Pix\]/g, 'contato@whatsappquevende.com.br');
  content = content.replace(/\[Link do Google\]/g, 'g.page/avaliacao/5estrelas');
  content = content.replace(/\[agravar o quadro \/ encarecer a correção\]/g, `agravar a situação de ${niche.serviceShort} e encarecer a resolução`);
  content = content.replace(/\[dica prática simples para aliviar o problema\]/g, `uma checagem prévia no seu ${niche.serviceShort}`);
  content = content.replace(/\[Próximo serviço\/manutenção\]/g, `revisão preventiva de ${niche.serviceShort}`);
  content = content.replace(/\[Ação imediata de conserto\]/g, `um encaixe prioritário para ajuste de ${niche.serviceShort}`);
  content = content.replace(/\[Assunto\/Serviço\]/g, niche.serviceShort);
  content = content.replace(/\[Nome de quem indicou\]/g, 'nosso cliente VIP');

  // Contextualize generic situations
  situation = situation.replace(/do serviço/g, `do seu ${niche.serviceShort}`);
  situation = situation.replace(/o serviço/g, `o ${niche.serviceShort}`);
  situation = situation.replace(/a proposta/g, `a proposta de ${niche.serviceShort}`);

  if (suggestedFollowUp) {
    suggestedFollowUp = suggestedFollowUp.replace(/\[Serviço\]/g, niche.serviceShort);
  }

  return {
    ...msg,
    title,
    situation,
    content,
    explanation,
    suggestedFollowUp,
    professionTags: [niche.shortName],
  };
}
