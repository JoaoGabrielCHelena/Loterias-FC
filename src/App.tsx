import { useEffect, useState } from "react"
import styles from "./App.module.scss"
import { useLocation, useNavigate } from "react-router-dom"

function Dropdown({
    names,
    selected,
    setSelected,
    apiOptions,
    setDataObj,
}: {
    names: Map<string, string>
    selected: string
    setSelected: (i: string) => void
    apiOptions: string[]
    setDataObj: ({}: any) => void
}) {
    const [expanded, setExpanded] = useState(false)
    const navigate = useNavigate()

    const toggleExpand = () => setExpanded(!expanded)
    let locale = useLocation().pathname.substring(1)

    useEffect(() => {
        if (apiOptions.includes(locale)) {
            setSelected(locale)
        } else {
            setSelected(apiOptions[0])
        }
    }, [locale])

    let changeAddress = (i: string) => {
        setExpanded(false)
        navigate(`/${i}`)
    }

    // useEffect(() => {
    //   const data = async () => {
    //     try {
    //       const response = await fetch(`https://loteriascaixa-api.herokuapp.com/api/${selected}/latest`);
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch data');
    //       }
    //       const result = await response.json();
    //       setDataObj({
    //         dezenas: result.dezenas,
    //         concurso: result.concurso,
    //         data: result.data,
    //       })
    //     } catch (err) {
    //       setDataObj(err.message); // Handle error
    //     }
    //   }
    //
    //   data()
    // }, [selected])

    return (
        <>
            <div className={styles.wrapper}>
                <button className={styles.button} onClick={toggleExpand}>
                    {names.get(selected)}
                    <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        style={{ rotate: expanded ? "180deg" : "0deg" }}
                    >
                        <path
                            d="M5.633 5.733a.887.887 0 0 1-1.266 0L.262 1.555A.916.916 0 0 1 .068.562a.908.908 0 0 1 .33-.408C.545.054.718 0 .895 0h8.21c.177 0 .35.053.497.154.147.1.262.242.33.408a.926.926 0 0 1-.194.993L5.633 5.733Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                <ul
                    className={`${styles.list} ${expanded ? styles.listShow : ""}`}
                >
                    {apiOptions.map((i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => changeAddress(i)}
                                role="option"
                            >
                                <button>{names.get(i)}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

function Results({ resultsArray }: { resultsArray: string[] }) {
    let map = resultsArray.map((i: string) => {
        return (
            <div key={i} className={styles.resultsItem}>
                {i}
            </div>
        )
    })
    return <div className={styles.results}>{map}</div>
}

function App() {
    const optionsName = new Map([
        ["megasena", "Mega-sena"],
        ["quina", "Quina"],
        ["lotofacil", "Lotofácil"],
        ["lotomania", "Lotomania"],
        ["timemania", "Timemania"],
        ["diadesorte", "Dia de sorte"],
    ])
    const optionsColor = new Map([
        ["megasena", "#6BEFA3"],
        ["quina", "#8666EF"],
        ["lotofacil", "#DD7AC6"],
        ["lotomania", "#FFAB64"],
        ["timemania", "#5AAD7D"],
        ["diadesorte", "#BFAF83"],
    ])
    const apiOptions = Array.from(optionsName.keys())

    const [selected, setSelected] = useState(apiOptions[0])

    const [dataObj, setDataObj] = useState({
        dezenas: ["10", "31", "40", "52", "54", "56"],
        concurso: 2845,
        data: "27/03/2025",
    })

    return (
        <>
            <div className={styles.contentWrapper}>
                <div className={styles.selectionWrapper}>
                    <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 613 1080"
                        className={`${styles.coloredBg} ${styles.coloredBgDesktop}`}
                        style={{ "--color": optionsColor.get(selected) }}
                    >
                        <path
                            d="M613 0s-251.74 501.011 0 1080H0V0h613Z"
                            fill="currentColor"
                        />
                    </svg>

                    <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 524 465"
                        className={`${styles.coloredBg} ${styles.coloredBgMobile}`}
                        style={{ "--color": optionsColor.get(selected) }}
                    >
                        <path
                            d="M871.477 569.828s-565.25-288.219-1218.477 0V-132H871.477v701.828Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div className={styles.selectionForeground}>
                        <Dropdown
                            names={optionsName}
                            apiOptions={apiOptions}
                            setSelected={setSelected}
                            selected={selected}
                            setDataObj={setDataObj}
                        />
                        <div className={styles.selectionName}>
                            <svg height={56} width={60}>
                                <use xlinkHref="/logo.svg#icon"></use>
                            </svg>
                            {optionsName.get(selected)}
                        </div>
                        <div className={styles.selectionFooterMobile}>
                            <p>
                                concurso n° {dataObj.concurso}
                            </p>
                        </div>
                        <div className={styles.selectionFooterDesktop}>
                            <p>
                                <span>concursos</span>
                                {dataObj.concurso} - {dataObj.data}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.resultsWrapper}>
                    <Results resultsArray={dataObj.dezenas} />
                </div>
            </div>
        </>
    )
}

export default App
