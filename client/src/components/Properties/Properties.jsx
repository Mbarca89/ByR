import style from './Properties.module.css'
import Property from '../Property/Property'
import axios from 'axios'
import banner from '../../img/background.jpg'
import { useEffect, useState } from 'react'
import { useFilter } from '../../hooks/useFilter'
import Pagination from './Pagination';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Properties = () => {

    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const lastCardIndex = currentPage * cardsPerPage
    const firstCardIndex = lastCardIndex - cardsPerPage
    const [showData, setShowData] = useState([])
    const [showType, setShowType] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [showLocation, setShowLocation] = useState(false)
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        location: ''
    })
    const { applyFilter } = useFilter()

    useEffect(() => {
        const getProperties = async () => {
            try {
                const { data } = await axios(`${SERVER_URL}/properties`)
                setData(data)
                setShowData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProperties()
    }, [])

    const showTypeHandler = (event) => {
        if (event.target.name !== 'type') {
            setFilters({
                ...filters,
                type: event.target.name
            })
        }
        setShowType(!showType)
    }

    const resetType = () => {
        setFilters({
            ...filters,
            type: ''
        })
    }

    const showCategoryHandler = (event) => {
        if (event.target.name !== 'category') {
            setFilters({
                ...filters,
                category: event.target.name
            })
        }
        setShowCategory(!showCategory)
    }

    const resetCategory = () => {
        setFilters({
            ...filters,
            category: ''
        })
    }

    const showLocationHandler = (event) => {
        if (event.target.name !== 'location') {
            setFilters({
                ...filters,
                location: event.target.name
            })
        }
        setShowLocation(!showLocation)
    }

    const resetLocation = () => {
        setFilters({
            ...filters,
            location: ''
        })
    }

    useEffect(() => {
        const filterHandler = (event) => {
            const result = applyFilter(data, filters.type, filters.category, filters.location)
            setShowData(result)
        }
        filterHandler()
    }, [filters])

    const nextPage = () => {
        if(!showData[0]) return null
        if (currentPage < Math.ceil(showData.length / cardsPerPage)) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if(!showData[0]) return null
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    const firstPage = () => {
        if(!showData[0]) return null
        setCurrentPage(1)
    }

    const lastPage = () => {
        if(!showData[0]) return null
        setCurrentPage(Math.ceil(showData.length / cardsPerPage))
    }

    console.log(currentPage)

    return (
        <div className={style.properties}>
            <header className={style.bar}>
                <img src={banner} alt="" />
                <div className={style.buttonContainer}>
                    <div className={style.buttonDiv} onClick={showCategoryHandler}>
                        <button name='category'>Tipo de operacion</button>
                    </div>
                    <div className={style.buttonDiv} onClick={showTypeHandler}>
                        <button name='type'>Tipo de propiedad</button>
                    </div>
                    <div className={style.buttonDiv} onClick={showLocationHandler}>
                        <button name='location'>Ubicacion</button>
                    </div>
                </div>
                <div className={style.filterContainer}>
                    <div className={style.category} style={showCategory ? { height: '20vh' } : { height: 0 }}>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Venta'>Venta</button>
                        </div>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Alquiler'>Alquiler</button>
                        </div>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Alquiler temporario'>Alquiler temporario</button>
                        </div>
                        <div className={style.categorySelector}>
                            <button onClick={showCategoryHandler} name='Permuta'>Permuta</button>
                        </div>
                    </div>
                    <div className={style.type} style={showType ? { height: '45vh' } : { height: 0 }}>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Cabaña'>Cabaña</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Campo'>Campo</button>
                        </div>
                        <div className={style.selector}>
                            <button name='Casa' onClick={showTypeHandler}>Casa</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Cochera'>Cochera</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Complejo'>Complejo</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Departamento'>Departamento</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Deposito'>Deposito</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Duplex'>Duplex</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Fondo de comercio'>Fondo de comercio</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Galpon'>Galpon</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Hotel'>Hotel</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Local'>Local</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Lote'>Lote</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Loteo'>Loteo</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Monoambiente'>Monoambiente</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Oficina'>Oficina</button>
                        </div>
                        <div className={style.selector}>
                            <button onClick={showTypeHandler} name='Terreno'>Terreno</button>
                        </div>
                    </div>
                    <div className={style.location} style={showLocation ? { height: '35vh' } : { height: 0 }}>
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='San Luis'>San Luis</button>
                        </div>
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='Juana Koslay'>Juana Koslay</button>
                        </div>
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='Potrero de los Funes'>Potrero de los Funes</button>
                        </div>
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='El Volcan'>El Volcan</button>
                        </div>
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='Estancia Grande'>Estancia Grande</button>
                        </div>
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='El Trapiche'>El Trapiche</button>
                        </div>
                        <div className={style.locationSelector}>
                            <button onClick={showLocationHandler} name='La Florida'>La Florida</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className={style.filterReset}>
                <div className={style.resetContainer}>
                    {filters.category && <button name='reset' onClick={resetCategory}>{`${filters.category} x`}</button>}
                </div>
                <div className={style.resetContainer}>
                    {filters.type && <button name='reset' onClick={resetType}>{`${filters.type} x`}</button>}
                </div>
                <div className={style.resetContainer}>
                    {filters.location && <button name='reset' onClick={resetLocation}>{`${filters.location} x`}</button>}
                </div>
            </div>
            <div className={style.cardsAndPages}>
            <div className={style.propertiesCards}>
                {showData[0] ? showData.slice(firstCardIndex, lastCardIndex).map((property, index) => (
                    <div key={index} className={style.propertyContainer}>
                        <Property
                            id={property.id}
                            name={property.name}
                            location={property.location}
                            price={property.price}
                            currency={property.currency}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            images={property.images}
                            type={property.type}
                            size={property.size}
                            category={property.category}
                        />
                    </div>
                )):<div><h1>No hay resultados</h1></div>}
            </div>
            <div className={style.paginationContainer}>
                <Pagination totalCards={showData.length} currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} firstPage={firstPage} lastPage={lastPage}></Pagination>
            </div>
            </div>
        </div >
    )
}

export default Properties