var canvas = new fabric.Canvas('canvas',{
    backgroundColor: '#ffffff',
});

var appObject = function() {

    return {
      __canvas: canvas,
      __tmpgroup: {},
  
      addText: function() {
        var newID = (new Date()).getTime().toString().substr(5);
        var text = new fabric.IText('Text...', {
          fontFamily: 'arial black',
          left: 100,
          top: 50,
          myid: newID,
          objecttype: 'text'
        });
  
        this.__canvas.add(text);
        this.__canvas.bringToFront(text); //Đưa Text lên trên Cùng
        // this.addLayer(newID, 'text');
        this.__canvas.on('selection:created', function() {
            console.log('selected a text');
            $('.form-text').addClass('show');
        });
        this.__canvas.on('selection:cleared', function() {
            console.log('deselected a text');
            $('.form-text').removeClass('show');
        });
      },

      addImage: function(){
        //var newID = (new Date()).getTime().toString().substr(5);
        var img = fabric.Image.fromURL('default.jpg',function(oImg) {
            oImg.scale(0.2);
            canvas.add(oImg);
        },{
            // width:150,
            // height: 80,
            // top: 20,
            // left:37
        });

        //tai nay nay ko co this nen ko chon dc object
        this.__canvas.bringToFront(img); //Đưa Ảnh lên trên cùng
        this.__canvas.on('selection:created', function() {
            console.log('selected a image');
        });
        this.__canvas.on('selection:cleared', function() {
            console.log('deselected a image');
        });
      },
    //   setTextParam: function(param, value) {
    //     var obj = this.__canvas.getActiveObject();
    //     if (obj) {
    //       if (param == 'color') {
    //         obj.setColor(value);
    //       } else {
    //         obj.set(param, value);
    //       }
    //       this.__canvas.renderAll();
    //     }
    //   },
      setTextValue: function(value) {
        var obj = this.__canvas.getActiveObject();
        if (obj) {
        
          obj.set('text',value);
          this.__canvas.renderAll();
        }
      },
      
      addLayer: function() {
  
      }
  
    };
  }

$(document).ready(function(){
    var app = appObject();
    $('.text-tool').click(function (e) { 
        app.addText();
    });
    $('.image-tool').click(function (e) { 
        app.addImage();
    });

    $('#text-content').keyup(function (e) {     
        app.setTextValue($(this).val());
    });
    // var text = new fabric.IText('hello world', { 
    //     left: 100, 
    //     top: 100, 
    //     fontSize: 40 ,
    //     fill : 'red'
    // } );
    // canvas.add(text);

})


