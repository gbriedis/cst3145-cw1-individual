let app = new Vue ({
    el: '#app',
    data : {
        showLesson:true,
        cart:[],
        shoppingCartIcon: "assets/img/shopping-cart.png",
        lessons: [],
        newSpaces: {
            lessonID: "",
            spaces: 0
        },
        order: {
            email: "",
            firstName: "",
            phoneNumber: "",
            lessonID: "",
            spaces: 0,
        },
        ascendingDescending: 'ascending',
        sortType: 'price',
        searchValue: '',
    },
    // created: function () {
    //     this.fetchLessonData();
    // },

    methods: {
        fetchLessonData() {
            fetch("https://cst3145-cw2-ginters.herokuapp.com/collection/lessonsDB").then((response) => {
                response.json().then((data) => {
                    app.lessons = data;
                });
            });
        },

        // add items to the shopping cart
        addToCart: function(product) {
            this.cart.push(product);
            product.spaces -= 1;
        }, 

        // booleon function to show/disable cart
        showCart: function() {
            this.showLesson = false;
        },

        // remove item from cart
        removeItem: function(product) {
            let index = this.cart.indexOf(product);
            this.cart.splice(index, 1);
            product.spaces += 1;
        },

        // sorting function, takes in which type of sort is needed
        sort(type) {
            this.sortType = type;
        },

        // post order to placedOrderDB (stores email, first name, last name and object of order details)
        alertOrder() {
            let cartID = [], spaces = []
            this.cart.forEach(element => {
                cartID.push(element.id)
                spaces.push(element.spaces) 
            });

            this.order = {
                'email': this.order.email,
                'firstName': this.order.firstName,
                'phoneNumber': this.order.phoneNumber,
                'orderID': cartID,
                'spaces': spaces
            }

            this.newSpaces = {
                'lesson_ID': cartID,
                'spaces': spaces
            }

            fetch("https://cst3145-cw2-ginters.herokuapp.com/collection/placedOrderDB", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.order),
                })
            .then(function (response) {
                response.json().then(
                    alert("Order Submitted")
                ) 
            })
        
            fetch("https://cst3145-cw2-ginters.herokuapp.com/collection/lessonsDB", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.newSpaces),
            })

            this.cart = []
        }
    },
    computed: {
        // function to sort lessons  
        
        sortItems() {
            let tempLessons = this.lessons

            // if search bar is empty, return full list of lessons
            if (this.searchValue == '') {
                this.fetchLessonData()
            }
            // if search bar has text, return list of lessons with the specific name
            else {
                fetch('https://cst3145-cw2-ginters.herokuapp.com/collection/lessonsDB/' + this.searchValue).then((response) => {
                    response.json().then((data) => {
                        app.lessons = data;
                    })
                })
            }    

            // sort by subject
            if(this.sortType === 'subject') {
                return tempLessons.sort((a,b) => {
                    let fa = a.subject.toLowerCase(), fb = b.subject.toLowerCase()

                    if(fa < fb) return -1;
                    if(fa > fb) return 1;
                    return 0;
                })
            }

            // sort by location
            else if (this.sortType == 'location') {
                return tempLessons.sort((a,b) => {
                    if(a.location < b.location) return -1;
                    if(a.location > b.location) return 1;
                    return 0;
                });
            }
            
            // sort by price
            else if(this.sortType === 'price') {
                return tempLessons.sort((a,b) => {
                    if(a.price < b.price) return -1;
                    if(a.price > b.price) return 1;
                    return 0;
                });
            }

            // sort by spaces
            else if(this.sortType === 'spaces') {
                return tempLessons.sort((a,b) => {
                    if(a.spaces < b.spaces) return -1;
                    if(a.spaces > b.spaces) return 1;
                    return 0;
                });
            }
            return tempLessons
        },

        // ascending/descending function
        upDown() {
            if(ascendingDescending == 'descending') {
                this.lessons.reverse()
            }
        }
    },


})


