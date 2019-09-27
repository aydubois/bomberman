
const responseIA = document.getElementById('responseAI')

const possibility = {
    'bomb': 'GO AWAY',
    'hardWall': 'NO MOVE',
    'softWall': 'BOMB',
    'flame': 'NO MOVE',
    'player': 'BOMB',
    'nothing': 'MOVE'
}

const trainingData = [];

for (let objects in possibility) {
    listen(objects);
    
    const action = possibility[objects];
    trainingData.push({
        input: {
            [objects]: 1
        },
        output: {
            [action]: 1
        }
    })
}
const AI = new brain.NeuralNetwork({
    hiddenLayers: [3]
});
const stats = AI.train(trainingData);




function listen(cases){
    const object = document.getElementById(cases)
    object.addEventListener('click', event => {

        let rep = AI.run({
            [cases]: 1
        });
        let resp = highestValue(rep);
        responseIA.innerHTML = resp;
    })
}

function highestValue(rep) {
    let highest = 0;
    let highestAction = "";
    for (let action in rep) {
        if (rep[action] > highest) {
            highest = rep[action];
            highestAction = action;
        }
    }
    return highestAction;
}