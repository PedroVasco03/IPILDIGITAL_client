import { useState, useEffect } from 'react';
import axios from 'axios';

function TabelaServicos() {
  const [gerado, setGerado] = useState([]); // <-- declara o estado
  const [id, setId] = useState(null);
  const [referencia, setReferencia] = useState('');

  const toggleModal = () => {
    // lógica do modal
  };

  const update = (estado, idItem) => {
    // lógica para atualizar estado do item
    console.log(`Atualizar ${idItem} para ${estado}`);
  };

  useEffect(() => {
    // exemplo de fetch de dados
    axios.get('http://localhost:5000/servicos')
      .then((res) => setGerado(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <table className="table table-bordered table-hover mb-0">
      <thead>
        <tr>
          <th>id_Referência</th>
          <th>Referência de pagamento</th>
          <th>Data de Emissão</th>
          <th>Data de Expiração</th>
          <th>Estado</th>
          <th>Permissão</th>
        </tr>
      </thead>
      <tbody>
        {gerado.map((item) => (
          <tr
            key={item.id}
            style={{ cursor: 'pointer' }}
            onDoubleClick={() => {
              setId(item.id);
              toggleModal();
              setReferencia(item.rupe);
            }}
          >
            <td>{item.id}</td>
            <td>{item.rupe}</td>
            <td>{item.dataEmissao}</td>
            <td>{item.dataExpirar}</td>
            <td>
              <span className={`badge ${item.estado === 'activo' ? 'bg-success' : 'bg-secondary'}`}>
                {item.estado}
              </span>
            </td>
            <td>
              <button className="btn btn-sm btn-outline-success mx-1" onClick={() => update('pago', item.id)}>Pago</button>
              <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => update('inactivo', item.id)}>Inactivo</button>
              <button className="btn btn-sm btn-outline-primary mx-1" onClick={() => update('activo', item.id)}>Activo</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaServicos;
