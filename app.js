var app = new Vue({
  el: "#app",
  data: {
    product: "socks",
    image: "./assets/gsocks.jpg",
    inStock: true,
    inventory: 0,
    details: ["80% cotton", "20% polyster", "male"],
    varients: [
      {
        varientId: 2234,
        varientColor: "green",
        varientImage: "./assets/gsocks.jpg",
      },
      {
        varientId: 2235,
        varientColor: "blue",
        varientImage: "./assets/bsocks.jpeg",
      },
    ],
    // lineThrough: {
    //   "text-decoration": "line-through",
    // },
    cart: 0,
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    changeImage(varientImage) {
      this.image = varientImage;
    },
  },
});
