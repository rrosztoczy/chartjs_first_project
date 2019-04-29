document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

(async () => {
    const parsedData = await d3.csv("crime.csv")
    const offenseType = await parsedData.map((crime) => crime.OFFENSE_TYPE_ID)
    const neighborhood = await parsedData.map((crime) => crime.NEIGHBORHOOD_ID)
    const isCrime = await parsedData.map((crime) => crime.CRIME_COUNT)
    const neighborhoodIds = await parsedData.map(crime => crime.NEIGHBORHOOD_ID)
    const crimeTypes = await parsedData.map(crime => crime.OFFENSE_TYPE_ID)
    const xAxisNeighborhood = await [...new Set(neighborhoodIds)]
    const yAxisCrimeType = await [...new Set(crimeTypes)]
    console.dir(yAxisCrimeType)
    console.dir(xAxisNeighborhood)
    //TODO: need to replace x, y and r labels with x y and r
    const formattedData = await parsedData.map(dataObj => ({"label": "none", "data": [{...dataObj}], "backgroundColor": "#ff6384", 
    "hoverBackgroundColor": "#ff6384"}))
    const myChart = await new Chart(ctx, {
        type: 'bubble',
        data: {
            xLabels: xAxisNeighborhood,
            yLabels: yAxisCrimeType,
            datasets: formattedData
            },
        options: {
            title: {
                display: true,
                text: 'Denver Downtown Crime 2018'
            }, scales: {
                yAxes: [{ 
                scaleLabel: {
                    display: true,
                    labelString: "Neighborhood"
                }
                }],
                xAxes: [{ 
                scaleLabel: {
                    display: true,
                    labelString: "Crime Type"
                }
                }]
            }
        }
    })

    // options: {
    //     title: {
    //       display: true,
    //       text: 'Predicted world population (millions) in 2050'
    //     }, scales: {
    //       yAxes: [{ 
    //         scaleLabel: {
    //           display: true,
    //           labelString: "Happiness"
    //         }
    //       }],
    //       xAxes: [{ 
    //         scaleLabel: {
    //           display: true,
    //           labelString: "GDP (PPP)"
    //         }
    //       }]
    //     }
    
    console.log("I did it!", myChart)
    console.table("parsedData", parsedData[0])
    console.table("dataarray", formattedData)
})()
})

// {
//     label: 'Paul',
//       data: [
//         {
//           x: 6,
//           y: 2,
//           r: 10
//         }
//       ],
//       backgroundColor:"#ff6384",
//       hoverBackgroundColor: "#ff6384"
//   }



