
///////////////////// A REVOIR ENTIEREMENT /////////////////


function  verification2Around(xCase,yCase, directionAI){
    let array = {
        'flame' : directionAI.flame,
        'hard' : directionAI.hardWall,
        'soft' : directionAI.softWall,
        'bomb' : directionAI.bomb
    }

    let decision = {
        'true' : 1,
        'false' : 0, 
        'undefined' : 0
    }

    const trainingData = [];

    for(let results in array){
        const result = array[results];
        trainingData.push({
            input: {[results]:1},
            output: {[result] : 1}
            
        })
    }

    const net = new brain.NeuralNetwork({hiddenLayers: [3]});
    const stats = net.train(trainingData);
    console.log(stats);
    console.log(net.run('flame'))

    if(net.run('soft') == 'undefined'){
        console.log("pas de mur")
    }

}
export {verification2Around};

