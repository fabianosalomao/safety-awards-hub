export type CountryCode = "BR" | "CL" | "PE" | "MX" | "EQ" | "AR";

export type Finalist = {
  title: string;
  company: string;
  country: CountryCode;
  team: string[];
  incentivador?: string;
};

export const countryNames: Record<CountryCode, { pt: string; es: string }> = {
  BR: { pt: "Brasil", es: "Brasil" },
  CL: { pt: "Chile", es: "Chile" },
  PE: { pt: "Peru", es: "Perú" },
  MX: { pt: "México", es: "México" },
  EQ: { pt: "Equador", es: "Ecuador" },
  AR: { pt: "Argentina", es: "Argentina" },
};

export const finalists: Finalist[] = [
  {
    title: "Centro de operações remotas (COR) para apoio à descaracterização de barragens",
    company: "Vale",
    country: "BR",
    team: ["Larissa Rezende", "Rômulo Diniz", "Fabiana Souza Ferreira"],
  },
  {
    title: "Cesta de indicadores de segurança e saúde: Inovação, fatores humanos, resultados sustentáveis",
    company: "Albert Einstein Hospital Israelita",
    country: "BR",
    team: ["Tatiana Regina Mosca", "Waléria de Sá Bezerra", "Danilo Nunes"],
  },
  {
    title: "Combate a bioinvasão pelo uso de ferramentas de calor em MiniRovs",
    company: "Petrobras",
    country: "BR",
    team: ["Daniel Adolpho da Silva Junior", "Guilherme Fortes de Oliveira Ferreira de Lima"],
    incentivador: "Guilherme Fortes de Oliveira Ferreira de Lima",
  },
  {
    title: "Comitê de empresas parceiras (CEP)",
    company: "L'oréal Brasil",
    country: "BR",
    team: ["Joel de Andrade e Silva Neto"],
  },
  {
    title: "Connect bot: IA democratizando acesso a dados e documentos de segurança",
    company: "Vale",
    country: "BR",
    team: ["Flávio Ravier Viana de Assis", "Marcos Lourenço", "Thiago Adriano da Silva"],
  },
  {
    title: "Ead360: Treinamento de processos em realidade virtual multiusuários",
    company: "Petrobras",
    country: "BR",
    team: ["Adriana Nunes Araujo", "Juliana Pereira de Almeida", "Luciana de Frontin Werneck Neumayer"],
    incentivador: "Gustavo Henrique Ribeiro Gomes",
  },
  {
    title: "Escape room de seguridad",
    company: "Nucleoelectrica Argentina S.A",
    country: "AR",
    team: ["Ricagni Hernan", "Santoro Pablo J", "Ramirez Anibal"],
    incentivador: "Ricagni Hernan",
  },
  {
    title: "Gold Fields & Safetymind: IA proactiva para la erradicación de accidentes fatales",
    company: "Gold Fields Perú",
    country: "CL",
    team: ["Elizabeth Acuña", "Luis Sanchez", "Mario Villalobos"],
  },
  {
    title: "Hubshe: tecnologia como pilar da transformação na gestão de segurança",
    company: "Mercado Livre",
    country: "BR",
    team: ["Bruno Rocha Ayala Rodrigues", "Tiago Mello Dos Reis", "Rafael Graca Lombardo"],
    incentivador: "Fabio Madrid Lacerda - Diretor SHE",
  },
  {
    title: "Implementación tecnológica de dron autónomo y robot cuadrúpedo para detección de peligros y riesgos",
    company: "Techgen S.A. De C.V.",
    country: "MX",
    team: ["Jose Antonio Torres Moreno", "Alan Santiago Alanis Vargas", "Mauricio Guerrero Marquez"],
    incentivador: "Humberto Fernández",
  },
  {
    title: "Informação que protege: A evolução da consulta de EPIs em campo",
    company: "Eldorado Brasil Celulose S/A",
    country: "BR",
    team: ["Elias Jorge", "Thaina Zaguetti Moncao Amarilha", "Rebeca Panceri Valentim"],
    incentivador: "Osvaldo Cavalcante da Costa Neto",
  },
  {
    title: "La gamificación que impulsa la participación en la seguridad basada en el comportamiento",
    company: "Pesquera Exalmar S.A.A.",
    country: "PE",
    team: ["Daniel León Shima", "Jhoselyn Cecias Moreno"],
    incentivador: "Daniel León Shima",
  },
  {
    title: "Programa de reconhecimento: Reconhecer para transformar",
    company: "Albert Einstein Hospital Israelita",
    country: "BR",
    team: ["Waléria de Sá Bezerra", "Caio Roberto Martins", "Roseli da Silva Coelho"],
  },
  {
    title: "Realidad virtual y análisis conductual para transformar la toma de decisiones en seguridad",
    company: "Guacolda",
    country: "CL",
    team: ["ian deric iriarte vargas", "Javier Caballero Flores", "René Opazo Rojo"],
    incentivador: "René Opazo Rojo",
  },
  {
    title: "Safety Learning Hive: Aprendizagem ativa integrando líderes e operação.",
    company: "Aperam South America",
    country: "BR",
    team: ["Diêgo Silva Celestino", "Gustavo Mendes Sales", "Rodrigo Dutra Oliveira"],
  },
  {
    title: "Segurança e eficiência na limpeza de reservatórios de água por meio de tecnologia robotizada",
    company: "BRK Ambiental - RMM",
    country: "BR",
    team: ["Felipe Mangili Lara", "Rodrigo Heckler", "Wilson Luiz Bombo Junior"],
    incentivador: "Camila Tavares Ferrari",
  },
  {
    title: "Sistema de monitoramento 4.0 em espaço confinado",
    company: "Klabin",
    country: "BR",
    team: ["Roger campos", "Silvio Cesar", "Francielle Sauter"],
    incentivador: "Adriano José Francisco",
  },
  {
    title: "Tecnologia e proteção no combate a incêndios offshore",
    company: "Prio",
    country: "BR",
    team: ["Aline Rodrigues", "Anderson Leandro de Castro", "Tadeu Luiz dos Santos Ferreira"],
    incentivador: "Jefferson Dutra Pinheiro",
  },
  {
    title: "Vida 360: Programa que motiva y reconoce la participación proactiva",
    company: "Unacem Ecuador",
    country: "EQ",
    team: ["Marlon Cadena"],
  },
];