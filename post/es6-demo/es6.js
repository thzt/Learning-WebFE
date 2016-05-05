// -- 1. var versus let/const
let snack='Meow Mix';
function getFood(food){
	if(food){
		let snack='Friskies';
		return snack;
	}

	return snack;
}
getFood(false);    //'Meow Mix'



// -- 2. Replacing IIFEs with Blocks
{
	let food='Meow Mix';
}

food;    //Reference Error



// -- 3. Arrow Functions
function Persion(name){
	this.name=name;
}
Person.prototype.prefixName=function(arr){
	return arr.map(character=>this.name+character);
};



// -- 4. Strings
// ---- 4.1 .includes()
const string='food';
const substring='foo';
string.includes(substring);    //true

// ---- 4.2 .repeat()
'meow'.repeat(3);    //'meowmeowmeow'



// -- 5. Template Literals
// ---- 5.1 Special characters
let text=`This string contains "double quotes" which don't need to be escaped anymore.`;

// ---- 5.2 interpolation
const name='Tiger';
const age=13;
`My cat is named ${name} and is ${age} years old.`;

// ---- 5.3 Preserve new line
let text=(`cat
dog
nickelodeon`);

// ---- 5.4 Accept expressions
let today=new Date();
let text=`The time and date is ${today.toLocalString()}`;



// -- 6. Destructuring
// ---- 6.1 Destructuring Arrays
let [a,b,c,d]=[1,2,3,4];
a;    //1
b;    //2

// ---- 6.2 Destructuring Objects
let luke={occupation:'jedi',father:'anakin'};
let {occupation,father}=luke;
occupation;    //'jedi'
father;    //'anakin'



// -- 7. Modules
// ---- 7.1 Named Exports
export let name='David';
export let age=25;

export function sumTwo(a,b){
	return a+b;
}

// ---- 7.2 Export a list
function sumTwo(a,b){
	return a+b;
}
function sumThree(a,b,c){
	return a+b+c;
}

export {sumTwo,sumThree};

// ---- 7.3 Export default bindings
function sumTwo(a,b){
	return a+b;
}
function sumThree(a,b,c){
	return a+b+c;
}

let api={
	sumTwo,
	sumThree
};

export default api;    //export {api as default};

// ---- 7.4 Import an entire file
import 'underscore';

// ---- 7.5 Named imports
import {sumTwo,sumThree} from 'math/addtion';

// ---- 7.6 Rename the named imports
import {
	sumTwo as addTwoNumbers,
	sumThree as addThreeNumbers
} from 'math/addtion';

// ---- 7.7 Import all the things
import * as until from 'math/addtion';
const {sumTwo,sumThree}=util;

// ---- 7.8 Import from the default binding
import api from 'math/addtion';    //import {default as api} from 'math/addtion';

// ---- 7.9 Mix default
export {foo as default,foo1,foo2};

import foo,{foo1,foo2} from 'foos';



// -- 8. Parameters
// ---- 8.1 Default parameters
function addTwoNumbers(x=0,y=0){
	return x+y;
}

addTwoNumbers(2,4);    //6
addTwoNumbers(2);    //2
addTwoNumbers();    //0

// ---- 8.2 Rest parameters
function logArguments(...args){
	for(let arg of args){
		console.log(arg);
	}
}

// ---- 8.3 Option paramters
function initializeCanvas({height=600,width=400,lineStroke='black'}){
	//height,width,lineStroke
}

function initializeCanvas({height=600,width=400,lineStroke='black'}={}){
	//height,width,lineStroke
}

// ---- 8.4 Spread operator
Math.max(...[-1,100,9001,-32]);

let cities=['San Francisco','Los Angeles'];
let places=['Miami',...cities,'Chicago'];



// -- 9. Classes
class Person{
	constructor(name,age,gender){
		this.name=name;
		this.age=age;
		this.gender=gender;
	}

	incrementAge(){
		this.age++;
	}
}

class Personal extends Person{
	constructor(name,age,gender,occupation,hobby){
		super(name,age,gender);

		this.occupation=occupation;
		this.hobby=hobby;
	}

	incrementAge(){
		super.incrementAge();

		this.age+=20;
	}
}



// -- 10. Symbols
// ---- 10.1 Non-global symbol
const refreshComponent=Symbol();
React.Component.prototype[refreshComponent]=()=>{
	//
};

Symbol('foo')===Symbol('foo');    //false

// ---- 10.2 Global symbol
Symbol.for('foo')===Symbol('foo');    //false
Symbol.for('foo')===Symbol.for('foo');    //true



// -- 11. Maps
// ---- 11.1 .set(),.get(),.has()
let map=new Map();
map.set('name','david');
map.get('name');    //david
map.has('name');    //true

// ---- 11.2 Any types as key
let map=new Map([
	['name','david'],
	[true,'false'],
	[1,'one'],
	[{},'object'],
	[function(){},'function']
]);

for(let key of map.keys()){
	typeof key;    //string,boolean,number,object,function
}

for(let [key,value] of map.entries()){
	key,value;
}



// -- 12. WeakMaps
// ---- 12.1 No property name
let _age=new WeakMap();
class Person{
	constructor(age){
		_age.set(this,age);
	}

	incrementAge(){
		let age=_age.get(this)+1;
		_age.set(this,age);
	}
}

const person=new Person();
Reflect.ownKeys(person);    //[]

// ---- 12.2 Auto destroy
let map=new WeakMap();
let el=document.getElementById('someElement');

map.set(el,'reference');
map.get(el);    //'reference'

el.parentNode.removeChild(el);
el=null;
map.get(el);    //undefined



// -- 13. Promise
// ---- 13.1 Error handler
new Promise((resolve,reject)=>{
	reject('Failed to fulfill Promise');
}).catch(reason=>console.log(reason));

new Promise((resolve,reject)=>{
	throw 'Exception happens';
}).catch(error=>console.log(error));

// ---- 13.2 Parallel promise
let urls=[
	'/api/commits',
	'/api/issues/completed'
];

let promises=urls.map(url=>{
	return new Promise((resolve,reject)=>{
		$.ajax({url:url}).done(data=>resolve(data));
	});
});

Promise.all(promises)
	.then(results=>{
		//
	});



//  -- 14. Generators
// ---- 14.1 yield
function* sillyGenerator(){
	yield 1;
	yield 2;

	return 3;
}
let gen=sillyGenerator();
gen.next();    //{value:1,done:false}
gen.next();    //{value:2,done:false}
gen.next();    //{value:3,done,true}

// ---- 14.2 yield promise
function* getData(){
	let entry1=yield request('some_api/item1');
	let data1=JSON.parse(entry1);

	let entry2=yield request('some_api/item2');
	let data2=JSON.parse(entry2);
}

function request(url){
	return new Promise((resolve,reject)=>{
		getJSON(url,resolve);
	});
}

function iterateGen(generator){
	var gen=generator();
	
	(function iterate(val){
		let ret=gen.next();
		if(!ret.done){
			ret.value.then(iterate);
		}
	}());
}



// -- 15. Getter and Setter functions
var person={
	firstName:'James',
	lastName:'Bond',
	get fullName(){
		return this.firstName+' '+this.lastName;
	},
	set fullName(name){
		let words=name.split(' ');
		this.firstName=words[0];
		this.lastName=words[1];
	}
};

person.fullName;    //James Bond
person.fullName='Bond 007';
person.fullName;    //Bond 007
