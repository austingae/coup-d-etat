import React from 'react'

const InterestingFacts = () => {
  return (
    <div>InterestingFacts</div>
  )
}

export default InterestingFacts

export async function getStaticProps() {
  let jsonFile = await fetch("https://raw.githubusercontent.com/austingae/coup-d-etat/master/data/interesting-facts-data.json");
  let data = await jsonFile.json();
  let mixedData = data.sort(() => Math.random() - 0.5);
  console.log(mixedData);

  return {
    props: {

    }
  }
}

/*
If my understanding of getStaticProps() and getServerSideProps() are correct,
getStaticProps() fetches the data at build time. If the data has been updated, then the website page will not show it. To show the updated data, must rebuild the website. 
getServerSideProps() fetches the data at page request. If the data has been updated, then the website page will show it. 

then 
*/