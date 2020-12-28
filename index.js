// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
    static id = 0
    constructor(name){
        this.id = ++Neighborhood.id
        this.name = name
        store.neighborhoods.push(this)
    }

    deliveries() {
        let allDeliveries = []
        store.deliveries.forEach(delivery => {
            if (this.id === delivery.neighborhoodId){
                allDeliveries.push(delivery)
            }
        })
        return allDeliveries
    }

    customers(){
        let allCustomers = []
        store.customers.forEach(customer => {
            if (this.id === customer.neighborhoodId){
                allCustomers.push(customer)
            }
        })
        return allCustomers
    }

    meals(){
        let allMeals = []
        store.deliveries.forEach(delivery => {
            if (delivery.neighborhoodId === this.id){
                store.meals.forEach(meal => {
                    if (meal.id === delivery.mealId){
                        if (!allMeals.includes(meal)){
                            allMeals.push(meal)
                        }
                    }
                })
            }
        })
        return allMeals
    }
}

class Customer {
    static id = 0
    constructor(name, neighborhoodId){
        this.id = ++Customer.id
        this.name = name
        this.neighborhoodId = neighborhoodId
        store.customers.push(this)
    }

    deliveries(){
        let allDeliveries = []
        store.deliveries.forEach(delivery => {
            if (this.id === delivery.customerId){
                allDeliveries.push(delivery)
            }
        })
        return allDeliveries
    }

    meals(){
        let allMeals = []
        store.deliveries.forEach(delivery => {
            if (this.id === delivery.customerId){
                store.meals.forEach(meal => {
                    if (meal.id === delivery.mealId){
                        allMeals.push(meal)
                    }
                })
            }
        })
        return allMeals
    }

    totalSpent(){
        let total = 0
        let allMeals = this.meals()
        allMeals.forEach(meal => total += meal.price)
        return total
    }
}

class Meal {
    static id = 0
    constructor(title, price){
        this.id = ++Meal.id
        this.title = title
        this.price = price
        store.meals.push(this)
    }

    deliveries(){
        let allDeliveries = []
        store.deliveries.forEach(delivery => {
            if (delivery.mealId === this.id){
                allDeliveries.push(delivery)
            }
        })
        return allDeliveries
    }

    customers(){
        let allCustomers = []
        store.deliveries.forEach(delivery => {
            if (delivery.mealId === this.id){
                store.customers.forEach(customer => {
                    if (customer.id === delivery.customerId){
                        if (!allCustomers.includes(customer)){
                            allCustomers.push(customer)
                        }
                    }
                })
            }
        })
        return allCustomers
    }

    static byPrice(){
        let sorted = store.meals.sort(function (a, b) {
            return b.price - a.price
        })
        return sorted
    }
}

class Delivery {
    static id = 0
    constructor(mealId, neighborhoodId, customerId){
        this.id = ++Delivery.id
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        store.deliveries.push(this)
    }

    meal(){
        return store.meals.filter(meal => meal.id === this.mealId)[0]
    }

    customer(){
        return store.customers.filter(customer => customer.id === this.customerId)[0]
    }

    neighborhood(){
        return store.neighborhoods.filter(neighborhood => neighborhood.id === this.neighborhoodId)[0]
    }
}