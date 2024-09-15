import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';
import { CREATE_EXPERIENCIA_PROFISSIONAL, ADD_COMPETENCIA_EXPERIENCIA_PROFISSIONAL } from '../../graphql/mutations';
import { GET_COMPETENCIAS } from '../../graphql/queries'; // Import the GET_COMPETENCIAS query
import EditIcon from '@mui/icons-material/Edit';

const CadastraExperiencia = ({ profissionalId }) => {
    const [empresa, setEmpresa] = useState('');
    const [cargo, setCargo] = useState('');
    const [atividades, setAtividades] = useState('');
    const [projetos, setProjetos] = useState('');
    const [mesAnoInicio, setMesAnoInicio] = useState('');
    const [mesAnoTermino, setMesAnoTermino] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [experienciasProfissionais, setExperienciasProfissionais] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedCompetencias, setSelectedCompetencias] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentExperienceId, setCurrentExperienceId] = useState(null);
    const [competenciasLocais, setCompetenciasLocais] = useState([]);

    const handleAddNovaCompetencia = (novaCompetencia) => {
        setCompetenciasLocais([...competenciasLocais, novaCompetencia]);
    };
    
    // Fetching the list of competencies using GET_COMPETENCIAS query
    const { loading, error, data, refetch } = useQuery(GET_COMPETENCIAS, {
        fetchPolicy: 'no-cache', // Força sempre buscar os dados mais recentes do servidor
    });

    const [createExperienciaProfissional] = useMutation(CREATE_EXPERIENCIA_PROFISSIONAL, {
        onError: (error) => {
            console.error('Erro ao criar experiencia profissional', error);
            setErrorMessage('Ocorreu um erro ao tentar salvar as experiencias profissionais. Por favor, tente novamente.');
        },
    });

    const [addCompetenciaToExperiencia] = useMutation(ADD_COMPETENCIA_EXPERIENCIA_PROFISSIONAL, {
        onError: (error) => {
            console.error('Erro ao adicionar competências à experiência', error);
            setErrorMessage('Erro ao adicionar as competências. Tente novamente.');
        },
    });

    const handleAddExperienciaProfissional = () => {
        if (empresa && cargo && atividades && mesAnoInicio) {
            const novaExperienciaProfissional = { empresa, cargo, atividades, projetos, mesAnoInicio, mesAnoTermino };
            setExperienciasProfissionais([...experienciasProfissionais, novaExperienciaProfissional]);
            setEmpresa('');
            setCargo('');
            setAtividades('');
            setProjetos('');
            setMesAnoInicio('');
            setMesAnoTermino('');
            setErrorMessage('');
        } else {
            setErrorMessage('Por favor, preencha todos os campos antes de adicionar.');
        }
    };

    const handleExperienciasProfissionais = () => {
        setIsSaving(true);
        Promise.all(
            experienciasProfissionais.map((experienciaProfissional) =>
                createExperienciaProfissional({
                    variables: {
                        empresa: experienciaProfissional.empresa,
                        cargo: experienciaProfissional.cargo,
                        atividades: experienciaProfissional.atividades,
                        projetos: experienciaProfissional.projetos,
                        mesAnoInicio: experienciaProfissional.mesAnoInicio,
                        mesAnoTermino: experienciaProfissional.mesAnoTermino,
                        profissionalId,
                    },
                })
            )
        )
        .then(() => {
            setErrorMessage('');
        })
        .catch(() => {
            setErrorMessage('Erro ao salvar as experiências profissionais. Tente novamente.');
        })
        .finally(() => {
            setIsSaving(false);
        });
    };

    const handleOpenModal = (experienceId) => {
        setCurrentExperienceId(experienceId);
        refetch(); // Forçar recarregar as competências do banco
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCompetencias([]);
    };

    const handleCompetenciaChange = (competenciaId) => {
        setSelectedCompetencias((prev) =>
            prev.includes(competenciaId)
                ? prev.filter((id) => id !== competenciaId)
                : [...prev, competenciaId]
        );
    };

    const handleAddCompetenciasToExperience = () => {
        Promise.all(
            selectedCompetencias.map((competenciaId) =>
                addCompetenciaToExperiencia({
                    variables: {
                        experienciaProfissionalId: currentExperienceId,
                        competenciaId,
                    },
                })
            )
        )
        .then(() => {
            setErrorMessage('');
        })
        .catch(() => {
            setErrorMessage('Erro ao adicionar as competências à experiência. Tente novamente.');
        })
        .finally(() => {
            handleCloseModal();
        });
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar competências.</p>;

    // const competencias = [...(data?.competencias || []), ...competenciasLocais];
    const competencias = competenciasLocais.length ? competenciasLocais : data?.competencias || [];

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Typography variant="h6">Cadastro de Experiências Profissionais</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Nome Empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        disabled={isSaving}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        disabled={isSaving}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Atividades Realizadas"
                        value={atividades}
                        onChange={(e) => setAtividades(e.target.value)}
                        disabled={isSaving}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Projetos em que Atuei"
                        value={projetos}
                        onChange={(e) => setProjetos(e.target.value)}
                        disabled={isSaving}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Mês/Ano de Início"
                        value={mesAnoInicio}
                        onChange={(e) => setMesAnoInicio(e.target.value)}
                        disabled={isSaving}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Mês/Ano de Término"
                        value={mesAnoTermino}
                        onChange={(e) => setMesAnoTermino(e.target.value)}
                        disabled={isSaving}
                    />
                    {errorMessage && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleAddExperienciaProfissional}
                        disabled={isSaving}
                    >
                        Incluir Experiência Profissional
                    </Button>
                </Box>
                {experienciasProfissionais.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome da Empresa</TableCell>
                                    <TableCell>Cargo</TableCell>
                                    <TableCell>Atividades Realizadas</TableCell>
                                    <TableCell>Projetos</TableCell>
                                    <TableCell>Mês/Ano de Início</TableCell>
                                    <TableCell>Mês/Ano de Término</TableCell>
                                    <TableCell>Ação</TableCell> {/* Coluna de ação */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {experienciasProfissionais.map((experienciaProfissional, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{experienciaProfissional.empresa}</TableCell>
                                        <TableCell>{experienciaProfissional.cargo}</TableCell>
                                        <TableCell>{experienciaProfissional.atividades}</TableCell>
                                        <TableCell>{experienciaProfissional.projetos}</TableCell>
                                        <TableCell>{experienciaProfissional.mesAnoInicio}</TableCell>
                                        <TableCell>{experienciaProfissional.mesAnoTermino}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleOpenModal(index)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={handleExperienciasProfissionais}
                    disabled={isSaving || experienciasProfissionais.length === 0}
                >
                    Salvar Experiências Profissionais
                </Button>
            </Box>
            {/* Modal for competencies */}
            <Dialog open={modalOpen} onClose={handleCloseModal}>
                <DialogTitle>Adicionar Competências à Experiência</DialogTitle>
                <DialogContent>
                    {competencias.map((competencia) => (
                        <FormControlLabel
                            key={competencia.id}
                            control={
                                <Checkbox
                                    checked={selectedCompetencias.includes(competencia.id)}
                                    onChange={() => handleCompetenciaChange(competencia.id)}
                                    color="primary"
                                />
                            }
                            label={competencia.descricao}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAddCompetenciasToExperience} color="primary">
                        Adicionar Competências
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CadastraExperiencia;
