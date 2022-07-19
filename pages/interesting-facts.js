import React from 'react'
import { useState } from 'react'

import styles from '../styles/interesting-facts/interesting-facts.module.css'

const InterestingFacts = ({mixedData}) => {
  //The index of the mixedData. If the "Next" button clicked, then this state increases by one. If the "Previous" button clicked, then this state decreases by one. 
  let [qAndANumber, setqAndANumber] = useState(0);

  //If the "Read Answer" button clicked, then isReadAnswerClicked = true. If true, then the question's answer will be displayed on the page.
  let [isReadAnswerClicked, setIsReadAnswerClicked] = useState(false);

  return (
    <>
      <div className={styles.interestingFactContainer}>
        <h2 className={styles.interestinFact__title}>Here are some interesting coup facts:</h2>
        <h3 className={styles.interestingFact__question}>{mixedData[qAndANumber].question}</h3>
        {isReadAnswerClicked ? <h3 className={styles.interestingFact__answer}>{mixedData[qAndANumber].answer}</h3> : <div className={styles.interestingFact__hideAnswerContainer}></div>}

        <div className={styles.interestingFact__buttonsContainer}>
          <button className={styles.interestingFact__button} onClick={() => {
            setIsReadAnswerClicked(true);
          }}>Read Answer</button>

          <button 
            className={styles.interestingFact__button}
            onClick={() => {
              if (qAndANumber != 0) {
                setqAndANumber(qAndANumber - 1);
                setIsReadAnswerClicked(true); //When the previous button is clicked, set isReadAnswerClicked = true because the user already saw the answers to the previous questions, sooo why hide them?
              }
            }}>Previous
          </button>
          <button 
          className={styles.interestingFact__button}
          onClick={() => {
              if (qAndANumber != mixedData.length-1) {
                setqAndANumber(qAndANumber + 1);
                setIsReadAnswerClicked(false); // When the next button is clicked, set isReadAnswerClicked = false or else the next question will already reveal the answer, which is not what the user will want.
              }
            }}>Next
          </button>
        </div>
      </div>
    </>
  )
}

export default InterestingFacts

export async function getServerSideProps() {
  let jsonFile = await fetch("https://raw.githubusercontent.com/austingae/coup-d-etat/master/data/interesting-facts-data.json");
  let data = await jsonFile.json();
  let mixedData = data.sort(() => Math.random() - 0.5);

  return {
    props: {
      mixedData: mixedData,
    }
  }
}

/*
If my understanding of getStaticProps() and getServerSideProps() are correct,
getStaticProps() fetches the data at build time. If the data has been updated, then the website page will not show it. To show the updated data, must rebuild the website. 
getServerSideProps() fetches the data at page request. If the data has been updated, then the website page will show it. 

then...
If I use getStaticProps(), then whenever I do a page request, the data will not mix up. I AM CORRECT!
If I use getServerSideProps(), then whenever I do a page request, the data will mix up. I AM CORRECT!

I AM SMART!!!
*/