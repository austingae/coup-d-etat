import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef } from 'react';
import styles from '../styles/home/home.module.css'


import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

import { Bar, Doughnut, getElementsAtEvent } from 'react-chartjs-2'

export default function Home({coupYearFrequencyArray, coupIncidentsArray, coupSuccessRateArray, eachCountryNumberOfCoupArray, date}) {
  const years = [];
  coupYearFrequencyArray.forEach((coupYear) => {
    years.push(coupYear.year);
  })

  const numberOfCoups = [];
  coupYearFrequencyArray.forEach((coupYear) => {
    numberOfCoups.push(coupYear.frequency);
  });

  const data = {
    labels: years,
    datasets: [{
      label: "Number of Coups",
      data: numberOfCoups,
      borderColor: function(context) {
        const numberOfCoups = context.parsed.y;
        //Colors From OSHA - https://www.creativesafetysupply.com/articles/safety-colors/
        if (numberOfCoups == 1) {
          return 'rgba(67,143,247,1)'
        }
        else if (numberOfCoups > 1 && numberOfCoups < 5) {
          return 'rgba(255, 205, 86, 1)'
        }
        else if (numberOfCoups >= 5 && numberOfCoups<= 8) {
          return 'rgba(255, 159, 64, 1)'
        }
        else if (numberOfCoups > 8) {
          return 'rgba(255, 99, 132, 1)'
        }
      },
      borderWidth: 1,
      backgroundColor: function(context) {
        const numberOfCoups = context.parsed.y;
        //Colors From OSHA - https://www.creativesafetysupply.com/articles/safety-colors/
        if (numberOfCoups == 1) {
          return 'rgba(67,143,247,0.4)'
        }
        else if (numberOfCoups > 1 && numberOfCoups < 5) {
          return 'rgba(255, 205, 86, 0.4)'
        }
        else if (numberOfCoups >= 5 && numberOfCoups<= 8) {
          return 'rgba(255, 159, 64, 0.4)'
        }
        else if (numberOfCoups > 8) {
          return 'rgba(255, 99, 132, 0.4)'
        }
      },
    },
    ]};

    const options = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'rgb(232,232,232)',
          }
        },
        y: {
          ticks: {
            color: 'rgb(232,232,232)',
          }
        },
      },
      plugins: {
        legend: {
          display: false,
        }
      }
    }


  const [clickedCoupYear, setClickedCoupYear] = useState(null);
  const chartRef = useRef(null);
  const onClick = (event) => {
    const index = getElementsAtEvent(chartRef.current, event)[0].index; //this gives the index. first bar's index = 0. second bar's index = 1

    const coupYearsArray = chartRef.current.data.labels;

    let coupYear = coupYearsArray[index];

    setClickedCoupYear(coupYear);
  }



  const coupSuccessRateData = {
    labels: ['Number of Successful Coups', 'Number of Failed Coups'],
    datasets: [
      {
        data: [coupSuccessRateArray[0].numberOfSuccessfulCoups, coupSuccessRateArray[1].numberOfFailedCoups],
        backgroundColor: [
          'rgba(74,143,226,0.4)',
          'rgba(207,32,27,0.4)',
        ],
        borderColor: [
          'rgb(74,143,226)',
          'rgb(207,32,27)',
        ]
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(2,11,1)',
        }
      }
    }
  }


  const countries = [];
  eachCountryNumberOfCoupArray.forEach((country) => {
    countries.push(country.country);
  })

  const eachCountryNumberOfCoups = [];
  eachCountryNumberOfCoupArray.forEach((country) => {
    eachCountryNumberOfCoups.push(country.numberOfCoups);
  })

  const eachCountryNumberOfCoupsData = {
    labels: countries,
    datasets: [
      {
        label: 'Number of Coups',
        data: eachCountryNumberOfCoups,
        backgroundColor: function(context) {
          if (context.raw == 1) {
            return 'rgba(67,143,247,0.4)'
          }
          else if (context.raw > 1 && context.raw < 5) {
            return 'rgba(255, 205, 86, 0.4)'
          }
          else if (context.raw >= 5 && context.raw <= 8) {
            return 'rgba(255, 159, 64, 0.4)'
          }
          else if (context.raw > 8) {
            return 'rgba(255, 99, 132, 0.4)'
          }
        },
        borderColor: function(context) {
          if (context.raw == 1) {
            return 'rgba(67,143,247,1)'
          }
          else if (context.raw > 1 && context.raw < 5) {
            return 'rgba(255, 205, 86, 1)'
          }
          else if (context.raw >= 5 && context.raw <= 8) {
            return 'rgba(255, 159, 64, 1)'
          }
          else if (context.raw > 8) {
            return 'rgba(255, 99, 132, 1)'
          }
        },
        borderWidth: 1,
      }
    ]
  }

  const eachCountryNumberOfCoupsOptions = {
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(232,232,232)',
        }
      },
      y: {
        ticks: {
          color: 'rgb(232,232,232)',
        }
      }
    }
  }

  //DESIGN: https://martinlea.com/sample-author-platform/ 
  return (
    <div className={styles.container}>
      <Head>
        <title>Coup D&apos;Etat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={styles.numCoupContainer}>
          {/*Bar Chart Displaying Number of Coups Each Year Since 1950*/}
          <h2 className={styles.header}>Number of Military Coups Each Year Since 1950</h2>
          <div className={styles.numCoup__barContainer}>
            <Bar 
              data={data} 
              ref={chartRef}
              onClick={onClick}
              options={options}
            />
          </div>
        </section>

        {/*Information of the Coup if a Bar in the Bar Graph is Clicked */}
        <section className={styles.coupInfoContainer}>
          <h2 className={`${styles.header} ${styles.coupInfo__header}`}>In the year of {clickedCoupYear}, there were military coups in the following countries: </h2>
          <div className={styles.coupInfo__list}>
            {
              coupIncidentsArray.map((coupIncidentsEachYear) => {
                if (clickedCoupYear == coupIncidentsEachYear.year) {
                  return (
                    <div key={coupIncidentsEachYear.year}>
                    {
                      (coupIncidentsEachYear.coupIncidents).map((coupIncident) => {
                        return (
                          <div key={coupIncident.date}>
                            <h3 className={styles.coupIncident__title}>{coupIncident.country}</h3>
                            <p className={styles.coupIncident__description}>In the country of {coupIncident.country}, a military coup occurred on {coupIncident.date}. It was {coupIncident.successful == 1 ? 'successful' : 'a failure'}.</p>
                          </div>
                        )
                      })
                    }
                    </div>
                  );
                }
              })
            }
          </div>
        </section>

        <section className={styles.coupSuccessRateContainer}>
          {/*Doughnut Chart Displaying the Number of Successful Coups and the Number of Failed Coups */}
          <h2 className={`${styles.header} ${styles.coupSuccessRate__header}`}>You want to attempt a coup d&apos;etat against your government? Check out your odds of success!</h2>
          <div className={styles.coupSuccessRate__doughnutContainer}>
            <Doughnut data={coupSuccessRateData} options={doughnutOptions}/>
          </div>
        </section>

        <section className={styles.eachCountryNumOfCoupsContainer}>
          <h2 className={`${styles.header} ${styles.eachCountryNumOfCoups__header}`}>Number of Coups Each Country Faced</h2>
          <div className={styles.eachCountryNumOfCoups__barContainer}>
            <Bar data={eachCountryNumberOfCoupsData} options={eachCountryNumberOfCoupsOptions}/>
          </div>
        </section>

        <section className={styles.militaryCoupAndSummaryContainer}>
          {/*Definition of Military Coup */}
          <section className={styles.militaryCoupContainer}>
            <h2 className={styles.largeHeader}>What&apos;s considered as a military coup?</h2>
            <p className={styles.militaryCoup__definition}>&quot;Military coups d&apos;etat are illegal and overt attempts by military officers to unseat sitting executives&quot;, according to the <a href='https://militarycoups.org/' target='_blank' rel='noopener noreferrer' style={{textDecoration: 'underline'}}>Coup Agency and Mechanisms</a> (the creator of the military coup database).</p>
          </section>

          <section className={styles.summaryContainer}>
            <h2 className={styles.largeHeader}>Summary:</h2>
            <div>
              <h2 className={styles.summaryHeader}>Year With The Most Coups:</h2>
              <p className={styles.summaryAnswer}>1966</p>
            </div>

            <div>
              <h2 className={styles.summaryHeader}>Country With The Most Coups:</h2>
              <p className={styles.summaryAnswer}>Bolivia</p>
            </div>

            <div>
              <h2 className={styles.summaryHeader}>Military Coup Success Rate: </h2>
              <p className={styles.summaryAnswer}>48.5%</p>
            </div>
          </section>
        </section>

        <section className={styles.learnMoreContainer}>
          <h2 className={styles.header}>Want to Learn More About Coups?</h2>
          <button className={styles.learnMore__button}>Click Here</button>
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  //First, fetch the JSON file that contains data on the coups.
  let jsonFile = await fetch("https://raw.githubusercontent.com/austingae/coup-d-etat/master/data/data.json");
  let coupData = await jsonFile.json();


  //GOAL: GET THE NUMBER OF COUPS THAT OCCURRED EACH YEAR SINCE 1950 in an array, named coupYearFrequencyArray
  //coupYearArray = an array of the coup years. Display: [1952, 1957, 150, 1956, 1957, 1957, 1957, 1958, 1970, 1986, and so on]
  let coupYearArray = [];
  coupData.forEach((coup) => {
    coupYearArray.push(coup.year);
  });



  //uniqueCoupYearsArray = an array of unique coup years. Display: [1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, and so on]
  let uniqueCoupYearsArray = [...new Set(coupYearArray)]; 
  /*
  There was not a single military coup in the year of 2007; therefore, the JSON dataset does not have the year 2007.
  Hence, I manually added the year 2007 to the uniqueCoupYearsArray. 
  In the future, if a year has 0 coup, then I must come to the code and manually add that year to the uniqueCoupYearsArray.
  */
 
  uniqueCoupYearsArray.push(2007);
  uniqueCoupYearsArray.sort();


  //coupYearFrequencyArray will show the number of coups that occurred each year.
  //Format: {year: 1975, frequency: 14}
  let coupYearFrequencyArray = [];

  //First, coupYearFrequencyArray will have the format of this: {year: 1950, frequency: 0}, {year: 1951, frequency: 0}
  uniqueCoupYearsArray.forEach((uniqueCoupYear) => {
    coupYearFrequencyArray.push(
      {
        year: uniqueCoupYear,
        frequency: 0
      }
    )
  });

  //Then, this piece of code will find out the number of coups that occurred each year. 
  coupYearArray.forEach((coupYear) => {
    coupYearFrequencyArray.forEach((uniqueCoupYear) => {
      if (coupYear == uniqueCoupYear.year) {
        uniqueCoupYear.frequency = uniqueCoupYear.frequency + 1;
      }
    })
  })


  //GOAL: Get the coups' information (country, date, and whether the coup was successful) for each year since 1950 in an array, named coupIncidentsArray
  let coupIncidentsArray = [];

  uniqueCoupYearsArray.forEach((coupYear) => {
    coupIncidentsArray.push(
      {
        year: coupYear,
        coupIncidents: []
      }
    )
  });

  coupIncidentsArray.forEach((coup) => {
    coupData.forEach((coupDatum) => {
      if (coup.year == coupDatum.year) {
        coup.coupIncidents.push({
          country: coupDatum.country,
          date: coupDatum.date,
          successful: coupDatum.successful,
        })
      }
    })
  });

  //If a year has 0 coupIncidents, then just add an empty coupIncident object. The only year so far that had 0 coupIncidents was 2007. 
  coupIncidentsArray.forEach((coup) => {
    if (coup.coupIncidents.length == 0) {
      coup.coupIncidents.push({
        country: "N/A",
        date: "N/A",
        successful: "N/A",
      })
    }
  })

  




  //GOAL: An array -- coupSuccessRateArray -- with two elements: one element holds the number of successful coups, and the other lemenet holds the number of failed coups
  let coupSuccessRateArray = [
    {
      numberOfSuccessfulCoups: 0,
    },
    {
      numberOfFailedCoups: 0,
    }
  ];

  coupData.forEach((coupDatum) => {
    if (coupDatum.successful == 1) {
      coupSuccessRateArray[0].numberOfSuccessfulCoups = coupSuccessRateArray[0].numberOfSuccessfulCoups + 1;
    }
    else if (coupDatum.successful == 0) {
      coupSuccessRateArray[1].numberOfFailedCoups = coupSuccessRateArray[1].numberOfFailedCoups + 1;
    }
  });

  //GOAL: An array -- eachCountryNumberOfCoupArray -- that has each element holding a country and how many total coups occurred in that country.
  let countriesThatExperiencedCoupsWithDuplicatesArray = [];
  coupData.forEach((coupDatum) => {
    countriesThatExperiencedCoupsWithDuplicatesArray.push(coupDatum.country);
  })

  let countriesThatExperiencedCoupsWithoutDuplicatesArray = [...new Set(countriesThatExperiencedCoupsWithDuplicatesArray)];

  let eachCountryNumberOfCoupArray = [];
  countriesThatExperiencedCoupsWithoutDuplicatesArray.forEach((country) => {
    eachCountryNumberOfCoupArray.push(
      {
        country: country,
        numberOfCoups: 0
      }
    )
  });

  countriesThatExperiencedCoupsWithDuplicatesArray.forEach((country) => {
    eachCountryNumberOfCoupArray.forEach((uniqueCountry) => {
      if (country == uniqueCountry.country) {
        uniqueCountry.numberOfCoups = uniqueCountry.numberOfCoups + 1;
      }
    })
  })



//I needed to get the current date, specifically only month and day, to be displayed in the paragraph under the heading of "Coups in 2022"
let currentDate = new Date();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let month = monthNames[currentDate.getMonth()];
let day = currentDate.getDate();

let date = month + " " + day;
  return {
    props: {
      coupYearFrequencyArray: coupYearFrequencyArray,
      coupIncidentsArray: coupIncidentsArray,
      coupSuccessRateArray: coupSuccessRateArray,
      eachCountryNumberOfCoupArray: eachCountryNumberOfCoupArray,
      date: date,
    },
    revalidate: 1,
  }
}

/*
Observation:
Only getStaticProps() and no revalidate -- display stuck at "Last Sync: 16/7/2022 @ 22:15:1"
getStaticProps() with revalidate: 1 -- display updates to current date and time 
*/

  //https://towardsdev.com/chart-js-next-js-beautiful-data-driven-dashboards-how-to-create-them-fast-and-efficiently-a59e313a3153
  //Set() - creates an array of unique elements only - https://www.w3schools.com/js/js_object_sets.asp
  // .sort() - https://www.w3schools.com/jsref/jsref_sort.asp
  //what does '...' mean? - https://www.quora.com/What-does-the-mean-in-Javascript



    //https://www.chartjs.org/docs/latest/getting-started/integration.html
  //https://www.chartjs.org/docs/latest/charts/bar.html