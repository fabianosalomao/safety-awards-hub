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
    id: 'introducao',
    title: {
      pt: '1. Introdução',
      es: '1. Introducción',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Este regulamento tem como finalidade estabelecer as regras, critérios, etapas, responsabilidades e condições de participação no Safety Innovation Awards 2026 (SIA 26), assegurando um processo transparente, ético e imparcial para inscrição, avaliação e premiação de projetos.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Este reglamento tiene como finalidad establecer las reglas, criterios, etapas, responsabilidades y condiciones de participación en el Safety Innovation Awards 2026 (SIA 26), asegurando un proceso transparente, ético e imparcial para la inscripción, evaluación y premiación de proyectos.',
        },
      ],
    },
  },
  {
    id: 'o-que-e-o-safety-innovation-awards-sia',
    title: {
      pt: '2. O que é o Safety Innovation Awards (SIA)',
      es: '2. ¿Qué es el Safety Innovation Awards (SIA)?',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'O Safety Innovation Awards (SIA) é uma premiação independente, promovida pela MSA Safety no âmbito da região da América Latina (LAR), criada para reconhecer inovações de segurança implementadas - soluções reais, aplicadas nas operações, nos processos e na cultura das pessoas - que elevem a segurança a novos patamares na região.',
        },
        {
          type: 'p',
          text: 'O SIA destaca iniciativas sustentadas por evidências concretas de melhoria, que demonstram a capacidade da inovação de transformar o trabalho, fortalecer a prevenção e reforçar o compromisso com a proteção das pessoas.',
        },
        {
          type: 'p',
          text: 'Para assegurar independência, rigor técnico e credibilidade no processo, o SIA conta com a avaliação de um júri externo composto por 11 especialistas da região LAR, profissionais reconhecidos no setor e provenientes de diferentes empresas, segmentos industriais e disciplinas dentro de EHS. Esses jurados são ex-palestrantes e painelistas das edições 2022 e 2024 do Safety Summit, e atualmente integram o núcleo de curadoria da agenda do Safety Summit 2026, trazendo ao prêmio uma perspectiva profunda, plural e alinhada às tendências contemporâneas de segurança.',
        },
        {
          type: 'p',
          text: 'Embora seja independente em sua governança e processo, o anúncio dos finalistas e do vencedor ocorrerá na noite do primeiro dia do Safety Summit, em 06 de maio de 2026, onde o evento servirá como palco de reconhecimento público.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'El Safety Innovation Awards (SIA) es una premiación independiente, promovida por MSA Safety en el ámbito de la región de América Latina (LAR), creada para reconocer innovaciones de seguridad implementadas — soluciones reales, aplicadas en las operaciones, en los procesos y en la cultura de las personas — que eleven la seguridad a nuevos estándares en la región.',
        },
        {
          type: 'p',
          text: 'El SIA destaca iniciativas sustentadas por evidencias concretas de mejora, que demuestran la capacidad de la innovación de transformar el trabajo, fortalecer la prevención y reforzar el compromiso con la protección de las personas.',
        },
        {
          type: 'p',
          text: 'Para asegurar independencia, rigor técnico y credibilidad en el proceso, el SIA cuenta con la evaluación de un jurado externo compuesto por 11 especialistas de la región LAR, profesionales reconocidos en el sector y provenientes de diferentes empresas, segmentos industriales y disciplinas dentro de EHS.',
        },
        {
          type: 'p',
          text: 'Aunque es independiente en su gobernanza y proceso, el anuncio de los finalistas y del ganador tendrá lugar en la noche del primer día del Safety Summit, el 06 de mayo de 2026, donde el evento servirá como escenario de reconocimiento público.',
        },
      ],
    },
  },
  {
    id: 'proposito-do-premio',
    title: {
      pt: '3. Propósito do Prêmio',
      es: '3. Propósito del Premio',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'O propósito do SIA vai além do reconhecimento simbólico. O prêmio existe para:',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'El propósito del SIA va más allá del reconocimiento simbólico. El premio existe para:',
        },
      ],
    },
    subsections: [
      {
        id: 'proposito-3-1',
        title: {
          pt: '3.1 Estimular a Inovação Aplicada',
          es: '3.1 Estimular la Innovación Aplicada',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Valorizar soluções de segurança implementadas que saiam do papel e melhorem de forma tangível as condições de trabalho, promovendo ambientes mais seguros, saudáveis e sustentáveis. O SIA reconhece iniciativas que aprimoram a capacidade das operações de lidar com riscos, fortalecem a prevenção e ampliam a proteção das pessoas. Esses resultados devem ser demonstrados por meio de evidências práticas, indicadores relevantes e percepções qualitativas que confirmem que o trabalho se tornou mais seguro, mais confiável e mais bem suportado.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Valorar soluciones de seguridad implementadas que salgan del papel y mejoren de forma tangible las condiciones de trabajo, promoviendo ambientes más seguros, saludables y sostenibles.',
            },
          ],
        },
      },
      {
        id: 'proposito-3-2',
        title: {
          pt: '3.2 Inspirar o Setor e Propagar Progresso',
          es: '3.2 Inspirar al Sector y Propagar el Progreso',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Reconhecer e amplificar iniciativas que sirvam como faróis de transformação para toda a região. O SIA busca destacar soluções capazes de mudar narrativas, provocar reflexões e estimular organizações a questionarem suas próprias práticas, adotarem novos referenciais e enxergarem a segurança sob uma perspectiva mais moderna, humana e inteligente.',
            },
            {
              type: 'p',
              text: 'Ao tornar visíveis histórias reais de coragem, criatividade e evolução, o SIA fortalece um movimento coletivo que eleva o padrão de segurança na LAR, incentivando o compartilhamento de aprendizados, a replicação de modelos bem-sucedidos e a criação de uma cultura regional que valoriza a inovação como caminho para o progresso contínuo.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Reconocer y amplificar iniciativas que sirvan como faros de transformación para toda la región.',
            },
          ],
        },
      },
      {
        id: 'proposito-3-3',
        title: {
          pt: '3.3 Promover Integridade, Responsabilidade e Perenidade',
          es: '3.3 Promover Integridad, Responsabilidad y Sostenibilidad',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Reforçar o compromisso de que toda inovação em segurança deve ser eticamente sólida, socialmente responsável e sustentada por práticas de integridade. O SIA valoriza projetos que respeitam pessoas, operações e comunidades, além de demonstrar capacidade de continuidade e governança para garantir que os resultados obtidos se mantenham ao longo do tempo.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Reforzar el compromiso de que toda innovación en seguridad debe ser éticamente sólida, socialmente responsable y sustentada por prácticas de integridad.',
            },
          ],
        },
      },
      {
        id: 'proposito-3-4',
        title: {
          pt: '3.4 Fortalecer Aprendizagem, Colaboração e Consciência Coletiva',
          es: '3.4 Fortalecer el Aprendizaje, la Colaboración y la Conciencia Colectiva',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Estimular a criação de um ambiente em que profissionais e organizações compartilhem aprendizados, reforcem capacidades e ampliem sua visão sobre segurança. O SIA busca fomentar uma comunidade regional que colabora, troca experiências, se apoia e se inspira mutuamente - contribuindo para uma construção conjunta de um futuro mais seguro na América Latina.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Estimular la creación de un ambiente en que profesionales y organizaciones compartan aprendizajes, refuercen capacidades y amplíen su visión sobre seguridad.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'participacao-e-elegibilidade',
    title: {
      pt: '4. Participação e Elegibilidade',
      es: '4. Participación y Elegibilidad',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'O Safety Innovation Awards (SIA) é uma premiação regional da Latin America Region (LAR) e reconhece que a inovação em segurança pode surgir de diferentes perfis profissionais, áreas, setores industriais e níveis de maturidade das organizações. Por isso, sua participação é ampla, inclusiva e voltada a profissionais que atuam diretamente no contexto real de trabalho, onde a segurança se materializa.',
        },
        {
          type: 'p',
          text: 'Podem se inscrever:',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'El Safety Innovation Awards (SIA) es una premiación regional de la Latin America Region (LAR) y reconoce que la innovación en seguridad puede surgir de diferentes perfiles profesionales, áreas, sectores industriales y niveles de madurez de las organizaciones.',
        },
      ],
    },
    subsections: [
      {
        id: 'participacao-4-1',
        title: {
          pt: '4.1 Profissionais elegíveis',
          es: '4.1 Profesionales elegibles',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Profissionais que atuam em empresas públicas ou privadas, de qualquer porte, segmento ou estrutura organizacional, desde que atuantes em países da região LAR.',
            },
            {
              type: 'p',
              text: 'Pessoas que estejam integralmente ou parcialmente envolvidas na implementação da solução, incluindo EHS, Operações, Engenharia, Manutenção, Produção, Tecnologia, Ergonomia, Qualidade, Recursos Humanos, Projetos e áreas correlatas.',
            },
            {
              type: 'ul',
              items: [
                'Profissionais de qualquer nível organizacional hierárquico que lideraram, coordenaram ou apoiaram diretamente a implementação da inovação, mesmo que não tenham sido seus idealizadores originais.',
                'Equipes multidisciplinares, refletindo a natureza real do trabalho e a complexidade das operações na região.',
                'Trabalhadores de campo, supervisores, técnicos e analistas — reconhecendo que a inovação em segurança frequentemente nasce da prática real.',
                'Prestadores de serviço, contratadas e terceirizadas que atuem dentro do ambiente operacional da empresa onde a inovação foi aplicada, desde que com autorização formal da organização onde o projeto foi implementado.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Profesionales que actúan en empresas públicas o privadas, de cualquier tamaño, segmento o estructura organizacional, siempre que operen en países de la región LAR.',
            },
          ],
        },
      },
      {
        id: 'participacao-4-2',
        title: {
          pt: '4.2 Restrições Específicas quanto a Consultorias e Fornecedores',
          es: '4.2 Restricciones Específicas sobre Consultorías y Proveedores',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Para garantir a integridade e independência do prêmio:',
            },
            {
              type: 'ul',
              items: [
                'Empresas de consultoria, profissionais autônomos prestadores de serviços externos, integradores, revendedores, distribuidores ou fornecedores de tecnologia/equipamentos não podem submeter cases ao SIA.',
                'Apenas profissionais da empresa onde a inovação foi implementada - envolvidos diretamente na adoção, aplicação ou gestão da iniciativa - podem inscrever o projeto.',
                'Projetos conduzidos com apoio de consultorias podem ser submetidos somente se a inscrição for realizada por profissionais da empresa beneficiária, deixando claro que a propriedade, responsabilidade e impacto da inovação pertencem à organização usuária.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Para garantizar la integridad e independencia del premio:',
            },
          ],
        },
      },
      {
        id: 'participacao-4-3',
        title: {
          pt: '4.3 Natureza dos projetos elegíveis',
          es: '4.3 Naturaleza de los proyectos elegibles',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Os projetos inscritos devem refletir inovação aplicada ao contexto real de trabalho dentro da região LAR. São considerados elegíveis os projetos que atendam às seguintes características:',
            },
            {
              type: 'p',
              text: '4.3.1 - Implementação em ambiente real de operação',
            },
            {
              type: 'p',
              text: 'O projeto deve ter sido testado, validado ou plenamente implementado em ambiente real de trabalho, podendo estar em diferentes estágios de maturidade, tais como:',
            },
            {
              type: 'ul',
              items: [
                'piloto aplicado e validado em operação real;',
                'rollout parcial em uma ou mais unidades;',
                'adoção plena como prática estabelecida.',
              ],
            },
            {
              type: 'p',
              text: 'A implementação deve ser comprovada por evidências concretas, como dados, indicadores, registros, documentos técnicos, fotos, vídeos, depoimentos ou relatos de uso real.',
            },
            {
              type: 'p',
              text: 'Projetos em diferentes estágios de implementação - piloto aplicado e validado, rollout parcial ou adoção plena - podem participar do SIA. Contudo, a maturidade da implementação é um fator explícito de avaliação. Iniciativas que atingiram adoção plena, por apresentarem maior consistência, continuidade e evidências mais robustas, tendem a receber pontuações superiores. Projetos em estágio inicial são avaliados de forma proporcional ao seu nível de evolução, garantindo equidade entre iniciativas com diferentes graus de maturidade.',
            },
            {
              type: 'p',
              text: '4.3.2 - Contribuição direta para a segurança',
            },
            {
              type: 'p',
              text: 'A inovação deve aprimorar as condições de trabalho, reforçar a prevenção e ampliar a capacidade das pessoas e sistemas de lidarem com riscos, podendo incluir:',
            },
            {
              type: 'ul',
              items: [
                'Redução de exposições e melhoria das condições de trabalho: Soluções voltadas a diminuir ou eliminar exposições a perigos físicos, ergonômicos, químicos, psicossociais ou operacionais.',
                'Fortalecimento de barreiras e defesas operacionais: Iniciativas que ampliam a robustez do sistema por meio de controles técnicos, administrativos ou organizacionais.',
                'Otimização da execução do trabalho e fortalecimento da performance humana: Melhorias que tornam tarefas críticas mais simples, claras e confiáveis.',
                'Fortalecimento de cultura, clima e práticas colaborativas de segurança: Iniciativas que incentivam diálogo aberto, participação ativa, tomada de decisão madura, aprendizagem contínua e confiança mútua.',
                'Soluções tecnológicas aplicadas ao suporte da tomada de decisão e à visibilidade operacional: Tecnologias que ampliam a capacidade de perceber condições, antecipar riscos e responder de forma adequada.',
                'Simplificação de processos e aumento da confiabilidade da informação: Inovações que reduzem burocracias desnecessárias, eliminam etapas redundantes e aprimoram a forma como informações de EHS são registradas, comunicadas e verificadas.',
              ],
            },
            {
              type: 'p',
              text: '4.3.3 - Escala variada: de incremental a transformacional',
            },
            {
              type: 'p',
              text: 'Projetos de diferentes magnitudes são elegíveis, desde melhorias simples até transformações completas de processos, desde que implementados e sustentados por evidências de impacto. Podem incluir:',
            },
            {
              type: 'ul',
              items: [
                'Melhorias incrementais de alto impacto local: Ajustes simples, rápidos ou pontuais que solucionam problemas reais do trabalho cotidiano.',
                'Inovações radicais de médio porte: Soluções que envolvem múltiplas áreas, times ou etapas do processo.',
                'Transformações amplas ou disruptivas: Mudanças estruturais que redesenham práticas, processos, fluxos ou modelos operacionais.',
              ],
            },
            {
              type: 'p',
              text: 'O impacto pode ser demonstrado por evidências como indicadores, fotos, vídeos, depoimentos, dashboards, auditorias, análises comparativas ou outros registros relevantes.',
            },
            {
              type: 'p',
              text: '4.3.4 - Origem em qualquer nível da organização',
            },
            {
              type: 'p',
              text: 'A inovação pode surgir de diferentes áreas, funções e níveis hierárquicos da organização. São elegíveis iniciativas originadas em:',
            },
            {
              type: 'ul',
              items: [
                'Linha de frente: Soluções criadas ou aprimoradas por quem executa o trabalho diretamente.',
                'Liderança: Iniciativas conduzidas por supervisores, coordenadores e gestores.',
                'Áreas técnicas especializadas: Inovações oriundas de EHS, Engenharia, Manutenção, Ergonomia, Qualidade, RH, TI ou outras áreas.',
                'Equipes multidisciplinares: Projetos desenvolvidos de forma colaborativa, aproveitando competências diversas.',
              ],
            },
            {
              type: 'p',
              text: 'Independentemente da origem, o projeto deve ser de autoria legítima dos participantes, respeitando confidencialidade, integridade e direitos autorais.',
            },
            {
              type: 'p',
              text: '4.3.5 - Conformidade ética, legal e regulatória',
            },
            {
              type: 'p',
              text: 'A participação no SIA exige que todas as iniciativas respeitem integralmente as normas que orientam a atuação responsável, segura e íntegra da organização. Serão automaticamente desclassificadas iniciativas que violem qualquer requisito de conformidade, incluindo:',
            },
            {
              type: 'ul',
              items: [
                'Legislação aplicável: Projetos que contrariam leis, regulamentações governamentais ou Normas Regulamentadoras não são elegíveis.',
                'Normas técnicas e requisitos de segurança: Soluções que ignoram, distorcem ou descumprem normas técnicas serão excluídas.',
                'Integridade e políticas de compliance: São vedadas iniciativas que envolvam manipulação de dados, omissão de riscos, conflitos de interesse, uso indevido de recursos, influência inadequada sobre avaliadores, benefícios indevidos a qualquer parte envolvida.',
                'Princípios éticos, sociais ou ambientais: Inovações que resultem em impactos negativos injustificados não serão aceitas.',
                'Propriedade intelectual de terceiros: São proibidas submissões que utilizem, sem autorização formal, tecnologias, metodologias, imagens, marcas ou materiais protegidos por direitos autorais, patentes ou registros industriais de outras organizações ou pessoas.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Los proyectos inscritos deben reflejar innovación aplicada al contexto real de trabajo dentro de la región LAR.',
            },
          ],
        },
      },
      {
        id: 'participacao-4-4',
        title: {
          pt: '4.4 Modalidade de Participação',
          es: '4.4 Modalidad de Participación',
        },
        blocks: {
          pt: [
            {
              type: 'ul',
              items: [
                'As inscrições para o Safety Innovation Awards (SIA) podem ser realizadas de forma individual ou em equipe, refletindo a natureza colaborativa da inovação em segurança na LAR. Cada equipe pode ser composta por até 3 integrantes, todos envolvidos de maneira direta e comprovável na implementação da inovação.',
                'Um mesmo profissional pode participar de múltiplos projetos, sem qualquer limite, desde que sua contribuição para cada iniciativa seja real e justificável. Da mesma forma, não há limite de projetos por empresa, unidade, área ou país.',
                'Cada projeto pode, desde o momento da inscrição, contar com a figura de um facilitador e incentivador - alguém que não necessariamente participou da implementação, mas que incentivou, estimulou e apoiou a inscrição. O incentivador não compõe a equipe técnica, não participa da avaliação e não interfere nos critérios de elegibilidade ou mérito. Jurados podem atuar como facilitadores, desde que não avaliem o projeto que apadrinham. Profissionais da MSA Safety não podem ser facilitadores.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Las inscripciones pueden realizarse de forma individual o en equipo. Cada equipo puede estar compuesto por hasta 3 integrantes.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'da-submissao-do-projeto',
    title: {
      pt: '5. Da submissão do projeto',
      es: '5. De la presentación del proyecto',
    },
    subsections: [
      {
        id: 'submissao-5-1',
        title: {
          pt: '5.1 Estrutura Recomendada do Case',
          es: '5.1 Estructura Recomendada del Caso',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'As submissões devem ser realizadas exclusivamente pelo formulário digital disponível no portal oficial: https://sia.safetysummit.com.br',
            },
            {
              type: 'p',
              text: 'Os cases podem ser enviados em Português, Espanhol ou Inglês, conforme a preferência da equipe participante.',
            },
            {
              type: 'p',
              text: 'O período de inscrições estará aberto de 23 de fevereiro a 13 de março de 2026.',
            },
            {
              type: 'p',
              text: 'Para garantir consistência, transparência e comparabilidade entre todas as submissões, os projetos devem seguir - preferencialmente - a estrutura abaixo. Cada seção foi pensada para permitir ao avaliador compreender a lógica do problema, a racionalidade da solução, o rigor das evidências e a profundidade dos aprendizados.',
            },
            {
              type: 'p',
              text: 'A clareza, objetividade e qualidade das evidências são dimensões avaliadas e influenciam diretamente a nota final.',
            },
            {
              type: 'p',
              text: '5.1.1 Título do Projeto — Deve ser direto, informativo e comunicar de forma imediata o foco da inovação. Títulos eficazes geralmente combinam ação + objetivo + impacto (ex.: "Digitalização da Inspeção de Frotas para Redução de Ocorrências Críticas").',
            },
            {
              type: 'p',
              text: '5.1.2 Dados dos Participantes — Informações essenciais para identificar a equipe e garantir a integridade do processo. Incluir: Nome completo, Cargo / Função, Empresa, País, E-mail, Telefone. A equipe pode ter opcionalmente até 3 integrantes e um facilitador conforme descrito na modalidade de participação.',
            },
            {
              type: 'p',
              text: '5.1.3 Contexto / Problema Identificado (Cenário Passado) — Nesta seção, o participante deve explicar por que a solução era necessária, descrevendo de forma objetiva o cenário inicial: como o trabalho era realizado, quais eram as condições reais da operação e quais limitações ou dificuldades estavam presentes. É importante apresentar os riscos de acidentes existentes, mostrando como eles se manifestavam, seu nível de severidade, frequência e o potencial de dano. Também devem ser descritos os principais problemas observados. Para dar credibilidade ao diagnóstico, é essencial incluir dados concretos. Quanto mais claro e bem sustentado for esse diagnóstico, mais fácil será compreender o impacto real do projeto.',
            },
            {
              type: 'p',
              text: '5.1.4 Solução Implementada — Nesta seção, o participante deve explicar de maneira clara o que foi feito, como foi feito e por que a solução gerou impacto real na segurança e na operação. O texto deve mostrar não só a mudança implementada, mas também como ela levou em conta as características do trabalho real, a variabilidade das atividades, os limites humanos e as interações entre áreas.',
            },
            {
              type: 'p',
              text: '5.1.5 Resultados Obtidos — A seção de resultados deve mostrar, de forma objetiva, o que mudou após a implementação e por que essa mudança representa um avanço relevante no trabalho real. A comparação entre o cenário anterior e o atual deve evidenciar reduções de exposição, maior previsibilidade das tarefas, mais confiabilidade dos processos e melhores condições para que as pessoas trabalhem com segurança.',
            },
            {
              type: 'p',
              text: '5.1.6 Principais Aprendizados — A seção de aprendizados deve mostrar, de forma direta, o que a equipe descobriu ao transformar a solução em prática. É importante destacar como interações com diferentes áreas, desafios encontrados no campo e ajustes feitos ao longo da jornada geraram novos entendimentos sobre o trabalho, os riscos e a própria solução.',
            },
            {
              type: 'p',
              text: '5.1.7 O que faria diferente — Nesta seção, o participante deve refletir de forma objetiva sobre o que poderia ter sido feito de maneira diferente ao longo do projeto. O propósito é evidenciar aprendizado aplicado, reconhecendo pontos que, se abordados de outra maneira, teriam aumentado a eficiência da implementação, reduzido obstáculos ou acelerado a obtenção de resultados.',
            },
            {
              type: 'p',
              text: '5.1.8 Arquivos de apoio — A seção de arquivos de apoio deve reunir os materiais que sustentam o case e comprovam, de forma objetiva, o impacto da solução. Os participantes podem anexar até cinco arquivos, totalizando 20MB, incluindo apresentações, fotos, vídeos, relatórios técnicos, dashboards, documentos de validação, procedimentos revisados, registros de sistemas ou apresentações que detalhem a iniciativa.',
            },
            {
              type: 'p',
              text: '5.1.9 Nota Final aos Participantes — A capacidade de descrever o caso de forma coesa, concisa e tecnicamente fundamentada, aliada à qualidade das evidências apresentadas, é determinante no processo de avaliação. Um case bem estruturado demonstra maturidade na análise de risco, compreensão do impacto e rigor na documentação - atributos essenciais para reconhecimento no SIA.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Las presentaciones deben realizarse exclusivamente a través del formulario digital disponible en el portal oficial.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'criterios-avaliativos',
    title: {
      pt: '6. Critérios Avaliativos',
      es: '6. Criterios de Evaluación',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'A avaliação dos cases se baseia em cinco pilares essenciais - Impacto na Segurança, Impacto Cultural, Inovação Tecnológica, Viabilidade Econômica e Diferencial Tecnológico. Esses pilares permitem entender, de forma objetiva, o valor que cada projeto gera para as pessoas e orientam os jurados a reconhecer iniciativas que realmente melhoram a experiência de trabalho e elevam o padrão de segurança.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'La evaluación de los casos se basa en cinco pilares esenciales — Impacto en la Seguridad, Impacto Cultural, Innovación Tecnológica, Viabilidad Económica y Diferencial Tecnológico.',
        },
      ],
    },
    subsections: [
      {
        id: 'criterios-6-1',
        title: {
          pt: '6.1 Potencial Impacto na Segurança',
          es: '6.1 Potencial Impacto en la Seguridad',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Este pilar avalia a mudança concreta gerada no trabalho real após a implementação da solução. Não se trata apenas de apresentar números, mas de demonstrar como o projeto reduziu riscos, exposições e incidentes de maneira consistente e sustentada. O foco está na transformação visível do cenário operacional: controles mais claros, tarefas mais previsíveis, menor margem de erro e maior estabilidade na execução.',
            },
            {
              type: 'p',
              text: 'Aqui, a profundidade vem da capacidade de mostrar vínculo causal entre a solução e os resultados - evidenciando por que a mudança aconteceu e como ela se manifesta no dia a dia. Projetos fortes nesse pilar mostram que o trabalho ficou mais seguro não por esforço adicional, mas porque o sistema passou a apoiar melhor quem executa a atividade.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Este pilar evalúa el cambio concreto generado en el trabajo real tras la implementación de la solución.',
            },
          ],
        },
      },
      {
        id: 'criterios-6-2',
        title: {
          pt: '6.2 Impacto Cultural',
          es: '6.2 Impacto Cultural',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Esse pilar examina a força com que o projeto influenciou comportamentos, rotinas e percepções sobre segurança. Trata-se de observar não só o engajamento da equipe, mas como a iniciativa mobilizou pessoas, aproximou lideranças e reforçou práticas que permanecem ativas após a implementação.',
            },
            {
              type: 'p',
              text: 'O impacto cultural se evidencia quando as pessoas passam a reconhecer o valor da solução, adotam novas rotinas com naturalidade, discutem riscos com mais clareza e demonstram maior alinhamento na forma de trabalhar.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Este pilar examina la fuerza con que el proyecto influyó en comportamientos, rutinas y percepciones sobre seguridad.',
            },
          ],
        },
      },
      {
        id: 'criterios-6-3',
        title: {
          pt: '6.3 Inovação Tecnológica',
          es: '6.3 Innovación Tecnológica',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Este pilar avalia o caráter original e criativo da solução, independentemente de envolver tecnologia digital, automação, reorganização de processos ou novos métodos de trabalho. O que importa é a forma como a inovação foi aplicada para resolver um problema real de maneira mais eficaz que as abordagens anteriores.',
            },
            {
              type: 'p',
              text: 'Projetos com forte inovação tecnológica mostram que a equipe fez algo além do óbvio: combinou informações de forma inteligente, simplificou fluxos complexos, criou meios mais robustos de controlar riscos ou apresentou uma lógica nova para lidar com uma vulnerabilidade persistente.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Este pilar evalúa el carácter original y creativo de la solución, independientemente de que involucre tecnología digital, automatización, reorganización de procesos o nuevos métodos de trabajo.',
            },
          ],
        },
      },
      {
        id: 'criterios-6-4',
        title: {
          pt: '6.4 Viabilidade Econômica',
          es: '6.4 Viabilidad Económica',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Este pilar analisa a viabilidade da solução no longo prazo, considerando custo, simplicidade operacional, manutenção e retorno gerado. Uma solução inovadora só tem valor real se puder ser mantida de forma estável e se os benefícios compensarem o investimento - seja financeiro, seja operacional.',
            },
            {
              type: 'p',
              text: 'A profundidade está em demonstrar que o projeto não é um ganho pontual, mas algo que pode continuar produzindo resultados de maneira contínua, com custos administráveis, fluxo claro de responsabilidades e baixa dependência de ações extraordinárias.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Este pilar analiza la viabilidad de la solución a largo plazo, considerando costo, simplicidad operacional, mantenimiento y retorno generado.',
            },
          ],
        },
      },
      {
        id: 'criterios-6-5',
        title: {
          pt: '6.5 Diferencial Tecnológico',
          es: '6.5 Diferencial Tecnológico',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Este pilar avalia quão avançada, escalável e replicável é a solução, especialmente no uso de tecnologias emergentes ou em arquiteturas que permitem expansão com qualidade. Não basta adotar tecnologia: é preciso demonstrar que ela foi aplicada de forma pertinente, que funciona em diferentes contextos e que tem potencial para gerar impacto ampliado na organização.',
            },
            {
              type: 'p',
              text: 'A profundidade aqui está em mostrar que a solução não depende de um ambiente específico ou de poucos indivíduos para funcionar bem. Projetos que se destacam nesse pilar trazem tecnologias ou métodos que se adaptam, se multiplicam e mantêm desempenho consistente em novos cenários — tornando-se referência e ponto de partida para outras unidades, países ou processos.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Este pilar evalúa cuán avanzada, escalable y replicable es la solución, especialmente en el uso de tecnologías emergentes.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'processo-seletivo',
    title: {
      pt: '7. Processo Seletivo',
      es: '7. Proceso Selectivo',
    },
    subsections: [
      {
        id: 'processo-7-1',
        title: {
          pt: '7.1 Primeira Fase',
          es: '7.1 Primera Fase',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Período: 23/02/2026 a 27/03/2026',
            },
            {
              type: 'p',
              text: 'A Primeira Fase consiste na avaliação inicial de todos os projetos submetidos dentro do prazo oficial determinado. Nessa etapa, cada case é analisado por meio do Scorecard SIA - o instrumento oficial de avaliação do programa, que traduz os cinco pilares do SIA em critérios objetivos, mensuráveis e diretamente conectados ao impacto para as pessoas e à qualidade da solução apresentada.',
            },
            {
              type: 'p',
              text: 'O Scorecard SIA organiza esses pilares em perguntas claras e baseadas em evidências, permitindo uma análise técnica rigorosa e padronizada.',
            },
            {
              type: 'p',
              text: 'Para assegurar consistência, clareza e eficiência no grande volume de projetos submetidos, o SIA poderá utilizar ferramentas de apoio inteligente baseadas em IA na etapa preliminar da Primeira Fase, exclusivamente para ler, organizar, sintetizar e estruturar as informações contidas nos cases. Essas ferramentas também poderão gerar sugestões iniciais de preenchimento do Scorecard SIA, de acordo com os critérios objetivos estabelecidos.',
            },
            {
              type: 'p',
              text: 'Essas sugestões têm caráter não vinculante e não substituem o julgamento humano. Toda a avaliação oficial da Primeira Fase - incluindo a validação, ajuste ou substituição das sugestões automatizadas - é conduzida exclusivamente pela equipe técnica da MSA, que assegura isonomia, coerência metodológica e aderência total ao regulamento.',
            },
            {
              type: 'p',
              text: 'Ao final desse processo, os 20 projetos com maior pontuação avançam para a Segunda Fase, compondo o grupo de classificados que seguirá para avaliação aprofundada e para os momentos de defesa dos cases.',
            },
            {
              type: 'p',
              text: 'Ao término da Fase Classificatória, a MSA realiza a divulgação oficial dos 20 projetos selecionados, seguindo duas etapas:',
            },
            {
              type: 'ul',
              items: [
                'Notificação individual, enviada formalmente por e-mail aos integrantes das equipes classificadas, incluindo seus facilitadores, quando houver;',
                'Publicação da lista dos 20 classificados no portal oficial do SIA, apresentada em ordem alfabética dos títulos, garantindo transparência plena.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Período: 23/02/2026 a 27/03/2026. La Primera Fase consiste en la evaluación inicial de todos los proyectos presentados dentro del plazo oficial.',
            },
          ],
        },
      },
      {
        id: 'processo-7-2',
        title: {
          pt: '7.2 Segunda Fase',
          es: '7.2 Segunda Fase',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Período: 30/03/2026 a 24/04/2026',
            },
            {
              type: 'p',
              text: 'A Segunda Fase introduz um novo formato de avaliação dentro do SIA: a apresentação virtual em tempo real para o Júri Independente. Este encontro on-line pré-agendado e gravado tem o propósito de oferecer às equipes classificadas a oportunidade de apresentar sua solução de forma direta, estruturada e aprofundada.',
            },
            {
              type: 'p',
              text: '7.2.1 - Notificação e agendamento das sessões virtuais — Ao final da Primeira Fase e após a divulgação oficial dos 20 classificados, cada equipe recebe uma notificação individual com a confirmação da classificação, as diretrizes oficiais para elaboração e envio prévio do Pitch SIA, e a data e o horário já pré-agendados da sua apresentação virtual - realizadas entre 07/04 e 24/04/2026.',
            },
            {
              type: 'p',
              text: '7.2.2 - Envio prévio do Pitch SIA (Período: 30/03/2026 – 06/04/2026) — Após a notificação da classificação, cada equipe deve preparar e enviar o Pitch SIA, um vídeo curto e estratégico que apresenta, de maneira clara e objetiva, os principais elementos do projeto. O envio é obrigatório, constituindo condição indispensável para participação na apresentação virtual da Segunda Fase. O vídeo deve ter duração máxima de 5 minutos.',
            },
            {
              type: 'p',
              text: '7.2.3 - Apresentação Virtual com o Júri (Período: 07/04 a 24/04) — Cada equipe classificada participará de uma sessão on-line de 20 minutos com o Júri Independente:',
            },
            {
              type: 'ul',
              items: [
                '5 minutos – Destaques ao Vivo: A equipe apresenta apenas os pontos essenciais: o problema central, a essência da solução, o momento decisivo da jornada, o impacto mais relevante e o diferencial que torna o projeto único.',
                '15 minutos – Perguntas, respostas e Análises do Júri: O Júri Independente utiliza este tempo para aprofundar evidências, testar a consistência da lógica do projeto, esclarecer decisões críticas e avaliar a maturidade, criatividade e potencial de expansão da solução.',
              ],
            },
            {
              type: 'p',
              text: '7.2.4 – Avaliação dos Jurados (Período: 07/04 a 24/04) — A avaliação dos projetos classificados na Segunda Fase será conduzida exclusivamente pelo Júri Independente, utilizando o Scorecard SIA – Versão Pitch. A nota final de cada projeto será calculada pela média aritmética dos pontos atribuídos pelos jurados. Para garantir representatividade, cada projeto deve receber no mínimo 5 avaliações válidas. O scorecard será composto por notas de 1 a 5.',
            },
            {
              type: 'p',
              text: '7.2.5 – Princípios de Conduta Avaliativa — Para garantir integridade, rigor técnico e isonomia, todos os avaliadores do SIA conduzirão suas análises de acordo com as seguintes regras obrigatórias:',
            },
            {
              type: 'ul',
              items: [
                'A avaliação será inteiramente baseada em evidências verificáveis.',
                'Não serão realizadas inferências, complementações ou interpretações benevolentes.',
                'Isonomia absoluta será observada: todos os projetos serão avaliados sob o mesmo padrão de rigor.',
                'A responsabilidade sobre clareza, completude e qualidade do conteúdo é integralmente do proponente.',
                'O estilo narrativo não será critério de avaliação.',
                'A análise será conduzida com foco no trabalho real.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Período: 30/03/2026 a 24/04/2026. La Segunda Fase introduce un nuevo formato de evaluación: la presentación virtual en tiempo real para el Jurado Independiente.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'dos-finalistas-e-premiacao',
    title: {
      pt: '8. Dos Finalistas e Premiação',
      es: '8. De los Finalistas y Premiación',
    },
    subsections: [
      {
        id: 'finalistas-8-1',
        title: {
          pt: '8.1 Dos finalistas',
          es: '8.1 De los finalistas',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Ao término da avaliação da Segunda Fase, os três projetos com maior pontuação final, conforme as notas atribuídas pelo Júri Independente por meio do Scorecard SIA, são oficialmente reconhecidos como finalistas do SIA.',
            },
            {
              type: 'p',
              text: 'A divulgação dos finalistas ocorre simultaneamente por dois canais: um comunicado individual enviado às equipes classificadas - estendido aos respectivos facilitadores e às lideranças executivas de suas organizações - e a publicação no portal oficial do SIA.',
            },
            {
              type: 'p',
              text: 'Todos os finalistas são convidados a participar da plenária principal do Safety Summit, que ocorrerá nos dias 6 e 7 de maio de 2026. Na noite de 06 de maio, os três projetos finalistas serão apresentados e homenageados diante do público do evento.',
            },
            {
              type: 'p',
              text: 'A visibilidade dos finalistas não se restringe ao palco do evento. Seus cases serão amplamente divulgados nas redes sociais oficiais, nas gravações do podcast, e em revistas especializadas da área de Educação e Segurança do Trabalho. Toda a cerimônia de premiação será transmitida virtualmente.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Al término de la evaluación de la Segunda Fase, los tres proyectos con mayor puntuación final son oficialmente reconocidos como finalistas del SIA.',
            },
          ],
        },
      },
      {
        id: 'finalistas-8-2',
        title: {
          pt: '8.2 Dos ganhadores',
          es: '8.2 De los ganadores',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'A equipe vencedora - acompanhada de seu facilitador, quando houver - será anunciada no dia 06 de maio de 2026. O prêmio inclui o Troféu Oficial do SIA e uma experiência internacional exclusiva oferecida pela MSA Safety, estruturada em duas etapas complementares:',
            },
            {
              type: 'p',
              text: '8.2.1 Visita oficial às instalações corporativas da MSA — Os vencedores participarão de uma imersão técnica nas unidades corporativas da MSA nos Estados Unidos, onde terão acesso privilegiado a:',
            },
            {
              type: 'ul',
              items: [
                'Laboratórios de pesquisa, desenvolvimento e testes, conhecendo de perto os processos que validam novos produtos, tecnologias emergentes e soluções inovadoras.',
                'Linhas de fabricação e montagem, observando a engenharia, a precisão e o rigor que sustentam a qualidade de equipamentos usados globalmente para proteger vidas.',
                'Centros de treinamento e capacitação, onde são desenvolvidas práticas avançadas, simulações e metodologias modernas voltadas à formação de profissionais em segurança.',
                'Momentos de diálogo com engenheiros, cientistas, especialistas e líderes da MSA.',
              ],
            },
            {
              type: 'p',
              text: '8.2.2 - Participação de um Summit Internacional de Inovação — A jornada se completa com a participação em um Summit Internacional de Inovação para ter acesso a palestras internacionais, demonstrações de tecnologias emergentes, tendências globais, debates estratégicos, exposições de soluções inovadoras e networking com líderes e especialistas de inovação.',
            },
            {
              type: 'p',
              text: '8.2.3 - Termos de Viagem para os Ganhadores',
            },
            {
              type: 'p',
              text: 'Responsabilidades de Documentação: É de responsabilidade exclusiva dos participantes vencedores providenciar toda a documentação necessária para sua participação na expedição internacional, incluindo passaporte válido, vistos, autorizações de viagem e quaisquer requisitos específicos do país de destino. A MSA não se responsabiliza pela emissão, regularização, obtenção ou custos relacionados a tais documentos.',
            },
            {
              type: 'p',
              text: 'Despesas Custeadas pela MSA:',
            },
            {
              type: 'ul',
              items: [
                'Passagens aéreas internacionais e domésticas, quando aplicável;',
                'Hospedagem pelo período oficial da programação;',
                'Alimentação, conforme roteiro e atividades da expedição;',
                'Traslados oficiais previstos na programação.',
              ],
            },
            {
              type: 'p',
              text: 'Despesas Não Inclusas:',
            },
            {
              type: 'ul',
              items: [
                'Excesso de bagagem;',
                'Alimentação fora da programação oficial;',
                'Upgrades de assento, serviços adicionais de hotelaria ou room service;',
                'Compras pessoais, souvenirs ou itens de uso individual;',
                'Medicamentos ou despesas médicas não cobertas por seguro;',
                'Transporte não previsto pela organização.',
              ],
            },
            {
              type: 'p',
              text: 'O não atendimento às exigências de documentação por parte do participante poderá resultar na impossibilidade de participação, sem obrigatoriedade de compensação, reembolso ou remarcação por parte da MSA.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'El equipo ganador será anunciado el 06 de mayo de 2026. El premio incluye el Trofeo Oficial del SIA y una experiencia internacional exclusiva ofrecida por MSA Safety.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'termos-e-condicoes',
    title: {
      pt: '9. Termos e Condições',
      es: '9. Términos y Condiciones',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Ao submeter um projeto ao SIA – Safety Innovation Awards, o participante declara estar de acordo com todas as diretrizes deste regulamento e com as condições específicas que asseguram transparência, integridade e proteção das informações envolvidas.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Al presentar un proyecto al SIA – Safety Innovation Awards, el participante declara estar de acuerdo con todas las directrices de este reglamento.',
        },
      ],
    },
    subsections: [
      {
        id: 'termos-9-1',
        title: {
          pt: '9.1 Originalidade, Autoria e Veracidade das Informações',
          es: '9.1 Originalidad, Autoría y Veracidad de la Información',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Ao realizar a submissão ao SIA, o participante declara que:',
            },
            {
              type: 'ul',
              items: [
                'Participação efetiva: O projeto não precisa ser de autoria exclusiva do participante; no entanto, todos os membros da equipe devem ter participado de forma efetiva e comprovável.',
                'Veracidade e integridade: Todas as informações fornecidas são verdadeiras, completas, precisas e verificáveis.',
                'Responsabilidade pelos dados submetidos: A responsabilidade integral pelo conteúdo enviado é exclusivamente dos participantes. A MSA Safety não se responsabiliza por dados incorretos, omitidos ou imprecisos.',
                'Propriedade intelectual e direitos de uso: O conteúdo apresentado não viola direitos autorais, industriais ou de propriedade intelectual de terceiros.',
                'Implicações: O descumprimento de qualquer um desses princípios configura violação grave ao regulamento e pode resultar em desclassificação imediata.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Al realizar la presentación al SIA, el participante declara que toda la información proporcionada es veraz y que respeta los derechos de propiedad intelectual.',
            },
          ],
        },
      },
      {
        id: 'termos-9-2',
        title: {
          pt: '9.2 Confidencialidade das Informações Submetidas',
          es: '9.2 Confidencialidad de la Información Presentada',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Ao submeter um projeto ao SIA, os participantes reconhecem que todas as informações fornecidas são de responsabilidade exclusiva da equipe proponente. Cabe aos participantes garantir que o material enviado está autorizado para uso dentro do contexto do prêmio.',
            },
            {
              type: 'p',
              text: 'A MSA Safety compromete-se a tratar todo o conteúdo submetido com confidencialidade, utilizando-o exclusivamente para fins de avaliação, seleção, classificação e governança interna do SIA.',
            },
            {
              type: 'p',
              text: 'A MSA não realizará divulgação pública de qualquer material submetido sem aprovação prévia e explícita dos proponentes.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'MSA Safety se compromete a tratar todo el contenido presentado con confidencialidad, utilizándolo exclusivamente para fines de evaluación.',
            },
          ],
        },
      },
      {
        id: 'termos-9-3',
        title: {
          pt: '9.3 Tratamento de Dados Pessoais – LGPD',
          es: '9.3 Tratamiento de Datos Personales – LGPD',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'Os dados pessoais coletados durante o processo serão tratados exclusivamente para fins relacionados ao SIA e ao Safety Summit, observando integralmente a Lei Geral de Proteção de Dados (Lei 13.709/2018). Isso inclui:',
            },
            {
              type: 'ul',
              items: [
                'processamento das inscrições;',
                'avaliação pelos jurados;',
                'comunicação institucional;',
                'certificação e premiação;',
                'divulgação autorizada dos finalistas e vencedores.',
              ],
            },
            {
              type: 'p',
              text: 'Os participantes poderão solicitar acesso, correção ou exclusão de seus dados pessoais pelos canais formais da MSA Safety.',
            },
          ],
          es: [
            {
              type: 'p',
              text: 'Los datos personales recolectados durante el proceso serán tratados exclusivamente para fines relacionados al SIA y al Safety Summit.',
            },
          ],
        },
      },
      {
        id: 'termos-9-4',
        title: {
          pt: '9.4 Neutralidade Comercial e Proibição de Promoção de Marcas',
          es: '9.4 Neutralidad Comercial y Prohibición de Promoción de Marcas',
        },
        blocks: {
          pt: [
            {
              type: 'p',
              text: 'O SIA é uma premiação independente, orientada ao reconhecimento de soluções inovadoras em segurança, sem finalidade comercial. Portanto:',
            },
            {
              type: 'ul',
              items: [
                'A premiação não endossa, promove ou recomenda produtos, marcas, fornecedores, consultorias, softwares, equipamentos ou metodologias comerciais.',
                'Os cases não devem incluir conteúdo publicitário, materiais de marketing, logotipos promocionais, slogans, linguagem comercial ou qualquer elemento que caracterize promoção.',
                'Menções pontuais a fornecedores são permitidas apenas quando indispensáveis ao entendimento técnico do projeto.',
                'Consultorias, integradores e fornecedores não podem submeter cases em nome próprio.',
                'O descumprimento destas regras poderá resultar em desclassificação imediata.',
              ],
            },
          ],
          es: [
            {
              type: 'p',
              text: 'El SIA es una premiación independiente, orientada al reconocimiento de soluciones innovadoras en seguridad, sin finalidad comercial.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'criterios-de-desclassificacao',
    title: {
      pt: '10. Critérios de Desclassificação',
      es: '10. Criterios de Descalificación',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Serão desclassificados projetos que apresentem qualquer uma das seguintes situações:',
        },
        {
          type: 'p',
          text: 'Violação de Integridade e Ética:',
        },
        {
          type: 'ul',
          items: [
            'informações falsas, manipuladas ou fraudulentas;',
            'plágio total ou parcial;',
            'violação de direitos autorais, propriedade intelectual ou uso indevido de materiais de terceiros;',
            'omissão deliberada de informações relevantes.',
          ],
        },
        {
          type: 'p',
          text: 'Violação Legal, Técnica ou de Segurança:',
        },
        {
          type: 'ul',
          items: [
            'projetos que contrariem normas, leis ou regulamentações aplicáveis;',
            'soluções que representem risco real a pessoas, ao meio ambiente ou à sociedade;',
            'evidências de dano ou negligência operacional.',
          ],
        },
        {
          type: 'p',
          text: 'Quebra de Conduta e Compliance:',
        },
        {
          type: 'ul',
          items: [
            'conflito de interesse não declarado;',
            'tentativa de influenciar avaliações, jurados ou membros da organização;',
            'uso inadequado do processo para fins pessoais ou comerciais.',
          ],
        },
        {
          type: 'p',
          text: 'Conteúdo Inapropriado:',
        },
        {
          type: 'ul',
          items: [
            'linguagem ofensiva, discriminatória ou preconceituosa;',
            'material sensível, impróprio ou que contrarie os valores da MSA.',
          ],
        },
        {
          type: 'p',
          text: 'Violação da Neutralidade Comercial:',
        },
        {
          type: 'ul',
          items: [
            'conteúdo publicitário explícito ou velado;',
            'uso do SIA como plataforma de venda, promoção ou marketing;',
            'excesso de logos, marcas ou slogans de fornecedores;',
            'cases submetidos por consultorias ou fornecedores apresentando cases próprios.',
          ],
        },
        {
          type: 'p',
          text: 'Descumprimento das Regras do Regulamento:',
        },
        {
          type: 'ul',
          items: [
            'submissão fora do prazo;',
            'envio incompleto;',
            'não participação nas etapas obrigatórias;',
            'não envio do Pitch SIA dentro do prazo;',
            'ausência na apresentação virtual.',
          ],
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Serán descalificados los proyectos que presenten cualquiera de las siguientes situaciones:',
        },
      ],
    },
  },
  {
    id: 'disposicoes-gerais',
    title: {
      pt: '11. Disposições Gerais',
      es: '11. Disposiciones Generales',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'As Disposições Gerais consolidam os princípios que asseguram a integridade, a estabilidade e a legitimidade do SIA. Elas estabelecem as bases de governança que orientam o funcionamento do prêmio e oferecem segurança jurídica e processual a todos os participantes, avaliadores e instituições envolvidas.',
        },
        {
          type: 'p',
          text: 'A organização do SIA poderá atualizar informações, ajustar datas ou aperfeiçoar procedimentos operacionais sempre que necessário para garantir o bom funcionamento do programa. Qualquer atualização será oficialmente comunicada por meio do site do SIA e passa a vigorar imediatamente após sua publicação.',
        },
        {
          type: 'p',
          text: 'Situações não previstas neste regulamento — os chamados casos omissos — serão analisadas e deliberadas pela Comissão Gestora do SIA, autoridade máxima do programa.',
        },
        {
          type: 'p',
          text: 'O presente regulamento entra em vigor na data de sua publicação e permanece válido até a emissão de uma revisão oficial, podendo ser atualizado periodicamente para acompanhar a evolução do SIA.',
        },
        {
          type: 'p',
          text: 'A participação no SIA pressupõe, por parte de todos os inscritos, plena ciência, aceitação e concordância com todas as regras, responsabilidades, critérios de avaliação, prazos e condições aqui estabelecidos.',
        },
        {
          type: 'p',
          text: 'Por fim, o SIA reserva-se o direito de promover ajustes operacionais, metodológicos ou procedimentais necessários para garantir segurança jurídica, robustez técnica, clareza processual e isonomia entre os participantes.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Las Disposiciones Generales consolidan los principios que aseguran la integridad, la estabilidad y la legitimidad del SIA.',
        },
      ],
    },
  },
  {
    id: 'perguntas-frequentes-faq',
    title: {
      pt: '12. Perguntas Frequentes (FAQ)',
      es: '12. Preguntas Frecuentes (FAQ)',
    },
    blocks: {
      pt: [
        {
          type: 'p',
          text: 'Quem pode participar do Safety Innovation Awards (SIA)?',
        },
        {
          type: 'p',
          text: 'Podem participar profissionais de empresas públicas ou privadas atuantes na região LAR, envolvidos diretamente na implementação da inovação. Equipes podem ter até 3 integrantes e um facilitador opcional.',
        },
        {
          type: 'p',
          text: 'O que é um facilitador no contexto do SIA?',
        },
        {
          type: 'p',
          text: 'O facilitador é um apoiador opcional indicado pela equipe participante. Ele não precisa ter participado da implementação do projeto, mas atuou como incentivador, facilitador institucional ou apoiador da inscrição. Caso o projeto seja vencedor, o facilitador também é agraciado com o prêmio.',
        },
        {
          type: 'p',
          text: 'Consultorias, fornecedores ou integradores podem inscrever projetos?',
        },
        {
          type: 'p',
          text: 'Não. Somente a empresa onde a solução foi implementada pode submeter o case, desde que os participantes tenham participação real na execução da inovação.',
        },
        {
          type: 'p',
          text: 'Qual é o período de inscrições?',
        },
        {
          type: 'p',
          text: 'As inscrições estarão abertas de 23 de fevereiro a 13 de março de 2026, exclusivamente pelo portal oficial do SIA.',
        },
        {
          type: 'p',
          text: 'Em que idiomas o case pode ser submetido?',
        },
        {
          type: 'p',
          text: 'Português, Espanhol ou Inglês.',
        },
        {
          type: 'p',
          text: 'É obrigatório seguir a estrutura sugerida para o case?',
        },
        {
          type: 'p',
          text: 'Não é obrigatório, mas altamente recomendado, pois contribui para clareza, comparabilidade e qualidade da avaliação.',
        },
        {
          type: 'p',
          text: 'Que tipos de evidências podem ser anexadas?',
        },
        {
          type: 'p',
          text: 'Apresentações, fotos, vídeos, relatórios, indicadores e demais materiais que comprovem a implementação e os resultados. É permitido anexar até cinco arquivos, totalizando 20MB.',
        },
        {
          type: 'p',
          text: 'Quantos projetos avançam para a Segunda Fase?',
        },
        {
          type: 'p',
          text: 'Os 20 projetos com melhor pontuação na Primeira Fase.',
        },
        {
          type: 'p',
          text: 'A apresentação virtual da Segunda Fase é obrigatória?',
        },
        {
          type: 'p',
          text: 'Sim. A participação na apresentação virtual é obrigatória para continuidade no processo.',
        },
        {
          type: 'p',
          text: 'Como é definido o vencedor?',
        },
        {
          type: 'p',
          text: 'A nota final resulta da média das avaliações atribuídas pelo Júri Independente, com base no Scorecard SIA.',
        },
        {
          type: 'p',
          text: 'O que a equipe vencedora recebe?',
        },
        {
          type: 'p',
          text: 'O Troféu Oficial do SIA e uma experiência internacional com duas etapas: visita técnica às instalações corporativas da MSA nos Estados Unidos e participação em um Summit Internacional de Inovação.',
        },
        {
          type: 'p',
          text: 'A MSA cobre todos os custos da viagem internacional?',
        },
        {
          type: 'p',
          text: 'A MSA custeia passagens aéreas, hospedagem, alimentação conforme programação e translados oficiais. Despesas pessoais não estão incluídas.',
        },
        {
          type: 'p',
          text: 'Os projetos finalistas podem ser divulgados publicamente?',
        },
        {
          type: 'p',
          text: 'Sim, desde que com autorização prévia e formal dos proponentes.',
        },
        {
          type: 'p',
          text: 'É permitido mencionar fornecedores no case?',
        },
        {
          type: 'p',
          text: 'Sim, quando necessário ao entendimento técnico, mas sem caráter comercial, promocional ou publicitário.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'Preguntas frecuentes — contenido en español próximamente.',
        },
      ],
    },
  },
];
