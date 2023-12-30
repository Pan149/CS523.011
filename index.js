import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

// start

const maxn = 1000005;
let a = Array(maxn).fill(0);
let BIT = Array(maxn).fill(0);
let n;

var upd = [];
var que = [];


function update(pos, val) {
  upd = [];
  for (; pos <= n; pos += pos & -pos) {
    BIT[pos] += val;
    upd.push(pos)
  }
}

function query(pos) {
  que = [];
  let sum = 0;
  for (; pos > 0; pos -= pos & -pos) {
    sum += BIT[pos];
    que.push(pos)
  }
  return sum;
}

function queryrange(start, end) {
  return query(end) - query(start - 1);
}

// var arr = [2, 3, 34, 12, 34, 23, 4, 32, 4, 234, 231, 4];

// function main() {
//   n = 32;
//   for (let i = 1; i <= n; i++) {
//     a[i] = i;
//     update(i, a[i]);
//   }
//   console.log("length ", arr.length)
//   console.log("xincaho ", queryrange(1, 5));
// }

// main();

// end
function reset() {
  a = Array(maxn).fill(0);
  BIT = Array(maxn).fill(0);
  n = 0;
}


app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.post("/home", (req, res) => {
  reset();
  res.redirect("/")
})

app.post("/oke", (req, res) => {
  var x = 0;
  for (let i = 1; i <= n; i *= 2) {
    x = i;
  }
  res.render("index.ejs", {
    num: n,
    floor: x,
    arrs: a,
    b: BIT
  })
});

app.post("/submit", (req, res) => {
  reset();
  var len = req.body.leng;
  var cacphantu = req.body.phantu;
  var cacphantu = cacphantu.split(" ");
  var danhsach = [];
  n = len;
  console.log(cacphantu)
  for (let i = 0; i < cacphantu.length; i++) {
    danhsach.push(parseInt(cacphantu[i]));
    a[i + 1] = parseInt(cacphantu[i]);
    update(i + 1, a[i + 1]);
  }
  var x = 0;
  for (let i = 1; i <= n; i *= 2) {
    x = i;
  }
  res.render("index.ejs", {
    num: n,
    floor: x,
    arrs: a,
    b: BIT
  })
});

app.post("/giatri", (req, res) => {
  reset();
  var batdau = req.body.tua;
  var ketthuc = req.body.denb;
  batdau = parseInt(batdau);
  ketthuc = parseInt(ketthuc)
  n = ketthuc - batdau + 1;
  for (let i = 0; i < n; i++) {
    a[i + 1] = batdau + i;
    update(i + 1, a[i + 1]);
  }
  var x = 0;
  for (let i = 1; i <= n; i *= 2) {
    x = i;
  }
  res.render("index.ejs", {
    num: n,
    floor: x,
    arrs: a,
    b: BIT
  })
});

app.post("/randomi", (req, res) => {
  reset();
  var soluong = req.body.soluong;
  n = parseInt(soluong);
  for (let i = 1; i <= n; i++) {
    a[i] = Math.floor(Math.random() * 100) + 1;;
    update(i, a[i]);
  }
  var x = 0;
  for (let i = 1; i <= n; i *= 2) {
    x = i;
  }
  res.render("index.ejs", {
    num: n,
    floor: x,
    arrs: a,
    b: BIT
  })
});

app.post("/thaydoi", (req, res) => {
  var value = req.body.value;
  var pos = req.body.pos;
  value = parseInt(value);
  pos = parseInt(pos);
  var x = 0;
  update(pos, value - a[pos]);
  a[pos] = value;
  for (let i = 1; i <= n; i *= 2) {
    x = i;
  }
  res.render("index.ejs", {
    num: n,
    floor: x,
    arrs: a,
    b: BIT,
    doi: upd
  })
});

app.post("/tinhtong", (req, res) => {
  var end = req.body.end;
  end = parseInt(end);
  var x = 0;
  var ketqua = query(end);
  for (let i = 1; i <= n; i *= 2) {
    x = i;
  }
  console.log(que);
  res.render("index.ejs", {
    num: n,
    floor: x,
    arrs: a,
    b: BIT,
    day: que,
    endo: end,
    kq: ketqua
  })
});

app.post("/tinhtongdoan", (req, res) => {
  var start = req.body.start;
  var end = req.body.end;
  start = parseInt(start)-1;
  end = parseInt(end);
  var st = [];
  var en = [];
  var x = 0;
  var ketqua = query(end);
  en = que;
  var before = query(start);
  st = que;
  ketqua -= before;
  for (let i = 1; i <= n; i *= 2) {
    x = i;
  }
  console.log(en)
  console.log(st)
  console.log(start, end)
  res.render("index.ejs", {
    num: n,
    floor: x,
    arrs: a,
    b: BIT,
    day: que,
    starto: st,
    endo: en,
    sodau: start,
    socuoi: end,
    kq: ketqua
  })
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
