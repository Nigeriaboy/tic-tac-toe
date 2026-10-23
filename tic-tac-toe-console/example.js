const obj = (() => {
    let name = "Abdullah";
    let sign = "X";
    let count = 0;

    function increaseCount(){
        return count++;
    }

    function getCount(){
        return count;
    }

    return {name,sign,increaseCount, getCount}
})();

function game(player){
    let player2 = player;
    for (let x = 0; x < 2; x++){
        player2.increaseCount();
    }
    return console.log(player2.getCount());
}

game(obj);

let obj2 = obj;
obj2.increaseCount()
console.log(obj2.getCount());