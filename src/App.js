import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/menu';
import Footer from './components/footer';
import Profissionais from './pages/profissional/lista';
import EditaProfissional from './pages/profissional/edita';
import CadastraProfissional from './pages/profissional/cadastra';
import CadastroRedesSociais from './pages/redesocial/cadastra'; 
import CadastroFormacao from './pages/formacao/cadastra';
import CadastroIdioma from './pages/idioma/cadastra';
import CadastraCompetencia from './pages/competencia/cadastra';
import CadastraConquista from './pages/conquistas/cadastra';
import CadastraExperiencia from './pages/experiencias/cadastra';

function App() {
    return (
        <Router>
            <div>
                <Menu />
                <main>
                    <Routes>
                      {/* PROFISSIONAL */}
                        <Route path="/profissionais" element={<Profissionais />} />
                        <Route path="/edita-profissional/:id" element={<EditaProfissional />} />
                        <Route path="/cadastra-profissional" element={<CadastraProfissional />} />
                      {/* REDE SOCIAL */} 
                        <Route path="/redes-sociais" element={<CadastroRedesSociais />} />
                      {/* FORMAÇÃO */}
                        <Route path="/formacoes" element={<CadastroFormacao />} />
                      {/* IDIOMA */}
                        <Route path="/idiomas" element={<CadastroIdioma />} />
                      {/* COMPETENCIA */}
                        <Route path="/competencias" element={<CadastraCompetencia />} />
                      {/* CONQUISTAS */}
                        <Route path="/conquistas" element={<CadastraConquista />} />
                      {/* EXPERIENCIAS */}
                        <Route path="/experiencias" element={<CadastraExperiencia />} />
                    </Routes>
                </main>
                
                <Footer />
            </div>
        </Router>
    );
}

export default App;
