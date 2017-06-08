(function () {

    var LightBox = function () {

        var that = this;

        //创建遮罩和弹出框
        this.popupMask = document.createElement('div');
        this.popupMask.id = 'G-lightbox-mask';
        this.popupWin = document.createElement('div');
        this.popupWin.id = 'G-lightbox-popup';

        //保存body
        this.bodyNode = document.documentElement.body || document.body;

        //渲染剩余的DOM，并插入到BODY
        this.renderDOM();

        this.picViewArea=this.popupWin.getElementsByClassName('lightbox-pic-view')[0];//图片预览区
        this.popupPic=this.popupWin.getElementsByClassName('lightbox-image')[0];//图片
        this.picCaptionArea=this.popupWin.getElementsByClassName('lightbox-pic-caption')[0];//图片描述区
        this.nextBtn=this.popupWin.getElementsByClassName('lightbox-next-btn')[0];//下一个按钮
        this.prevBtn=this.popupWin.getElementsByClassName('lightbox-prev-btn')[0];//上一个按钮

        this.captionText=this.popupWin.getElementsByClassName('lightbox-pic-desc')[0];//图片描述标题
        this.currentIndex=this.popupWin.getElementsByClassName('lightbox-of-index')[0];//图片描述索引
        this.closeBtn=this.popupWin.getElementsByClassName('lightbox-close-btn')[0];//关闭按钮

        this.addAnimation();
        this.flagOn=true;
        this.flagOff=false;

        this.groupName = null;
        this.groupData = [];
        //使用事件委托，获取组数据
        this.delegate(this.bodyNode, 'js-lightbox', 'click', function (e, obj) {

            var currentGroupName = obj.dataset.group;

            if (currentGroupName != that.groupName) {

                that.groupName=currentGroupName;
                //根据当前组名获取同一组数据
                that.getGroup();

            }

            //初始化弹框
            if(that.flagOn){
                that.flagOff=false;
                that.initPopup(obj);
            }

        });
        this.popupMask.addEventListener('click',function () {

            if(that.flagOff){
                that.flagOn=false;
                that.popupMask.animation.fadeOut();
                that.popupWin.animation.fadeOut();
            }

        });
        this.closeBtn.addEventListener('click',function () {

            if(that.flagOff){
                that.flagOn=false;
                that.popupMask.animation.fadeOut();
                that.popupWin.animation.fadeOut();
            }

        });
        this.nextBtn.addEventListener('click',function () {

            that.goto('next');

        });
        this.prevBtn.addEventListener('click',function () {

            that.goto('prev');

        })

    }
    LightBox.prototype = {
        constructor: this,
        renderDOM: function () {

            var strDOM = '<div class="lightbox-pic-view">' +
                '<span class="lightbox-btn lightbox-prev-btn"></span>' +
                '<img src="" alt="" class="lightbox-image">' +
                '<span class="lightbox-btn lightbox-next-btn"></span>' +
                '</div>' +
                '<div class="lightbox-pic-caption">' +
                '<div class="lightbox-caption-area">' +
                '<p class="lightbox-pic-desc"></p>' +
                '<span class="lightbox-of-index">当前索引: 0 of 0</span>' +
                '</div>' +
                '<span class="lightbox-close-btn"></span>' +
                '</div>';
            //插入到this.popupWin
            this.popupWin.innerHTML = strDOM;
            //插入到body
            this.bodyNode.appendChild(this.popupMask);
            this.bodyNode.appendChild(this.popupWin);

        },
        getGroup:function () {

            var that=this;
            //根据当前的组别名称获取页面中所有相同组名的对象
            var groupList=[],
                imgList;

            imgList=this.bodyNode.getElementsByClassName('js-lightbox');

            that.groupData=[];

            Array.prototype.forEach.call(imgList,function (ele) {

                if(ele.dataset.group==that.groupName) {

                    groupList.push(ele);
                    that.groupData.push({
                        src: ele.dataset.source,
                        id: ele.dataset.id,
                        caption: ele.dataset.caption,
                    });

                }

            });

        },
        initPopup:function (obj) {

            var that=this,
                sourceSrc=obj.dataset.source,
                currentId=obj.dataset.id;

            this.showMaskAndPopup(sourceSrc,currentId);

        },
        showMaskAndPopup:function (sourceSrc,currentId) {

            var that=this;

            this.popupPic.style.display='none';
            this.picCaptionArea.style.display='none';

            this.popupWin.style.display='block';

            this.popupMask.animation.fadeIn();

            //设置弹出窗口的宽高和位置
            var winWidth=document.documentElement.clientWidth||document.body.clientWidth;
            var winHeight=document.documentElement.clientHeight||document.body.clientHeight;

            this.changeStyle(this.picViewArea,{
                width:winWidth/2,
                height:winHeight/2,
            })

            var viewHeight=winHeight/2+10;

            this.popupWin.style.display='block';
            this.popupWin.opacity=1;
            this.changeStyle(this.popupWin,{
                width:winWidth/2+10,
                height:winHeight/2+10,
                marginLeft:-(winWidth/2+10)/2,
                top:-viewHeight
            });

            this.picViewArea.style.display='block';

            this.startMove(this.popupWin,{top:(winHeight-viewHeight)/2},5,function () {

                //加载方法
                that.loadPicSize(sourceSrc);

            });

            this.index=this.getIndexOf(currentId);


        },
        loadPicSize:function (sourceSrc) {

            this.popupPic.style.width='auto';
            this.popupPic.style.height='auto';

            this.popupPic.style.display='none';
            this.picCaptionArea.style.display='none';

            var that=this;
            this.preLoadImg(sourceSrc,function () {

                that.popupPic.src=sourceSrc;

                //图片宽高
                var picWidth=that.popupPic.width,
                    picHeight=that.popupPic.height;

                that.changePic(picWidth,picHeight);

            });
            
        },
        changePic:function (picWidth,picHeight) {

            var that=this,
                winWidth=document.documentElement.clientWidth||document.body.clientWidth,
                winHeight=document.documentElement.clientHeight||document.body.clientHeight;

            //如果图片的宽高大于浏览器视口的宽高
            var scale=Math.min(winWidth/(picWidth+10),winHeight/(picHeight+10),1);

            picWidth=picWidth*scale;
            picHeight=picHeight*scale;

            this.startMove(this.picViewArea,{width:picWidth-10,height:picHeight-10},5);
            this.startMove(this.popupWin,{width:picWidth,height:picHeight,marginLeft:-(picWidth/2),top:(winHeight-picHeight)/2},5,function () {

                that.changeStyle(that.popupPic,{
                    width:picWidth-10,
                    height:picHeight-10
                });
                that.popupPic.animation.fadeIn();
                that.picCaptionArea.animation.fadeIn();

            });

            //设置描述文字和索引
            this.captionText.innerHTML=this.groupData[this.index].caption;
            this.currentIndex.innerHTML="当前索引 "+(this.index+1)+' of '+this.groupData.length;

        },
        preLoadImg:function (sourceSrc,callback) {

            var img=new Image();
            //IE中没有onload
            if(!!window.ActiveXObject){
                img.onreadystatechange=function () {
                    if(this.readyState=='complete'){
                        callback();
                    }
                }
            }
            else{
                img.onload=function () {
                    callback();
                }
            }
            img.src=sourceSrc;

        },
        goto:function (dir) {

            if (this.groupData.length>1){
                if(dir=='next'){

                    //this.groupData
                    //this.index
                    this.index++;
                    if(this.index>=this.groupData.length){
                        this.index=0;
                    }
                    var src=this.groupData[this.index].src;
                    this.loadPicSize(src);

                }
                else if(dir=='prev'){
                    //this.groupData
                    //this.index
                    this.index--;
                    if(this.index<0){
                        this.index=this.groupData.length-1;
                    }
                    var src=this.groupData[this.index].src;
                    this.loadPicSize(src);
                }
            }

        },
        getIndexOf:function (currentId) {

            var index=0;

            this.groupData.forEach(function (ele,i) {

                if(ele.id==currentId){
                    index=i;
                }

            })

            return index;

        },
        delegate: function (parent, childClass, event, callback) {

            parent.addEventListener(event, function (e) {

                var e = e || window.event,
                    that = this,
                    fireTarget = e.target,
                    eventTarget;

                if (fireTarget.classList.contains(childClass)) {

                    eventTarget = fireTarget;

                }
                else {

                    function findParent(ele) {

                        if (ele == that) {
                            return null;
                        }
                        var parent = ele.parentNode;
                        if (parent == that) {
                            return null;
                        }
                        else if (parent.classList.contains(childClass)) {
                            return parent;
                        }

                        findParent(parent);

                    }

                    eventTarget = findParent(fireTarget);

                }

                if (eventTarget) {

                    callback(e, eventTarget);

                }

            });

        },
        //设置属性
        changeStyle: function (obj, attr) {

            var key;
            for (key in attr) {
                if (attr.hasOwnProperty(key)) {
                    if (key == 'width' || key == 'height' || key == 'left' || key == 'top'||key=='marginLeft') {
                        obj.style[key] = attr[key] + 'px';
                    }
                    else {
                        obj.style[key] = attr[key];
                    }
                }
            }

        },
        addAnimation:function () {

            var that=this;

            this.popupMask.animation={
                opa:that.getStyle(that.popupMask,'opacity')-0,
                timer:null,
                fadeIn:function () {

                    clearInterval(that.popupMask.animation.timer);

                    var attr=that.popupMask.animation.opa;

                    that.popupMask.style.display='block';
                    that.popupMask.style.opacity=0;
                    that.popupMask.style.filter='alpha(opacity:'+0+')';

                    that.popupMask.animation.timer=setInterval(function () {

                        that.popupMask.style.opacity=that.popupMask.style.opacity-0+Math.ceil((attr-that.popupMask.style.opacity)*100/6)/100;
                        that.popupMask.style.filter='alpha(opacity:'+that.popupMask.style.opacity*100+')';
                        if(that.popupMask.style.opacity==attr) {
                            clearInterval(that.popupMask.animation.timer);
                        }

                    },16);

                },
                fadeOut:function () {

                    clearInterval(that.popupMask.animation.timer);

                    that.popupMask.animation.timer=setInterval(function () {

                        that.popupMask.style.opacity=that.popupMask.style.opacity-Math.ceil((that.popupMask.style.opacity)*100/6)/100;
                        that.popupMask.style.filter='alpha(opacity:'+that.popupMask.style.opacity*100+')';
                        if(that.popupMask.style.opacity==0) {
                            that.popupMask.style.display='none';
                            that.flagOn=true;
                            clearInterval(that.popupMask.animation.timer);
                        }

                    },16);

                }

            };
            this.popupWin.animation={

                fadeOut:function () {

                    var timer=setInterval(function () {

                        that.popupWin.style.opacity=that.popupWin.style.opacity-Math.ceil((that.popupWin.style.opacity)*100/6)/100;
                        that.popupWin.style.filter='alpha(opacity:'+that.popupWin.style.opacity*100+')';
                        if(that.popupWin.style.opacity==0) {
                            that.popupWin.style.display='none';
                            that.popupWin.style.opacity=1;
                            that.popupWin.style.filter='alpha(opacity:100)';
                            that.flagOn=true;
                            clearInterval(timer);
                        }

                    },16);

                }

            }
            this.popupPic.animation={

                fadeIn:function () {

                    var attr=that.getStyle(that.popupPic,'opacity')-0;

                    that.popupPic.style.display='block';
                    that.popupPic.style.opacity=0;
                    that.popupPic.style.filter='alpha(opacity:'+0+')';

                    var timer=setInterval(function () {

                        that.popupPic.style.opacity=that.popupPic.style.opacity-0+Math.ceil((attr-that.popupPic.style.opacity)*(attr*100)/6)/(attr*100);
                        that.popupPic.style.filter='alpha(opacity:'+that.popupPic.style.opacity*100+')';
                        if(that.popupPic.style.opacity==attr) {
                            clearInterval(timer);
                        }

                    },16);

                }

            }
            this.picCaptionArea.animation={

                fadeIn:function () {

                    var attr=that.getStyle(that.popupPic,'opacity')-0||1;

                    that.picCaptionArea.style.display='block';
                    that.picCaptionArea.style.opacity=0;
                    that.picCaptionArea.style.filter='alpha(opacity:'+0+')';

                    var timer=setInterval(function () {

                        that.picCaptionArea.style.opacity=that.picCaptionArea.style.opacity-0+Math.ceil((attr-that.picCaptionArea.style.opacity)*(attr*100)/6)/(attr*100);
                        that.picCaptionArea.style.filter='alpha(opacity:'+that.picCaptionArea.style.opacity*100+')';
                        if(that.picCaptionArea.style.opacity==attr) {
                            that.flagOff=true;
                            clearInterval(timer);
                        }

                    },16);

                }

            }

        },
        getStyle:function (obj,attr) {

            if(obj.attr){
                return obj.attr;
            }
            else if(window.getComputedStyle){
                return getComputedStyle(obj,false)[attr];
            }
            else{
                return obj.currentStyle[attr];
            }

        },
        startMove:function (obj,json,spe,fn){
            var flag=0;
            var that=this;
            var complete=[];
            for(var key in json){
                flag++;
            }
            clearInterval(obj.timer);
            obj.timer=setInterval(function(){
                for(var attr in json){
                    var icur=0;
                    if(attr=='opacity'){
                        icur=Math.round(parseFloat(that.getStyle(obj,attr))*100);
                    }
                    else{
                        icur=parseInt(that.getStyle(obj,attr));
                    }
                    var speed=(json[attr]-icur)/spe||(json[attr]-icur)/10;
                    speed=speed>0?Math.ceil(speed):Math.floor(speed);
                    if(attr=='opacity'){
                        obj.style.opacity=(speed+icur)/100;
                        obj.style.filter='alpha(opacity:'+icur+speed+')';
                    }
                    else{
                        obj.style[attr]=icur+speed+'px';
                    }
                    if(parseInt(json[attr])==icur&&complete.indexOf(attr)==-1){
                        complete.push(attr);
                        flag--;
                    }
                }
                if(flag==0){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            },16)
        }


    }

    window['LightBox'] = LightBox;

})();