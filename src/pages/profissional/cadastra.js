import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useMutation } from '@apollo/client';
import { GET_PROFISSIONAIS } from '../../graphql/queries';
import { CREATE_PROFISSIONAL } from '../../graphql/mutations';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CadastroRedesSociais from '../redesocial/cadastra';
import CadastroFormacao from '../formacao/cadastra';
import CadastroIdioma from '../idioma/cadastra';
import CadastraCompetencia from '../competencia/cadastra';
import CadastraConquista from '../conquistas/cadastra';
import CadastraExperiencia from '../experiencias/cadastra';

const CadastraProfissional = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState(dayjs());
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [savedId, setSavedId] = useState(null); // Estado para armazenar o ID do profissional
    const [expanded, setExpanded] = useState('panel1'); // Estado para controle da expansão dos Acordeons

    const [createProfissional] = useMutation(CREATE_PROFISSIONAL, {
        refetchQueries: [{ query: GET_PROFISSIONAIS }],
        onCompleted: (data) => {
            setSavedId(data.createProfissional.id); // Armazena o ID gerado
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            await createProfissional({
                variables: { 
                    nome,
                    dataNascimento: dataNascimento.toISOString(),
                    endereco,
                    telefone,
                    email
                },
            });
        } catch (error) {
            console.error('Erro ao criar profissional', error);
            setErrorMessage('Ocorreu um erro ao tentar cadastrar o profissional. Por favor, tente novamente.');
        }
    };

    const handleBack = () => {
        navigate('/profissionais');
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h5">Cadastro de Profissional</Typography>
                
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={expanded === 'panel1' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        <Typography variant="h6">PROFISSIONAIS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <TextField variant="outlined" margin="normal" required fullWidth id="nome" label="Nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                            
                            <DesktopDatePicker
                                label="Data de Nascimento"
                                inputFormat="DD/MM/YYYY"
                                value={dataNascimento}
                                onChange={(newValue) => setDataNascimento(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                            />

                            <TextField variant="outlined" margin="normal" required fullWidth id="endereco" label="Endereço" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                            <TextField variant="outlined" margin="normal" required fullWidth id="telefone" label="Telefone" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                            <TextField variant="outlined" margin="normal" required fullWidth id="email" label="E-Mail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            
                            {errorMessage && (
                                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                                    {errorMessage}
                                </Alert>
                            )}

                            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>Salvar</Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Acordeons que serão visíveis após o cadastro */}
                {savedId && (
                    <>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel2' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                <Typography variant="h6">REDES SOCIAIS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Componente de Cadastro de Redes Sociais */}
                                {savedId && <CadastroRedesSociais profissionalId={savedId} />}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel3' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                <Typography variant="h6">FORMAÇÃO</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Componente de Cadastro de Formações */}
                                {savedId && <CadastroFormacao profissionalId={savedId} />}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel4' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                <Typography variant="h6">IDIOMA</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Componente de Cadastro de Idiomas */}
                                {savedId && <CadastroIdioma profissionalId={savedId} />}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel5' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                <Typography variant="h6">COMPETÊNCIAS (SKILLS)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Componente de Cadastro de Competência */}
                                {savedId && <CadastraCompetencia profissionalId={savedId} />}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel6' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                <Typography variant="h6">CONQUISTAS (CERTIFICADOS, CERTIFICAÇÕES, ETC...)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Componente de Cadastro de Competência */}
                                {savedId && <CadastraConquista profissionalId={savedId} />}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel7' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                <Typography variant="h6">EXPERIÊNCIA PROFISSIONAL</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Componente de Cadastro de Competência */}
                                {savedId && <CadastraExperiencia profissionalId={savedId} />}
                            </AccordionDetails>
                        </Accordion>

                        <Button type="button" fullWidth variant="outlined" color="secondary" onClick={handleBack} sx={{ mt: 3, mb: 2 }}>
                            Cadastro Finalizado
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default CadastraProfissional;
