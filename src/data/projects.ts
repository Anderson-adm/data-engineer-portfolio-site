export interface Project {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  category: string;
  description: string;
  status: string;
  active: boolean;
  tags: string[];
  visual: 'network' | 'lake' | 'event';
  problem: string;
  context: string;
  goals: string[];
  architecture: string;
  challenges: { title: string; text: string }[];
  decisions: string;
  next: string;
  github?: string;
  documentation?: string;
}

export const projects: Project[] = [
  {
    slug: 'enterprise-risk-liquidity', number: '01',
    title: 'Enterprise Risk & Liquidity Data Platform',
    shortTitle: 'Risk & Liquidity Platform',
    summary: 'Integração financeira, reconciliação e qualidade de dados.',
    category: 'Integração corporativa · Dados financeiros',
    description: 'Reconstrução autoral de um desafio de integração de dados financeiros heterogêneos. Reconciliação de entidades, qualidade de dados e construção de fluxos confiáveis para sistemas consumidores.',
    status: 'Reconstrução autoral em desenvolvimento', active: true,
    tags: ['Python', 'SQL', 'AWS'], visual: 'network',
    problem: 'Como integrar dados financeiros de origens diferentes sem perder consistência entre as entidades e os sistemas que consomem esses dados?',
    context: 'Uma reconstrução autoral voltada aos desafios de risco e liquidez. O foco está em explicitar contratos de dados, regras de reconciliação e comportamentos de falha. Não representa a divulgação de código, dados ou arquitetura de um empregador.',
    goals: ['Reconhecer e reconciliar entidades entre fontes heterogêneas.', 'Definir verificações de qualidade antes de entregar dados aos consumidores.', 'Projetar fluxos que permitam rastrear falhas e reprocessar dados com segurança.'],
    architecture: 'Arquitetura proposta, ainda em definição. O escopo considera entrada de dados heterogêneos, validação, reconciliação de entidades e entrega aos sistemas consumidores. A seleção dos serviços e os contratos entre etapas serão documentados durante a implementação.',
    challenges: [
      { title: 'Identidade entre fontes', text: 'Definir como reconhecer uma mesma entidade quando identificadores e formatos divergem.' },
      { title: 'Qualidade com contexto', text: 'Distinguir um registro inválido de uma divergência que exige análise de negócio.' },
      { title: 'Reprocessamento seguro', text: 'Planejar rastreabilidade e idempotência para evitar duplicação ao executar novamente um fluxo.' },
    ],
    decisions: 'As decisões de implementação ainda não estão consolidadas. Serviços AWS, formatos de persistência e estratégias de reconciliação deverão ser avaliados com exemplos reproduzíveis antes de serem apresentados como escolhas validadas.',
    next: 'Formalizar o escopo, os dados de exemplo e os contratos de entrada. Em seguida, documentar a implementação e as verificações executadas. Ainda não há resultados publicados.',
  },
  {
    slug: 'financial-data-lake', number: '02', title: 'High-Performance Financial Data Lake',
    shortTitle: 'Financial Data Lake',
    summary: 'Particionamento e performance de consultas no Athena.',
    category: 'Data Lake · Engenharia de performance',
    description: 'Estudo de engenharia de performance em AWS Athena. Comparação reproduzível de estratégias de particionamento, armazenamento e consultas para avaliar desempenho e eficiência.',
    status: 'Planejado', active: false, tags: ['S3', 'Athena', 'SQL'], visual: 'lake',
    problem: 'Como avaliar o impacto de armazenamento, particionamento e desenho de consultas na eficiência de um Data Lake financeiro?',
    context: 'O estudo pretende comparar alternativas sob condições documentadas e reproduzíveis. O objetivo é explicar os efeitos de cada escolha, com o mesmo conjunto de dados e consultas comparáveis.',
    goals: ['Definir um conjunto de dados de exemplo e consultas de referência.', 'Comparar estratégias de organização e particionamento.', 'Documentar condições, limitações e resultados das medições quando forem executadas.'],
    architecture: 'Arquitetura proposta para estudo: armazenamento de dados em S3 e consultas com Athena. Organização das camadas, formatos e partições ainda serão definidos. Nenhum recurso cloud foi provisionado como parte deste portfólio.',
    challenges: [
      { title: 'Comparação justa', text: 'Controlar variáveis como volume, formato dos dados e características das consultas.' },
      { title: 'Particionamento proporcional', text: 'Avaliar o equilíbrio entre redução de leitura e complexidade de manutenção.' },
      { title: 'Medições reproduzíveis', text: 'Registrar consultas, configurações e condições de execução para permitir verificação.' },
    ],
    decisions: 'Nenhuma estratégia foi selecionada ou validada. Formatos, granularidade das partições e critérios de medição serão definidos antes dos experimentos. Não há benchmarks disponíveis.',
    next: 'Definir o protocolo experimental e os dados de exemplo. A implementação e as medições ainda não foram iniciadas.',
  },
  {
    slug: 'event-driven-integration', number: '03', title: 'Resilient Event-Driven Data Integration',
    shortTitle: 'Event-Driven Integration',
    summary: 'Eventos, idempotência e recuperação de falhas.',
    category: 'Integração por eventos · Confiabilidade',
    description: 'Arquitetura de integração orientada a eventos com foco em idempotência, tolerância a falhas, reprocessamento e observabilidade.',
    status: 'Planejado', active: false, tags: ['Python', 'AWS', 'Eventos'], visual: 'event',
    problem: 'Como manter uma integração consistente quando eventos são duplicados, chegam fora de ordem ou precisam ser processados novamente?',
    context: 'Um projeto autoral planejado para estudar o comportamento de integrações diante de falhas. A proposta é tornar explícitas as garantias de processamento e as condições de recuperação.',
    goals: ['Definir contratos de eventos e cenários de falha.', 'Avaliar estratégias de idempotência e reprocessamento.', 'Planejar sinais de observabilidade que ajudem a entender o estado da integração.'],
    architecture: 'Arquitetura proposta, ainda em definição. O estudo considera produtores, transporte de eventos e consumidores, com tratamento explícito de falhas. Os serviços AWS e os mecanismos de persistência ainda não foram escolhidos.',
    challenges: [
      { title: 'Eventos duplicados', text: 'Definir identidade e critérios para processar novamente um evento sem duplicar seus efeitos.' },
      { title: 'Falhas e recuperação', text: 'Distinguir erros transitórios de erros que exigem intervenção e planejar tentativas de recuperação.' },
      { title: 'Visibilidade do fluxo', text: 'Planejar como correlacionar eventos, identificar atrasos e acompanhar reprocessamentos.' },
    ],
    decisions: 'As garantias de entrega, a estratégia de idempotência e a política de novas tentativas serão avaliadas durante o projeto. Não há implementação nem validação de resiliência publicada.',
    next: 'Especificar os contratos e os cenários de falha antes de selecionar os componentes. A implementação ainda não foi iniciada.',
  },
];
