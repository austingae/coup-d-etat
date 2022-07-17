import React from 'react'

const InterestingFacts = ({mixedData}) => {
  console.log(mixedData);
  return (
    <div>
      {
        mixedData.map((datum) => {
          return (
            <div key={datum.question}>
              <p>{datum.question}</p>
              <p>{datum.answer}</p>
            </div>
          )
        })
      }
    </div>
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
If I use getServerSideProps(), then whenever I do a page request, the data will mix up. 
*/