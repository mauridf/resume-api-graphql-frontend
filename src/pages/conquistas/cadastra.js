import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import { CREATE_CONQUISTA } from '../../graphql/mutations';

const CadastraConquista = ({ profissionalId }) => {
    const [nomeConquista, setNomeConquista] = useState('');
    const [mesAnoInicio, setMesAnoInicio] = useState('');
    const [mesAnoTermino, setMesAnoTermino] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [conquistas, setConquistas] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // Controla o estado de salvamento

    const [createConquista] = useMutation(CREATE_CONQUISTA, {
        onError: (error) => {
            console.error('Erro ao criar conquista', error);
            setErrorMessage('Ocorreu um erro ao tentar salvar as conquistas. Por favor, tente novamente.');
        },
    });

    const handleAddConquista = () => {
        if (nomeConquista && mesAnoInicio) {
            const novaConquista = { 
                nomeConquista, 
                mesAnoInicio, 
                mesAnoTermino 
            };
            setConquistas([...conquistas, novaConquista]);
            setNomeConquista('');
            setMesAnoInicio('');
            setMesAnoTermino('');
            setErrorMessage('');
        } else {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios com valores válidos.');
        }
    };        

    const handleSalvarConquistas = () => {
        setIsSaving(true); // Desabilita o botão "Incluir Conquista"
        
        Promise.all(
            conquistas.map((conquista) =>
                createConquista({
                    variables: {
                        nomeConquista: conquista.nomeConquista,
                        mesAnoInicio: conquista.mesAnoInicio,
                        mesAnoTermino: conquista.mesAnoTermino,
                        profissionalId,
                    },
                })
            )
        )
        .then(() => {
            setErrorMessage(''); // Limpa as mensagens de erro, caso existam
        })
        .catch(() => {
            setErrorMessage('Erro ao salvar as conquistas. Tente novamente.');
        })
        .finally(() => {
            setIsSaving(false); // Reativa o botão "Incluir Conquista" ao término
        });
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Typography variant="h6">Cadastro de Conquistas (Certificados/Certificações)</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Conquista"
                        value={nomeConquista}
                        onChange={(e) => setNomeConquista(e.target.value)}
                        disabled={isSaving}
                        />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Mês/Ano Início"
                        value={mesAnoInicio}
                        onChange={(e) => setMesAnoInicio(e.target.value)}
                        disabled={isSaving} // Desabilita o campo durante o salvamento
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Mês/Ano Término"
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
                        onClick={handleAddConquista}
                        disabled={isSaving} // Desabilita o botão durante o salvamento
                    >
                        Incluir Competência
                    </Button>
                </Box>
                {conquistas.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Conquista</TableCell>
                                    <TableCell>Mês/Ano de Início</TableCell>
                                    <TableCell>Mês/Ano de Término</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {conquistas.map((conquista, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{conquista.nomeConquista}</TableCell>
                                        <TableCell>{conquista.mesAnoInicio}</TableCell>
                                        <TableCell>{conquista.mesAnoTermino}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {conquistas.length > 0 && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3 }}
                        onClick={handleSalvarConquistas}
                        disabled={isSaving} // Desabilita o botão de salvar enquanto está salvando
                    >
                        Salvar Conquistas
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default CadastraConquista;
