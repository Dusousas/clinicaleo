"use client"
import React, { useState } from 'react';
import { FileText, Play, Clock, Droplets, Leaf, Shield, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react';

const DocumentoTratamentoPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'tutorial' | 'composicao'>('tutorial');

    const tutorialSteps = [
        {
            step: 1,
            title: "Preparação",
            duration: "5 minutos",
            description: "Prepare o ambiente e os materiais necessários para o tratamento.",
            details: [
                "Lave bem as mãos com água e sabão",
                "Limpe a área de aplicação com álcool 70%",
                "Separe todos os materiais em local limpo",
                "Certifique-se de que o produto está na temperatura ambiente"
            ],
            icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        },
        {
            step: 2,
            title: "Aplicação Inicial",
            duration: "10 minutos",
            description: "Primeira aplicação do produto seguindo as orientações específicas.",
            details: [
                "Aplique uma pequena quantidade na palma da mão",
                "Espalhe uniformemente na área afetada",
                "Faça movimentos circulares suaves por 2-3 minutos",
                "Deixe o produto agir por 5 minutos antes de prosseguir"
            ],
            icon: <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
        },
        {
            step: 3,
            title: "Acompanhamento",
            duration: "Diário",
            description: "Monitore os resultados e ajuste conforme necessário.",
            details: [
                "Repita o processo 2x ao dia (manhã e noite)",
                "Fotografe a evolução semanalmente",
                "Anote qualquer reação ou mudança",
                "Entre em contato se houver efeitos adversos"
            ],
            icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
        }
    ];

    const composicoes = [
        {
            categoria: "Ativos Principais",
            ingredientes: [
                {
                    nome: "Ácido Hialurônico",
                    concentracao: "2%",
                    funcao: "Hidratação profunda e regeneração celular",
                    beneficios: "Mantém a pele hidratada, reduz linhas finas e promove elasticidade"
                },
                {
                    nome: "Vitamina C Estabilizada",
                    concentracao: "15%",
                    funcao: "Antioxidante e clareamento",
                    beneficios: "Combate radicais livres, uniformiza o tom e estimula colágeno"
                },
                {
                    nome: "Niacinamida",
                    concentracao: "5%",
                    funcao: "Controle de oleosidade e poros",
                    beneficios: "Reduz poros, controla sebo e melhora textura da pele"
                }
            ]
        },
        {
            categoria: "Extratos Naturais",
            ingredientes: [
                {
                    nome: "Extrato de Aloe Vera",
                    concentracao: "10%",
                    funcao: "Calmante e anti-inflamatório",
                    beneficios: "Acalma irritações, reduz vermelhidão e acelera cicatrização"
                },
                {
                    nome: "Óleo de Jojoba",
                    concentracao: "8%",
                    funcao: "Nutrição e proteção",
                    beneficios: "Nutre profundamente sem obstruir poros, similar ao sebo natural"
                },
                {
                    nome: "Extrato de Camomila",
                    concentracao: "3%",
                    funcao: "Propriedades calmantes",
                    beneficios: "Reduz irritação, vermelhidão e tem ação anti-inflamatória"
                }
            ]
        }
    ];

    const documentos = [
        {
            nome: "Manual Completo do Produto",
            tipo: "PDF",
            tamanho: "2.4 MB",
            descricao: "Guia detalhado com todas as informações sobre uso, composição e cuidados."
        },
        {
            nome: "Certificado de Análise",
            tipo: "PDF",
            tamanho: "1.1 MB",
            descricao: "Documento técnico com resultados de testes e certificações de qualidade."
        },
        {
            nome: "Ficha de Segurança",
            tipo: "PDF",
            tamanho: "800 KB",
            descricao: "Informações de segurança, primeiros socorros e precauções de uso."
        }
    ];

    return (
        <section className='py-10 sm:py-16 lg:py-20 bg-blue-50/50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-gray-900">
                        Documentos do Tratamento
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4 sm:px-0">
                        Encontre aqui todas as informações necessárias para o uso correto do seu produto, 
                        incluindo tutorial de aplicação e composição detalhada.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="bg-gray-100 p-1 rounded-lg flex w-full max-w-md sm:max-w-none sm:w-auto">
                        <button
                            onClick={() => setActiveTab('tutorial')}
                            className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium cursor-pointer transition-colors ${
                                activeTab === 'tutorial'
                                    ? 'bg-white text-teal-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Play className="w-4 h-4" />
                                <span className="text-sm sm:text-base">Tutorial de Uso</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('composicao')}
                            className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors cursor-pointer ${
                                activeTab === 'composicao'
                                    ? 'bg-white text-teal-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Leaf className="w-4 h-4" />
                                <span className="text-sm sm:text-base">Composição</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Tutorial Content */}
                {activeTab === 'tutorial' && (
                    <div className="mb-12 sm:mb-16">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Importante</h3>
                                    <p className="text-blue-800 text-sm sm:text-base">
                                        Siga rigorosamente as instruções abaixo. Em caso de dúvidas ou reações adversas, 
                                        entre em contato com nossa equipe de suporte imediatamente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 sm:gap-8">
                            {tutorialSteps.map((step, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
                                    <div className="flex items-start space-x-3 sm:space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                                                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block w-fit">
                                                    Passo {step.step}
                                                </div>
                                                <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                                    {step.duration}
                                                </div>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 text-sm sm:text-base">
                                                {step.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {step.details.map((detail, detailIndex) => (
                                                    <li key={detailIndex} className="flex items-start space-x-2">
                                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-gray-700 text-sm sm:text-base">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Composição Content */}
                {activeTab === 'composicao' && (
                    <div className="mb-12 sm:mb-16">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">Fórmula Natural</h3>
                                    <p className="text-green-800 text-sm sm:text-base">
                                        Nosso produto é desenvolvido com ingredientes cuidadosamente selecionados, 
                                        combinando ativos científicos com extratos naturais para máxima eficácia.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            {composicoes.map((categoria, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                                        {categoria.categoria}
                                    </h3>
                                    <div className="grid gap-4 sm:gap-6">
                                        {categoria.ingredientes.map((ingrediente, ingIndex) => (
                                            <div key={ingIndex} className="border border-gray-100 rounded-lg p-3 sm:p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                                                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                                                        {ingrediente.nome}
                                                    </h4>
                                                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                                                        {ingrediente.concentracao}
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-gray-600 text-sm sm:text-base">
                                                        <span className="font-medium">Função:</span> {ingrediente.funcao}
                                                    </p>
                                                    <p className="text-gray-600 text-sm sm:text-base">
                                                        <span className="font-medium">Benefícios:</span> {ingrediente.beneficios}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Documentos para Download */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-teal-600" />
                        Documentos Técnicos
                    </h2>
                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {documentos.map((doc, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors">
                                <div className="flex items-start space-x-3 mb-4">
                                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">
                                            {doc.nome}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {doc.tipo} • {doc.tamanho}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                                    {doc.descricao}
                                </p>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                    <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Visualizar
                                    </button>
                                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-teal-600 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-teal-700 transition-colors">
                                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DocumentoTratamentoPage;