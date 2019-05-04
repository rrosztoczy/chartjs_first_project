document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

(async () => {
    // Can I so something in here like... get data.... format data.... map data... ?
    const parsedData = await d3.csv("MoodData.csv")
    const dateTime = await parsedData.map((moment) => moment.Time)
    const stressLevel = await parsedData.map((moment) => moment.StressLevel)
    const mood = await parsedData.map((moment) => moment.Mood)
    const activity = await parsedData.map((moment) => moment.Activity)



    // Map categories to numbers for ChartJs
    const xAxis = {}
    const yAxis = {}
    const mappedXAxisNeighborhood = await xAxisNeighborhood.forEach((neighborhood, i) => (xAxis[neighborhood] = i))
    const mappedYAxisCrimeType = await yAxisCrimeType.forEach((crimeType, i) => (yAxis[crimeType] = i)) 
    console.log("mapped x axis", xAxis)
    console.log("mapped y axis", yAxis)

    function replaceCategoryWithKey(string, mappingObject) {
        // Search through mappingObject for the key that matches string, return the value at that key
        for (key in mappingObject) {
            return 
        }
    }


 
    
    const options = {
        title: {
            display: true,
            text: 'Denver Downtown Crime 2018'
        }
    }

    const myChart = await new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                    label: 'Down Town Crime', // Name the series
                    data: mappedData, // Specify the data values array
              borderColor: '#2196f3', // Add custom color border            
              backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                }]
        },
        options: options
    })
    

})()
})
