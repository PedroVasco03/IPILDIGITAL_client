import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Image from "next/image"
import { Button } from "reactstrap"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import styleChat from '../css/chat.module.css'
import NavBarAluno from "./navbar"
import SideBarAluno from "./sidebar"
import axios from 'axios';
import { useRouter } from 'next/router';
import image from '../../public/images/profile_user.png'
import i1 from "../../public/images/logotipo.png"
const socket = io('http://localhost:5000');
function Chat(){
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [alldata, setAllData] = useState([])
  const [datas, setDatas] = useState([])
  const [tipo, setTipo] = useState('')
  const [tipo2, setTipo2] = useState('')
  const router = useRouter()
  useEffect(()=>{
    const type = localStorage.getItem('tipo')
    setTipo(type)
    const type2 = localStorage.getItem('tipo2')
    setTipo2(type2)
    setSender(localStorage.getItem('usernameAluno'))
    setInterval(()=>{
      setReceiver(localStorage.getItem('receptor'))
    },100)

    setInterval(()=>{
      getAlunoData()
    }, 1000)
  },[])
  useEffect(() => {
    
    handleGetMessages()
    // Evento para receber novas mensagens
    socket.on('newMessage', ({ sender, receiver, message, time }) => {
      setMessages((prevMessages) => [...prevMessages, { sender, receiver, message, time }]);
    });
    
    return () => {
      // Remover o evento quando o componente é desmontado
      socket.off('newMessage');
    };
    
  }, [messages]);
  const saverReceptor = async()=>{
    console.log(receiver)
    await axios.get('http://localhost:5000/enviado').then((res)=>{
      const search = res.data.filter((data)=>data.nome === sender && data.receptor === receiver || data.receptor === sender && data.nome === receiver)
      if(search.length == 0){
        axios.post('http://localhost:5000/enviado', {
            nome: sender,
            receptor: receiver,
            tipoSender: tipo2,
            tipoReceiver: tipo
          })
      }
      else{
        console.log('já armazenado!')
      }
       
    })
     
  }
  
  const getAlunoData = async ()=>{
    try{
        const data = localStorage.getItem('idaluno')
        await axios.get(`http://localhost:5000/aluno/${data}`)
        .then((res)=>{
            setDatas(res.data)
            if(res.data.permissao === 'Recusar')
                    router.push('/login/aluno/LoginAluno')
        }).catch((err)=>{
            console.log(err)
            router.push('/login/aluno/LoginAluno')
        })
        if(data == null)
            router.push('/login/aluno/LoginAluno')
          
    }catch(err){
        console.log(err)
    }
}
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP","OCT", "NOV", "DEC"];
const handleSendMessage = () => {
  const date = new Date()
  if(message!=''){
    const time = date.getHours()+":"+date.getMinutes()+"  "+date.getDate()+"/"+monthNames[date.getMonth()]+"/"+date.getFullYear()
    socket.emit('newMessage', { sender, receiver, message, time});
    setMessage('');
  }else
      alert('Mensagem não pode ser vazia!')
};

  const handleGetMessages = async() => {
   const response =  await axios.get('http://localhost:5000/mensagem')
     .then((res)=>{
      const search = res.data.filter((data)=> data.sender === sender && data.receiver === receiver || data.sender === receiver && data.receiver ===sender)
       return search  
     })
     setMessages(response)

  }; 

  useEffect(() => {
    // Evento para receber as mensagens do servidor
    socket.on('messages', (messages) => {
      setMessages(messages);
    });

    return () => {
      // Remover o evento quando o componente é desmontado
      socket.off('messages');
    };
  }, []);
  
    return (
      <div>
      <Head>
          <title>ALUNO | Chat</title>
          <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
      </Head>
      <NavBarAluno></NavBarAluno>
      <div className={styleGeral.container}>
          <SideBarAluno/>
          <div className={styleChat.content}>
              <div className={"col-md-8 col-xl-6 "+styleChat.chat_mensagens}>
                  <div className={styleChat.card+" card "+styleChat.chat_card}>
                      <div className={"card-header mb-2 "+styleChat.msg_head}>
                          <div className={"d-flex bd-highlight"}>
                              <div className={styleChat.img_cont}>
                                  <Image className={"rounded-circle "+styleChat.user_img} src={i1}/>
                                  <span className={styleChat.online_icon}></span>
                              </div>
                              <div className={styleChat.user_info}>
                                  <span>{receiver}</span>
                                  <p>{tipo}</p>
                                  <p>Envie a sua mensagem</p>
                              </div>
                          </div>
                      </div>
                      <div className={"card-body "+styleChat.msgcard_body}>
                          {messages.map((message)=>{
                            return message.sender != sender ? <div className="d-flex justify-content-start mb-5 mt-3">
                            <div className={styleChat.img_cont_msg}>
                                <Image className={"rounded-circle "+styleChat.user_img_msg} src={image}/>
                            </div>
                            <div className={styleChat.msg_cotainer +" "+styleChat.msg}>
                              <span className={styleChat.username}>{message.sender}</span>
                                {message.message}
                                <span className={styleChat.msg_time}>{message.time}</span>
                            </div>
                        </div> :<div className="d-flex justify-content-end mb-5 mt-3">
                                    <div className={styleChat.msg_cotainer_send +" "+styleChat.msg}>
                                    <span className={styleChat.usernameI}>{message.sender}</span>
                                        {message.message}
                                        <span className={styleChat.msg_time_send}>{message.time}</span>
                                    </div>
                                    <div className={styleChat.img_cont_msg}>
                                        <Image className={"rounded-circle "+styleChat.user_img_msg} src={image}/>
                                    </div>
                                </div>
                          })}
                          
                      </div>
                      <div className={styleChat.card_footer}>
                          <div className="input-group">
                              <div className="input-group-append">
                                  <span className={"input-group-text "+styleChat.attach_btn}> <i className="bi-paperclip"></i></span>
                              </div>
                              <textarea className={"form-control "+styleChat.type_msg} placeholder="Escreva a sua mensagem..." value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                              <div className="input-group-append" onClick={()=>{
                                  saverReceptor()
                                  handleGetMessages()
                                  handleSendMessage()
                                }}>
                                  <span className={"input-group-text "+styleChat.send_btn}> <i className={styleChat.i+" bi-send-fill"}></i></span>
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
export default Chat