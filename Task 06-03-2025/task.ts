//Exercise 1
let number : number = 3;
if(number%2 == 0)
    console.log("Number is even!");
else
    console.log("Number is odd!");

//Exercise 2
let prices : number[] = [22.25, 50.30, 15.35, 66.15, 87.40];
let threshold : number = 50;
for(let i=0; i< prices.length; i++){
    if (prices[i]>50)
        console.log(prices[i] + " This product is expensive!");
    else
        console.log(prices[i] + " This product is cheap!");
}

//Exercise 3
let numbers : number[] = [1,2,3,4,5,6,7,8,9];
let sum : number = 0;
for(let i=0; i< numbers.length; i++){
    sum+=numbers[i];
}
console.log("Sum of numbers = " + sum);