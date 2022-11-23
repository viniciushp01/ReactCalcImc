import { useState } from "react";
import styles from "./App.module.css"
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/GridItem/index";
import leftArrowImagem from "./assets/leftarrow.png"

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const[weightField, setWeightField] = useState<number>(0);
  const[toShow, setToShow] = useState<Level | null>(null);
  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert ("Digite um peso e uma altura.")
    }
  }
  // função para o funcionamento da setinha de voltar. Basta zerar todos os dados que o programa volta à tela inicial
  function handleBackButton() {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className = {styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela OMS para calcular o peso ideal de cada pessoa.</p>

          <input type = "number"
          placeholder = "Digite a sua altura. Ex: 1.5 (em metros)"
          value = {heightField > 0 ? heightField : ''}
          onChange = {e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}           
          />
          <input type = "number"
          placeholder = "Digite o seu peso. Ex: 80 (em KG)"
          value = {weightField > 0 ? weightField : ''}
          onChange = {e => setWeightField(parseFloat(e.target.value))} 
          disabled={toShow ? true : false}    
          />
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) => ( // todo filho em uma lista precisa ter uma propriedade "key"
              <GridItem key = {key} item = {item}/>
            ))}
          </div>
          }
            {/*Aqui será a exibição do item único na tela, após pressionar o calcular  */}

          {toShow &&
          <div className={styles.rightBig}>
            {/* Na primeira div tem a SETA para VOLTAR ao grid normal. Logo após é utilizado o GridItem toShow, que irá trazer apenas
            um dos elementos dos grid */}
            <div className={styles.rightArrow} onClick={handleBackButton}>
              <img src={leftArrowImagem} alt="" width={25}/>
            </div>
            <GridItem item={toShow} /> 
          </div>
          }
        </div>
      </div>
    </div>
  );
}
export default App;