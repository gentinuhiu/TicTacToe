function game(){
    localStorage.clear();
    localStorage.setItem("turn", "x");
    let text = "<div id='main'>";

    for(let i = 0; i < 9; i++){
        text += "<button id='" + i +"b' onclick='showBlock(" + i + ")'><img id='" + i + "' src='images/blank.png'></button>";
        if(i + 1 % 3 == 0){
            text += "<br>";
        }
    }
    text += "</div>";
    document.getElementById("game").innerHTML = text;
}
function setBg(i, j, k){
    let color = "blue";
    let source = document.getElementById(i).getAttribute("src");

    if(source == "images/o.png"){
        color = "red";
    }

    document.getElementById(i + "b").style.backgroundColor = color;
    document.getElementById(j + "b").style.backgroundColor = color;
    document.getElementById(k + "b").style.backgroundColor = color;
}
function checkStatus(){
    for(let i = 0; i < 3; i++){
        let s1 = document.getElementById(i).getAttribute("src");
        let s2 = document.getElementById(i + 3).getAttribute("src");
        let s3 = document.getElementById(i + 6).getAttribute("src");
        if(s1 == s2 && s2 == s3 && s1 != "images/blank.png"){
            setBg(i, i+3, i+6);
            return s1;
        }
    }
    for(let i = 0; i < 9;){
        let s1 = document.getElementById(i++).getAttribute("src");
        let s2 = document.getElementById(i++).getAttribute("src");
        let s3 = document.getElementById(i++).getAttribute("src");
        if(s1 == s2 && s2 == s3 && s1 != "images/blank.png"){
            setBg(i-1, i-2, i-3);
            return s1;
        }
    }

    let s1 = document.getElementById(0).getAttribute("src");
    let s2 = document.getElementById(4).getAttribute("src");
    let s3 = document.getElementById(8).getAttribute("src");
    if(s1 == s2 && s2 == s3 && s1 != "images/blank.png"){
        setBg(0, 4, 8);
        return s1;
    }

    s1 = document.getElementById(2).getAttribute("src");
    s2 = document.getElementById(4).getAttribute("src");
    s3 = document.getElementById(6).getAttribute("src");
    if(s1 == s2 && s2 == s3 && s1 != "images/blank.png"){
        setBg(2, 4, 6);
        return s1;
    }

    for(let i = 0; i < 9; i++){
        let source = document.getElementById(i).getAttribute("src");
        if(source == "images/blank.png"){
            return "1";
        }
    }
    return "0";
}
function showBlock(index){
    let turn = localStorage.getItem("turn");
    if(turn == "x"){
        document.getElementById(index).src = "images/x.png";
        localStorage.setItem("turn", "o");
    }
    else{
        document.getElementById(index).src = "images/o.png";
        localStorage.setItem("turn", "x");
    }
    document.getElementById(index + "b").disabled = true;
    
    let result = checkStatus();
    if(result != "1"){
        for(let i = 0; i < 9; i++){
            document.getElementById(i + "b").disabled = true;
        }
        document.getElementById("restart").style.display = "block";
        document.getElementById("status").style.display = "block";
    }
    if(result == "0"){
        document.getElementById("status").style.backgroundColor = "orange";
        document.getElementById("status").innerHTML = "DRAW";
    }
    else if(result == "images/x.png"){
        document.getElementById("status").style.backgroundColor = "blue";
        document.getElementById("status").innerHTML = "X Won";
    }
    else if(result == "images/o.png"){
        document.getElementById("status").style.backgroundColor = "red";
        document.getElementById("status").innerHTML = "O Won";    
    }
}