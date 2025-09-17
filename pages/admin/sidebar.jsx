import Image from "next/image";
import init from '../../public/images/images-system/home.png';
import set from '../../public/images/images-system/settings.png';
import exit from '../../public/images/images-system/exit.png';
import styleSide from '../css/sideBar.module.css';
import styleGeral from '../css/logado.module.css';
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

function SideBarAdmin() {
  const router = useRouter();
  const currentRoute = router.pathname;

  const isActive = (route) => route === currentRoute;

  return (
    <nav className={`${styleSide.side} ${styleGeral.side}`}>
      <ul className={styleSide.ul}>

        {/* Dropdown Dashboard */}
        <li className={`${styleSide.li} dropdown`}>
          <a
            href="#"
            className={`${styleSide.a} dropdown-toggle`}
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              fontWeight: isActive("/admin/adminInicio") ? 700 : "normal",
              background: isActive("/admin/adminInicio") ? "#1478b1" : "",
            }}
          >
            <Image className={styleSide.i} src={init} alt="DashBoard" />
            <span className={`${styleSide.side_item} ${styleSide.span}`}>DashBoard</span>
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {[
              { href: "/admin/component/tAluno", label: "ALUNO" },
              { href: "/admin/component/tDirector", label: "DIRECTOR" },
              { href: "/admin/component/tFuncionario", label: "FUNCIONARIO" },
              { href: "/admin/component/tEncarregado", label: "ENCARREGADO" },
              { href: "/admin/component/tCoordenador", label: "COORDENADOR" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="dropdown-item"
                  style={{
                    fontWeight: isActive(item.href) ? 700 : "normal",
                    background: isActive(item.href) ? "#1478b1" : "",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Definições */}
        <li className={styleSide.li}>
          <Link
            href="/admin/adminSettings"
            className={styleSide.a}
            style={{
              fontWeight: isActive("/admin/adminSettings") ? 700 : "normal",
              background: isActive("/admin/adminSettings") ? "#1478b1" : "",
            }}
          >
            <Image className={styleSide.i} src={set} alt="Definições" />
            <span className={`${styleSide.side_item} ${styleSide.span}`}>Definições</span>
          </Link>
        </li>

        {/* Sair */}
        <li
          onClick={() => {
            localStorage.removeItem("idAdmin");
            localStorage.removeItem("usernameAdmin");
            router.push("/admin/login");
          }}
          className={styleSide.li}
        >
          <a href="#" className={`${styleSide.a} ${styleSide.logout}`}>
            <Image className={styleSide.i} src={exit} alt="Sair" />
            <span className={`${styleSide.side_item} ${styleSide.span}`}>Sair</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SideBarAdmin;
