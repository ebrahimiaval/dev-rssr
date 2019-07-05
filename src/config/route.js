export const route = {
    home: '/',
    post: (id) => '/post/' + ( id !==  undefined ? id : ':postId')
};
