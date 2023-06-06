import style from './Admin.module.css'
import { useState } from 'react'
import Uploader from '../Uploader/Uploader'
import List from '../List/List'
const logo = require('../../img/logo.png')
const ADMIN_USER = process.env.REACT_APP_ADMIN_USER
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD

const Admin = () => {

    const [logged, setLogged] = useState(false)
    const [currentPage, setCurrentPage] = useState('home')
    const [loginData, setLoginData] = useState({
        user: '',
        password: ''
    })
    const [loginError,setLoginError] = useState('')

    const changeHandler = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
        setLoginError('')
    }

    const loginHandler = (event) => {
        if (loginData.user === ADMIN_USER && loginData.password === ADMIN_PASSWORD) {
            setLogged(true)
        } else setLoginError('Usuario o contraseña incorrecta')
        if (event.target.name === 'logout') {
            setLogged(false)
            setLoginData({
                user: '',
                password: ''
            })
        }
    }

    const navigate = (event) => {
        setCurrentPage(event.target.name)
    }

    return (!logged ?
        <div className={style.admin}>
            <h1>Admin Login</h1>
            <div className={style.adminLogin}>
                <input type="text" name='user' placeholder='Usuario' value={loginData.user} onChange={changeHandler} />
                <input type="password" name="password" placeholder='Contraseña' value={loginData.password} onChange={changeHandler} />
                <button onClick={loginHandler}>Entrar</button>
                {loginError && <h1>{loginError}</h1>}
            </div>
        </div>
        :
        <div className={style.controlPanel}>
            <div className={style.nav}>
                <img src={logo} alt="" name='home' onClick={navigate}/>
                <div className={style.buttonContainer}>
                    <button name='uploader' onClick={navigate}>Cargar Propiedad</button>
                    <button name='list' onClick={navigate}>Ver Propiedades</button>
                    <button name='logout' onClick={loginHandler}>Salir</button>
                </div>
            </div>
            {currentPage === 'home' && <div><h1>Panel de administrador</h1><img src={logo} alt="" /></div>}
            {currentPage === 'uploader' && <Uploader />}
            {currentPage === 'list' && <List />}
        </div>
    )
}

export default Admin