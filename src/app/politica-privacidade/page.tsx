import React from 'react';
import Head from 'next/head';

// Substitua pelos dados da sua empresa
const COMPANY_NAME = "Sua Empresa";
const CONTACT_EMAIL = "contato@suaempresa.com";
const DPO_EMAIL = "dpo@suaempresa.com"; // responsável pela proteção de dados (opcional)
const LAST_UPDATED = "09 de Setembro de 2025";

export default function Page() {
  return (
    <>
      <Head>
        <title>Política de Privacidade — {COMPANY_NAME}</title>
        <meta name="description" content={`Política de Privacidade de ${COMPANY_NAME}`} />
      </Head>

      <section className="lg:pt-30">
        <div className="max-w-4xl mx-auto p-6 sm:p-12">
          <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

          <p className="mb-4">
            Esta Política de Privacidade explica como <strong>{COMPANY_NAME}</strong> coleta, usa, compartilha e protege
            as informações pessoais dos usuários quando você utiliza nossos sites, aplicativos, produtos e
            serviços (coletivamente, "Serviços"). Leia com atenção para entender nossas práticas.
          </p>

          <h2 className="text-lg font-semibold mt-6">Última atualização</h2>
          <p className="mb-4">{LAST_UPDATED}</p>

          <h2 className="text-lg font-semibold mt-6">1. Âmbito e Responsável pelo Tratamento</h2>
          <p className="mb-4">
            Esta política aplica-se a todos os produtos e serviços fornecidos por <strong>{COMPANY_NAME}</strong>.
            O controlador/responsável pelo tratamento dos dados pessoais é <strong>{COMPANY_NAME}</strong>.
            Para questões relativas a esta política, entre em contato pelo e-mail abaixo.
          </p>

          <h2 className="text-lg font-semibold mt-6">2. Definições</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Dados pessoais:</strong> qualquer informação identificável relacionada a uma pessoa natural.</li>
            <li><strong>Tratamento:</strong> toda operação realizada com dados pessoais (coleta, armazenamento, uso, compartilhamento, exclusão).</li>
            <li><strong>Controlador/Responsável:</strong> entidade que decide como e por que os dados são tratados.</li>
            <li><strong>Operador/Subprocessador:</strong> terceiros que tratam dados em nome do controlador.</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">3. Quais dados coletamos</h2>
          <p className="mb-2">Podemos coletar diferentes tipos de dados, incluindo, sem limitação:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Dados de identificação:</strong> nome, CPF/CNPJ (quando necessário), data de nascimento, gênero.
            </li>
            <li><strong>Contato:</strong> e-mail, telefone, endereço postal.</li>
            <li><strong>Dados de conta:</strong> nome de usuário, senha (armazenada de forma segura), histórico de compras.</li>
            <li><strong>Informações de pagamento:</strong> dados necessários ao processamento de pagamentos (
              cartões através de provedores de pagamento). Não armazenamos dados sensíveis de cartões em nossos servidores,
              exceto quando explicitamente informado e com medidas de segurança adicionais.
            </li>
            <li><strong>Dados de uso e analytics:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de sessão, logs.
            </li>
            <li><strong>Dados de dispositivos:</strong> identificadores, sistema operacional, informações de geolocalização aproximada.
            </li>
            <li><strong>Dados sensíveis:</strong> não solicitamos intencionalmente dados sensíveis (saúde, orientação sexual, crenças religiosas).
              Se coletarmos tais dados em contexto específico, informaremos e pediremos consentimento explícito quando necessário.
            </li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">4. Como coletamos os dados</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Diretamente:</strong> quando você preenche formulários, cria conta, compra produtos ou nos contata.</li>
            <li><strong>Automaticamente:</strong> por meio de cookies, pixels, ferramentas de analytics e logs do servidor.</li>
            <li><strong>De terceiros:</strong> parceiros, redes sociais (quando autoriza login social), provedores de pagamento, serviços de entrega.</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">5. Finalidades do tratamento</h2>
          <p className="mb-2">Tratamos dados pessoais para diversas finalidades, incluindo:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Fornecer, operar e melhorar nossos Serviços.</li>
            <li>Processar pagamentos, entregas e pedidos.</li>
            <li>Comunicar sobre pedidos, atualizações de conta, suporte e segurança.</li>
            <li>Enviar marketing, promoções e comunicações comerciais quando houver consentimento.</li>
            <li>Prevenir fraudes, proteger a segurança dos usuários e do sistema.</li>
            <li>Atender obrigações legais e fiscais.</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">6. Bases legais para o tratamento (quando aplicável)</h2>
          <p className="mb-2">Dependendo da jurisdição, tratamos dados com base em:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Consentimento:</strong> quando você concorda explicitamente com o tratamento (ex.: newsletters).</li>
            <li><strong>Execução de contrato:</strong> para cumprir com pedidos e contratos com você.</li>
            <li><strong>Obrigação legal:</strong> para cumprir leis e regulações fiscais e contábeis.</li>
            <li><strong>Interesse legítimo:</strong> para prevenção de fraudes, segurança e melhoria dos serviços (avaliamos e equilibramos este interesse com seus direitos).</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">7. Cookies e tecnologias similares</h2>
          <p className="mb-2">Utilizamos cookies e tecnologias semelhantes para diversos fins:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Essenciais:</strong> necessários para funcionamento do site e autenticação.</li>
            <li><strong>Preferências:</strong> lembrar idioma e preferências de exibição.</li>
            <li><strong>Analytics:</strong> entender como você utiliza nossos serviços e melhorar a experiência.</li>
            <li><strong>Marketing:</strong> veicular anúncios relevantes em outros sites.</li>
          </ul>
          <p className="mb-4">Você pode gerenciar ou bloquear cookies pelas configurações do seu navegador, mas isso pode afetar funcionalidades.</p>

          <h2 className="text-lg font-semibold mt-6">8. Compartilhamento e divulgação</h2>
          <p className="mb-2">Não vendemos seus dados pessoais. Podemos compartilhar dados com:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Operadores/subprocessadores que prestam serviços (hospedagem, analytics, pagamento, logística).</li>
            <li>Autoridades governamentais quando exigido por lei ou ordem judicial.</li>
            <li>Empresas envolvidas em reorganizações societárias (fusão, aquisição), mediante aviso aos titulares quando aplicável.</li>
          </ul>

          <h2 className="text-lg font-semibold mt-6">9. Transferências internacionais</h2>
          <p className="mb-4">Podemos transferir dados para países que tenham regras de proteção diferentes. Em caso de transferência internacional, adotamos salvaguardas apropriadas (cláusulas contratuais, avaliações de risco) conforme a legislação aplicável (ex.: LGPD, GDPR quando aplicável).</p>

          <h2 className="text-lg font-semibold mt-6">10. Retenção de dados</h2>
          <p className="mb-4">Reteremos seus dados apenas pelo tempo necessário para as finalidades informadas, para cumprir obrigações legais ou para resolução de disputas. Critérios de retenção incluem exigências legais, necessidades de negócio e consentimento do titular.</p>

          <h2 className="text-lg font-semibold mt-6">11. Direitos dos titulares</h2>
          <p className="mb-2">Dependendo da legislação aplicável (por exemplo, LGPD na Brasil, GDPR na UE, CCPA na Califórnia), você poderá ter os seguintes direitos:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Acesso aos dados pessoais que mantemos sobre você.</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
            <li>Portabilidade dos dados a outro fornecedor, quando aplicável.</li>
            <li>Revogação do consentimento quando o tratamento estiver baseado nele.</li>
            <li>Oposição ao tratamento com base em legítimo interesse.</li>
            <li>Peticionar à autoridade supervisora competente em caso de insatisfação com o tratamento.</li>
          </ul>
          <p className="mb-4">Para exercer seus direitos, entre em contato pelo e-mail: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Informe seu nome completo, e-mail e descreva a solicitação. Podemos exigir comprovação de identidade para proteger seus dados.</p>

          <h2 className="text-lg font-semibold mt-6">12. Segurança</h2>
          <p className="mb-4">Adotamos medidas técnicas e administrativas adequadas para proteger os dados pessoais, incluindo criptografia, controles de acesso e monitoramento. Apesar disso, nenhum sistema é completamente infalível; portanto, não podemos garantir segurança absoluta.</p>

          <h2 className="text-lg font-semibold mt-6">13. Menores</h2>
          <p className="mb-4">Nossos serviços não se destinam a menores de 16 anos (ou limite aplicável em sua jurisdição). Não coletamos intencionalmente dados de menores sem consentimento dos pais ou responsáveis. Se soubermos que coletamos dados de um menor sem autorização, tomaremos medidas para excluir essas informações.</p>

          <h2 className="text-lg font-semibold mt-6">14. Processadores e subprocessadores</h2>
          <p className="mb-4">Utilizamos terceiros para prestar serviços (ex.: provedores de hospedagem, gateways de pagamento, serviços de e-mail e analytics). Essas entidades atuarão como operadores/subprocessadores e estão vinculadas por contratos que exigem proteção de dados. Uma lista de subprocessadores e suas finalidades pode ser fornecida mediante solicitação.</p>

          <h2 className="text-lg font-semibold mt-6">15. Tratamento automatizado e decisões automatizadas</h2>
          <p className="mb-4">Podemos utilizar processamento automatizado para analytics, recomendações de produto e detecção de fraude. Não realizamos decisões automatizadas que causem efeitos jurídicos ou significativos sobre os titulares sem intervenção humana, salvo quando informado e permitido pela lei.</p>

          <h2 className="text-lg font-semibold mt-6">16. Marketing e comunicações</h2>
          <p className="mb-4">Enviaremos comunicações promocionais somente quando você tiver dado consentimento ou quando houver relação contratual prévia (com opção de opt-out). Em todas as comunicações de marketing haverá instruções claras para cancelar a inscrição.</p>

          <h2 className="text-lg font-semibold mt-6">17. Alterações nesta política</h2>
          <p className="mb-4">Podemos atualizar esta Política de Privacidade periodicamente. Quando as alterações forem significativas, notificaremos os usuários por e-mail (quando aplicável) ou colocaremos um aviso em destaque em nossos Serviços. A versão vigente ficará disponível nesta página com a data da última atualização.</p>

          <h2 className="text-lg font-semibold mt-6">18. Contato</h2>
          <p className="mb-2">Para dúvidas, solicitações de acesso, correção, exclusão ou outras questões relativas à privacidade, entre em contato:</p>
          <p className="mb-4">
            <strong>Email de contato:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            {""}
            {DPO_EMAIL && (
              <>
                <br />
                <strong>Encarregado/DPO (opcional):</strong> <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>
              </>
            )}
          </p>

          <footer className="mt-10 border-t pt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.
          </footer>
        </div>
      </section>
    </>
  );
}
