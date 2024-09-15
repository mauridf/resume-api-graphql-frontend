import { gql } from '@apollo/client';

// PROFISSIONAL
export const GET_PROFISSIONAIS = gql`
    query {
        allProfissionais {
            id
            nome
            dataNascimento
            endereco
            telefone
            email
        }
    }
`;

export const GET_PROFISSIONAL_BY_ID = gql`
    query GetProfissionalById($id: UUID!) {
        profissionalById(id: $id) {
            id
            nome
            dataNascimento
            endereco
            telefone
            email
        }
    }
`;

// REDE SOCIAL
export const GET_REDES_SOCIAIS = gql`
    query {
        allRedesSociais {
            id
            nomeRedeSocial
            url
            profissionalId
        }
    }
`;

export const GET_REDE_SOCIAL_BY_ID = gql`
    query GetRedeSocialById($id: UUID!) {
        redeSocialById(id: $id) {
            id
            nomeRedeSocial
            url
            profissionalId
        }
    }
`;

// FORMAÇÃO
export const GET_FORMACOES = gql`
    query {
        allFormacoes {
            id
            tipo
            instituicao
            curso
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
    }
`;

export const GET_FORMACAO_BY_ID = gql`
    query GetFormacaoById($id: UUID!) {
        formacaoById(id: $id) {
            id
            tipo
            instituicao
            curso
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
    }
`;

// IDIOMA
export const GET_IDIOMAS = gql`
    query {
        allIdiomas {
            id
            idiomaConhecido
            nivel
            profissionalId
        }
    }
`;

export const GET_IDIOMA_BY_ID = gql`
    query GetIdiomaById($id: UUID!) {
        idiomaById(id: $id) {
            id
            idiomaConhecido
            nivel
            profissionalId
        }
    }
`;

// COMPETENCIA
export const GET_COMPETENCIAS = gql`
    query {
        allCompetencias {
            id
            nomeCompetencia
            percentualConhecimento
            tipo
            profissionalId
        }
    }
`;

export const GET_COMPETENCIA_BY_ID = gql`
    query GetCompetenciaById($id: UUID!) {
        competenciaById(id: $id) {
            id
            nomeCompetencia
            percentualConhecimento
            tipo
            profissionalId
        }
    }
`;

// CONQUISTA
export const GET_CONQUISTAS = gql`
    query {
        allConquistas {
            id
            nomeConquista
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
    }
`;

export const GET_CONQUISTA_BY_ID = gql`
    query GetConquistaById($id: UUID!) {
        conquistaById(id: $id) {
            id
            nomeConquista
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
    }
`;

// EXPERIENCIA PROFISSIONAL
export const GET_EXPERIENCIAS_PROFISSIONAIS = gql`
    query {
        allExperienciasProfissionais {
            id
            empresa
            cargo
            atividades
            projetos
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
    }
`;

export const GET_EXPERIENCIA_PROFISSIONAL_BY_ID = gql`
    query GetExperienciaProfissionalById($id: UUID!) {
        experienciaProfissionalById(id: $id) {
            id
            empresa
            cargo
            atividades
            projetos
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
    }
`;