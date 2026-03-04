export type BlockType = 'p' | 'ul' | 'ol';

export interface ContentBlock {
  type: BlockType;
  text?: string;
  items?: string[];
}

export interface SubSection {
  id: string;
  title: { pt: string; es: string };
  blocks: { pt: ContentBlock[]; es: ContentBlock[] };
}

export interface Section {
  id: string;
  title: { pt: string; es: string };
  blocks?: { pt: ContentBlock[]; es: ContentBlock[] };
  subsections?: SubSection[];
}

export const regulamentoSections: Section[] = [
  {
    id: 'objetivo',
    title: {
      pt: '1. Objetivo',
      es: '1. Objetivo',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'O Safety Innovation Awards é uma premiação promovida pela MSA Safety que tem como objetivo reconhecer e celebrar projetos inovadores que estão transformando a segurança no trabalho na América Latina.',
        },
        {
          type: 'p',
          text: 'Mais do que um prêmio, é um movimento para destacar profissionais e empresas que colocam a vida das pessoas em primeiro lugar, usando tecnologia e inovação como ferramentas de proteção.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Los Safety Innovation Awards son una premiación promovida por MSA Safety cuyo objetivo es reconocer y celebrar proyectos innovadores que están transformando la seguridad laboral en Latinoamérica.',
        },
        {
          type: 'p',
          text: 'Más que un premio, es un movimiento para destacar a los profesionales y empresas que priorizan la vida de las personas, usando la tecnología y la innovación como herramientas de protección.',
        },
      ],
    },
  },
  {
    id: 'organizacao',
    title: {
      pt: '2. Organização e Realização',
      es: '2. Organización y Realización',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'O Safety Innovation Awards é uma iniciativa da MSA Safety, integrada ao MSA Safety Summit 2026.',
        },
        {
          type: 'p',
          text: 'A organização, gestão e operação do prêmio são de responsabilidade exclusiva da MSA Safety e de seus parceiros designados.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Los Safety Innovation Awards son una iniciativa de MSA Safety, integrada al MSA Safety Summit 2026.',
        },
        {
          type: 'p',
          text: 'La organización, gestión y operación del premio son responsabilidad exclusiva de MSA Safety y de sus socios designados.',
        },
      ],
    },
  },
  {
    id: 'participacao',
    title: {
      pt: '3. Participação',
      es: '3. Participación',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'A participação no Safety Innovation Awards é gratuita e voluntária.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'La participación en los Safety Innovation Awards es gratuita y voluntaria.',
        },
      ],
    },
    subsections: [
      {
        id: 'participacao-elegibilidade',
        title: {
          pt: '3.1 Elegibilidade',
          es: '3.1 Elegibilidad',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Podem participar:',
            },
            {
              type: 'ul',
              items: [
                'Empresas de qualquer porte que implementaram projetos inovadores de segurança.',
                'Equipes de SST/EHS que desenvolveram soluções criativas para desafios reais.',
                'Profissionais especialistas que lideram iniciativas transformadoras em suas organizações.',
              ],
            },
            {
              type: 'p',
              text: 'A submissão é livre para todos os perfis. Cada empresa pode ter no máximo 1 projeto finalista.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Pueden participar:',
            },
            {
              type: 'ul',
              items: [
                'Empresas de cualquier tamaño que implementaron proyectos innovadores de seguridad.',
                'Equipos de SST/EHS que desarrollaron soluciones creativas para resolver desafíos reales.',
                'Profesionales especialistas que lideran iniciativas de transformación dentro de sus organizaciones.',
              ],
            },
            {
              type: 'p',
              text: 'La convocatoria está abierta para todos los perfiles. Solo podrá haber un proyecto finalista por empresa.',
            },
          ],
        },
      },
      {
        id: 'participacao-paises',
        title: {
          pt: '3.2 Países Participantes',
          es: '3.2 Países Participantes',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'O prêmio é aberto a projetos de empresas sediadas nos seguintes países da América Latina:',
            },
            {
              type: 'ul',
              items: [
                'Brasil',
                'Argentina',
                'Chile',
                'Colômbia',
                'México',
                'Peru',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'El premio está abierto a proyectos de empresas con sede en los siguientes países de Latinoamérica:',
            },
            {
              type: 'ul',
              items: [
                'Brasil',
                'Argentina',
                'Chile',
                'Colombia',
                'México',
                'Perú',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'requisitos',
    title: {
      pt: '4. Requisitos do Projeto',
      es: '4. Requisitos del Proyecto',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'O projeto submetido deve abordar todos os pontos a seguir para ser considerado na avaliação:',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'El proyecto enviado debe abordar todos los siguientes puntos para ser considerado en la evaluación:',
        },
      ],
    },
    subsections: [
      {
        id: 'requisitos-cenario',
        title: {
          pt: '4.1 Cenário Passado',
          es: '4.1 Contexto y Desafíos',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Descreva o contexto e os desafios de segurança que motivaram o projeto.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Descripción del contexto y los desafíos de seguridad que motivaron el proyecto.',
            },
          ],
        },
      },
      {
        id: 'requisitos-solucao',
        title: {
          pt: '4.2 Solução Implementada',
          es: '4.2 Solución Implementada',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Detalhe a inovação ou melhoria que foi desenvolvida e aplicada.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Información completa de la innovación o mejora que fue desarrollada y aplicada.',
            },
          ],
        },
      },
      {
        id: 'requisitos-resultados',
        title: {
          pt: '4.3 Resultados Obtidos',
          es: '4.3 Resultados e Impacto',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Apresente métricas, dados e evidências do impacto gerado.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Métricas, datos y evidencias que demuestren el impacto generado por la iniciativa.',
            },
          ],
        },
      },
      {
        id: 'requisitos-aprendizado',
        title: {
          pt: '4.4 Principal Aprendizado',
          es: '4.4 Lecciones Aprendidas',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Compartilhe os insights e lições aprendidas durante o projeto.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Insights clave y aprendizajes obtenidos durante el desarrollo y ejecución del proyecto.',
            },
          ],
        },
      },
      {
        id: 'requisitos-melhoria',
        title: {
          pt: '4.5 O que faria diferente (opcional)',
          es: '4.5 Oportunidades de Mejora (opcional)',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Reflexão sobre oportunidades de melhoria identificadas.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Reflexión sobre qué se podría haber hecho de forma distinta y los próximos pasos identificados.',
            },
          ],
        },
      },
      {
        id: 'requisitos-observacao',
        title: {
          pt: '4.6 Observação',
          es: '4.6 Observación',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Projetos incompletos ou sem resultados mensuráveis não serão avaliados.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'No se tomarán en cuenta proyectos incompletos o que no presenten resultados medibles.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'criterios',
    title: {
      pt: '5. Critérios de Avaliação',
      es: '5. Criterios de Evaluación',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Os projetos serão avaliados com base em cinco pilares estratégicos:',
        },
        {
          type: 'ol',
          items: [
            'Potencial Impacto na Segurança (30%) — Redução de riscos, incidentes ou acidentes. Melhoria mensurável em indicadores de segurança.',
            'Inovação Técnica (20%) — Originalidade da solução. Uso criativo de tecnologias, processos ou metodologias.',
            'Impacto Cultural (20%) — Transformação na cultura de segurança. Engajamento de colaboradores e lideranças.',
            'Sustentabilidade Econômica (15%) — Viabilidade de manutenção a longo prazo. Retorno sobre investimento demonstrado.',
            'Diferencial Tecnológico (15%) — Uso de tecnologias emergentes. Potencial de escalabilidade e replicação.',
          ],
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Los proyectos serán evaluados con base en cinco pilares estratégicos:',
        },
        {
          type: 'ol',
          items: [
            'Potencial impacto en la seguridad (30%) — Reducción de riesgos, incidentes o accidentes. Mejora medible en indicadores de seguridad.',
            'Innovación Técnica (20%) — Originalidad de la solución. Uso creativo de tecnologías, procesos o metodologías.',
            'Cultura de Compromiso (20%) — Transformación en la cultura de seguridad. Compromiso de colaboradores y líderes.',
            'Sostenibilidad Económica (15%) — Viabilidad de mantenimiento a largo plazo. Retorno sobre inversión demostrado.',
            'Implementación Tecnológica (15%) — Uso de tecnologías emergentes. Potencial de escalabilidad y replicación.',
          ],
        },
      ],
    },
  },
  {
    id: 'comite',
    title: {
      pt: '6. Comitê Avaliador',
      es: '6. Comité Evaluador',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Os projetos serão avaliados por um comitê de especialistas em segurança do trabalho e inovação, composto por profissionais reconhecidos no setor.',
        },
        {
          type: 'p',
          text: 'As decisões do Comitê Avaliador são soberanas e irrecorríveis.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Los proyectos serán evaluados por un comité de especialistas en seguridad laboral e innovación, compuesto por profesionales reconocidos en el sector.',
        },
        {
          type: 'p',
          text: 'Las decisiones del Comité Evaluador son soberanas e inapelables.',
        },
      ],
    },
  },
  {
    id: 'cronograma',
    title: {
      pt: '7. Cronograma',
      es: '7. Cronograma',
    },
    blocks: {
      pt: [
        {
          type: 'ul',
          items: [
            '23/02/2026 — Abertura e Lançamento: Início das inscrições e submissão de projetos.',
            '13/03/2026 — Encerramento das Inscrições: Prazo final para submissão de projetos.',
            '16/03 a 27/03/2026 — 1ª Fase - Avaliação do Comitê: Análise criteriosa por especialistas do projeto submetido.',
            '28/03 a 24/04/2026 — 2ª Fase - Apresentação dos Projetos Finalistas: Apresentação dos projetos para comitê avaliador.',
            'Maio/2026 — MSA Safety Summit 2026: Premiação dos finalistas durante o evento.',
          ],
        },
      ],
      es: [
        {
          type: 'ul',
          items: [
            '23/02/2026 — Apertura y Lanzamiento: Inicio de las inscripciones y envío de proyectos.',
            '13/03/2026 — Cierre de las Inscripciones: Fecha límite para el envío de los proyectos.',
            '16/03 a 27/03/2026 — Evaluaciones: Análisis detallado de cada proyecto a cargo del comité de especialistas.',
            '28/03 a 24/04/2026 — Presentación de los Finalistas: Presentación de los proyectos para comité evaluador.',
            'Mayo/2026 — MSA Safety Summit 2026: Premiación de los finalistas durante el evento.',
          ],
        },
      ],
    },
  },
  {
    id: 'premiacao',
    title: {
      pt: '8. Premiação e Reconhecimento',
      es: '8. Premiación y Reconocimiento',
    },
    subsections: [
      {
        id: 'premiacao-finalistas',
        title: {
          pt: '8.1 Finalistas (3 projetos)',
          es: '8.1 Finalistas (3 proyectos)',
        },
        blocks: {
          pt: [
            {
              type: 'ul',
              items: [
                'Homenagem ao vivo para o público no MSA Safety Summit 2026.',
                'Reconhecimento oficial da indústria.',
                'Networking com líderes de segurança.',
              ],
            },
          ],
          es: [
            {
              type: 'ul',
              items: [
                'Presentación en el MSA Safety Summit 2026.',
                'Reconocimiento de la industria a nivel Latinoamérica.',
                'Networking con líderes de seguridad.',
              ],
            },
          ],
        },
      },
      {
        id: 'premiacao-primeiro-lugar',
        title: {
          pt: '8.2 Primeiro Lugar',
          es: '8.2 Primer Lugar',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Uma experiência de imersão global na MSA Safety e acesso a um Summit de Inovação Internacional.',
            },
            {
              type: 'p',
              text: 'Uma visita guiada para conhecer de perto as inovações que estão definindo o futuro da segurança em nível mundial.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Una experiencia de inmersión global en MSA Safety y acceso a un Summit Internacional de Innovación.',
            },
            {
              type: 'p',
              text: 'Un recorrido diseñado para conocer de primera mano las innovaciones que están definiendo el futuro de la seguridad a nivel mundial.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'submissao',
    title: {
      pt: '9. Processo de Submissão',
      es: '9. Proceso de Envío',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'A submissão dos projetos é realizada exclusivamente pelo formulário eletrônico disponível no site oficial do Safety Innovation Awards.',
        },
        {
          type: 'ul',
          items: [
            'O formulário leva aproximadamente 15-20 minutos para ser preenchido.',
            'É permitido anexar um arquivo de apoio (opcional) para complementar a submissão.',
            'A submissão pode conter até 3 participantes (1 obrigatório + 2 opcionais).',
            'O campo "Incentivador" é opcional e destina-se a indicar a pessoa que motivou a inscrição.',
          ],
        },
      ],
      es: [
        {
          type: 'p',
          text: 'El envío de los proyectos se realiza exclusivamente a través del formulario electrónico disponible en el sitio oficial de los Safety Innovation Awards.',
        },
        {
          type: 'ul',
          items: [
            'El formulario toma aproximadamente 15-20 minutos para completarse.',
            'Se permite adjuntar un archivo de apoyo (opcional) para complementar el envío.',
            'El envío puede incluir hasta 3 participantes (1 obligatorio + 2 opcionales).',
            'El campo "Impulsor" es opcional y se destina a indicar la persona que motivó la inscripción.',
          ],
        },
      ],
    },
  },
  {
    id: 'propriedade',
    title: {
      pt: '10. Propriedade Intelectual e Uso de Imagem',
      es: '10. Propiedad Intelectual y Uso de Imagen',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Ao submeter um projeto, o participante declara que:',
        },
        {
          type: 'ul',
          items: [
            'É o autor ou possui autorização para apresentar o projeto.',
            'O conteúdo submetido não infringe direitos de terceiros.',
            'Autoriza a MSA Safety a utilizar o nome do projeto, empresa e participantes para fins de divulgação do prêmio, incluindo materiais de marketing, redes sociais e imprensa.',
          ],
        },
        {
          type: 'p',
          text: 'A propriedade intelectual do projeto permanece integralmente com o participante/empresa.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Al enviar un proyecto, el participante declara que:',
        },
        {
          type: 'ul',
          items: [
            'Es el autor o posee autorización para presentar el proyecto.',
            'El contenido enviado no infringe derechos de terceros.',
            'Autoriza a MSA Safety a utilizar el nombre del proyecto, empresa y participantes con fines de divulgación del premio, incluyendo materiales de marketing, redes sociales y prensa.',
          ],
        },
        {
          type: 'p',
          text: 'La propiedad intelectual del proyecto permanece íntegramente con el participante/empresa.',
        },
      ],
    },
  },
  {
    id: 'confidencialidade',
    title: {
      pt: '11. Confidencialidade e Proteção de Dados',
      es: '11. Confidencialidad y Protección de Datos',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'A MSA Safety se compromete a:',
        },
        {
          type: 'ul',
          items: [
            'Tratar os dados pessoais dos participantes em conformidade com a legislação aplicável de proteção de dados (LGPD e equivalentes).',
            'Não compartilhar informações confidenciais dos projetos com terceiros sem autorização prévia.',
            'Utilizar os dados fornecidos exclusivamente para fins relacionados ao prêmio.',
          ],
        },
      ],
      es: [
        {
          type: 'p',
          text: 'MSA Safety se compromete a:',
        },
        {
          type: 'ul',
          items: [
            'Tratar los datos personales de los participantes conforme a la legislación aplicable de protección de datos.',
            'No compartir información confidencial de los proyectos con terceros sin autorización previa.',
            'Utilizar los datos proporcionados exclusivamente para fines relacionados con el premio.',
          ],
        },
      ],
    },
  },
  {
    id: 'disposicoes',
    title: {
      pt: '12. Disposições Gerais',
      es: '12. Disposiciones Generales',
    },
    blocks: {
      pt: [
        {
          type: 'ul',
          items: [
            'A MSA Safety se reserva o direito de alterar este regulamento a qualquer momento, mediante comunicação prévia aos participantes.',
            'Situações não previstas neste regulamento serão resolvidas pela organização do prêmio.',
            'A participação no prêmio implica na aceitação integral deste regulamento.',
            'Funcionários da MSA Safety e seus familiares diretos não estão elegíveis para participar.',
          ],
        },
      ],
      es: [
        {
          type: 'ul',
          items: [
            'MSA Safety se reserva el derecho de modificar este reglamento en cualquier momento, mediante comunicación previa a los participantes.',
            'Situaciones no previstas en este reglamento serán resueltas por la organización del premio.',
            'La participación en el premio implica la aceptación integral de este reglamento.',
            'Los empleados de MSA Safety y sus familiares directos no son elegibles para participar.',
          ],
        },
      ],
    },
  },
  {
    id: 'contato',
    title: {
      pt: '13. Contato',
      es: '13. Contacto',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Para dúvidas sobre este regulamento ou sobre o prêmio, entre em contato:',
        },
        {
          type: 'p',
          text: 'E-mail: BRSP.MarketingApprentice3@MSASafety.com',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Para consultas sobre este reglamento o sobre el premio, contacte:',
        },
        {
          type: 'p',
          text: 'E-mail: BRSP.MarketingApprentice3@MSASafety.com',
        },
      ],
    },
  },
];
