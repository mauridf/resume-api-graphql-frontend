import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import TableComponent from '../../components/table';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_PROFISSIONAIS } from '../../graphql/queries';
import { DELETE_PROFISSIONAL } from '../../graphql/mutations';

const Profissionais = () => {
    const { loading, error, data, refetch } = useQuery(GET_PROFISSIONAIS);
    const [deleteProfissional] = useMutation(DELETE_PROFISSIONAL);
    const [profissionais, setProfissionais] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setProfissionais(data.allProfissionais);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error('GraphQL Error:', error);
        return <p>Error: {error.message}</p>;
    }

    const columns = [
        { id: 'nome', label: 'Nome' },
        { id: 'dataNascimento', label: 'Data de Nascimento' },
        { id: 'endereco', label: 'Endereço'},
        { id: 'telefone', label: 'Telefone'},
        { id: 'email', label: 'E-mail'}
    ];

    const handleEdit = (id) => {
        navigate(`/edita-profissional/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Deseja deletar o registro?");
        if (confirmed) {
            try {
                const { data } = await deleteProfissional({ variables: { id } });
                if (data.deleteProfissional) {
                    alert('Registro deletado com sucesso!');
                    refetch(); // Atualiza a lista de profissionais
                } else {
                    alert('Erro ao deletar o registro.');
                }
            } catch (error) {
                console.error('Error deleting profissional:', error);
                alert('Ocorreu um erro ao tentar deletar o registro.');
            }
        }
    };

    const handleNew = () => {
        navigate('/cadastra-profissional');
    };

    return(
        <Container>
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    PROFISSIONAIS
                </Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={handleNew} sx={{ marginBottom: 2 }}>Novo</Button>
            <TableComponent columns={columns} data={profissionais} onEdit={handleEdit} onDelete={handleDelete} />
        </Container>
    );
}

export default Profissionais;