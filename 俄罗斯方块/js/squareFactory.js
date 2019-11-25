/*
* @Author: Lee
* @Date:   2019-04-20 15:23:12
* @Last Modified by:   Lee
* @Last Modified time: 2019-04-20 21:42:10
*/

//---------------------------SQUARE1-------------------------
var Square1 = function() {
	Square.call(this);//方块数据见square.js
  //旋转数组
this.rotates = [
    [
	    [0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0]
    ],
    [
	    [0, 0, 0, 0],
		[2, 2, 2, 2],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0]
    ],
    [
	    [0, 0, 0, 0],
		[2, 2, 2, 2],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ]
];
}

Square1.prototype = Square.prototype;//原型链继承自square.js

//---------------------------SQUARE2-------------------------
var Square2 = function() {
	Square.call(this)//方块数据见square.js
  //旋转数组
this.rotates = [
    [
	    [0, 2, 0, 0],
		[2, 2, 2, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 0, 0, 0],
		[2, 2, 0, 0],
		[2, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 2, 2, 0],
		[0, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [0, 2, 0, 0],
		[2, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 0, 0, 0]
    ]
];
}

Square2.prototype = Square.prototype;//原型链继承自square.js

//---------------------------SQUARE3-------------------------
var Square3 = function() {
	Square.call(this)//方块数据见square.js
  //旋转数组
this.rotates = [
    [
	    [2, 2, 2, 0],
		[0, 0, 2, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [0, 2, 0, 0],
		[0, 2, 0, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 0, 0, 0],
		[2, 2, 2, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 2, 0, 0],
		[2, 0, 0, 0],
		[2, 0, 0, 0],
		[0, 0, 0, 0]
    ]
];
}

Square3.prototype = Square.prototype;//原型链继承自square.js

//---------------------------SQUARE4-------------------------
var Square4 = function() {
	Square.call(this)//方块数据见square.js
  //旋转数组
this.rotates = [
    [
	    [2, 2, 2, 0],
		[2, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [0, 0, 2, 0],
		[2, 2, 2, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 0, 0, 0],
		[2, 0, 0, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0]
    ]
];
}

Square4.prototype = Square.prototype;//原型链继承自square.js

//---------------------------SQUARE5-------------------------
var Square5 = function() {
	Square.call(this)//方块数据见square.js
  //旋转数组
this.rotates = [
    [
	    [2, 2, 0, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 2, 0, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 2, 0, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 2, 0, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ]
];
}

Square5.prototype = Square.prototype;//原型链继承自square.js

//---------------------------SQUARE6-------------------------
var Square6 = function() {
	Square.call(this)//方块数据见square.js
  //旋转数组
this.rotates = [
    [
	    [0, 2, 2, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 0, 0, 0],
		[2, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [0, 2, 2, 0],
		[2, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 0, 0, 0],
		[2, 2, 0, 0],
		[0, 2, 0, 0],
		[0, 0, 0, 0]
    ]
];
}

Square6.prototype = Square.prototype;//原型链继承自square.js

//---------------------------SQUARE7-------------------------
var Square7 = function() {
	Square.call(this)//方块数据见square.js
  //旋转数组
this.rotates = [
    [
	    [2, 2, 0, 0],
		[0, 2, 2, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [0, 2, 0, 0],
		[2, 2, 0, 0],
		[2, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [2, 2, 0, 0],
		[0, 2, 2, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
    ],
    [
	    [0, 2, 0, 0],
		[2, 2, 0, 0],
		[2, 0, 0, 0],
		[0, 0, 0, 0]
    ]
];
}

Square7.prototype = Square.prototype;//原型链继承自square.js

var SquareFactory =function() {}//定义方块的工厂
SquareFactory.prototype.make = function(index,dir) {//制造方块
	var s;
	index = index + 1;
	switch(index) {
	case 1:
		s = new Square1();
		break;
	case 2:
		s = new Square2();
		break;
	case 3:
		s = new Square3();
		break;
	case 4:
		s = new Square4();
		break;
	case 5:
		s = new Square5();
		break;
	case 6:
		s = new Square6();
		break;
	case 7:
		s = new Square7();
		break;
	default:
	    break;
	}
	s.origin.x = 0;
	s.origin.y = 3;
	s.rotate(dir);
	return s;
}