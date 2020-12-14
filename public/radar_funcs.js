function createRadar(selector, labels, data, idealData){
  
    /*
  new Chart(document.getElementById("chartjs-3"), {
    type: "radar",
    data: {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running"
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)"
        },
        {
          label: "My Second Dataset",
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)"
        }
      ]
    },
    options: { elements: { line: { tension: 0, borderWidth: 3 } } }
  });
  */

  var data = {
    labels: labels.map(label => formatLabel(label, 30)),
    datasets: [
      {
        label: "Your Values",
        data: data,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)"
      },
      {
        label: "Your Ideal",
        data: idealData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)"
      }
    ]
  };

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      angleLines: {
        display: false
      },
      ticks: {
        suggestedMin: minVal,
        suggestedMax: maxVal
      }
    }
  };

  
  if(window.chart && window.chart !== null){
        window.chart.destroy();
  }  
  var ctx = document.getElementById(selector).getContext("2d");
  
  
  
  
  window.chart = new Chart(ctx, {
    type: "radar",
    data: data,
    options: options
  });
  
  
  /*
  // this part tries to fix the background color of the chart, so the downloaded image will look right
  // doesn't work yet...
  let canvas = document.getElementById(selector);
  ctx.globalCompositeOperation = 'destination-over';
  // Fill in the background. We do this by drawing a rectangle
  // filling the entire canvas, using the provided color.
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Restore the original context state from `context.save()`
  //ctx.restore();  
  */
  
}




/* takes a string phrase and breaks it into separate phrases 
   no bigger than 'maxwidth', breaks are made at complete words.*/

function formatLabel(str, maxwidth){
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function(item, index){
        if(temp.length > 0)
        {
            var concat = temp + ' ' + item;

            if(concat.length > maxwidth){
                sections.push(temp);
                temp = "";
            }
            else{
                if(index == (words.length-1))
                {
                    sections.push(concat);
                    return;
                }
                else{
                    temp = concat;
                    return;
                }
            }
        }

        if(index == (words.length-1))
        {
            sections.push(item);
            return;
        }

        if(item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
}