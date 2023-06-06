import style from './Carousel.module.css'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
const loading = require('../../img/loading.gif')
const SERVER_URL = process.env.REACT_APP_SERVER_URL


const Carousel = () => {
    const [isLoaded, setIsloaded] = useState(false)
    const [currentImg, setCurrentImg] = useState(0)
    const [slides, setSlides] = useState([])
    const timeoutRef = useRef(null)
    const delay = 2500

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    useEffect(() => {
        const getFeatured = async () => {
            try {
                const { data } = await axios(`${SERVER_URL}/properties/featured`)
                setSlides(data.map(item => {
                    return {image:item.images[0].url,id:item.id}
                }))
                setIsloaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        getFeatured()
    }, [])

    const previous = () => {
        if (currentImg !== 0) setCurrentImg(currentImg - 1)
        else setCurrentImg(slides.length-1)
    }

    const next = () => {
        if (currentImg !== slides.length - 1) setCurrentImg(currentImg + 1)
        else setCurrentImg(0)
    }

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(next, delay)
        return () => {
            resetTimeout()
        }
    }, [currentImg])
    
    return (
        isLoaded ? <div className={style.container}>
            {slides[0] && <NavLink className={style.container} to={`/detail/${slides[currentImg].id}`}>
            <img className={style.slide} src={slides[currentImg].image}></img>
            </NavLink>}
            <div className={style.left} onClick={previous}> 〈 </div>
            <div className={style.right} onClick={next}> 〉 </div>
        </div> : <div><img src={loading} alt="" /></div>
    )
}

export default Carousel