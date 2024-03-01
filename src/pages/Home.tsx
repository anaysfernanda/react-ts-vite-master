import React, { useEffect, useState } from 'react';
import DefaultLayout from '../config/layout/DefaultLayout';
import axios from 'axios';

interface PessoasType {
  name: string;
  avatar: string;
  last_name: string;
  phone: string;
  id: string;
}

const Home: React.FC = () => {
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [nome, setNome] = useState<string>('');
  const [novoElemento, setNovoElemento] = useState<any>();

  useEffect(() => {
    async function obterPessoas() {
      try {
        const response = await axios.get('https://6495dc81b08e17c91792c92d.mockapi.io/api/v1/people');
        setPessoas(response.data);
      } catch (error) {
        console.error('Erro ao obter pessoas', error);
      }
    }

    obterPessoas();
  }, []);

  const BuscarNome = async () => {
    const elemento = pessoas.find(pessoa => pessoa.name === nome);
    setNovoElemento(elemento);
    console.log(novoElemento);
  };

  return (
    <DefaultLayout>
      <h1>Home</h1>
      <label>Busca Nome</label>
      <input id="buscaNome" value={nome} onChange={ev => setNome(ev.target.value)} />
      <button onClick={() => BuscarNome()}>Buscar</button>
      <br />
      {novoElemento && <p>{novoElemento.name}</p>}

      {pessoas.map(pessoa => (
        <>
          <img src={pessoa.avatar} />
          <p>{`${pessoa.name} ${pessoa.last_name}`}</p>
          <p>{`Telefone: ${pessoa.phone}`}</p>
        </>
      ))}
    </DefaultLayout>
  );
};

export default Home;
