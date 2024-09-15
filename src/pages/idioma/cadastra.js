import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { CREATE_IDIOMA } from '../../graphql/mutations';

const CadastroIdioma = ({ profissionalId }) => {
    const [idiomaConhecido, setIdiomaConhecido] = useState('');
    const [nivel, setNivel] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [idiomas, setIdiomas] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // Controla o estado de salvamento

    const [createIdioma] = useMutation(CREATE_IDIOMA, {
        onError: (error) => {
            console.error('Erro ao criar idioma', error);
            setErrorMessage('Ocorreu um erro ao tentar salvar as idiomas. Por favor, tente novamente.');
        },
    });

    const handleAddIdioma = () => {
        if (idiomaConhecido && nivel) {
            const novoIdioma = { idiomaConhecido, nivel };
            setIdiomas([...idiomas, novoIdioma]);
            setIdiomaConhecido('');
            setNivel('');
            setErrorMessage('');
        } else {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios antes de adicionar.');
        }
    };

    const handleSalvarIdiomas = () => {
        setIsSaving(true); // Desabilita o botão "Incluir Idioma"
        
        Promise.all(
            idiomas.map((idioma) =>
                createIdioma({
                    variables: {
                        idiomaConhecido: idioma.idiomaConhecido,
                        nivel: idioma.nivel,
                        profissionalId,
                    },
                })
            )
        )
        .then(() => {
            setErrorMessage(''); // Limpa as mensagens de erro, caso existam
        })
        .catch(() => {
            setErrorMessage('Erro ao salvar os idiomas. Tente novamente.');
        })
        .finally(() => {
            setIsSaving(false); // Reativa o botão "Incluir Formação" ao término
        });
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Typography variant="h6">Cadastro de Idiomas</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <FormControl fullWidth margin="normal" disabled={isSaving}>
                        <InputLabel>Idioma</InputLabel>
                        <Select
                            value={idiomaConhecido}
                            onChange={(e) => setIdiomaConhecido(e.target.value)}
                            label="Idioma"
                            required
                        >
                            <MenuItem value="PORTUGUES">Português</MenuItem>
                            <MenuItem value="INGLES">Inglês</MenuItem>
                            <MenuItem value="ESPANHOL">Espanhol</MenuItem>
                            <MenuItem value="FRANCES">Francês</MenuItem>
                            <MenuItem value="ALEMAO">Alemão</MenuItem>
                            <MenuItem value="ITALIANO">Italiano</MenuItem>
                            <MenuItem value="MANDARIM">Mandarim</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" disabled={isSaving}>
                        <InputLabel>Nível</InputLabel>
                        <Select
                            value={nivel}
                            onChange={(e) => setNivel(e.target.value)}
                            label="Nível"
                            required
                        >
                            <MenuItem value="TECNICO">Técnico</MenuItem>
                            <MenuItem value="BASICO">Básico</MenuItem>
                            <MenuItem value="INTERMEDIARIO">Intermediário</MenuItem>
                            <MenuItem value="AVANCADO">Avançado</MenuItem>
                            <MenuItem value="FLUENTE_NATIVO">Fluente/Nativo</MenuItem>
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
                        onClick={handleAddIdioma}
                        disabled={isSaving} // Desabilita o botão durante o salvamento
                    >
                        Incluir Idioma
                    </Button>
                </Box>
                {idiomas.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Idioma</TableCell>
                                    <TableCell>Nível</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {idiomas.map((idioma, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{idioma.idiomaConhecido}</TableCell>
                                        <TableCell>{idioma.nivel}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {idiomas.length > 0 && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3 }}
                        onClick={handleSalvarIdiomas}
                        disabled={isSaving} // Desabilita o botão de salvar enquanto está salvando
                    >
                        Salvar Idiomas
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default CadastroIdioma;
