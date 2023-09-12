"use client";
import axios from 'axios';
import React from "react";
import { styled } from "styled-components";

const BtnDiv = styled.div`
    display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 20px;
  }

  input[type="file"] {
    display: none;
  }

  label {
    background: #FF4742;
    border: 1px solid #FF4742;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 16px;
    min-height: 40px;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    margin: 20px;
  }

  label:hover,
  label:active {
    background-color: initial;
    background-position: 0 0;
    color: #FF4742;
  }

  label:active {
    opacity: 0.5;
  }

  #nome-arquivo {
    margin-top: 10px;
    font-weight: bold;

    margin-bottom: 20px;

  }

  .button-24 {
    background: #FF4742;
    border: 1px solid #FF4742;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 16px;
    min-height: 40px;
    outline: 0;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
  }
  
  .button-24:hover,
  .button-24:active {
    background-color: initial;
    background-position: 0 0;
    color: #FF4742;
  }
  
  .button-24:active {
    opacity: .5;
  }
  
  display: flex;
  flex-direction: column;
`;

const enviarArquivoParaAPI = async (file: File) => { // Alterei 'arquivo' para 'file' aqui
  try {
    const formData = new FormData();
    formData.append('file', file); // Altere 'arquivo' para 'file' aqui

    const resposta = await axios.post('http://localhost:5000/abate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Lide com a resposta da API conforme necessário
    console.log('Resposta da API:', resposta.data);

    if(resposta.status === 200) {
        alert('Sucesso!\nEnviados: '+ resposta.data.Enviados)
    }

    if(resposta.status === 400 ){
        alert('Erro!\nErros: '+ resposta.data.Erros)
    }

  } catch (erro) {
    // Lide com erros, se houver
    console.error('Erro ao enviar o arquivo para a API:', erro);
    
  }
};

export function Abate() {
    const handleFileInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const elemento = document.getElementById("nome-arquivo");
            if (elemento !== null) {
              const nomeArquivo = e.target.files[0].name; // Obtém o nome do primeiro arquivo selecionado
              elemento.textContent = `Nome do arquivo: ${nomeArquivo}`;
            }
        }
    };

  const handleEnviarClick = () => {
    const inputArquivo: HTMLInputElement | null = document.getElementById("arquivo") as HTMLInputElement;
    if (inputArquivo.files && inputArquivo.files.length > 0) {
      const arquivo = inputArquivo.files[0];
      enviarArquivoParaAPI(arquivo);
    }
  };

  return (
    <BtnDiv>
      <h1>Selecione o arquivo de Abate</h1>
      <label htmlFor="arquivo">
        Escolher arquivo
        <input
          type="file"
          id="arquivo"
          name="arquivo"
          onChange={handleFileInputChange}
        />
      </label>
      <div id="nome-arquivo"></div>
      <button onClick={handleEnviarClick} className="button-24">
        Enviar
      </button>

        

    </BtnDiv>
  );
}
