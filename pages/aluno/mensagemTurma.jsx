import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Image from "next/image";
import Head from "next/head";
import i1 from "../../public/images/logotipo.png";
import image from '../../public/images/profile_user.png';
import styleGeral from '../css/logado.module.css';
import styleChat from '../css/chat.module.css';
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import axios from 'axios';
import { useRouter } from 'next/router';

const socket = io('http://localhost:5000');

function Chat() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [datas, setDatas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setSender(localStorage.getItem('usernameAluno'));

    const intervalReceiver = setInterval(() => {
      setReceiver(localStorage.getItem('receptorTurma'));
    }, 100);

    const intervalAluno = setInterval(() => {
      getAlunoData();
    }, 1000);

    return () => {
      clearInterval(intervalReceiver);
      clearInterval(intervalAluno);
    };
  }, []);

  useEffect(() => {
    handleGetMessages();
    socket.on('newMessage', ({ sender, receiver, message, time }) => {
      setMessages(prev => [...prev, { sender, receiver, message, time }]);
    });
    return () => socket.off('newMessage');
  }, [messages]);

  const getAlunoData = async () => {
    try {
      const data = localStorage.getItem('idaluno');
      if (!data) return router.push('/login/aluno/LoginAluno');

      const res = await axios.get(`http://localhost:5000/aluno/${data}`);
      setDatas(res.data);
      if (res.data.permissao === 'Recusar') router.push('/login/aluno/LoginAluno');
    } catch (err) {
      console.log(err);
      router.push('/login/aluno/LoginAluno');
    }
  };

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP","OCT", "NOV", "DEC"];
  const handleSendMessage = () => {
    if (!message) return alert('Mensagem não pode ser vazia!');
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${monthNames[date.getMonth()]}/${date.getFullYear()}`;
    socket.emit('newMessage', { sender, receiver, message, time });
    setMessage('');
  };

  const handleGetMessages = async () => {
    const res = await axios.get('http://localhost:5000/mensagem');
    const filtered = res.data.filter(data => data.receiver === receiver);
    setMessages(filtered);
  };

  return (
    <div>
      <Head>
        <title>ALUNO | Chat</title>
        <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
      </Head>
      <NavBarAluno />
      <div className={styleGeral.container}>
        <SideBarAluno />
        <div className={styleChat.content}>
          <div className={`col-md-8 col-xl-6 ${styleChat.chat_mensagens}`}>
            <div className={`card ${styleChat.chat_card}`}>
              <div className={`card-header mb-2 ${styleChat.msg_head}`}>
                <div className="d-flex bd-highlight">
                  <div className={styleChat.img_cont}>
                    <Image className={`rounded-circle ${styleChat.user_img}`} src={i1} alt="logo" />
                    <span className={styleChat.online_icon}></span>
                  </div>
                  <div className={styleChat.user_info}>
                    <span>{receiver}</span>
                    <p>Envie a sua mensagem</p>
                  </div>
                </div>
              </div>

              <div className={`card-body ${styleChat.msgcard_body}`}>
                {messages.map((msg, idx) =>
                  msg.sender !== sender ? (
                    <div key={idx} className="d-flex justify-content-start mb-5 mt-3">
                      <div className={styleChat.img_cont_msg}>
                        <Image className={`rounded-circle ${styleChat.user_img_msg}`} src={image} alt="user"/>
                      </div>
                      <div className={`${styleChat.msg_cotainer} ${styleChat.msg}`}>
                        <span className={styleChat.username}>{msg.sender}</span>
                        {msg.message}
                        <span className={styleChat.msg_time}>{msg.time}</span>
                      </div>
                    </div>
                  ) : (
                    <div key={idx} className="d-flex justify-content-end mb-5 mt-3">
                      <div className={`${styleChat.msg_cotainer_send} ${styleChat.msg}`}>
                        <span className={styleChat.usernameI}>{msg.sender}</span>
                        {msg.message}
                        <span className={styleChat.msg_time_send}>{msg.time}</span>
                      </div>
                      <div className={styleChat.img_cont_msg}>
                        <Image className={`rounded-circle ${styleChat.user_img_msg}`} src={image} alt="user"/>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className={styleChat.card_footer}>
                <div className="input-group">
                  <span className={`input-group-text ${styleChat.attach_btn}`}><i className="bi-paperclip"></i></span>
                  <textarea
                    className={`form-control ${styleChat.type_msg}`}
                    placeholder="Escreva a sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <span
                    className={`input-group-text ${styleChat.send_btn}`}
                    onClick={() => { handleGetMessages(); handleSendMessage(); }}
                  >
                    <i className={`bi-send-fill ${styleChat.i}`}></i>
                  </span>
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
