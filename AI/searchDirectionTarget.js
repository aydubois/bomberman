


function searchTarget(xTarget, yTarget, x, y){
    let xDistance = x - xTarget;
    let yDistance = y - yTarget;

    if(xDistance >= yDistance){
        return searchTargetX(xTarget, x);
    } else{
        return searchTargetY(yTarget, y);
    }
}

function searchTargetX(xTarget, x){

    const net = new brain.recurrent.LSTMTimeStep({  hiddenLayers: [3] });
    const trainingData = [
        {input: [0,13], output:[-1]},
        {input: [1,10], output:[-1]},
        {input: [0,11], output:[-1]},
        {input: [1,6], output:[-1]},
        {input: [8,4], output:[1]},
        {input: [10,2], output:[1]},
        {input: [3,5], output:[-1]},
        {input: [5,3], output:[1]},
        {input: [4,8], output:[-1]},
        {input: [4,4], output:[0]},
        {input: [8,8], output:[0]},
        {input: [15,15], output:[0]}
    ];
    
    net.train(trainingData);

    let direction = net.run([xTarget,x]);

    if(direction < -0.5){
        return "LEFT";
    } else if(direction > 0.5){
        return "RIGHT";
    } else {
        return "NO MOVE";
    }


}

function searchTargetY(yTarget, y){

    const net = new brain.recurrent.LSTMTimeStep({  hiddenLayers: [3] });
    const trainingData = [
        {input: [0,13], output:[-1]},
        {input: [1,10], output:[-1]},
        {input: [0,11], output:[-1]},
        {input: [1,6], output:[-1]},
        {input: [8,4], output:[1]},
        {input: [10,2], output:[1]},
        {input: [3,5], output:[-1]},
        {input: [5,3], output:[1]},
        {input: [4,8], output:[-1]},
        {input: [4,4], output:[0]},
        {input: [8,8], output:[0]},
        {input: [15,15], output:[0]}
    ];
    
    net.train(trainingData);

    let direction = net.run([yTarget,y]);

    if(direction < -0.5){
        return "UP";
    } else if(direction > 0.5){
        return "DOWN";
    } else {
        return "NO MOVE";
    }

}

export {searchTargetY, searchTargetX, searchTarget};