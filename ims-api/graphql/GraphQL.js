// graphql-tools combines a schema string with resolvers.
import { find, filter } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Query {
        post(id: Int!): Post
        product(id: Int!): Product
        user(id: Int!): User
    },
    scalar Date
        type Post {
            id: Int
            user: User
            title: String
            body: String
        },
        type User {
            id: Int
            name: String
            email: String
            posts: [Post]
        },
        type Product {
            id: Int
            user: User
            title: String
            date: Date,
            content: String,
            srNo:String,
            disriptionOfGoods:String,
            sirNo:String,
            modelNo:String,
            hsnsac:String,
            quantity:String,
            rate:String,
            per:String,
            discount:String,
            amount:String,
            totalAmount:String,
            totalAmountInWords:String
        },
`;
var postsData = [
  {
    id: 1,
    userId: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 2,
    id: 2,
    title: 'qui est esse',
    body:
      'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body:
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 2,
    id: 4,
    title: 'eum et est occaecati',
    body:
      'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
];
var usersData = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
  },
];

var productsData = [
  {
    id: 1,
    userId: 1,
    title: 'Panasonic ',
    date: 'date',
    content: 'String',
    srNo: '1',
    disriptionOfGoods: 'String',
    sirNo: 'String',
    modelNo: 'String',
    hsnsac: 'String',
    quantity: 'String',
    rate: 'String',
    per: 'String',
    discount: 'String',
    amount: 'String',
    totalAmount: 'String',
    totalAmountInWords: 'String',
  },
  {
    id: 2,
    userId: 1,
    title: 'Panasonic ',
    date: 'date',
    content: 'String',
    srNo: '1',
    disriptionOfGoods: 'String',
    sirNo: 'String',
    modelNo: 'String',
    hsnsac: 'String',
    quantity: 'String',
    rate: 'String',
    per: 'String',
    discount: 'String',
    amount: 'String',
    totalAmount: 'String',
    totalAmountInWords: 'String',
  },
  {
    id: 3,
    userId: 2,
    title: 'Panasonic ',
    date: 'date',
    content: 'String',
    srNo: '1',
    disriptionOfGoods: 'String',
    sirNo: 'String',
    modelNo: 'String',
    hsnsac: 'String',
    quantity: 'String',
    rate: 'String',
    per: 'String',
    discount: 'String',
    amount: 'String',
    totalAmount: 'String',
    totalAmountInWords: 'String',
  },
  {
    id: 4,
    userId: 2,
    title: 'Panasonic ',
    date: 'date',
    content: 'String',
    srNo: '1',
    disriptionOfGoods: 'String',
    sirNo: 'String',
    modelNo: 'String',
    hsnsac: 'String',
    quantity: 'String',
    rate: 'String',
    per: 'String',
    discount: 'String',
    amount: 'String',
    totalAmount: 'String',
    totalAmountInWords: 'String',
  },
];

var getPost = function (root, { id }) {
  return postsData.filter((post) => {
    return post.id === id;
  })[0];
};

var getProduct = function (root, { id }) {
  return productsData.filter((product) => {
    return product.id === id;
  })[0];
};

var getUser = function (root, { id }) {
  return usersData.filter((user) => {
    return user.id === id;
  })[0];
};
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    post: getPost,
    product: getProduct,
    user: getUser,
  },
  User: {
    posts: (user) => filter(postsData, { userId: user.id }),
  },
  Post: {
    user: (post) => find(usersData, { id: post.userId }),
  },
  Product: {
    user: (product) => find(usersData, { id: product.userId }),
  },
};
// Required: Export the GraphQL.js schema object as "schema"
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
