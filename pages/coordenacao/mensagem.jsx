import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Image from "next/image";
import empty from '../../public/images/images-system/empty.png';
import Head from "next/head";
import i1 from "../../public/images/logotipo.png";
import i2 from "../../public/images/student.jpg";
import styleSide from'../css/sideBar.module.css';
import styleGeral from '../css/logado.module.css';
import styleChat from '../css/chat.module.css';
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import image from '../../public/images/profile_user.png';
import axios from 'axios';
import { useRouter } from 'next/router';

const socket = io('http://localhost:5000');

function Chat() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [tipo, setTipo] = useState('');
  const [tipo2, setTipo2] = useState('');
  const router = useRouter();

  useEffect(() => {
    setTipo(localStorage.getItem('tipoCoordenador'));
    setTipo2(localStorage.getItem('tipoCoordenador2'));
    setSender(localStorage.getItem('usernameCoordenador'));

    const receiverInterval = setInterval(() => {
      setReceiver(localStorage.getItem('receptorCoordenador'));
    }, 100);

    const dataInterval = setInterval(() => {
      getData();
    }, 1000);

    return () => {
      clearInterval(receiverInterval);
      clearInterval(dataInterval);
    };
  }, []);

  useEffect(() => {
    handleGetMessages();

    socket.on('newMessage', ({ sender, receiver, message, time }) => {
      setMessages(prev => [...prev, { sender, receiver, message, time }]);
    });

    socket.on('messages', (msgs) => {
      setMessages(msgs);
    });

    return () => {
      socket.off('newMessage');
      socket.off('messages');
    };
  }, [messages]);

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP","OCT", "NOV", "DEC"];

  const handleSendMessage = () => {
    if (message === '') return alert('Mensagem não pode ser vazia!');
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${monthNames[date.getMonth()]}/${date.getFullYear()}`;
    socket.emit('newMessage', { sender, receiver, message, time });
    setMessage('');
  };

  const handleGetMessages = async () => {
    const res = await axios.get('http://localhost:5000/mensagem');
    const search = res.data.filter(
      data => (data.sender === sender && data.receiver === receiver) ||
              (data.sender === receiver && data.receiver === sender)
    );
    setMessages(search);
  };

  const getData = async () => {
    const id = localStorage.getItem('idcoordenador');
    if (!id) return router.push('/login/coordenacao/login');

    try {
      const res = await axios.get(`http://localhost:5000/coordenador/${id}`);
      if (res.data.permissao === 'Recusar') router.push('/login/coordenacao/login');
    } catch (err) {
      console.log(err);
      router.push('/login/coordenacao/login');
    }
  };

  const saverReceptor = async () => {
    const res = await axios.get('http://localhost:5000/enviado');
    const search = res.data.filter(
      data => (data.nome === sender && data.receptor === receiver) ||
              (data.receptor === sender && data.nome === receiver)
    );
    if (search.length === 0) {
      await axios.post('http://localhost:5000/enviado', {
        nome: sender,
        receptor: receiver,
        tipoSender: tipo2,
        tipoReceiver: tipo
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Coordenador | Chat</title>
        <link rel="icon" type="image/png" href="../public/images/chat.png"/>
      </Head>

      <NavBarAluno />
      <div className={styleGeral.container}>
        <SideBarAluno />
        <div className={styleChat.content}>
          <div className={"col-md-8 col-xl-6 " + styleChat.chat_mensagens}>
            <div className={styleChat.card + " card " + styleChat.chat_card}>
              <div className={"card-header mb-2 " + styleChat.msg_head}>
                <div className="d-flex bd-highlight">
                  <div className={styleChat.img_cont}>
                    <Image className={"rounded-circle " + styleChat.user_img} src={i1} alt="user"/>
                    <span className={styleChat.online_icon}></span>
                  </div>
                  <div className={styleChat.user_info}>
                    <span>{receiver}</span>
                    <p>{tipo}</p>
                    <p>Envie a sua mensagem</p>
                  </div>
                </div>
              </div>

              <div className={"card-body " + styleChat.msgcard_body}>
                {messages.map((msg, idx) => (
                  msg.sender !== sender ? 
                  <div key={idx} className="d-flex justify-content-start mb-5 mt-3">
                    <div className={styleChat.img_cont_msg}>
                      <Image className={"rounded-circle " + styleChat.user_img_msg} src={image} alt="user"/>
                    </div>
                    <div className={styleChat.msg_cotainer + " " + styleChat.msg} style={{float:'right'}}>
                      <span className={styleChat.username}>{msg.sender}</span>
                      {msg.message}
                      <span className={styleChat.msg_time}>{msg.time}</span>
                    </div>
                  </div>
                  :
                  <div key={idx} className="d-flex justify-content-end mb-5 mt-3">
                    <div className={styleChat.msg_cotainer_send + " " + styleChat.msg}>
                      <span className={styleChat.usernameI}>{msg.sender}</span>
                      {msg.message}
                      <span className={styleChat.msg_time_send}>{msg.time}</span>
                    </div>
                    <div className={styleChat.img_cont_msg}>
                      <Image className={"rounded-circle " + styleChat.user_img_msg} src={image} alt="user"/>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styleChat.card_footer}>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className={"input-group-text " + styleChat.attach_btn}><i className="bi-paperclip"></i></span>
                  </div>
                  <textarea
                    className={"form-control " + styleChat.type_msg}
                    placeholder="Escreva a sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <div className="input-group-append" onClick={() => { saverReceptor(); handleSendMessage(); }}>
                    <span className={"input-group-text " + styleChat.send_btn}><i className={"bi-send-fill " + styleChat.i}></i></span>
                  </div>
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
