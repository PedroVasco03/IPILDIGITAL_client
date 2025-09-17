import style from './css/navbar.module.css';
import logo from '../public/images/logotipo.png';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

function NavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${style.navbarCustom}`}>
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image src={logo} alt="logotipo" width={50} />
          <span id={style.logo} className="ms-2">IPIL<b>DIGITAL</b></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${currentRoute === "/" ? "text-primary" : ""}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a href="#what" className="nav-link">IPILDIGITAL</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link">Serviços</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">Sobre</a>
            </li>
            <li className="nav-item">
              <Link href="/components/Main" className="nav-link">Entrar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
