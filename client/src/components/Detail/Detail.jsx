import style from './Detail.module.css'
import axios from 'axios'
import bedroomsIcon from '../../img/bedroom.png'
import bathroomsIcon from '../../img/bathroom.png'
import sizeIcon from '../../img/size.png'
import kitchenIcon from '../../img/kitchen.png'
import garageIcon from '../../img/garage.png'
import venta from '../../img/Venta.png'
import alquiler from '../../img/Alquiler.png'
import pesos from '../../img/pesosGris.png'
import dolares from '../../img/dolaresGris.png'
import check from '../../img/check.png'
import whatsapp from '../../img/whatsapp.png'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Detail = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const [propertyData, setPropertyData] = useState({})
    const [imageIndex, setImageIndex] = useState(0)
    const [showGallery, setShowGallery] = useState(false)

    useEffect(() => {
        const getProperty = async () => {
            const { data } = await axios(`${SERVER_URL}/properties/detail/${id}`)
            setPropertyData(data)
        }
        getProperty()
    }, [])

    const next = () => {
        if (imageIndex < (propertyData.images.length - 1)) {
            setImageIndex(imageIndex + 1)
        }
    }

    const previous = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1)
        }
    }

    const galleryHandler = () => {
        setShowGallery(true)
    }

    const closeGallery = () => {
        setShowGallery(false)
    }

    console.log(propertyData)

    return (
        propertyData.images ?
            <div className={style.detail}>
                {showGallery &&
                    <div className={style.gallery}>
                        <div className={style.galleryLeft} onClick={previous}> 〈 </div>
                        <div className={style.galleryRight} onClick={next}> 〉 </div>
                        <h1 onClick={closeGallery}>X</h1>
                        <img className={style.galleryPhoto} src={propertyData.images[imageIndex].url} alt="" />
                    </div>
                }
                <div className={style.basicInfo}>
                    <div className={style.photos}>
                        <div className={style.left} onClick={previous}> 〈 </div>
                        <div className={style.right} onClick={next}> 〉 </div>
                        {propertyData.category === 'Venta' && <img className={style.categoryImg} src={venta} alt="" />}
                        {propertyData.category === 'Alquiler' && <img className={style.categoryImg} src={alquiler} alt="" />}
                        <img onClick={galleryHandler} className={style.photo} src={propertyData.images[imageIndex].url} alt="" />
                    </div>
                    <div className={style.info}>
                        <div className={style.name}>
                            <h2>{propertyData.name}</h2>
                        </div>
                        <hr />
                        <div className={style.location}>
                            <h2>{propertyData.location}</h2>
                        </div>
                        <hr />
                        <div className={style.infoContainer}>
                            <div className={style.infoLogo}>
                                <h4>{propertyData.size}</h4>
                                <img src={sizeIcon} alt="" />
                            </div>
                            <div className={style.infoLogo}>
                                <h4>{propertyData.bedrooms}</h4>
                                <img src={bedroomsIcon} alt="" />
                            </div>
                            <div className={style.infoLogo}>
                                <h4>{propertyData.bathrooms}</h4>
                                <img src={bathroomsIcon} alt="" />
                            </div>
                            <div className={style.infoLogo}>
                                <h4>{propertyData.kitchen}</h4>
                                <img src={kitchenIcon} alt="" />
                            </div>
                            <div className={style.infoLogo}>
                                <h4>{propertyData.garage}</h4>
                                <img src={garageIcon} alt="" />
                            </div>
                        </div>
                        <hr />
                        <div className={style.otherInfoContainer}>
                            {propertyData.currency === '$' && <img src={pesos} alt="" />}
                            {propertyData.currency === 'US$' && <img src={dolares} alt="" />}
                            <h4>{propertyData.price}</h4>
                            <a className={style.whatsappLogo} href={`https://api.whatsapp.com/send?phone=5492664570187&text=Hola,%20me%20interesa%20saber%20mas%20sobre%20esta%20propiedad:%20${location.pathname}`}target="_blank" rel="noopener noreferrer">
                                <img src={whatsapp} alt="" />
                            </a>
                        </div>
                        <div className={style.adittionalInfo}>
                            <p>{propertyData.description}</p>
                        </div>
                    </div>
                </div>
                <div className={style.line}></div>
                <div className={style.otherInfo}>
                    <div className={style.others}>
                        {propertyData.others.map(item => {
                            return (<div className={style.listItem}>
                                <img src={check} alt="" />
                                <h5>{item}</h5>
                            </div>)
                        })}
                    </div>
                    <div className={style.amenities}>
                        {propertyData.amenities.map(item => {
                            return (<div className={style.listItem}>
                                <img src={check} alt="" />
                                <h5>{item}</h5>
                            </div>)
                        })}
                    </div>
                    <div className={style.services}>
                        {propertyData.services.map(item => {
                            return (<div className={style.listItem}>
                                <img src={check} alt="" />
                                <h5>{item}</h5>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
            :
            <div>
                <p>Cargando...</p>
            </div>
    )
}

export default Detail