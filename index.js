document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

(async () => {
    const parsedData = await d3.csv("crime.csv")
    const offenseType = await parsedData.map((crime) => crime.y)
    const neighborhood = await parsedData.map((crime) => crime.x)
    const isCrime = await parsedData.map((crime) => crime.r)

    // arrays for axis labels and numeric mapping
    const neighborhoodIds = await parsedData.map(crime => crime.x)
    const crimeTypes = await parsedData.map(crime => crime.y)
    const xAxisNeighborhood = await [...new Set(neighborhoodIds)]
    const yAxisCrimeType = await [...new Set(crimeTypes)]

    // Map categories to numbers for ChartJs
    const xAxis = {}
    const yAxis = {}
    const mappedXAxisNeighborhood = await xAxisNeighborhood.forEach((neighborhood, i) => (xAxis[neighborhood] = i))
    const mappedYAxisCrimeType = await yAxisCrimeType.forEach((crimeType, i) => (yAxis[crimeType] = i)) 
    console.log("mapped x axis", mappedXAxisNeighborhood)
    console.log("mapped y axis", mappedYAxisCrimeType)

    function replaceCategoryWithKey(string, mappingArray) {
        // Search through mappingArray for the key that matches string, return the value at that key
        mappingArray.forEach(element => {
            if (element[string]) {return element[string]}
        })
    }

    // Categories are mapped, now I want to take formatted data and replace it with mapped data that replaces the value of each key based
    // on the map
    const formattedData = parsedData.map(dataObj => ({x: dataObj.x, y: dataObj.y, r: parseInt(dataObj.r)}))
    const mappedData = formattedData.map(dataObj => ({x: replaceCategoryWithKey(dataObj.x, mappedXAxisNeighborhood), y: replaceCategoryWithKey(dataObj.y, mappedYAxisCrimeType), r: dataObj.r}))
    console.table("formatted", formattedData)
    console.table("mapped", mappedData)
    // For this map, go through formatted data. For each string that will be x/y, replace the key with x or y, and turn the value into the mapped number
    // What is the mapped number? Each "mapped" aray is a string key and then a number. want to find the string key
    // In formatted data, and replace it with a number
    
    // // console.log(dataObj.x)
    // // console.log(dataObj.y)
    // console.dir(mappedData)


    console.dir(yAxisCrimeType)
    console.dir(xAxisNeighborhood)
    //TODO: need to replace x, y and r labels with x y and r
    // const formattedData = await parsedData.map(dataObj => ({"label": "none", "data": [{...dataObj}], "backgroundColor": "#ff6384", 
    // "hoverBackgroundColor": "#ff6384"}))
    // TODO:Most likely change the tick labels to be categories, map to values for the actual data... let's see how this work
    
    const options = {
        title: {
            display: true,
            text: 'Denver Downtown Crime 2018'
        }, 
        scales: {
            yAxes: [{ 
                scaleLabel: {
                    display: true,
                    labelString: "Crime Type"
                },
                type: 'category',
                labels: yAxisCrimeType
            }],
            xAxes: [{ 
                scaleLabel: {
                    display: true,
                    labelString: "Neighborhood"
                },
                type: 'category',
                labels: xAxisNeighborhood
            }]
        }
    }

    const myChart = await new Chart(ctx, {
        type: 'bubble',
        data: formattedData,
        options: options
    })
    
    console.log("I did it!", myChart)
    console.table("parsedData", formattedData[0])
    console.table("dataarray", parsedData)
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



