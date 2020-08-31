Vue.component("review", {
  template: `<form @submit.prevent="onSubmit">
    <label for="name">Name:</label><br>
    <input v-model="name" type="text" id="name" name="name"><br>
    <label for="msg">Message:</label><br>
    <textarea v-model="message" type="text" id="msg" name="msg"></textarea>
    <input type="submit">
  </form>`,
  data() {
    return {
      name: "",
      message: "",
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        message: this.message,
      };
      console.log("In onSubmit");
      console.log(productReview);
      this.name = "";
      this.message = "";
      this.$emit("reviewsubmitted", productReview);
    },
  },
});

Vue.component("product", {
  template: `
  <div>
    <div class="product">
    <div class="product-image">
      <img :src="image" alt="vueSocks" />
    </div>
    <div class="product-info">
      <h3>{{title}}</h3>
      <p v-if="inventory>10">In stock</p>
      <p v-else-if="inventory<=10 && inventory>0 ">Almost sold out</p>
      <p v-else :class="{lineThrough:!inStock}">Out of stock</p>
      <p>Shipping : {{shipping}}</p> 
      <ul>
        <li v-for="detail in details">{{detail}}</li>
      </ul>
      <ul class="color-ul">
        <li
          v-for="(varient,ind) in varients"
          class="color-box"
          :style="{backgroundColor:varient.varientColor}"
          :key="varient.varientId"
          @mouseover="changeImage(ind)"
        ></li>
      </ul>
      <button
        @click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton:!inStock}"
      >
        Add to cart
      </button>
    </div>
    </div>
    <review @reviewsubmitted="showReview"></review>
    <h3 v-if="reviews.length>0">Reviews</h3>
    <div>
      <ol type="1">
        <li v-for="review in reviews">
          <p>{{review.name}}</p>
          <p> {{review.message}}</p>
        </li>
      </ol>
    </div>
  </div>
`,
  props: ["premium"],
  data() {
    return {
      reviews: [],
      product: "socks",
      selectedVarient: 0,
      inventory: 34,
      details: ["80% cotton", "20% polyster", "male"],
      varients: [
        {
          varientId: 2234,
          varientColor: "green",
          varientImage: "./assets/gsocks.jpg",
          varientQuantity: 23,
        },
        {
          varientId: 2235,
          varientColor: "blue",
          varientImage: "./assets/bsocks.jpeg",
          varientQuantity: 10,
        },
      ],
      // lineThrough: {
      //   "text-decoration": "line-through",
      // },
    };
  },
  methods: {
    addToCart() {
      this.$emit("itemadded");
    },
    changeImage(index) {
      this.selectedVarient = index;
      console.log(index);
    },
    showReview(productReview) {
      console.log("In showReview");
      console.log(productReview);
      this.reviews.push(productReview);
    },
  },
  // components: ["review"],
  computed: {
    title() {
      return "Vue mastery" + " " + this.product;
    },
    image() {
      return this.varients[this.selectedVarient].varientImage;
    },
    inStock() {
      return this.varients[this.selectedVarient].varientQuantity > 0
        ? true
        : false;
    },
    shipping() {
      console.log("this.premium " + this.premium);
      if (this.premium) {
        return "free";
      } else {
        return "$299";
      }
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: 0,
  },
});
