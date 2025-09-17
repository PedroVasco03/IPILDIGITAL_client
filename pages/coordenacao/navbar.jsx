import logo from '../../public/images/logotipo.png';
import styleNav from '../css/navLogado.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import setIcon from '../../public/images/images-system/settingsB.png';
import exitIcon from '../../public/images/images-system/exitB.png';
import chatIcon from '../../public/images/images-system/chatB.png';
import coordIcon from '../../public/images/images-system/coordenatorB.png';
import userImg from '../../public/images/profile_user.png';
import { useRouter } from 'next/router';

function NavBarCoordenacao() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const user = localStorage.getItem('usernameCoordenador');
      if (!user) router.push('/coordenacao/login');
      else setUsername(user);
    } catch (error) {
      console.log(error);
      router.push('/coordenacao/login');
    }
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const logout = () => {
    localStorage.removeItem('idcoordenador');
    localStorage.removeItem('usernameCoordenador');
    router.push('/login/coordenacao/login');
  };

  return (
    <nav className={styleNav.nav}>
      <a href="/coordenacao/inicio" className={`${styleNav.a} ${styleNav.logo}`}>
        <Image src={logo} alt="logo" className={styleNav.i} />
        <span className={`${styleNav.nav_item} ${styleNav.span}`}>
          IPIL<span className={styleNav.digital}> DIGITAL</span>
        </span>
      </a>

      <div className="contImage">
        <Image src={userImg} alt="user" className="user-pic" onClick={toggleMenu} />
      </div>

      {menuOpen && (
        <div className="sub-menu-wrap open-menu">
          <div className="sub-menu">
            <div className="user-info">
              <Image src={userImg} alt="user" className="img" />
              <h2>{username}</h2>
            </div>
            <hr />
            <a href="/coordenacao/chat" className="sub-menu-link">
              <Image src={chatIcon} alt="chat" className="img" />
              <p>Chat</p>
              <i className="bi bi-arrow-right-short"></i>
            </a>
            <a href="/coordenacao/team" className="sub-menu-link">
              <Image src={coordIcon} alt="coord" className="img" />
              <p>Coordenação</p>
              <i className="bi bi-arrow-right-short"></i>
            </a>
            <a href="/coordenacao/definicoes" className="sub-menu-link">
              <Image src={setIcon} alt="settings" className="img" />
              <p>Definições</p>
              <i className="bi bi-arrow-right-short"></i>
            </a>
            <button
              className="sub-menu-link btn"
              onClick={logout}
              style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
            >
              <Image src={exitIcon} alt="exit" className="img" />
              <p>Sair</p>
              <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBarCoordenacao;
