import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import { CREATE_REDE_SOCIAL } from '../../graphql/mutations';

const CadastroRedesSociais = ({ profissionalId }) => {
    const [nomeRedeSocial, setNomeRedeSocial] = useState('');
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [redesSociais, setRedesSociais] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // Controla o estado de salvamento

    const [createRedeSocial] = useMutation(CREATE_REDE_SOCIAL, {
        onError: (error) => {
            console.error('Erro ao criar rede social', error);
            setErrorMessage('Ocorreu um erro ao tentar salvar as redes sociais. Por favor, tente novamente.');
        },
    });

    const handleAddRedeSocial = () => {
        if (nomeRedeSocial && url) {
            const novaRedeSocial = { nomeRedeSocial, url };
            setRedesSociais([...redesSociais, novaRedeSocial]);
            setNomeRedeSocial('');
            setUrl('');
            setErrorMessage('');
        } else {
            setErrorMessage('Por favor, preencha todos os campos antes de adicionar.');
        }
    };

    const handleSalvarRedesSociais = () => {
        setIsSaving(true); // Desabilita o botão "Incluir Rede Social"
        
        // Usa `Promise.all` para garantir que todas as mutações foram feitas antes de terminar o salvamento
        Promise.all(
            redesSociais.map((redeSocial) =>
                createRedeSocial({
                    variables: {
                        nomeRedeSocial: redeSocial.nomeRedeSocial,
                        url: redeSocial.url,
                        profissionalId,
                    },
                })
            )
        )
        .then(() => {
            setErrorMessage(''); // Limpa as mensagens de erro, caso existam
        })
        .catch(() => {
            setErrorMessage('Erro ao salvar as redes sociais. Tente novamente.');
        })
        .finally(() => {
            setIsSaving(false); // Reativa o botão "Incluir Rede Social" ao término
        });
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                <Typography variant="h6">Cadastro de Redes Sociais</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Nome da Rede Social"
                        value={nomeRedeSocial}
                        onChange={(e) => setNomeRedeSocial(e.target.value)}
                        disabled={isSaving} // Desabilita o campo durante o salvamento
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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
                        onClick={handleAddRedeSocial}
                        disabled={isSaving} // Desabilita o botão durante o salvamento
                    >
                        Incluir Rede Social
                    </Button>
                </Box>
                {redesSociais.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome da Rede Social</TableCell>
                                    <TableCell>URL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {redesSociais.map((redeSocial, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{redeSocial.nomeRedeSocial}</TableCell>
                                        <TableCell>{redeSocial.url}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {redesSociais.length > 0 && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3 }}
                        onClick={handleSalvarRedesSociais}
                        disabled={isSaving} // Desabilita o botão de salvar enquanto está salvando
                    >
                        Salvar Redes Sociais
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default CadastroRedesSociais;
