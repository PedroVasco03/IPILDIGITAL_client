import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

function ModalPermitir({ show, id, closed, route, permissao }) {
  const router = useRouter()
  const [senhaAdmin, setSenhaAdmin] = useState("")
  const [inputSenha, setInputSenha] = useState("")

  const confirm = async () => {
    if (!inputSenha) {
      alert("Digite a senha")
      return
    }
    if (inputSenha === senhaAdmin) {
      await update()
    } else {
      alert("Senha Inválida")
      closed()
    }
  }

  const update = async () => {
    try {
      if (permissao === "Permitir") {
        await axios.patch(`http://localhost:5000/${route}/${id}`, {
          permissao: "Permitir",
        })
        alert("O usuário tem acesso Permitido")
      } else if (permissao === "Recusar") {
        await axios.patch(`http://localhost:5000/${route}/${id}`, {
          permissao: "Recusar",
        })
        alert("O usuário tem acesso Negado")
      }
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const id = localStorage.getItem("idAdmin")
        if (!id) return router.push("/admin/login")
        const res = await axios.get(`http://localhost:5000/admin/${id}`)
        setSenhaAdmin(res.data.senha)
      } catch (err) {
        router.push("/admin/login")
      }
    }
    fetchAdmin()
  }, [router])

  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Segurança</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <input
              type="password"
              className="form-control"
              placeholder="Digite a sua senha"
              value={inputSenha}
              onChange={(e) => setInputSenha(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closed}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={confirm}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalPermitir
