const http = (require('http'));
const server = http.createServer((res, req) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hey there , this is my first attempt in Backend Development');

})

server.listen(3000, '127.0.0.1', () => {
    console.log('The Server is running succesfully')
})