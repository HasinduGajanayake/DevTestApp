export function findOutlier(integers: number[]): number {
    const evenNumbers: number[] = [];
    const oddNumbers: number[] = [];

    integers.forEach((number) => {
      //check even and odd numbers
      if(number%2 === 0){
        evenNumbers.push(number);
      }else{
        oddNumbers.push(number);
      }


    });


    return evenNumbers.length === 1 ? evenNumbers[0] : oddNumbers[0];
  }