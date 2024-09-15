import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { CREATE_COMPETENCIA } from '../../graphql/mutations';

const CadastraCompetencia = ({ profissionalId }) => {
    const [nomeCompetencia, setNomeCompetencia] = useState('');
    const [percentualConhecimento, setPercentualConhecimento] = useState('');
    const [tipo, setTipoCompetencia] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [competencias, setCompetencias] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // Controla o estado de salvamento

    const [createCompetencia] = useMutation(CREATE_COMPETENCIA, {
        onError: (error) => {
            console.error('Erro ao criar competência', error);
            setErrorMessage('Ocorreu um erro ao tentar salvar as competências. Por favor, tente novamente.');
        },
    });

    const handleAddCompetencia = () => {
        const percentualInt = parseInt(percentualConhecimento);
        if (nomeCompetencia && percentualInt && tipo) {
            const novaCompetencia = { 
                nomeCompetencia, 
                percentualConhecimento: percentualInt, 
                tipo 
            };
            setCompetencias([...competencias, novaCompetencia]);
            setNomeCompetencia('');
            setPercentualConhecimento('');
            setTipoCompetencia('');
            setErrorMessage('');
        } else {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios com valores válidos.');
        }
    };        

    const handleSalvarCompetencias = () => {
        setIsSaving(true); // Desabilita o botão "Incluir Competência"
        
        Promise.all(
            competencias.map((competencia) =>
                createCompetencia({
                    variables: {
                        nomeCompetencia: competencia.nomeCompetencia,
                        percentualConhecimento: competencia.percentualConhecimento,
                        tipo: competencia.tipo,
                        profissionalId,
                    },
                })
            )
        )
        .then(() => {
            setErrorMessage(''); // Limpa as mensagens de erro, caso existam
        })
        .catch(() => {
            setErrorMessage('Erro ao salvar as competencias. Tente novamente.');
        })
        .finally(() => {
            setIsSaving(false); // Reativa o botão "Incluir Formação" ao término
        });
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Typography variant="h6">Cadastro de Competências (SKILLS)</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Competência"
                        value={nomeCompetencia}
                        onChange={(e) => setNomeCompetencia(e.target.value)} // CORRIGIDO
                        disabled={isSaving}
                        />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Percentual de Conhecimento"
                        value={percentualConhecimento}
                        onChange={(e) => setPercentualConhecimento(e.target.value)}
                        disabled={isSaving} // Desabilita o campo durante o salvamento
                    />
                    <FormControl fullWidth margin="normal" disabled={isSaving}>
                        <InputLabel>Tipo de Competência</InputLabel>
                        <Select
                            value={tipo}
                            onChange={(e) => setTipoCompetencia(e.target.value)}
                            label="Tipo de Competência"
                            required
                        >
                            <MenuItem value="LINGUAGENS_DE_PROGRAMACAO">Linguagem de Programação</MenuItem>
                            <MenuItem value="BANCO_DE_DADOS">Banco de Dados</MenuItem>
                            <MenuItem value="METODOLOGIAS">Metodologias</MenuItem>
                            <MenuItem value="FRONTEND">Frontend</MenuItem>
                            <MenuItem value="CLOUD">Cloud</MenuItem>
                            <MenuItem value="FRAMEWORKS">Framework</MenuItem>
                            <MenuItem value="OUTRO">Outro</MenuItem>
                        </Select>
                    </FormControl>
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
                        onClick={handleAddCompetencia}
                        disabled={isSaving} // Desabilita o botão durante o salvamento
                    >
                        Incluir Competência
                    </Button>
                </Box>
                {competencias.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Competência</TableCell>
                                    <TableCell>Percentual de Conhecimento</TableCell>
                                    <TableCell>Tipo de Competência</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {competencias.map((competencia, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{competencia.nomeCompetencia}</TableCell>
                                        <TableCell>{competencia.percentualConhecimento}</TableCell>
                                        <TableCell>{competencia.tipo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {competencias.length > 0 && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3 }}
                        onClick={handleSalvarCompetencias}
                        disabled={isSaving} // Desabilita o botão de salvar enquanto está salvando
                    >
                        Salvar Competências
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default CadastraCompetencia;
