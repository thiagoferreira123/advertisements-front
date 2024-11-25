/* eslint-disable react/no-danger */
import React from 'react';
import { LAYOUT } from '/src/constants';
import useCustomLayout from '/src/hooks/useCustomLayout';

const MiscellaneousMailing = () => {


  useCustomLayout({ layout: LAYOUT.Boxed });

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <div
          style="
            height: auto !important;
            max-width: 600px !important;
            font-family: Helvetica, Arial, sans-serif !important;
            margin-bottom: 40px;
            margin-left: auto;
            margin-right: auto;
          "
        >
          <!-- Basic Start -->
          <div style="margin-bottom: 100px">
            <table
              style="
                max-width: 600px;
                background-color: #ffffff;
                border: none;
                border-collapse: separate !important;
                border-radius: 16px;
                border-spacing: 0;
                color: #4e4e4e;
                margin: 0;
                padding: 32px;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.5;
                box-shadow: 0 4px 10px rgb(0 0 0/3%) !important;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <h6 style="display: inline-block; font-size: 20px; margin: 10px 0; font-weight: 600; text-align:center">Identificamos um problema com o pagamento da sua assinatura 😕<br><br></h6> 
                    <div>
                    <p>
                      Olá, Thiago Ferreira dos Santos
                      </p>
                      <p>
                      O status da sua assinatura é: <span class="badge bg-danger">Cancelada</span>
                      </p>
                      <p>
                      Sua assinatura expirou e estamos sentindo sua falta. Renove agora para desbloquear novamente todos os benefícios e continuar aproveitando o OdontCloud sem limites.
                      </p>
                      <p>
                      Para manter seu acesso às funcionalidades do OdontCloud, por favor, atualize sua assinatura clicando no botão abaixo.
                      </p>
                      <p style="text-align: center;">
                      <a href="https://purchase.hotmart.com/" target="_blank" class="mb-1 btn btn-primary" role="button">Regularizar</a>
                      </p>
                      <p>
                      Instruções:
                      </p>
                      <ol>
                          <li><p>Digite o e-mail utilizado na compra. </p></li>
                          <li><p>Digite sua senha (se esqueceu, selecione "esqueci minha senha").</p></li>
                          <li><p>Acesse suas compras e selecione o OdontCloud.</p></li>
                          <li><p>Verifique suas faturas pendentes e realize o pagamento.</p></li>
                      </ol>

                      <p>
                      <p>Tutorial completo: <a href="https://help.hotmart.com/pt-br/article/como-gerir-os-meus-pagamentos-pela-area-do-comprador-da-plataforma-beta-/19424127593741" target="_blank">Como emitir um novo boleto para uma assinatura atrasada</a>.</p>
                      </p>
                      <p>Se tiver dúvidas, consulte nossa <a href="https://OdontCloud.com.br/politica-de-pagamentos" target="_blank">política de pagamentos</a>.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Basic End -->
         `,
        }}
      />
    </>
  );
};

export default MiscellaneousMailing;
