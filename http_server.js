var http = require('http');
var fs = require('fs');
var path = require('path');

const filePath = '~/node_learning'

http.createServer(function (req, res) {
  // 6666端口浏览器无法访问
  const url = req.url;
  let fpath = '';
  console.log("url: " + url);
  if (url === '/flower') {
    // 展示烟花
    fpath = path.join(filePath, './index.html')
  } else if (url.startsWith('/demo')) {
    // 展示demo页面
    fpath = path.join(filePath, './demo-html-css', url.substring(5))
  } else if (url.startsWith('/first_react')) {
    // 展示第一个react页面
    fpath = path.join(filePath, './first-react-app/build', url.substring(12))
  }
  console.log("fpath: " + fpath);
  if (fpath === '') {
    return res.end('404 Not found');
  }

  // 图片文件设置content-type
  const fileExtension = path.extname(fpath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.ico'].includes(fileExtension)) {
    res.setHeader('Content-type','image/*')
  }
  if (['.svg'].includes(fileExtension)) {
    res.setHeader('Content-type','image/svg+xml')
  }
  // 以字节形式读取
  fs.readFile(fpath, (err, dataBuffer) => {
    if (err) {
        res.statusCode = 404
        return res.end('404 Not found')
    }
    res.write(dataBuffer)
    res.end()
  })
}).listen(8888, '0.0.0.0');
console.log('Server running at http://0.0.0.0:8888/');
