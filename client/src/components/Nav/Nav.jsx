import style from './Nav.module.css'
import logo from '../../img/logo.png'
import instagram from '../../img/instagram.png'
import facebook from '../../img/facebook.png'
import whatsapp from '../../img/whatsapp.png'
import { NavLink } from 'react-router-dom'

const Nav = () => {

    return (

        <div className={style.nav}>
            <div className={style.logoContainer}>
                <NavLink to='/'><img className={style.logo} src={logo} alt='B&R Inmobiliaria'></img></NavLink>
            </div>
            <div className={style.line}></div>
            <div className={style.buttonContainer}>
                <NavLink to='/properties' className={style.button}>Propiedades</NavLink>
                {/* <NavLink to='/about' className={style.button}>Inversiones</NavLink> */}
                <NavLink to='/tasaciones' className={style.button}>Tasaciones</NavLink>
                <NavLink to='/empresa' className={style.button}>Empresa</NavLink>
            </div>
            <div className={style.line}></div>
            <div className={style.mobileLine}></div>
            <div className={style.socialContainer}>
                <a className={style.social} href={`https://www.instagram.com/byrinmobiliaria/`} target="_blank" rel="noopener noreferrer">
                    <img src={instagram} alt='B&R Inmobiliaria'></img>
                </a>
                <a className={style.social} href={`https://www.facebook.com/ByRdesarrollosinmobiliarios`} target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt='B&R Inmobiliaria'></img>
                </a>
                <a className={style.social} href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola, Necesito asesoramiento sobre una propiedad`} target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp} alt='B&R Inmobiliaria'></img>
                </a>
            </div>
            <a className={style.developer} href={`https://github.com/Mbarca89`} target="_blank" rel="noopener noreferrer">Desarollado por Mauricio Barca</a>
        </div>

    )
}

export default Nav

