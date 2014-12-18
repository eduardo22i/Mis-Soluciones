function addStep () {
    var stps = document.getElementById("stepsHolder");
    var stpsCount = Number(document.getElementById("stepsCount").value);
    
    
    var add1 = "";
    
    for (var i = 1; i<= stpsCount  ; i++){
        var actStep = document.getElementsByName("step"+(i))[0].value;
        
        add1 = add1+ '<input type="text" class="paso" name="step'+(i)+'" placeholder="Paso a seguir" value="'+actStep+'" />';
    }
    
    
    add1 = add1 + '<input type="text" class="paso" name="step'+(stpsCount+1)+'" placeholder="Paso a seguir" value="" />';
    
    //console.log(stps);
    
    document.getElementById("stepsCount").value = stpsCount +  1;
    
    stps.innerHTML = add1;
}