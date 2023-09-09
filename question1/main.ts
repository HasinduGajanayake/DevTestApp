export function isValidWalk(walk: string[]) {
    //checking the step count
    if (walk.length !== 10) {
        return false;
    }

    let northCount = 0;
    let southCount = 0;
    let eastCount = 0;
    let westCount = 0;

    //counting steps according to direction
    walk.forEach((turnedDirection) =>{
        if(turnedDirection === 'n'){
            northCount++;
        }else if(turnedDirection === 's'){
            southCount++;
        }else if(turnedDirection === 'e'){
            eastCount++;
        }else{
            westCount++;
        }

    });


    
  return northCount === southCount && eastCount === westCount;
}

