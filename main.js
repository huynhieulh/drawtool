var canvas = new fabric.Canvas('canvas',{
    backgroundColor: '#ffffff',
});


var appObject = function() {
  
    return {
      __canvas: canvas,
      __tmpgroup: {},
      
      //add text object
      addText: function() {
        var newID = (new Date()).getTime().toString().substr(5);
        var text = new fabric.Text('Text...', {
          fontFamily: 'arial black',
          left: 100,
          top: 50,
          myid: newID,
          objecttype: 'text',
        });
        //add text to canvas
        this.__canvas.add(text);
        //this.__canvas.bringToFront(text); //Đưa Text lên trên Cùng
        //handle event selected
        this.__canvas.on('selection:created', function(e) {
          //show text form if object type is text
          if(e.target.get('type') == 'text'){
            $('.form-text').addClass('show');
            $('.form-image').removeClass('show');
            $('#text-content').val(e.target.text);
            //show delete button
            $('.delete-btn').addClass('show');
          }else{
            //show image form if object type is image
            $('.form-text').removeClass('show');
            $('.form-image').addClass('show');
            //show delete button
            $('.delete-btn').addClass('show');
          }
        });
        //update the active object
        this.__canvas.on('selection:updated', function(e) {
          //show text form if object type is text
          if(e.target.get('type') == 'text'){
            $('.form-text').addClass('show');
            $('.form-image').removeClass('show');
            $('#text-content').val(e.target.text);
            //show delete button
            $('.delete-btn').addClass('show');
          }else{
            //show image form if object type is image
            $('.form-text').removeClass('show');
            $('.form-image').addClass('show');
            //show delete button
            $('.delete-btn').addClass('show');
          }
        });
        //hide all form if deactive object
        this.__canvas.on('selection:cleared', function() {
              $('.form-text').removeClass('show');
              $('.form-image').removeClass('show');
              //hide delete button
            $('.delete-btn').removeClass('show');
        });
      },
        
      //add image object
      addImage: function(){
        //var newID = (new Date()).getTime().toString().substr(5);
        var imgInstance = new fabric.Image.fromURL('df.png', function(oImg) {
          // scale image down, before adding it onto canvas
          oImg.scale(0.7);
          canvas.add(oImg);
        });
        //this.__canvas.bringToFront(imgInstance); //Đưa Ảnh lên trên cùng
        this.__canvas.on('selection:created', function(e) {
          if(e.target.get('type') == 'text'){
            //show input
            $('.form-text').addClass('show');
            //hide change image button
            $('.form-image').removeClass('show');
            //show input value text
            $('#text-content').val(e.target.text);
            //show delete button
            $('.delete-btn').addClass('show');
          }else{
            $('.form-text').removeClass('show');
            $('.form-image').addClass('show');
            //show delete button
            $('.delete-btn').addClass('show');
            $('#image-default').attr('src', e.target.getSrc());
          }
        });
        this.__canvas.on('selection:updated', function(e) {
          if(e.target.get('type') == 'text'){
            $('.form-text').addClass('show');
            $('.form-image').removeClass('show');
            $('#text-content').val(e.target.text);
            //show delete button
            $('.delete-btn').addClass('show');
          }else{
            $('.form-text').removeClass('show');
            $('.form-image').addClass('show');
            $('#image-default').attr('src', e.target.getSrc());
          }
        });
        this.__canvas.on('selection:cleared', function() {
            $('.form-text').removeClass('show');
            $('.form-image').removeClass('show');
            //show delete button
            $('.delete-btn').removeClass('show');
          });
      
      },

      //Set all param type of text object
      setTextParam: function(param, value) {
        var obj = this.__canvas.getActiveObject();
        if (obj) {
          if (param == 'color') {
            obj.setColor(value);
          } else {
            obj.set(param, value);
          }
          this.__canvas.renderAll();
        }
      },
      
      //set text of active object
      setTextValue: function(value) {
        var obj = this.__canvas.getActiveObject();
        if (obj) {
          obj.set('text',value);
          this.__canvas.renderAll();
        }
      },

      //set image of active object
      setImageValue: function(value) {
        var obj = this.__canvas.getActiveObject();
        if (obj) {
          fabric.util.loadImage(value, function (img) {
            obj.set({ 
              _element: img, 
              dirty: true,
              width: img.width,
              height: img.height,
              scaleX: 0.2,
              scaleY:0.2
            });
            if (typeof (obj.canvas) !== 'undefined') {
              obj.canvas.renderAll();
            }
        });
        }
      },

      //delete active object
      deleteObject: function(){
        var obj = this.__canvas.getActiveObject();
        if (obj) {
          this.__canvas.remove(obj);
        };
      },
      
      addLayer: function() {
  
      },

      testUtil: function(){
        console.log(fabric.isTouchSupported);
         
      },

  }
}

$(document).ready(function(){

  //create new object 
  var app = appObject();

  canvas.on('object:moving', function(e){
    var obj = e.target;
      //lay mot nua chieu rong obj
      var halfw = (obj.width * obj.scaleX)/2;
      //lay mot nua chieu cao obj
      var halfh = (obj.height* obj.scaleY)/2;
      var bounds = {
        tl: {x: halfw, y:halfh},
        // x: cách bên trái = chiều ngang canvas - halfw
        // y: cách ở trên = chiều cao canvas - halfh
        br: {x: obj.canvas.width - halfw, y: obj.canvas.height - halfh}
      };

      // top-left  corner
      //nếu object cách top 
      if(obj.top < bounds.tl.y || obj.left < bounds.tl.x){
          obj.top = Math.max(obj.top, -halfh);
          obj.left = Math.max(obj.left , -halfw);
      }
      // bot-right corner
      if(obj.top > bounds.br.y || obj.left > bounds.br.x ){
          obj.top = Math.min(obj.top, bounds.br.y );  
          obj.left = Math.min(obj.left, bounds.br.x );  
      }

});

  

  //add text object
  $('.text-tool').click(function (e) { 
      app.addText();
  });

  //add image object
  $('.image-tool').click(function (e) {
    var imgElement = document.getElementById('image-default');
      app.addImage(imgElement);
  });

  //Change text content
  $('#text-content').keyup(function (e) {     
      app.setTextValue($(this).val());
  });

  //change font family
  $('#font').change(function (e) { 
    e.preventDefault();
    app.setTextParam($(this).data('type'), $(this).find('option:selected').val());
  });


  //change image value
  $('#input-image').change(function (e) { 
    e.preventDefault();
    
    let file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload =function () {
      // convert image file to base64 string
      $('#image-default').attr("src", reader.result);
      //const data = dataURItoBlob(reader.result);
      app.setImageValue(reader.result);
    }
  
    if (file) {
      reader.readAsDataURL(file);
    }
    //canvas.renderAll.bind(canvas);
    $(this).prop("value", "");
  });

  //delete object
  $('.delete-btn').click(function(e){
    app.deleteObject();
  });

  //export file JSON from canvas
  $('.export-json').click(function(){
    const json = canvas.toJSON();
    console.log(json);
    download('template.txt', JSON.stringify(json));
  });

  //get JSON file from local and import to canvas
  $('#input-txt').change(function(e){
    e.preventDefault();
    let file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload =function () {
      const data64 = getData64(reader.result);
      const json = JSON.parse(b64_to_utf8(data64));
      canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
    }
  
    if (file) {
      reader.readAsDataURL(file);
    }
    $(this).prop("value", "");
  });

  //show base64 image type in console 
  $('.console-base64').click(function (e) { 
    e.preventDefault();
    console.log(canvas.toDataURL({
      format: 'jpeg',
    }));
  });

  //get code value from base64
  function getData64( str ) {
    return str.split(',')[1];
  }

  function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }
  
  function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
  }
  
  //Create and download text file
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

})


