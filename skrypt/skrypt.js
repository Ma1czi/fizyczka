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
    let t = [];
    let lastt=0;
    let vt = [];
    var sinpcos = 9.8* (Math.sin(a)+f*Math.cos(a));
    var sinmcos = 9.8* (Math.sin(a)-f*Math.cos(a));
    var sina = Math.sin(a);

    vt.push(v);
    t.push(0);
    vt.push(0);
    t.push((v)/(sinpcos));
    lastt = (v)/(sinpcos);
    x.push(0);
    vs.push(v);
    h.push(sina*s)

    while(s>eps){
        v = Math.sqrt(2*s*(sinmcos));
        vs.push(v);
        vt.push(v);
        t.push(lastt + (v)/(sinmcos));
        lastt += (v)/(sinmcos);

        s = v*v/(2*(sinpcos));
        vt.push(0);
        t.push(lastt + (v)/(sinpcos));
        lastt += (v)/(sinpcos);
        h.push(sina*s);
        suma++;
        x.push(suma);
    }
    
    ile.innerHTML = suma;
    // console.log(vs);
    // console.log(h);
    // console.log(suma);
    // console.log(t);
    // console.log(vt);
    
    // Define Data
    const data = [
      {x: x, y: h, mode:"lines", name:"Wykres wysokości"},
      {x: x, y: vs, mode:"lines", name:"Wykres prędkości"}
    ];
    
    //Define Layout
    const layout = {
        xaxis: {title: "Powtórzenia"},
        yaxis: {title: "Wysokość[m] lub prędkość[m/s]"},
        title: "Wykresy prędkości początkowej i maxymalnej wysokości od powtórzeń"
    };
    
    // Display using Plotly
    Plotly.newPlot("myPlot", data, layout);

    
    let y = [];
    let xvt = [];
    let xst = [];
    let change = 0;
    let j = 0;
    let smax =0;
    console.log(lastt);
    console.log(t);

    for(let i = 0; i<=lastt; i+=0.1){
        let z = i - t[j];
        if(change == 0){
            xvt.push(vt[j] - sinpcos*z);
            xst.push(vt[j]*z - (sinpcos*z*z)/2);
            if(vt[j] - sinpcos*z <=0){
                change = 1;
                smax = vt[j]*z - (sinpcos*z*z)/2;
                j++;
            }
        }else{
            xvt.push(sinmcos*z);
            xst.push(smax - (sinmcos*z*z)/2);
            if(0 + sinmcos*z >=vt[j+1]){
                change = 0;
                j++;
            }
        }
        y.push(i); 
    }
    console.log(xvt)
    console.log(y);
    console.log(sinpcos);
    console.log(sinmcos);
    console.log(vt);
    console.log(xst);
    const datav = [
        {x:y, y:xvt, mode:"lines", name: "Wykres prędkości od czasu"},
        {x:y, y:xst, mode:"lines", name: "Wykres drogi od czasu"}
    ];
    const layoutv = {
        xaxis: {title: "Czas [s]"},
        yaxis: {title: "Prędkość [m/s] / Droga [m]"},
        title: "Wykres Prędkości od czasu i Drogi od czasu"
    };

    Plotly.newPlot("vint", datav, layoutv);
}