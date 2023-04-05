// Exercises: Level 1

// 1. Create an Animal class. The class will have name, age, color, legs properties and create different methods

class Animal {
    constructor(name, age, color, legs) {
        this.name = name
        this.age = age
        this.color = color
        this.legs = 4
    }
    run() {
        console.log(`${this.name} is running.`)
    }
    eat(food) {
        console.log(`${this.name} is eating ${food}.`)
    }
}

const dog = new Animal('Tom', 2, 'brown', 4)
console.log(dog) // Animal { name: 'Tom', age: 2, color: 'brown', legs: 4 }

dog.run() // Tom is running.
dog.eat('biscuits') // Tom is eating biscuits.

// 2. Create a Dog and Cat child class from the Animal Class.

class Dog extends Animal {
    constructor(name, age, color, breed) {
        super(name, age, color, 4)
        this.breed = breed
    }
    bark() {
        console.log(`${this.name} is barking!`)
    }
}
class Cat extends Animal {
    constructor(name, age, color, isIndoor) {
        super(name, color, age, 4)
        this.isIndoor = isIndoor
    }
    meow() {
        console.log(`${this.name} is meowing!`)
    }
}

const dog2 = new Dog('Alex', 3, 'brown', 'Labrador')
console.log(dog2)
/*
Dog {
  name: 'Alex',
  age: 3,
  color: 'brown',
  legs: 4,
  breed: 'Labrador'
}
*/

dog2.eat('meat') // Alex is eating meat.
dog2.bark() // Alex is barking!

const cat = new Cat('Bella', 1, 'white', true)
console.log(cat) // Cat { name: 'Bella', age: 'white', color: 1, legs: 4, isIndoor: true }

cat.run() // Bella is running.
cat.meow() // Bella is meowing!

// Exercise: Level 2

// 1. Override the method you create in Animal class

class Cow extends Animal {
    constructor(name, age, color, isFarmAnimal, breed) {
        super(name, age, color, 4)
        this.breed = breed
    }

    produceMilk() {
        console.log(`${this.name} is producing milk.`)
    }
}

const cow = new Cow('Bell', 5, 'white', true, 'Jersey')
console.log(cow) // Cow { name: 'Bell', age: 5, color: 'white', legs: 4, breed: 'Jersey' }

cow.eat('grass') // Bell is eating grass.
cow.produceMilk() // Bell is producing milk.

// Exercise: Level 3

/* 1. Let's try to develop a program which calculate measure of central tendency of a sample(mean, median, mode) and measure of variability(range, variance, standard deviation). In addition to those measures find the min, max, count, percentile, and frequency distribution of the sample. You can create a class called Statistics and create all the functions which do statistical calculations as method for the Statistics class. Check the output below.
ages = [31, 26, 34, 37, 27, 26, 32, 32, 26, 27, 27, 24, 32, 33, 27, 25, 26, 38, 37, 31, 34, 24, 33, 29, 26]

console.log('Count:', statistics.count()) // 25
console.log('Sum: ', statistics.sum()) // 744
console.log('Min: ', statistics.min()) // 24
console.log('Max: ', statistics.max()) // 38
console.log('Range: ', statistics.range() // 14
console.log('Mean: ', statistics.mean()) // 30
console.log('Median: ',statistics.median()) // 29
console.log('Mode: ', statistics.mode()) // {'mode': 26, 'count': 5}
console.log('Variance: ',statistics.var()) // 17.5
console.log('Standard Deviation: ', statistics.std()) // 4.2
console.log('Variance: ',statistics.var()) // 17.5
console.log('Frequency Distribution: ',statistics.freqDist()) // [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]
// you output should look like this
console.log(statistics.describe())
Count: 25
Sum:  744
Min:  24
Max:  38
Range:  14
Mean:  30
Median:  29
Mode:  (26, 5)
Variance:  17.5
Standard Deviation:  4.2
Frequency Distribution: [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]

*/

class Statistics {
    constructor(data) {
        this.data = data
    }

    count() {
        return this.data.length
    }

    sum() {
        return this.data.reduce((a, b) => a + b, 0)
    }

    min() {
        return Math.min(...this.data)
    }

    max() {
        return Math.max(...this.data)
    }

    range() {
        return this.max() - this.min()
    }

    mean() {
        return this.sum() / this.count()
    }

    median() {
        const sorted = this.data.sort()
        const mid = Math.floor(this.count() / 2)
        return this.count() % 2 !== 0 ? sorted[mid] : sorted[mid - 1] + sorted[mid] / 2
    }

    mode() {
        const freq = {}
        let mode, maxFreq = 0
        for (const num of this.data) {
            freq[num] = (freq[num] || 0) + 1

            if (freq[num] > maxFreq) {
                maxFreq = freq[num]
                mode = num
            }
        }

        return { mode, count: maxFreq }
    }

    var() {
        const mean = this.mean()
        return this.data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / this.count()
    }

    std() {
        return Math.sqrt(this.var())
    }

    freqDist() {
        const freq = {}
        for (const num of this.data) {
            freq[num] = (freq[num] || 0) + 1
        }
        return Object.entries(freq)
            .map(([num, count]) => [count / this.count() * 100, Number(num)])
            .sort((a, b) => b[0] - a[0])
    }

    describe() {
        return {
            count: this.count(),
            sum: this.sum(),
            min: this.min(),
            max: this.max(),
            range: this.range(),
            mean: this.mean(),
            median: this.median(),
            mode: this.mode(),
            var: this.var(),
            std: this.std(),
            freqDist: this.freqDist()
        }
    }
}

const ages = [31, 26, 34, 37, 27, 26, 32, 32, 26, 27, 27, 24, 32, 33, 27, 25, 26, 38, 37, 31, 34, 24, 33, 29, 26]
const statistics = new Statistics(ages)

console.log('Count:', statistics.count()) // 25
console.log('Sum: ', statistics.sum()) // 744
console.log('Min: ', statistics.min()) // 24
console.log('Max: ', statistics.max()) // 38
console.log('Range: ', statistics.range()) // 14
console.log('Mean: ', statistics.mean()) // 30
console.log('Median: ', statistics.median()) // 29
console.log('Mode: ', statistics.mode()) // {'mode': 26, 'count': 5}
console.log('Variance: ', statistics.var()) // 17.5
console.log('Standard Deviation: ', statistics.std()) // 4.2
console.log('Variance: ', statistics.var()) // 17.5
console.log('Frequency Distribution: ', statistics.freqDist()) // [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]

console.log(statistics.describe())

/*
Count: 25
Sum:  744
Min:  24
Max:  38
Range:  14
Mean:  29.76
Median:  29
Mode:  { mode: 26, count: 5 }
Variance:  17.5424
Standard Deviation:  4.188364836066696
Variance:  17.5424
Frequency Distribution:  [
  [ 20, 26 ], [ 16, 27 ],
  [ 12, 32 ], [ 8, 24 ],
  [ 8, 31 ],  [ 8, 33 ],
  [ 8, 34 ],  [ 8, 37 ],
  [ 4, 25 ],  [ 4, 29 ],
  [ 4, 38 ]
]
{
  count: 25,
  sum: 744,
  min: 24,
  max: 38,
  range: 14,
  mean: 29.76,
  median: 29,
  mode: { mode: 26, count: 5 },
  var: 17.5424,
  std: 4.188364836066696,
  freqDist: [
    [ 20, 26 ], [ 16, 27 ],
    [ 12, 32 ], [ 8, 24 ],
    [ 8, 31 ],  [ 8, 33 ],
    [ 8, 34 ],  [ 8, 37 ],
    [ 4, 25 ],  [ 4, 29 ],
    [ 4, 38 ]
  ]
}
*/

// 2. Create a class called PersonAccount. It has firstname, lastname, incomes, expenses properties and it has totalIncome, totalExpense, accountInfo,addIncome, addExpense and accountBalance methods. Incomes is a set of incomes and its description and expenses is also a set of expenses and its description.

class PersonAccount {
    constructor(firstname, lastname) {

        this.firstname = firstname
        this.lastname = lastname
        this.incomes = new Map()
        this.expenses = new Map()
    }

    addIncome(description, amount) {
        this.incomes.set(description, amount)
    }

    addExpense(description, amount) {
        this.expenses.set(description, amount)
    }

    get totalIncome() {
        let total = 0

        for (const amount of this.incomes.values()) {
            total += amount
        }
        return total
    }

    get totalExpense() {
        let total = 0

        for (const amount of this.expenses.values()) {
            total += amount
        }
        return total
    }

    get accountInfo() {
        return `Name: ${this.firstname} ${this.lastname}\nTotal Income: ${this.totalIncome}\nTotal Expenses: ${this.totalExpense}`
    }

    get accountBalance() {
        return this.totalIncome - this.totalExpense
    }
}

const person = new PersonAccount('Ali', 'Siddiqui')

person.addIncome('Salary', 100000)
person.addIncome('Bonus', 20000)
person.addExpense('Rent', 25000)
person.addExpense('Groceries', 10000)
person.addExpense('Utilities', 20000)


console.log(person.accountInfo)
console.log(`Account Balance: ${person.accountBalance}`)

/*
Name: Ali Siddiqui
Total Income: 120000
Total Expenses: 55000
Account Balance: 65000
*/
