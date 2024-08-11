import React, { useState } from "react"
import { Input } from "./components/ui/input";
import { Result } from "./components/result";

interface CepData {
  cep: string;
  bairro: string;
  complemento: string;
  ddd: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

function App() {
  const [getDados, setGetDados] = useState<CepData|null>(null);
  const [cep, setCep] = useState<string>("")

  async function GetApi(cep: string) {
    try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
  
    if (cep.length !== 8) {
      console.log('Tamanho inválido');
      throw new Error('Tamanho inválido');
    }

    if(dados.erro === 'true') {
      console.log('cep inválido');
      throw new Error('cep inválido');
    }

    setGetDados(dados);
    console.log(dados);
  }
  catch (error) {
    console.log(error);
  }
  }



  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCep(e.target.value);
  }

  function handleInputSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    GetApi(cep)
  }

  return (
    <div className="p-10">
      <form onSubmit={handleInputSubmit} className="pb-5 mb-5 border-b-2">
        <Input 
          className="rounded-xl"
          placeholder="Digite o CEP"
          value={cep}
          onChange={handleInputChange}
        />
      </form>
      <div className="">
        <Result name="Cep" busca={getDados? getDados.cep : ''}/>
        <div className="flex w-1/2 justify-between">
          <Result name="Logradouro" busca={getDados? getDados.logradouro : ''}/>
          <Result name="Complemento" busca={getDados? getDados.complemento : ''}/>
        </div>
        <Result name="Bairro" busca={getDados? getDados.bairro : ''}/>
        <Result name="Cidade" busca={getDados? getDados.localidade : ''}/>
        <Result name="Estado" busca={getDados? getDados.uf : ''}/>
        <Result name="DDD" busca={getDados? getDados.ddd : ''}/>
      </div>
    </div>
  )
}

export default App
