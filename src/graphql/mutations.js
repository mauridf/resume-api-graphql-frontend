import { gql } from '@apollo/client';

// PROFISSIONAL
export const DELETE_PROFISSIONAL = gql`
    mutation DeleteProfissional($id: UUID!) {
        deleteProfissional(id: $id)
    }
`;

export const UPDATE_PROFISSIONAL = gql`
    mutation UpdateProfissional($id: UUID!, $nome: String!, $dataNascimento: String!, $endereco: String!, $telefone: String!, $email: String!) {
        updateProfissional(id: $id, nome: $nome, dataNascimento: $dataNascimento, endereco: $endereco, telefone: $telefone, email: $email) {
            id
            nome
            dataNascimento
            endereco
            telefone
            email
        }
}
`;

export const CREATE_PROFISSIONAL = gql`
    mutation CreateProfissional($nome: String!, $dataNascimento: DateTime!, $endereco: String!, $telefone: String!, $email: String!) {
        createProfissional(nome: $nome, dataNascimento: $dataNascimento, endereco: $endereco, telefone: $telefone, email: $email) {
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
export const DELETE_REDE_SOCIAL = gql`
    mutation DeleteRedeSocial($id: UUID!) {
        deleteRedeSocial(id: $id)
    }
`;

export const UPDATE_REDE_SOCIAL = gql`
    mutation UpdateRedeSocial($id: UUID!, $nomeRedeSocial: String!, $url: String!, $profissionalId: UUID!) {
        updateRedeSocial(id: $id, nomeRedeSocial: $nomeRedeSocial, url: $url, profissionalId: $profissionalId) {
            id
            nomeRedeSocial
            url
            profissionalId
        }
}
`;

export const CREATE_REDE_SOCIAL = gql`
    mutation CreateRedeSocial($nomeRedeSocial: String!, $url: String!, $profissionalId: UUID!) {
        createRedeSocial(nomeRedeSocial: $nomeRedeSocial, url: $url, profissionalId: $profissionalId) {
            id
            nomeRedeSocial
            url
            profissionalId
        }
    }
`;

// FORMACAO
export const DELETE_FORMACAO = gql`
    mutation DeleteFormacao($id: UUID!) {
        deleteFormacao(id: $id)
    }
`;

export const UPDATE_FORMACAO = gql`
    mutation UpdateFormacao($id: UUID!, $tipo: TipoFormacao!, $instituicao: String!, $curso: String!, $mesAnoInicio: String!, $mesAnoTermino: String, $profissionalId: UUID!) {
        updateFormacao(id: $id, tipo: $tipo, instituicao: $instituicao, curso: $curso, mesAnoInicio: $mesAnoInicio, mesAnoTermino: $mesAnoTermino, profissionalId: $profissionalId) {
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

export const CREATE_FORMACAO = gql`
    mutation CreateFormacao($tipo: TipoFormacao!, $instituicao: String!, $curso: String!, $mesAnoInicio: String!, $mesAnoTermino: String, $profissionalId: UUID!) {
        createFormacao(tipo: $tipo, instituicao: $instituicao, curso: $curso, mesAnoInicio: $mesAnoInicio, mesAnoTermino: $mesAnoTermino, profissionalId: $profissionalId) {
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
export const DELETE_IDIOMA = gql`
    mutation DeleteIdioma($id: UUID!) {
        deleteIdioma(id: $id)
    }
`;

export const UPDATE_IDIOMA = gql`
    mutation UpdateIdioma($id: UUID!, $idiomaConhecido: IdiomaConhecido!, $nivel: Nivel!, $profissionalId: UUID!) {
        updateIdioma(id: $id, idiomaConhecido: $idiomaConhecido, nivel: $nivel, profissionalId: $profissionalId) {
            id
            idiomaConhecido
            nivel
            profissionalId
        }
}
`;

export const CREATE_IDIOMA = gql`
    mutation CreateIdioma($idiomaConhecido: IdiomaConhecido!, $nivel: Nivel!, $profissionalId: UUID!) {
        createIdioma(idiomaConhecido: $idiomaConhecido, nivel: $nivel, profissionalId: $profissionalId) {
            id
            idiomaConhecido
            nivel
            profissionalId
        }
    }
`;

// COMPETENCIA (SKILL)
export const DELETE_COMPETENCIA = gql`
    mutation DeleteCompetencia($id: UUID!) {
        deleteCompetencia(id: $id)
    }
`;

export const UPDATE_COMPETENCIA = gql`
    mutation UpdateCompetencia($id: UUID!, $nomeCompetencia: String!, $percentualConhecimento: Int!, $tipo: TipoCompetencia!, $profissionalId: UUID!) {
        updateCompetencia(id: $id, nomeCompetencia: $nomeCompetencia, percentualConhecimento: $percentualConhecimento, tipo: $tipo, profissionalId: $profissionalId) {
            id
            nomeCompetencia
            percentualConhecimento
            tipo
            profissionalId
        }
}
`;

export const CREATE_COMPETENCIA = gql`
    mutation CreateCompetencia($nomeCompetencia: String!, $percentualConhecimento: Int!, $tipo: TipoCompetencia!, $profissionalId: UUID!) {
        createCompetencia(nomeCompetencia: $nomeCompetencia, percentualConhecimento: $percentualConhecimento, tipo: $tipo, profissionalId: $profissionalId) {
            id
            nomeCompetencia
            percentualConhecimento
            tipo
            profissionalId
        }
    }
`;

// CONQUISTAS
export const DELETE_CONQUISTA = gql`
    mutation DeleteConquista($id: UUID!) {
        deleteConquista(id: $id)
    }
`;

export const UPDATE_CONQUISTA = gql`
    mutation UpdateConquista($id: UUID!, $nomeConquista: String!, $mesAnoInicio: String!, $mesAnoTermino: String!, $profissionalId: UUID!) {
        updateConquista(id: $id, nomeConquista: $nomeConquista, mesAnoInicio: $mesAnoInicio, mesAnoTermino: $mesAnoTermino, profissionalId: $profissionalId) {
            id
            nomeConquista
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
}
`;

export const CREATE_CONQUISTA = gql`
    mutation CreateConquista($nomeConquista: String!, $mesAnoInicio: String!, $mesAnoTermino: String!, $profissionalId: UUID!) {
        createConquista(nomeConquista: $nomeConquista, mesAnoInicio: $mesAnoInicio, mesAnoTermino: $mesAnoTermino, profissionalId: $profissionalId) {
            id
            nomeConquista
            mesAnoInicio
            mesAnoTermino
            profissionalId
        }
    }
`;

// EXPERIENCIA PROFISSIONAL
export const DELETE_EXPERIENCIA_PROFISSIONAL = gql`
    mutation DeleteExperienciaProfissional($id: UUID!) {
        deleteExperienciaProfissional(id: $id)
    }
`;

export const UPDATE_EXPERIENCIA_PROFISSIONAL = gql`
    mutation UpdateExperienciaProfissional($id: UUID!, $empresa: String!, $cargo: String!, $atividades: String!, $projetos: String, $mesAnoInicio: String!, $mesAnoTermino: String, $profissionalId: UUID!) {
        updateExperienciaProfissional(id: $id, empresa: $empresa, cargo: $cargo, atividades: $atividades, projetos: $projetos, mesAnoInicio: $mesAnoInicio, mesAnoTermino: $mesAnoTermino, profissionalId: $profissionalId) {
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

export const CREATE_EXPERIENCIA_PROFISSIONAL = gql`
    mutation CreateExperienciaProfissional($empresa: String!, $cargo: String!, $atividades: String!, $projetos: String, $mesAnoInicio: String!, $mesAnoTermino: String, $profissionalId: UUID!) {
        createExperienciaProfissional(empresa: $empresa, cargo: $cargo, atividades: $atividades, projetos: $projetos, mesAnoInicio: $mesAnoInicio, mesAnoTermino: $mesAnoTermino, profissionalId: $profissionalId) {
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

// ADICIONAR COMPETENCIA NA EXPERIENCIA PROFISSIONAL
export const ADD_COMPETENCIA_EXPERIENCIA_PROFISSIONAL = gql`
    mutation AddCompetenciaToExperiencia($competenciaId: UUID!, $experienciaProfissionalId: UUID!) {
        addCompetenciaToExperiencia(competenciaId: $competenciaId, experienciaProfissionalId: $experienciaProfissionalId) {
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
