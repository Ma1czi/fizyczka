function oblicz(){
    let v = document.getElementById("V").value;
    let f = document.getElementById("f").value;
    let a = document.getElementById("alpa").value / 180 * Math.PI;
    let eps = document.getElementById("eps").value;
    let ile = document.getElementById("ile");
    console.log(v);
    console.log(f);
    console.log(a);
    console.log(eps);
    let suma = 0;
    let s = v*v/(19.6*(Math.sin(a)+f*Math.cos(a)));
    let h = [];
    let vs = [];
    let x = [];
    while(s>eps){
        v = Math.sqrt(19.6*s*(Math.sin(a)-f*Math.cos(a)));
        vs.push(v);
        s = v*v/(19.6*(Math.sin(a)+f*Math.cos(a)));
        console.log(s);
        h.push(s);
        suma++;
        x.push(suma);
    }
    
    ile.innerHTML = suma;
    console.log(vs);
    console.log(h);
    console.log(suma);

    const xValues = x;
    const yValues = h;

    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        yAxes: [{ticks: {min: 0, max:h[0]}}],
        }
    }
    });
}