new Vue ({
    el: '#vue',
    data : {
        showLesson:true,
        sortType: '',
        cart:[],
        lessons: [
            {id: 1, subject: 'Maths', location: 'London', price: 100, spaces: 5, image: "assets/img/math-icon.png"},
            {id: 2, subject: 'English', location: 'London', price: 80, spaces: 5, image: "assets/img/english-icon.png"},
            {id: 3, subject: 'Science', location: 'London', price: 75, spaces: 5, image: "assets/img/science-icon.png"},
            {id: 4, subject: 'Sport', location: 'London', price: 20, spaces: 5 , image: "assets/img/sport-icon.png"},
            {id: 5, subject: 'Computer Science', location: 'London', price: 125, spaces: 5, image: "assets/img/computer-icon.png"},
            {id: 6, subject: 'Maths', location: 'Peterborough', price: 25, spaces: 5, image: "assets/img/math-icon.png"},
            {id: 7, subject: 'English', location: 'Peterborough', price: 20, spaces: 5, image: "assets/img/english-icon.png"},
            {id: 8, subject: 'Science', location: 'Peterborough', price: 15, spaces: 5, image: "assets/img/science-icon.png"},
            {id: 9, subject: 'Sport', location: 'Peterborough', price: 5, spaces: 5, image: "assets/img/sport-icon.png"},
            {id: 10, subject: 'Computer Science', location: 'Peterborough', price: 50, spaces: 5, image: "assets/img/computer-icon.png"}
        ],
        shoppingCartIcon: "assets/img/shopping-cart.png",
    },
    methods: {
        addToCart: function(product) {
            product.spaces -= 1;
            var cartObject = {id: product.id, subject: product.subject, location: product.location, price: product.price, image: product.image}
            this.cart.push(cartObject);
        }, 

        showCart: function() {
            this.showLesson = false;
        },

        removeItem: function(product) {
            this.lessons.forEach(element => {
                console.log("test " + element.spaces)
                this.cart.forEach(e => {
                    if(element.id == e.id) {
                        element.spaces += 1;
                        this.cart.pop(product.id, product.subject, product.location, product.spaces, product.image)
                        return;
                    }
                });
            });

        },

        sort(type) {
            this.sortType = type;
        },

    },
    computed: {
        sortItems() {
            if(this.sortType === '') return this.lessons;

            if(this.sortType === 'subject') {
                return this.lessons.sort((a,b) => {
                    if(a.subject < b.subject) return -1;
                    if(a.subject > b.subject) return 1;
                    return 0;
                });
            }
            
            if(this.sortType === 'location') {
                return this.lessons.sort((a,b) => {
                    if(a.location < b.location) return -1;
                    if(a.location > b.location) return 1;
                    return 0;
                });
            }

            if(this.sortType === 'price') {
                return this.lessons.sort((a,b) => {
                    if(a.price < b.price) return -1;
                    if(a.price > b.price) return 1;
                    return 0;
                });
            }

            if(this.sortType === 'spaces') {
                return this.lessons.sort((a,b) => {
                    if(a.spaces < b.spaces) return -1;
                    if(a.spaces > b.spaces) return 1;
                    return 0;
                });
            }
            
        }
    }
})


