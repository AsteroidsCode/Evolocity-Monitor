function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderChart(data, labels) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'This week',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    time: {
                        unit: 'second'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return float2dollar(value);
                        }
                    }
                }]
            }
        },
    });
}
let renderButton = document.getElementById('renderBtn');

renderButton.addEventListener('click', function () {
    data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
    labels = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    renderChart(data, labels);
});