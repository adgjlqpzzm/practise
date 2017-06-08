(function () {

    'use strict';

    var Carousel = function (poster, setting) {

        var self=this;

        //保存单个旋转木马对象
        this.poster = poster;
        this.posterItemMain = poster.getElementsByClassName('poster-list')[0];
        this.nextBtn = poster.getElementsByClassName('poster-next-btn')[0];
        this.prevBtn = poster.getElementsByClassName('poster-prev-btn')[0];
        this.posterItems = poster.getElementsByTagName('li');
        this.posterFirstItem = this.posterItems[0];
        if(this.posterItems.length%2==0){
            this.posterItemMain.appendChild(this.posterFirstItem.cloneNode(true));
        }


        //保存传入的配置参数
        this.setting = setting;


        this.extendObj(this.getSetting());

        this.setSettingValue();

        this.setPosterPos();

        this.nextBtn.addEventListener('click',function () {


            self.carouselRotate('left');

        });
        this.prevBtn.addEventListener('click',function () {


            self.carouselRotate('right');

        })


    };

    Carousel.prototype = {
        //扩展对象方法，无则加，有则替换
        extendObj: function (obj) {

            var _extend,
                that = this,
                _obj = obj;

            function _isObj(obj) {

                return typeof obj === 'object';

            };

            _extend = function self(destination, result) {

                var property;

                for (property in destination) {

                    if (_isObj(destination[property] && _isObj(result[property]))) {

                        self(destination[property], result[property]);

                    }
                    else {

                        if (result.hasOwnProperty(property)) {
                            result[property] = destination[property];
                            continue;
                        }
                        else {
                            result[property] = destination[property];
                        }

                    }

                }

            };

            function extend(obj) {

                var arr = arguments,
                    result = that.autoSetting || {},
                    i = arr.length - 1;

                if (!arr.length) {
                    return {};
                }

                for (i; i >= 0; i--) {

                    if (_isObj(arr[i])) {
                        _extend(arr[i], result);
                    }
                    else {
                        continue;
                    }

                }
                arr[0] = result;
                return result;

            };

            return extend(_obj);

        },
        //获取人工配置参数
        getSetting: function () {

            return this.setting;

        },
        //默认配置参数
        autoSetting: {
            'width': 1000,   //幻灯片的宽度
            'height': 270,   //幻灯片的高度
            'posterWidth': 640,  //幻灯片第一帧的宽度
            'posterHeight': 270, //幻灯片第一帧的高度
            'scale': 0.9,    //记录显示比例关系
            'speed': 500,
            'verticalAlign': 'middle',    //垂直方式:'middle','top','bottom'
            'autoPlay':false,
            'delay':5000,
        },
        //设置配置参数值去控制基本的高度宽度
        setSettingValue: function () {

            //盒子的宽高
            this.changeStyle(this.poster, {
                width: this.autoSetting.width,
                height: this.autoSetting.height,
            });
            //ul的宽高
            this.changeStyle(this.posterItemMain, {
                width: this.autoSetting.width,
                height: this.autoSetting.height,
            });
            //两个按钮的宽高
            var btnW = (this.autoSetting.width - this.autoSetting.posterWidth) / 2;
            this.changeStyle(this.nextBtn, {
                width: btnW,
                height: this.autoSetting.height,
                zIndex: Math.floor(this.posterItems.length / 2),
            });
            this.changeStyle(this.prevBtn, {
                width: btnW,
                height: this.autoSetting.height,
                zIndex: Math.floor(this.posterItems.length / 2),
            });
            //设置第一帧的位置
            this.changeStyle(this.posterFirstItem, {
                left: btnW,
                zIndex: Math.floor(this.posterItems.length / 2),
                width: this.autoSetting.posterWidth,
                height: this.autoSetting.posterHeight,
                top:0
            })
        },
        //设置属性
        changeStyle: function (obj, attr) {

            var key;
            for (key in attr) {
                if (attr.hasOwnProperty(key)) {
                    if (key == 'width' || key == 'height' || key == 'left' || key == 'top') {
                        obj.style[key] = attr[key] + 'px';
                    }
                    else {
                        obj.style[key] = attr[key];
                    }
                }
            }

        },
        //设置剩余的帧的位置关系
        setPosterPos: function () {

            //定义li的数目及index有关计算的变量
            var sliceItems = Array.prototype.slice.call(this.posterItems, 1),
                sliceSize = sliceItems.length / 2,
                rightSlice = sliceItems.slice(0, sliceSize),
                leftSlice = sliceItems.slice(sliceSize),
                level = Math.floor(this.posterItems.length / 2);

            //定义right位置大小有关的变量
            var rw = this.autoSetting.posterWidth,
                rh = this.autoSetting.posterHeight,
                gap = (this.autoSetting.width - this.autoSetting.posterWidth) / 2 / level;

            //定义right有关变量
            var firstLeft = (this.autoSetting.width - this.autoSetting.posterWidth) / 2,
                fixOffsetLeft = firstLeft + rw;

            //设置右边帧的位置大小关系
            rightSlice.forEach(function (ele, index) {
                level--;
                rw = rw * this.autoSetting.scale;
                rh = rh * this.autoSetting.scale;
                this.changeStyle(ele, {
                    zIndex: level,
                    width: rw,
                    height: rh,
                    opacity: 1 / (index + 1),
                    left: fixOffsetLeft + (index + 1) * gap - rw,
                    top: this.setVerticalAlign(rh),
                })

            }, this);

            //定义left位置大小有关的变量
            var lw = parseFloat(rightSlice[sliceSize - 1].style.width),
                lh = parseFloat(rightSlice[sliceSize - 1].style.height),
                oloop = Math.floor(this.posterItems.length / 2);

            //设置左边帧的位置大小关系
            leftSlice.forEach(function (ele, index) {

                this.changeStyle(ele, {
                    zIndex: level,
                    width: lw,
                    height: lh,
                    opacity: 1 / oloop,
                    left: index * gap,
                    top: this.setVerticalAlign(lh),
                })
                oloop--;
                level++;
                lw = lw / this.autoSetting.scale;
                lh = lh / this.autoSetting.scale;
            }, this)
        },
        //设置垂直模式
        setVerticalAlign: function (height) {

            var verticalType = this.autoSetting.verticalAlign,
                top = (this.autoSetting.height - height) / 2;

            if (verticalType === 'top') {
                top = 0;
            }
            else if (verticalType === 'bottom') {
                top = this.autoSetting.height - height;
            }

            return top;

        },
        //旋转效果
        carouselRotate:function (dir) {

            if (dir==='left'){

                var that=this,
                    nowAttribute;

                Array.prototype.forEach.call(this.posterItems,function (ele,index,self) {

                    var prevIndex=index<=0?self.length-1:index-1,
                        prev=self[prevIndex],
                        preAttribute=nowAttribute||{
                            width:parseFloat(prev.style.width),
                            height:parseFloat(prev.style.height),
                            zIndex:prev.style.zIndex,
                            opacity:prev.style.opacity,
                            left:parseFloat(prev.style.left),
                            top:parseFloat(prev.style.top)
                        };
                    nowAttribute={
                        width:parseFloat(ele.style.width),
                        height:parseFloat(ele.style.height),
                        zIndex:ele.style.zIndex,
                        opacity:ele.style.opacity,
                        left:parseFloat(ele.style.left),
                        top:parseFloat(ele.style.top)
                    };

                    that.changeStyle(ele,preAttribute);
                });

            }
            else if (dir==='right'){

                var that=this,
                    firstAttribute={
                        width:parseFloat(this.posterItems[0].style.width),
                        height:parseFloat(this.posterItems[0].style.height),
                        zIndex:this.posterItems[0].style.zIndex,
                        opacity:this.posterItems[0].style.opacity,
                        left:parseFloat(this.posterItems[0].style.left),
                        top:parseFloat(this.posterItems[0].style.top)
                    };

                Array.prototype.forEach.call(this.posterItems,function (ele,index,self) {

                    var nextIndex=index>=(self.length-1)?0:index+1,
                        next=self[nextIndex],
                        nextAttribute={
                                width:parseFloat(next.style.width),
                                height:parseFloat(next.style.height),
                                zIndex:next.style.zIndex,
                                opacity:next.style.opacity,
                                left:parseFloat(next.style.left),
                                top:parseFloat(next.style.top)
                        };
                    if(nextIndex==0){

                        nextAttribute=firstAttribute;

                    }

                    that.changeStyle(ele,nextAttribute);
                });

            }

        }

    };

    Carousel.prototype.constructor = this;

    Carousel.init = function (posters, setting) {

        var _this_ = this;
        Array.prototype.forEach.call(posters, function (ele, index) {

            new _this_(ele, setting[index]);

        });


    };

    window['Carousel'] = Carousel;

})();