import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { CREATE_FORMACAO } from '../../graphql/mutations';

const CadastroFormacao = ({ profissionalId }) => {
    const [tipo, setTipoFormacao] = useState('');
    const [instituicao, setInstituicao] = useState('');
    const [curso, setCurso] = useState('');
    const [mesAnoInicio, setMesAnoInicio] = useState('');
    const [mesAnoTermino, setMesAnoTermino] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formacoes, setFormacoes] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // Controla o estado de salvamento

    const [createFormacao] = useMutation(CREATE_FORMACAO, {
        onError: (error) => {
            console.error('Erro ao criar formação', error);
            setErrorMessage('Ocorreu um erro ao tentar salvar as formações. Por favor, tente novamente.');
        },
    });

    const handleAddFormacao = () => {
        if (tipo && instituicao && curso && mesAnoInicio) {
            const novaFormacao = { tipo, instituicao, curso, mesAnoInicio, mesAnoTermino };
            setFormacoes([...formacoes, novaFormacao]);
            setTipoFormacao('');
            setInstituicao('');
            setCurso('');
            setMesAnoInicio('');
            setMesAnoTermino('');
            setErrorMessage('');
        } else {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios antes de adicionar.');
        }
    };

    const handleSalvarFormacoes = () => {
        setIsSaving(true); // Desabilita o botão "Incluir Formação"
        
        Promise.all(
            formacoes.map((formacao) =>
                createFormacao({
                    variables: {
                        tipo: formacao.tipo,
                        instituicao: formacao.instituicao,
                        curso: formacao.curso,
                        mesAnoInicio: formacao.mesAnoInicio,
                        mesAnoTermino: formacao.mesAnoTermino,
                        profissionalId,
                    },
                })
            )
        )
        .then(() => {
            setErrorMessage(''); // Limpa as mensagens de erro, caso existam
        })
        .catch(() => {
            setErrorMessage('Erro ao salvar as formações. Tente novamente.');
        })
        .finally(() => {
            setIsSaving(false); // Reativa o botão "Incluir Formação" ao término
        });
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Typography variant="h6">Cadastro de Formações</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <FormControl fullWidth margin="normal" disabled={isSaving}>
                        <InputLabel>Tipo de Formação</InputLabel>
                        <Select
                            value={tipo}
                            onChange={(e) => setTipoFormacao(e.target.value)}
                            label="Tipo de Formação"
                            required
                        >
                            <MenuItem value="FUNDAMENTAL">Fundamental</MenuItem>
                            <MenuItem value="MEDIO">Médio</MenuItem>
                            <MenuItem value="GRADUACAO">Graduação</MenuItem>
                            <MenuItem value="POS_GRADUACAO">Pós-Graduação</MenuItem>
                            <MenuItem value="MESTRADO">Mestrado</MenuItem>
                            <MenuItem value="DOUTORADO">Doutorado</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Instituição de Ensino"
                        value={instituicao}
                        onChange={(e) => setInstituicao(e.target.value)}
                        disabled={isSaving} // Desabilita o campo durante o salvamento
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Curso"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        disabled={isSaving} // Desabilita o campo durante o salvamento
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Mês/Ano de Início"
                        value={mesAnoInicio}
                        onChange={(e) => setMesAnoInicio(e.target.value)}
                        disabled={isSaving} // Desabilita o campo durante o salvamento
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Mês/Ano de Termino"
                        value={mesAnoTermino}
                        onChange={(e) => setMesAnoTermino(e.target.value)}
                        disabled={isSaving} // Desabilita o campo durante o salvamento
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
                        onClick={handleAddFormacao}
                        disabled={isSaving} // Desabilita o botão durante o salvamento
                    >
                        Incluir Formação
                    </Button>
                </Box>
                {formacoes.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tipo da Formação</TableCell>
                                    <TableCell>Instituição de Ensino</TableCell>
                                    <TableCell>Curso</TableCell>
                                    <TableCell>Mês/Ano de Início</TableCell>
                                    <TableCell>Mês/Ano de Término</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formacoes.map((formacao, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{formacao.tipo}</TableCell>
                                        <TableCell>{formacao.instituicao}</TableCell>
                                        <TableCell>{formacao.curso}</TableCell>
                                        <TableCell>{formacao.mesAnoInicio}</TableCell>
                                        <TableCell>{formacao.mesAnoTermino}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {formacoes.length > 0 && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3 }}
                        onClick={handleSalvarFormacoes}
                        disabled={isSaving} // Desabilita o botão de salvar enquanto está salvando
                    >
                        Salvar Formações
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default CadastroFormacao;
