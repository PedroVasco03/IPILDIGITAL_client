import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Image from "next/image";
import Head from "next/head";
import { useRouter } from 'next/router';
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import axios from 'axios';
import i1 from "../../public/images/logotipo.png";
import image from '../../public/images/profile_user.png';
import styleGeral from '../css/logado.module.css';
import styleChat from '../css/chat.module.css';

const socket = io('http://localhost:5000');

function Chat() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [tipo, setTipo] = useState('');
  const [tipo2, setTipo2] = useState('');
  const router = useRouter();

  // Inicializa dados do usuário
  useEffect(() => {
    const tipoLocal = localStorage.getItem('tipoDirector');
    const tipoLocal2 = localStorage.getItem('tipoDirector2');
    setTipo(tipoLocal);
    setTipo2(tipoLocal2);
    setSender(localStorage.getItem('usernameDirector'));
    setReceiver(localStorage.getItem('receptorDirector'));
    verifyUser();
  }, []);

  // Configura socket para receber mensagens em tempo real
  useEffect(() => {
    socket.on('newMessage', ({ sender, receiver, message, time }) => {
      setMessages(prev => [...prev, { sender, receiver, message, time }]);
    });

    return () => socket.off('newMessage');
  }, []);

  // Verifica se o usuário ainda tem permissão
  const verifyUser = async () => {
    try {
      const idDirector = localStorage.getItem('iddirector');
      if (!idDirector) return router.push('/login/director/login');

      const res = await axios.get(`http://localhost:5000/director/${idDirector}`);
      if (res.data.permissao === 'Recusar') router.push('/login/director/login');

      await loadMessages(idDirector);
    } catch (err) {
      console.error(err);
      router.push('/login/director/login');
    }
  };

  // Carrega mensagens do servidor filtradas pelo sender/receiver
  const loadMessages = async () => {
    const res = await axios.get('http://localhost:5000/mensagem');
    const filtered = res.data.filter(
      m => (m.sender === sender && m.receiver === receiver) ||
           (m.sender === receiver && m.receiver === sender)
    );
    setMessages(filtered);
  };

  // Salva receptor no banco se ainda não existir
  const saveReceptor = async () => {
    const res = await axios.get('http://localhost:5000/enviado');
    const exists = res.data.some(
      d => (d.nome === sender && d.receptor === receiver) || (d.receptor === sender && d.nome === receiver)
    );
    if (!exists) {
      await axios.post('http://localhost:5000/enviado', {
        nome: sender,
        receptor: receiver,
        tipoSender: tipo2,
        tipoReceiver: tipo
      });
    }
  };

  // Envia a mensagem via socket
  const sendMessage = () => {
    if (!message.trim()) return alert('Mensagem não pode ser vazia!');
    
    const date = new Date();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP","OCT", "NOV", "DEC"];
    const time = `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${monthNames[date.getMonth()]}/${date.getFullYear()}`;

    socket.emit('newMessage', { sender, receiver, message, time });
    setMessages(prev => [...prev, { sender, receiver, message, time }]);
    setMessage('');
    saveReceptor();
  };

  return (
    <div>
      <Head>
        <title>Director | Chat</title>
        <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
      </Head>
      <NavBarAluno />
      <div className={styleGeral.container}>
        <SideBarAluno />
        <div className={styleChat.content}>
          <div className={`col-md-8 col-xl-6 ${styleChat.chat_mensagens}`}>
            <div className={`${styleChat.card} card ${styleChat.chat_card}`}>
              {/* Header */}
              <div className={`card-header mb-2 ${styleChat.msg_head}`}>
                <div className="d-flex bd-highlight">
                  <div className={styleChat.img_cont}>
                    <Image className={`rounded-circle ${styleChat.user_img}`} src={i1} alt="User"/>
                    <span className={styleChat.online_icon}></span>
                  </div>
                  <div className={styleChat.user_info}>
                    <span>{receiver}</span>
                    <p>{tipo}</p>
                    <p>Envie a sua mensagem</p>
                  </div>
                </div>
              </div>

              {/* Mensagens */}
              <div className={`card-body ${styleChat.msgcard_body}`}>
                {messages.map((msg, idx) => (
                  msg.sender === sender ? (
                    <div key={idx} className="d-flex justify-content-end mb-3">
                      <div className={`${styleChat.msg_cotainer_send} ${styleChat.msg}`}>
                        <span className={styleChat.usernameI}>{msg.sender}</span>
                        {msg.message}
                        <span className={styleChat.msg_time_send}>{msg.time}</span>
                      </div>
                      <div className={styleChat.img_cont_msg}>
                        <Image className={`rounded-circle ${styleChat.user_img_msg}`} src={image} alt="Profile"/>
                      </div>
                    </div>
                  ) : (
                    <div key={idx} className="d-flex justify-content-start mb-3">
                      <div className={styleChat.img_cont_msg}>
                        <Image className={`rounded-circle ${styleChat.user_img_msg}`} src={image} alt="Profile"/>
                      </div>
                      <div className={`${styleChat.msg_cotainer} ${styleChat.msg}`}>
                        <span className={styleChat.username}>{msg.sender}</span>
                        {msg.message}
                        <span className={styleChat.msg_time}>{msg.time}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Input */}
              <div className={styleChat.card_footer}>
                <div className="input-group">
                  <span className={`input-group-text ${styleChat.attach_btn}`}><i className="bi-paperclip"></i></span>
                  <textarea
                    className={`form-control ${styleChat.type_msg}`}
                    placeholder="Escreva a sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className={`input-group-text ${styleChat.send_btn}`} onClick={sendMessage}>
                    <i className={`bi bi-send-fill ${styleChat.i}`}></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
