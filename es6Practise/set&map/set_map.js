/**
 * Set & Map 数据结构
 */

'use strict';

/**
 * Set 类数组，成员值唯一，不会重复
 * 可用Array.from()转换为数组
 */
/*
 //Set是构造函数，可用来生成数据结构
 let s = new Set(),
 arr = [1, 2, 3, 3, 4, 5, 2, 2, 1];
 arr.map(x => s.add(x));
 console.log(s); //Set {1, 2, 3, 4, 5 }
 for (let value of s) {
 console.log(value);
 }

 //Set函数可接受一个数组作为参数初始化
 let s = new Set([1,1,2,4,3,4]);
 console.log(s); // Set { 1, 2, 4, 3 }
 console.log([...s]); // [ 1, 2, 4, 3 ]
 console.log(s.size); // 4

 //Set对比值不会发生类型转换，唯一不同的是Set中NaN与NaN相同
 let s = new Set();
 s.add({});
 console.log(s); // Set { {} }
 s.add({});
 console.log(s); // Set { {}, {} }
 s.add(NaN);
 console.log(s); // Set { {}, {}, NaN }
 s.add(NaN);
 console.log(s); // Set { {}, {}, NaN }
 */

/**
 * Set的属性和方法
 */
/*
 //Set有construct属性返回构造函数默认是Set，size属性返回Set实例成员数量
 let s = new Set([1,2,3,4,5]);
 console.log(s.constructor); // [Function: Set]
 console.log(s.size); // 5

 //Set有4个操作方法:add(value),delete(value),has(value),clear()
 let s = new Set();
 console.log(s.add(1)); // Set { 1 }
 console.log(s.add(2)); // Set { 1, 2 }
 console.log(s.add(2)); // Set { 1, 2 }
 console.log(s.has(2)); // true
 console.log(s.delete(2)); // true
 console.log(s.has(2)); // false
 console.log(s.add(3)); // Set { 1, 3 }
 console.log(s.clear()); // undefined
 console.log(s); // Set {}

 //使用Set结构数组去重
 let arr = [1,2,3,3,4,5,2,2,1],
 newArr = Array.from(new Set(arr));
 console.log(newArr); // [ 1, 2, 3, 4, 5 ]

 //Set有4个遍历方法，用于遍历: keys(),values(),entries(),forEach()
 //Set结构中，键名和键值是同一个值
 let set = new Set(['red','green','blue']);
 for (let item of set.keys()) {
 console.log(item); // red // green // blue
 }
 for (let value of set.values()) {
 console.log(value); // red // green // blue
 }
 for (let item of set.entries()) {
 console.log(item); // ['red','red'] // ['green','green'] // ['blue','blue']
 }
 //Set结构实例的默认遍历器生成函数就是它的values方法,所以能直接遍历
 console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true
 for (let value of set) {
 console.log(value); // red // green // blue
 }

 let arr = [...set];
 console.log(arr); // ['red','green','blue']

 //另一种数组去重方法
 let arr = [1,1,2,3,4,4,5],
 newArr = [...new Set(arr)];
 console.log(newArr); // [ 1, 2, 3, 4, 5 ]

 //数组的map和filter方法也可以用于Set结构
 let set = new Set([1, 2, 3]);
 set = new Set([...set].map(value => value * 2));
 console.log(set); // Set { 2, 4, 6 }
 set = new Set([1,2,3,4]);
 set = new Set([...set].filter(value => value % 2 == 0));
 console.log(set); // Set { 2, 4 }

 //使用Set实现并集，交集，补集
 let set1 = new Set([1,2,3]);
 let set2 = new Set([4,3,2]);
 console.log(new Set([...set1,...set2])); // Set { 1, 2, 3, 4 }
 console.log(new Set([...set1].filter(value => set2.has(value)))); // Set { 2, 3 }
 console.log(new Set([...[...set1].filter(value => !set2.has(value)),...[...set2].filter(value => !set1.has(value))])); // Set { 1, 4 }

 let set = new Set([1, 2, 3]);
 set.forEach((value, key, self) => console.log(value * 2)); // 2 // 4 //

 let set = new Set([1, 2, 3]);
 set = new Set(Array.from(set, value => value * 2));
 console.log(set); // Set { 2, 4, 6 }
 */

/**
 * WeakSet 与 Set类似
 * 成员只能是对象
 * 对象都是弱引用，无法引用WeakSet的成员，因此WeakSet是不可遍历的
 * WeakSet.prototype.add(value) 向WeakSet实例添加一个新成员
 * WeakSet.prototype.delete(value)    清除WeakSet实例的指定成员
 * WeakSet.prototype.has(value)    返回一个布尔值，表示某个值是否在实例中
 * 没有delete方法，没有size属性，无法遍历，没有遍历方法
 */

/**
 * Map 类似于对象，也是键值对的集合，但是“键”不仅限于字符串，各种类型的值都可以作为键
 * 与Set相同，存在 get(),set(),has(),clear()与size属性,同样可遍历
 * 存取值是与内存地址绑定的，即使键名相同，内存地址不同，也是不同的键值对，不用担心重名
 * 键是否相同按照严格等于判断，NaN除外
 */
/*
 let map = new Map([["name","Jaxon"],["age","111"]]);
 let key = {type:"keys"};
 console.log(map); // Map { 'name' => 'Jaxon', 'age' => '111' }
 map.set(key,"map");
 console.log(map.has(key)); // true
 console.log(map.get(key)); // map
 console.log(map.size); // 3
 console.log(map.get("none")); // undefined
 map.set(key,"map2");
 console.log(map);  // Map { 'name' => 'Jaxon', 'age' => '111', { type: 'keys' } => 'map2' }
 console.log(map.delete(key)); // true
 console.log(map.has(key)); // false
 map.clear(); // 没有返回值
 console.log(map); // Map {}

 //只有对同一个对象的引用，Map才会视为同一个键
 let map = new Map();
 map.set(['key'], 'value');
 console.log(map.get(['key'])); // undefined

 let k1 = ['k1'],
 k2 = k1;
 map.set(k1, 'value');
 console.log(map.get(k1)); // value
 console.log(map.get(k2)); // value
 console.log(map.get(k1) === map.get(k2)); // true

 let map = new Map();
 map.set(NaN,'NaN');
 map.set(0,'Number');
 console.log(map.get(NaN)); // NaN
 console.log(map.get(-0)); // Number

 //undefined也可以做键值
 let map = new Map();
 map.set(undefined,'innerUndefined');
 console.log(map.get(undefined)); // innerUndefined
 //set()方法返回的是自身，所以可链式调用
 map.set('x','x').set('y','y').set('z','z');
 console.log(map); // Map { undefined => 'innerUndefined', 'x' => 'x', 'y' => 'y', 'z' => 'z' }

 //与Set同样有3个遍历器生成函数和1个遍历方法keys(),values(),entries(),forEach()
 let map = new Map([
 ['key1','value1'],
 ['key2','value2']
 ]);
 for (let key of map.keys()) {
 console.log(key); // key1 // key2
 }
 for (let value of map.values()) {
 console.log(value); // value1 // value2
 }
 for (let entrie of map.entries()) {
 console.log(entrie); // [ 'key1', 'value1' ] // [ 'key2', 'value2' ]
 }
 for (let [key,value] of map.entries()) {
 console.log(key + ': ' + value); // key1: value1 // key2: value2
 }
 for (let [key,value] of map) {
 console.log(key + ': ' + value); // key1: value1 // key2: value2
 }
 //以上可以看出Map解构的默认遍历器接口(Symbol.iterator属性)就是entries方法
 console.log(map[Symbol.iterator] === map.entries); // true

 //结合使用扩展运算符...可以快速转为数组结构
 let map = new Map([
 [1,'one'],
 [2,'two'],
 [3,'three'],
 ]);
 console.log([...map]); // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]
 console.log([...map.keys()]); // [ 1, 2, 3 ]
 console.log([...map.values()]); // [ 'one', 'two', 'three' ]
 console.log([...map.entries()]); // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

 //Map也可使用forEach方法实现遍历,第二个参数用于绑定this对象
 let map = new Map([
 [1, 'one'],
 [2, 'two'],
 [3, 'three'],
 ]);
 let reporter = {
 report(key, value){
 console.log("Key: %s, Value: %s", key, value);
 }
 };
 map.forEach(function (value,key,self) {
 this.report(key,value); // Key: 1, Value: one //Key: 2, Value: two //Key: 3, Value: three
 },reporter);

 //Map与其它数据结构相互转换
 //Map与Object转换
 function strMapToObj(strMap) {
 let obj = {};
 for (let [k, v] of strMap) {
 obj[k] = v;
 }
 return obj;
 }
 function objToStrMap(obj) {
 let strMap = new Map();
 for (let key of Object.keys(obj)) {
 strMap.set(key, obj[key]);
 }
 return strMap;
 }
 let map = new Map([
 [1, 'one'],
 [2, 'two'],
 [3, 'three']
 ]);
 let obj = {
 one: 'first',
 two: 'second',
 three: 'third'
 };
 console.log(strMapToObj(map)); // { '1': 'one', '2': 'two', '3': 'three' }
 console.log(objToStrMap(obj)); // Map { 'one' => 'first', 'two' => 'second', 'three' => 'third' }
 */

/**
 * WeakMap 与 Map结构基本类似
 * 只接受对象作为键名（null除外） 且键名对象为弱引用
 * 不能遍历，没有size属性，没有clear方法
 * 只有get()、set()、delete()、has()4个方法可用
 */















